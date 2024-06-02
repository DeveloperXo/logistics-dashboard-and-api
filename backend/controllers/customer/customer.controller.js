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
    const { customerType } = req.params;
    const filter = {};
    if (customerType) {
        filter['accountInformation.customerType'] = customerType;
    }
    const options = {};
    const customer = await customerService.getCustomerList(filter, options);
    return res.status(httpStatus.OK).send({ results: customer });
});

export const paginateCustomer = catchAsync(async (req, res) => {
    const { page, limit, customerType } = req.params;
    const filter = {};
    if (customerType) {
        filter['accountInformation.customerType'] = customerType;
    }
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

// search
export const searchByEmail = catchAsync(async (req, res) => {
    const { email } = req.params;
    const filter = {
        emailLike: email
    };
    if (req.user.role !== 'admin') {
        filter._id = req.user._id;
    }
    const options = {
        select: "_id accountInformation.email"
    };
    const user = await customerService.searchByEmail(filter, options);
    return res.status(httpStatus.OK).send({ results: user });
})

export const getOneSelected = catchAsync(async (req, res) => {
    const { _filter, _options } = req.query;
    const filter = JSON.parse(_filter);
    const options = JSON.parse(_options);
    if (req.user.role !== 'admin') {
        filter._id = req.user._id;
    }
    const user = await customerService.getOne(filter, options);
    return res.status(httpStatus.OK).send({ results: [user] });
});