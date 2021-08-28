const express = require("express");

const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const PORT = process.env.PORT || 3001;
const app = express();

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

(async function bootstrap() {
  try {
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
  } catch (error) {
    console.log("Cannot connect to MongoMemoryServer");
    process.exit(1);
  }
  app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
})();

process.on("SIGINT", function () {
  mongoose.connection.close(function () {
    console.log("Mongoose disconnected through app termination");
    process.exit(0);
  });
});

process.on("uncaughtException", (error) => {
  console.log(error.stack);
  process.exit(1);
});
