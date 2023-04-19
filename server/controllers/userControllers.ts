import { Request, Response } from "express";
import NguoiDung from "../models/nguoiDung_model";
import sequelizeConnection from "../config/sequelize_conf";
import { QueryTypes } from "sequelize";
import { isValidDate, isValidName, isValidPassword } from "../config/dataValidate";

class UserController {
    // Lay thong tin tai khoan
    async layThongTinNguoiDung(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (id === '' || id.trim() === '')
                return res.status(400).json({msg: "error"});
            
            //const userAcc: any = await NguoiDung.findOne({where: {idNguoiDung: id, trangThai: true}, raw: true, nest: true, attributes: ['hoTen', 'ngaySinh', 'soDienThoai', 'vaiTro']})
            const userAcc: any = await sequelizeConnection.query('SELECT idNguoiDung, hoTen, ngaySinh, soDienThoai, vaiTro FROM NGUOIDUNG WHERE lower(idNguoiDung) = lower(:id) AND trangThai = true ', {
                replacements: {id: id},
                raw: true,
                nest: true
            })
            if (!userAcc)
                return res.status(400).json({msg: "Tài khoản không tồn tại."})

            return res.status(200).json({
                msg: "Lấy dữ liệu thành công",
                data: userAcc,
                length: Object.keys(userAcc).length
            })

        } catch (error: any) {
            return res.status(500).json({ msg: error.message });
        }
    }

    /// CÁC HÀM CỦA QTRI VIÊN
    async addThuThu(req: Request, res: Response) {
        try {
            const { idNguoiDung, matKhau, hoTen, ngaySinh, soDienThoai } = req.body;
            if (idNguoiDung.trim() === '' || !isValidPassword(matKhau) || !isValidName(hoTen))
                return res.status(400).json({ msg: "Invalid data." })

            const user: any = await NguoiDung.findOne({ where: {idNguoiDung: idNguoiDung}, raw: true, nest: true });
            //console.log('Found user:', user, '\n', typeof user);

            // Find user who has account
            if (user)
                return res.status(400).json({ msg: "Tài khoản đã được sử dụng." });
            
            const addedTT: any = await sequelizeConnection.query('CALL THEM_THUTHU(:idNguoiDung, :matKhau, :hoTen, :ngaySinh, :soDienThoai)',
            {replacements: {idNguoiDung: idNguoiDung, matKhau: matKhau, hoTen: hoTen, ngaySinh: ngaySinh ? ngaySinh : null, soDienThoai: soDienThoai ? soDienThoai : null}})

            return res.status(200).json({
                msg: "Thêm tài khoản thành công!",
                data: addedTT
            });
        } catch (error: any) {
            return res.status(500).json({ msg: error.message });
        }
    }

    async updateUser(req: Request, res: Response) {
        try {
            const { idNguoiDung, hoTen, ngaySinh, soDienThoai } = req.body;
            if (idNguoiDung.trim() === '' || typeof idNguoiDung === 'undefined' || !isValidName(hoTen) || (!isValidDate(ngaySinh) && ngaySinh !== ''))
                return res.status(400).json({ msg: "Invalid data." })
            
            const user: any = await NguoiDung.findOne({ where: {idNguoiDung: idNguoiDung, trangThai: true}, raw: true, nest: true });
            console.log('Found user:', user, '\n', typeof user);
    
            // Find user who has account and is not yet deleted
            if (!user)
                return res.status(400).json({ msg: "Tài khoản không tồn tại." });
            
            await sequelizeConnection.query('CALL SUA_NGUOIDUNG(:idNguoiDung, :matKhau, :hoTen, :ngaySinh, :soDienThoai)',
            {replacements: {idNguoiDung: idNguoiDung, matKhau: null, hoTen: hoTen, ngaySinh: ngaySinh ? ngaySinh : null, soDienThoai: soDienThoai ? soDienThoai : null}})
            // Added matKhau: null since trigger CHK_MATKHAU2 allows null pwd inputs to be old pwds

            return res.status(200).json({
                msg: "Chỉnh sửa tài khoản thành công!",
                idNguoiDung: idNguoiDung
            });
        } catch (error: any) {
            return res.status(500).json({ msg: error.message });
        }
    }

    async changePwd(req: Request, res: Response) {
        try {
            const { idNguoiDung, newPwd } = req.body;
            if (idNguoiDung.trim() === '' || typeof idNguoiDung === 'undefined' || !isValidPassword(newPwd))
                return res.status(400).json({ msg: "Invalid data." })

            const user: any = await NguoiDung.findOne({ where: {idNguoiDung: idNguoiDung, trangThai: true}, raw: true, nest: true });
            console.log('Found user:', user, '\n', typeof user);

            // Find user who has account and is not yet deleted
            if (!user)
                return res.status(400).json({ msg: "Tài khoản không tồn tại." });
            
            await sequelizeConnection.query('CALL SUA_MATKHAU(:idNguoiDung, :matKhau)', {
                replacements: {idNguoiDung: idNguoiDung, matKhau: newPwd},
                type: QueryTypes.UPDATE
            })

            return res.status(200).json({
                msg: "Chỉnh sửa mật khẩu tài khoản thành công!",
                idNguoiDung: idNguoiDung
            });

        } catch (error: any) {
            return res.status(500).json({ msg: error.message });
        }
    }

    async disableUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (id.trim() === '')
                return res.status(400).json({ msg: "Invalid ID format." })
            
            const user: any = await NguoiDung.findOne({ where: {idNguoiDung: id, trangThai: true}, raw: true, nest: true });
            //console.log('Found user:', user, '\n', typeof user);

            // Find user who has account and is not yet deleted
            if (!user)
                return res.status(400).json({ msg: "Tài khoản không tồn tại." });
            
            await sequelizeConnection.query('CALL XOA_NGUOIDUNG(:idNguoiDung)', {
                replacements: {idNguoiDung: id}
            })
            
            return res.status(200).json({
                msg: "Xóa người dùng thành công",
                idNguoiDung: id
            })
            
        } catch (error: any) {
            return res.status(500).json({ msg: error.message });
        }
    }

    async getUserRole(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (id.trim() === '')
                return res.status(400).json({ msg: "Invalid ID format." })
            
            const user: any = await NguoiDung.findOne({ where: {idNguoiDung: id, trangThai: true}, raw: true, nest: true });
            //console.log('Found user:', user, '\n', typeof user);

            // Find user who has account and is not yet deleted
            if (!user)
                return res.status(400).json({ msg: "Tài khoản không tồn tại." });

            const userRole: any = await sequelizeConnection.query('SELECT LAY_VAITRO(:idNguoiDung)', {
                replacements: {idNguoiDung: id},
                type: QueryTypes.SELECT,
                raw: true,
                nest: true,
                plain: true
            })

            return res.status(200).json({
                msg: "Lấy dữ liệu thành công",
                data: {
                    idNguoiDung: id,
                    role: userRole
                }
            })
        } catch (error: any) {
            return res.status(500).json({ msg: error.message });
        }
    }
}

export default new UserController;