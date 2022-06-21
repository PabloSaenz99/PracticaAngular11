const db = require("../config/db.config");
const User = db.users;

async function createUser(body) {
    if (!body.name || !body.email) {
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

module.exports = {
    createUser, findAllUsers,
    findOneUser
}