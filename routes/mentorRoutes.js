const express = require('express');
const { createProject, updateProject, deleteProject } = require('../controllers/mentorController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/projects', protect, createProject);
router.put('/projects/:projectId', protect, updateProject);
router.delete('/projects/:projectId', protect, deleteProject);

module.exports = router;
