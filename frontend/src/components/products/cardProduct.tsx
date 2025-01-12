import ProductBadge from './productBadge';

interface Props {

  title: string;
  description: string;
  price: number;

}

export default function CardProduct({
  title,
  description,
  price,

}: Props) {

  const classList = "card-body " + "text-center";

  return (
    <>
      <div className="card card-product border mb-5 shadow-xs border-radius-lg">
        <a href="#">
          <div className="height-350">
            <img className="w-100 h-100 p-4 rounded-top" src={`${import.meta.env.BASE_URL}`} />
          </div>
          <div className={classList}>

            {(title) && 
              <h4 className="font-weight-bold">
                {title}
              </h4>
            }

            {(description) && 
              <p className="text-body">{description}</p>
            }
           

            {(price) && 
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
