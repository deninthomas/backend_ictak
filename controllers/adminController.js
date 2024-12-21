const Mentor =require('../models/Mentor');
const Project = require('../models/Project');
const { generateToken } = require('../utils/jwtUtils');

// Admin Login
exports.adminLogin = async (req, res) => {
    const { email, password } = req.body;

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
        const token = generateToken({ role: 'admin' });
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
};

// Get All Mentors
exports.getAllMentors = async (req, res) => {
    try {
        const mentors = await Mentor.find();
        res.json(mentors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Mentor's Projects
exports.getMentorProjects = async (req, res) => {
    try {
        const projects = await Project.find({ mentor: req.params.mentorId });
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add, Edit, Delete Mentor
exports.addMentor = async (req, res) => {
    try {
        const mentor = new Mentor(req.body);
        await mentor.save();
        res.status(201).json(mentor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteMentor = async (req, res) => {
    try {
        await Mentor.findByIdAndDelete(req.params.mentorId);
        res.status(200).json({ message: 'Mentor deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
