const {MongoMemoryServer} = require('mongodb-memory-server');
const mongoose = require('mongoose');
const express = require('express');

let mongod;

const connectDB = async() => {
    mongod = await MongoMemoryServer.create({instance: {port:45055}});
    mongoose.connect(mongod.getUri(), err => {
        if (err) console.error(err);
    });
    console.log(`MongoDB IP: ${mongod._instanceInfo.ip} port: ${mongod._instanceInfo.port}`);
    app = express();
}

const disconnectDB = async() => {
    mongoose.disconnect();
};

module.exports = { connectDB, disconnectDB };