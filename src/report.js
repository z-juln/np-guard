const changeCase = require('@juln/change-case');
const kleur = require('kleur');

function report({
  msg,
  cmd,
  color = 'white',
  bg = 'red',
  paddingLeft = '',
}) {
  const bgFnName = 'bg' + changeCase(bg, 'upper-camel-case');
  if (!Object.hasOwnProperty.call(kleur, bgFnName)) {
    throwErr(`参数bg无效(bg: ${bg})`);
  }
  if (!Object.hasOwnProperty.call(kleur, color)) {
    throwErr(`参数color无效(color: ${color})`);
  }

  const log = value => console.log(paddingLeft + kleur[bgFnName](kleur[color](value)));
  if (!msg) {
    log('');
    log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    log('!! `npm publish` is forbidden for this package. !!');
    if (cmd) {
      const restSpace = Array(30 - cmd.length).fill(' ').join('');
      log(`!! Use \`${cmd}\` instead.${restSpace}!!`);
    }
    log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    log('');
  } else {
    log(msg);
  }
}

module.exports = report;

/** @return {never} */
function throwErr(msg) {
  throw new Error(kleur.red(`npg error: `) + msg);
}
