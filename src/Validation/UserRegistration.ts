import Joi from "joi";

export const UserRegistrationValidation = Joi.object({
  userName: Joi.string().required(),
  userEmail: Joi.string().required(),
  password: Joi.string().required(),
});

export const UserLoginValidation = Joi.object({
  userEmail: Joi.string().required(),
  password: Joi.string().required(),
});
