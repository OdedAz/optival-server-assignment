const Joi = require("joi");

module.exports = {
  configurationSchema: Joi.object().keys({
    id: Joi.number().optional(),
    source_id: Joi.number().optional(),
    feed_name: Joi.string().required(),
    column_name: Joi.string().required(),
    operator: Joi.string()
      .optional()
      .allow("")
      .pattern(/[<>=]|^$/),
    condition: Joi.string()
      .allow("")
      .pattern(/or|and|^$/),
    value: Joi.string().required(),
  }),
  sourceScheme: Joi.object().keys({
    id: Joi.number().optional(),
    name: Joi.string().required(),
    url: Joi.string().required(),
    transformed_data: Joi.object().keys().required(),
    refresh_time: Joi.string().optional(),
    last_time_data_updated: Joi.date().required(),
  }),
};
