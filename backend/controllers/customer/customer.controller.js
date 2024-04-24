import httpStatus from "http-status";
import { customerService } from "services";
import { catchAsync } from 'utils/catchAsync';

export const getCustomer = catchAsync(async (req, res) => {
    const { customerId } = req.params;
    const filter = {
        _id: customerId
    };
    const options = {};
    const customer = await customerService.getOne(filter, options);
    return res.status(httpStatus.OK).send({ results: customer });
})

export const listCustomer = catchAsync(async (req, res) => {
    const filter = {};
    const options = {};
    const customer = await customerService.getCustomerList(filter, options);
    return res.status(httpStatus.OK).send({ results: customer });
});

export const paginateCustomer = catchAsync(async (req, res) => {
    const { page, limit } = req.params;
    const filter = {};
    const options = {
        page: page,
        limit: limit
    };
    const customer = await customerService.getCustomerListWithPagination(filter, options);
    return res.status(httpStatus.OK).send({ results: customer });
});

export const createCustomer = catchAsync(async (req, res) => {
    const { body } = req;
    const options = {};
    const customer = await customerService.createCustomer(body, options);
    return res.status(httpStatus.CREATED).send({ results: customer });
});

export const updateCustomer = catchAsync(async (req, res) => {
    const { body } = req;
    const { customerId } = req.params;
    const filter = {
        _id: customerId,
    };
    const options = { new: true };
    const user = await customerService.updateCustomer(filter, body, options);
    return res.status(httpStatus.OK).send({ results: user });
});

export const removeCustomer = catchAsync(async (req, res) => {
    const { customerId } = req.params;
    const filter = {
        _id: customerId
    };
    const user = await customerService.removeCustomer(filter);
    return res.status(httpStatus.OK).send({ results: user });
});