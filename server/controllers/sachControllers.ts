import { Request, Response } from "express";
import Sach from "../models/sach_model";
import sequelizeConnection from "../config/sequelize_conf";
import { QueryTypes } from "sequelize";
import { isValidDate, isValidNameInputs, isValidName } from "../config/dataValidate";

class SachController {
    // Search books
    // Đặt điều kiện ở phần f-e: Nếu gtri search == '' thì hiển thị hết?
    // Có thể đặt điều kiện dựa vào length của obj trả về
    // Giới hạn lượng ký tự search ở f-e (20 ký tự)
    async getSachByName(req: Request, res: Response) {
        try {
            //const { tenSach } = req.query.keyword as any;
            // Vì ta cần nhận string thay vì nhận 1 obj chứa key tenSach nên ta để
            // thẳng biến tenSach
            // Ta nhận query là keyword, bên front-end sẽ phải gửi đến query keyword tương ứng
            // req.query.keyword !== req.params; query.keyword sẽ tạo tự động ?keyword=...
            // req.params yêu cầu có sẵn gtri ở URL (:id)
            const tenSach = req.query.keyword as string;
            console.log('encode: ', tenSach);
            const s_tenSach = decodeURIComponent(tenSach)
            console.log('decode: ', s_tenSach);

            const foundSach: any = await sequelizeConnection.query('CALL TIMKIEMSACH_TENSACH(:tenSach)',
            {
                replacements: {tenSach: s_tenSach},
                type: QueryTypes.SELECT,    // Kiểu query là SELECT, để định dạng obj trả về của sqlCon.query
                raw: true,      // Dữ liệu trả về ko cần phải đc format theo model cụ thể nào
                nest: true,     // Cho các thuộc tính của obj hiển thị đúng định dạng thay vì phải sử dụng dấu . (foo.bar = ...)
                plain: true     // Chỉ trả về data, không trả về metadata kèm theo
            })

            let foundSachArr: any[] = [];
            if (foundSach) {
                for (const key_idx in foundSach) {
                    foundSachArr.push(foundSach[`${key_idx}`])
                }
            }
                

            // foundSach trả về 1 mảng các obj gồm [data, metadata]
            // Ta chỉ cần lấy obj đầu tiên là data, và plain: true giúp ta làm điều đó
            // Mỗi record trong table mà data trả về sẽ có key là 1 số như: "0", "1",...
            // Ta lấy chúng bằng cách sử dụng data['1'],...
            // return res.status(200).json({
            //     msg: "Lấy dữ liệu thành công",
            //     data: foundSach,
            //     length: Object.keys(foundSach).length
            // })
            return res.status(200).json({
                msg: foundSachArr.length !== 0 ? "Lấy dữ liệu thành công" : "Lấy dữ liệu thành công. Dữ liệu rỗng.",
                data: foundSachArr,
                length: foundSachArr.length
            })

        } catch (error: any) {
            return res.status(500).json({ msg: error.message });
        }
    }

    async getSachByYear(req: Request, res: Response) {
        try {
            //const { namXuatBan } = req.body;
            const namXuatBan = req.query.keyword as string;
            const s_namXuatBan = decodeURIComponent(namXuatBan);
            if (isNaN(parseInt(s_namXuatBan)) === true)
                return res.status(400).json({ msg: "Invalid year." });

            const foundSach: any = await sequelizeConnection.query('CALL TIMKIEMSACH_NAMXUATBAN(:namXuatBan)',
            {
                replacements: {namXuatBan: parseInt(s_namXuatBan)},
                type: QueryTypes.SELECT,    // Kiểu query là SELECT, để định dạng obj trả về của sqlCon.query
                raw: true,      // Dữ liệu trả về ko cần phải đc format theo model cụ thể nào
                nest: true,     // Cho các thuộc tính của obj hiển thị đúng định dạng thay vì phải sử dụng dấu . (foo.bar = ...)
                plain: true     // Chỉ trả về data, không trả về metadata kèm theo
            })

            let foundSachArr: any[] = [];
            if (foundSach) {
                for (const key_idx in foundSach) {
                    foundSachArr.push(foundSach[`${key_idx}`])
                }
            }
                

            // foundSach trả về 1 mảng các obj gồm [data, metadata]
            // Ta chỉ cần lấy obj đầu tiên là data, và plain: true giúp ta làm điều đó
            // Mỗi record trong table mà data trả về sẽ có key là 1 số như: "0", "1",...
            // Ta lấy chúng bằng cách sử dụng data['1'],...
            // return res.status(200).json({
            //     msg: "Lấy dữ liệu thành công",
            //     data: foundSach,
            //     length: Object.keys(foundSach).length
            // })
            return res.status(200).json({
                msg: foundSachArr.length !== 0 ? "Lấy dữ liệu thành công" : "Lấy dữ liệu thành công. Dữ liệu rỗng.",
                data: foundSachArr,
                length: foundSachArr.length
            })

        } catch (error: any) {
            return res.status(500).json({ msg: error.message });
        }
    }

    async getSachByAuthor(req: Request, res: Response) {
        try {
            //const { tenTacGia } = req.body as any;
            const tenTacGia = req.query.keyword as string;
            const s_tenTacGia = decodeURIComponent(tenTacGia);

            const foundSach: any = await sequelizeConnection.query('CALL TIMKIEMSACH_TENTACGIA(:tenTacGia)',
            {
                replacements: {tenTacGia: s_tenTacGia},
                type: QueryTypes.SELECT,    // Kiểu query là SELECT, để định dạng obj trả về của sqlCon.query
                raw: true,      // Dữ liệu trả về ko cần phải đc format theo model cụ thể nào
                nest: true,     // Cho các thuộc tính của obj hiển thị đúng định dạng thay vì phải sử dụng dấu . (foo.bar = ...)
                plain: true     // Chỉ trả về data, không trả về metadata kèm theo
            })

            let foundSachArr: any[] = [];
            if (foundSach) {
                for (const key_idx in foundSach) {
                    foundSachArr.push(foundSach[`${key_idx}`])
                }
            }
                

            // foundSach trả về 1 mảng các obj gồm [data, metadata]
            // Ta chỉ cần lấy obj đầu tiên là data, và plain: true giúp ta làm điều đó
            // Mỗi record trong table mà data trả về sẽ có key là 1 số như: "0", "1",...
            // Ta lấy chúng bằng cách sử dụng data['1'],...
            // return res.status(200).json({
            //     msg: "Lấy dữ liệu thành công",
            //     data: foundSach,
            //     length: Object.keys(foundSach).length
            // })
            return res.status(200).json({
                msg: foundSachArr.length !== 0 ? "Lấy dữ liệu thành công" : "Lấy dữ liệu thành công. Dữ liệu rỗng.",
                data: foundSachArr,
                length: foundSachArr.length
            })

        } catch (error: any) {
            return res.status(500).json({ msg: error.message });
        }
    }

    async getSachByGenre(req: Request, res: Response) {
        try {
            //const { tenTheLoai } = req.body;
            const tenTheLoai = req.query.keyword as string;
            const s_tenTheLoai = decodeURIComponent(tenTheLoai);

            const foundSach: any = await sequelizeConnection.query('CALL TIMKIEMSACH_TENTHELOAI(:tenTheLoai)',
            {
                replacements: {tenTheLoai: s_tenTheLoai},
                type: QueryTypes.SELECT,    // Kiểu query là SELECT, để định dạng obj trả về của sqlCon.query
                raw: true,      // Dữ liệu trả về ko cần phải đc format theo model cụ thể nào
                nest: true,     // Cho các thuộc tính của obj hiển thị đúng định dạng thay vì phải sử dụng dấu . (foo.bar = ...)
                plain: true     // Chỉ trả về data, không trả về metadata kèm theo
            })

            let foundSachArr: any[] = [];
            if (foundSach) {
                for (const key_idx in foundSach) {
                    foundSachArr.push(foundSach[`${key_idx}`])
                }
            }
                

            // foundSach trả về 1 mảng các obj gồm [data, metadata]
            // Ta chỉ cần lấy obj đầu tiên là data, và plain: true giúp ta làm điều đó
            // Mỗi record trong table mà data trả về sẽ có key là 1 số như: "0", "1",...
            // Ta lấy chúng bằng cách sử dụng data['1'],...
            // return res.status(200).json({
            //     msg: "Lấy dữ liệu thành công",
            //     data: foundSach,
            //     length: Object.keys(foundSach).length
            // })
            return res.status(200).json({
                msg: foundSachArr.length !== 0 ? "Lấy dữ liệu thành công" : "Lấy dữ liệu thành công. Dữ liệu rỗng.",
                data: foundSachArr,
                length: foundSachArr.length
            })

        } catch (error: any) {
            return res.status(500).json({ msg: error.message });
        }
    }

    async getSachByNXB(req: Request, res: Response) {
        try {
            //const { tenNXB } = req.body;
            const tenNXB = req.query.keyword as string;
            const s_tenNXB = decodeURIComponent(tenNXB);

            const foundSach: any = await sequelizeConnection.query('CALL TIMKIEMSACH_TENNHAXUATBAN(:tenNXB)',
            {
                replacements: {tenNXB: s_tenNXB},
                type: QueryTypes.SELECT,    // Kiểu query là SELECT, để định dạng obj trả về của sqlCon.query
                raw: true,      // Dữ liệu trả về ko cần phải đc format theo model cụ thể nào
                nest: true,     // Cho các thuộc tính của obj hiển thị đúng định dạng thay vì phải sử dụng dấu . (foo.bar = ...)
                plain: true     // Chỉ trả về data, không trả về metadata kèm theo
            })

            let foundSachArr: any[] = [];
            if (foundSach) {
                for (const key_idx in foundSach) {
                    foundSachArr.push(foundSach[`${key_idx}`])
                }
            }
                

            // foundSach trả về 1 mảng các obj gồm [data, metadata]
            // Ta chỉ cần lấy obj đầu tiên là data, và plain: true giúp ta làm điều đó
            // Mỗi record trong table mà data trả về sẽ có key là 1 số như: "0", "1",...
            // Ta lấy chúng bằng cách sử dụng data['1'],...
            // return res.status(200).json({
            //     msg: "Lấy dữ liệu thành công",
            //     data: foundSach,
            //     length: Object.keys(foundSach).length
            // })
            return res.status(200).json({
                msg: foundSachArr.length !== 0 ? "Lấy dữ liệu thành công" : "Lấy dữ liệu thành công. Dữ liệu rỗng.",
                data: foundSachArr,
                length: foundSachArr.length
            })

        } catch (error: any) {
            return res.status(500).json({ msg: error.message });
        }
    }

    ///// Các hàm về Sách của thủ thư
    async layThongTinSach(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if(isNaN(parseInt(id)) === true)
                return res.status(400).json({ msg: "Invalid ID format." });
            
            const infoSach: any = await sequelizeConnection.query('CALL THONGTIN_SACH(:idSach)',
            {
                replacements: {idSach: parseInt(id)},
                type: QueryTypes.SELECT,
                raw: true,
                nest: true,
                plain: true
            })

            if (!infoSach) {
                return res.status(400).json({
                    msg: "Sách không tồn tại"
                })
            }

            return res.status(200).json({
                msg: "Lấy dữ liệu thành công",
                data: infoSach,
                length: Object.keys(infoSach).length
            })

        } catch (error: any) {
            return res.status(500).json({ msg: error.message });
        }
    }

    /// CHANGE THIS ///
    async addSach(req: Request, res: Response) {
        try {
            const { tenSach, namSangTac } = req.body;

            if (tenSach.trim() === '' || (namSangTac !== '' && !isValidDate(namSangTac)))
                return res.status(400).json({ msg: "Invalid data." });

            const newSach: any = await Sach.create({
                tenSach: tenSach,
                namSangTac: namSangTac ? namSangTac : null
            })

            return res.status(200).json({
                msg: "Thêm thông tin sách thành công",
                data: newSach
            })

        } catch (error: any) {
            return res.status(500).json({ msg: error.message });
        }
    }
    async addSach_details(req: Request, res: Response) {
        try {
            // const str = "Khi, ban, ,, o0o"
            // str.split(",").forEach((item, index) => {
            //     console.log(index, ': ', item.trim())
            // })
            const { idSach, tacGiaInputs, theLoaiInputs } = req.body;
            if (isNaN(parseInt(idSach)))
                return res.status(400).json({
                    msg: "Invalid ID format."
                })
            //if (tacGiaInputs.trim() === '' || theLoaiInputs.trim() === '')
            if (!isValidNameInputs(tacGiaInputs) || !isValidNameInputs(theLoaiInputs))
                return res.status(400).json({
                    msg: "Invalid data."
                })
            
            // Phải cho ktra ở chuỗi ở logic frontend xem nếu split rồi trim ra nó có hợp lệ hết ko, nếu có mới pass qua backend
            // Hợp lệ khi tất cả gtri trong mảng !== '' và hợp lệ với regex
            // (hàm invalid name inputs)

            // Thêm các tác giả vào Sach hiện tại
            await tacGiaInputs.split(",").forEach((data: string, index: any) => {
                if (data.trim() !== '' && isValidName(data.trim()))
                    sequelizeConnection.query('CALL THEM_THONGTINSACH(:idSach, :tenTacGia)', {
                        replacements: {idSach: parseInt(idSach), tenTacGia: data.trim().replace(/\s+/g, " ")}
                    })
            })
            
            // Thêm các thể loại vào Sach hiện tại
            await theLoaiInputs.split(",").forEach((data: string, index: any) => {
                if (data.trim() !== '' && isValidName(data.trim()))
                    sequelizeConnection.query('CALL THEM_THONGTINTHELOAI(:idSach, :tenTheLoai)', {
                        replacements: {idSach: parseInt(idSach), tenTheLoai: data.trim().replace(/\s+/g, " ")}
                    })
            })

            return res.status(200).json({
                msg: "Thêm thông tin phụ của sách thành công",
            })
            
        } catch (error: any) {
            return res.status(500).json({ msg: error.message });
        }
    }
    ///// ----- Hàm tạo Sach đầy đủ -----
    async addSach_complete(req: Request, res: Response) {
        try {
            const { tenSach, namSangTac, tacGiaInputs, theLoaiInputs } = req.body
            if (tenSach.trim() === '' || tenSach === '' || (namSangTac !== '' && isNaN(parseInt(namSangTac))))
                return res.status(400).json({ msg: "Invalid data." });
            if (!isValidNameInputs(tacGiaInputs) || !isValidNameInputs(theLoaiInputs))
                return res.status(400).json({
                    msg: "Invalid data."
                })
            
            const addedSachID: any = await sequelizeConnection.query('SELECT THEM_SACH(:tenSach, :namSangTac)', {
                replacements: {tenSach: tenSach, namSangTac: namSangTac},
                type: QueryTypes.SELECT,
                raw: true,
                nest: true,
                plain: true     // Vì dữ liệu của function trả về là array [data, metadata]. Gtri trả về lấy thẳng phần tử data
            })
            if (isNaN(parseInt(addedSachID)) === true) {
                await sequelizeConnection.query('CALL XOA_SACH(:idSach)', {
                    replacements: {idSach: parseInt(addedSachID)},
                    type: QueryTypes.DELETE
                })
                return res.status(400).json({
                    msg: "Invalid ID format - Book adding reverted."
                })
            }

            // Thêm các tác giả vào Sach hiện tại
            await tacGiaInputs.split(",").forEach((data: string, index: any) => {
                if (data.trim() !== '' && isValidName(data.trim()))
                    sequelizeConnection.query('CALL THEM_THONGTINSACH(:idSach, :tenTacGia)', {
                        replacements: {idSach: parseInt(addedSachID), tenTacGia: data.trim().replace(/\s+/g, " ")}
                    })
            })
            
            // Thêm các thể loại vào Sach hiện tại
            await theLoaiInputs.split(",").forEach((data: string, index: any) => {
                if (data.trim() !== '' && isValidName(data.trim()))
                    sequelizeConnection.query('CALL THEM_THONGTINTHELOAI(:idSach, :tenTheLoai)', {
                        replacements: {idSach: parseInt(addedSachID), tenTheLoai: data.trim().replace(/\s+/g, " ")}
                    })
            })

            return res.status(200).json({
                msg: "Thêm sách thành công",
                dataID: addedSachID
            })

        } catch (error: any) {
            return res.status(500).json({ msg: error.message });
        }
    }

    /// Needs changes
    async deleteSach(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if(isNaN(parseInt(id)) === true)
                return res.status(400).json({ msg: "Invalid ID format." });

            const deletedSach: any = await Sach.findByPk(parseInt(id), {raw: true})
            // const ttS: any = await
            if (deletedSach === null)
                return res.status(400).json({ msg: "Sách không tồn tại." });    // Xóa vẫn được, nó đưa tín hiệu 200 vì nó chạy đc, nhưng ko thực sự xóa gì cả

            
            // await Sach.destroy({where: {idSach: id}});
            await sequelizeConnection.query('CALL XOA_SACH(:idSach)', {
                replacements: {idSach: parseInt(id)},
                type: QueryTypes.DELETE
            })
            // XOA_SACH sẽ bao gồm việc:
            // Xóa trong THONGTINSACH, THONGTINTHELOAI
            // Tìm idXuatBan chứa idSach trong XUATBANSACH, xóa PHIEUMUON có idXuatBan tương ứng trc, xong qua XUATBANSACH
            // Hoặc kiểm tra xem PHIEUMUONSACH còn cái nào có idXuatBan ko, nếu còn ==> Ko xóa
            // Nếu vậy sd boolean?

            return res.status(200).json({
                msg: "Xóa thông tin sách thành công",
                data: deletedSach
            })

        } catch (error: any) {
            return res.status(500).json({ msg: error.message });
        }
    }

    /// update normally
    async updateSach(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { tenSach, namSangTac, tacGiaInputs, theLoaiInputs } = req.body;

            if(isNaN(parseInt(id)) === true)
                return res.status(400).json({ msg: "Invalid ID format." });
            
            const selectedSach: any = await Sach.findByPk(parseInt(id), {raw: true});
            if (selectedSach === null || tenSach === '' || (!isValidDate(namSangTac) && namSangTac !== ''))
                return res.status(400).json({ msg: "Invalid data." });

            await Sach.update({
                tenSach: tenSach,
                namSangTac: namSangTac ? namSangTac : null
            },
            {
                where: {idSach: parseInt(id)}
            })

            return res.status(200).json({
                msg: "Cập nhật thông tin sách thành công",
                idCapNhat: id
            })

        } catch (error: any) {
            return res.status(500).json({ msg: error.message });
        }
    }
    /// ----- Hàm update sách đầy đủ -----
    async updateSach_complete(req: Request, res: Response) {
        try {
            //const { id } = req.params;
            const { id, tenSach, namSangTac, tacGiaInputs, theLoaiInputs } = req.body
            if (tenSach.trim() === '' || tenSach === '' || (namSangTac !== '' && isNaN(parseInt(namSangTac))))
                return res.status(400).json({ msg: "Invalid data." });
            if (!isValidNameInputs(tacGiaInputs) || !isValidNameInputs(theLoaiInputs))
                return res.status(400).json({
                    msg: "Invalid data."
                })
            if(isNaN(parseInt(id)))
                return res.status(400).json({
                    msg: "Invalid ID format."
                })
            
            await sequelizeConnection.query('CALL SUA_SACH(:idSach, :tenSach, :namSangTac)', {
                replacements: {idSach: id, tenSach: tenSach, namSangTac: namSangTac}
            })
            // Vì hàm SUA_SACH xóa hết THONGTINSACH và THONGTINTHELOAI chứa idSach nên ta phải thêm lại / cập nhật lại
            // Trong f-e thì có thể để gtri default trong input những gtri trc đó của THONGTINSACH và THONGTINTHELOAI?
            // Thêm các tác giả vào Sach hiện tại
            await tacGiaInputs.split(",").forEach((data: string, index: any) => {
                if (data.trim() !== '' && isValidName(data.trim()))
                    sequelizeConnection.query('CALL THEM_THONGTINSACH(:idSach, :tenTacGia)', {
                        replacements: {idSach: parseInt(id), tenTacGia: data.trim().replace(/\s+/g, " ")}
                    })
            })
            
            // Thêm các thể loại vào Sach hiện tại
            await theLoaiInputs.split(",").forEach((data: string, index: any) => {
                if (data.trim() !== '' && isValidName(data.trim()))
                    sequelizeConnection.query('CALL THEM_THONGTINTHELOAI(:idSach, :tenTheLoai)', {
                        replacements: {idSach: parseInt(id), tenTheLoai: data.trim().replace(/\s+/g, " ")}
                    })
            })

            return res.status(200).json({
                msg: "Cập nhật sách thành công",
                dataID: id
            })

        } catch (error: any) {
            return res.status(500).json({ msg: error.message });
        }
    }


}

export default new SachController;