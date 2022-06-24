import { ParticipantsUseCases } from "../useCases/ParticipantsUseCases";
import { ParticipantValidator } from "../utils/validators/ParticipantValidator";

class ParticipantsController {
  private participantsUseCases: ParticipantsUseCases;

  constructor() {
    this.participantsUseCases = new ParticipantsUseCases();
  }

  async create(req, res, next) {
    const { name } = req.body;

    const participantValidator = new ParticipantValidator();

    try {
      const verifiedName = (await participantValidator.validate(name)) as
        | string
        | Error;

      if (verifiedName instanceof Error) {
        return res.status(422).send();
      }

      const newParticipant = await this.participantsUseCases.create({
        name: verifiedName,
      });

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
