const express = require('express');
const {
    mentorLogin,
    getProjects,
    addProject,
    updateProject,
    deleteProject,
} = require('../controllers/mentorController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Mentor Login
router.post('/login', mentorLogin);

// Project CRUD Operations (Protected Routes)
router.get('/projects', protect, getProjects); // View Mentor's Projects
router.post('/projects', protect, addProject); // Add Project
router.put('/projects/:projectId', protect, updateProject); // Update Project
router.delete('/projects/:projectId', protect, deleteProject); // Delete Project

module.exports = router;
