import { Router } from "express";
const router = Router();       
import { getAllalerttemplates, createAlerttemplates, updateAlerttemplates, deleteAlerttemplates } from "../controllers/Controllers";
router.get("/get-data", getAllalerttemplates)
router.post("/create-data",createAlerttemplates)
router.put("/update-data/:id", updateAlerttemplates); 
router.delete("/delete-data/:id", deleteAlerttemplates); 
export default router;
