import express from 'express';
import { vehicleController } from 'controllers/common';
import validate from 'middlewares/validate';
import { vehicleValidations } from 'validations/common';
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
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only images are allowed.'));
    }
};

const upload = multer({ storage: storage });

const router = express.Router();

router.route('/').post(auth('admin'), validate(vehicleValidations.createUserAccount), vehicleController.createVehicle);

router.route('/').get(auth('admin'), vehicleController.listVehicle);

router.route('/paginate/:page/:limit').get(auth('admin'), validate(auxiliaryValidations.paginate), vehicleController.paginateVehicle);

router.route('/this/:vehicleId').get(validate(vehicleValidations.validateObjectId), auth('admin'), vehicleController.getVehicle);

router.route('/update/:vehicleId').put(validate(vehicleValidations.validateObjectId), auth('admin'), vehicleController.updateVehicle);

router.route('/delete/:vehicleId').delete(validate(vehicleValidations.validateObjectId), auth('admin'), vehicleController.removeVehicle);

router.route('/upload').put(auth('admin'), upload.single('image'),  vehicleController.uploadImage);

// router.route('/get-files/:vehicleId').get( vehicleController.getFiles);


module.exports = router;