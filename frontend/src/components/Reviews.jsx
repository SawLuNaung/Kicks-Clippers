//import React from 'react';

// Sample customer reviews data
const reviews = [
  {
    name: 'John Doe',
    rating: 5,
    date: 'Oct 12, 2024',
    review: 'Amazing service! My haircut was perfect and the staff was really friendly. Highly recommend this place!'
  },
  {
    name: 'Jane Smith',
    rating: 4,
    date: 'Sep 24, 2024',
    review: 'The experience was great! The barber was professional and knew exactly what I wanted. I would come again.'
  },
  {
    name: 'Michael Johnson',
    rating: 3,
    date: 'Aug 10, 2024',
    review: 'Decent haircut but had to wait longer than expected. Service could be faster.'
  }
];

// Function to generate star ratings
// eslint-disable-next-line react/prop-types
const StarRating = ({ rating }) => {
  return (
    <div className="flex">
      {Array.from({ length: 5 }, (_, index) => (
        <svg
          key={index}
          className={`w-5 h-5 ${index < rating ? 'text-yellow-500' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674a1 1 0 00.95.69h4.908c.969 0 1.371 1.24.588 1.81l-3.977 2.89a1 1 0 00-.364 1.118l1.518 4.674c.3.921-.755 1.688-1.54 1.118L10 15.347l-3.977 2.89c-.784.57-1.838-.197-1.54-1.118l1.518-4.674a1 1 0 00-.364-1.118L1.66 9.1c-.784-.57-.38-1.81.588-1.81h4.908a1 1 0 00.95-.69l1.518-4.674z" />
        </svg>
      ))}
    </div>
  );
};

const CustomerReviews = () => {
  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6">Customer Reviews</h2>
      <div className="space-y-6">
        {reviews.map((review, index) => (
          <div key={index} className="p-4 border rounded-lg shadow-sm bg-white">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-lg">{review.name}</h3>
              <span className="text-sm text-gray-500">{review.date}</span>
            </div>
            <StarRating rating={review.rating} />
            <p className="mt-2 text-gray-700">{review.review}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerReviews;
