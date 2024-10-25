import { useUser } from '@clerk/clerk-react'
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';

const Proroute = ({children}) => {
   const {isSignedIn,user,isLoaded} =useUser();
   const {pathname}=useLocation();
   if(isLoaded && !isSignedIn && isSignedIn!==undefined)
   {
    return <Navigate to="/?sign-in=true" />;
   }
   //
   if(user!==undefined && !user?.unsafeMetadata?.role && pathname!=='/onboard')
    return <Navigate to='/onboard' />




   return children;



};

export default Proroute
