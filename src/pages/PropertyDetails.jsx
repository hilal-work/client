import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../Api';

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    api.get(`properties/${id}`)
      .then(res => setProperty(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!property) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-4">
      <img src={property.imageUrl} alt={property.title} className="w-full h-96 object-cover" />
      <h1 className="text-3xl font-bold mt-4">{property.title}</h1>
      <p className="text-gray-600">{property.location}</p>
      <p className="text-green-600 text-xl font-semibold">${property.price}</p>
      <p className="mt-4">{property.description}</p>
    </div>
  );
};

export default PropertyDetails;
