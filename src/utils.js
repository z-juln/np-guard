const { spawn } = require('child_process');

exports.promiseSpawn = (allCmd, spawnOpts) => {
  const [cmd, ...opts] = allCmd.split(' ');
  const cp = spawn(cmd, opts, {
    stdio: 'inherit',
    ...spawnOpts,
  });
  return new Promise((resolve, reject) => {
    cp.on('error', reject);
    cp.on('exit', resolve);
  });
}
