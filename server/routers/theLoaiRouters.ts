import express from 'express'
import TheLoaiController from '../controllers/theLoaiControllers';
import { auth, authLibrarian } from '../middlewares/auth';

const router = express.Router();

router.post('/add_theloai', auth, authLibrarian, TheLoaiController.addTheLoai);
router.get('/get_theloai/:id', auth, authLibrarian, TheLoaiController.layThongTinTheLoai);
router.put('/update_theloai/:id', auth, authLibrarian, TheLoaiController.updateTheLoai);
router.delete('/delete_theloai/:id', auth, authLibrarian, TheLoaiController.deleteTheLoai);

export default router;