import React, { useState, useEffect } from 'react';

interface Props {
  title: string;
}

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
}

interface Category {
  id: number;
  name: string;
  slug: string;
}

export default function CategoryFilter({ title }: Props) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [sortOption, setSortOption] = useState('');
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories
        const categoriesResponse = await fetch('backend/categories');
        if (!categoriesResponse.ok) throw new Error('Failed to fetch categories');
        const categoriesData = await categoriesResponse.json();
        console.log('Fetched Categories:', categoriesData);
        setCategories(categoriesData || []);
        setIsLoadingCategories(false);

        // Fetch products
        const productsResponse = await fetch('backend/products');
        if (!productsResponse.ok) throw new Error('Failed to fetch products');
        const productsData = await productsResponse.json();
        console.log('Fetched Products:', productsData);
        setProducts(productsData || []);
        setIsLoadingProducts(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setIsLoadingCategories(false);
        setIsLoadingProducts(false);
      }
    };

    fetchData();
  }, []);

  const sortProducts = (productsToSort: Product[]) => {
    const sorted = [...productsToSort];
    switch (sortOption) {
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price);
      default:
        return sorted;
    }
  };

  if (error) {
    return (
      <div className="p-4 text-red-500 bg-red-50 rounded-md">
        <strong>Error:</strong> {error}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="flex justify-between items-center border-b p-4">
        {title && <h2 className="text-xl font-semibold">{title}</h2>}
        <div className="relative">
          <button
            className="px-4 py-2 text-gray-700 hover:text-gray-900 flex items-center gap-2"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            Sort
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => {
                  setSortOption('price-low');
                  setIsDropdownOpen(false);
                }}
              >
                Price: Low to High
              </button>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => {
                  setSortOption('price-high');
                  setIsDropdownOpen(false);
                }}
              >
                Price: High to Low
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6">
        {/* Categories */}
        <div className="md:col-span-1">
          {isLoadingCategories ? (
            <div className="flex items-center gap-2">
              <span>Loading categories...</span>
            </div>
          ) : categories.length > 0 ? (
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.id}>
                  <a
                    href={`/category/${category.slug}`}
                    className="text-gray-600 hover:text-gray-900 hover:underline"
                  >
                    {category.name}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p>No categories available.</p>
          )}
        </div>

        {/* Products */}
        <div className="md:col-span-3">
          {isLoadingProducts ? (
            <div className="flex items-center gap-2">
              <span>Loading products...</span>
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sortProducts(products).slice(0, 3).map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow p-4">
                  <h3 className="font-semibold text-lg">{product.title}</h3>
                  <p className="text-gray-600 mt-2">{product.description}</p>
                  <p className="text-lg font-bold mt-4">${product.price}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No products available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
