const mongoose = require("mongoose");
const { createServer } = require("./server");

const { dbConnect, dbDisconnect } = require("./database");

const app = createServer();

const PORT = process.env.PORT || 3001;

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

  try {
    await dbConnect();
  } catch (error) {
    console.log("Cannot connect to Mongoose");
    process.emit("SIGTERM");
  }
})().then(() =>
  app.listen(PORT, () => console.log(`Server listening on ${PORT}`))
);

process.on("SIGINT", async function () {
  await dbDisconnect();
  console.log("Process terminated");
  process.exit();
});

process.on("SIGTERM", async function () {
  console.log("Process terminated due to an error");
  process.exit(1);
});

process.on("uncaughtException", (error) => {
  console.log(error.stack);
  process.exit(1);
});
