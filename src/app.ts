import express from "express";
import userroutes from "./routes/Routes";
const app = express();
app.use(express.json());
app.use("/api/getalert",userroutes);
app.use("/api/createalert", userroutes);
app.use("/api/updatealert",userroutes);
app.use("/api/deletealert",userroutes);
export default app;

