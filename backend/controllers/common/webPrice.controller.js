import httpStatus from "http-status";
import { catchAsync } from 'utils/catchAsync';
import { webPriceService } from "services";

export const getWebPrice = catchAsync(async (req, res) => {
    const { webPriceId } = req.params;
    const filter = {
        _id: webPriceId
    };
    const options = {};
    const webPrice = await webPriceService.getOne(filter, options);
    return res.status(httpStatus.OK).send({ results: webPrice });
});

export const listWebPrice = catchAsync(async (req, res) => {
    const filter = {};
    const options = {};
    const webPrice = await webPriceService.getWebPriceList(filter, options);
    return res.status(httpStatus.OK).send({ results: webPrice });
});


export const paginateWebPrice = catchAsync(async (req, res) => {
    const { page, limit } = req.params;
    const filter = {};
    const options = {
        page: page,
        limit: limit
    };
    const webPrice = await webPriceService.getWebPriceListWithPagination(filter, options);
    return res.status(httpStatus.OK).send({ results: webPrice });
});

export const createWebPrice = catchAsync(async (req, res) => {
    const { body } = req;
    const options = {};
    const webPrice = await webPriceService.createWebPrice(body, options);
    return res.status(httpStatus.CREATED).send({ results: webPrice });
});

export const updateWebPrice = catchAsync(async (req, res) => {
    const { body } = req;
    const { webPriceId } = req.params;
    const filter = {
        _id: webPriceId,
    };
    const options = { new: true };
    const webPrice = await webPriceService.updateWebPrice(filter, body, options);
    return res.status(httpStatus.OK).send({ results: webPrice });
});


export const removeWebPrice = catchAsync(async (req, res) => {
    const { webPriceId } = req.params;
    const filter = {
        _id: webPriceId
    };
    const webPrice = await webPriceService.removeWebPrice(filter);
    return res.status(httpStatus.OK).send({ results: webPrice });
});