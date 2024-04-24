import ApiError from 'utils/ApiError';
import httpStatus from 'http-status';
import { Admin, Customer } from 'models';
import { logger } from '../config/logger';

export async function getAdminById(id, options = {}) {
    const admin = await Admin.findById(id, options.projection, options);
    return admin;
}

export async function getOne(query, options = {}) {
    const admin = await Admin.findOne(query, options.projection, options);
    return admin;
}

export async function getAdminList(filter, options = {}) {
    const admin = await Admin.find(filter, options.projection, options);
    return admin;
}

export async function createAdmin(body) {
    if (await Admin.isEmailTaken(body.email)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }
    if (await Customer.isEmailTaken(body.email)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }
    try {
        const admin = Admin.create(body);
        return admin;
    } catch (error) {
        logger.error('Error while creating admin: ', error);
        if (error.name === 'MongoServerError' && error.code === 11000) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'You are trying to create duiplicate entry');
        } else {
            throw new ApiError(httpStatus.BAD_REQUEST, error.message);
        }
    }
}

export async function updateAdmin(filter, body, options = {}) {
    const adminData = await getOne(filter, {});
    if (!adminData) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    if (body.email && (await Admin.isEmailTaken(body.email, adminData._id))) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }
    try {
        const admin = await Admin.findOneAndUpdate(filter, body, options);
        return admin;
    } catch (error) {
        logger.error('Error while updating admin: ', error);
        if (error.name === 'MongoError' && error.code === 11000) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'You are trying to create duiplicate entry');
        } else {
            throw new ApiError(httpStatus.BAD_REQUEST, error.message);
        }
    }
}