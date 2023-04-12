import { Request, Response } from "express";
import ThongTinTheLoai from "../models/thongTinTheLoai_model";
import Sach from "../models/sach_model";
import TheLoai from "../models/theLoai_model";
import sequelizeConnection from "../config/sequelize_conf";
import { QueryTypes } from "sequelize";
import { isValidNameInputs, isValidName } from "../config/dataValidate";

class ThongTinTheLoaiController {
    async addThongTinTheLoai(req: Request, res: Response) {
        try {
            const { idSach, theLoai } = req.body;
            if(isNaN(parseInt(idSach)) || theLoai.trim() === '' || !isValidNameInputs(theLoai))
                return res.status(400).json({ msg: "Invalid Data." });

            // Theo mạch là hàm sẽ tạo Sach trước, và lấy idSach mới có được 
            // để sử dụng trong hàm này
            const foundSach = await Sach.findByPk(parseInt(idSach), {raw: true});
            //const foundTacGia = await TacGia.findByPk(parseInt(idTacGia), {raw: true});
            if (!foundSach)
                return res.status(400).json({ msg: "Sách không tồn tại." });
            
            // const ttTL: any = await sequelizeConnection.query('CALL THEM_THONGTINTHELOAI(:idSach, :theLoai)', {
            //     replacements: {idSach: idSach, theLoai: theLoai}
            // })
            await theLoai.split(",").forEach((data: string, index: any) => {
                if (data.trim() !== '' && isValidName(data.trim()))
                    sequelizeConnection.query('CALL THEM_THONGTINTHELOAI(:idSach, :tenTheLoai)', {
                        replacements: {idSach: parseInt(idSach), tenTheLoai: data.trim().replace(/\s+/g, " ")}
                    })
            })

            return res.status(200).json({
                msg: "Thêm thông tin thể loại thành công",
                addedSachId: idSach
            })

        } catch (error: any) {
            return res.status(500).json({ msg: error.message });
        }
    }

    // Xóa hết các thể loại có trong idSach tương ứng
    async deleteThongTinTheLoai(req: Request, res: Response) {
        try {
            const { idSach } = req.body;
            if(isNaN(parseInt(idSach)))
                return res.status(400).json({ msg: "Invalid Data." });
            
            // Ktra idSach có tồn tại trong CSDL hay ko
            const foundTTS: any = await ThongTinTheLoai.findOne({where: {idSach: parseInt(idSach)}, raw: true})
            //if (foundTTS === null)
            if (!foundTTS)
                return res.status(400).json({ msg: "Thông tin sách không tồn tại." });
            
            await ThongTinTheLoai.destroy({where: {idSach: parseInt(idSach)}})

            return res.status(200).json({
                msg: "Xóa thông tin thể loại thành công",
                deletedData: {
                    idSach: idSach, 
                }
            })

        } catch (error: any) {
            return res.status(500).json({ msg: error.message });
        }
    }

    /// MIGHT NOT BE USED AT ALL
    async layThongTinTheLoai(req: Request, res: Response) {
        try {
            const { idSach } = req.params;
            //if(isNaN(parseInt(id)))
            if(isNaN(parseInt(idSach)))
                return res.status(400).json({ msg: "Invalid Data." });
            
            // Trả về một mảng obj
            const ttTL: any = await ThongTinTheLoai.findAll({where: {idSach: parseInt(idSach)}, raw: true, nest: true})
            
            // Thông tin sách trả về đúng 1 obj
            return res.status(200).json({
                msg: "Lấy dữ liệu thành công",
                data: ttTL,
                dataLength: Object.keys(ttTL).length
            })
            
        } catch (error: any) {
            return res.status(500).json({ msg: error.message });
        }
    }
}

export default new ThongTinTheLoaiController;