const crypto = require("crypto");
const errors = require("../utils/errors");
const jwt = require('jsonwebtoken');
const db = require("../config/db.config");
const User = db.users;

async function createUser(body) {
    if (!body.name || !body.email || !body.password || !body.birthday) {
        throw new errors.BadRequest(errors.errorType.FillAllFields);
    }
    let years = Math.abs(new Date(Date.now() - new Date(body.birthday)).getUTCFullYear() - 1970);
    // Create a User
    var saltAux = createSalt();
    const user = new User({
        email: body.email,
        name: body.name,
        nickName: body.name.replace(/[^a-zA-Z0-9]/gi, '-'),
        salt: saltAux,
        hash: createHash(body.password, saltAux),
        birthday: body.birthday,
        ageAtCreation: years,
        tutorials: []
    });
    return await user.save(user);
}

async function loginUser(body) {
    //https://blog.logrocket.com/how-to-secure-a-rest-api-using-jwt-7efd83e71432/
    if (!body.email || !body.password) {
        throw new errors.BadRequest(errors.errorType.FillAllFields);
    }
    
    const user = await User.findOne({email: body.email});
    if (!user)
        throw new errors.NotFound(errors.errorType.CannotFindUser);
    if (user.hash !== createHash(body.password, user.salt))
        throw new errors.BadRequest(errors.errorType.IncorrectPassword);
	
    const token = jwt.sign({_id: user._id}, 'secretkey');
    return {token, "name": user.name};
}

async function findAllUsers() {
    return await User.find();
}

async function findOneUser(params) {
    const email1 = params.email;
    var data = await User.findOne({email: email1});
    if(data)
        return data;
    else
        throw new errors.NotFound(errors.errorType.CannotFindUser);
}

async function updateUser(req) {
    if(!req.body)
        throw new errors.BadRequest(errors.errorType.FillAllFields);
    const id = req.params.id;
    var data = await User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    if(data)
        return { message: "User was updated successfully." };
    else
        throw new errors.NotFound(errors.errorType.CannotUpdateUser);
}

async function deleteUser(params) {
    const id = params.email;
    var data = await User.findByIdAndRemove(id)
    if(data)
        return { message: "User was deleted successfully!" };
    else
        throw new errors.NotFound(errors.errorType.CannotDeleteUser);
}

async function addTutorialToUser(body) {
    if(!body.tutorialId || !body.userId){
        throw new errors.BadRequest(errors.errorType.SelectUserAndTutorial);
    }
    const tutorialId = body.tutorialId;
    const userId = body.userId;
    var data = await User.findByIdAndUpdate(userId, {$push: {tutorials: tutorialId}});
    if (data)
        return { message: "User was updated successfully." };
    else
        throw new errors.NotFound(errors.errorType.CannotUpdateUser);
}

async function getUsersTutorials(){
    //Find all the users and populate their tutorials
    var data = await User.find().populate("tutorials");
    if (data)
        return data;
    else
        throw new errors.NotFound(errors.errorType.CannotGetData);
}

function createSalt(){
    return crypto.randomBytes(8).toString('hex');
}

function createHash(password, salt) {
    var aux = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
    aux.update(password);
    var hash = aux.digest('hex');
    return hash;
}

module.exports = {
    createUser, loginUser, findAllUsers,
    findOneUser, updateUser, deleteUser,
    addTutorialToUser, getUsersTutorials
}