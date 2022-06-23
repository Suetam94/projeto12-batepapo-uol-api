import { MessagesUseCases } from "../useCases/MessagesUseCases";

class MessagesController {
  private messagesUseCases: MessagesUseCases;
  constructor() {
    this.messagesUseCases = new MessagesUseCases();
  }

  create(req, res, next) {
    const { to, text, type } = req.body;
    const { user } = req.headers;

    if (!user) {
      throw new Error("User is required");
    }

    if (!to) {
      throw new Error("Message to is required");
    }
    if (!text) {
      throw new Error("Message text is required");
    }
    if (!type) {
      throw new Error("Message type is required");
    }

    try {
      const newMessage = this.messagesUseCases.create({
        text,
        type,
        to,
        from: user,
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
