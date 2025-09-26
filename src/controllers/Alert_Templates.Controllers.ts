import {Request,Response} from "express";
import { convertBigInt } from "../Utilities/BigInt";
import prisma from "../config/DataBase.Config";
import { AlertCategory } from "../services/AlertCategory";
import { RecordWithTtl } from "dns";
export const getAllAlertCategory = async (req:Request, res:Response) => {
    try {
        const categories = await AlertCategory.findAll();
        const formatted = convertBigInt(categories);
        res.json({
            success: true,
            message: "Alert categories fetched successfully",
            data: formatted
        });
    } catch (error) {
        console.error("Error in getallalertcategories:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};
export const createAlertCategory=async(req:Request,res:Response)=>{
    try{
        console.log("api hit ")
        const categories = await AlertCategory.create(req.body);
        const formatted=convertBigInt(categories);
        res.json({
            success:true,
            message:"Data Created successfully",
            data:formatted
        });
    }catch(error){
        console.log("error in createAlertCategory",error)
        res.status(500).json({success:false,message:"server error"});
    }
};
export const updateAlertCategory =async(req:Request,res:Response)=>{
try{
    const {id}=req.params;
    const updated_data = await AlertCategory.update("template_id",Number(id),req.body);
    const formatted=convertBigInt(updated_data);
    res.json({
        success:true,
        message:"data updated successfully",
        data:formatted
    });
} catch(error){
    console.error("Error in updateAlertCategory:", error);
    res.status(500).json({ success: false, message: "Server Error" });
}
};
export const deleteAlertCategory = async (req: Request, res: Response) => {
    try {
        console.log("API hit");
        const { id } = req.params;
        const deletedData = await AlertCategory.delete("template_id",Number(id));
        const formatted = convertBigInt(deletedData);
        res.json({
            success: true,
            message: "Alert category deleted successfully",
            data: formatted
        });

    } catch (error) {
        console.error("Error in deleteAlertCategory:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};
export const Add_alert_recipients =async(req:Request,res:Response)=>{
    const adding_data=req.body();

}