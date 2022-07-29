const db = require("../config/db.config");
const Tutorial = db.tutorials;

const errors = require("../utils/errors");

async function createTutorial(body) {
    if (!body.title || !body.description || body.creatorID) {
        throw new errors.NotFound(errors.errorType.FillAllFields);
    }
    const tutorial = new Tutorial({
        creatorUserID: body.creator,
        title: body.title,
        description: body.description,
        images: body.images,
        published: body.published ? req.body.published : false
    });
    return await tutorial.save(tutorial);
}

async function findAllTutorials(body) {
    if(body.userID) {
        const userID = body.userID;
        return await Tutorial.find( {creatorUserID: userID});
    }   
    else {
        const title = body.title;
        var condition;
        if(title)
            condition = { $and: [{title: { $regex: new RegExp(title), $options: "i" }}, {published: true}]};
        else
            condition = {published: true};
        return await Tutorial.find(condition);
    }
}

async function findOneTutorial(params) {
    const id = params.id;
    var data = await Tutorial.findById(id);
    if(data)
        return data;
    else
        throw new errors.NotFound(errors.errorType.CannotFindTutorial);
}

async function updateTutorial(params, body) {
    if (!params.id || !body) {
        throw new errors.BadRequest(errors.errorType.FillAllFields);
    }
    var data = await Tutorial.findByIdAndUpdate(params.id, body, { useFindAndModify: false });
    if(data)
        return {message: "Tutorial was updated successfully."};
    else
        throw new errors.NotFound(errors.errorType.CannotUpdateTutorial); 
}

async function deleteTutorial(params) {
    var data = await Tutorial.findByIdAndRemove(params.id);
    if(data)
        return {message: `Tutorial was deleted successfully!`};
    else
        throw new errors.BadRequest(errors.errorType.CannotDeleteTutorial);
}

async function deleteAllTutorials(){
    var data = await Tutorial.deleteMany({});
    return {message: `${data.deletedCount} Tutorials were deleted successfully!`};
}

async function findAllPublished(){
    return await Tutorial.find({ published: true });
}

module.exports = {
    createTutorial, findAllTutorials,
    findOneTutorial, updateTutorial,
    deleteTutorial, deleteAllTutorials,
    findAllPublished}