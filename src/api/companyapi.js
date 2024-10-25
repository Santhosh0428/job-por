import subaclient from "@/Utils/base";

export async function getCompanies(token){
    const supaBase=await subaclient(token);

        const {data,error}=await supaBase.from("companies").select("*");

        if(error){
            console.error("Error while Fetching Companies",error);
            return null;
        }
        return data;

}
export async function addNewCompany(token,companyData){
    const supaBase=await subaclient(token);
    const random=Math.floor(Math.random()*90000);
    const file=`logo-${random}-${companyData.name}`;

   const {error:storageError}= await supaBase.storage.from("company-logo").upload(file,companyData.logo);
          
        if(storageError){
            console.error("Error Uploading Company Logo",storageError);
            return null;
        }
        const logo=`${supabaseUrl}/storage/v1/object/public/company-logo/${file}`;



        const {data,error}=await supaBase.from("companies")
        .insert([{
            name:companyData.name,
            logo,
        },])
        .select();

        if(error){
            console.error("Error Submitting",error);
            return null;
        }
        return data;

}


