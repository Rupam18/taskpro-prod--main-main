const express = require('express');
const router = express.Router();
const { getOverview, getTasksOverTime, getProjectProgress, getProjectHealth } = require('../controllers/analyticsController');
const { protect } = require('../middleware/authMiddleware');

router.get('/overview', protect, getOverview);
router.get('/tasks-over-time', protect, getTasksOverTime);
router.get('/project-progress', protect, getProjectProgress);
router.get('/project-health', protect, getProjectHealth);

module.exports = router;
