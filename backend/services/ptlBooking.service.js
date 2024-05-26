import ApiError from 'utils/ApiError';
import httpStatus from 'http-status';
import { PtlBooking } from 'models';

export async function getPtlBookingById(id, options = {}) {
    const ptlBooking = await PtlBooking.findById(id, options.projection, options);
    return ptlBooking;
}

export async function getOne(query, options = {}) {
    const ptlBooking = await PtlBooking.findOne(query, options.projection, options);
    return ptlBooking;
}

export async function getPtlBookingList(filter, options = {}) {
    const ptlBooking = await PtlBooking.find(filter, options.projection, options);
    return ptlBooking;
}

export async function getPtlBookingListWithPagination(filter, options = {}) {
    const ptlBooking = await PtlBooking.paginate(filter, options);
    return ptlBooking;
}

export async function createPtlBooking(body) {
    try {
        const ptlBooking = PtlBooking.create(body);
        return ptlBooking;
    } catch (error) {
        throw new ApiError(httpStatus.BAD_REQUEST, error.message);
    }
}

export async function updatePtlBooking(filter, body, options = {}) {
    const ptlBookingData = await getOne(filter, {});
    if (!ptlBookingData) {
        throw new ApiError(httpStatus.NOT_FOUND, 'PtlBooking not found');
    }
    try {
        const ptlBooking = await PtlBooking.findOneAndUpdate(filter, body, options);
        return ptlBooking;
    } catch (error) {
        throw new ApiError(httpStatus.BAD_REQUEST, error.message);
    }
}

export async function uploadAttachment(filter, body, options = {} ) {
    const ptlBookingData = await getOne(filter, {});
    if (!ptlBookingData) {
        throw new ApiError(httpStatus.NOT_FOUND, 'PtlBooking not found');
    }
    const { documents } = body;

    try {
        const updatedDoc = await PtlBooking.findOneAndUpdate(
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

export async function removePtlBooking(filter) {
    const ptlBooking = PtlBooking.findOneAndDelete(filter);
    return ptlBooking;
}