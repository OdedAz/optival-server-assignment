module.exports = (schema, data, throwError = true) => {
  const { error, value } = schema.validate(data, {
    allowUnknown: true,
    stripUnknown: true,
  });
  if (throwError && error) throw error;
  return value;
};
