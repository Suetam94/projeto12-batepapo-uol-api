import { format } from "date-fns";

import Messages from "../../database/models/messages";

export interface IMessageCreateData {
  from: string;
  to: string;
  type: "private_message" | "message" | "status";
  text: string;
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

    return newMessage;
  }
}

export { MessagesUseCases };
