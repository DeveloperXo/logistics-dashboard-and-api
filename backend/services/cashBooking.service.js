import ApiError from 'utils/ApiError';
import httpStatus from 'http-status';
import { CashBooking } from 'models';

export async function getCashBookingById(id, options = {}) {
    const cashBooking = await CashBooking.findById(id, options.projection, options);
    return cashBooking;
}

export async function getOne(query, options = {}) {
    const cashBooking = await CashBooking.findOne(query, options.projection, options);
    return cashBooking;
}

export async function getCashBookingList(filter, options = {}) {
    const cashBooking = await CashBooking.find(filter, options.projection, options);
    return cashBooking;
}

export async function getCashBookingListWithPagination(filter, options = {}) {
    const cashBooking = await CashBooking.paginate(filter, options);
    return cashBooking;
}

export async function createCashBooking(body) {
    try {
        const cashBooking = CashBooking.create(body);
        return cashBooking;
    } catch (error) {
        throw new ApiError(httpStatus.BAD_REQUEST, error.message);
    }
}

export async function updateCashBooking(filter, body, options = {}) {
    const cashBookingData = await getOne(filter, {});
    if (!cashBookingData) {
        throw new ApiError(httpStatus.NOT_FOUND, 'CashBooking not found');
    }
    try {
        const cashBooking = await CashBooking.findOneAndUpdate(filter, body, options);
        return cashBooking;
    } catch (error) {
        throw new ApiError(httpStatus.BAD_REQUEST, error.message);
    }
}

export async function uploadAttachment(filter, body, options = {} ) {
    const cashBookingData = await getOne(filter, {});
    if (!cashBookingData) {
        throw new ApiError(httpStatus.NOT_FOUND, 'CashBooking not found');
    }
    const { documents } = body;

    try {
        const updatedDoc = await CashBooking.findOneAndUpdate(
            filter, 
            { $push: { shipperInvoices: { $each: documents } } }, 
            { new: true }
        );

        if (!updatedDoc) {
            throw new Error(httpStatus.NOT_FOUND, 'Booking not found');
        }
        return updatedDoc;
    } catch(error) {
        throw new ApiError(httpStatus.BAD_REQUEST, error.message);
    }
}

export async function removeCashBooking(filter) {
    const cashBooking = CashBooking.findOneAndDelete(filter);
    return cashBooking;
}