import sequelizeConnection from "../config/sequelize_conf";
import { DataType } from "sequelize-typescript";

const NhaXuatBan = sequelizeConnection.define('nhaxuatban', {
    idNhaXuatBan: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tenNhaXuatBan: {
        type: DataType.STRING(50),
        allowNull: false
    },
    namThanhLap: {
        type: DataType.DATE
    }
},
{
    freezeTableName: true,
    timestamps: false
})

export default NhaXuatBan;