// Borrowed from https://github.com/dannydavidson/winston-gke

const logger = require('winston')

class NOOPLogger {
  debug () { }
  info () { }
  warning () { }
  error () { }
  critical () { }
}

class Logger {
  constructor (context, level) {
    logger.setLevels({
      debug: 5,
      info: 4,
      warning: 3,
      error: 2,
      critical: 1,
    })

    logger.remove(logger.transports.Console)
    logger.exitOnError = false

    const mergeMeta = ({ meta = {} }) => Object.assign(meta, context)

    logger.add(logger.transports.Console, {
      level,
      formatter: (options) => JSON.stringify({
        severity: options.level.toUpperCase(),
        message: options.message,
        meta: mergeMeta(options),
      }).trim(),
    })

    this.logger = logger
  }

  debug (msg, meta = {}) {
    this.logger.debug(msg, meta)
  }

  info (msg, meta = {}) {
    this.logger.info(msg, meta)
  }

  warning (msg, meta = {}) {
    this.logger.warning(msg, meta)
  }

  error (msg, meta = {}) {
    this.logger.error(msg, meta)
  }

  critical (msg, meta = {}) {
    this.logger.critical(msg, meta)
  }
}

exports = module.exports = {
  default: Logger,
  Logger,
  NOOPLogger,
}
