import express from 'express'
import PhieuMuonController from '../controllers/phieuMuonControllers';
import { auth, authAdmin, authLibrarian } from '../middlewares/auth';

const router = express.Router();

router.post('/add_phieumuon', auth, authLibrarian, PhieuMuonController.addPhieuMuon);
router.put('/update_phieumuon', auth, authLibrarian, PhieuMuonController.updatePhieuMuon);
router.put('/mark_phieumuon', auth, authLibrarian, PhieuMuonController.markPhieuMuon);
router.delete('/delete_phieumuon/:id', auth, authLibrarian, PhieuMuonController.deletePhieuMuon);

// Hàm lấy thông tin dựa vào ID params chỉ đơn thuần là SELECT từ bảng PHIEUMUONSACH
router.get('/get_phieumuon/:id', auth, PhieuMuonController.layThongTinPhieuMuon);

// Hàm tìm kiếm sẽ hiển thị đầy đủ thông tin phiếu mượn, bao gồm cả tên sách, tên người đọc, thủ thư
router.get('/get_pm_byid', auth, authLibrarian, PhieuMuonController.getPhieuMuon_byID);

export default router