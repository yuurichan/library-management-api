import sequelizeConnection from "../config/sequelize_conf";
import { DataType } from "sequelize-typescript";
import NhaXuatBan from "./nhaXuatBan_model";
import Sach from "./sach_model";

const XuatBanSach = sequelizeConnection.define('xuatbansach', {
    idXuatBan: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idSach: {
        type: DataType.INTEGER,
        allowNull: false,
        references: {
            model: 'sach',      // model name can also be used
            key: 'idSach'
        }
    },
    idNhaXuatBan: {
        type: DataType.INTEGER,
        allowNull: false,
        references: {
            model: 'nhaxuatban',
            key: 'idNhaXuatBan'
        } 
    }, 
    namXuatBan: {
        type: DataType.SMALLINT,
        allowNull: false
    }
},
{
    freezeTableName: true,
    timestamps: false
})

Sach.hasMany(XuatBanSach, {
    foreignKey: "idSach",
    constraints: false
});
NhaXuatBan.hasMany(XuatBanSach, {
    foreignKey: "idNhaXuatBan",
    constraints: false
});
// Sach.hasMany(XuatBanSach, {
//     //as: "fk_idSach_XBS",
//     foreignKey: "idSach",
//     sourceKey: "idSach",
//     constraints: false
// });
// Sach.hasMany(XuatBanSach, {
//     //as: "fk_idSach_XBS",
//     foreignKey: {
//         name: "idSach",
//         allowNull: false
//     }, 
//     sourceKey: "idSach",
//     constraints: false
// });
// XuatBanSach.belongsTo(Sach, {
//     foreignKey: 'idSach',
//     targetKey: 'idSach',
//     constraints: false
// });
// NhaXuatBan.hasMany(XuatBanSach, {
//     //as: "fk_idNhaXuatBan_XBS",
//     foreignKey: {
//         name: 'idNhaXuatBan',
//         allowNull: false
//     }, 
//     sourceKey: 'idNhaXuatBan',
//     constraints: false
// });
// XuatBanSach.belongsTo(NhaXuatBan, {
//     foreignKey: 'idNhaXuatBan',
//     targetKey: 'idNhaXuatBan',
//     constraints: false
// });

export default XuatBanSach;