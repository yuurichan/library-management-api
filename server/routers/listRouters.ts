import express from "express";
import ListController from "../controllers/listControllers";
import { auth, authAdmin } from "../middlewares/auth";

const router = express.Router();

router.get('/getds_nguoidung', auth, ListController.getDS_NguoiDung);
router.get('/getds_tacgia', auth, ListController.getDS_TacGia);
router.get('/getds_theloai', auth, ListController.getDS_TheLoai);
router.get('/getds_sach', auth, ListController.getDS_Sach);
router.get('/getds_nxb', auth, ListController.getDS_NhaXuatBan);
router.get('/getds_xbsach', auth, ListController.getDS_XuatBanSach);
router.get('/getds_pm', auth, ListController.getDS_PhieuMuon);

export default router;