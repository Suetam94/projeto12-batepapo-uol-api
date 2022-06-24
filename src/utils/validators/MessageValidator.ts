import Joi from "joi";

export interface IMessageContent {
  to: string;
  text: string;
  type: string;
}

class MessageValidator {
  async validate(message: IMessageContent) {
    const validator = this.objectValidator().validate(message);

    if (validator.error) {
      return new Error();
    }

    return validator.value;
  }

  objectValidator() {
    return Joi.object({
      to: Joi.string().min(1).required(),
      text: Joi.string().min(1).required(),
      type: Joi.string().valid("message", "private_message"),
    });
  }
}

export { MessageValidator };
