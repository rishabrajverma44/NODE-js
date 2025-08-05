import Joi from "joi";

export const UserRegistrationValidation = Joi.object({
  userName: Joi.string().required(),
  userEmail: Joi.string().email().required(),
  password: Joi.string().min(4).alphanum().required(),
  role: Joi.string().valid("job_seeker", "company").required(),
});

export const UserLoginValidation = Joi.object({
  userEmail: Joi.string().required(),
  password: Joi.string().required(),
});

export const UserChangePassword = Joi.object({
  userEmail: Joi.string().required(),
  password: Joi.string().required(),
  confirmPassord: Joi.any().valid(Joi.ref("password")).required(),
});
