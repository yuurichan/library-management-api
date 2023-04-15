import { Request, Response } from "express";
import TacGia from "../models/tacGia_model";
import sequelizeConnection from "../config/sequelize_conf";
import { QueryTypes } from "sequelize";
import { isValidDate, isValidName } from "../config/dataValidate";

class TacGiaController {
    async addTacGia(req: Request, res: Response) {
        try {
            const { tenTacGia, ngaySinh, queQuan } = req.body;

            if (tenTacGia === '' || tenTacGia.trim() === '' || (!isValidDate(ngaySinh) && ngaySinh !== ''))
                return res.status(400).json({ msg: "Invalid data." });
            
            // Ko rõ có cần xét đk này ko
            const foundTacGia: any = await TacGia.findOne({where: {tenTacGia: tenTacGia}, raw: true});
            if (foundTacGia)
                return res.status(400).json({
                    msg: "Tác giả đã có sẵn."
                })
            
            const newTacGia: any = TacGia.create({
                tenTacGia: tenTacGia,
                ngaySinh: ngaySinh ? ngaySinh : null,
                queQuan: queQuan ? queQuan : null
            });
            // const newTacGia: any = await TacGia.build({
            //     tenTacGia: tenTacGia,
            //     ngaySinh: ngaySinh ? ngaySinh : null,
            //     queQuan: queQuan ? queQuan : null
            // })

            // await newTacGia.save();
            
            return res.status(200).json({
                msg: "Thêm tác giả thành công",
                data: newTacGia
            })
        } catch (error: any) {
            return res.status(500).json({ msg: error.message })
        }
    }

    async deleteTacGia(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if(isNaN(parseInt(id)) === true)
                return res.status(400).json({ msg: "Invalid ID format." });

            const deletedTacGia: any = await TacGia.findByPk(parseInt(id), {raw: true});
            if (deletedTacGia === null)
                return res.status(400).json({ msg: "Invalid data." });

            //await TacGia.destroy({where: {idTacGia: parseInt(id) }});
            await sequelizeConnection.query('CALL XOA_TACGIA(:idTacGia)', {
                replacements: {idTacGia: parseInt(id)},
                type: QueryTypes.DELETE
            })

            return res.status(200).json({
                msg: "Xóa tác giả thành công",
                data: deletedTacGia
            })
        } catch (error: any) {
            return res.status(500).json({ msg: error.message })
        }
    }

    async updateTacGia(req: Request, res: Response) {
        try {
            //const { id } = req.params;
            const { id, tenTacGia, ngaySinh, queQuan } = req.body;

            if(isNaN(parseInt(id)) === true)
                return res.status(400).json({ msg: "Invalid ID format." });
            
            // Ko rõ có cần xét đk này ko
            // const foundTacGia: any = await sequelizeConnection.query('SELECT * FROM tacgia WHERE lower')
            const foundTacGia: any = await TacGia.findOne({where: {tenTacGia: tenTacGia}, raw: true});
            if (foundTacGia)
                return res.status(400).json({
                    msg: "Tác giả đã có sẵn."
                })
            // Đã có unique sẵn trong CSDL

            const selectedTacGia: any = await TacGia.findByPk(parseInt(id), {raw: true});
            if (selectedTacGia === null || !isValidName(tenTacGia) || tenTacGia.trim() === '' || (!isValidDate(ngaySinh) && ngaySinh !== ''))
                return res.status(400).json({ msg: "Invalid data." });

            await TacGia.update({
                tenTacGia: tenTacGia,
                ngaySinh: ngaySinh ? ngaySinh : null,
                queQuan: queQuan ? queQuan : null
            }, 
            {
                where: {
                    idTacGia: parseInt(id)
                }
            })

            return res.json({
                msg: "Cập nhật tác giả thành công",
                idCapNhat: id
            })

        } catch (error: any) {
            return res.status(500).json({ msg: error.message })
        }
    }

    //// PROBABLY WONT BE USED ////
    async getAllTacGia(req: Request, res: Response) {
        try {
            //const allTacGia = await TacGia.findAll(attributes: ['tenTacGia']);
            const allTacGia: any = await TacGia.findAll({raw: true, nest: true});
            return res.status(200).json({
                msg: "Lấy dữ liệu thành công",
                data: allTacGia
            })

        } catch (error: any) {
            return res.status(500).json({ msg: error.message })
        }
        
    }

    async layThongTinTacGia(req: Request, res: Response) {
        try {
            const { id } = req.params;

            if(isNaN(parseInt(id)) === true)
                return res.status(400).json({ msg: "Invalid ID format." });

            //const tg: any = await TacGia.findOne({where: {idTacGia: parseInt(id)}, raw: true, nest: true});
            const tg: any = await sequelizeConnection.query('CALL THONGTIN_TACGIA(:idTacGia)', {
                replacements: {idTacGia: parseInt(id)},
                type: QueryTypes.SELECT,
                raw: true,
                nest: true,
                plain: true
            })
            if (!tg)
                return res.status(400).json({
                    msg: "Tác giả không tồn tại"
                })


            return res.status(200).json({
                msg: "Lấy dữ liệu thành công",
                data: tg,
                length: Object.keys(tg).length
            })

        } catch (error: any) {
            return res.status(500).json({ msg: error.message })
        }
    }

    /// Hàm sử dụng SELECT nên output sẽ không có keys số
    async getTacGiaByName(req: Request, res: Response) {
        try {
            //const { tenTacGia } = req.body;
            const tenTacGia = req.query.keyword as string;
            const s_tenTacGia = decodeURIComponent(tenTacGia);
            //const [tg, metadata] = await sequelizeConnection.query(`
            const tg: any = await sequelizeConnection.query(`
                SELECT * FROM tacgia
                WHERE tenTacGia LIKE '%lower(${s_tenTacGia})%';
            `, 
            {
                type: QueryTypes.SELECT,
                raw: true,
                nest: true,
                plain: true
                // model: TacGia,
                // mapToModel: true    
            });

            // Ko cần xét THợp rỗng?
            // Nếu tg có nhiều kết quả, tg sẽ thành mảng, mỗi thực thể của mảng tg là 1 obj TacGia
            return res.status(200).json({
                msg: "Lấy dữ liệu thành công",
                data: tg,
                dataLength: tg.length
            })

        } catch (error: any) {
            return res.status(500).json({ msg: error.message })
        }
    }
}

export default new TacGiaController;