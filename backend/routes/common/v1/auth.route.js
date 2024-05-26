import express from 'express';
import { authController } from 'controllers/common';
import validate from 'middlewares/validate';
import { authValidation } from 'validations/common';
import auth from 'middlewares/auth';

const router = express.Router();
// add validation-----
router.route('/me').get(auth(), authController.userInfo);
router.route('/login').post(validate(authValidation.loginUser), authController.login);
router.route('/logout').post(validate(authValidation.logout), authController.logout);

router.route('/refresh-auth').post(validate(authValidation.refreshTokens), authController.refreshAuth);
router.route('/refresh-token').post(validate(authValidation.refreshTokens), authController.refreshToken);

module.exports = router;