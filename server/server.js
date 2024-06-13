import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import morgan from "morgan"
import bodyParser from "body-parser"
import xss from "xss-clean"
import mongooseSanitize from "express-mongo-sanitize"

const port=process.env.PORT||5000;

dotenv.config();
 const app=express();
 app.use(express.json());
 app.use(express.urlencoded({ extended: true }));

 app.get('/',(req,res)=>
{
    res.send("helllo world")
})
 
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })