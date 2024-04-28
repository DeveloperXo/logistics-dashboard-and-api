import httpStatus from "http-status";
import { catchAsync } from 'utils/catchAsync';
import { crmQueryService } from "services";

export const getCrmQuery = catchAsync(async (req, res) => {
    const { crmQueryId } = req.params;
    const filter = {
        _id: crmQueryId
    };
    const options = {};
    const crmQuery = await crmQueryService.getOne(filter, options);
    return res.status(httpStatus.OK).send({ results: crmQuery });
});

export const listCrmQuery = catchAsync(async (req, res) => {
    const filter = {};
    const options = {};
    const crmQuery = await crmQueryService.getCrmQueryList(filter, options);
    return res.status(httpStatus.OK).send({ results: crmQuery });
});


export const paginateCrmQuery = catchAsync(async (req, res) => {
    const { page, limit } = req.params;
    const filter = {};
    const options = {
        page: page,
        limit: limit
    };
    const crmQuery = await crmQueryService.getCrmQueryListWithPagination(filter, options);
    return res.status(httpStatus.OK).send({ results: crmQuery });
});

export const createCrmQuery = catchAsync(async (req, res) => {
    const { body } = req;
    const options = {};
    const crmQuery = await crmQueryService.createCrmQuery(body, options);
    return res.status(httpStatus.CREATED).send({ results: crmQuery });
});

export const updateCrmQuery = catchAsync(async (req, res) => {
    const { body } = req;
    const { crmQueryId } = req.params;
    const filter = {
        _id: crmQueryId,
    };
    const options = { new: true };
    const crmQuery = await crmQueryService.updateCrmQuery(filter, body, options);
    return res.status(httpStatus.OK).send({ results: crmQuery });
});


export const removeCrmQuery = catchAsync(async (req, res) => {
    const { crmQueryId } = req.params;
    const filter = {
        _id: crmQueryId
    };
    const crmQuery = await crmQueryService.removeCrmQuery(filter);
    return res.status(httpStatus.OK).send({ results: crmQuery });
});