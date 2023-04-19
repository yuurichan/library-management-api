import { Request, Response } from "express";
import PhieuMuonSach from "../models/phieuMuonSach_model";
import Sach from "../models/sach_model";
import sequelizeConnection from "../config/sequelize_conf";
import { QueryTypes } from "sequelize";
import { isValidDate, isValidNameInputs, isValidName } from "../config/dataValidate";
import XuatBanSach from "../models/xuatBanSach_model";
import NguoiDung from "../models/nguoiDung_model";

class PhieuMuonController {
    async addPhieuMuon(req: Request, res: Response) {
        try {
            const { idXuatBan, idNguoiDoc, idThuThu, ngayMuon, hanTra } = req.body;
            if (isNaN(parseInt(idXuatBan)) || idNguoiDoc.trim() === '' || idThuThu.trim() === '' || !isValidDate(ngayMuon) || !isValidDate(hanTra))
                return res.status(400).json({ msg: "Invalid data." });
            
            const foundSach: any = await XuatBanSach.findByPk(parseInt(idXuatBan), {raw: true})
            if (foundSach === null)
                return res.status(400).json({ msg: "Bản sao sách không tồn tại." });
            
            const foundND: any = await NguoiDung.findByPk(idNguoiDoc, {raw: true});
            const foundTT: any = await NguoiDung.findByPk(idThuThu, {raw: true});
            if (foundND === null || foundTT === null)
                return res.status(400).json({ msg: "Người dùng không tồn tại." })

            await sequelizeConnection.query('CALL THEM_PHIEUMUONSACH(:idXuatBan, :idNguoiDoc, :idThuThu, :ngayMuon, :hanTra)', {
                replacements: {idXuatBan: idXuatBan, idNguoiDoc: idNguoiDoc, idThuThu: idThuThu, ngayMuon: ngayMuon, hanTra: hanTra}
            })

            return res.status(200).json({
                msg: "Thêm phiếu mượn thành công.",
            })
            
        } catch (error: any) {
            return res.status(500).json({ msg: error.message });
        }
    }

    async updatePhieuMuon(req: Request, res: Response) {
        try {
            const { idPhieuMuon, idXuatBan, idNguoiDoc, idThuThu, ngayMuon, hanTra } = req.body;
            if (isNaN(parseInt(idPhieuMuon)) || isNaN(parseInt(idXuatBan)) || idNguoiDoc.trim() === '' || idThuThu.trim() === '' || !isValidDate(ngayMuon) || !isValidDate(hanTra))
                return res.status(400).json({ msg: "Invalid data." });
            
            const foundSach: any = await XuatBanSach.findByPk(parseInt(idXuatBan), {raw: true})
            if (foundSach === null)
                return res.status(400).json({ msg: "Bản sao sách không tồn tại." });
            
            const foundND: any = await NguoiDung.findByPk(idNguoiDoc, {raw: true});
            const foundTT: any = await NguoiDung.findByPk(idThuThu, {raw: true});
            if (foundND === null)
                return res.status(400).json({ msg: "Người đọc không tồn tại." })
            if (foundTT === null)
                return res.status(400).json({ msg: "Thủ thư không tồn tại." })
            
            await sequelizeConnection.query('CALL SUA_PHIEUMUONSACH(:idPhieuMuon, :idXuatBan, :idNguoiDoc, :idThuThu, :ngayMuon, :hanTra)', {
                replacements: {idPhieuMuon: idPhieuMuon ,idXuatBan: idXuatBan, idNguoiDoc: idNguoiDoc, idThuThu: idThuThu, ngayMuon: ngayMuon, hanTra: hanTra}
            })

            return res.status(200).json({
                msg: "Chỉnh sửa phiếu mượn thành công.",
                idPM: parseInt(idPhieuMuon)
            })
        } catch (error: any) {
            return res.status(500).json({ msg: error.message });
        }
    }

    async deletePhieuMuon(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if(isNaN(parseInt(id)))
                return res.status(400).json({ msg: "Invalid ID format." })
            
            const deletedPM: any = await PhieuMuonSach.findByPk(parseInt(id), {raw: true});
            if (!deletedPM)
                return res.status(400).json({ msg: "Phiếu mượn không tồn tại." });
            if (deletedPM.ngayTra === null)
                return res.status(400).json({ msg: "Phiếu mượn chưa được trả." });

            await sequelizeConnection.query('CALL XOA_PHIEUMUONSACH(:idPM)', {
                replacements: {idPM: parseInt(id)},
                type: QueryTypes.DELETE
            })

            return res.status(200).json({
                msg: "Xóa phiếu mượn thành công",
                data: deletedPM
            })
        } catch (error: any) {
            return res.status(500).json({ msg: error.message });
        }
    }

    async layThongTinPhieuMuon(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if(isNaN(parseInt(id)))
                return res.status(400).json({ msg: "Invalid ID format." })
            
            //const foundPM: any = await sequelizeConnection.query('SELECT * FROM phieumuon WHERE idPhieuMuon = :id', {
            const foundPM: any = await sequelizeConnection.query('CALL THONGTIN_PHIEUMUON(:id)', {
                replacements: {id: parseInt(id)},
                type: QueryTypes.SELECT,
                raw: true,
                nest: true,
                plain: true
            })
            if (!foundPM)
                return res.status(400).json({ msg: "Phiếu mượn không tồn tại." })
            
            return res.status(200).json({
                msg: "Lấy dữ liệu thành công.",
                data: foundPM,
                length: Object.keys(foundPM).length
            })
        } catch (error: any) {
            return res.status(500).json({ msg: error.message });
        }
    }

    async getPhieuMuon_byID(req: Request, res: Response) {
        try {
            //const { id } = req.body;
            const id = req.query.keyword as string;
            const s_id = decodeURIComponent(id);

            if(isNaN(parseInt(id)))
                return res.status(400).json({ msg: "Invalid ID format." })

            const foundPM: any = await sequelizeConnection.query('CALL TIMKIEM_PHIEUMUON(:idPhieuMuon)', {
                replacements: {idPhieuMuon: parseInt(s_id)},
                raw: true,
                nest: true,
                plain: true
            })
            if (!foundPM)
                return res.status(400).json({ msg: "Phiếu mượn không tồn tại" });

            return res.status(200).json({
                msg: "Lấy dữ liệu thành công",
                data: foundPM,
                length: Object.keys(foundPM).length
            })
            
        } catch (error: any) {
            return res.status(500).json({ msg: error.message });
        }
    }

    async markPhieuMuon(req: Request, res: Response) {
        try {
            const { id, ngayTra } = req.body;
            if (isNaN(parseInt(id)) || (!isValidDate(ngayTra) && ngayTra.trim() !== ''))
                return res.status(400).json({ msg: "Invalid data." });
            
            await sequelizeConnection.query('CALL TRA_PHIEUMUONSACH(:idPM, :ngayTra)', {
                replacements: {idPM: parseInt(id), ngayTra: ngayTra ? ngayTra : null}
            })

            return res.status(200).json({
                msg: "Chỉnh sửa phiếu mượn thành công.",
                idPM: parseInt(id)
            })
        } catch (error: any) {
            return res.status(500).json({ msg: error.message });
        }
    }
}

export default new PhieuMuonController;