import httpStatus from "http-status";
import { catchAsync } from 'utils/catchAsync';
import { authService, tokenService, adminService, customerService } from 'services';

export const userInfo = catchAsync(async (req, res) => {
    let user = await adminService.getAdminById(req.user._id);
    if (!user) {
        user = await customerService.getCustomerById(req.user._id);
    }
    res.status(httpStatus.OK).send({ results: { user } });
});

export const login = catchAsync(async (req, res) => {
    const { email, password } = req.body;
    const user = await authService.loginUserWithEmailAndPassword(email, password);
    const tokens = await tokenService.generateAuthTokens(user);

    res.status(httpStatus.OK).send({ results: { user, tokens } });
})

export const logout = catchAsync(async (req, res) => {
    await tokenService.invalidateToken(req.body);
    res.status(httpStatus.OK).send({ results: { success: true } });
});

export const refreshAuth = catchAsync(async (req, res) => {
    const tokens = await authService.refreshAuth(req.body.refreshToken);
    res.status(httpStatus.OK).send({ results: { ...tokens } });
});

export const refreshToken = catchAsync(async (req, res) => {
    const tokens = await authService.refreshToken(req.body.refreshToken);
    res.status(httpStatus.OK).send({ results: { ...tokens } });
});