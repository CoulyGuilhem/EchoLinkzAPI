const express = require('express');
const router  = express.Router();
const { protect } = require('../middleware/auth');
const {
  sendMessage,
  getMessages,
} = require('../controllers/chatController');

router.route('/:alertId')
  .post(protect, sendMessage)
  .get(protect, getMessages);

module.exports = router;
