import { BaseCrudService } from "../services/BaseService";
import { Add_alert_recipients } from "./Alert_Templates.Controllers";
import { AlertRecipients } from "../services/Alert_Recipients";
import { convertBigInt } from "../Utilities/BigInt";
import { Request,Response } from "express";
//get api for alert recipients model
export const getData_alertRecipients=async (req:Request,res:Response)=>{
try{
  const get_data = await AlertRecipients.findAll();
  const formatted_data=convertBigInt(get_data)
  res.json({success:true,message:"data fetched successfully",data:formatted_data});
}
catch(error){
    console.log("error in this Api",error)
    res.status(500).json({message:"server error"});
  }
};
