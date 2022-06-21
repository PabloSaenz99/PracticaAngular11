const db = require("../config/db.config");
const Tutorial = db.tutorials;

async function createTutorial(body) {
    if (!body.title || !body.description) {
        return null;
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
    return await Tutorial.findById(id);
}

async function updateTutorial(req) {
    return await Tutorial.findByIdAndUpdate(req.params.id, req.body, { useFindAndModify: false });
}

async function deleteTutorial(body) {
    const id = body.params.id;
    var data = await Tutorial.findByIdAndRemove(id);
    if(data)
        return {message: `Tutorial was deleted successfully!`};
    else
        return null;
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