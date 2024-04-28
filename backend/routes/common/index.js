import express from 'express';
import authRutes from './v1/auth.route';
import vehicleRoutes from './v1/vehicle.route';
import crmQueryRoutes from './v1/crmQuery.route';
import webPriceRoutes from './v1/webPrice.route';

const router = express.Router();

router.use('/auth', authRutes);
router.use('/vehicle', vehicleRoutes);
router.use('/crm-query', crmQueryRoutes);
router.use('/web-price', webPriceRoutes);

module.exports = router;