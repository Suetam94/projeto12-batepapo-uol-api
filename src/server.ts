import express from "express";
import { createMongoDBConn } from "./database/mongoDbConn";

createMongoDBConn().then(() => console.log("MongoDB is connected"));

const app = express();

app.listen(5000, () =>
  console.log("Server is running at http://localhost:5000")
);
