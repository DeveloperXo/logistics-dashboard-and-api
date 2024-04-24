import express from 'express';
import { customerController } from 'controllers/customer';
import validate from 'middlewares/validate';
import { customerValidations } from 'validations/customer';
import auth from 'middlewares/auth';

const router = express.Router();

router.route('/').post(validate(customerValidations.createCustomerSchema), customerController.createCustomer);

router.route('/').get(auth('admin'), customerController.listCustomer);
router.route('/:page/:limit').get(auth('admin'), customerController.paginateCustomer);

router.route('/:customerId').get(validate(customerValidations.validateObjectId), auth('admin'), customerController.getCustomer);

router.route('/:customerId').put(validate(customerValidations.validateObjectId), auth('admin'), customerController.updateCustomer);

router.route('/:customerId').delete(validate(customerValidations.validateObjectId), auth('admin'), customerController.removeCustomer);

module.exports = router;