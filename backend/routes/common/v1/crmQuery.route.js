import express from 'express';
import { crmQueryController } from 'controllers/common';
import validate from 'middlewares/validate';
import { crmQueryValidations } from 'validations/common';
import { auxiliaryValidations } from 'validations/common';
import auth from 'middlewares/auth';

const router = express.Router();

router.route('/').post(auth('admin'), validate(crmQueryValidations.createCrmQuery), crmQueryController.createCrmQuery);

router.route('/').get(auth('admin'), crmQueryController.listCrmQuery);

router.route('/paginate/:page/:limit').get(auth('admin'), validate(auxiliaryValidations.paginate), crmQueryController.paginateCrmQuery);

router.route('/this/:crmQueryId').get(validate(crmQueryValidations.validateObjectId), auth('admin'), crmQueryController.getCrmQuery);

router.route('/update/:crmQueryId').put(validate(crmQueryValidations.validateObjectId), auth('admin'), crmQueryController.updateCrmQuery);

router.route('/delete/:crmQueryId').delete(validate(crmQueryValidations.validateObjectId), auth('admin'), crmQueryController.removeCrmQuery);

module.exports = router;