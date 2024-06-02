import express from 'express';
import { customerController } from 'controllers/customer';
import validate from 'middlewares/validate';
import { customerValidations } from 'validations/customer';
import auth from 'middlewares/auth';

const router = express.Router();

router.route('/').post(auth(['admin']), validate(customerValidations.createCustomerSchema), customerController.createCustomer);

router.route('/').get(auth(['admin']), customerController.listCustomer);

router.route('/filter/:customerType').get(auth(['admin']), customerController.listCustomer);

router.route('/filter/:customerType/:page/:limit').get(auth(['admin']), customerController.paginateCustomer);

router.route('/paginate/:page/:limit').get(auth(['admin']), customerController.paginateCustomer);

router.route('/this/:customerId').get(auth(['admin']), validate(customerValidations.validateObjectId), customerController.getCustomer);

router.route('/this/:customerId').put(auth(['admin']), validate(customerValidations.validateObjectId), validate(customerValidations.createCustomerSchema), customerController.updateCustomer);

router.route('/this/update-status/:customerId').put(auth(['admin']), validate(customerValidations.updateStatus), customerController.updateCustomer);

router.route('/this/:customerId').delete(auth(['admin']), validate(customerValidations.validateObjectId), customerController.removeCustomer);

router.route('/search-emails/:email').get(auth(['admin', 'customer', 'businessAssociate']), validate(customerValidations.searchByEmail), customerController.searchByEmail);

router.route('/get-selected').get(auth(['admin', 'customer', 'businessAssociate']), customerController.getOneSelected);

module.exports = router;