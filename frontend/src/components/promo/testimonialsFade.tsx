import Reviews from "../reviews/reviewRating";

interface Props {
  pageHeaderBgImg: string;
  pageHeaderMinVh: string;
}

interface TestimonialCardProps {
  rating: string;
  text: string;
  avatarUrl: string;
  name: string;
}

const TestimonialCard = ({ rating, text, avatarUrl, name }: TestimonialCardProps) => (
  <div className="col-12 col-md-6 col-lg-4">
    <div className="card border shadow-xs mb-4">
      <div className="card-body text-start p-3 w-100">
        <Reviews rating={rating} />
        <p className="mt-4">{text}</p>
        <div className="d-flex align-items-center">
          <div className="avatar avatar-sm position-relative me-2">
            <img src={avatarUrl} className="rounded-circle" alt={`${name}'s avatar`} />
          </div>
          <h6 className="mb-0">{name}</h6>
        </div>
      </div>
    </div>
  </div>
);

export default function TestimonialsFade({
  pageHeaderBgImg,
  pageHeaderMinVh,
}: Props) {
  const styles = {
    pageHeader: {
      backgroundImage: `url(${pageHeaderBgImg})`,
      minHeight: pageHeaderMinVh,
    },
  } as const;

  const testimonials = [
    {
      rating: "4",
      text: `We’re not always in the position that we want to be at. We’re constantly growing. 
      We’re constantly making mistakes. We’re constantly trying to express ourselves 
      and actualize our dreams. If you have the opportunity to play this game of life 
      you need to appreciate every moment.`,
      avatarUrl: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80",
      name: "Alexa Liras",
    },
    {
      rating: "5",
      text: `There’s nothing I really wanted to do in life that I wasn’t able to get good at. 
      That’s my skill. I’m not really specifically talented at anything except for the ability to learn. 
      That’s what I do. That’s what I’m here for. Don’t be afraid to be wrong because you can’t learn anything from a compliment.`,
      avatarUrl: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80",
      name: "Laurent Perrier",
    },
    {
      rating: "4",
      text: `It really matters and then like it really doesn’t matter. What matters is the people who are sparked by it. 
      And the people who are like offended by it, it doesn’t matter. Because it's about motivating the doers. 
      Because I’m here to follow my dreams and inspire other people to follow their dreams.`,
      avatarUrl: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80",
      name: "Michael Levi",
    },
  ];

  return (
    <>
      <section style={styles.pageHeader}>
        <div className="container">
          <h3 className="font-weight-bolder mt-4 mb-2">Our customer’s opinion</h3>
          <p className="mb-5 w-60">
            Society has put up so many boundaries, so many limitations on what’s right and wrong
            that it’s almost impossible to get a pure thought out.
          </p>
          <div className="row">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                rating={testimonial.rating}
                text={testimonial.text}
                avatarUrl={testimonial.avatarUrl}
                name={testimonial.name}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
