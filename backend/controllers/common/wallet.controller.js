import httpStatus from "http-status";
import { catchAsync } from 'utils/catchAsync';
import { walletService, customerService } from "services";

export const getWallet = catchAsync(async (req, res) => {
    const { walletId } = req.params;
    const filter = {
        _id: walletId
    };
    const options = {};
    const wallet = await walletService.getOne(filter, options);
    return res.status(httpStatus.OK).send({ results: wallet });
});


export const listWallet = catchAsync(async (req, res) => {
    const filter = {};
    const options = {};
    const wallet = await walletService.getWalletList(filter, options);
    return res.status(httpStatus.OK).send({ results: wallet });
});

export const listWalletWithUserPaginated = catchAsync(async (req, res) => {
    const { page, limit } = req.params;
    const options = {
        page: parseInt(page, 10),
        limit: parseInt(limit, 10)
    };
    try {
        const wallet = await walletService.getWalletListWithPagination({}, options);

        if (wallet.results && wallet.results.length > 0) {
            const customerIds = wallet.results.map(e => e.customerId.toString());
            const users = await customerService.getCustomerList({ _id: { $in: customerIds } }, {
                select: "customerInformation.name customerInformation.phone accountInformation.email"
            });
            const userMap = new Map(users.map(user => [user._id.toString(), user]));
            wallet.results = wallet.results.map(e => ({
                ...e,
                user: userMap.get(e.customerId.toString()) || null
            }));
            return res.status(httpStatus.OK).send(wallet);
        } else {
            return res.status(httpStatus.OK).send(wallet);
        }
    } catch (error) {
        console.log('err', error)
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: error.message });
    }
});

export const getThisUserWallet = catchAsync(async (req, res) => {
    const wallet = await walletService.getOne({ customerId: req.user._id }, {});
    return res.status(httpStatus.OK).send({ results: wallet });
});

export const getThisUserWalletWithUser = catchAsync(async (req, res) => {
    const wallet = await walletService.getOne({ customerId: req.user._id }, {});
    const user = await customerService.getOne({ _id: req.user._id }, { select: "customerInformation.name customerInformation.phone accountInformation.email" });
    return res.status(httpStatus.OK).send({ results: { wallet, user } })
})

export const paginateWallet = catchAsync(async (req, res) => {
    const { page, limit } = req.params;
    const filter = {};
    const options = {
        page: page,
        limit: limit
    };
    const wallet = await walletService.getWalletListWithPagination(filter, options);
    return res.status(httpStatus.OK).send({ results: wallet });
});

export const createWallet = catchAsync(async (req, res) => {
    const { body } = req;
    const options = {};
    const wallet = await walletService.createWallet(body, options);
    return res.status(httpStatus.CREATED).send({ results: wallet });
});

export const updateWallet = catchAsync(async (req, res) => {
    const { body } = req;
    const { walletId } = req.params;
    const filter = {
        _id: walletId,
    };
    const options = { new: true };
    const wallet = await walletService.updateWallet(filter, body, options);
    return res.status(httpStatus.OK).send({ results: wallet });
});

export const removeWallet = catchAsync(async (req, res) => {
    const { walletId } = req.params;
    const filter = {
        _id: walletId
    };
    const wallet = await walletService.removeWallet(filter);
    return res.status(httpStatus.OK).send({ results: wallet });
});