import Joi from "joi";

const credentialSchema = Joi.object({
  title: Joi.string().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
  url: Joi.string().uri().optional()
});

export default credentialSchema;
