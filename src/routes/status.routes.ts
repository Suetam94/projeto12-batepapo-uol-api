import { Router } from "express";

import { StatusController } from "../controllers/StatusController";

const statusRoutes = Router();

const statusController = new StatusController();

statusRoutes.post("/", (req, res, next) =>
  statusController.updateUserStatus(req, res, next)
);

export { statusRoutes };
