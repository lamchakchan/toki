'use strict';

const loggerPath     = '../../lib/internals/logger';
const tokiLoggerName = require(loggerPath).constants.LOGGER_MODULE;

class TokiLoggerStub {

    constructor(spies = {}) {

        this.spies = spies;
    }

    info(...args) {

        this.spies.infoSpy();
        this.log(args);
    }

    debug(...args) {

        this.spies.debugSpy();
        this.log(args);
    }

    error(...args) {

        this.spies.errorSpy();
        this.log(args);
    }

    log(...args) {

        if (process.env.CONSOLE_DEBUG) {

            console.log(args);
        }
    }
}

class TokiLoggerInstance {

    constructor(spies) {

        return () => {

            return new TokiLoggerStub(spies);
        };
    }
}

class TokiLoggerProxy {

    constructor(spies = {}) {

        this[tokiLoggerName] = new TokiLoggerInstance(spies);
    }
}

module.exports = {
    TokiLoggerStub,
    TokiLoggerProxy
};

