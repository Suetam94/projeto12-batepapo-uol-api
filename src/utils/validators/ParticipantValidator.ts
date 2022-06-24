import Joi from "joi";

class ParticipantValidator {
  async validate(name: string) {
    const validator = this.objectValidator().validate({ name });

    if (validator.error) {
      return new Error();
    }

    return validator.value.name;
  }

  objectValidator() {
    return Joi.object({
      name: Joi.string().alphanum().min(1).required(),
    });
  }
}

export { ParticipantValidator };
