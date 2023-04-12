import express from 'express'
import SachController from '../controllers/sachControllers';
import { auth, authAdmin, authLibrarian } from '../middlewares/auth';

const router = express.Router();

router.post('/add_sach', auth, authLibrarian, SachController.addSach_complete);
router.delete('/delete_sach/:id', auth, authLibrarian, SachController.deleteSach);
//router.put('/update_sach/:id', auth, authLibrarian, SachController.updateSach_complete);
router.put('/update_sach', auth, authLibrarian, SachController.updateSach_complete);
router.get('/get_sach/:id', auth, authLibrarian, SachController.layThongTinSach);

// Các API cho người đọc
// Có thể xét điều kiện dựa vào length của data được trả về (nếu data null thì length = 0)
router.get('/get_sach_byname', auth, SachController.getSachByName);
router.get('/get_sach_byyear', auth, SachController.getSachByYear);
router.get('/get_sach_byauthor', auth, SachController.getSachByAuthor);
router.get('/get_sach_bygenre', auth, SachController.getSachByGenre);
router.get('/get_sach_bynxb', auth, SachController.getSachByNXB);

export default router;