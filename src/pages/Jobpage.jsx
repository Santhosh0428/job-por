import { getSingle, updateStatus } from '@/api/apijobs';
import Apply from '@/components/apply';
import ApplicationCard from '@/components/Applycard';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import useFetch from '@/hooks/Fetch';
import { useUser } from '@clerk/clerk-react'
import MDEditor from '@uiw/react-md-editor';
import { Briefcase, DoorClosed, DoorOpen, MapPinIcon } from 'lucide-react';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { BarLoader } from 'react-spinners';

const Jobpage = () => {
  const {isLoaded,user}=useUser();
  const {id}=useParams();

const {
  loading:loadingJob,
  data:job,
  fn:fnJob,
}=useFetch( getSingle,{
  job_id:id,

});

const {
  loading:HiringStatus,
  fn:fnHiringJob,
}=useFetch(updateStatus,{
  job_id:id,

});

const handleUpdate=(value)=>{
  const isOpen= value === "open";
  fnHiringJob(isOpen).then(()=>fnJob());
} 

useEffect(()=>{
  if(isLoaded) fnJob();

},[isLoaded]);

if(!isLoaded || loadingJob)
{
  return <BarLoader className='mb-4' width={"100%"} color="aquamarine"/>
}
  return (
    <div className='flex flex-col gap-8 mt-5'>
      <div className='flex flex-col-reverse gap-6 md:flex-row justify-between items-center'>
        <h1 className='gradient-title font-extrabold pb-3 text-4xl sm:text-6xl'>{job?.title}</h1>
        <img src={job?.company?.logo} className='h-12' alt={job?.title} />

      </div>
      <div className='flex justify-between'>
        <div className='flex gap-2'>
          <MapPinIcon />
          {job?.location}
        </div>
        <div className='flex gap-2'>
          <Briefcase />{job?.applications?.length} Applicants

        </div>
        <div className='flex gap-2'>
          {job?.isOpen? <><DoorOpen/>Open</> : <><DoorClosed/>Closed</>}
        </div>
      </div>
      {/* */}
      {!HiringStatus && <BarLoader width={"100%"} color='aquamarine' />}

      {job?.recruiter_id === user?.id && (
       <Select  onValueChange={handleUpdate}>
       <SelectTrigger className={`w-full ${job?.isOpen ? "bg-green-900" : "bg-red-900"}`}>
         <SelectValue placeholder={
          "Hiring Status" + (job?.isOpen ? "(Open)" : "(Close)")
         } />
       </SelectTrigger>
       <SelectContent>
           <SelectItem value="open">Open</SelectItem>
           <SelectItem value="closed">Closed</SelectItem>

       </SelectContent>
     </Select> ) 
       }



      <h2 className='text-2xl sm:text-3xl font-bold'>
        About the Job
      </h2>
      <p className='sm:text-lg'>
        {job?.description}
      </p>
      <h2 className='text-2xl sm:text-3xl font-bold'>
        What we are looking for 
      </h2>
      <MDEditor.Markdown
      source={job?.requirements}  className='bg-transparent sm:text-lg'
      />

      {/* */}
      {job?.recruiter_id !== user?.id  && (<Apply
      job={job} user={user} fetchJob={fnJob}
      applied={job?.application?.find((a)=>ap. candidate_id === user.id)}

       /> )}
       {
        job?.applications?.length>0 && job?.recruiter_id === user?.id &&  (
          <div className='flex flex-col gap-2'> 
            <h2 className='text-2xl sm:text-3xl font-bold'>
              Applications</h2>
              {job?.application.map(()=>{
                return (<ApplicationCard key={application.id} application={application} />
                );

              })}
               </div>

        )
       }


    </div>
  );
};

export default Jobpage;
