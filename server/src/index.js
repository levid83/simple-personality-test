const mongoose = require("mongoose");
const { createServer } = require("./server");

const seeder = require("./database/seeder");

require("dotenv").config();

const { dbConnect, dbDisconnect } = require("./database/database");

const app = createServer();

const PORT = process.env.PORT || 3001;

let mongod;

(async function bootstrap() {
  mongoose.connection.on("connected", function () {
    console.log("Mongoose connected");
  });

  mongoose.connection.on("error", (err) => {
    console.log("Mongoose connection error: " + err);
    process.emit("SIGTERM");
  });

  mongoose.connection.on("disconnected", function () {
    console.log("Mongoose disconnected");
    process.emit("SIGTERM");
  });

  mongod = await dbConnect();

  seeder();
})()
  .then(() =>
    app.listen(PORT, () => console.log(`Server listening on ${PORT}`))
  )
  .catch((err) => {
    console.log("Cannot connect to Database: " + err.message);
    process.emit("SIGTERM");
  });

process.on("SIGINT", async function () {
  try {
    await dbDisconnect(mongod);
  } catch (err) {
    console.log("Cannot disconnect from Database");
  }

  console.log("Process terminated");
  process.exit();
});

process.on("SIGTERM", async function () {
  console.log("Process terminated");
  process.exit(1);
});

process.on("uncaughtException", (error) => {
  console.log(error.stack);
  process.exit(1);
});
