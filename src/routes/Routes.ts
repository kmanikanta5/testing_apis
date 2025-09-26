import { Router } from "express";
const router = Router();       
import { createAlertCategory, updateAlertCategory, deleteAlertCategory, getAllAlertCategory } from "../controllers/Alert_Templates.Controllers";
import { getData_alertRecipients } from "../controllers/Alert_Recipients.controllers";
router.get("/get-data", getAllAlertCategory)
router.post("/create-data", createAlertCategory)
router.put("/update-data/:id", updateAlertCategory); 
router.delete("/delete-data/:id", deleteAlertCategory); 
//routes for alert recipients controller
router.get("/get-data",
    withValidation([validateAccountIdParam]),
    asyncHandler(getData_alertRecipients)
)

export default router;
