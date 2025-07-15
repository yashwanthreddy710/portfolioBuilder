const mongoose = require('mongoose');

const CustomSectionSchema = new mongoose.Schema({
  title: String,
  description: String,
  link: String,
  image: String,
});

const ProjectSchema = new mongoose.Schema({
  title: String,
  description: String,
  liveLink: String,
  githubLink: String,
});


const PortfolioSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  slug: { type: String, required: true, unique: true },
  role: {
          type: String,
          default: '',
        },
  about: String,
  skills: [String],
  certifications: [String],
  contact: {
    email: String,
    phone: String,
    linkedin: String,
    github: String,
  },
  profileImage: String,
  theme: { type: String, default: 'default' },
  education: [
    {
      degree: String,
      institution: String,
      startYear: String,
      endYear: String,
    },
  ],
  experience: [
    {
      company: String,
      role: String,
      startDate: String,
      endDate: String,
    },
  ],
  projects: [ProjectSchema],
  customSections: [CustomSectionSchema],
}, { timestamps: true });

module.exports = mongoose.model('Portfolio', PortfolioSchema);
