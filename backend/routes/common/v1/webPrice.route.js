import express from 'express';
import { webPriceController } from 'controllers/common';
import validate from 'middlewares/validate';
import { webPriceValidations } from 'validations/common';
import { auxiliaryValidations } from 'validations/common';
import auth from 'middlewares/auth';

const router = express.Router();

router.route('/').post(auth(['admin']), validate(webPriceValidations.createWebPrice), webPriceController.createWebPrice);

router.route('/').get(auth(['admin']), webPriceController.listWebPrice);

router.route('/paginate/:page/:limit').get(auth(['admin']), validate(auxiliaryValidations.paginate), webPriceController.paginateWebPrice);

router.route('/this/:webPriceId').get(validate(webPriceValidations.validateObjectId), auth(['admin']), webPriceController.getWebPrice);

router.route('/update/:webPriceId').put(validate(webPriceValidations.validateObjectId), auth(['admin']), webPriceController.updateWebPrice);

router.route('/update-status/:webPriceId').put(validate(webPriceValidations.updateStatus), auth(['admin']), webPriceController.updateWebPrice);

router.route('/delete/:webPriceId').delete(validate(webPriceValidations.validateObjectId), auth(['admin']), webPriceController.removeWebPrice);

module.exports = router;