import express from "express";
import logger from "./logger.js";
import mongoose from "mongoose";
import {} from "dotenv/config";
import { taskRoutes } from "./routes/taskRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";
import { categoryRoutes } from "./routes/categoryRoutes.js";
import { subcategoryRoutes } from "./routes/subcategoryRoutes.js";
import { projectRoutes } from "./routes/projectRoutes.js";
import { tagRoutes } from "./routes/tagRoutes.js";

const app = express();
const port = process.env.PORT || 3000;
const mongoConnectionString =
  process.env.DB_CONNECTION_STRING || "mongodb://mongo:27017/tm";

// Middleware to parse JSON
app.use(express.json());

// Basic route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/api/tasks", taskRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/subcategories", subcategoryRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tags", tagRoutes);

app.use(errorHandler);

mongoose
  .connect(mongoConnectionString)
  .then(() => logger.info("Connected to MongoDB"))
  .catch((error) => logger.error("Could not connect to MongoDB:", error));

const server = app.listen(port, () => {
  logger.info(`Server is running on http://localhost:${port}`);
});

export { app, server };
