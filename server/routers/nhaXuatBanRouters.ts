import express from 'express'
import NhaXuatBanController from '../controllers/nhaXuatBanControllers';
import { auth, authLibrarian } from '../middlewares/auth';

const router = express.Router();

router.get('/get_nxb/:id', auth, authLibrarian, NhaXuatBanController.layThongTinNhaXuatBan);
router.post('/add_nxb', auth, authLibrarian, NhaXuatBanController.addNhaXuatBan);
router.put('/update_nxb/:id', auth, authLibrarian, NhaXuatBanController.updateNhaXuatBan);
router.delete('/delete_nxb/:id', auth, authLibrarian, NhaXuatBanController.xoaNhaXuatBan);

export default router