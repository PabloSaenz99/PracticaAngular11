const tutorialService = require("../services/tutorial.service");

// Create and Save a new Tutorial
exports.create = async (req, res) => {
  try{
    var d = await tutorialService.createTutorial(req.body);
    if(d !== null)
      res.send(d);
    else
      res.status(400).send({ message: "Content can not be empty!" });
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Tutorial."
    });
  }
};
// Retrieve all Tutorials from the database.
exports.findAll = async (req, res) => {
  try {
    res.send(await tutorialService.findAllTutorials(req.query));
  } catch(err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving tutorials."
    });
  };
};
// Find a single Tutorial with an id
exports.findOne = async (req, res) => {
  try {
    var data = await tutorialService.findOneTutorial(req.body);
    if (data !== null)
      res.send(data);
    else
      res.status(404).send({ message: "Not found Tutorial with id " + id });
  } catch(err) {
    res
      .status(500)
      .send({ message: "Error retrieving Tutorial with id=" + id });
  };
};
// Update a Tutorial by the id in the request
exports.update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }
  try {
  var data = await tutorialService.updateTutorial(req);
    if (!data) {
      res.status(404).send({
        message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`
      });
    } else res.send({ message: "Tutorial was updated successfully." });
  } catch(err) {
    res.status(500).send({
      message: "Error updating Tutorial with id=" + id
    });
  };
};
// Delete a Tutorial with the specified id in the request
exports.delete = async (req, res) => {
  try {
    var data = await tutorialService.deleteTutorial(req);
    if(data !== null) {
      res.send(data);
    }
    else{
      res.status(404).send({
        message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
      });
    }
  } catch(err) {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id
      });
    };
};
// Delete all Tutorials from the database.
exports.deleteAll = async (req, res) => {
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
exports.findAllPublished = async (req, res) => {
  try {
    res.send(await tutorialService.findAllPublished());
  } catch(err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving tutorials."
    });
  };
};
