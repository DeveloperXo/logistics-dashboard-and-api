import { logger } from "express-winston";
import httpStatus from "http-status";
import { adminService } from "services";
import { catchAsync } from 'utils/catchAsync';

export const getAdmin = catchAsync(async (req, res) => {
    const { adminId } = req.params;
    const filter = {
        _id: adminId
    };
    const options = {};
    const admin = await adminService.getOne(filter, options);
    return res.status(httpStatus.OK).send({ results: admin });
})

export const listAdmin = catchAsync(async (req, res) => {
    const filter = {};
    const options = {};
    const admin = await adminService.getAdminList(filter, options);
    return res.status(httpStatus.OK).send({ results: admin });
});

export const createAdmin = catchAsync(async (req, res) => {
    const { body } = req;
    const options = {};
    const admin = await adminService.createAdmin(body, options);
    return res.status(httpStatus.CREATED).send({ results: admin });
});

export const updateAdmin = catchAsync(async (req, res) => {
    const { body } = req;
    const { adminId } = req.params;
    const filter = {
        _id: adminId,
    };
    const options = { new: true };
    const user = await adminService.updateAdmin(filter, body, options);
    return res.status(httpStatus.OK).send({ results: user });
});