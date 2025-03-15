import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { useUser } from '../../Context/userContext';
const UserRegistration = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [village, setVillage] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('')
  const { setUser } = useUser();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      fullname: {
        firstname: firstname,
        lastname: lastname,
      },
      email: email,
      village: village,
      phone: phone,
      password: password
    }
    const response = await axios.post(`${import.meta.env.VITE_URL}/users/register`, newUser);
    if (response.status === 200) {
      const data = response.data;
      setUser(data.userd);
      navigate("/user-home");
    }
  }

  return (
    
    <div className="h-209 sm:h-178 flex items-center justify-center bg-[url(./src/assets/Homepg.jpg)] bg-cover bg-center">
    <div className="flex flex-col items-center p-8 py-10 rounded-lg   bg-black/60">
      <h1 className="text-3xl font-bold mb-5 text-white">User Registration</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 w-72 md:w-96">
          <input onChange={(e) => setFirstname(e.target.value)} className="placeholder-gray-300 text-white border-2 p-2 bg-transparent rounded-md" value={firstname} type="text" placeholder="Firstname" />
          <input onChange={(e) => setLastname(e.target.value)} className="placeholder-gray-300 text-white border-2 shadow- p-2 bg-transparent rounded-md" value={lastname} type="text" placeholder="Lastname" />
          <input onChange={(e) => setEmail(e.target.value)} className="placeholder-gray-300 text-white border-2 shadow- p-2 bg-transparent rounded-md" value={email} type="email" placeholder="Email" />
          <input onChange={(e) => setVillage(e.target.value)} className="placeholder-gray-300 text-white border-2 shadow- p-2 bg-transparent rounded-md" value={village} type="text" placeholder="Village" />
          <input onChange={(e) => setPhone(e.target.value)} className="placeholder-gray-300 text-white border-2 shadow- p-2 bg-transparent rounded-md" value={phone} type="text" placeholder="Phone" />
          <input onChange={(e) => setPassword(e.target.value)} className="placeholder-gray-300 text-white border-2 p-2 bg-transparent rounded-md" value={password} type="password" placeholder="Password" />
          <button type="Submit" className='bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-500 mt-8 w-full'>
            Register
          </button>
        </div>
      </form>
      <div className="mt-10 text-gray-100">
        <h1>Already have an account?  
          <Link to='/login' className="ml-2 bg-blue-600 text-white font-bold py-1 px-4 rounded-md cursor-pointer hover:bg-blue-500 shadow-lg shadow-blue-400">
            Login
          </Link>
        </h1>
      </div>
    </div>
  </div>

  )
}

export default UserRegistration
