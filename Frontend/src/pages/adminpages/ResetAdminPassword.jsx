import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const ResetAdminPassword = () => {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        
        try {
            const userData = { email, newPassword, otp };
            const response = await axios.post(`${import.meta.env.VITE_URL}/admins/reset-password`, userData);

            if (response.status === 200) {
                navigate('/admin-login');
            }
        } catch (error) {
            console.error("Reset password failed:", error.response?.data?.message || error.message);
            setErrorMessage(error.response?.data?.message || "Invalid details. Please try again.");
        }
    };

    return (
        <div className='min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500  bg-cover bg-center'>
            <div className='relative z-10 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg bg-black/50 p-6 sm:p-8 md:p-10 rounded-lg'>
                <Link to='/' className='text-white text-lg font-semibold bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700'>Home</Link>
                <h1 className='text-2xl md:text-3xl font-semibold text-center text-white mt-4 mb-6'>Reset Password</h1>
                <form onSubmit={submitHandler} className='space-y-4'>
                    <div>
                        <input
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='w-full border-2 p-3 bg-transparent rounded-md placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-orange-400'
                            type='email'
                            placeholder='Email'
                        />
                    </div>
                    <div>
                        <input
                            required
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className='w-full border-2 p-3 bg-transparent rounded-md placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-orange-400'
                            type='password'
                            placeholder='New Password'
                        />
                    </div>
                    <div>
                        <input
                            required
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className='w-full border-2 p-3 bg-transparent rounded-md placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-orange-400'
                            type='text'
                            placeholder='Enter OTP'
                        />
                    </div>
                    {errorMessage && (
                        <p className='text-red-400 text-center'>{errorMessage}</p>
                    )}
                    <button
                        type='submit'
                        className='bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-500 mt-4 w-full'
                    >
                        Reset Password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetAdminPassword;