import express from 'express'
import PhieuMuonController from '../controllers/phieuMuonControllers';
import { auth, authAdmin, authLibrarian } from '../middlewares/auth';

const router = express.Router();

router.post('/add_phieumuon', auth, authLibrarian, PhieuMuonController.addPhieuMuon);
router.put('/update_phieumuon', auth, authLibrarian, PhieuMuonController.updatePhieuMuon);
router.put('/mark_phieumuon', auth, authLibrarian, PhieuMuonController.markPhieuMuon);
router.delete('/delete_phieumuon/:id', auth, authLibrarian, PhieuMuonController.deletePhieuMuon);
router.get('/get_phieumuon/:id', auth, authLibrarian, PhieuMuonController.layThongTinPhieuMuon);

export default router