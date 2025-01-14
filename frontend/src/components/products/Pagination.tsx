// src/components/Pagination.tsx
import { useState } from 'react';
import CardProduct from '../products/cardProduct';

const Pagination = ({ products }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 3;
  
  // Calculate the start and end index for the current page
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;

  // Slice the products array based on the current page
  const paginatedProducts = products.slice(startIndex, endIndex);

  // Function to go to the next page
  const goToNextPage = () => {
    if (currentPage < Math.ceil(products.length / productsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Function to go to the previous page
  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <div className="row">
        <h5 className="mb-4">Customers also purchased</h5>
        {paginatedProducts.map(product => (
          <div className="col-md-6 col-lg-3" key={product.id}>
            <CardProduct 
              title={product.title}
              description={product.description}
              images={product.image_urls}
            />
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="pagination-controls mt-4 text-center">
        <button 
          className="btn btn-primary"
          onClick={goToPrevPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="mx-3">Page {currentPage} of {Math.ceil(products.length / productsPerPage)}</span>
        <button 
          className="btn btn-primary"
          onClick={goToNextPage}
          disabled={currentPage === Math.ceil(products.length / productsPerPage)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
