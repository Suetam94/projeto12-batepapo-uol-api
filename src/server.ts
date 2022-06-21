import express from "express";
import { createMongoDBConn } from "./database/mongoDbConn";
import { routes } from "./routes";
import cors from "cors";

createMongoDBConn().then(() => console.log("MongoDB is connected"));

const app = express();
app.use(routes);
app.use(cors());

app.listen(5000, () =>
  console.log("Server is running at http://localhost:5000")
);
