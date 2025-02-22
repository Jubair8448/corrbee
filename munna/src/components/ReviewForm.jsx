import React, { useState } from 'react';
import axios from 'axios';
import { FaStar, FaRegStar } from 'react-icons/fa';  // Importing icons for star rating
import styles from './ReviewForm.css';  // Correct import of CSS module

const ReviewForm = ({ productId }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(`Sending review for product ID: ${productId}`);

      const response = await axios.post(
        `${process.env.REACT_APP_API_IMAGE_URL}${productId}`,
        { rating, comment }
      );

      console.log("Review added:", response.data);
      setSuccessMessage("Review submitted successfully!");
      setErrorMessage('');
      setRating(0);
      setComment('');
    } catch (error) {
      console.error("Error adding review:", error);
      setSuccessMessage('');
      setErrorMessage("Failed to submit the review. Please try again.");
    }
  };

  const handleStarClick = (index) => {
    setRating(index + 1); // Set rating on star click
    const stars = document.querySelectorAll(`.${styles.star}`);
    
    // Remove 'falling' class from all stars
    stars.forEach(star => star.classList.remove('falling'));

    // Add 'falling' class to the clicked star
    stars[index].classList.add('falling');
  };

  return (
    <div className={styles.reviewBox}>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <h3>Write a Review</h3>

        {/* Rating */}
        <div>
          <label>Rating: </label>
          <div className={styles.starRating}>
            {[...Array(5)].map((_, index) => (
              <span
                key={index}
                onClick={() => {
                  handleStarClick(index);
                }}
                className={`${styles.star} ${index < rating ? 'active' : ''}`}  // Add active class for rating
              >
                {index < rating ? <FaStar color="gold" /> : <FaRegStar color="gold" />} {/* Golden stars */}
              </span>
            ))}
          </div>
        </div>

        {/* Comment */}
        <div>
          <label>Comment: </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows="4"
          />
        </div>

        {/* Submit Button */}
        <button type="submit">Submit Review</button>

        {/* Success and Error Messages */}
        {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
      </form>
    </div>
  );
};

export default ReviewForm;
