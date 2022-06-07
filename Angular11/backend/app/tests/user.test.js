const test = require("ava");
const request = require("supertest");

const {MongoMemoryServer} = require('mongodb-memory-server');
const mongoose = require('mongoose');

const User = require("../controllers/user.controller");
const express = require('express');

//https://ducmanhphan.github.io/2018-12-17-ava-test-framework/
//https://dimitr.im/nodejs-ava
//https://blog.adrianistan.eu/usar-ava-para-tests-en-una-api-hecha-en-node-js-y-express

//https://github.com/avajs/ava/blob/main/docs/recipes/endpoint-testing-with-mongoose.md MUY UTIL
//https://github.com/zellwk/ava/blob/8b7ccba1d80258b272ae7cae6ba4967cd1c13030/docs/recipes/endpoint-testing-with-mongoose.md

//https://www.mongodb.com/community/forums/t/error-cannot-find-module-babel-core-register/43021/11 babel

//test.only() runs only this test
//test.skip() skips this test

let mongod;
const app = express();

test.before("Create mongodb memory server", async t => {
	mongod = await MongoMemoryServer.create();
	mongoose.connect(mongod.getUri(), err => {
		if (err)
			console.error(err);
	});
});

test.serial("Create new user and find it", async t => {
	//Number of tests
	t.plan(3);
	
	const user1 = {_id:1, email: "email", name: "name1", birthday: new Date(), tutorials: []}
	/*Same result as the await code
	return request1(app).post("/").send(user1).then((result) => {
		console.log(result);
		t.is(result.status, 401);
	});*/
	result = await request(app).post("/").send(user1);
	t.log(result.body);

	t.falsy(result.status);
	t.is(result.body.name, 'name1');
	
	//Verify that user is created in DB
	const newUser = User.findOne({ email: 'email' });
	t.is(newUser.name, 'name1');
});

//test.afterEach.always(() => User.delete());

test.after.always(async t => {
	mongoose.disconnect()
	mongod.stop()
});