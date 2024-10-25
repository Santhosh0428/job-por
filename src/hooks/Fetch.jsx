import { useSession } from "@clerk/clerk-react";
import { useState } from "react";

const useFetch=(cb,options={})=>{
    const [data,setData]=useState(undefined);
    const [loading,setALoading]=useState(null);
    const [error,setError]=useState(null);
    const {session}=useSession();

    const fn=async(...args)=>{
        setALoading(true);
        setError(null);
try {
    const supabaseAccessToken=await session.getToken({
        template:"supabase",
      });
     const response=await cb(supabaseAccessToken,options,...args);
     setData(response);
     setError(null);

    
} catch (error) {
    setError(error)    
}finally{
    setALoading(false);

}



    };
    return {fn,data,loading,error};

};
export default useFetch;