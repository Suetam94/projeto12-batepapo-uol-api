import { MessagesUseCases } from "../useCases/MessagesUseCases";
import {
  IMessageContent,
  MessageValidator,
} from "../utils/validators/MessageValidator";
import { ParticipantValidator } from "../utils/validators/ParticipantValidator";

class MessagesController {
  private messagesUseCases: MessagesUseCases;
  constructor() {
    this.messagesUseCases = new MessagesUseCases();
  }

  async create(req, res, next) {
    const { to, text, type } = req.body;
    const { user } = req.headers;
    const messageObj = {
      to,
      text,
      type,
    };

    const messageValidator = new MessageValidator();
    const participantValidator = new ParticipantValidator();

    try {
      const messageVerified = (await messageValidator.validate(messageObj)) as
        | IMessageContent
        | Error;

      const participantVerified = (await participantValidator.validate(
        user
      )) as string | Error;

      if (
        messageVerified instanceof Error ||
        participantVerified instanceof Error
      ) {
        return res.status(422).send();
      }

      const newMessage = this.messagesUseCases.create({
        text: messageVerified.text,
        type: messageVerified.type as "message" | "private_message",
        to: messageVerified.to,
        from: participantVerified,
      });

      if (newMessage instanceof Error) {
        return res.status(422).send();
      }

      return res.status(201).send();
    } catch (e) {
      return next(e);
    }
  }

  async getAll(req, res, next) {
    const { user } = req.headers;
    const { limit } = req.params;

    try {
      const allMessages = await this.messagesUseCases.getAllMessages({
        user,
        limit,
      });

      if (allMessages instanceof Error) {
        return res.status(404).send();
      }

      return res.status(200).json(allMessages).send();
    } catch (e) {
      return next(e);
    }
  }
}

export { MessagesController };
