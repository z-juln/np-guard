# np-guard
npm publish命令拦截器

## 安装

`npm i -g np-guard` or `npm i np-guard -D`

## 在 `package.json` 中配置

```json
{
  "script": {
    "prepublishOnly": "npg"
  }
}
```

这时候运行 `npm publish`, 请求就会被拦截

## npg命令参数

例如 `npg --cmd 'npm run release' --color `, terminal会输出以下信息:

```
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
!! `npm publish` is forbidden for this package. !!
!! Use `npm run release` instead.               !!
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
```

options:

- `version` (alias: `v`)
- `help` (alias: `h`)
- `silent` (alias: `s`): 是否输出提示信息, 默认为非静默模式, 即输出
- `msg` (alias: `m`): 自定义要输出的信息, 默认为npg自带的提示信息
- `cmd` (alias `C`): 如果使用npg自带的提示信息, cmd则是一个信息插槽
- `color` (alias `c`): 输出的文字颜色, 默认为`white`, 可选值可以通过`help`参数查看
- `bg` (alias `b`): 输出的文字背景色, 默认为`red`, 可选值可以通过`help`参数查看
- `skip-npg` (alias `S`): 跳过`npg拦截`, 用于真实的 `npm publish` 运行阶段

`color` 和 `bg` 的可选值:

- `color`` 可选值有: black, red, green, yellow, blue, magenta, cyan, white, gray, grey
- `bg`` 可选值有: black, red, green, yellow, blue, magenta, cyan, white

## 温馨提示

### 最佳搭档 —— [`np`](https://www.npmjs.com/package/np)

在package.json中配置, 下面这种的目的是: 提示引导

```json
{
  "script": {
    "prepublishOnly": "npg --cmd 'npm run release'",
    "release": "npx cross-env SKIP_NPG=1 np --no-yarn --yolo --branch release"
  }
}
```

这里必须设置环境变量 `SKIP_NPG=1`, 因为 `np` 底层调用的还是 `npm publish`, 会导致与 `prepublishOnly` 钩子循环调用造成卡死

<!--
下面这种的目的是覆盖默认的 `npm publish` 行为 (尚不能正常工作, 至今未想到合适的解决方案, `不推荐使用!!!`)

```json
{
  "script": {
    "prepublishOnly": "npm run release && npg -s",
    "release": "np --no-yarn --no-tests --no-cleanup --branch release"
  }
}
```
-->

### 报错 `exit 1`

在 `npm publish` 后, terminal中会有这样的报错, 这属于无法避免的正常情况

```sh
npm ERR! code 1
npm ERR! path /Volumes/dev/np-guard
npm ERR! command failed
npm ERR! command sh -c exit 1

npm ERR! A complete log of this run can be found in:
npm ERR!     /Users/zhuangjunlin/.npm/_logs/2022-07-01T17_18_43_293Z-debug-0.log
```

原因: `npm publish拦截` 的实现是通过 `exit 1` 的方式, 这属于 `npm publish` 执行的报错，并不影响 `prepublishOnly` 的执行
