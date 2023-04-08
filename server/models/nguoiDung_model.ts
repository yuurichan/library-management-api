import sequelizeConnection from "../config/sequelize_conf";
import { DataType } from "sequelize-typescript";

const NguoiDung = sequelizeConnection.define('nguoidung', {
    idNguoiDung: {
        type: DataType.CHAR(8),
        primaryKey: true,
    },
    matKhau: {
        type: DataType.STRING(255),     // ta lưu trữ encrypted pwd nên ta cần size lớn hơn
        allowNull: false,
        validate: {
            is: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/
        }
    },
    hoTen: {
        type: DataType.STRING(20),
        allowNull: false,
        validate: {
            is: /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/
        }
    },
    ngaySinh: {
        type: DataType.DATE
    },
    soDienThoai: {
        type: DataType.CHAR(10)
    },
    vaiTro: {
        type: DataType.STRING(10),
        allowNull: false
    },
    trangThai: {
        type: DataType.BOOLEAN,
        allowNull: false
    }
},
{
    freezeTableName: true,
    timestamps: false
})

export default NguoiDung;