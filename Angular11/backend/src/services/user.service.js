const errors = require("../utils/errors");
const jwt = require('jsonwebtoken');
const db = require("../config/db.config");
const User = db.users;

async function createUser(body) {
    if (!body.name || !body.email || !body.password || !body.birthday) {
        throw new errors.BadRequest("You must fill all the fields!");
    }
    let years = Math.abs(new Date(Date.now() - new Date(body.birthday)).getUTCFullYear() - 1970);
    // Create a User
    const user = new User({
        name: body.name,
        email: body.email,
        password: body.password,
        birthday: body.birthday,
        ageAtCreation: years,
        tutorials: []
    });
    return await user.save(user);
}

async function loginUser(body) {
    if (!body.email || !body.password) {
        throw new errors.BadRequest("You must write an email and password!");
    }

    const user = await User.findOne({email: body.email});
    if (!user)
        throw new errors.NotFound(`The is no user with that email`);
    if (user.password !== body.password)
        throw new errors.BadRequest(`Incorrect password`);
	
    const token = jwt.sign({_id: user._id}, 'secretkey');
    return token;
}

async function findAllUsers() {
    return await User.find();
}

async function findOneUser(params) {
    const id = params.id;
    var data = await User.findOne({email: id});
    if(data)
        return data;
    else
        throw new errors.NotFound(`Not found user with id: ${id}` );
}

async function updateUser(req) {
    if(!req.body)
        throw new errors.BadRequest("Data to update can not be empty!");
    const id = req.params.id;
    var data = await User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    if(data)
        return { message: "User was updated successfully." };
    else
        throw new errors.NotFound(`Cannot update user with id=${id}. Maybe user was not found!`);
}

async function deleteUser(params) {
    const id = params.email;
    var data = await User.findByIdAndRemove(id)
    if(data)
        return { message: "User was deleted successfully!" };
    else
        throw new errors.NotFound(`Cannot delete user with id=${id}. Maybe user was not found!`);
}

async function addTutorialToUser(body) {
    if(!body.tutorialId || !body.userId){
        throw new errors.BadRequest(`You must select a user and a tutorial`);
    }
    const tutorialId = body.tutorialId;
    const userId = body.userId;
    var data = await User.findByIdAndUpdate(userId, {$push: {tutorials: tutorialId}});
    if (data)
        return { message: "User was updated successfully." };
    else
        throw new errors.NotFound(`Cannot update user with id=${userId}. Maybe user was not found!`);
}

async function getUsersTutorials(){
    //Find all the users and populate their tutorials
    var data = await User.find().populate("tutorials");
    if (data)
        return data;
    else
        throw new errors.NotFound("Error retrieving users and tutorials");
}

module.exports = {
    createUser, loginUser, findAllUsers,
    findOneUser, updateUser, deleteUser,
    addTutorialToUser, getUsersTutorials
}