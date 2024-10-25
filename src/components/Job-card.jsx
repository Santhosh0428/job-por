import { useUser } from '@clerk/clerk-react';
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Heart, MapPinIcon, Trash2Icon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { deleteJob, saveJob } from '@/api/apijobs';
import useFetch from '@/hooks/Fetch';
import { BarLoader } from 'react-spinners';

const JobCard = ({
    job,isMyJob=false,
    savedIn=false,
    onJobSaved=()=>{},
}
) => {
    const [saved,setSaved]=useState(savedIn);

    
  const {fn:fnSaveJob,data:Savejobs,loading:loadingSaveJobs}=useFetch(saveJob,{
    alreadySaved: saved,

  });
    const {user}=useUser();

    const handleSaveJob=async()=>{
        await fnSaveJob({
            user_id:user.id,
            job_id:job.id,
        });
        onJobSaved();
    }
    const {loading:loadDel,fn:fnDel}=useFetch(deleteJob,{
        job_id:job.id,
    });

    const handleDel=async()=>{
        await fnDel();
        onJobSaved();
    };



    useEffect(()=>{
        if(Savejobs!==undefined)setSaved(Savejobs?.length>0);

    },[Savejobs]);



 return (<Card className="flex flex-col">
    {loadDel && ( 
        <BarLoader className='mt-4' width={"100%"} color='aquamarine' />

    )}
    <CardHeader>
        <CardTitle className='flex justify-between font-bold'>
        {job.title}
        {!isMyJob && (<Trash2Icon fill='teal' size={18} className='text-teal-600 cursor-pointer'
         onClick={handleDel} /> 
    )}
    </CardTitle>
    </CardHeader>
    <CardContent className="flex flex-col gap-4 flex-1">
        <div className="flex justify-between">
            {job.company && <img src={job.company.logo} className='h-6'/>}
            <div className="flex gap-2 items-center ">
                <MapPinIcon size={15} />{job.location}
            </div>
        </div>
        <hr />
        {job.description?.substring(0,job.description.indexOf("."))}
    </CardContent>
    <CardFooter className="flex gap-2">
        <Link to={`/job/${job.id}`}>
        <Button variant="secondary" className="w-full">
            More Details
        </Button>

        </Link>
        {!isMyJob && (
            <Button onClick={handleSaveJob} variant="outline" className="w-15" disabled={loadingSaveJobs}>
                
                {saved? (
                <Heart size={20} stroke="red" fill='red' />):(
                    <Heart size={20} />
                )
                }
            </Button>
        )}
    </CardFooter>

 </Card>
 )
    
};

export default JobCard;
