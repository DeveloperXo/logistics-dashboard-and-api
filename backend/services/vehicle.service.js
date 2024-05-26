import ApiError from 'utils/ApiError';
import httpStatus from 'http-status';
import { Vehicle } from 'models';

export async function getVehicleById(id, options = {}) {
    const vehicle = await Vehicle.findById(id, options.projection, options);
    return vehicle;
}

export async function getOne(query, options = {}) {
    const vehicle = await Vehicle.findOne(query, options.projection, options);
    return vehicle;
}

export async function getVehicleList(filter, options = {}) {
    const vehicle = await Vehicle.find(filter, options.projection, options);
    return vehicle;
}

export async function getVehicleListWithPagination(filter, options = {}) {
    const vehicle = await Vehicle.paginate(filter, options);
    return vehicle;
}

export async function createVehicle(body) {
    try {
        const vehicle = Vehicle.create(body);
        return vehicle;
    } catch (error) {
        throw new ApiError(httpStatus.BAD_REQUEST, error.message);
    }
}

export async function updateVehicle(filter, body, options = {}) {
    const vehicleData = await getOne(filter, {});
    if (!vehicleData) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Vehicle not found');
    }
    try {
        const vehicle = await Vehicle.findOneAndUpdate(filter, body, options);
        return vehicle;
    } catch (error) {
        throw new ApiError(httpStatus.BAD_REQUEST, error.message);
    }
}

export async function uploadImage(filter, body, options = {} ) {
    const vehicleData = await getOne(filter, {});
    if (!vehicleData) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Vehicle not found');
    }
    try {
        const updatedVehicle = await Vehicle.findOneAndUpdate(
            filter, 
            body
        );

        if (!updatedVehicle) {
            throw new Error('Vehicle not found');
        }
        return updatedVehicle;
    } catch(error) {
        throw new ApiError(httpStatus.BAD_REQUEST, error.message);
    }
}

export async function removeVehicle(filter) {
    const vehicle = Vehicle.findOneAndDelete(filter);
    return vehicle;
}