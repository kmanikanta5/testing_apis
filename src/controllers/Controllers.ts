import {Request,Response} from "express";
import { convertBigInt } from "../Utilities/BigInt";
import prisma from "../config/DataBase.Config";
import { alertcategory } from "../services/AlertCategory";
export const getAllalerttemplates = async (req:Request, res:Response) => {
    try {
        const categories = await alertcategory.findAll();
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
export const createAlerttemplates=async(req:Request,res:Response)=>{
    try{
        console.log("api hit ")
        const categories=await alertcategory.create(req.body);
        const formatted=convertBigInt(categories);
        res.json({
            success:true,
            message:"Data Created successfully",
            data:formatted
        });
    }catch(error){
        console.log("error in createalerttemplates",error)
        res.status(500).json({success:false,message:"server error"});
    }
};
export const updateAlerttemplates =async(req:Request,res:Response)=>{
try{
    const {id}=req.params;
    const updated_data=await alertcategory.update("template_id",Number(id),req.body);
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
export const deleteAlerttemplates = async (req: Request, res: Response) => {
    try {
        console.log("API hit");
        const { id } = req.params;
        const deletedData = await alertcategory.delete("template_id",Number(id));
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