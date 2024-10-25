import subaclient from "@/Utils/base";

export async function getJobs(token,{location,company_id,searchQuery}){
    const supaBase=await subaclient(token);

    let query=supaBase.from("jobs").select("*,company:companies(name,logo),saved:saved_jobs(id)");
    if(location)
    {
        query=query.eq("location",location);
    }
    if(company_id)
        {
            query=query.eq("company_id",company_id);
        }
    if(searchQuery)
        {
            query=query.ilike("title",`%${searchQuery}`);
        }    
        


    const {data,error}=await query;
    if(error){
        console.error("Error Fetching jobs in a second:",error);
        return null;
        
    }
    return data;



}


export async function saveJob(token,{alreadySaved},saveData){
    const supaBase=await subaclient(token);


    if(alreadySaved){
        const {data,error:deleteError}=await supaBase.from("saved_jobs").delete()
        .eq("job_id",saveData.job_id);

        if(deleteError){
            console.error("Error Delete jobs in a second:",error);
            return null;
            
        }
        return data;
    }
    else{
        const {data,error:insertError}=await supaBase.from("saved_jobs").insert([saveData])
        .select();

        if(insertError){
            console.error("Error Fetching jobs in a second:",error);
            return null;
            
        }
        return data;

        

    }

}

export async function getSingle(token,{job_id}){
    const supaBase=await subaclient(token);

        const {data,error}=await supaBase.from("jobs")
        .select("*,company:companies(name,logo),applications:application(*)")
        .eq("id",job_id)
        .single();

        if(error){
            console.error("Error while Fetching Jobs",error);
            return null;
        }
        return data;

}

export async function updateStatus(token,{job_id},isOpen){
    const supaBase=await subaclient(token);

        const {data,error}=await supaBase.from("jobs")
        .update({isOpen})
        .eq("id",job_id)
        .select();

        if(error){
            console.error("Error Updating Jobs",error);
            return null;
        }
        return data;

}
export async function postJob(token,jobData){
    const supaBase=await subaclient(token);

        const {data,error}=await supaBase.from("jobs")
        .insert([jobData])
        .select();

        if(error){
            console.error("Error Posting Job",error);
            return null;
        }
        return data;

}

export async function savedJob(token){
    const supaBase=await subaclient(token);

        const {data,error}=await supaBase.from("saved_jobs")
        .select("*,job:jobs(*,company:companies(name,logo))");

        if(error){
            console.error("Error Fetching ",error);
            return null;
        }
        return data;

}

export async function getMyJob(token,{recruiter_id}){
    const supaBase=await subaclient(token);

        const {data,error}=await supaBase.from("jobs")
        .select("*,company:companies(name,logo))")
        .eq("recruiter_id",recruiter_id);

        if(error){
            console.error("Error Fetching Jobs",error);
            return null;
        }
        return data;

}

export async function deleteJob(token,{job_id}){
    const supaBase=await subaclient(token);

        const {data,error}=await supaBase.from("jobs")
        .delete()
        .eq("id",job_id)
        .select();

        if(error){
            console.error("Error Deleting Jobs",error);
            return null;
        }
        return data;

}