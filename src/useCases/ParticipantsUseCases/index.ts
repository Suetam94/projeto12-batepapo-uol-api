import Participant from "../../database/models/participant";
import { IMessageCreateData, MessagesUseCases } from "../MessagesUseCases";

interface IParticipantCreateData {
  name: string;
}

class ParticipantsUseCases {
  async create({ name }: IParticipantCreateData) {
    const nameAlreadyExists = await Participant.findOne({ name }).exec();

    if (nameAlreadyExists) {
      return new Error("This name is already in use, please try another");
    }

    const newParticipant = new Participant({
      name,
    });

    await newParticipant.save();

    const messagesUseCases = new MessagesUseCases();

    const message = {
      from: newParticipant.name,
      to: "Todos",
      text: "entra na sala...",
      type: "status",
    };

    const newMessage = await messagesUseCases.create(
      <IMessageCreateData>message
    );

    if (!newMessage) {
      throw new Error("Something went wrong, please try again");
    }

    return newParticipant;
  }
}

export { ParticipantsUseCases };
