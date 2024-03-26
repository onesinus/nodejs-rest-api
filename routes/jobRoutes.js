const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getJobList, getJobDetail } = require('../controllers/jobController');

router.use(authMiddleware);

router.get('/jobs', getJobList);
router.get('/jobs/:id', getJobDetail);

module.exports = router;