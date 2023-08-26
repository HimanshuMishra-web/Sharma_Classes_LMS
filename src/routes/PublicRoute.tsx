import React from 'react';

import {Navigate, Outlet} from 'react-router-dom'

const useAuth=()=>{
  const user=localStorage.getItem('token')
  if(user){
    return true
  } else {
    return false
  }
}

const  PublicRoute=(props) =>{

  const auth=useAuth()

  if(auth){
   return <Navigate to="/dashboard"/>
  }else{
   return <Outlet/>
  }
}

export default PublicRoute;