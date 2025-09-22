import express from "express";
import userroutes from "./routes/userroutes";
const app = express();
app.use(express.json());
app.use("/api/alert",userroutes);
export default app;

