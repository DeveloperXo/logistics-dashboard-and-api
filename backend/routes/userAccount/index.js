import express from 'express';
import userAccountRoutes from './v1/userAccount.route';

const router = express.Router();

router.use('/userAccount', userAccountRoutes);

module.exports = router;