import ApiError from 'utils/ApiError';
import httpStatus from 'http-status';
import { Wallet } from 'models';

export async function getWalletById(id, options = {}) {
    const wallet = await Wallet.findById(id, options.projection, options);
    return wallet;
}

export async function getOne(query, options = {}) {
    const wallet = await Wallet.findOne(query, options.projection, options);
    return wallet;
}

export async function getWalletList(filter, options = {}) {
    const wallet = await Wallet.find(filter, options.projection, options);
    return wallet;
}

export async function getWalletListWithPagination(filter, options = {}) {
    const wallet = await Wallet.paginate(filter, options);
    return wallet;
}

export async function createWallet(body) {
    try {
        const wallet = Wallet.create(body);
        return wallet;
    } catch (error) {
        throw new ApiError(httpStatus.BAD_REQUEST, error.message);
    }
}

export async function updateWallet(filter, body, options = {}) {
    const walletData = await getOne(filter, {});
    if (!walletData) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Wallet not found');
    }
    try {
        const wallet = await Wallet.findOneAndUpdate(filter, body, options);
        return wallet;
    } catch (error) {
        throw new ApiError(httpStatus.BAD_REQUEST, error.message);
    }
}

export async function removeWallet(filter) {
    const wallet = Wallet.findOneAndDelete(filter);
    return wallet;
}