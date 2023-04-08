import { Request, Response } from "express";
import TheLoai from "../models/theLoai_model";
import sequelizeConnection from "../config/sequelize_conf";
import { QueryTypes } from "sequelize";

class TheLoaiController {
    async addTheLoai(req: Request, res: Response) {
        try {
            const { tenTheLoai } = req.body;
            if (tenTheLoai === '' || tenTheLoai.trim() === '')
                return res.status(400).json({ msg: "Invalid data." });
            
            const foundTL: any = await TheLoai.findOne({where: {tenTheLoai: tenTheLoai}, raw: true});
            if (foundTL)
                return res.status(400).json({ msg: "Thể loại đã có sẵn." })
                
            const addedTL: any = sequelizeConnection.query('CALL THEM_THELOAI(:tenTheLoai)', {
                replacements: {tenTheLoai: tenTheLoai},
                type: QueryTypes.INSERT
            })
            // const addedTL: any = await TheLoai.create({
            //     tenTheLoai: tenTheLoai
            // })

            return res.status(200).json({
                msg: "Thêm thể loại thành công",
                data: addedTL
            })

        } catch (error: any) {
            return res.status(500).json({ msg: error.message });
        }
    }

    async updateTheLoai(req: Request, res: Response) {
        try {
            //const { id } = req.params;
            const { id, tenTheLoai } = req.body;

            if(isNaN(parseInt(id)) === true)
                return res.status(400).json({ msg: "Invalid ID format." });

            const selectedTacGia: any = await TheLoai.findByPk(parseInt(id), {raw: true});
            if (tenTheLoai === '' || tenTheLoai.trim() === '' || selectedTacGia === null)
                return res.status(400).json({ msg: "Invalid data." });
            
            const foundTL: any = await TheLoai.findOne({where: {tenTheLoai: tenTheLoai}, raw: true});
            if (foundTL)
                return res.status(400).json({ msg: "Thể loại đã có sẵn." })
            
            await TheLoai.update({
                tenTheLoai: tenTheLoai
            }, 
            {
                where: {
                    idTheLoai: parseInt(id)
                }
            })

            return res.json({
                msg: "Cập nhật thể loại thành công",
                idTheLoai: id
            })
        } catch (error: any) {
            return res.status(500).json({ msg: error.message });
        }
    }

    async deleteTheLoai(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if(isNaN(parseInt(id)) === true)
                return res.status(400).json({ msg: "Invalid ID format." });

            const deletedTheLoai: any = await TheLoai.findByPk(parseInt(id), {raw: true});
            if(deletedTheLoai === null)
                return res.status(400).json({ msg: "Invalid ID." })

            await sequelizeConnection.query('CALL XOA_THELOAI(:idTheLoai)', {
                replacements: {idTheLoai: parseInt(id)},
                type: QueryTypes.DELETE
            })

            return res.status(200).json({
                msg: "Xóa thể loại thành công",
                deletedData: deletedTheLoai
            })

        } catch (error: any) {
            return res.status(500).json({ msg: error.message });
        }
    }

    async layThongTinTheLoai(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if(isNaN(parseInt(id)))
                return res.status(400).json({ msg: "Invalid ID format." });
            
            const infoTheLoai: any = sequelizeConnection.query('CALL THONGTIN_THELOAI(:idTheLoai)', {
                replacements: {idTheLoai: parseInt(id)},
                type: QueryTypes.SELECT,
                raw: true,
                nest: true
            })
            if(!infoTheLoai)
                return res.status(400).json({ msg: "Thể loại không tồn tại." })

            return res.status(200).json({
                msg: "Lấy dữ liệu thành công",
                data: infoTheLoai
            })

        } catch (error: any) {
            return res.status(500).json({ msg: error.message });
        }
    }
}

export default new TheLoaiController;