const Mentor = require('../models/Mentor');
const Project = require('../models/Project');
const { generateToken } = require('../utils/jwtUtils');
const bcrypt = require('bcryptjs');

// Mentor Login
exports.mentorLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const mentor = await Mentor.findOne({ email });
        if (!mentor) {
            return res.status(404).json({ message: 'Mentor not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, mentor.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = generateToken({ id: mentor._id, role: 'mentor' });
        res.json({ token, mentorId: mentor._id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Mentor's Projects
exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find({ mentor: req.user.id });
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add a Project
exports.addProject = async (req, res) => {
    try {
        const project = new Project({ ...req.body, mentor: req.user.id });
        await project.save();
        res.status(201).json(project);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a Project
exports.updateProject = async (req, res) => {
    try {
        const project = await Project.findOneAndUpdate(
            { _id: req.params.projectId, mentor: req.user.id },
            req.body,
            { new: true }
        );

        if (!project) {
            return res.status(404).json({ message: 'Project not found or not authorized' });
        }

        res.json(project);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a Project
exports.deleteProject = async (req, res) => {
    try {
        const project = await Project.findOneAndDelete({
            _id: req.params.projectId,
            mentor: req.user.id,
        });

        if (!project) {
            return res.status(404).json({ message: 'Project not found or not authorized' });
        }

        res.status(200).json({ message: 'Project deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
