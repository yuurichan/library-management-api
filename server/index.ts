import dotenv from "dotenv";
dotenv.config();

import express from "express";
const app = express();

import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import routers from "./routers";

import sequelizeConnection from "./config/sequelize_conf";

//------ IMPORT MODELS TO SYNC / CREATE IN DATABASE ------
import ThongTinSach from "./models/thongTinSach_model";
import ThongTinTheLoai from "./models/thongTinTheLoai_model";
import TheLoai from "./models/theLoai_model";
import XuatBanSach from "./models/xuatBanSach_model";
import PhieuMuonSach from "./models/phieuMuonSach_model";
import TacGia from "./models/tacGia_model";
import Sach from "./models/sach_model";
import NhaXuatBan from "./models/nhaXuatBan_model";
import NguoiDung from "./models/nguoiDung_model";
//--------------------------------------------------------

const PORT = process.env.PORT || 5000;

// middlewares
// built-in middleware to handle urlencoded data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json parsing (both body and head)
app.use(express.json());

// middleware for cookies
app.use(cookieParser());

// cors
app.use(cors({
    // origin: ["http://localhost:3000", 
    // "https://auto-attend.vercel.app", 
    // "https://automatic-attendance-ui-yuurichan.vercel.app", 
    // "https://automatic-attendance-ui-git-main-yuurichan.vercel.app",
    // "https://api.cloudinary.com/v1_1/dxnfxl89q/image/upload"],
    // credentials: true
}));

// middleware for output colors
app.use(morgan("dev"));

// Routers
// xuatBanSach and phieuMuon are not yet completed
app.use("/api", routers.authRouter);
app.use("/api", routers.tacGiaRouter);
app.use("/api", routers.nxbRouter);
app.use("/api", routers.theLoaiRouter);
app.use("/api", routers.xuatBanSachRouter);
app.use("/api", routers.ttSRouter);
app.use("/api", routers.ttTLRouter);
app.use("/api", routers.phieuMuonRouter);
app.use("/api", routers.sachRouter);
app.use("/api", routers.userRouter);
app.use("/api", routers.listRouter);
app.use("/api", routers.wakeUpRouter);

// Few minor changes for some requests
app.get('/favicon.ico', (req, res) => res.status(204).end());     // Stops the GET /favicon.ico 404 (Since we don't actually need one for our web service)
app.all('^/$|/index(.html)?', (req, res) => {       // Added to indicate that '/' is the index page, with a response of 200
    res.status(200);
    res.type('txt').send("index");
    //return res.status(200).json({msg: "Index"});
});

app.all('*', (req, res) => {
    res.status(404);
    //res.json({error: "404 Not Found"});    // so we change 200 to 404
    res.type('txt').send("404 Not Found");
    //return res.status(404).json({msg: "404 Not Found"});
})

// async function connectServer() {
//     try {
//         await sequelizeConnection.authenticate();
//         await sequelizeConnection.sync();
//         console.log('Connection has been established successfully.');

//         app.listen(PORT, () => {
//             console.log(`Server running on port ${PORT}`)
//         })
//     } catch (error) {
//         console.error('Error:', error);
//     }
// }

// connectServer();
function dataSync() {
    try {
        TheLoai.sync();
        TacGia.sync();
        Sach.sync();
        NhaXuatBan.sync();
        NguoiDung.sync();
        ThongTinSach.sync();
        ThongTinTheLoai.sync();
        XuatBanSach.sync();
        PhieuMuonSach.sync();
    }
    catch (error) {
        console.error('Error:', error);
    }
}

sequelizeConnection.authenticate().then(() => {
    console.log('Connection has been established successfully.');
    //dataSync();
    sequelizeConnection.sync({alter: false}).then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`)
        })
    })
    // app.listen(PORT, () => {
    //     console.log(`Server running on port ${PORT}`)
    // })
    
});