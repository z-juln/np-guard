const tsmlb = require('tsmlb');
const kleur = require('kleur');
const report = require('./report');

const colors = [
  'black',
  'red',
  'green',
  'yellow',
  'blue',
  'magenta',
  'cyan',
  'white',
  'gray',
  'grey',
];

const bgs = [
  'black',
  'red',
  'green',
  'yellow',
  'blue',
  'magenta',
  'cyan',
  'white',
];

const logHelp = () => {
  const log = (str) => console.log(
    str.replace(/`(.*?)`/g, kleur.yellow('$1'))
  );

  log('');
  log(
  `  例如 \`npg --cmd 'npm run release' --color\`, terminal会输出以下信息:`,
  );
  report({paddingLeft: '  '});
  log(
`  \`options\`:
  - \`version\` (alias: \`v\`)
  - \`help\` (alias: \`h\`)
  - \`silent\` (alias: \`s\`): 是否输出提示信息, 默认为非静默模式, 即输出
  - \`msg\` (alias: \`m\`): 自定义要输出的信息, 默认为npg自带的提示信息
  - \`cmd\` (alias: \`C\`): 如果使用npg自带的提示信息, cmd则是一个信息插槽
  - \`color\` (alias: \`c\`): 输出的文字颜色, 默认为\`white\`
  - \`bg\` (alias: \`b\`): 输出的文字背景色, 默认为\`red\`
  - \`skip-npg\` (alias \`S\`): 跳过npg拦截, 用于真实的 npm publish 运行阶段
  `);
  log(
  `  \`color 可选值有\`: ${colors.join(', ')}`
  );
  log(
  `  \`bg 可选值有\`: ${bgs.join(', ')}`
  );
  log(`
  \`env\`:
  - \`SKIP_NPG=1\`: 与 \`skip-npg\` 作用相同
  `);
  log(
  `  更新信息请看文档 \`https://www.npmjs.com/package/np-guard\` `
  );
  log('');
};

module.exports = logHelp;
