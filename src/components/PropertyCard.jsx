import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const PropertyCard = ({ property }) => {
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    setBookmarked(bookmarks.includes(property._id));
  }, [property._id]);

  const toggleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    let updated;
    if (bookmarks.includes(property._id)) {
      updated = bookmarks.filter(id => id !== property._id);
    } else {
      updated = [...bookmarks, property._id];
    }
    localStorage.setItem('bookmarks', JSON.stringify(updated));
    setBookmarked(!bookmarked);
  };

  return (
   <div className="border rounded p-3 shadow relative text-sm">
  <div className="relative">
    <img
      src={property.imageUrl}
      alt={property.title}
      className="w-full h-40 object-cover rounded"
    />
    <button
      onClick={toggleBookmark}
      className="absolute top-2 right-2 text-xl z-10 bg-white bg-opacity-70 rounded-full p-1"
      title={bookmarked ? 'Remove Bookmark' : 'Add Bookmark'}
    >
      {bookmarked ? '🔖' : '📑'}
    </button>
  </div>
  <h2 className="text-lg font-semibold mt-2">{property.title}</h2>
  <p>{property.location}</p>
  <p className="text-green-600 font-semibold">${property.price}</p>
  <Link to={`/property/${property._id}`} className="text-blue-500 underline">
    View Details
  </Link>
</div>

  );
};

export default PropertyCard;
