import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="h-screen overflow-hidden w-full flex flex-col justify-between bg-cover bg-center bg-[url(./src/assets/Homepg.jpg)]">
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="relative z-10 flex flex-col items-center text-center px-6 md:px-12 lg:px-20 pt-16 md:pt-24">
        <h1 className="text-white text-2xl md:text-4xl font-bold max-w-lg leading-tight">
          "Raise Your Voice, Get Your Issues Resolved!"
        </h1>
      </div>
      <div className="relative z-10 w-full flex justify-center pb-12 md:pb-16">
        <Link 
          to='/register' 
          className="bg-blue-600 font-semibold text-white text-lg md:text-xl px-6 py-3 rounded-lg w-3/4 max-w-xs text-center shadow-lg hover:bg-blue-500 transition"
        >
          Continue
        </Link>
      </div>
    </div>
  )
}

export default Home
