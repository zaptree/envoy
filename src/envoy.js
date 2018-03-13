const http = require('./messengers/http');
const rabbitMQ = require('./messengers/rabbitMQ');

const wrapActionsWithSchema = require('./wrap-schema');
const wrapActionsWithComponent = require('./wrap-components');

const messengers = {
  http,
  rabbitMQ,
};

function createService({ components: baseComponents, configurations }) {
  const instances = {};

  // instantiate messengers
  Object.keys(configurations).forEach(key => {
    const config = configurations[key];
    const messenger = messengers[config.type];
    instances[key] = messenger.createInstance(config);
  });

  return {
    listen: (instanceKey, { components, action, schema = {}, ...options }) => {

      let wrappedAction = wrapActionsWithSchema(schema, action);
      wrappedAction = wrapActionsWithComponent(components, wrappedAction);

      return instances[instanceKey].listen(Object.assign({
        action: wrappedAction,
      }, options));
    },
    messengers: instances,
    readyPromise: () => {
      return Promise.all(Object.keys(instances).map((key) => instances[key].readyPromise))
    }
  }
}

function createSender() {

}

module.exports = {
  createService,
  createSender,
};
