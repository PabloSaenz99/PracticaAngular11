import test from "ava";
import request from "supertest";
import express from "express";

//import User from "../controllers/user.controller.js";

//https://dimitr.im/nodejs-ava
//https://blog.adrianistan.eu/usar-ava-para-tests-en-una-api-hecha-en-node-js-y-express
let app;

test.beforeEach(t => {
	app = express();
	t.context = {
		//authenticator: new Authenticator(),
		//credentials: new Credentials('admin', 's3cr3t')
	};
});

test("create new user", async t => {
	aux;
	const user1 = {_id:1, email: "email", name: "name", tutorials: []}
	res = request(app, aux)
        .post("/")
        .send(user1);
    t.is(res.status,401);
    t.true(res.header["www-authenticate"] !== undefined);
});