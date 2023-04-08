import jwt from "jsonwebtoken";

export const generateAccessToken = (payload: object) => {
    return jwt.sign(payload, `${process.env.ACCESS_TOKEN_SECRET}`, {
        expiresIn: "60m",
    });
};

export const generateRefreshToken = (payload: object) => {
    return jwt.sign(payload, `${process.env.REFRESH_TOKEN_SECRET}`, {
        expiresIn: "1d",
    });
};
