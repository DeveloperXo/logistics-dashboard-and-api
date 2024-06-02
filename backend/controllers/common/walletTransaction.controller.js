import httpStatus from "http-status";
import { catchAsync } from 'utils/catchAsync';
import { walletTransactionService } from "services";

export const getWalletTransaction = catchAsync(async (req, res) => {
    const { walletTransactionId } = req.params;
    const filter = {
        _id: walletTransactionId
    };
    const options = {};
    const walletTransaction = await walletTransactionService.getOne(filter, options);
    return res.status(httpStatus.OK).send({ results: walletTransaction });
});

export const getAuthUserWalletTransaction = catchAsync(async (req, res) => {
    const filter = {
        customerId: req.user._id
    };
    const options = {};
    const walletTransaction = await walletTransactionService.getWalletTransactionList(filter, options);
    return res.status(httpStatus.OK).send({ results: walletTransaction });
});

export const listWalletTransaction = catchAsync(async (req, res) => {
    const filter = {};
    const options = {};
    const walletTransaction = await walletTransactionService.getWalletTransactionList(filter, options);
    return res.status(httpStatus.OK).send({ results: walletTransaction });
});


export const paginateWalletTransaction = catchAsync(async (req, res) => {
    const { page, limit } = req.params;
    const filter = {};
    const options = {
        page: page,
        limit: limit
    };
    const walletTransaction = await walletTransactionService.getWalletTransactionListWithPagination(filter, options);
    return res.status(httpStatus.OK).send({ results: walletTransaction });
});

export const listThisUserWalletTransactionWithBalance = catchAsync(async (req, res) => {
    const { customerId } = req.params;
    const filter = {
        customerId: customerId
    };
    const options = {};
    const walletTransaction = await walletTransactionService.getWalletTransactionList(filter, options);
    return res.status(httpStatus.OK).send({ results: walletTransaction });
});

export const createWalletTransaction = catchAsync(async (req, res) => {
    const { body } = req;
    const options = {};
    const walletTransaction = await walletTransactionService.createWalletTransaction(body, options);
    return res.status(httpStatus.CREATED).send({ results: walletTransaction });
});

export const updateWalletTransaction = catchAsync(async (req, res) => {
    const { body } = req;
    const { walletTransactionId } = req.params;
    const filter = {
        _id: walletTransactionId,
    };
    const options = { new: true };
    const walletTransaction = await walletTransactionService.updateWalletTransaction(filter, body, options);
    return res.status(httpStatus.OK).send({ results: walletTransaction });
});

export const uploadReceipt = catchAsync(async (req, res) => {
    const { body } = req;
    const { id } = body;
    const filter = {
        _id: id
    };
    console.log(req.body)
    body.receipt = req.file.filename
    console.log(body)
    const walletTransaction = await walletTransactionService.uploadReceipt(filter, body);
    return res.status(httpStatus.OK).send({ results: walletTransaction });
});

export const removeWalletTransaction = catchAsync(async (req, res) => {
    const { walletTransactionId } = req.params;
    const filter = {
        _id: walletTransactionId
    };
    const walletTransaction = await walletTransactionService.removeWalletTransaction(filter);
    return res.status(httpStatus.OK).send({ results: walletTransaction });
});