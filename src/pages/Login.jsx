import React from 'react';
import { useForm } from 'react-hook-form';
import api from '../Api';
import toast from 'react-hot-toast';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await api.post('/auth/login', data);
      localStorage.setItem('token', res.data.token);
      toast.success('Login successful');
      
    } catch (err) {
      toast.error('Login failed');
    }
  };

  return (
   <div className="px-4">
  
  <div className="flex justify-center">
    <h1 className="font-bold text-xl text-blue-600 my-5">
      Login
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

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 w-full">
        Login
      </button>
    </form>
  </div>
</div>

  );
};

export default Login;
