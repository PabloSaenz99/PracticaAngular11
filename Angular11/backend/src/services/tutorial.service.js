const db = require("../config/db.config");
const Tutorial = db.tutorials;

const errors = require("../utils/errors");

async function createTutorial(body) {
    if (!body.title || !body.description) {
        throw new errors.NotFound("Content can not be empty!");
    }
    const tutorial = new Tutorial({
        title: body.title,
        description: body.description,
        published: body.published ? req.body.published : false
    });
    return await tutorial.save(tutorial);
}

async function findAllTutorials(body) {
    const title = body.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
    return await Tutorial.find(condition);
}

async function findOneTutorial(body) {
    const id = body.params.id;
    var data = await Tutorial.findById(id);
    if(data)
        return data;
    else
        throw new errors.NotFound("Not found Tutorial with id " + id);
}

async function updateTutorial(req) {
    if (!req.body) {
        throw new errors.BadRequest("Data to update can not be empty!");
    }
    var data = await Tutorial.findByIdAndUpdate(req.params.id, req.body, { useFindAndModify: false });
    if(data)
        return {message: "Tutorial was updated successfully."};
    else
        throw new errors.NotFound(`Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`); 
}

async function deleteTutorial(body) {
    const id = body.params.id;
    var data = await Tutorial.findByIdAndRemove(id);
    if(data)
        return {message: `Tutorial was deleted successfully!`};
    else
        throw new errors.BadRequest(`Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`);
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