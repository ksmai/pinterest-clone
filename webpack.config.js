switch (process.env.NODE_ENV) {
  case 'production':
    module.exports = require('./webpack.prod');
    break;

  case 'test':
    module.exports = require('./webpack.test');
    break;

  case 'development':
  default:
    module.exports = require('./webpack.dev');
}

