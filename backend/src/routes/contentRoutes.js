const router = require('express').Router();
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');
const { checkSubscription } = require('../middleware/subscriptionMiddleware');

const {
  createContent,
  getContentByCreator,
  getMyContent,
   updateContent,
  deleteContent
} = require('../controllers/contentController');

router.get('/me', protect, authorizeRoles('creator', 'admin'), getMyContent);

// Public creator content (subscriber)
router.get('/:creatorId', protect, checkSubscription, getContentByCreator);

// Creator create
router.post('/', protect, authorizeRoles('creator', 'admin'), createContent);
router.put('/:id', protect, authorizeRoles('creator', 'admin'), updateContent);
router.delete('/:id', protect, authorizeRoles('creator', 'admin'), deleteContent);

module.exports = router;
