import ProductBadge from './productBadge';

interface Props {
  title: string;
  description: string;
  price: number;
  images: string; // Add images property to the interface
}

export default function CardProduct({
  title,
  description,
  price,
  images, // Accept the images prop
}: Props) {

  const classList = "card-body " + "text-center";

  // Extract the first image from the images string
  const firstImage = images.split(',')[0]?.trim(); // Get the first image and remove any surrounding spaces

  return (
    <>
      <div className="card card-product border mb-5 shadow-xs border-radius-lg">
        <a href="#">
          <div className="height-350">
            {/* Display the first image if it exists */}
            {firstImage && (
              <img loading="lazy" className="w-100 h-100 p-4 rounded-top" src={`${firstImage}`} alt={title} />
            )}
          </div>
          <div className={classList}>

            {title && 
              <h4 className="font-weight-bold">
                {title}
              </h4>
            }

            {description && 
              <p className="text-body">{description}</p>
            }

            {price && 
              <h4 className="mb-0 text-lg mt-1 mb-3">
                ${price.toLocaleString()}
              </h4>
            }

          </div>
        </a>
      </div>
    </>
  );
};
