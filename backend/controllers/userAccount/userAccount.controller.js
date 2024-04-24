import httpStatus from "http-status";
import { userAccountService } from "services";
import { catchAsync } from 'utils/catchAsync';

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
    const { page, limit } = req.params;
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
    console.log('req.file', req.file);
    console.log('req.files', req.files);
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
    console.log('req.file', req.file);
    console.log('req.files', req.files);
    console.log('req.body', req.body)
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
})

export const removeUserAccount = catchAsync(async (req, res) => {
    const { userAccountId } = req.params;
    const filter = {
        _id: userAccountId
    };
    const user = await userAccountService.removeUserAccount(filter);
    return res.status(httpStatus.OK).send({ results: user });
});