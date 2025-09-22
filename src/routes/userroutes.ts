import { Router } from "express";
import { getallalertcategories } from "../controllers/usercontrollers";

const router = Router();

router.get("/get", getallalertcategories);

export default router;
