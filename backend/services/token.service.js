import jwt from "jsonwebtoken";
import moment from "moment";
import httpStatus from "http-status";
import { Token } from 'models';
import enumModel from 'models/enum.model';
import ApiError from 'utils/ApiError';
import config from 'config/config';
import { customerService, adminService } from 'services';

export const generateToken = (userId, expires, secret = config.jwt.secret) => {
    const payload = {
        sub: userId,
        iat: moment().unix(),
        exp: expires.unix()
    };
    return jwt.sign(payload, secret);
};

export const saveToken = async (token, userId, expires, type, blacklisted = false) => {
    const tokenDoc = await Token.create({
        token,
        user: userId,
        expires: expires.toDate(),
        type,
        blacklisted
    });
    return tokenDoc;
}

export const verifyToken = async (token, type) => {
    try {
        const payload = jwt.verify(token, config.jwt.secret, { ignoreExpiration: false });
        let user = adminService.getOne({ _id: payload.sub });
        if (!user) {
            user = await customerService.getOne({ _id: payload.sub });
            if (!user) throw new ApiError(httpStatus.BAD_REQUEST, 'User Not Exists');
        }
        const tokenDoc = await Token.findOne({ token, type, user: payload.sub });
        if (!tokenDoc) {
            throw new ApiError(httpStatus.NOT_FOUND, 'Invalid Token');
        }
        return tokenDoc;
    } catch (error) {
        throw new ApiError(httpStatus.BAD_REQUEST, error);
    }
}

export const generateAuthTokens = async (user) => {
    const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
    const accessToken = generateToken(user.id, accessTokenExpires);
    const refreshTokenExpires = moment().add(config.jwt.refreshExpirationDays, 'days');
    const refreshToken = generateToken(user.id, refreshTokenExpires);
    await saveToken(refreshToken, user.id, refreshTokenExpires, enumModel.EnumTypeOfToken.REFRESH);
    return {
        access: {
            token: accessToken,
            expires: accessTokenExpires.toDate(),
        },
        refresh: {
            token: refreshToken,
            expires: refreshTokenExpires.toDate(),
        },
    };
};

export const refreshAccess = async (user) => {
    const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
    const accessToken = generateToken(user.id, accessTokenExpires);
    return {
        access: {
            token: accessToken,
            expires: accessTokenExpires.toDate()
        }
    }
}

export const invalidateToken = async (invalidReq) => {
    const { refreshToken: token } = invalidReq;
    const tokenDoc = await Token.findOne({ type: enumModel.EnumTypeOfToken.REFRESH, token });
    if (!tokenDoc) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Token not found');
    } else {
        return Token.findByIdAndDelete(tokenDoc._id);
    }
};