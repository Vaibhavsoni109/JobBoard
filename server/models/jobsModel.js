import { json } from "body-parser";
import mongoose, { Schema } from "mongoose";


const jobSchema=new Schema({
    comapany:{
        type:Schema.Types.ObjectId,ref:"Companies"
    },
    jobTitle:{
        type:String,
        require:[true, "Job Title is require"]
    }
})