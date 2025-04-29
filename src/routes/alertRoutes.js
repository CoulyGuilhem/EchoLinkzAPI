const express = require('express');
const router  = express.Router();
const { protect } = require('../middleware/auth');
const {
  createAlert,
  getAlerts,
  updateAlert,
} = require('../controllers/alertController');

router.route('/')
  .post(protect, createAlert)
  .get(protect, getAlerts);

router.route('/:id')
  .put(protect, updateAlert);

module.exports = router;
