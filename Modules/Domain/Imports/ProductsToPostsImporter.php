<?php

namespace Modules\Domain\Imports;

use Carbon\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Modules\Post\Models\Post;
use Modules\Post\Enums\PostStatus;
use Modules\Post\Enums\PostType;
use Modules\Category\Models\Category;

class ProductsToPostsImporter implements ToCollection, WithHeadingRow
{
    public function collection(Collection $rows)
    {
        foreach ($rows as $row) {
            $this->createPostFromProduct($row);
        }
    }

    private function createPostFromProduct(Collection $productData)
    {
        // Get the first image URL from the comma-separated list
        $imageUrls = explode(', ', $productData->get('image_urls', ''));
        $featuredImage = !empty($imageUrls[0]) ? trim($imageUrls[0]) : '';

        // Find or create category based on product category
        $categoryId = $this->getOrCreateCategory($productData->get('category', 'Uncategorized'));

        // Generate slug from title
        $title = $productData->get('title', 'Untitled Product');
        $slug = Str::slug($title);

        // Ensure unique slug
        $originalSlug = $slug;
        $counter = 1;
        while (Post::where('slug', $slug)->exists()) {
            $slug = $originalSlug . '-' . $counter;
            $counter++;
        }

        // Create intro from description (first 160 characters)
        $description = $productData->get('description', '');
        $intro = Str::limit(strip_tags($description), 160, '...');

        // Format content with product details
        $content = $this->formatProductContent($productData);

        // Create the post
        Post::create([
            'name' => $title,
            'slug' => $slug,
            'intro' => $intro,
            'content' => $content,
            'type' => PostType::Feature->name, // Adjust based on your PostType enum
            'is_featured' => $productData->get('product_active', 0) ? 1 : 0,
            'image' => Str::limit($featuredImage, 25),
            'status' => PostStatus::Published->name,
            'category_id' => $categoryId,
            'meta_title' => $title,
            'meta_keywords' => $this->generateKeywords($productData),
            'meta_description' => $intro,
            'meta_og_image' => Str::limit($featuredImage, 25),
            'meta_og_url' => "",
            'created_by_name' => 'Product Importer',
            'created_at' => $this->parseDate($productData->get('created_at')),
            'updated_at' => Carbon::now(),
            'published_at' => $this->parseDate($productData->get('created_at')),
            // Store additional product data as JSON in a custom field if needed
            'product_data' => json_encode([
                'price' => $productData->get('price'),
                'old_price' => $productData->get('old_price'),
                'brand' => $productData->get('brand'),
                'product_id' => $productData->get('product_id'),
                'campaign_name' => $productData->get('campaign_name'),
                'campaign_url' => $productData->get('campaign_url'),
                'aff_code' => $productData->get('aff_code'),
                'widget_name' => $productData->get('widget_name')
            ])
        ]);
    }

    private function formatProductContent(Collection $productData): string
    {
        $content = '';

        // Add price information
        $price = $productData->get('price');
        $oldPrice = $productData->get('old_price');

        if ($price) {
            $content .= "<h3>Pricing Information</h3>\n";
            $content .= "<p><strong>Current Price:</strong> " . number_format($price, 2) . " RON</p>\n";

            if ($oldPrice && $oldPrice > $price) {
                $content .= "<p><strong>Original Price:</strong> " . number_format($oldPrice, 2) . " RON</p>\n";
                $savings = $oldPrice - $price;
                $content .= "<p><strong>You Save:</strong> " . number_format($savings, 2) . " RON</p>\n";
            }
        }

        // Add brand information
        $brand = $productData->get('brand');
        if ($brand) {
            $content .= "<h3>Brand</h3>\n";
            $content .= "<p>" . $brand . "</p>\n";
        }

        // Add main description
        $description = $productData->get('description');
        if ($description) {
            $content .= "<h3>Product Description</h3>\n";
            $content .= "<div>" . nl2br($description) . "</div>\n";
        }

        // Add product images
        $imageUrls = $productData->get('image_urls');
        if ($imageUrls) {
            $images = explode(', ', $imageUrls);
            if (count($images) > 1) {
                $content .= "<h3>Product Images</h3>\n";
                $content .= "<div class='product-gallery'>\n";
                foreach ($images as $index => $imageUrl) {
                    $imageUrl = trim($imageUrl);
                    if ($index > 0) { // Skip first image as it's already the featured image
                        $content .= "<img src='" . $imageUrl . "' alt='Product Image " . ($index + 1) . "' style='max-width: 100%; margin: 10px 0;' />\n";
                    }
                }
                $content .= "</div>\n";
            }
        }

        // Add purchase link
        $productUrl = $productData->get('url');
        $affCode = $productData->get('aff_code');

        if ($productUrl || $affCode) {
            $content .= "<h3>Purchase Information</h3>\n";

            if ($affCode) {
                $content .= "<p><a href='" . $affCode . "' target='_blank' rel='nofollow' class='btn btn-primary'>Buy Now (Affiliate Link)</a></p>\n";
            } elseif ($productUrl) {
                $content .= "<p><a href='" . $productUrl . "' target='_blank' class='btn btn-primary'>View Product</a></p>\n";
            }
        }

        return $content;
    }

    private function getOrCreateCategory($categoryName): int
    {
        if (empty($categoryName)) {
            $categoryName = 'Uncategorized';
        }

        $category = Category::where('name', $categoryName)->first();

        if (!$category) {
            $category = Category::create([
                'name' => $categoryName,
                'slug' => Str::slug($categoryName),
                'description' => 'Auto-created category from product import',
                'status' => 1, // Assuming 1 means active
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);
        }

        return $category->id;
    }

    private function generateKeywords(Collection $productData): string
    {
        $keywords = [];

        // Add brand as keyword
        if ($productData->get('brand')) {
            $keywords[] = $productData->get('brand');
        }

        // Add category as keyword
        if ($productData->get('category')) {
            $keywords[] = $productData->get('category');
        }

        // Extract keywords from title
        $title = $productData->get('title', '');
        $titleWords = explode(' ', $title);
        foreach ($titleWords as $word) {
            $word = trim($word, '- ');
            if (strlen($word) > 3) {
                $keywords[] = $word;
            }
        }

        return implode(', ', array_unique($keywords));
    }

    private function parseDate($dateString): Carbon
    {
        if (empty($dateString)) {
            return Carbon::now();
        }

        try {
            // Handle the format "2021-08-26 16:26:29 UTC"
            return Carbon::createFromFormat('Y-m-d H:i:s e', $dateString);
        } catch (\Exception $e) {
            try {
                return Carbon::parse($dateString);
            } catch (\Exception $e) {
                return Carbon::now();
            }
        }
    }

    public function headingRow(): int
    {
        return 1;
    }
}
