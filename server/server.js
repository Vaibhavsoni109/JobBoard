import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import morgan from "morgan"
import bodyParser from "body-parser"
import xss from "xss-clean"
import mongooseSanitize from "express-mongo-sanitize"
import dbConnection from "./dbConfig/dbConnection.js"

const port=process.env.PORT||5000;

dotenv.config();
 const app=express();

 

 //MONGODB COnnection

 dbConnection();

 //MiddleNames '
 app.use(cors())
 app.use(xss)
 app.use(bodyParser.json())
 app.use(bodyParser.urlencoded({ extended: true }));
 app.use(mongooseSanitize())
 app.use(express.urlencoded({ extended: true }));
 app.use(express.json({limit:"10mb"}));


 app.get('/',(req,res)=>
{
    res.send("helllo world")
})
 
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })