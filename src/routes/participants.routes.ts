import { Router } from "express";

import { ParticipantsController } from "../controllers/ParticipantsController";

const participantController = new ParticipantsController();

const participantsRoutes = Router();

participantsRoutes.get("/", (req, res, next) =>
  participantController.getAll(req, res, next)
);
participantsRoutes.post("/", (req, res, next) =>
  participantController.create(req, res, next)
);

export { participantsRoutes };
