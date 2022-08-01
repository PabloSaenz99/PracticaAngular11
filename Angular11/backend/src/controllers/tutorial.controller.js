const tutorialService = require("../services/tutorial.service");

// Create and Save a new Tutorial
exports.create = async (req, res) => {
  res.send(await tutorialService.createTutorial(req.body));
};
// Find a single Tutorial with an id
exports.findById = async (req, res) => {
  res.send(await tutorialService.findById(req.query));
};
// Find all published Tutorials
exports.findAllPublished = async (req, res) => {
  res.send(await tutorialService.findAllPublished(req.query));
};

// Update a Tutorial by the id in the request
exports.update = async (req, res) => {
  res.send(await tutorialService.updateTutorial(req.params, req.body));
};
// Delete a Tutorial with the specified id in the request
exports.delete = async (req, res) => {
  res.send(await tutorialService.deleteTutorial(req.params));
};
// Delete all Tutorials from the database.
exports.deleteAll = async (req, res) => {
  res.send(await tutorialService.deleteAllTutorials());
};
