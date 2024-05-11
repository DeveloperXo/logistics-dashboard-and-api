import express from 'express';
import authRutes from './v1/auth.route';
import vehicleRoutes from './v1/vehicle.route';
import crmQueryRoutes from './v1/crmQuery.route';
import webPriceRoutes from './v1/webPrice.route';
import ptlBookingRoutes from './v1/ptlBooking.route';

const router = express.Router();

router.use('/auth', authRutes);
router.use('/vehicle', vehicleRoutes);
router.use('/crm-query', crmQueryRoutes);
router.use('/web-price', webPriceRoutes);
router.use('/ptl-booking', ptlBookingRoutes);

module.exports = router;