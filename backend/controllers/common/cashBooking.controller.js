import httpStatus from "http-status";
import { catchAsync } from 'utils/catchAsync';
import { cashBookingService } from "services";

export const getCashBooking = catchAsync(async (req, res) => {
    const { cashBookingId } = req.params;
    const filter = {
        _id: cashBookingId
    };
    const options = {};
    const cashBooking = await cashBookingService.getOne(filter, options);
    return res.status(httpStatus.OK).send({ results: cashBooking });
});

export const listCashBooking = catchAsync(async (req, res) => {
    const filter = {};
    const options = {};
    const cashBooking = await cashBookingService.getCashBookingList(filter, options);
    return res.status(httpStatus.OK).send({ results: cashBooking });
});


export const paginateCashBooking = catchAsync(async (req, res) => {
    const { page, limit } = req.params;
    const filter = {};
    const options = {
        page: page,
        limit: limit
    };
    const cashBooking = await cashBookingService.getCashBookingListWithPagination(filter, options);
    return res.status(httpStatus.OK).send({ results: cashBooking });
});

export const createCashBooking = catchAsync(async (req, res) => {
    const { body } = req;
    const options = {};
    const cashBooking = await cashBookingService.createCashBooking(body, options);
    return res.status(httpStatus.CREATED).send({ results: cashBooking });
});

export const updateCashBooking = catchAsync(async (req, res) => {
    const { body } = req;
    const { cashBookingId } = req.params;
    const filter = {
        _id: cashBookingId,
    };
    const options = { new: true };
    const cashBooking = await cashBookingService.updateCashBooking(filter, body, options);
    return res.status(httpStatus.OK).send({ results: cashBooking });
});

export const uploadAttachment = catchAsync(async (req, res) => {
    const { body } = req;
    const { id } = body;
    let { documents } = body; 
    const filter = {
        _id: id
    };
    documents = JSON.parse(documents);
    req.files.forEach(e => {
        documents.forEach(elem => {
            if (elem.file === e.originalname) elem.file = e.filename
        })
    })
    body.documents = documents;
    const cashBooking = await cashBookingService.uploadAttachment(filter, body);
    return res.status(httpStatus.OK).send({ results: cashBooking });
});

export const removeCashBooking = catchAsync(async (req, res) => {
    const { cashBookingId } = req.params;
    const filter = {
        _id: cashBookingId
    };
    const cashBooking = await cashBookingService.removeCashBooking(filter);
    return res.status(httpStatus.OK).send({ results: cashBooking });
});