const Binance = require('node-binance-api');
const binance = new Binance().options({
  APIKEY: '2e9DRFlALtCu01vRLFoOFsXiIV9ZNqBY06nXq7T8446OTyfHkV2O5Fd7rkV0jE6Q',
  APISECRET: 'kxPKd9T8JD4T2alEv5l3RtsuG9P9sQRnuZ6fTjhqe52sM8fxKeYWAWdlZFImJ5Yq',
  useServerTime: true,
  recvWindow: 60000, // Set a higher recvWindow to increase response timeout
  verbose: true // Add extra output when subscribing to WebSockets, etc
});

module.exports = binance;