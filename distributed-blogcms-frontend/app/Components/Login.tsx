'use client'

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import axios from 'axios';
import { useGeneralContext } from '../hooks/GeneralContext';
import useAxiosPrivate from '../hooks/useAxiosPrivate';


const LoginComp = () => {
    const axiosInstance = useAxiosPrivate()
    const apiEndpoint = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`;
    const router = useRouter();
    const { setAuth } = useGeneralContext();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('')

    const handleLogin = async () => {
        // Handle login logic here
        const loginData = {
            email,
            password,
        };
    
        try {
            setLoading(true);
    
            // Make the POST request using axios
            const response = await axiosInstance.post(apiEndpoint, loginData, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
            });
            const resData = response.data;
    
            console.log(resData)
    
            if (resData.status === 'success') {
                localStorage.setItem('token', resData.data.token);
                localStorage.setItem('user', JSON.stringify(resData.data));
                setAuth(resData.data);
                setErrorMsg('');
                // router.push('/wall');
                router.replace('/wall')
                // window.location.reload();
                
            }
        } catch (error: any) {
            console.error('Error during Login:', error);
            setErrorMsg(error.response.data.error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center pb-20 mt-20">
        <div className="p-8 bg-white rounded-md shadow-md w-96">
            <h2 className="mb-6 text-2xl font-bold">Log In</h2>

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
            onClick={handleLogin}
            >
            {loading ? 'Loading...' : 'Log In'}
            </button>
        </div>
        </div>
    );
};

export default LoginComp;
