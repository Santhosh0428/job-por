
import { getJobs } from '@/api/apijobs';
import { getCompanies } from '@/api/companyapi';
import JobCard from '@/components/Job-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import useFetch from '@/hooks/Fetch';
import { useUser } from '@clerk/clerk-react';
import { State } from 'country-state-city';
import React, { useEffect, useState } from 'react'
import { BarLoader } from 'react-spinners';


const Joblist = () => {
  const [searchQuery,setSearchQuery]=useState("");
  const [location,setLocation]=useState("");
  const [company_id,setCompany_id]=useState("");

  const {isLoaded}=useUser();

  const {fn:fnJobs,data:jobs,loading:loadingJobs}=useFetch(getJobs,{
    location,company_id,searchQuery,
  });

const {fn:fnComJobs,data:companies}=useFetch(getCompanies);

   
 
  useEffect(()=>{
    if(isLoaded)
      fnComJobs();

  },[isLoaded]);
  
  useEffect(()=>{
    if(isLoaded)
      fnJobs();

  },[isLoaded,location,company_id,searchQuery]);

  const search=(e)=>{
    e.preventDefault();
    let formData=new FormData(e.target);
    const query=formData.get("search-query");
    if(query) setSearchQuery(query);
  }

  const clear=()=>{
    setCompany_id("");
    setLocation("");
    setSearchQuery("");

  };

  
  if(!isLoaded)
    {
      return <BarLoader className='mb-4 ' width={"100%"} color="aquamarine" />
    }
  
  return (<div>
    <h1 className='gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8' >Latest Jobs</h1>
    {/* */}

    <form onSubmit={search} className='h-14 flex w-full gap-2 items-center mb-3' > 
      <Input type="text" placeholder="Search jobs.." name="search-query" className="h-full flex-1 px-4 text-md"/>
      <Button type="submit" className="h-full sm:w-28" variant="aqua">
        Search
      </Button>
    </form>

    <div className='flex flex-col sm:flex-row gap-2'>
    <Select value={location} onValueChange={(value)=>setLocation(value)}>
      <SelectTrigger className="w-[180px]">
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

    <Select value={company_id} onValueChange={(value)=>setCompany_id(value)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Filter by Company" />
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
    <Button variant="red" className="sm:w-1/2" onClick={clear}>
      Clear Filters
    </Button>



    </div>

    {loadingJobs && (
      <BarLoader className='mb-4 ' width={"100%"} color="aquamarine" />

    )}
    {loadingJobs === false && (
    <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {jobs?.length ? (
        jobs.map((job)=>{
          return  <JobCard key={job.id} job={job} savedIn={job?.saved?.length>0}

           />

        })

      ):(<div>No Jobs Found try next time</div>)}

    </div>
    )}

  </div>
  );
  };
  

export default Joblist;
