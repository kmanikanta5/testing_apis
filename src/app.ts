import express from "express";
import userroutes from "./routes/userroutes";
const app=express();
app.use(express.json());
app.use("/api",userroutes);
app.listen(3000,()=>{
    console.log("server is connected to port 3000");
})