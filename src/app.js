import express from "express"
import logger from "../logger.js"
import mongoose from "mongoose"
import {} from "dotenv/config"

const app = express();
const port = process.env.PORT || 3000;
const mongoConnectionString = process.env.DB_CONNECTION_STRING || "mongodb://mongo:27017/tm"

// Middleware to parse JSON
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

mongoose
  .connect(mongoConnectionString)
  .then(() => logger.info("Connected to MongoDB"))
  .catch((error) => logger.error("Could not connect to MongoDB:", error))

const server = app.listen(port, () => {
  logger.info(`Server is running on http://localhost:${port}`);
});

export { app, server }