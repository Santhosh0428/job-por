import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from './ui/drawer';
import { Button } from './ui/button';
import { Input } from './ui/input';
import useFetch from '@/hooks/Fetch';
import { addNewCompany } from '@/api/companyapi';
import { BarLoader } from 'react-spinners';
const schema=z.object({
    name:z.string().min(1,{message:"Company name is required"}),
    resume:z.any().refine(file=>file[0] && (file[0].type === "image/png"
        || file[0].type === "image/jpeg"
    ),{message:"Only Images are  allowed"} ),

});
const Add = ({fetchCompanies}) => {
    const {
        register,handleSubmit,formState:{errors},
    }=useForm({ 
        resolver:zodResolver(schema),

        
    });

    const {loading:loadAddCom,error:errorAddCom,data:dataAddCom,fn:fnAddCom}=useFetch(addNewCompany);



    const onSubmit=()=>{
        fnAddCom({
            ...data,
            logo:data.log[0],

        });

    };

    useEffect(()=>{
        if(dataAddCom?.length>0) fetchCompanies();

    },[loadAddCom])
  return (
    <Drawer>
  <DrawerTrigger>
    <Button type="button" size="sm" variant="secondary">
        Add Company

    </Button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Add anew company</DrawerTitle>
      <DrawerDescription>This action cannot be undone.</DrawerDescription>
    </DrawerHeader>
    <form className='flex gap-2 p-4 pb-0'>
        <Input placeholder="Company name" {...register("name")} />
        <Input type="file" accept="image/*" classname="file:text-gray-600" {...register("logo")} />
        <Button type="button" onclick={handleSubmit(onSubmit)} variant="red" classname="w-40">
            Add
        </Button>
   
    </form>
    {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
    {errors.logo && <p className='text-red-500'>{errors.logo.message}</p>}

    {errorAddCom?.message && (<p className='text-red-500'>{errorAddCom?.message}</p>)}
    {loadAddCom && <BarLoader width={"100%"} color="aquamarine" />}





    <DrawerFooter>
      <DrawerClose asChild>
        <Button variant="secondary" type="button">Cancel</Button>
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>

  )
    
}

export default Add
