const test = require("ava");

const supertest = require("supertest");
const { app, server } = require('../../server');
const request = supertest(app);

const User = require("../controllers/user.controller");
const {connectDB, disconnectDB} = require('./configure-test');

//test.only() runs only this test
//test.skip() skips this test

test.before("Create mongodb memory server", async t => {
	connectDB();
});

test.skip("Add dummy dataset", async t => {
	const user = {body:{
		_id:1,
		email: "email1@gmail.com",
		name: "name1",
		birthday: new Date(),
		tutorials: []
	}};
	await User.create(user);
	t.log(`Added: ${user}`);
});

test.skip("Test basic get", async t => {
	result = await request.get("/api/users/");
	t.log(result);
	t.log(result.status);
	t.log("-----------------");
});

//Serial
test.serial("Create new user and find it", async t => {

	const user1 = {_id:1, email: "email1", name: "name1", birthday: new Date(), tutorials: []};
	result = await request.post("/api/users/").send(user1);
	/*Same result as the await code
	return request1(app).post("/api/users/").send(user1).then((result) => {
		t.is(result.status, 200);
	});*/
	
	t.is(result.status, 200);
});

test.serial("Get all users", async t => {
	result = await request.get("/api/users/").send();
	t.is(result.status, 200);
	//t.log(result.text);
});

test.serial("Get created user", async t => {
	const a = {params:{email: "email"}};
	result = await request.get("/api/users/email1").send(a);
	
	t.is(result.body.name, 'name1');
});

//test.afterEach.always(() => User.delete());

//Stop te database when test are finished
test.after.always("Stop mongo", async t => {
	disconnectDB();
	server.close();
});