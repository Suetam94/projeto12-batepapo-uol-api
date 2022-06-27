import cors from "cors";
import express from "express";

import { createMongoDBConn } from "./database/mongoDbConn";
import { routes } from "./routes";
import { statusVerification } from "./utils/statusVerification";

createMongoDBConn().then(() => console.log("MongoDB is connected"));
statusVerification().catch(() => console.info());

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(5000, () =>
  console.log("Server is running at http://localhost:5000")
);
