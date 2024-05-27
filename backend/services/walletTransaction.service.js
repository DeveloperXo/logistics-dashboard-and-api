import ApiError from 'utils/ApiError';
import httpStatus from 'http-status';
import { WalletTransaction, Enum } from 'models';
import { walletService } from "services";

export async function getWalletTransactionById(id, options = {}) {
    const walletTransaction = await WalletTransaction.findById(id, options.projection, options);
    return walletTransaction;
}

export async function getOne(query, options = {}) {
    const walletTransaction = await WalletTransaction.findOne(query, options.projection, options);
    return walletTransaction;
}

export async function getWalletTransactionList(filter, options = {}) {
    const walletTransaction = await WalletTransaction.find(filter, options.projection, options);
    return walletTransaction;
}

export async function getWalletTransactionListWithPagination(filter, options = {}) {
    const walletTransaction = await WalletTransaction.paginate(filter, options);
    return walletTransaction;
}

export async function createWalletTransaction(body) {
    try {
        const wallet = await walletService.getOne({ customerId: body.customerId });
        body.balance = body.amountType == Enum.EnumTypeOfTransaction.CREDIT ? wallet.balance + body . amount : wallet.balance - body.amount;
        body.lastRechargeDate = new Date(Date.now()).toISOString();
        const walletTransaction = WalletTransaction.create(body);
        await walletService.updateWallet({ customerId: body.customerId }, {
            lastRechargeDate: body.lastRechargeDate
        })
        if (body.amountType == Enum.EnumTypeOfTransaction.CREDIT) {
            await walletService.updateWallet({ customerId: body.customerId }, { $inc: { balance: body.amount } }, {});
        } else {
            await walletService.updateWallet({ customerId: body.customerId }, { $inc: { balance: - body.amount } }, {});
        }
        return walletTransaction;
    } catch (error) {
        throw new ApiError(httpStatus.BAD_REQUEST, error.message);
    }
}

export async function updateWalletTransaction(filter, body, options = {}) {
    const walletTransactionData = await getOne(filter, {});
    if (!walletTransactionData) {
        throw new ApiError(httpStatus.NOT_FOUND, 'WalletTransaction not found');
    }
    try {
        const walletTransaction = await WalletTransaction.findOneAndUpdate(filter, body, options);
        return walletTransaction;
    } catch (error) {
        throw new ApiError(httpStatus.BAD_REQUEST, error.message);
    }
}

export async function uploadReceipt(filter, body, options = {} ) {
    const walletTransactionData = await getOne(filter, {});
    if (!walletTransactionData) {
        throw new ApiError(httpStatus.NOT_FOUND, 'WalletTransaction not found');
    }
    try {
        const updatedWalletTransaction = await WalletTransaction.findOneAndUpdate(
            filter, 
            body
        );

        if (!updatedWalletTransaction) {
            throw new Error('WalletTransaction not found');
        }
        return updatedWalletTransaction;
    } catch(error) {
        throw new ApiError(httpStatus.BAD_REQUEST, error.message);
    }
}

export async function removeWalletTransaction(filter) {
    const walletTransaction = WalletTransaction.findOneAndDelete(filter);
    return walletTransaction;
}