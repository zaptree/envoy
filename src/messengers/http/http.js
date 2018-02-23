const express = require('express');
const Promise = require('bluebird');

const servers = {

};
function getServer(port) {
  if (!servers[port]) {
    const app = express();
    app.use(express.json({
      limit: '10mb',
    }));
    app.use(express.urlencoded({
      extended: true,
    }));
    const serverPromise = new Promise((resolve, reject) => {
      const server = app.listen(port, ()=>{
        console.log('HTTP messenger listening on port ' + port);
        resolve(server);
      });
    });
    servers[port] = {
      app,
      serverPromise,
    }
  }
  return servers[port];
}

function createInstance({ port, basePath, middleware: baseMiddleware = [], bodyParser }) {
  const { app, serverPromise } = getServer(port);
  const router = express.Router();
  baseMiddleware.forEach(middleware => {
    router.use(middleware);
  });
  app.use(basePath, router);

  return {
    listen: ({ path, action, method = 'get', middleware = [] }) => {

      router[method.toLowerCase()](path, ...middleware, async (request, response) => {
        const result = await action({
          data: {
            ...request.headers,
            ...request.params,
            ...request.query,
            ...request.body,
          },
          body: request.body,
          headers: request.headers,
          query: request.query,
          params: request.params,
        }, {request, response});
        response.json(result);
      });
      return {
        stop: () => {
          throw new Error('HTTP messenger does not support stopping a listener');
        }
      };
    },
    readyPromise: serverPromise,
  };
}

module.exports = {
  createInstance,
};
