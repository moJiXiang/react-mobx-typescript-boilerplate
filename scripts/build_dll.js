const webpack = require('webpack')
const rimraf = require('rimraf')
const config = require('../config/webpack.config.dll');
const path = require('path')
const paths = require('../config/paths')
const chalk = require('chalk')

rimraf(path.resolve(paths.appPublic, 'dll'), (err) => {
  if (err) {
    console.log(chalk.red('删除dll文件失败，请手动删除 \n'))
    return
  }
  webpack(config).run((err, stats) => {
    if (err || stats.hasErrors()) {
      console.log(chalk.red('dll 文件编译失败！ \n'))
    } else {
      console.log(chalk.green('dll文件编译成功！ \n'))
    }
  })
})
