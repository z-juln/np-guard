const process = require('process');
const argvParse = require('argv-parse');

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
    },
    argv
  );

  if (process.env.SKIP_NPG) {
    opts['skip-npg'] = true;
  }

  return opts;
}

module.exports = getOpts;
