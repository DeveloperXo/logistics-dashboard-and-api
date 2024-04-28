import express from 'express';

const adminRoutes = require('./admin');
const commonRoutes = require('./common');
const customerRoutes = require('./customer');
const userAccountRoutes = require('./userAccount');

const router = express.Router();

router.use('/admin', adminRoutes);
router.use('/common', commonRoutes);
router.use('/customer', customerRoutes);
router.use('/userAccount', userAccountRoutes);


module.exports = router;