import { Request, Response } from "express";
import sequelizeConnection from "../config/sequelize_conf";
import { QueryTypes } from "sequelize";
import { isValidName, isValidPassword } from "../config/dataValidate";

class ListController {
    async getDS_NguoiDung(req: Request, res: Response) {
        try {
            const dataList: any = await sequelizeConnection.query("CALL DANHSACH_NGUOIDUNG()", {
                type: QueryTypes.SELECT,
                raw: true,
                nest: true,
            })

            return res.status(200).json({
                msg: "Lấy dữ liệu thành công",
                data: dataList
            })
        } catch (error: any) {
            return res.status(500).json({ msg: error.message });
        }
    }

    async getDS_TacGia(req: Request, res: Response) {
        try {
            const dataList: any = await sequelizeConnection.query("CALL DANHSACH_TACGIA()", {
                type: QueryTypes.SELECT,
                raw: true,
                nest: true,
            })

            return res.status(200).json({
                msg: "Lấy dữ liệu thành công",
                data: dataList
            })
        } catch (error: any) {
            return res.status(500).json({ msg: error.message });
        }
    }

    async getDS_TheLoai(req: Request, res: Response) {
        try {
            const dataList: any = await sequelizeConnection.query("CALL DANHSACH_THELOAI()", {
                type: QueryTypes.SELECT,
                raw: true,
                nest: true,
            })

            return res.status(200).json({
                msg: "Lấy dữ liệu thành công",
                data: dataList
            })
        } catch (error: any) {
            return res.status(500).json({ msg: error.message });
        }
    }

    async getDS_Sach(req: Request, res: Response) {
        try {
            const dataList: any = await sequelizeConnection.query("CALL DANHSACH_SACH()", {
                type: QueryTypes.SELECT,
                raw: true,
                nest: true,
            })

            return res.status(200).json({
                msg: "Lấy dữ liệu thành công",
                data: dataList
            })
        } catch (error: any) {
            return res.status(500).json({ msg: error.message });
        }
    }

    async getDS_NhaXuatBan(req: Request, res: Response) {
        try {
            const dataList: any = await sequelizeConnection.query("CALL DANHSACH_NHAXUATBAN()", {
                type: QueryTypes.SELECT,
                raw: true,
                nest: true,
            })

            return res.status(200).json({
                msg: "Lấy dữ liệu thành công",
                data: dataList
            })
        } catch (error: any) {
            return res.status(500).json({ msg: error.message });
        }
    }

    async getDS_XuatBanSach(req: Request, res: Response) {
        try {
            const dataList: any = await sequelizeConnection.query("CALL DANHSACH_XUATBANSACH()", {
                type: QueryTypes.SELECT,
                raw: true,
                nest: true,
            })

            return res.status(200).json({
                msg: "Lấy dữ liệu thành công",
                data: dataList
            })
        } catch (error: any) {
            return res.status(500).json({ msg: error.message });
        }
    }
}

export default new ListController