const process = require('process');
const argvParse = require('argv-parse');
const debug = require('./utils/debug');

const getOpts = (argv) => {
  const opts = argvParse(
    {
      version: { type: 'boolean', alias: 'v' },
      help: { type: 'boolean', alias: 'h' },
      silent: { type: 'boolean', alias: 's' },
      msg: { type: 'string', alias: 'm' },
      cmd: { type: 'string', alias: 'C' },
      color: { type: 'string', alias: 'c' },
      bg: { type: 'string', alias: 'b' },
      'skip-npg': { type: 'boolean', alias: 'S' },
      'overwrite': { type: 'string', alias: 'o' },
    },
    argv
  );

  if (process.env.SKIP_NPG && process.env.SKIP_NPG != 0 && process.env.SKIP_NPG !== '') {
    opts['skip-npg'] = true;
  }

  debug({ opts, SKIP_NPG: process.env.SKIP_NPG });

  return opts;
}

module.exports = getOpts;
