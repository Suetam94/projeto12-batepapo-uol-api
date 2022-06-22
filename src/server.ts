import cors from "cors";
import express from "express";

import { createMongoDBConn } from "./database/mongoDbConn";
import { routes } from "./routes";

createMongoDBConn().then(() => console.log("MongoDB is connected"));

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(5000, () =>
  console.log("Server is running at http://localhost:5000")
);
