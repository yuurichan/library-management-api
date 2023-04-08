import express from 'express'
import tacGiaControllers from '../controllers/tacGiaControllers'
import { auth, authLibrarian } from '../middlewares/auth';

const router = express.Router();

router.post('/add_tacgia', auth, authLibrarian, tacGiaControllers.addTacGia);
//router.put('/update_tacgia/:id', auth, authLibrarian, tacGiaControllers.updateTacGia);
router.put('/update_tacgia', auth, authLibrarian, tacGiaControllers.updateTacGia);
router.delete('/delete_tacgia/:id', auth, authLibrarian, tacGiaControllers.deleteTacGia);
router.get('/get_tacgia/:id', auth, authLibrarian, tacGiaControllers.layThongTinTacGia);

router.get('/get_tacgia_byName', auth, authLibrarian, tacGiaControllers.getTacGiaByName);

export default router;