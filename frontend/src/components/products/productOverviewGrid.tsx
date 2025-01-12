import ProductRating from '../reviews/reviewRating'
import ProductGallery from './productGallery'
import ProductSizes from './productSizes'

interface Props {
  title: string;
  images: string;
  description: string;
  price: number;
}

export default function ProductOverview({
  title,
  images,
  description,
  price,
}: Props) {

  return (
    <>
    <div className="card card-product card-plain">
      <div className="row">
        <ProductGallery images={images}/>
        <div className="col-12 col-lg-6 ps-lg-5">
          {(title.length != 0) && 
            <h2 className="mt-4">{title}</h2>
          }
          {(description.length != 0) && 
            <p className="mb-5">{description}</p>
          }

          <form action="" method="post">
            <button className="btn btn-dark btn-lg" type="submit">Add to cart</button>
          </form>
        </div>
      </div>

    </div>
    </>
  );
};
