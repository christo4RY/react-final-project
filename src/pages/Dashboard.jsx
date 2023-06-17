import React from 'react'
import Navbar from '../components/auth/Navbar';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {

  return (
    <div className='container mx-auto'>
        <Navbar/>
        <Outlet/>
    </div>
  )
}

export default Dashboard
