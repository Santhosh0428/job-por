import subaclient from "@/Utils/base";

export async function apply(token,jobData){
    const supaBase=await subaclient(token);

    const random=Math.floor(Math.random()*90000);
    const file=`resume-${random}-${jobData.candidate_id}`;

   const {error:storageError}= await supaBase.storage.from("resume").upload(file,jobData.resume);
          
        if(storageError){
            console.error("Error uploading resume",storageError);
            return null;
        }
        const resume=`${supabaseUrl}/storage/v1/object/public/resume/${file}`;



        const {data,error}=await supaBase.from("application")
        .insert([{
            ...jobData,resume},
        ])
        .select();

        if(error){
            console.error("Error Submitting Application",error);
            return null;
        }
        return data;

}


export async function updateApplication(token,{job_id},status){
    const supaBase=await subaclient(token);

        const {data,error}=await supaBase.from("application")
        .update({status})
        .eq("job_id",job_id)
        .select();

        if(error || data.length ===0){
            console.error("Error Updating Application Status",error);
            return null;
        }
        return data;

}


export async function getApp(token,{user_id}){
    const supaBase=await subaclient(token);

        const {data,error}=await supaBase.from("application")
               .select("*,job:jobs(title,company:companies(name))")
               .eq("candidate_id",user_id);

        if(error){
            console.error("Error Updating Application Status",error);
            return null;
        }
        return data;

}