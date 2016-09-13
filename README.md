# Structured Logging

[![NPM](https://nodei.co/npm/finciero-logger.png)](https://nodei.co/npm/finciero-logger/)

[![npm version](https://badge.fury.io/js/finciero-logger.svg)](https://badge.fury.io/js/finciero-logger)

[Winston](https://github.com/winstonjs/winston) wrapper that speaks GCE.

## Install

`npm i --save finciero-logger`

## Usage

Constructor first argument is a persisted default metadata object that gets added to each logging
message, and second arguments specifies the logger level (debug level as default).

The Logger instance has the following methods:
- debug
- info
- warning
- error
- critical

Each method receives a message (string) as first argument, and the second
argument is an optional object that gets merge to the default metadata (specified
when instantiating the logger).

### Examples
```js
const { Logger } = require('finciero-logger')

const logger = new Logger({
  svc_tag: 'foo:1.0.0',
  grpc_address: ':13000',
  http_address: ':8080',
})

logger.info('foo', { custom: 'extra', data: { important: 'value' } })
// output: {"severity":"INFO","message":"foo","meta":{"custom":"extra","data":{"important":"value"},"svc_tag":"foo:1.0.0","grpc_address":":13000","http_address":":8080"}}
```

```js
const { Logger } = require('finciero-logger')

const level = 'info' // 'debug', 'info', 'warning', 'error' and 'critical' are valid level values
const logger = new Logger({
  svc_tag: 'foo:1.0.0',
  grpc_address: ':13000',
  http_address: ':8080',
}, level) 
logger.info('foo', { custom: 'extra', data: { important: 'value' } })
// output: {"severity":"INFO","message":"foo","meta":{"custom":"extra","data":{"important":"value"},"svc_tag":"foo:1.0.0","grpc_address":":13000","http_address":":8080"}}
```

---------

Most of the code was borrowed from https://github.com/dannydavidson/winston-gke
