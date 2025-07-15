import React, { useEffect, useState } from 'react';
import api from '../Api';
import PropertyCard from '../components/PropertyCard';

const Home = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    api.get('/properties/')
      .then(res => setProperties(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    
<div className="px-4 mt-4">
    <h1 className="font-bold text-xl text-blue-600 mb-5"> Properties </h1>
    <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
      {properties.map(property => (
        <PropertyCard key={property._id} property={property} />
      ))}
    </div>
  </div>
  );
};

export default Home;
