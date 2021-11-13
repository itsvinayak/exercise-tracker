const User = require('../models/user');


exports.getUser = getUser = async (id) => {
  const user = await User.findById(id).exec();
  return user;
};



exports.noUser = noUserErr = (id) => {
  const err = new Error(`User ${id} not found.`);
  err.status = 404;
  return err;
};

exports.postNewUser = async (req, res, next) => {
  const newUser = new User({
    username: req.body.username
  });
  const user = await newUser.save();
  res.json({ username: user.username, _id: user._id });
};

exports.getUserList = async (req, res, next) => {
  const allUsers = await User.find({}, 'username _id').exec();
  const userList = Array.from(allUsers);
  res.json(userList);
};