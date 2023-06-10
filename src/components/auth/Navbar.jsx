import React, { useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAuth, removeAuth } from '../../store/slices/authSlice'
import { useLogoutUserMutation } from '../../store/api/auth'


const Navbar = () => {
    const dispatch = useDispatch()
    const nav = useNavigate()
    const [logoutUser] = useLogoutUserMutation()
    useEffect(()=>{
        dispatch(getAuth())
    },[])
    const {auth:{user,token}} = useSelector((state) => state)
    const logout = () => {
        logoutUser(token)
        dispatch(removeAuth())
        nav('/')
    }
  return (
    <div className='py-1.5 mt-3 px-3 justify-between  shadow-lg flex items-center'>
        <div className='flex items-center space-x-2'>
            <NavLink to="/dashboard" className='text-2xl uppercase text-purple-700 font-bold'>Dashboard</NavLink>
        </div>
        <div className='flex space-x-3 items-center'>
            <div className='flex flex-col'>
                <h1 className='text-sm'>{user?.name}</h1>
                <h1 className='text-sm'>{user?.email}</h1>
            </div>
            <button onClick={logout} className='py-1 px-2 border bg-red-700 text-white rounded hover:bg-red-600 text-sm transition-all duration-200 shadow hover:border-0'>
                logout
            </button>
        </div>
    </div>
  )
}

export default Navbar
