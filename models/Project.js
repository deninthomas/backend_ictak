const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    submissions: [
        {
            studentName: { type: String },
            evaluationStatus: { type: String, default: 'Pending' },
            marks: { type: Number },
            comments: { type: String },
        }
    ],
    mentor: { type: mongoose.Schema.Types.ObjectId, ref: 'Mentor' },
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
