const userService = require("../services/user.service");

// Create and Save a new User
exports.create = async (req, res, next) => {
  res.send(await userService.createUser(req.body));
};

exports.login = async (req, res) => {
  var result = await userService.loginUser(req.body);
  res.cookie('token', result.token, { httpOnly: true, secure: true, maxAge: 604863000, sameSite:'none' });
  res.send(true); //Send true used in front for verify login
};

exports.logout = async (req, res, next) => {
  res.clearCookie('token').send({'Logged out':''});
};

// Retrieve all User from the database.
exports.findAll = async (req, res, next) => {
  res.send(await userService.findAllUsers());
};
// Find a single User with an id
exports.findOne = async (req, res, next) => {
  res.send(await userService.findOneUser(req.params));
};
// Update a User by the id in the request
exports.update = async (req, res, next) => {
  res.send(userService.updateUser(req));
};
// Delete a Tutorial with the specified id in the request
exports.delete = async (req, res, next) => {
  res.send(await userService.deleteUser(req.params));
};

exports.addTutorial = async (req, res, next) => {
  res.send(await userService.addTutorialToUser(req.body));
};

exports.getUsersTutorials = async (req, res, next) => {
  res.send(await userService.getUsersTutorials());
};