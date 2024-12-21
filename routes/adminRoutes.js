const express = require('express');
const { adminLogin, getAllMentors, getMentorProjects, addMentor, deleteMentor } = require('../controllers/adminController');
const router = express.Router();

router.post('/login', adminLogin);
router.get('/mentors', getAllMentors);
router.get('/mentors/:mentorId/projects', getMentorProjects);
router.post('/mentors', addMentor);
router.delete('/mentors/:mentorId', deleteMentor);

module.exports = router;
