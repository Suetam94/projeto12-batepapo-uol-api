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

    const messagesUseCases = new MessagesUseCases();

    const message = {
      from: name,
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

    await newParticipant.save();

    return newParticipant;
  }

  async getAllParticipants() {
    const allParticipants = await Participant.find();

    if (!allParticipants) {
      throw new Error("Something went wrong, please try again");
    }

    return allParticipants;
  }

  async updateParticipantStatus(user: string) {
    return Participant.findOneAndUpdate(
      { name: user },
      { $set: { lastStatus: new Date() } }
    );
  }
}

export { ParticipantsUseCases };
