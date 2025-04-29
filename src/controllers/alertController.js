const Alert = require('../models/Alert');

exports.createAlert = async (req, res, next) => {
  const { type, description, coordinates, priority } = req.body;
  const alert = await Alert.create({
    type,
    description,
    location: { coordinates },
    priority,
    user: req.user.id,
  });
  res.status(201).json(alert);
};

exports.getAlerts = async (req, res, next) => {
  const alerts = await Alert.find({ status: 'open' });
  res.json(alerts);
};

exports.updateAlert = async (req, res, next) => {
  const alert = await Alert.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(alert);
};
