import express from "express";
import statisticsController from "../controllers/statisticsController";
import { auth, authAdmin, authLibrarian } from "../middlewares/auth";

const router = express.Router();

router.get('/tacgia', auth, authLibrarian, statisticsController.getStat_byTacGia);
router.get('/theloai', auth, authLibrarian, statisticsController.getStat_byTheLoai);
router.get('/c_nxb', auth, authLibrarian, statisticsController.getStat_copiesByNXB);
router.get('/c_name', auth, authLibrarian, statisticsController.getStat_copiesByName);
router.get('/pm_chuatra', auth, authLibrarian, statisticsController.getStat_PMChuaTra);
router.get('/pm_total', auth, authLibrarian, statisticsController.getStat_PM);

export default router;