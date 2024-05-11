import express from 'express';
import { ptlBookingController } from 'controllers/common';
import validate from 'middlewares/validate';
import { ptlBookingValidations } from 'validations/common';
import { auxiliaryValidations } from 'validations/common';
import auth from 'middlewares/auth';
import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/assets/vehicles/');
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

router.route('/').post(auth('admin'), validate(ptlBookingValidations.createPtlBooking), ptlBookingController.createPtlBooking);

router.route('/').get(auth('admin'), ptlBookingController.listPtlBooking);

router.route('/paginate/:page/:limit').get(auth('admin'), validate(auxiliaryValidations.paginate), ptlBookingController.paginatePtlBooking);

router.route('/this/:vehicleId').get(validate(ptlBookingValidations.validateObjectId), auth('admin'), ptlBookingController.getPtlBooking);

router.route('/update/:vehicleId').put(validate(ptlBookingValidations.validateObjectId), auth('admin'), ptlBookingController.updatePtlBooking);

router.route('/delete/:vehicleId').delete(validate(ptlBookingValidations.validateObjectId), auth('admin'), ptlBookingController.removePtlBooking);

router.route('/upload').put(auth('admin'), upload.single('image'),  ptlBookingController.uploadAttachment);

// router.route('/get-files/:vehicleId').get( ptlBookingController.getFiles);


module.exports = router;