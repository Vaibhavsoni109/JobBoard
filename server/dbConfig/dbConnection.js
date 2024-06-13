import mongoose from "mongoose";
 const dbConnection =async()=>
    {
        try {
           const dbConnection=await mongoose.connect(process.env.MONGOURI)
           console.log("connected succesfully")
        } catch (error) {
            console.log(error)
        }
    }
    export default dbConnection;