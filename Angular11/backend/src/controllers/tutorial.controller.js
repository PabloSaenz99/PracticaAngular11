const tutorialService = require("../services/tutorial.service");

// Create and Save a new Tutorial
exports.create = async (req, res, next) => {
  try{
    res.send(await tutorialService.createTutorial(req.body));
  } catch (err) {
    next(err);
  }
};
// Retrieve all Tutorials from the database.
exports.findAll = async (req, res, next) => {
  try {
    res.send(await tutorialService.findAllTutorials(req.query));
  } catch(err) {
    next(err);
  };
};
// Find a single Tutorial with an id
exports.findOne = async (req, res, next) => {
  try {
    res.send(await tutorialService.findOneTutorial(req.body));
  } catch(err) {
    next(err);
  };
};
// Update a Tutorial by the id in the request
exports.update = async (req, res, next) => {
  try {
    res.send(await tutorialService.updateTutorial(req));
  } catch(err) {
    next(err);
  };
};
// Delete a Tutorial with the specified id in the request
exports.delete = async (req, res, next) => {
  try {
    res.send(await tutorialService.deleteTutorial(req));
  } catch(err) {
    next(err);
  };
};
// Delete all Tutorials from the database.
exports.deleteAll = async (req, res, next) => {
  try {
    res.send(await Tutorial.deleteMany({}));
  } catch(err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while removing all tutorials."
    });
  };
};
// Find all published Tutorials
exports.findAllPublished = async (req, res, next) => {
  try {
    res.send(await tutorialService.findAllPublished());
  } catch(err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving tutorials."
    });
  };
};
