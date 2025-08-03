import Joi from "joi";

//validation schema
export const SchemaValidation = Joi.object({
  company: Joi.string().required(),
  role: Joi.string().required(),
  jobType: Joi.string().required(),
  location: Joi.string().required(),
  date: Joi.string().required(),
  status: Joi.string().required(),
  notes: Joi.string().required(),
});
