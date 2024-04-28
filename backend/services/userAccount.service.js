import ApiError from 'utils/ApiError';
import httpStatus from 'http-status';
import { UserAccount, Admin } from 'models';
import { logger } from '../config/logger';

export async function getUserAccountById(id, options = {}) {
    const user = await UserAccount.findById(id, options.projection, options);
    return user;
}

export async function getOne(query, options = {}) {
    const user = await UserAccount.findOne(query, options.projection, options);
    return user;
}

export async function getUserAccountList(filter, options = {}) {
    const user = await UserAccount.find(filter, options.projection, options);
    return user;
}

export async function getUserAccountListWithPagination(filter, options = {}) {
    const user = await UserAccount.paginate(filter, options);
    return user;
}

export async function createUserAccount(body) {
    let email = body.email;
    if (await UserAccount.isEmailTaken(email)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }
    if (await Admin.isEmailTaken(email)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }
    try {
        const user = UserAccount.create(body);
        return user;
    } catch (error) {
        logger.error('Error while creating user: ', error);
        if (error.name === 'MongoError' && error.code === 11000) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'You are trying to create duiplicate entry');
        } else {
            throw new ApiError(httpStatus.BAD_REQUEST, error.message);
        }
    }
}

export async function updateUserAccount(filter, body, options = {}) {
    const userData = await getOne(filter, {});
    if (!userData) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    if (body.email && (await UserAccount.isEmailTaken(body.email, userData._id))){
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }
    try {
        const user = await UserAccount.findOneAndUpdate(filter, body, options);
        return user;
    } catch (error) {
        logger.error('Error while updating user: ', error);
        if (error.name === 'MongoError' && error.code === 11000) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'You are trying to create duiplicate entry');
        } else {
            throw new ApiError(httpStatus.BAD_REQUEST, error.message);
        }
    }
}

export async function uploadFiles(filter, body, options = {} ) {
    const userData = await getOne(filter, {});
    if (!userData) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    const { documents, _documents } = body;

    _documents.forEach(elem => {
        documents.forEach(e => {
            if(elem.fileName === e.originalname) {
                e.documentName = elem.documentName
            }
        })
    })
    try {
        const updatedUser = await UserAccount.findOneAndUpdate(
            filter, 
            { $push: { documents: { $each: documents } } }, 
            { new: true }
        );

        if (!updatedUser) {
            throw new Error('User not found');
        }
        return updatedUser;
    } catch(error) {
        logger.error('Error while uploading file: ', error);
        throw new ApiError(httpStatus.BAD_REQUEST, error.message);
    }
}

// export async function getFiles(filter) {
//     const user = await getOne(filter, {});
//     if (!user) {
//         throw new ApiError(httpStatus.BAD_REQUEST, 'User not found');
//     }
    
// }

export async function removeUserAccount(filter) {
    const user = UserAccount.findOneAndDelete(filter);
    return user;
}