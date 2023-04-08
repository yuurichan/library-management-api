import express from "express";
import UserController from "../controllers/userControllers";
import { auth, authAdmin } from "../middlewares/auth";

const router = express.Router();

router.get("/layThongTinNguoiDung/:id", auth, UserController.layThongTinNguoiDung);
router.post('/add_thuthu', auth, authAdmin, UserController.addThuThu);
router.put("/update_user", auth, UserController.updateUser);
router.put("/change_pwd", auth, UserController.changePwd);
router.put("/disable_user/:id", auth, authAdmin, UserController.disableUser);
router.get("/get_userrole/:id", auth, authAdmin, UserController.layThongTinNguoiDung);

export default router;
// Hàm update cho value mặc định là gtri cũ, vì trong MySQL nếu cập nhật nó cập nhật hết
// Hàm chỉnh sửa mật khẩu thì có gì check input mk cũ bên f-e, nếu đúng mới cho gọi API, ko thì thôi