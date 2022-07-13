const tutorialService = require("../services/tutorial.service");

// Create and Save a new Tutorial
exports.create = async (req, res, next) => {
  res.send(await tutorialService.createTutorial(req.body));
};
// Retrieve all Tutorials from the database.
exports.findAll = async (req, res, next) => {
  res.send(await tutorialService.findAllTutorials(req.query));
};
// Find a single Tutorial with an id
exports.findOne = async (req, res, next) => {
  res.send(await tutorialService.findOneTutorial(req.body));
};
// Update a Tutorial by the id in the request
exports.update = async (req, res, next) => {
  res.send(await tutorialService.updateTutorial(req));
};
// Delete a Tutorial with the specified id in the request
exports.delete = async (req, res, next) => {
  res.send(await tutorialService.deleteTutorial(req));
};
// Delete all Tutorials from the database.
exports.deleteAll = async (req, res, next) => {
  res.send(await tutorialService.deleteAllTutorials());
};
// Find all published Tutorials
exports.findAllPublished = async (req, res, next) => {
  res.send(await tutorialService.findAllPublished());
};
