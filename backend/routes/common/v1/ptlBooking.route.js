import express from 'express';
import { ptlBookingController } from 'controllers/common';
import validate from 'middlewares/validate';
import { ptlBookingValidations } from 'validations/common';
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

// filter to accept only pdf files
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('application/pdf')) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only images are allowed.'));
    }
};

const upload = multer({ storage: storage });

const router = express.Router();

router.route('/').post(auth(['admin', 'customer', 'businessAssociate']), validate(ptlBookingValidations.createPtlBooking), ptlBookingController.createPtlBooking);

router.route('/').get(auth(['admin', 'customer', 'businessAssociate']), ptlBookingController.listPtlBooking);

router.route('/paginate/:page/:limit').get(auth(['admin', 'customer', 'businessAssociate']), validate(auxiliaryValidations.paginate), ptlBookingController.paginatePtlBooking);

router.route('/this/:ptlBookingId').get(validate(ptlBookingValidations.validateObjectId), auth(['admin', 'customer', 'businessAssociate']), ptlBookingController.getPtlBooking);

router.route('/update/:ptlBookingId').put(validate(ptlBookingValidations.validateObjectId), auth(['admin', 'customer', 'businessAssociate']), ptlBookingController.updatePtlBooking);

router.route('/this/update-status/:ptlBookingId').put(auth(['admin']), validate(ptlBookingValidations.updateStatus), ptlBookingController.updatePtlBooking);

router.route('/delete/:ptlBookingId').delete(validate(ptlBookingValidations.validateObjectId), auth(['admin', 'customer', 'businessAssociate']), ptlBookingController.removePtlBooking);

router.route('/upload-attachment').put(auth(['admin', 'customer', 'businessAssociate']), upload.array('files', 5),  ptlBookingController.uploadAttachment);

// router.route('/get-files/:ptlBookingId').get( ptlBookingController.getFiles);


module.exports = router;