import express from "express";
import * as passwordManagerController from "../controllers/passwordManagerController";

const router = express.Router();

router.post("/password-cards", passwordManagerController.addPassword);
router.get("/password-cards", passwordManagerController.fetchPasswords);
router.put("/password-cards/:id", passwordManagerController.updatePassword);
router.delete("/password-cards/:id", passwordManagerController.deletePassword);

export default router;