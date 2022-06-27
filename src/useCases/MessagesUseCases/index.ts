import { format } from "date-fns";

import Messages from "../../database/models/messages";
import Participant from "../../database/models/participant";
import { ParticipantsUseCases } from "../ParticipantsUseCases";

export interface IMessageCreateData {
  from: string;
  to: string;
  type: "private_message" | "message" | "status";
  text: string;
}

interface IGetAllMessagesData {
  user: string;
  limit?: number;
}

class MessagesUseCases {
  async create({ text, to, from, type }: IMessageCreateData) {
    const time = format(new Date(), "HH:mm:ss");

    const newMessage = new Messages({
      from,
      to,
      text,
      type,
      time,
    });

    await newMessage.save();

    const participantUseCases = new ParticipantsUseCases();

    await participantUseCases.updateParticipantStatus(from);

    return newMessage;
  }

  async getAllMessages({ user, limit }: IGetAllMessagesData) {
    const allMessages = !limit
      ? await Messages.find()
      : await Messages.find().limit(limit);

    const userExists = await Participant.findOne({ name: user });

    if (!userExists) {
      return new Error();
    }

    return (
      allMessages
        // eslint-disable-next-line array-callback-return,consistent-return
        .map((message) => {
          if (message.to === user || message.to === "Todos") {
            return message;
          }
        })
        .filter((message) => message)
    );
  }
}

export { MessagesUseCases };
