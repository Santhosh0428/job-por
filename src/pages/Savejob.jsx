import { savedJob } from '@/api/apijobs'
import JobCard from '@/components/Job-card'
import useFetch from '@/hooks/Fetch'
import { useUser } from '@clerk/clerk-react'
import React, { useEffect } from 'react'
import { BarLoader } from 'react-spinners'


const Savejob = () => {
  const {isLoaded}=useUser();


  const {loading:loadSave,
    data:savedJobs,
    fn:fnSavedJobs,
  }=useFetch(savedJob);

  useEffect(()=>{
    if(isLoaded) fnSavedJobs();

  },[isLoaded]);

  if(!isLoaded || loadSave){
    return <BarLoader className='mb-4' width={"100%"} color='aquamarine' />
  }


  return (
    <div>
      <h1 className='gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8 '>
        Saved Jobs
      </h1>
      {loadSave === false && (
    <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {savedJobs?.length ? (
        savedJobs.map((saved)=>{
          return  <JobCard key={saved.id} job={saved.job} savedIn={true} onJobSaved={fnSavedJobs}

           />

        })

      ):(<div>Jobs are not Saved</div>)}

    </div>
    )}

    </div>
  )
}

export default Savejob
