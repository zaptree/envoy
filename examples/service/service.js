const bodyParser = require('body-parser');
const envoy = require('../../src');

const { listen } = envoy.createService({
  components: {
    // auth: require('./components/auth'),
  },
  configurations: {
    http: {
      type: 'http',
      port: 3232,
      basePath: '/api/v1',
      middleware: [
        // bodyParser.json({
        //   limit: '10mb'
        // }),
        // bodyParser.urlencoded({
        //   extended: true
        // }),
      ],
    },
    // bus: {
    //   type: 'rabbitMQ',
    //   port: 1345,
    // }
  }
});

// const send = envoy.createSender({
//   configurations: {
//     service1: {
//       type: 'http',
//       uri: 'http://localhost:3001',
//     }
//   }
// });

const listener = listen('http', {
  path: '/products',
  method: 'get',
  middleware: [],
  components: {
    auth: ['admin']
  },
  action: async({ data }, { request, response })=>{
    return {
      data,
      test: true,
    };
  }
});


// to stop listening
// listener.stop();



// listen('bus', {
//   channel: 'on-change.*.whatever',
//   components: {
//     auth: ['admin'],
//   },
//   action: (request, response)=>{
//   }
// });
//
//
//
// module.exports = {
//   listen,
//   send,
// };