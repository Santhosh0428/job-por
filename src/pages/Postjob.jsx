import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { State } from 'country-state-city';
import useFetch from '@/hooks/Fetch';
import { getCompanies } from '@/api/companyapi';
import { useUser } from '@clerk/clerk-react';
import { BarLoader } from 'react-spinners';
import { Navigate, useNavigate } from 'react-router-dom';
import MDEditor from '@uiw/react-md-editor';
import { Button } from '@/components/ui/button';
import { postJob } from '@/api/apijobs';
import Add from '@/components/Add';

const schema=z.object({
  title:z.string().min(1,{message:"Title is Required"}),
  description:z.string().min(1,{message:"Description is required"}),
  location:z.string().min(1,{message:"Select a location"}),
  company_id:z.string().min(1,{messsage:"Select or add new Company"}),
  requirements:z.string().min(1,{message:"Requirements are Required"}),
});
const Postjob = () => {
  const {isLoaded,user}=useUser();
  const navigate=useNavigate();
 const {register,control,handleSubmit,formState:{errors}}= useForm({
    defaultValues:{
      location:"",
      company_id:"",
      requirements:"",

    },
    resolver:zodResolver(schema),
  });

  const {fn:fnComJobs,data:companies,loading:loadingCompanies}=useFetch(getCompanies);
  useEffect(()=>{
    if(isLoaded)
      fnComJobs();
  },[isLoaded]);

  const {loading:loadingCreate,error:errorCreateJob,data:dataCreateJob,
    fn:fnCreateJob,}=useFetch(postJob);


    const onSubmit=(data)=>{
      fnCreateJob({
        ...data,
        recruiter_id:user.id,
        isOpen:true,
      });
    };

    useEffect(()=>{
      if(loadingCreate?.length>0)navigate("/jobs");
    },[loadingCreate])
  


  if(!isLoaded || loadingCompanies)
  {
    return <BarLoader className='mb-4' width={"100%"} color='aquamarine' />;
  }
  if(user?.unsafeMetadata?.role!=="recruiter"){
    return <Navigate to="/jobs/" />;
  }


  


  return (
    <div>
      <h1 className='gradient-title font-extrabold text-5xl sm:text-7xl text-center pb-8'>
        Post a Job
      </h1>
      <form className='flex flex-col gap-4 p-4 pb-0' onSubmit={handleSubmit(onSubmit)}>
        <Input placeholder="Job Title" {...register("title")} />
        {errors.title && <p className='text-red-600'>{errors.title.message}</p>}
      <Textarea placeholder="Job Description" {...register("description")} />
      {errors.description && (<p className='text-red-600'>{errors.description.message}</p>)}

<div className='flex gap-4 items-center'>
<Controller
          name="location"
          control={control}
          render={({field})=>(
                  
      <Select 
      value={field.value} onValueChange={field.onChange}
      >
      <SelectTrigger>
        <SelectValue placeholder="Choose Location" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {State.getStatesOfCountry("IN").map(({name})=>{
            return(
          <SelectItem key={name} value={name}>{name}</SelectItem>
            );
        })}   
        </SelectGroup>
      </SelectContent>
    </Select>

          )}
          />
  
  <Controller
          name="company_id"
          control={control}
          render={({field})=>(
                  
    <Select value={field.value} onValueChange={field.onChange}
      >
      <SelectTrigger>
        <SelectValue placeholder="Filter by Company">
          {field.value?companies?.find((com)=>com.id === Number(field.value))?.name : "Company"}
        </SelectValue>
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          {companies?.map(({name,id})=>{
            return(
              <SelectItem key={name} value={id}>
                {name}

              </SelectItem>
            )

          })} 
        </SelectGroup>
      </SelectContent>
    </Select>
          )} />

          <Add fetchCompanies={fnComJobs} />


    
    </div>
    {errors.location && (
      <p className='text-red-500'>{errors.location.message}</p>
    )}
    {errors.company_id && (
      <p className='text-red-500'>{errors.company_id.message}</p>
    )}

<Controller
          name="requirements"
          control={control}
          render={({field})=>(
    <MDEditor  
          value={field.value} onChange={field.onChange}/>)}
          />
           {errors.requirements && (
      <p className='text-red-500'>{errors.requirements.message}</p>
    )}
        {errorCreateJob?.message && (
      <p className='text-red-500'>{errorCreateJob?.message}</p>
    )}
    

    {loadingCreate && <BarLoader width={"100%"} color='aquamarine' />}

    <Button variant="aqua" type="submit" size="lg" className="mt-2">Submit</Button>



    </form>



      
    </div>
  )
}

export default Postjob
