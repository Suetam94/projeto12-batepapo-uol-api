import { ParticipantsUseCases } from "../useCases/ParticipantsUseCases";

class ParticipantsController {
  private participantsUseCases: ParticipantsUseCases;

  constructor() {
    this.participantsUseCases = new ParticipantsUseCases();
  }

  async create(req, res, next) {
    const { name } = req.body;

    try {
      const newParticipant = await this.participantsUseCases.create({ name });

      if (newParticipant instanceof Error) {
        return res.status(409).send();
      }

      return res.status(201).send();
    } catch (e) {
      return next(e);
    }
  }

  async getAll(req, res, next) {
    try {
      const allParticipants =
        await this.participantsUseCases.getAllParticipants();
      return res.status(200).json(allParticipants).send();
    } catch (e) {
      return next(e);
    }
  }
}

export { ParticipantsController };
