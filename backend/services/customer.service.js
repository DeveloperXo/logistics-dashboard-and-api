import ApiError from 'utils/ApiError';
import httpStatus from 'http-status';
import { Customer, Admin } from 'models';
import { logger } from '../config/logger';

export async function getCustomerById(id, options = {}) {
    const customer = await Customer.findById(id, options.projection, options);
    return customer;
}

export async function getOne(query, options = {}) {
    const customer = await Customer.findOne(query, options.projection, options);
    return customer;
}

export async function getCustomerList(filter, options = {}) {
    const customer = await Customer.find(filter, options.projection, options);
    return customer;
}

export async function getCustomerListWithPagination(filter, options = {}) {
    const customer = await Customer.paginate(filter, options);
    return customer;
}

export async function createCustomer(body) {
    let email = body.accountInformation?.email;
    if (await Customer.isEmailTaken(email)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }
    if (await Admin.isEmailTaken(email)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }
    try {
        const customer = Customer.create(body);
        return customer;
    } catch (error) {
        logger.error('Error while creating customer: ', error);
        if (error.name === 'MongoError' && error.code === 11000) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'You are trying to create duiplicate entry');
        } else {
            throw new ApiError(httpStatus.BAD_REQUEST, error.message);
        }
    }
}

export async function updateCustomer(filter, body, options = {}) {
    const customerData = await getOne(filter, {});
    if (!customerData) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    if (body.email && (await Customer.isEmailTaken(body.email, customerData._id))) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }
    try {
        const customer = await Customer.findOneAndUpdate(filter, body, options);
        return customer;
    } catch (error) {
        logger.error('Error while updating customer: ', error);
        if (error.name === 'MongoError' && error.code === 11000) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'You are trying to create duiplicate entry');
        } else {
            throw new ApiError(httpStatus.BAD_REQUEST, error.message);
        }
    }
}

export async function removeCustomer(filter) {
    const user = Customer.findOneAndDelete(filter);
    return user;
}

// search
export async function searchByEmail(filter, options) {
    try {
        const user = await Customer.find({ 'accountInformation.email': { $regex: filter.emailLike}}, options.projection, options);

        return user;
    } catch (error) {
        throw new ApiError(httpStatus.BAD_REQUEST, error.message);
    }
}
