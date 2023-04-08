import sequelizeConnection from "../config/sequelize_conf";
import { DataType } from "sequelize-typescript";

const Sach = sequelizeConnection.define('sach', {
    idSach: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tenSach: {
        type: DataType.STRING(50),
        allowNull: false
    },
    namSangTac: {
        type: DataType.SMALLINT
    }
},
{
    freezeTableName: true,
    timestamps: false
})

export default Sach;