import express from 'express'
import ThongTinSachController from '../controllers/thongTinSachControllers';
import { auth, authLibrarian } from '../middlewares/auth';

const router = express.Router();

router.post('/add_tts', auth, authLibrarian, ThongTinSachController.addThongTinSach);
// Xóa TTS lấy idSach trong input, vì vậy idSach ko có trong params
router.delete('/delete_tts', auth, authLibrarian, ThongTinSachController.deleteThongTinSach);
router.get('/get_tts/:idSach', auth, authLibrarian, ThongTinSachController.layThongTinSach);

export default router;