import { Request, Response } from "express";
import sequelizeConnection from "../config/sequelize_conf";
import { QueryTypes } from "sequelize";
import { isValidName, isValidPassword } from "../config/dataValidate";
import { User, RequestUser } from "../config/interface";

class ListController {
    async getDS_NguoiDung(req: Request, res: Response) {
        try {
            const dataList: any = await sequelizeConnection.query("CALL DANHSACH_NGUOIDUNG()", {
                type: QueryTypes.SELECT,
                raw: true,
                nest: true,
                plain: true
            })

            let dataListArr: any[] = [];
            if (dataList) {
                for (const key_idx in dataList) {
                    dataListArr.push(dataList[`${key_idx}`]);
                }
            }

            // return res.status(200).json({
            //     msg: "Lấy dữ liệu thành công",
            //     data: dataList,
            //     length: Object.keys(dataList).length
            // })
            return res.status(200).json({
                msg: dataListArr.length !== 0 ? "Lấy dữ liệu thành công" : "Lấy dữ liệu thành công. Dữ liệu rỗng.",
                data: dataListArr,
                length: dataListArr.length
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
                plain: true
            })

            let dataListArr: any[] = [];
            if (dataList) {
                for (const key_idx in dataList) {
                    dataListArr.push(dataList[`${key_idx}`]);
                }
            }

            // return res.status(200).json({
            //     msg: "Lấy dữ liệu thành công",
            //     data: dataList,
            //     length: Object.keys(dataList).length
            // })
            return res.status(200).json({
                msg: dataListArr.length !== 0 ? "Lấy dữ liệu thành công" : "Lấy dữ liệu thành công. Dữ liệu rỗng.",
                data: dataListArr,
                length: dataListArr.length
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
                plain: true
            })

            let dataListArr: any[] = [];
            if (dataList) {
                for (const key_idx in dataList) {
                    dataListArr.push(dataList[`${key_idx}`]);
                }
            }

            // return res.status(200).json({
            //     msg: "Lấy dữ liệu thành công",
            //     data: dataList,
            //     length: Object.keys(dataList).length
            // })
            return res.status(200).json({
                msg: dataListArr.length !== 0 ? "Lấy dữ liệu thành công" : "Lấy dữ liệu thành công. Dữ liệu rỗng.",
                data: dataListArr,
                length: dataListArr.length
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
                plain: true
            })
            console.log(dataList)
            console.log('tst: ', dataList[0]['idSach'])
            console.log('tst: ', dataList['0']['idSach'])
            let dataListArr: any[] = [];
            if (dataList) {
                for (const key_idx in dataList) {
                    dataListArr.push(dataList[`${key_idx}`]);
                }
            }

            // return res.status(200).json({
            //     msg: "Lấy dữ liệu thành công",
            //     data: dataList,
            //     length: Object.keys(dataList).length
            // })
            return res.status(200).json({
                msg: dataListArr.length !== 0 ? "Lấy dữ liệu thành công" : "Lấy dữ liệu thành công. Dữ liệu rỗng.",
                data: dataListArr,
                length: dataListArr.length
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
                plain: true
            })

            let dataListArr: any[] = [];
            if (dataList) {
                for (const key_idx in dataList) {
                    dataListArr.push(dataList[`${key_idx}`]);
                }
            }

            // return res.status(200).json({
            //     msg: "Lấy dữ liệu thành công",
            //     data: dataList,
            //     length: Object.keys(dataList).length
            // })
            return res.status(200).json({
                msg: dataListArr.length !== 0 ? "Lấy dữ liệu thành công" : "Lấy dữ liệu thành công. Dữ liệu rỗng.",
                data: dataListArr,
                length: dataListArr.length
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
                plain: true
            })

            let dataListArr: any[] = [];
            if (dataList) {
                for (const key_idx in dataList) {
                    dataListArr.push(dataList[`${key_idx}`]);
                }
            }

            // return res.status(200).json({
            //     msg: "Lấy dữ liệu thành công",
            //     data: dataList,
            //     length: Object.keys(dataList).length
            // })
            return res.status(200).json({
                msg: dataListArr.length !== 0 ? "Lấy dữ liệu thành công" : "Lấy dữ liệu thành công. Dữ liệu rỗng.",
                data: dataListArr,
                length: dataListArr.length
            })

        } catch (error: any) {
            return res.status(500).json({ msg: error.message });
        }
    }

    async getDS_PhieuMuon(req: RequestUser, res: Response) {
        try {
            const user: User = req.user as User;
            if(!user)
                return res.status(400).json({ msg: "Tài khoản không tồn tại." });

            const dataList: any = await sequelizeConnection.query("CALL DANHSACH_PHIEUMUON(:idNguoiDung)", {
                replacements: {idNguoiDung: user.idNguoiDung},
                type: QueryTypes.SELECT,
                raw: true,
                nest: true,
                plain: true
            })
            // Trong MySQL, hàm DANHSACH_PHIEUMUON sẽ dựa vào idNguoiDung để lấy vai trò người dùng,
            // từ đó hiển thị danh sách tương ứng với vai trò.
            // Thủ thư => Hiển thị tất cả Phiếu mượn
            // Người đọc thông thường => Chỉ hiển thị phiếu mượn của người đọc
            console.log(dataList)
            let dataListArr: any[] = [];
            if (dataList) {
                for (const key_idx in dataList) {
                    dataListArr.push(dataList[`${key_idx}`]);
                }
            }

            // return res.status(200).json({
            //     msg: "Lấy dữ liệu thành công",
            //     data: dataList,
            //     length: Object.keys(dataList).length
            // })
            return res.status(200).json({
                msg: dataListArr.length !== 0 ? "Lấy dữ liệu thành công" : "Lấy dữ liệu thành công. Dữ liệu rỗng.",
                data: dataListArr,
                length: dataListArr.length
            })
            
        } catch (error: any) {
            return res.status(500).json({ msg: error.message });
        }
    }
}

export default new ListController