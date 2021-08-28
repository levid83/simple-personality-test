const express = require("express");

const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const mongod = new MongoMemoryServer();

const PORT = process.env.PORT || 3001;
const app = express();

(async () => {
  const mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();

  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  mongoose.connection.on("connected", function () {
    console.log("Mongoose default connection open to " + uri);
  });

  mongoose.connection.on("error", function (err) {
    console.log("Mongoose default connection error: " + err);
  });

  mongoose.connection.on("disconnected", function () {
    console.log("Mongoose default connection disconnected");
  });

  await mongoose.connect(uri, mongooseOpts);
})().then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });
});

process.on("SIGINT", function () {
  mongoose.connection.close(function () {
    console.log("Mongoose disconnected through app termination");
    process.exit(0);
  });
});
