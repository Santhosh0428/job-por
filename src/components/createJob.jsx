import { getMyJob } from '@/api/apijobs';
import useFetch from '@/hooks/Fetch';
import { useUser } from '@clerk/clerk-react'
import React, { useEffect } from 'react'
import { BarLoader } from 'react-spinners';
import JobCard from '@/components/Job-card';


const CreatedJob = () => {
    const {user} =useUser();
    const {loading:loadCreate,
        data:createJob,
        fn:fnCreate,
    }=useFetch(getMyJob,{
        recruiter_id:user.id,
    });

    useEffect(()=>{
        fnCreate();
    },[]);

    if(loadCreate){
        return <BarLoader className='mb-4' width={"100%"} color='aquamarine' />
    }


  return (
    <div>
         <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {createJob?.length ? (
        createJob.map((job)=>{
          return  <JobCard key={job.id} job={job} onJobSaved={fnCreate}
          isMyJob

           />

        })

      ):(<div>No Jobs Found try next time</div>)}

    </div>
      
    </div>
  )
}

export default CreatedJob
