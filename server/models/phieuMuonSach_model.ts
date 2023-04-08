import sequelizeConnection from "../config/sequelize_conf";
import { DataType } from "sequelize-typescript";
//import { DataTypes } from "sequelize";
import XuatBanSach from "./xuatBanSach_model";
import NguoiDung from "./nguoiDung_model";
import Sach from "./sach_model";

const PhieuMuonSach = sequelizeConnection.define('phieumuonsach', {
    idPhieuMuon: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idXuatBan: {
        type: DataType.INTEGER,
        allowNull: false,
        references: {
            model: 'xuatban',
            key: 'idXuatBan',
        }
    },
    idNguoiDoc: {
        type: DataType.CHAR(8),
        allowNull: false,
        references: {
            model: 'nguoidung',
            key: 'idNguoiDung',
        }
    },
    idThuThu: {
        type: DataType.CHAR(8),
        allowNull: false,
        references: {
            model: 'nguoidung',
            key: 'idNguoiDung',
        }
    },
    ngayMuon: {
        type: DataType.DATE,
        allowNull: false
    },
    ngayTra: {
        type: DataType.DATE
    },
    hanTra: {
        type: DataType.DATE,
        allowNull: false
    },
    treHan: {
        type: DataType.BOOLEAN
    }
},
{
    freezeTableName: true,
    timestamps: false
})

XuatBanSach.hasMany(PhieuMuonSach, {
    foreignKey: "idXuatBan",
    constraints: false
})
NguoiDung.hasMany(PhieuMuonSach, {
    foreignKey: "idNguoiDoc",
    constraints: false
})
NguoiDung.hasMany(PhieuMuonSach, {
    foreignKey: "idThuThu",
    constraints: false
})

// Sach.hasMany(PhieuMuonSach, {
//     foreignKey: "idSach",
//     sourceKey: "idSach",
//     constraints: false
// })
// PhieuMuonSach.belongsTo(Sach, {
//     as: "fk_idSach_PMS",
//     foreignKey: "idSach",
//     targetKey: "idSach",
//     constraints: false
// });
// NguoiDung.hasMany(PhieuMuonSach, {
//     foreignKey: "idNguoiDoc",
//     sourceKey: "idNguoiDung",
//     constraints: false
// })
// PhieuMuonSach.belongsTo(NguoiDung, {
//     as: "fk_idNguoiDoc_PMS",
//     foreignKey: "idNguoiDoc",
//     targetKey: "idNguoiDung",
//     constraints: false
// });
// NguoiDung.hasMany(PhieuMuonSach, {
//     foreignKey: "idThuThu",
//     sourceKey: "idNguoiDung",
//     constraints: false
// })
PhieuMuonSach.belongsTo(NguoiDung, {
    as: "fk_idThuThu_PMS",
    foreignKey: "idThuThu",
    targetKey: "idNguoiDung",
    constraints: false
});

export default PhieuMuonSach;