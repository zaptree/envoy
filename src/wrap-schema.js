const SchemaValidator = require('instancejs-schema-validator');

const wrapActionsWithSchema = (schema = {}, action) => {
  let requestValidator;
  let responseValidator;

  if (schema.request) {
    requestValidator = new SchemaValidator(schema.request, {
      rules: {},
      types: {},
    });
  }
  if (schema.response) {
    responseValidator = new SchemaValidator(schema.response, {
      rules: {},
      types: {},
    });
  }

  return async (rawMessage, ...rest) => {
    let message = rawMessage;
    if (requestValidator) {
      const result = requestValidator.validate(message.data);
      if (!result.success) {
        return {
          status: 400, // I should probably let http specific listener add this
          error: true,
          errorCode: 'BAD_REQUEST',
          errorMessage: 'Bad request',
          errors: result.errors,
        };
      }
      message = {
        ...message,
        data: result.data,
      };
    }
    let response = await action(message, ...rest);

    if (responseValidator) {
      const result = responseValidator.validate(response.data);
      if (!result.success) {
        return {
          status: 500,
          error: true,
          errorCode: 'BAD_RESPONSE',
          errorMessage: 'Bad response',
          errors: result.errors,
        };
      }
      response = {
        ...response,
        data: result.data,
      };
    }

    return response;
  }
};

module.exports = wrapActionsWithSchema;
