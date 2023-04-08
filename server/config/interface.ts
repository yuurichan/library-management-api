import { Request } from 'express'

export interface UserLogin {
    idNguoiDung: string;
    matKhau: string;
}
export interface UserRegister extends UserLogin {
    hoTen: string;
    ngaySinh: string;
    soDienThoai: string;
}

export interface User extends UserRegister {
    //idNguoiDung: string;
    vaiTro: string;
    trangThai: boolean;
    //createdAt: string;
    //updatedAt: string;
}

export interface DecodeToken {
    id: string;
    iat: number;
    exp: number;
}

export interface RequestUser extends Request {
    user?: User
}