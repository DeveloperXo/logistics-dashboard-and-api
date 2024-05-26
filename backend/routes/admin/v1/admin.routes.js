import express from 'express';
import { adminController } from 'controllers/admin';
import auth from 'middlewares/auth';
import validate from 'middlewares/validate';
import { adminValidations } from 'validations/admin';

const router = express.Router();

router.route('/').post(auth(['admin']), validate(adminValidations.createAdmin), adminController.createAdmin); // remove after testing
router.route('/').get(auth('admin'), adminController.listAdmin);
router.route('/:adminId').put(validate(adminValidations.updateAdmin), auth('admin'), adminController.updateAdmin);

module.exports = router;