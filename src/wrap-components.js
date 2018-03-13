
const wrapActionsWithSchema = (components = {}, action) => {
  return async (message, ...rest) => {
    return action(message, ...rest);
  }
};

module.exports = wrapActionsWithSchema;
