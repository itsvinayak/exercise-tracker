const express = require('express');
const router = express.Router();

// Controllers
const userController = require('../controller/userController');
const logController = require('../controller/logController');



// POST - new user
router.post('/', userController.postNewUser);
// GET - user list
router.get('/', userController.getUserList);
// POST - exercise
router.post('/:_id/exercises', logController.postExercise);
// GET - exercise log
router.get('/:_id/logs', logController.getUserLog);




module.exports = router;