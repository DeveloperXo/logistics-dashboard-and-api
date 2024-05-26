import ApiError from 'utils/ApiError';
import httpStatus from 'http-status';
import { WebPrice } from 'models';

export async function getWebPriceById(id, options = {}) {
    const webPrice = await WebPrice.findById(id, options.projection, options);
    return webPrice;
}

export async function getOne(query, options = {}) {
    const webPrice = await WebPrice.findOne(query, options.projection, options);
    return webPrice;
}

export async function getWebPriceList(filter, options = {}) {
    const webPrice = await WebPrice.find(filter, options.projection, options);
    return webPrice;
}

export async function getWebPriceListWithPagination(filter, options = {}) {
    const webPrice = await WebPrice.paginate(filter, options);
    return webPrice;
}

export async function createWebPrice(body) {
    try {
        const webPrice = WebPrice.create(body);
        return webPrice;
    } catch (error) {
        throw new ApiError(httpStatus.BAD_REQUEST, error.message);
    }
}

export async function updateWebPrice(filter, body, options = {}) {
    const webPriceData = await getOne(filter, {});
    if (!webPriceData) {
        throw new ApiError(httpStatus.NOT_FOUND, 'WebPrice not found');
    }
    try {
        const webPrice = await WebPrice.findOneAndUpdate(filter, body, options);
        return webPrice;
    } catch (error) {
        throw new ApiError(httpStatus.BAD_REQUEST, error.message);
    }
}

export async function removeWebPrice(filter) {
    const webPrice = WebPrice.findOneAndDelete(filter);
    return webPrice;
}