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

app.use((err, req, res, next) => {
  const errorStatus = err.status || 404;
  const errosMessage = err.message || "Something went wrong";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errosMessage,
    stack: err.stack,
  });
});

app.listen(5000, () =>
  console.log("Server is running at http://localhost:5000")
);
