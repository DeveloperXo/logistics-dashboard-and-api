import express from 'express';
import { cashBookingController } from 'controllers/common';
import validate from 'middlewares/validate';
import { cashBookingValidations } from 'validations/common';
import { auxiliaryValidations } from 'validations/common';
import auth from 'middlewares/auth';
import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/ptl-bookings/attachments');
    },
    filename: (req, file, cb) => {
        let id = req.body.id;
        console.log('multer', id)
        cb(null, `${Date.now()}-${file.originalname}`)
    }
});


const upload = multer({ storage: storage });

const router = express.Router();

router.route('/').post(auth(['admin']), validate(cashBookingValidations.createCashBooking), cashBookingController.createCashBooking);

router.route('/').get(auth(['admin']), cashBookingController.listCashBooking);

router.route('/paginate/:page/:limit').get(auth(['admin']), validate(auxiliaryValidations.paginate), cashBookingController.paginateCashBooking);

router.route('/this/:cashBookingId').get(validate(cashBookingValidations.validateObjectId), auth(['admin']), cashBookingController.getCashBooking);

router.route('/update/:cashBookingId').put(validate(cashBookingValidations.validateObjectId), auth(['admin']), cashBookingController.updateCashBooking);

router.route('/this/update-status/:cashBookingId').put(auth(['admin']), validate(cashBookingValidations.updateStatus), cashBookingController.updateCashBooking);

router.route('/delete/:cashBookingId').delete(validate(cashBookingValidations.validateObjectId), auth(['admin']), cashBookingController.removeCashBooking);

router.route('/upload-attachment').put(auth(['admin']), upload.array('files', 5),  cashBookingController.uploadAttachment);


module.exports = router;