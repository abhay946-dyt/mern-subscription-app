const Content = require('../models/Content');

exports.createContent = async (req, res) => {
  const content = await Content.create({
    ...req.body,
    creator: req.user._id
  });
  res.status(201).json(content);
};

exports.getContentByCreator = async (req, res) => {
  const contents = await Content.find({ creator: req.params.creatorId });
  res.json(contents);
};

exports.getMyContent = async (req, res) => {
  const contents = await Content.find({ creator: req.user._id });
  res.json(contents);
};

exports.updateContent = async (req, res) => {
  const content = await Content.findOne({
    _id: req.params.id,
    creator: req.user._id
  });

  if (!content) {
    return res.status(404).json({ message: 'Content not found' });
  }

  content.title = req.body.title || content.title;
  await content.save();

  res.json(content);
};

exports.deleteContent = async (req, res) => {
  const content = await Content.findOne({
    _id: req.params.id,
    creator: req.user._id
  });

  if (!content) {
    return res.status(404).json({ message: 'Content not found' });
  }

  await content.deleteOne();
  res.json({ message: 'Content deleted' });
};
