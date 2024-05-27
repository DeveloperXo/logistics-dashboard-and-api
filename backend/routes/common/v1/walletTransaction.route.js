import express from 'express';
import { walletTransactionController } from 'controllers/common';
import validate from 'middlewares/validate';
import { walletTransactionValidations } from 'validations/common';
import { auxiliaryValidations } from 'validations/common';
import auth from 'middlewares/auth';
import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/wallet-receipts/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
});

const upload = multer({ storage: storage });

const router = express.Router();

router.route('/').post(auth(['admin']), validate(walletTransactionValidations.createWalletTransaction), walletTransactionController.createWalletTransaction);

router.route('/').get(auth(['admin']), walletTransactionController.listWalletTransaction);

router.route('/paginate/:page/:limit').get(auth(['admin']), validate(auxiliaryValidations.paginate), walletTransactionController.paginateWalletTransaction);

router.route('/this/:walletTransactionId').get(validate(auth(['admin']), walletTransactionValidations.validateObjectId), walletTransactionController.getWalletTransaction);

router.route('/this-user/:customerId').get(validate(auth(['admin']), walletTransactionValidations.validateCustomerIdId), walletTransactionController.listThisUserWalletTransactionWithBalance);

router.route('/update/:walletTransactionId').put(validate(auth(['admin']), walletTransactionValidations.validateObjectId), walletTransactionController.updateWalletTransaction);

router.route('/delete/:walletTransactionId').delete(auth(['admin']), validate(walletTransactionValidations.validateObjectId), walletTransactionController.removeWalletTransaction);

router.route('/upload-receipt').put(auth(['admin']), upload.single('receipt'),  walletTransactionController.uploadReceipt);



module.exports = router;