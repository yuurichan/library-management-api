import sequelizeConnection from "../config/sequelize_conf";
import { DataType } from "sequelize-typescript";

const TacGia = sequelizeConnection.define('tacgia', {
    idTacGia: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    tenTacGia: {
        type: DataType.STRING(50),
        allowNull: false,
        unique: true,
        validate: {
            is: /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/
        }
    },
    ngaySinh: {
        type: DataType.DATE
    },
    queQuan: {
        type: DataType.STRING(100)
    }
}, 
{
    freezeTableName: true,
    timestamps: false
})

export default TacGia;