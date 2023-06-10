import Cookies from 'js-cookie';
import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'

const RouteGuard = ({children}) => {
   const token = Cookies.get('token')
    if(token){
        return children;
    }else{
       return  <Navigate to="/"/>
    }
}

export default RouteGuard
