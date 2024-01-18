'use client'

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const SignUpComp = () => {
  const apiEndpoint = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/create`;
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('')

  const handleSignup = async () => {
    const registerData = {
      username,
      email,
      password,
    };

    try {
      setLoading(true);

      // Make the POST request using axios
      const response = await axios.post(apiEndpoint, registerData, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      const resData = response.data;

      // console.log(resData)

      if (resData.status === 'success') {
        router.push('/auth/login');
      }
    } catch (error: any) {
      console.error('Error during signup:', error);
      setErrorMsg(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center mt-20">
      <div className="h-auto p-8 bg-white rounded-md shadow-md w-96">
        <h2 className="mb-6 text-2xl font-bold">Sign Up</h2>

        {/* Username Input */}
        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        {/* Email Input */}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password Input */}
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-6 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className='flex items-center justify-center mb-3'>
          {errorMsg && <p className='text-sm italic text-red-500'>{errorMsg}</p>}
        </div>
        
        <button
          className="w-full p-2 text-white bg-green-500 rounded hover:bg-green-600"
          onClick={handleSignup}
        >
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
      </div>
    </div>
  );
};

export default SignUpComp;
