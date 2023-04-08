import express from 'express'
import ThongTinTheLoaiControllers from '../controllers/thongTinTheLoaiControllers';
import { auth, authAdmin, authLibrarian } from '../middlewares/auth';

const router = express.Router();

router.post('/add_tttl', auth, authLibrarian, ThongTinTheLoaiControllers.addThongTinTheLoai);
// Xóa TTS lấy idSach trong input, vì vậy idSach ko có trong params
router.delete('/delete_tttl', auth, authLibrarian, ThongTinTheLoaiControllers.deleteThongTinTheLoai);
router.get('/get_tttl/:idSach', auth, authLibrarian, ThongTinTheLoaiControllers.layThongTinTheLoai);

export default router;