import sequelizeConnection from "../config/sequelize_conf";
import { DataType } from "sequelize-typescript";
import TacGia from "./tacGia_model";
import Sach from "./sach_model";

const ThongTinSach = sequelizeConnection.define('thongtinsach', {
    idSach: {
        type: DataType.INTEGER,
        primaryKey: true,
        references: {
            model: 'sach',
            key: 'idSach'
        }
    },
    idTacGia: {
        type: DataType.INTEGER,
        primaryKey: true,
        references: {
            model: 'tacgia',
            key: 'idTacGia'
        },
    }
},
{
    freezeTableName: true,
    timestamps: false
})

TacGia.hasMany(ThongTinSach, {
    foreignKey: "idTacGia",
    constraints: false
});
Sach.hasMany(ThongTinSach, {
    foreignKey: "idSach",
    constraints: false
});
// TacGia.hasMany(ThongTinSach, {
//     as: "fk_idTacGia_TTS",
//     foreignKey: "idTacGia",
//     sourceKey: "idTacGia",
//     constraints: false
// })
//TacGia.hasMany(ThongTinSach)
// ThongTinSach.belongsTo(TacGia, {
//     foreignKey: "idTacGia",
//     targetKey: "idTacGia",
//     constraints: false
// });
// Sach.hasMany(ThongTinSach, {
//     as: "fk_idSach_TTS",
//     foreignKey: "idSach",
//     sourceKey: "idSach",
//     constraints: false
// })
// Sach.hasMany(ThongTinSach)
// ThongTinSach.belongsTo(Sach, {
//     foreignKey: "idSach",
//     targetKey: "idSach",
//     constraints: false
// });

export default ThongTinSach;