const Log = require('../models/log');

// User controller
const userController = require('./userController');
const getUser = userController.getUser;
const noUserErr = userController.noUser;


const getDate = (date) => {
  return new Date(date).toString() === 'Invalid Date' ?
    '' :
    new Date(date).toUTCString();
};


const getDateRange = (id, from, to) => {
  const dateRange = { user: id };

  if (from) {
    dateRange.date = {};
    dateRange.date['$gte'] = from;
  }
  if (to) {
    if (from) {
      dateRange.date['$lte'] = to;
    } else {
      dateRange.date = {};
      dateRange.date['$lte'] = to;
    }
  }

  return dateRange;
};


const addToArray = (exercises) => {
  const arr = Array.from(exercises).map((exercise) => {
    return {
      description: exercise.description,
      duration: exercise.duration,
      date: exercise.dateString,
    };
  });
  return arr;
};


exports.getUserLog = async (req, res, next) => {
  const id = req.params['_id'];
  // await user query promise
  const user = await getUser(id);

  // no user found
  if (!user) {
    return next(noUserErr(id));
  }

  // deconstruction of params
  const { limit, from, to } = req.query;

  // query filter based on from and to dates params
  const queryFilter = getDateRange(id, getDate(from), getDate(to));

  // await exercise query promise
  const exercises = await Log
    .find(queryFilter, 'description duration date')
    .limit(Number(limit))
    .exec();

  // if successful, add results to array
  const exerciseLog = addToArray(exercises);

  res.json({
    username: user.username,
    count: exerciseLog.length,
    _id: id,
    log: exerciseLog,
  });
};






const saveExercise = async (e) => {
  const newEx = await new Log(e).save();
  return newEx;
};

exports.postExercise = async (req, res, next) => {
  const id = req.params._id;
  const date = req.body.date;
  const user = await getUser(id);

  if (!user) {
    return next(noUserErr(id));
  }
  const exercise = await saveExercise({
    user: req.params._id,
    description: req.body.description,
    duration: req.body.duration,
    date: !date ? undefined : new Date(date),
  });

  res.json({
    username: user.username,
    description: exercise.description,
    duration: exercise.duration,
    date: exercise.dateString,
    _id: user._id,
  });
};