const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const initializeRoutes = require("./routes");

function createServer() {
  const app = express();

  app.use(cors());

  app.use(helmet());
  app.use(express.json());

  initializeRoutes(app);

  app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
      error: {
        message: error.message,
      },
    });
  });
  return app;
}

module.exports = { createServer };
