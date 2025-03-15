import React, { useState } from 'react'
import { Link } from 'react-router'
import { useUser } from '../Context/userContext'
const Navbar = () => {
    const {user}=useUser();
    const [isOpen, setIsOpen] = useState(false)
    const token=localStorage.getItem('token');
  return (
    <div>
       <nav className=" bg-blue-900 text-white fixed w-full top-0 z-50 shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            Welcome, <span className="text-yellow-300">{user?.fullname?.firstname || "User"}</span>
          </h1>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white focus:outline-none text-xl"
          > 
            {isOpen ? "✖" : "☰"}
          </button>
          <div className="hidden md:flex space-x-4">
          <Link onClick={()=>{setIsOpen(false)}} className="px-4 py-2 bg-yellow-500 text-blue-900 rounded-md font-semibold" to="/user-home">Home</Link>
            <Link onClick={()=>{setIsOpen(false)}} className="px-4 py-2 bg-yellow-500 text-blue-900 rounded-md font-semibold" to="/profile">Profile</Link>
            <Link onClick={()=>{setIsOpen(false)}} className="px-4 py-2 bg-yellow-500 text-blue-900 rounded-md font-semibold" to="/complaints">Complaints</Link>
            <Link onClick={()=>{setIsOpen(false)}} className="px-4 py-2 bg-yellow-500 text-blue-900 rounded-md font-semibold" to="/addcomplaint">Add Complaint</Link>
            <Link onClick={()=>{setIsOpen(false)}} className="px-4 py-2 bg-yellow-500 text-blue-900 rounded-md font-semibold" to="/notices">Notices</Link>
            {token?<Link className="px-4 py-2 bg-red-600 text-white rounded-md font-semibold" to="/logout">Logout</Link>:<></>}
          </div>
        </div>
        {isOpen && (
          <div className="md:hidden bg-blue-800 text-white flex flex-col items-center space-y-3 py-3">
                      <Link onClick={()=>{setIsOpen(false)}} className="px-4 py-2 bg-yellow-500 text-blue-900 rounded-md font-semibold" to="/user-home">Home</Link>
            <Link onClick={()=>{setIsOpen(false)}} className="px-4 py-2 bg-yellow-500 text-blue-900 rounded-md font-semibold" to="/profile">Profile</Link>
            <Link onClick={()=>{setIsOpen(false)}} className="px-4 py-2 bg-yellow-500 text-blue-900 rounded-md font-semibold" to="/complaints">Complaints</Link>
            <Link onClick={()=>{setIsOpen(false)}} className="px-4 py-2 bg-yellow-500 text-blue-900 rounded-md font-semibold" to="/addcomplaint">Add Complaint</Link>
            <Link onClick={()=>{setIsOpen(false)}} className="px-4 py-2 bg-yellow-500 text-blue-900 rounded-md font-semibold" to="/notices">Notices</Link>
            {token?<Link className="px-4 py-2 bg-red-600 text-white rounded-md font-semibold" to="/logout">Logout</Link>:<></>}
          </div>
        )}
      </nav>
    </div>
  )
}

export default Navbar
