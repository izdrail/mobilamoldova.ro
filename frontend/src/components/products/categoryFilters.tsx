import data from '../../../public/data.json';
import CardProduct from '../products/cardProduct';

interface Props {
  title: string;
}

export default function CategoryFilter({
  title,
}: Props) {

  return (
    <>
      <div className="card card-product card-plain">
        <div className="d-flex border-bottom pb-3">
          {(title.length != 0) && 
            <h2 className="mb-3">{title}</h2>
          }
          {/* <div className="d-flex ms-auto align-items-center">
            <div className="dropdown">
              <button className="btn btn-link text-dark mb-0 dropdown-toggle" type="button" id="sortButton" data-bs-toggle="dropdown" aria-expanded="false">
                Sort
              </button>
              <ul className="dropdown-menu" aria-labelledby="sortButton">
                <li><a className="dropdown-item" href="javascript:;">Most Popular</a></li>
                <li><a className="dropdown-item" href="javascript:;">Best Rating</a></li>
                <li><a className="dropdown-item" href="javascript:;">Newest</a></li>
                <li><a className="dropdown-item" href="javascript:;">Price: Low to High</a></li>
                <li><a className="dropdown-item" href="javascript:;">Price: High to Low</a></li>
              </ul>
            </div>
          </div> */}
        </div>
        <div className="row mt-5">
          <div className="col-12 col-md-4">
            <ul className="list-unstyled ms-3">
              <li className="mb-2"><a href="#">Dormitor</a></li>
              <li className="mb-2"><a href="#">Bucatarie</a></li>
              <li className="mb-2"><a href="#">Sales</a></li>
              <li className="mb-2"><a href="#">Permanent Collection</a></li>
              <li className="mb-2"><a href="#">New</a></li>
            </ul>
     
          </div>
          <div className="col-12 col-md-8">
            <div className="d-flex h-100">
              <div className="row">
                {data.products.slice(0, 3).map(product => 
                  <div class="col-md-6 col-lg-4">
                    <CardProduct 
                      title = {product.title}
                      description = {product.description}
                      price = {product.price}
                    />
                  </div>
                )}        
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
