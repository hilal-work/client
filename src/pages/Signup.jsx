import React from 'react';
import { useForm } from 'react-hook-form';
import api from '../Api';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Signup = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      await api.post('/auth/signup', data);
      toast.success('Signup successful');
    } catch (err) {
      toast.error('Signup failed');
    }
  };

  return (
   <div className="px-4">
  <div className="flex justify-center">
    <h1 className="font-bold text-xl text-green-600 my-5">
      Signup
    </h1>
  </div>

  <div className="flex justify-center">
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 w-full max-w-md border rounded shadow">
      <input
        type="email"
        placeholder="Email"
        className="block w-full mb-2 p-2 border"
        {...register('email', { required: 'Email is required' })}
      />
      {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

      <input
        type="password"
        placeholder="Password"
        className="block w-full mb-2 p-2 border"
        {...register('password', { required: 'Password is required' })}
      />
      {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

      <button type="submit" className="bg-green-600 text-white px-4 py-2 w-full">
        Signup
      </button>
      
<p className="text-sm mt-4 text-center">
  Already have an account? <Link to="/login" className="text-blue-600 underline">Login</Link>
</p>

    </form>
  </div>
</div>
  );
};

export default Signup;
