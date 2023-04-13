import { Request, Response } from "express";
import XuatBanSach from "../models/xuatBanSach_model";
import Sach from "../models/sach_model";
import sequelizeConnection from "../config/sequelize_conf";
import { QueryTypes } from "sequelize";
import { isValidDate, isValidNameInputs, isValidName } from "../config/dataValidate";

class XuatBanSachController {
    async addXuatBanSach(req: Request, res: Response) {
        try {
            const { idSach, tenNXB, namXuatBan } = req.body;
            if (isNaN(parseInt(idSach)) || isNaN(parseInt(namXuatBan)) || tenNXB.trim() === '')
                return res.status(400).json({ msg: "Invalid data." });
            
            const foundSach: any = await Sach.findByPk(parseInt(idSach), {raw: true})
            if (foundSach === null)
                return res.status(400).json({ msg: "Sách không tồn tại." });

            await sequelizeConnection.query('CALL THEM_XUATBANSACH(:idSach, :tenNhaXuatBan, :namXuatBan)', {
                replacements: {idSach: idSach, tenNhaXuatBan: tenNXB, namXuatBan: namXuatBan}
            })

            return res.status(200).json({
                msg: "Thêm bản sao sách thành công.",
                data: {
                    idSach: idSach,
                    tenNXB: tenNXB,
                    namXuatBan: namXuatBan
                } 
            })
            
        } catch (error: any) {
            return res.status(500).json({ msg: error.message });
        }
    }

    async updateXuatBanSach(req: Request, res: Response) {
        try {
            const { idXuatBan, idSach, tenNXB, namXuatBan } = req.body;
            if (isNaN(parseInt(idSach)) || isNaN(parseInt(namXuatBan)) || isNaN(parseInt(idXuatBan)) || tenNXB.trim() === '')
                return res.status(400).json({ msg: "Invalid data." });
            
            const foundSach: any = await Sach.findByPk(parseInt(idSach), {raw: true})
            if (foundSach === null)
                return res.status(400).json({ msg: "Sách không tồn tại." });
            
            await sequelizeConnection.query('CALL SUA_XUATBANSACH(:idXuatBan, :idSach, :tenNhaXuatBan, :namXuatBan)', {
                replacements: {idXuatBan: idXuatBan, idSach: idSach, tenNhaXuatBan: tenNXB, namXuatBan: namXuatBan}
            })

            return res.status(200).json({
                msg: "Chỉnh sửa bản sao sách thành công.",
                idXuatBan: idXuatBan
            })

        } catch (error: any) {
            return res.status(500).json({ msg: error.message });
        }
    }

    async deleteXuatBanSach(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if(isNaN(parseInt(id)))
                return res.status(400).json({ msg: "Invalid ID format." });
            
            const foundBanSaoSach: any = await XuatBanSach.findByPk(parseInt(id), {raw: true})
            if (foundBanSaoSach === null)
                return res.status(400).json({ msg: "Bản sao sách không tồn tại." });
            
            await sequelizeConnection.query('CALL XOA_XUATBANSACH(:idXuatBan)', {
                replacements: {idXuatBan: id},
            })
            
            return res.status(200).json({
                msg: "Xóa bản sao sách thành công.",
                deletedData: foundBanSaoSach
            })

        } catch (error: any) {
            return res.status(500).json({ msg: error.message });
        }
    }

    async layThongTinXuatBanSach(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if(isNaN(parseInt(id)))
                return res.status(400).json({ msg: "Invalid ID format." });
            
            const infoXBSach: any = sequelizeConnection.query('CALL THONGTIN_XUATBANSACH(:idXuatBan)', {
                replacements: {idXuatBan: parseInt(id)},
                type: QueryTypes.SELECT,
                raw: true,
                nest: true,
                plain: true
            })
            if (infoXBSach === null) {
                return res.status(400).json({ msg: "Bản sao sách không tồn tại." })
            }

            return res.status(200).json({
                msg: "Lấy dữ liệu thành công",
                data: infoXBSach,
                length: Object.keys(infoXBSach).length
            })

        } catch (error: any) {
            return res.status(500).json({ msg: error.message });
        }
    }
}

export default new XuatBanSachController;