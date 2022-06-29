const userService = require("../services/user.service");

// Create and Save a new User
exports.create = async (req, res, next) => {
  try {
    res.send(await userService.createUser(req.body));
  } catch (err) {
    next(err);
  };
};

exports.login = async (req, res, next) => {
  try {
    res.send(await userService.loginUser(req.body));
  } catch (err) {
    next(err);
  };
};
// Retrieve all User from the database.
exports.findAll = async (req, res, next) => {
  try {
    res.send(await userService.findAllUsers());
  } catch (err) {
    next(err);
  }
};
// Find a single User with an id
exports.findOne = async (req, res, next) => {
  try {
    res.send(await userService.findOneUser(req.params));
  } catch (err) {
    next(err);
  };
};
// Update a User by the id in the request
exports.update = async (req, res, next) => {
  try {
    res.send(userService.updateUser(req));
  } catch (err) {
    next(err);
  };
};
// Delete a Tutorial with the specified id in the request
exports.delete = async (req, res, next) => {
  try {
    res.send(await userService.deleteUser(req.params));
  } catch (err) {
    next(err);
  };
};

exports.addTutorial = async (req, res, next) => {
  try {
    res.send(await userService.addTutorialToUser(req.body));
  } catch (err) {
    next(err);
  }
};

exports.getUsersTutorials = async (req, res, next) => {
  try {
    res.send(await userService.getUsersTutorials());
  } catch (err) {
    next(err);
  }
};