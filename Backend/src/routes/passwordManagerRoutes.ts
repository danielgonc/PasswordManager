import express from "express";
import * as passwordManagerController from "../controllers/passwordManagerController";

const router = express.Router();

router.post("/add-password", passwordManagerController.addPassword);
router.get("/*", passwordManagerController.fetchPasswords);

export default router;