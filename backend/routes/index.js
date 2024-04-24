import express from 'express';

const adminRoutes = require('./admin');
const authRoutes = require('./common');
const customerRoutes = require('./customer');
const userAccountRoutes = require('./userAccount');

const router = express.Router();

router.use('/admin', adminRoutes);
router.use('/auth', authRoutes);
router.use('/customer', customerRoutes);
router.use('/userAccount', userAccountRoutes);


module.exports = router;