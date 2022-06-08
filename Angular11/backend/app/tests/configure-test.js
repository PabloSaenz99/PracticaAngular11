const test = require("ava");

const {MongoMemoryServer} = require('mongodb-memory-server');
const mongoose = require('mongoose');
const express = require('express');

test("config test", t => t.pass());

let mongod;

const connectDB = async() => {
    mongod = await MongoMemoryServer.create();
    mongoose.connect(mongod.getUri(), err => {
        if (err)
            console.error(err);
    });
    console.log(`MongoDB IP: ${mongod._instanceInfo.ip} port: ${mongod._instanceInfo.port}`);
    app = express();
}

const disconnectDB = async() => {
    mongoose.disconnect();
	//await mongod.stop();
};

module.exports = { connectDB, disconnectDB };