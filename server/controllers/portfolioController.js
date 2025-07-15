const Portfolio = require('../models/Portfolio');

exports.createOrUpdatePortfolio = async (req, res) => {
  const userId = req.user._id;
  const slug = req.body.slug || req.user.username;

  try {
    // Helper to safely parse fields
    const parse = (field, fallback = []) => {
      try {
        return JSON.parse(field);
      } catch {
        return fallback;
      }
    };

    const skills = parse(req.body.skills);
    const certifications = parse(req.body.certifications);

const contact = (() => {
  try {
    const parsed = JSON.parse(req.body.contact || '{}');
    return {
      email: parsed.email || '',
      phone: parsed.phone || '',
      linkedin: parsed.linkedin || '',
      github: parsed.github || '',
    };
  } catch {
    return { email: '', phone: '', linkedin: '', github: '' };
  }
})();


    const projects = parse(req.body.projects).map((p) => ({
      title: p.title || '',
      description: p.description || '',
      liveLink: p.liveLink || '',
      githubLink: p.githubLink || '',
    }));

    const education = parse(req.body.education).map((e) => ({
      institution: e.institution || '',
      degree: e.degree || '',
      startYear: e.startYear || '',
      endYear: e.endYear || '',
    }));

    const experience = parse(req.body.experience).map((e) => ({
      company: e.company || '',
      role: e.role || '',
      startDate: e.startDate || '',
      endDate: e.endDate || '',
    }));

    const customSections = parse(req.body.customSections).map((section, i) => {
      const imageFile = req.files?.[`customImage_${i}`]?.[0];
      return {
        title: section.title || '',
        description: section.description || '',
        link: section.link || '',
        image: imageFile ? imageFile.filename : section.image || '',
      };
    });

    // Create portfolio object
    const updatedPortfolio = {
      userId,
      slug,
      role: req.body.role || '',
      about: req.body.about || '',
      skills,
      certifications,
      contact,
      projects,
      education,
      experience,
      customSections,
      theme: req.body.theme || 'default',
    };

    // Add profile image if uploaded
    if (req.files?.profileImage?.[0]) {
      updatedPortfolio.profileImage = req.files.profileImage[0].filename;
    }

    const existing = await Portfolio.findOne({ userId });

    if (existing) {
      await Portfolio.updateOne({ userId }, updatedPortfolio);
      return res.status(200).json({ message: 'Portfolio updated' });
    } else {
      const newPortfolio = new Portfolio(updatedPortfolio);
      await newPortfolio.save();
      return res.status(201).json({ message: 'Portfolio created' });
    }
  } catch (err) {
    console.error('Error in createOrUpdatePortfolio:', err);
    return res.status(500).json({ error: err.message });
  }
};

exports.getPortfolioBySlug = async (req, res) => {
  const { slug } = req.params;

  try {
    const portfolio = await Portfolio.findOne({ slug });
    if (!portfolio) return res.status(404).json({ message: 'Portfolio not found' });

    res.status(200).json(portfolio);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMyPortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ userId: req.user._id });
    if (!portfolio) return res.status(404).json({ message: 'Portfolio not found' });

    res.status(200).json(portfolio);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
