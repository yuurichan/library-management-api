import sequelizeConnection from "../config/sequelize_conf";
import { DataType } from "sequelize-typescript";
import TheLoai from "./theLoai_model";
import Sach from "./sach_model";

const ThongTinTheLoai = sequelizeConnection.define('thongtintheloai', {
    idSach: {
        type: DataType.INTEGER,
        primaryKey: true,
        references: {
            model: 'sach',
            key: 'idSach'
        }
    },
    idTheLoai: {
        type: DataType.INTEGER,
        primaryKey: true,
        references: {
            model: 'theloai',
            key: 'idTheLoai',
        }
    }
},
{
    freezeTableName: true,
    timestamps: false
})

TheLoai.hasMany(ThongTinTheLoai, {
    foreignKey: "idTheLoai",
    // sourceKey: "idTheLoai",
    constraints: false
})
// ThongTinTheLoai.belongsTo(TheLoai, {
//     // uniqueKey: "fk_idTheLoai_TTTL",
//     // foreignKey: "idTheLoai",
//     // targetKey: "idTheLoai",
//     // constraints: false
// });
Sach.hasMany(ThongTinTheLoai, {
    //as: "fk_idSach_TTTL",
    foreignKey: "idSach",
    // sourceKey: "idSach",
    constraints: false
})
// ThongTinTheLoai.belongsTo(Sach, {
//     foreignKey: "idSach",
//     targetKey: "idSach",
//     constraints: false
// });

export default ThongTinTheLoai;