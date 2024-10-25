import { getApp } from '@/api/apiApplication';
import useFetch from '@/hooks/Fetch';
import { useUser } from '@clerk/clerk-react'
import React from 'react'
import { useEffect } from 'react';
import { BarLoader } from 'react-spinners';
import ApplicationCard from '@/components/Applycard';


const CreateApplications = () => {
    const {user}=useUser();
    const {loading:loadApp,
        data:application,
        fn:fnApp,
    }=useFetch(getApp,{
        user_id:user.id,
    })
    useEffect(()=>{
        fnApp();
    },[]);

    if(loadApp)
    {
        return <BarLoader className='mb-4' width={"100%"} color='aquamarine' />
    }


  return (
    <div className='flex flex-col gap-2'>
         {application.map((app)=>{
                return ( <ApplicationCard
                      key={app.id} application={app} isCandidate />
                );

              })}
      
    </div>
  )
}

export default CreateApplications
