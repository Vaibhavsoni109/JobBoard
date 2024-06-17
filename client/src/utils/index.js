import axios from "axios";
const API_URl="http://loalhost:5000/api-v1";


export const API=axios.create({
    baseURL:API_URl,
    responseType:'json',

});


export const apiRequest=async({url,token,data,method})=>{
    try {
        const result=await API(url,{
            method:method || "GET",
            data:data,
            headers:{
                'Content-Type':"application/json",
                Authorization:token ? `Bearer ${token}` : '',

            }
        })
        
    } catch (error) {
        const err=error.response.data;
        console.log(error);
        return {status:err.success,message:err.message};
    }
}


export const handleFile=async(uploadFile)=>
    {
        const formData=new FormData();
        formData.append("file",uploadFile);
        formData.append("upload_preset","jobfinder");
    }