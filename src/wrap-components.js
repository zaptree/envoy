
const wrapActionsWithSchema = (components = [], action) => {
  return async (...args) => {
    let i = 0;
    const next = (..._args) => {
      if (i < components.length) {
        const { component, options } = components[i];
        i = i + 1;
        return component(options, _args, next);
      }
      return action(..._args);
    };
    return next(...args);
  }
};

module.exports = wrapActionsWithSchema;
