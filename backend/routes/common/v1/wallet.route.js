import express from 'express';
import { walletController } from 'controllers/common';
import validate from 'middlewares/validate';
import { walletValidations } from 'validations/common';
import { auxiliaryValidations } from 'validations/common';
import auth from 'middlewares/auth';

const router = express.Router();

router.route('/').post(auth(['admin']), validate(walletValidations.createWallet), walletController.createWallet);

router.route('/').get(auth(['admin']), walletController.listWallet);

router.route('/paginate/:page/:limit').get(auth(['admin']), validate(auxiliaryValidations.paginate), walletController.paginateWallet);

router.route('/paginate-with-user/:page/:limit').get(auth(['admin']), validate(auxiliaryValidations.paginate), walletController.listWalletWithUserPaginated);


router.route('/this/:walletId').get(auth(['admin']), validate(walletValidations.validateObjectId), walletController.getWallet);

router.route('/this-user-wallet-with-user').get(auth(['admin', 'customer', 'businessAssociates']), walletController.getThisUserWalletWithUser);

router.route('/this-user-wallet').get(auth(['admin', 'customer', 'businessAssociate']), walletController.getThisUserWallet);

router.route('/update/:walletId').put(auth(['admin']), validate(walletValidations.validateObjectId), walletController.updateWallet);

router.route('/delete/:walletId').delete(auth(['admin']), validate(walletValidations.validateObjectId), walletController.removeWallet);

module.exports = router;