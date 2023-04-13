import express from "express";
import statisticsController from "../controllers/statisticsController";
import { auth, authAdmin } from "../middlewares/auth";

const router = express.Router();

router.get('/tacgia', auth, statisticsController.getStat_byTacGia);
router.get('/theloai', auth, statisticsController.getStat_byTheLoai);
router.get('/c_nxb', auth, statisticsController.getStat_copiesByNXB);
router.get('/c_name', auth, statisticsController.getStat_copiesByName);
router.get('/pm_chuatra', auth, statisticsController.getStat_PMChuaTra);
router.get('/pm_total', auth, statisticsController.getStat_PM);

export default router;