import { Request, Response } from "express";
import NguoiDung from "../models/nguoiDung_model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
    generateAccessToken,
    generateRefreshToken,
} from "../config/generateToken";
import { UserLogin, UserRegister, DecodeToken } from "../config/interface";
import sequelizeConnection from "../config/sequelize_conf";
import { QueryTypes } from "sequelize";
import { isValidName, isValidPassword } from "../config/dataValidate";

class AuthController {
    // Đăng kí
    async register(req: Request, res: Response) {
        try {
            const { hoTen, idNguoiDung, matKhau, ngaySinh, soDienThoai }: UserRegister = req.body;
            if (hoTen.trim() === '' || idNguoiDung.trim() === '' || !isValidPassword(matKhau))
                return res.status(400).json({ msg: "hoTen, ID or pwd might not be valid." });

            const user: any = await NguoiDung.findOne({ where: {idNguoiDung: idNguoiDung}, raw: true, nest: true });
            console.log('Found user: ', user, '\n', typeof user);

            if (user)
                return res.status(409).json({ msg: "Username is already in use.", data: user.idNguoiDung });  // Conflict
            // else
            //     return res.status(200).json({ msg: "No user with specified username found" })

            // Không cần attribute type vì ta đang cập nhật vào CSDL, không mong đợi kết quả trả về
            // Ko cần then() vì ta đang sd async await
            await sequelizeConnection.query('CALL DANGKY_NGUOIDOC(:idNguoiDung, :matKhau, :hoTen, :ngaySinh, :soDienThoai)',
            {replacements: {idNguoiDung: idNguoiDung, matKhau: matKhau, hoTen: hoTen, ngaySinh: ngaySinh ? ngaySinh : null, soDienThoai: soDienThoai ? soDienThoai : null}})
            // chèn mật khẩu thường vì khi trigger nếu mk thỏa điều kiện thì mới hash và đưa vào Database

            return res.status(201).json({
                msg: "Đăng kí thành công!",
            });
            // .catch(error => {
            //     return res.status(400).json({
            //         msg: error.message
            //     });
            // })

        } catch (error: any) {
            return res.status(500).json({ msg: error.message });
        }
    }

    // Đăng nhập
    async login(req: Request, res: Response) {
        try {
            const { idNguoiDung, matKhau }: UserLogin = req.body;
            if (idNguoiDung === '' || matKhau === '')
                return res.status(400).json({ msg: "error" });
            // let user;
            // await NguoiDung.findByPk(decode.id).then(data => {
            //     user = data?.get({plain: true});
            //     console.log(user);
            // })
            // .catch(error => {
            //     return res.status(400).json({
            //         msg: error.message
            //     });
            // });
            const user: any = await NguoiDung.findOne({ where: {idNguoiDung: idNguoiDung, trangThai: true}, raw: true, nest: true });
            console.log('Found user:', user, '\n', typeof user);

            // Find user who has account and is not yet deleted
            if (!user)
                return res.status(400).json({ msg: "Tài khoản không tồn tại." });
            
            // Check pwd
            const isMatch: any = await sequelizeConnection.query('SELECT XACTHUC_DANGNHAP(:idNguoiDung, :matKhau) ket_qua_xac_thuc', 
            {replacements: {idNguoiDung: idNguoiDung, matKhau: matKhau}, 
            type: QueryTypes.SELECT,    // Kiểu query là SELECT, để định dạng obj trả về của sqlCon.query
            raw: true,      // Chỉ trả về data, không trả về metadata kèm theo
            nest: true,     // Cho các thuộc tính của obj hiển thị đúng định dạng thay vì phải sử dụng dấu . (foo.bar = ...)
            plain: true     // Trả về kết quả đầu tiên trong mảng các obj
            })
            // .catch(error => {
            //     return res.status(400).json({
            //         msg: error.message,

            //     });
            // })
            console.log('Found isMatch:', isMatch, '\n', typeof isMatch, '\n isMatch val: ', isMatch.ket_qua_xac_thuc);
            // Lấy isMatch.ket_qua_xac_thuc được nhờ việc sử dụng plain: true 
            // vì ban đầu truy vấn trả về mảng obj thay vì 1 obj kết quả
            if(isMatch.ket_qua_xac_thuc === 0)
                return res.status(400).json({ msg: "Sai mật khẩu." });

            const access_token = generateAccessToken({ id: user.idNguoiDung });
            const refresh_token = generateRefreshToken({ id: user.idNguoiDung });

            //  SET COOKIE
            res.cookie("refreshToken", refresh_token, {
                path: "/api/refresh_token",
                httpOnly: true,
                // secure: process.env.NODE_ENV == 'production',   // is only used in production/disable it when in dev
                // sameSite: "none",
                //maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
                maxAge: 24 * 60 * 60 * 1000, // 1 day
            });

            return res.status(200).json({
                msg: "Đăng nhập thành công",
                user,
                access_token,
            });
            
        } catch (error: any) {
            return res.status(500).json({ msg: error.message });
        }
    }

    // Refresh Token -> {User, Access Token}
    async refreshToken(req: Request, res: Response) {
        try {
            const refreshToken = req.cookies.refreshToken;
            if (!refreshToken)
                return res.status(400).json({ msg: "Please login now." });

            const decode = await <DecodeToken>jwt.verify(refreshToken, `${process.env.REFRESH_TOKEN_SECRET}`);

            if (!decode) return res.status(400).json({ msg: "Please login now." });

            const user: any = await NguoiDung.findOne({ where: {idNguoiDung: decode.id, trangThai: true}, raw: true, nest: true });
            console.log('Found user:', user, '\n', typeof user);
            if (!user)
                return res.status(400).json({ msg: "Tài khoản không tồn tại." });

            const access_token = generateAccessToken({ id: user.idNguoiDung });
            return res.json({
                user,
                access_token
            })

        } catch (error: any) {
            return res.status(500).json({ msg: error.message });
        }
    }

    // Đăng xuất
    async logout(req: Request, res: Response) {
        try {
            res.clearCookie("refreshToken");
            return res.json({ msg: "Đăng xuất thành công." })
        } catch (error: any) {
            return res.status(500).json({ msg: error.message });
        }
    }

    // Lay thong tin tai khoan
    async layThongTinNguoiDung(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (id === '' || id.trim() === '')
                return res.status(400).json({msg: "error"});
            
            //const userAcc: any = await NguoiDung.findOne({where: {idNguoiDung: id, trangThai: true}, raw: true, nest: true, attributes: ['hoTen', 'ngaySinh', 'soDienThoai', 'vaiTro']})
            const userAcc: any = await sequelizeConnection.query('SELECT hoTen, ngaySinh, soDienThoai FROM NGUOIDUNG WHERE lower(idNguoiDung) = lower(:id) AND trangThai = true ', {
                replacements: {id: id},
                raw: true,
                nest: true
            })
            if (!userAcc)
                return res.status(400).json({msg: "Tài khoản không tồn tại."})

            return res.status(200).json({
                msg: "Lấy dữ liệu thành công",
                data: userAcc
            })

        } catch (error: any) {
            return res.status(500).json({ msg: error.message });
        }
    }

    /// CÁC HÀM CỦA QTRI VIÊN
    async addUser(req: Request, res: Response) {
        try {
            
        } catch (error: any) {
            return res.status(500).json({ msg: error.message });
        }
    }

    async updateUser(req: Request, res: Response) {
        try {
            
        } catch (error: any) {
            return res.status(500).json({ msg: error.message });
        }
    }

    async disableUser(req: Request, res: Response) {
        try {
            
        } catch (error: any) {
            return res.status(500).json({ msg: error.message });
        }
    }
}

export default new AuthController;