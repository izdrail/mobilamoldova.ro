interface Props {
  images: string;
}

export default function ProductGallery({
  images,
}: Props) {

  return (
    <>
      <div className="col-12 col-lg-6 d-flex">
        <img className="w-70 rounded-2" src={images} />
      </div> 
    </>
  );
}