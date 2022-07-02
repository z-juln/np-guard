const { spawn } = require('child_process');

const spanwOverwrite = (allCmd, spawnOpts) => {
  process.env.SKIP_NPG = 1;
  const [cmd, ...opts] = allCmd.split(' ');
  const cp = spawn(cmd, opts, {
    stdio: 'inherit',
    ...spawnOpts,
  });
  return new Promise((resolve, reject) => {
    cp.on('close', () => {
      process.env.SKIP_NPG = 0;
      resolve();
    });
    cp.on('error', reject);
  });
}

module.exports = spanwOverwrite;
