import httpStatus from "http-status";
import { catchAsync } from 'utils/catchAsync';
import { vehicleService } from "services";

export const getVehicle = catchAsync(async (req, res) => {
    const { vehicleId } = req.params;
    const filter = {
        _id: vehicleId
    };
    const options = {};
    const vehicle = await vehicleService.getOne(filter, options);
    return res.status(httpStatus.OK).send({ results: vehicle });
});

export const listVehicle = catchAsync(async (req, res) => {
    const filter = {};
    const options = {};
    const vehicle = await vehicleService.getVehicleList(filter, options);
    return res.status(httpStatus.OK).send({ results: vehicle });
});


export const paginateVehicle = catchAsync(async (req, res) => {
    const { page, limit } = req.params;
    const filter = {};
    const options = {
        page: page,
        limit: limit
    };
    const vehicle = await vehicleService.getVehicleListWithPagination(filter, options);
    return res.status(httpStatus.OK).send({ results: vehicle });
});

export const createVehicle = catchAsync(async (req, res) => {
    const { body } = req;
    const options = {};
    const vehicle = await vehicleService.createVehicle(body, options);
    return res.status(httpStatus.CREATED).send({ results: vehicle });
});

export const updateVehicle = catchAsync(async (req, res) => {
    const { body } = req;
    const { vehicleId } = req.params;
    const filter = {
        _id: vehicleId,
    };
    const options = { new: true };
    const vehicle = await vehicleService.updateVehicle(filter, body, options);
    return res.status(httpStatus.OK).send({ results: vehicle });
});

export const uploadImage = catchAsync(async (req, res) => {
    const { body } = req;
    const { id } = body;
    const filter = {
        _id: id
    };
    body.image = req.file.filename
    const vehicle = await vehicleService.uploadImage(filter, body);
    return res.status(httpStatus.OK).send({ results: vehicle });
});

export const removeVehicle = catchAsync(async (req, res) => {
    const { vehicleId } = req.params;
    const filter = {
        _id: vehicleId
    };
    const vehicle = await vehicleService.removeVehicle(filter);
    return res.status(httpStatus.OK).send({ results: vehicle });
});