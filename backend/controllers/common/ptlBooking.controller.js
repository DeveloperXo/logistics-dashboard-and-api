import httpStatus from "http-status";
import { catchAsync } from 'utils/catchAsync';
import { ptlBookingService } from "services";

export const getPtlBooking = catchAsync(async (req, res) => {
    const { ptlBookingId } = req.params;
    const filter = {
        _id: ptlBookingId
    };
    const options = {};
    const ptlBooking = await ptlBookingService.getOne(filter, options);
    return res.status(httpStatus.OK).send({ results: ptlBooking });
});

export const listPtlBooking = catchAsync(async (req, res) => {
    const filter = {};
    const options = {};
    const ptlBooking = await ptlBookingService.getPtlBookingList(filter, options);
    return res.status(httpStatus.OK).send({ results: ptlBooking });
});


export const paginatePtlBooking = catchAsync(async (req, res) => {
    const { page, limit } = req.params;
    const filter = {};
    const options = {
        page: page,
        limit: limit
    };
    const ptlBooking = await ptlBookingService.getPtlBookingListWithPagination(filter, options);
    return res.status(httpStatus.OK).send({ results: ptlBooking });
});

export const createPtlBooking = catchAsync(async (req, res) => {
    const { body } = req;
    const options = {};
    const ptlBooking = await ptlBookingService.createPtlBooking(body, options);
    return res.status(httpStatus.CREATED).send({ results: ptlBooking });
});

export const updatePtlBooking = catchAsync(async (req, res) => {
    const { body } = req;
    const { ptlBookingId } = req.params;
    const filter = {
        _id: ptlBookingId,
    };
    const options = { new: true };
    const ptlBooking = await ptlBookingService.updatePtlBooking(filter, body, options);
    return res.status(httpStatus.OK).send({ results: ptlBooking });
});

export const uploadAttachment = catchAsync(async (req, res) => {
    const { body } = req;
    const { id } = body;
    const filter = {
        _id: id
    };
    body.attachment = req.file.filename
    const ptlBooking = await ptlBookingService.uploadAttachment(filter, body);
    return res.status(httpStatus.OK).send({ results: ptlBooking });
});

export const removePtlBooking = catchAsync(async (req, res) => {
    const { ptlBookingId } = req.params;
    const filter = {
        _id: ptlBookingId
    };
    const ptlBooking = await ptlBookingService.removePtlBooking(filter);
    return res.status(httpStatus.OK).send({ results: ptlBooking });
});