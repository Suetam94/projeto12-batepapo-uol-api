import { ParticipantsUseCases } from "../useCases/ParticipantsUseCases";

class ParticipantsController {
  private participantsUseCases: ParticipantsUseCases;

  constructor() {
    this.participantsUseCases = new ParticipantsUseCases();
  }

  async create(req, res, next) {
    const { name } = req.body;

    try {
      const newParticipant = await this.participantsUseCases.create(name);

      if (newParticipant instanceof Error) {
        return res.status(409).send();
      }

      return res.status(201).send();
    } catch (e) {
      return next(e);
    }
  }

  getAll(req, res, next) {
    try {
      return res.status(200).send();
    } catch (e) {
      return next(e);
    }
  }
}

export { ParticipantsController };
