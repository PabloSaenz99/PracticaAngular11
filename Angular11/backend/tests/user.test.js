const test = require("ava");

const supertest = require("supertest");
const app = require('../server');
const server = require('../index');
const request = supertest(app);

const User = require("../src/controllers/user.controller");
const {connectDB, disconnectDB} = require('./configure-test');

//test.only() runs only this test
//test.skip() skips this test

test.before("Create mongodb memory server", async t => {
	connectDB();
});

test.serial("Create new user", async t => {
	const user1 = {email: "email1", name: "name1", password: "pass1", birthday: new Date()};
	result = await request.post("/api/users/").send(user1);
	/*Same result as the await code
	return request1(app).post("/api/users/").send(user1).then((result) => {
		t.is(result.status, 200);
	});*/
	
	t.is(result.status, 200);
});

test.serial("Create token", async t => {
	const a = {email: "email1", password: "pass1"};
	result = await request.post("/api/users/login").send(a);
	t.truthy(result, 'Token created');
});

test.serial("Get all users", async t => {
	result = await request.get("/api/users/").send();
	t.is(result.status, 200);
});

test.serial("Get created user and add a tutorial to it", async t => {
	const a = {params:{email: "email"}};
	result = await request.get("/api/users/email1").send(a);
	t.is(result.body.name, 'name1');

	const b = {tutorialId: "62c2a275b61e4ad379b16b82", userId: result.body._id};
	result = await request.post("/api/users/set/").send(b);
	t.is(result.body.message, 'User was updated successfully.');
});

//test.afterEach.always(() => User.delete());

//Stop te database when test are finished
test.after.always("Stop mongo", async t => {
	disconnectDB();
	server.close();
});