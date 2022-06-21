const userService = require("../services/user.service");

const db = require("../config/db.config");
const User = db.users;
// Create and Save a new User
exports.create = async (req, res) => {
  try {
    var data = await userService.createUser(req.body)
    if(data !== null) {
      res.send(data);
    }
    else {
      res.status(400).send({ message: "You must fill all the fields!" });
    }
  } catch(err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the User."
    });
  };
};
// Retrieve all User from the database.
exports.findAll = async (req, res) => {
  try {
    res.send(await userService.findAllUsers());
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving users."
    });
  }
};
// Find a single User with an id
exports.findOne = async (req, res) => {
  try {
    var data = await userService.findOneUser(req.params);
    if(data !== null){
      res.send(data);
    }
    else{
      res.status(404).send({ message: "Not found user with id " + id });
    }
  }
  catch(err) {
    res.status(500).send({ message: "Error retrieving email with id=" + id });
  };
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
exports.delete = async (req, res) => {
  try {
    const id = req.params.email;
    var data = await User.findByIdAndRemove(id)
    if(data) {
      res.send({
        message: "User was deleted successfully!"
      });
    }
    else {
      res.status(404).send({
        message: `Cannot delete user with id=${id}. Maybe user was not found!`
      });
    }
  } catch(err) {
    res.status(500).send({
      message: "Could not delete user with email=" + id
    });
  };
};

exports.addTutorial = async (req, res) => {
  try {
    var data = await userService.addTutorialToUser(req.body);
    if (data !== null) {
      res.send(data);
    } else {
      res.status(404).send({
        message: `Cannot update user with id=${userId}. Maybe user was not found!`
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error updating user with id=" + userId
    });
  }
};

exports.getUsersTutorials = async (req, res) => {
  try {
    var data = await userService.getUsersTutorials();
    if(data != null) {
      res.send(data);  
    } else {
      res.status(404).send({
        message: "Error retrieving users and tutorials"
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error retrieving user and tutorials"
    });
  }
};