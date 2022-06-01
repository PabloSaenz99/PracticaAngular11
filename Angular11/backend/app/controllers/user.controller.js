const db = require("../models");
const User = db.users;
// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name || !req.body.email) {
    res.status(400).send({ message: "You must fill all the fields!" });
    return;
  }
  // Create a User
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    tutorials: []
  });
  // Save User in the database
  user
    .save(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });
};
// Retrieve all User from the database.
exports.findAll = (req, res) => {
    //const name = req.query.name;
    //var condition = email ? { name: { $regex: new RegExp(name), $options: "i" } } : {};
    User.find()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving users."
        });
      });
};
// Find a single User with an id
exports.findOne = (req, res) => {
    const id = req.params.email;
    User.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found user with email " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving email with id=" + id });
      });
};
// Update a User by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
      const id = req.params.id;
      User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update user with id=${id}. Maybe user was not found!`
            });
          } else res.send({ message: "User was updated successfully." });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating user with id=" + id
          });
        });
};
// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.email;
    User.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete user with id=${id}. Maybe user was not found!`
          });
        } else {
          res.send({
            message: "User was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete user with email=" + id
        });
      });
};

exports.addTutorial = (req, res) => {
  if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
    console.log(req.body);
    const tutorialId = req.body.tutorialId;
    const userId = req.body.userId;
    console.log("body" + userId);
    User.findByIdAndUpdate(userId, {$push: {tutorials: tutorialId}})
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update user with id=${userId}. Maybe user was not found!`
          });
        } else res.send({ message: "User was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating user with id=" + userId
        });
      });
};
/*
// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    User.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Users were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all users."
      });
    });
};
*/
/*
// Find all published Tutorials
exports.findAllPublished = (req, res) => {
    User.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};
*/