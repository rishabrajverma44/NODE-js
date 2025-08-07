import Joi from "joi";

//validation schema for form
export const FormValidation = Joi.object({
  company: Joi.string().required(),
  role: Joi.string().required(),
  jobType: Joi.string().required(),
  location: Joi.string().when("jobType", {
    is: Joi.string().valid("Remote"),
    then: Joi.optional().allow(""),
    otherwise: Joi.required().messages({
      "any.required": "Location is required",
    }),
  }),
  date: Joi.string().required(),
  status: Joi.string().required(),
  notes: Joi.string().required(),
});
