import express from "express";
import AuthController from "../controllers/authControllers";

import { auth, authAdmin } from "../middlewares/auth";

const router = express.Router();
router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.get("/refresh_token", AuthController.refreshToken);
router.get("/logout", AuthController.logout);


export default router;