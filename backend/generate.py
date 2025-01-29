import sqlite3
import os
import re
from datetime import datetime
from urllib.parse import urlparse
from html import escape  # We're importing the escape function from html module

def sanitize_filename(name):
    """
    Sanitizes filenames by removing invalid characters and replacing spaces with hyphens.
    """
    return re.sub(r'[^\w\-_\. ]', '', name).replace(' ', '-')

def generate_product_markdown(db_path, output_dir):
    """
    Reads products from a SQLite database and generates SEO-optimized Markdown files with the new template.
    
    :param db_path: Path to the SQLite database
    :param output_dir: Directory to save the generated Markdown files
    """
    # Ensure the output directory exists
    os.makedirs(output_dir, exist_ok=True)

    # Connect to the database
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    # Fetch all products
    cursor.execute("""
        SELECT 
            title, 
            aff_code, 
            price, 
            category, 
            subcategory, 
            brand, 
            url, 
            image_urls, 
            description, 
            short_message, 
            created_at 
        FROM products
    """)
    products = cursor.fetchall()

    # Generate Markdown files for each product
    for product in products:
        (title, aff_code, price, category, subcategory, brand, url, image_urls, 
         description, short_message, created_at) = product
        
        # Sanitize the title for the filename
        filename = f"{sanitize_filename(title.lower())}.md"
        filepath = os.path.join(output_dir, filename)
        
        # SEO Enhancements:
        seo_title = f"'{title}'"
        
        # Use escape to make sure no markdown characters from short_message or description interfere
        meta_description = escape(short_message) if short_message else escape(description[:155])  
        
        # Convert image URLs into the first image for heroImage
        images = [img.strip() for img in image_urls.split(',') if img.strip()]
        hero_image = images[0] if images else '../../assets/images/default.jpg'  

        parsed_url = urlparse(url)
        rel_nofollow = ' rel="nofollow"' if not parsed_url.netloc.endswith('yourdomain.com') else ''

        tags = [category, subcategory, brand] if brand else [category, subcategory]
        tags = [tag for tag in tags if tag]  

        # Here's where we use .format() to avoid f-string issues:
        markdown_content = """---
title: {}
description: >-
  {}
pubDate: {}
heroImage: {}
category: {}
tags:
{}
---

## {}

### Product Details

- **Price**: ${}
- **Category**: {}
- **Subcategory**: {}
- **Brand**: {}
- **URL**: [Product available at partner]({}{})

### Description

{}

### Short Message

{}

### Images

{}
""".format(
    seo_title,
    meta_description,
    created_at or datetime.now().strftime('%Y-%m-%dT%H:%M:%S.000Z'),
    hero_image,
    category,
    ''.join(f'  - {tag}\n' for tag in tags),
    title,
    price,
    category,
    subcategory,
    brand,
    aff_code,
    rel_nofollow,
    description,
    short_message,
    "\n".join([f"![{title} Image]({img})" for img in images])
)
        
        # Write the Markdown file
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(markdown_content)
        
        print(f"Generated SEO-optimized Markdown file for product: {filename}")

    # Close the database connection
    conn.close()
    print(f"Generated {len(products)} SEO-optimized product Markdown files.")

# Example usage
if __name__ == "__main__":
    # Replace these with your actual database path and output directory
    DATABASE_PATH = 'mobila-products.db'
    OUTPUT_DIRECTORY = '/home/frontend/src/content/produse/'
    
    generate_product_markdown(DATABASE_PATH, OUTPUT_DIRECTORY)