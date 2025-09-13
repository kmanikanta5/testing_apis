import { Request, Response } from "express";
import{ UserService }from "../services/User.Services";

export class UserController {
    static async getUsers(req: Request, res: Response) {
        try {
            const userId = Number(req.query.userId) || 1; // Example: your logged-in user ID
            const mode = (req.query.mode as "list" | "download") || "list";
            const data = await UserService.ManageCustomerUsersDataByAccountAssignment(
                userId,
                req.query,
                mode
            );

            if (mode === "download") {
                res.setHeader(
                    "Content-Disposition",
                    `attachment; filename=${data.filename}`
                );
                res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
                return res.send(data.buffer);
            }

            res.json(data);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
     }
    }
}
export const getaccountsbyuserid=async(req:Request,Res:Response)=>{
 try{
    const userid=Number(req.params.userid)
    if (isNan(userid))
 }
 }