import { Router } from "express";

import { MessagesController } from "../controllers/MessagesController";

const messagesRoutes = Router();

const messagesController = new MessagesController();

messagesRoutes.get("/", (req, res, next) =>
  messagesController.getAll(req, res, next)
);
messagesRoutes.post("/", (req, res, next) =>
  messagesController.create(req, res, next)
);

export { messagesRoutes };
