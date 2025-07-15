const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');
const {
  createOrUpdatePortfolio,
  getPortfolioBySlug,
  getMyPortfolio
} = require('../controllers/portfolioController');

// User's own portfolio
router.post('/', protect, upload.fields([
    { name: 'profileImage', maxCount: 1 },
    { name: 'customImage_0', maxCount: 1 },
    { name: 'customImage_1', maxCount: 1 },
    { name: 'customImage_2', maxCount: 1 },
    { name: 'customImage_3', maxCount: 1 },
    { name: 'customImage_4', maxCount: 1 },
  ]), createOrUpdatePortfolio);

router.get('/me',protect, getMyPortfolio);

router.get('/profile/:slug', getPortfolioBySlug);


module.exports = router;
