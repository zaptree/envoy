
const envoy = require('./src');

module.exports = envoy;

// const { listen } = envoy.createService({
//   components: {
//     // auth: require('./components/auth'),
//   },
//   configurations: {
//     http: {
//       type: 'http',
//       port: 3000,
//       basePath: '/api/v1',
//       middleware: [],
//     },
//     // bus: {
//     //   type: 'rabbitMQ',
//     //   port: 1345,
//     // }
//   }
// });
//
// const send = envoy.createSender({
//   configurations: {
//     service1: {
//       type: 'http',
//       uri: 'http://localhost:3001',
//     }
//   }
// });
//
// // TODO: figure out a way to stop listening based on the listenerId
// const listener = listen('http', {
//   path: '/products',
//   method: 'get',
//   middleware: [],
//   components: {
//     auth: ['admin']
//   },
//   action: async(request, response)=>{
//
//   }
// });
//
// // to stop listening
// listener.stop();
//
//
//
// listen('bus', {
//   channel: 'on-change.*.whatever',
//   components: {
//     auth: ['admin'],
//   },
//   action: (request, response)=>{
//     return 'Woot';
//   }
// });
//
//
//
// module.exports = {
//   listen,
//   send,
// };