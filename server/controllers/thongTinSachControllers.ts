import { Request, Response } from "express";
import ThongTinSach from "../models/thongTinSach_model";
import Sach from "../models/sach_model";
import TacGia from "../models/tacGia_model";
import sequelizeConnection from "../config/sequelize_conf";
import { QueryTypes } from "sequelize";
import { isValidNameInputs, isValidName } from "../config/dataValidate";

class ThongTinSachController {
    async addThongTinSach(req: Request, res: Response) {
        try {
            const { idSach, tacGia } = req.body;
            if(isNaN(parseInt(idSach)) || tacGia.trim() === '' || !isValidNameInputs(tacGia))
                return res.status(400).json({ msg: "Invalid Data." });

            // Theo mạch là hàm sẽ tạo Sach trước, và lấy idSach mới có được 
            // để sử dụng trong hàm này
            const foundSach = await Sach.findByPk(parseInt(idSach), {raw: true});
            //const foundTacGia = await TacGia.findByPk(parseInt(idTacGia), {raw: true});
            if (foundSach === null)
                return res.status(400).json({ msg: "Sách không tồn tại." });
            
            // const ttS: any = await sequelizeConnection.query('CALL THEM_THONGTINSACH(:idSach, :tacGia)', {
            //     replacements: {idSach: idSach, tacGia: tacGia}
            // })
            await tacGia.split(",").forEach((data: string, index: any) => {
                if (data.trim() !== '' && isValidName(data.trim()))
                    sequelizeConnection.query('CALL THEM_THONGTINSACH(:idSach, :tenTacGia)', {
                        replacements: {idSach: parseInt(idSach), tenTacGia: data.trim().replace(/\s+/g, " ")}
                    })
            })

            return res.status(200).json({
                msg: "Thêm thông tin sách thành công",
                addedSachId: idSach
            })

        } catch (error: any) {
            return res.status(500).json({ msg: error.message });
        }
    }

    // Xóa hết các tác giả có trong idSach tương ứng
    async deleteThongTinSach(req: Request, res: Response) {
        try {
            const { idSach } = req.body;
            if(isNaN(parseInt(idSach)))
                return res.status(400).json({ msg: "Invalid Data." });
            
            // Ktra idSach có tồn tại trong CSDL hay ko
            const foundTTS: any = await ThongTinSach.findOne({where: {idSach: parseInt(idSach)}, raw: true})
            if (foundTTS === null)
                return res.status(400).json({ msg: "Thông tin sách không tồn tại." });
            
            await ThongTinSach.destroy({where: {idSach: parseInt(idSach)}})

            return res.status(200).json({
                msg: "Xóa thông tin sách thành công",
                deletedData: {
                    idSach: idSach, 
                }
            })

        } catch (error: any) {
            return res.status(500).json({ msg: error.message });
        }
    }

    /// MIGHT NOT BE USED AT ALL
    async layThongTinSach(req: Request, res: Response) {
        try {
            const { idSach } = req.params;
            //if(isNaN(parseInt(id)))
            if(isNaN(parseInt(idSach)))
                return res.status(400).json({ msg: "Invalid Data." });

            // const ttS: any = await sequelizeConnection.query('CALL THONGTIN_THONGTINSACH(:idSach, :idTacGia)', {
            //     replacements: {idSach: idSach, idTacGia: idTacGia},
            //     type: QueryTypes.SELECT,
            //     raw: true,
            //     nest: true,
            //     plain: true
            // })
            
            // Trả về một mảng obj
            const ttS: any = await ThongTinSach.findAll({where: {idSach: parseInt(idSach)}, raw: true, nest: true})
            
            // Thông tin sách trả về đúng 1 obj
            return res.status(200).json({
                msg: "Lấy dữ liệu thành công",
                data: ttS,
                dataLength: ttS.length
            })
            
        } catch (error: any) {
            return res.status(500).json({ msg: error.message });
        }
    }
}

export default new ThongTinSachController;