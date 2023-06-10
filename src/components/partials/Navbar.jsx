import React from 'react'
import { FcBusinessContact } from "react-icons/fc"
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='py-1.5 mt-3 px-3 justify-between  shadow-lg flex items-center'>
        <div className='flex items-center space-x-2'>
            <FcBusinessContact className='w-10 h-10'/>
            <NavLink to="/" className='text-xl text-purple-700 font-bold'>Contact Api</NavLink>
        </div>
        <div className='flex space-x-3'>
            <NavLink to="/signup" className='py-1 px-2.5 border bg-purple-700 text-white rounded hover:bg-purple-600 text-sm transition-all duration-200 shadow hover:border-0'>
                Sign Up
            </NavLink>
            <NavLink to="/signin" className='py-1 px-2.5 border bg-purple-700 text-white rounded hover:bg-purple-600 text-sm transition-all duration-200 shadow hover:border-0'>
                Sign In
            </NavLink>
        </div>
    </div>
  )
}

export default Navbar
