import { useState } from "react";
import starIcon from "../assets/images/icon-star.svg";
import thankIcon from "../assets/images/illustration-thank-you.svg";
import "./InteractiveRating.scss";
export default function InteractiveRating() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [starsCount, setStarsCount] = useState("");
  const ratingArray = [1, 2, 3, 4, 5];

  const handleSubmit = () => {
    if (starsCount !== "") setIsSubmitted(true);
  };
  return (
    <main>
      {!isSubmitted && (
        <div className="card">
          <div className="star">
            <img src={starIcon} alt="Star Icon" />
          </div>
          <h1 className="card-title">How did we do?</h1>
          <p className="card-text">
            Please let us know how we did with your support request. All
            feedback is appreciated to help us improve our offering!
          </p>
          <ul className="rating-list">
            {ratingArray.map((rate, i) => (
              <li
                key={i}
                className={`rate-circle ${starsCount === rate ? "active" : ""}`}
                onClick={() => setStarsCount(rate)}
              >
                {rate}
              </li>
            ))}
          </ul>
          <button className="card-submit" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      )}

      {isSubmitted && (
        <div className="card thank-card">
          <img src={thankIcon} alt="Thank You Icon" className="thank-img" />
          <p className="special-text">You selected {starsCount} out of 5</p>
          <h2 className="card-title">Thank you!</h2>
          <p className="card-text">
            We appreciate you taking the time to give a rating. If you ever need
            more support, don’t hesitate to get in touch!
          </p>
        </div>
      )}
    </main>
  );
}
