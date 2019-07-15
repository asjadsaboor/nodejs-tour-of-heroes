import * as Joi from 'joi';

export const addHero: Joi.SchemaMap = {
  name: Joi.string()
    .required()
    .max(250),
};

export const updateHero: Joi.SchemaMap = {
  name: Joi.string()
    .required()
    .max(250),
  id: Joi.number().required(),
};
