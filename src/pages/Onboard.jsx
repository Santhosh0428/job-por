import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/clerk-react'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { BarLoader } from 'react-spinners';

const Onboard = () => {

  const {user,isLoaded}=useUser();
  const navigate=useNavigate()

  const handleSelection=async(role)=>{
    await user.update({
      unsafeMetadata:{role},
    })
    .then(()=>{
      navigate(role=='recruiter' ? '/post' : '/jobs');
    })
    .catch((err)=>{
      console.error("Error updating role:",err);
    });
  };
    
  useEffect(()=>{
    if(user?.unsafeMetadata.role)
    {
      navigate(
      user.unsafeMetadata.role=='recruiter' ? '/post' : '/jobs');
    }
  },[user]);

  



  if(!isLoaded)
  {
    return <BarLoader className='mb-4 ' width={"100%"} color="aquamarine" />
  }

  
  return (
    <div className='flex flex-col items-center justify-center mt-32'>
        <h2 className='gradient-title font-extrabold text-7xl sm:text-8xl tracking-tighter'>
          I am ....

        </h2>
        <div className='mt-16 grid grid-cols-2 gap-4 w-full md:px-40'>
          <Button variant='aqua' className='h-36 text-2xl' onClick={()=>handleSelection("candidate")}>Candidate</Button>
          <Button variant='red' className='h-36 text-2xl' onClick={()=>handleSelection("recruiter")}>Recruiter</Button>


        </div>
    </div>
  )
}

export default Onboard

