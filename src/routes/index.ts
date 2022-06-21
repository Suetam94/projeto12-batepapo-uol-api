import { Router } from "express";
import { participantsRoutes } from "./participants.routes";
import { messagesRoutes } from "./messages.routes";
import { statusRoutes } from "./status.routes";

const routes = Router();

routes.use("/participants", participantsRoutes);
routes.use("/messages", messagesRoutes);
routes.use("/status", statusRoutes);

export { routes };
