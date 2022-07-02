const { version } = require('../package.json');
const getOpts = require('./get-opts');
const logHelp = require('./help-info');
const report = require('./report');
const spanwOverwrite = require('./spawn-overwrite');

async function main(argv) {
  const opts = getOpts(argv);

  // singe opt. conflicted order: skip-npg > overwrite > version > help
  if (opts['skip-npg']) {
    process.exit();
  } else if (opts['overwrite']) {
    try {
      await spanwOverwrite(opts['overwrite']);
    } catch (error) {
      console.log({error});
    }
    process.exit(1);
  } else if (opts.version) {
    console.log(`v${version}`);
    process.exit();
  } else if (opts.help) {
    logHelp();
    process.exit();
  }
  
  if (!opts.silent) {
    report(opts);
  }

  process.exit(1);
}

module.exports = main;
