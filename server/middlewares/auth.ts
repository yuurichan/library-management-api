import { Request, Response, NextFunction } from "express";
import { DecodeToken, RequestUser } from '../config/interface'
import jwt from 'jsonwebtoken'
import NguoiDung from "../models/nguoiDung_model";

export const auth = async (req: RequestUser, res: Response, next: NextFunction) => {
    try {
        const token = req.header("Authorization");
    
        if (!token) return res.status(400).json({ msg: "Invalid Authentication." })

        const decode = <DecodeToken>jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`)
        if (!decode) return res.status(400).json({ msg: "Invalid Authentication." })

        const user: any = await NguoiDung.findByPk(decode.id, {raw: true});
        // let user;
        // await NguoiDung.findByPk(decode.id).then(data => {
        //     user = data?.get({plain: true});
        //     console.log(user);
        // })
        // .catch(error => {
        //     return res.status(400).json({
        //         msg: error.message
        //     });
        // });
        if (!user) return res.status(400).json({ msg: "This account does not exist." })

        req.user = user;

        next();
    } catch (error: any) {
        return res.status(500).json({ msg: error.message })
    }
}

export const authAdmin = async (req: RequestUser, res: Response, next: NextFunction) => {
    try {
        if (!req.user) {
            return res.status(400).json({ msg: "Invalid Authentication." })
        }      
        // Check role
        if (req.user.vaiTro !== "admin") return res.status(400).json({ msg: "You are not admin." });

        next();
    } catch (error: any) {
        return res.status(500).json({ msg: error.message })
    }
}

export const authLibrarian = async (req: RequestUser, res: Response, next: NextFunction) => {
    try {
        if (!req.user) {
            return res.status(400).json({ msg: "Invalid Authentication." })
        }      
        // Check role
        if (req.user.vaiTro !== "thu_thu" && req.user.vaiTro !== 'admin') return res.status(400).json({ msg: "Your account does not have the suitable role." });

        next();
    } catch (error: any) {
        return res.status(500).json({ msg: error.message })
    }
}