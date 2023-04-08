import express from 'express'
import XuatBanSachController from '../controllers/xuatBanSachControllers';
import { auth, authLibrarian } from '../middlewares/auth';

const router = express.Router();

router.post('/add_xbs', auth, authLibrarian, XuatBanSachController.addXuatBanSach);
router.put('/update_xbs/:id', auth, authLibrarian, XuatBanSachController.updateXuatBanSach);
router.delete('/delete_xbs/:id', auth, authLibrarian, XuatBanSachController.deleteXuatBanSach);
router.get('/get_xbs/:id', auth, authLibrarian, XuatBanSachController.layThongTinXuatBanSach);

export default router