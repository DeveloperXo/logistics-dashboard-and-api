import httpStatus from "http-status";
import ApiError from 'utils/ApiError';
import { userAccountService } from "services";
import { catchAsync } from 'utils/catchAsync';
import fs from 'fs';
import path from 'path';

export const getUserAccount = catchAsync(async (req, res) => {
    const { userAccountId } = req.params;
    const filter = {
        _id: userAccountId
    };
    const options = {};
    const user = await userAccountService.getOne(filter, options);
    return res.status(httpStatus.OK).send({ results: user });
});

export const listUserAccount = catchAsync(async (req, res) => {
    const filter = {};
    const { functionAdditional } = req.params;
    if (functionAdditional) {
        filter['functionAdditional'] = functionAdditional;
    }
    console.log('filter', filter)
    const options = {};
    const user = await userAccountService.getUserAccountList(filter, options);
    return res.status(httpStatus.OK).send({ results: user });
});

export const listUserAccountName = catchAsync(async (req, res) => {
    const filter = {};
    const options = {
        select: 'name _id'
    };
    const user = await userAccountService.getUserAccountList(filter, options);
    return res.status(httpStatus.OK).send({ results: user });
});

export const paginateUserAccount = catchAsync(async (req, res) => {
    const { page, limit, functionAdditional } = req.params;
    if (functionAdditional) {
        filter['functionAdditional'] = functionAdditional;
    }
    const filter = {};
    const options = {
        page: page,
        limit: limit
    };
    const user = await userAccountService.getUserAccountListWithPagination(filter, options);
    return res.status(httpStatus.OK).send({ results: user });
});

export const createUserAccount = catchAsync(async (req, res) => {
    const { body } = req;
    const options = {};
    const user = await userAccountService.createUserAccount(body, options);
    return res.status(httpStatus.CREATED).send({ results: user });
});

export const updateUserAccount = catchAsync(async (req, res) => {
    const { body } = req;
    const { userAccountId } = req.params;
    const filter = {
        _id: userAccountId,
    };
    const options = { new: true };
    const user = await userAccountService.updateUserAccount(filter, body, options);
    return res.status(httpStatus.OK).send({ results: user });
});

export const uploadFiles = catchAsync(async (req, res) => {
    const { body } = req;
    const { id, _documents } = body;
    const filter = {
        _id: id
    };
    const documents = [];
    req.files.forEach(e => {
        documents.push({ fileName: e.filename, fileType: e.mimetype, originalname: e.originalname });
    })
    body.documents = documents;
    body._documents = JSON.parse(_documents);
    const user = await userAccountService.uploadFiles(filter, body);
    return res.status(httpStatus.OK).send({ results: user });
});

export const getFiles = catchAsync(async (req, res) => {
    const { userAccountId } = req.params;
    const filter = {
        _id: userAccountId
    }
    const user = await userAccountService.getOne(filter);
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found.');
    }

    const filesDir = path.join(__dirname, '../../uploads/userAccount');
    const fileNames = [];
    user.documents.forEach(elem => {
        fileNames.push(elem.fileName);
    });

    console.log('filena,mse', fileNames)
    fs.readdir(filesDir, (err, files) => {
        if (err) {
            throw new ApiError(httpStatus.BAD_REQUEST, `Error getting files: ${err}`);
        }
        const filteredFiles = files.filter(file => fileNames.includes(file))
        console.log('filteredFiles', filteredFiles)
        const fileList = filteredFiles.map(filename => ({ name: filename }));

        res.status(httpStatus.OK).send({ results: fileList });
    })
})

export const removeUserAccount = catchAsync(async (req, res) => {
    const { userAccountId } = req.params;
    const filter = {
        _id: userAccountId
    };
    const user = await userAccountService.removeUserAccount(filter);
    return res.status(httpStatus.OK).send({ results: user });
});