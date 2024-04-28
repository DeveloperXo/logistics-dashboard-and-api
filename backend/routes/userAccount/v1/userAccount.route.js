import express from 'express';
import { userAccountController } from 'controllers/userAccount';
import validate from 'middlewares/validate';
import { userAccountValidations } from 'validations/userAccount';
import { auxiliaryValidations } from 'validations/common';
import auth from 'middlewares/auth';
import upload from 'middlewares/multer';

const router = express.Router();

router.route('/').post(auth('admin'), validate(userAccountValidations.createUserAccount), userAccountController.createUserAccount);

router.route('/').get(auth('admin'), userAccountController.listUserAccount);

router.route('/filter/:functionAdditional').get(auth('admin'), userAccountController.listUserAccount);

router.route('/filter/:functionAdditional/:page/:limit').get(auth('admin'), userAccountController.listUserAccount);

router.route('/get-names').get(auth('admin'), userAccountController.listUserAccountName);

router.route('/paginate/:page/:limit').get(auth('admin'), validate(auxiliaryValidations.paginate), userAccountController.paginateUserAccount);

router.route('/this/:userAccountId').get(validate(userAccountValidations.validateObjectId), auth('admin'), userAccountController.getUserAccount);

router.route('/update/:userAccountId').put(validate(userAccountValidations.validateObjectId), auth('admin'), userAccountController.updateUserAccount);

router.route('/delete/:userAccountId').delete(validate(userAccountValidations.validateObjectId), auth('admin'), userAccountController.removeUserAccount);

router.route('/upload').put(auth('admin'), upload.array('files', 5),  userAccountController.uploadFiles);

router.route('/get-files/:userAccountId').get( userAccountController.getFiles);


module.exports = router;