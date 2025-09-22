import { Request, Response } from "express";
import { alertcategory } from "../services/AlertCategory";

export const getallalertcategories = async (req: Request, res: Response) => {
    try {
        console.log("Controller hit!");
        const categories = await alertcategory.findAll();
        console.log("Categories fetched:", categories);
        res.status(200).json({
            success: true,
            message: "Alert categories fetched successfully",
            data: categories,
        });
    } catch (err) {
        console.error("Error in getallalertcategories:", err);
        res.status(500).json({ success: false, message: 'Something went wrong' });
    }
};
