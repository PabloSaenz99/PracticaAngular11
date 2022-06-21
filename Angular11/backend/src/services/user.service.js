const errors = require("../utils/errors");
const db = require("../config/db.config");
const User = db.users;

async function createUser(body) {
    if (!body.name || !body.email || !body.birthday) {
        return null;
    }
    let years = Math.abs(new Date(Date.now() - new Date(body.birthday)).getUTCFullYear() - 1970);
    // Create a User
    const user = new User({
        name: body.name,
        email: body.email,
        birthday: body.birthday,
        ageAtCreation: years,
        tutorials: []
    });
    return await user.save(user);
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
        return null;
}

async function updateUser(req) {
    const id = req.params.id;
    var data = await User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    if(data)
        return { message: "User was updated successfully." };
    else
        return null;
}

async function deleteUser(params) {
    const id = params.email;
    var data = await User.findByIdAndRemove(id)
    if(data)
        return {message: "User was deleted successfully!"};
    else
        return null;
}

async function addTutorialToUser(body) {
    const tutorialId = body.tutorialId;
    const userId = body.userId;
    var data = await User.findByIdAndUpdate(userId, {$push: {tutorials: tutorialId}});
    if (data)
        return { message: "User was updated successfully." };
    else
        return null;
}

async function getUsersTutorials(){
    //Find all the users and populate their tutorials
    var data = await User.find().populate("tutorials");
    if (data)
        return data;
    else
        return null;
}

module.exports = {
    createUser, findAllUsers,
    findOneUser, updateUser, deleteUser,
    addTutorialToUser, getUsersTutorials
}