import CreateApplications from '@/components/create';
import CreatedJob from '@/components/createJob';
import { useUser } from '@clerk/clerk-react'
import React from 'react'
import { BarLoader } from 'react-spinners';

const Myjob = () => {

  const {user,isLoaded}=useUser();

  if(!isLoaded)
  {
    return <BarLoader className='mb-4' width={"100%"} color='aquamarine' />
  }

  return (
    <div>
      <h1 className='gradient-title font-extrabold text-5xl sm:text-7xl text-center pb-8'>
        {user?.unsafeMetadata?.role === "candidate" 
         ? "My Application" : "MyJobs"
        }

      </h1>
      {user?.unsafeMetadata?.role === "candidate" ? (
        <CreateApplications />

        
      ) : (
        <CreatedJob />

      )}

    </div>
  )
}

export default Myjob
