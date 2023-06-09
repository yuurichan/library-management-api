import { Request, Response } from "express";
import NhaXuatBan from "../models/nhaXuatBan_model";
import sequelizeConnection from "../config/sequelize_conf";
import { QueryTypes } from "sequelize";
import { isValidDate } from "../config/dataValidate";

class NhaXuatBanController {
    async addNhaXuatBan(req: Request, res: Response) {
        try {
            const { tenNXB, namThanhLap } = req.body;
            if (tenNXB === '' || typeof tenNXB !== 'string' || tenNXB.trim() === '' || (!isValidDate(namThanhLap) && namThanhLap !== ''))
                return res.status(400).json({ msg: "Invalid data." });
            
            const addedNXB = await NhaXuatBan.create({
                tenNhaXuatBan: tenNXB,
                namThanhLap: namThanhLap ? namThanhLap : null
            })

            return res.status(200).json({
                msg: "Thêm nhà xuất bản thành công.",
                data: addedNXB
            })

        } catch (error: any) {
            return res.status(500).json({ msg: error.message });
        }
    }

    async updateNhaXuatBan(req: Request, res: Response) {
        try {
            //const { id } = req.params;
            const { id, tenNhaXuatBan, namThanhLap } = req.body;
            if(isNaN(parseInt(id)))
                return res.status(400).json({ msg: "Invalid ID format." });

            const foundNXB: any = await NhaXuatBan.findByPk(parseInt(id), {raw: true}); 
            if (tenNhaXuatBan === '' || typeof tenNhaXuatBan === 'undefined' || tenNhaXuatBan.trim() === '' || (!isValidDate(namThanhLap) && namThanhLap !== ''))
                return res.status(400).json({ msg: "Invalid data." });
            if (foundNXB === null || !foundNXB)
                return res.status(400).json({ msg: "NXB not found." });

            await NhaXuatBan.update({
                tenNhaXuatBan: tenNhaXuatBan,
                namThanhLap: namThanhLap ? namThanhLap : null
            },
            {
                where: {idNhaXuatBan: parseInt(id)}
            })

            return res.status(200).json({
                msg: "Cập nhật nhà xuất bản thành công",
                idNhaXuatBan: id
            })

        } catch (error: any) {
            return res.status(500).json({ msg: error.message });
        }
    }

    async xoaNhaXuatBan(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if(isNaN(parseInt(id)))
                return res.status(400).json({ msg: "Invalid ID format." });
            
            const foundNXB: any = await NhaXuatBan.findByPk(parseInt(id), {raw: true}); 
            if(!foundNXB)
                return res.status(400).json({ msg: "Nhà xuất bản không tồn tại." })
            
            await sequelizeConnection.query('CALL XOA_NHAXUATBAN(:idNhaXuatBan)', {
                replacements: {idNhaXuatBan: parseInt(id)},
                type: QueryTypes.DELETE
            })

            return res.status(200).json({
                msg: "Xóa nhà xuất bản thành công",
                data: foundNXB
            })

        } catch (error: any) {
            return res.status(500).json({ msg: error.message });
        }
    }

    async layThongTinNhaXuatBan(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if(isNaN(parseInt(id)))
                return res.status(400).json({ msg: "Invalid ID format." });
            
            const infoNXB: any = sequelizeConnection.query('CALL THONGTIN_NHAXUATBAN(:idNhaXuatBan)', {
                replacements: {idNhaXuatBan: parseInt(id)},
                type: QueryTypes.SELECT,
                raw: true,
                nest: true,
                plain: true
            })
            if (!infoNXB)
                return res.status(400).json({
                    msg: "Nhà xuất bản không tồn tại."
                })
            
            return res.status(200).json({
                msg: "Lấy dữ liệu thành công.",
                data: infoNXB,
                length: Object.keys(infoNXB).length
            })
        } catch (error: any) {
            return res.status(500).json({ msg: error.message });
        }
    }
}

export default new NhaXuatBanController;