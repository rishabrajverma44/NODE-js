import Joi from "joi";

//validation schema for form
export const FormValidation = Joi.object({
  company: Joi.string().required(),
  role: Joi.string().required(),
  jobType: Joi.string().required(),
  location: Joi.string().required(),
  date: Joi.date().less("now").required(),
  status: Joi.string().required(),
  notes: Joi.string().required(),
});
