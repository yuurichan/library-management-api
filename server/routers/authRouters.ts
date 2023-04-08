import express from "express";
import AuthController from "../controllers/authControllers";

import { auth, authAdmin } from "../middlewares/auth";

const router = express.Router();
router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.get("/refresh_token", AuthController.refreshToken);
router.get("/logout", AuthController.logout);
router.get("/layThongTinNguoiDung/:id", auth, AuthController.layThongTinNguoiDung);

router.post("/add_user", auth, authAdmin, AuthController.addUser);
router.put("/update_user/:id", auth, authAdmin, AuthController.updateUser);
router.put("/disable_user/:id", auth, authAdmin, AuthController.disableUser);

export default router;