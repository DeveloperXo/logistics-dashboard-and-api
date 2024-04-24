import express from 'express';
import customerRoutes from './v1/customer.route';

const router = express.Router();

router.use('/customer', customerRoutes);

module.exports = router;