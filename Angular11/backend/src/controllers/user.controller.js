const db = require("../config/db.config");
const User = db.users;
// Create and Save a new User
exports.create = async (req, res) => {
  try {
    // Validate request
    if (!req.body.name || !req.body.email) {
      res.status(400).send({ message: "You must fill all the fields!" });
      return;
    }
    //Calculate years between now and birthday
    let years = Math.abs(new Date(Date.now() - new Date(req.body.birthday)).getUTCFullYear() - 1970);
    // Create a User
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      birthday: req.body.birthday,
      ageAtCreation: years,
      tutorials: []
    });
    // Save User in the database
    var data = await user.save(user);
    if(data) {
      res.send(data);
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
    var data = await User.find();
    if(data){
      res.send(data);
    }
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
    const id = req.params.id;
    console.log(id);
    var data = await User.findOne({email: id});
    if(data){
      res.send(data);
    }
    else{
      res.status(404).send({ message: "Not found user with id " + id });
    }
  }
  catch(err) {
    res
      .status(500)
      .send({ message: "Error retrieving email with id=" + id });
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
    const tutorialId = req.body.tutorialId;
    const userId = req.body.userId;
    var data = await User.findByIdAndUpdate(userId, {$push: {tutorials: tutorialId}})
    if (data) {
      res.send({ message: "User was updated successfully." });
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
    var data = await User.find().populate("tutorials");  //Find all the users and populate their tutorials
    if(data) {
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