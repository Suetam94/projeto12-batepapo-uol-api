import { ParticipantsUseCases } from "../useCases/ParticipantsUseCases";

class StatusController {
  private participantsUseCases: ParticipantsUseCases;
  constructor() {
    this.participantsUseCases = new ParticipantsUseCases();
  }
  async updateUserStatus(req, res, next) {
    const { user } = req.headers;

    if (!user) {
      throw new Error("User header is required");
    }
    try {
      await this.participantsUseCases.updateParticipantStatus(user);

      return res.status(201).send();
    } catch (e) {
      return next(e);
    }
  }
}

export { StatusController };
