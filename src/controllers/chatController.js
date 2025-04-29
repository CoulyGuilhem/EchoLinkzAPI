const Message = require('../models/Message');

exports.sendMessage = async (req, res) => {
  const { text } = req.body;
  const message = await Message.create({
    alert: req.params.alertId,
    user:  req.user.id,
    text,
  });
  res.status(201).json(message);
};

exports.getMessages = async (req, res) => {
  const messages = await Message.find({ alert: req.params.alertId });
  res.json(messages);
};
