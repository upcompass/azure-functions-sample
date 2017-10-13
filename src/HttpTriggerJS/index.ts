import nconf = require('nconf')
import { AzureFunctions } from 'winston-azure-functions'
import { config } from '../host.json'
import winston = require('winston')
nconf
  .argv()
  .env({ separator: '__' })
  .defaults(config)
module.exports = (context, req) => {
  // Initialize Azure winston transport
  const options = nconf.get('winston:console-options') || {}
  winston.configure({
    levels: nconf.get('winston:levels') || {},
    transports: [new AzureFunctions({ ...options, context })]
  })

  // Log through winston instead of using context.log
  winston.info('Initializing function')

  if (req.query.name || (req.body && req.body.name)) {
    context.res = {
      // status: 200, /* Defaults to 200 */
      body: 'Hello ' + (req.query.name || req.body.name)
    }
  } else {
    context.res = {
      body: 'Please pass a name on the query string or in the request body',
      status: 400
    }
  }

  context.done()
}
