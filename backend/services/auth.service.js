import { customerService, adminService, tokenService } from 'services';
import httpStatus from "http-status";
import ApiError from 'utils/ApiError';
import bcrypt from 'bcryptjs';
import { EnumTypeOfToken, EnumCodeTypeOfCode } from 'models/enum.model';

export const loginUserWithEmailAndPassword = async (email, password) => {
    let user = await customerService.getOne({ 'accountInformation.email': email }, { projection: { accountInformation: 1, customerInformation: 1, status: 1, role: 1 } });
    if (!user) {
        user = await adminService.getOne({ email });
        if (!user) throw new ApiError(httpStatus.BAD_REQUEST, 'Incorrect email or password');
    } else {
        user.password = user?.customerInformation?.phone;
    }
    let isValid;
    if (user?.role === 'customer') { isValid = password == user.password; }
    else { isValid = await bcrypt.compare(password, user.password); }
    if (!isValid) throw new ApiError(httpStatus.BAD_REQUEST, 'Incorrect email or password');

    const isEligible = user.status === 'active';
    if (!isEligible) throw new ApiError(httpStatus.BAD_REQUEST, 'Account status is not active.');

    return user;
};

export const refreshAuth = async (refreshToken) => {
    try {
        const refreshTokenDoc = await tokenService.verifyToken(refreshToken, EnumTypeOfToken.REFRESH);
        let user = await adminService.getAdminById(refreshTokenDoc.user);
        if (!user) {
            // add customer condition -----
            throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Token');
        }
        await refreshTokenDoc.deleteOne();
        return tokenService.generateAuthTokens(user);
    } catch (error) {
        throw new ApiError(httpStatus.UNAUTHORIZED, `ERROR: ${error}`);
    }
};

export const refreshToken = async (refreshToken) => {
    try {
        const refreshTokenDoc = await tokenService.verifyToken(refreshToken, EnumTypeOfToken.REFRESH);
        const user = await adminService.getAdminById(refreshTokenDoc.user);
        if (!user) {
            // add customer
            throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Token');
        }
        return tokenService.refreshAccess(user);
    } catch (error) {
        throw new ApiError(httpStatus.UNAUTHORIZED, `${error}`);
    }
}