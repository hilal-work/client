import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import toast from 'react-hot-toast';
import api from '../Api';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Admin-only access control
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/login');
    try {
      const decoded = jwtDecode(token);
      if (!decoded.isAdmin) return navigate('/');
    } catch {
      navigate('/login');
    }
  }, [navigate]);

  const onSubmit = async (data) => {
    const token = localStorage.getItem('token');
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key === 'image') {
        formData.append('image', value[0]); // Handle file correctly
      } else {
        formData.append(key, value);
      }
    });

    try {
      await api.post('/properties', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Property created successfully');
    } catch (err) {
      toast.error('Failed to create property');
    }
  };

  return (
    <div className="px-4">
      <div className="flex justify-center">
        <h1 className="font-bold text-xl text-green-600 my-5">
          Add new Property
        </h1>
      </div>
      <div className="flex justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-4 w-full max-w-md border rounded shadow"
        >
          <input
            type="text"
            placeholder="Title"
            className="block w-full mb-2 p-2 border"
            {...register('title', { required: 'Title is required' })}
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}

          <textarea
            placeholder="Description"
            className="block w-full mb-2 p-2 border"
            {...register('description', { required: 'Description is required' })}
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}

          <input
            type="number"
            placeholder="Price"
            className="block w-full mb-2 p-2 border"
            {...register('price', { required: 'Price is required' })}
          />
          {errors.price && (
            <p className="text-red-500 text-sm">{errors.price.message}</p>
          )}

          <input
            type="text"
            placeholder="Location"
            className="block w-full mb-2 p-2 border"
            {...register('location', { required: 'Location is required' })}
          />
          {errors.location && (
            <p className="text-red-500 text-sm">{errors.location.message}</p>
          )}

          <input
            type="file"
            className="block w-full mb-2"
            {...register('image', { required: 'Image is required' })}
          />
          {errors.image && (
            <p className="text-red-500 text-sm">{errors.image.message}</p>
          )}

          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 w-full"
          >
            Create Property
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminDashboard;