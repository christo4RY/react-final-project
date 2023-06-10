import React from 'react'
import Navbar from '../components/partials/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/partials/Footer'

const App = () => {
  return (
    <div className=' container mx-auto'>
      <Navbar/>
      <div className='mt-7 px-10 sm:px-3'>
        <Outlet/>
      </div>
      <Footer/>
    </div>
  )
}

export default App
