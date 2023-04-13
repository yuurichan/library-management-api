import { Request, Response } from "express";
import sequelizeConnection from "../config/sequelize_conf";
import { QueryTypes } from "sequelize";
import { isValidDate, isValidNameInputs, isValidName } from "../config/dataValidate";
import { RequestUser, User } from "../config/interface";

class StatisticsController {
    // Thống kê sách theo tgia
    async getStat_byTacGia(req: Request, res: Response) {
        try {
            const statList: any = await sequelizeConnection.query("CALL THONGKE_TACGIA())", {
                type: QueryTypes.SELECT,
                raw: true,
                nest: true,
                plain: true
            })
            
            console.log(statList)
            return res.status(200).json({
                msg: "Lấy dữ liệu thành công",
                data: statList,
                length: Object.keys(statList).length
            })
        } catch (error: any) {
            return res.status(500).json({ msg: error.message });
        }
    }

    // Thống kê sách theo thể loại
    async getStat_byTheLoai(req: Request, res: Response) {
        try {
            const statList: any = await sequelizeConnection.query("CALL THONGKE_THELOAI())", {
                type: QueryTypes.SELECT,
                raw: true,
                nest: true,
                plain: true
            })
            
            console.log(statList)
            return res.status(200).json({
                msg: "Lấy dữ liệu thành công",
                data: statList,
                length: Object.keys(statList).length
            })
        } catch (error: any) {
            return res.status(500).json({ msg: error.message });
        }
    }

    // Thống kê số copies sách theo nxb
    async getStat_copiesByNXB(req: Request, res: Response) {
        try {
            const statList: any = await sequelizeConnection.query("CALL THONGKE_NHAXUATBAN())", {
                type: QueryTypes.SELECT,
                raw: true,
                nest: true,
                plain: true
            })
            
            console.log(statList)
            return res.status(200).json({
                msg: "Lấy dữ liệu thành công",
                data: statList,
                length: Object.keys(statList).length
            })
        } catch (error: any) {
            return res.status(500).json({ msg: error.message });
        }
    }

    // THống kê số copies sách theo tên sách
    async getStat_copiesByName(req: Request, res: Response) {
        try {
            const statList: any = await sequelizeConnection.query("CALL THONGKE_SACH())", {
                type: QueryTypes.SELECT,
                raw: true,
                nest: true,
                plain: true
            })
            
            console.log(statList)
            return res.status(200).json({
                msg: "Lấy dữ liệu thành công",
                data: statList,
                length: Object.keys(statList).length
            })
        } catch (error: any) {
            return res.status(500).json({ msg: error.message });
        }
    }

    // Thống kê số lượng phiếu mượn chưa được trả (phân biệt role giống ở dưới)
    async getStat_PMChuaTra(req: RequestUser, res: Response) {
        try {
            const user: User = req.user as User;
            if(!user)
                return res.status(400).json({ msg: "Tài khoản không tồn tại." });
            
            const statList: any = await sequelizeConnection.query("CALL THONGKE_PHIEUMUONCHUATRA(:idNguoiDung)", {
                replacements: {idNguoiDung: user.idNguoiDung},
                type: QueryTypes.SELECT,
                raw: true,
                nest: true,
                plain: true
            })
            // Trong MySQL, hàm THONGKE_PHIEUMUONCHUATRA sẽ dựa vào idNguoiDung để lấy vai trò người dùng,
            // từ đó hiển thị danh sách tương ứng với vai trò.
            // Thủ thư => Hiển thị tất cả số các phiếu mượn chưa trả của các người dùng
            // Người đọc thông thường => Chỉ hiển thị số phiếu mượn chưa trả của người đọc
            console.log(statList)
            return res.status(200).json({
                msg: "Lấy dữ liệu thành công",
                data: statList,
                length: Object.keys(statList).length
            })
        } catch (error: any) {
            return res.status(500).json({ msg: error.message });
        }
    }

    // Thống kê số phiếu mượn theo ID người đọc
    // Truyền ID người dùng vào procedure, dựa vào vai trò của người dùng mà sẽ hiển thị
    // danh sách đầy đủ (thủ thư) hoặc danh sách chỉ bao gồm người đọc
    async getStat_PM(req: RequestUser, res: Response) {
        try {
            const user: User = req.user as User;
            if(!user)
                return res.status(400).json({ msg: "Tài khoản không tồn tại." });

            const statList: any = await sequelizeConnection.query("CALL THONGKE_PHIEUMUON(:idNguoiDung)", {
                replacements: {idNguoiDung: user.idNguoiDung},
                type: QueryTypes.SELECT,
                raw: true,
                nest: true,
                plain: true
            })
            // Trong MySQL, hàm THONGKE_PHIEUMUON sẽ dựa vào idNguoiDung để lấy vai trò người dùng,
            // từ đó hiển thị danh sách tương ứng với vai trò.
            // Thủ thư => Hiển thị tất cả Phiếu mượn
            // Người đọc thông thường => Chỉ hiển thị phiếu mượn của người đọc
            console.log(statList)
            return res.status(200).json({
                msg: "Lấy dữ liệu thành công",
                data: statList,
                length: Object.keys(statList).length
            })
        } catch (error: any) {
            return res.status(500).json({ msg: error.message });
        }
    }
}

export default new StatisticsController;