import { Request, Response } from "express";
import PhieuMuonSach from "../models/phieuMuonSach_model";
import sequelizeConnection from "../config/sequelize_conf";
import { QueryTypes } from "sequelize";
import { isValidDate, isValidNameInputs, isValidName } from "../config/dataValidate";

class PhieuMuonController {
    async addPhieuMuon(req: Request, res: Response) {
        try {
            
        } catch (error: any) {
            return res.status(500).json({ msg: error.message });
        }
    }

    async updatePhieuMuon(req: Request, res: Response) {
        try {
            
        } catch (error: any) {
            return res.status(500).json({ msg: error.message });
        }
    }

    async deletePhieuMuon(req: Request, res: Response) {
        try {
            
        } catch (error: any) {
            return res.status(500).json({ msg: error.message });
        }
    }

    async layThongTinPhieuMuon(req: Request, res: Response) {
        try {
            
        } catch (error: any) {
            return res.status(500).json({ msg: error.message });
        }
    }
}

export default new PhieuMuonController;