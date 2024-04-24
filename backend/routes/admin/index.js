import express from 'express';
import adminRoutes from './v1/admin.routes';

const router = express.Router();

router.use('/admin', adminRoutes);

module.exports = router;