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
messagesRoutes.put("/:id", (req, res, next) =>
  messagesController.updateMessage(req, res, next)
);
messagesRoutes.delete("/:id", (req, res, next) =>
  messagesController.deleteMessage(req, res, next)
);

export { messagesRoutes };
