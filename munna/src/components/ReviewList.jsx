import React from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import "./ReviewList.css"; // Importing the CSS

const ReviewList = ({ reviews, productRating }) => {
  return (
    <div className="reviews-section">
      <h3 className="reviews-title">Customer Reviews</h3>
      
      {reviews.length === 0 ? (
        <p className="no-reviews-message">
          No reviews yet. Be the first to write a review!
        </p>
      ) : (
        <>
          <div className="product-rating">
            <strong>Product Rating: </strong>
            {Array.from({ length: 5 }, (_, i) => (
              <FaStar key={`product-rating-${i}`} className={i < productRating ? "filled" : ""} />
            ))}
          </div>

          {reviews.map((review) => (
            <div key={review._id} className="review">
              <p className="review-name">{review.name}</p>
              <p className="review-rating">
                {Array.from({ length: review.rating }, (_, i) => (
                  <FaStar key={`review-${review._id}-star-${i}`} />
                ))}
                {Array.from({ length: 5 - review.rating }, (_, i) => (
                  <FaRegStar key={`review-${review._id}-empty-star-${i}`} />
                ))}
              </p>
              <p className="review-comment">{review.comment}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default ReviewList;
