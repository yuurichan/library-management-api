import { Request, Response } from "express";
import XuatBanSach from "../models/xuatBanSach_model";
import sequelizeConnection from "../config/sequelize_conf";
import { QueryTypes } from "sequelize";
import { isValidDate, isValidNameInputs, isValidName } from "../config/dataValidate";

class XuatBanSachController {
    async addXuatBanSach(req: Request, res: Response) {
        try {
            
        } catch (error: any) {
            return res.status(500).json({ msg: error.message });
        }
    }

    async updateXuatBanSach(req: Request, res: Response) {
        try {
            
        } catch (error: any) {
            return res.status(500).json({ msg: error.message });
        }
    }

    async deleteXuatBanSach(req: Request, res: Response) {
        try {
            
        } catch (error: any) {
            return res.status(500).json({ msg: error.message });
        }
    }

    async layThongTinXuatBanSach(req: Request, res: Response) {
        try {
            const { id } = req.body;
            if(isNaN(parseInt(id)))
                return res.status(400).json({ msg: "Invalid ID format." });
            
            const infoXBSach: any = sequelizeConnection.query('CALL THONGTIN_XUATBANSACH(:idXuatBan)', {
                replacements: {idXuatBan: parseInt(id)},
                type: QueryTypes.SELECT,
                raw: true,
                nest: true
            })
            if (infoXBSach === null) {
                return res.status(400).json({ msg: "Bản sao sách không tồn tại." })
            }

            return res.status(200).json({
                msg: "Lấy dữ liệu thành công",
                data: infoXBSach
            })

        } catch (error: any) {
            return res.status(500).json({ msg: error.message });
        }
    }
}

export default new XuatBanSachController;