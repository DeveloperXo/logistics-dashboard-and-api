import express from 'express';
import authRutes from './v1/auth.route';

const router = express.Router();

router.use('/auth', authRutes);

module.exports = router;