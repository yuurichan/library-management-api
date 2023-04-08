import sequelizeConnection from "../config/sequelize_conf";
import { DataType } from "sequelize-typescript";

const TheLoai = sequelizeConnection.define('theloai', {
    idTheLoai: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tenTheLoai: {
        type: DataType.STRING(20),
        allowNull: false,
        unique: true
    }
},
{
    freezeTableName: true,
    timestamps: false
})

export default TheLoai;