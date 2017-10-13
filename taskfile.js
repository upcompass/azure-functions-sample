const config = require('./tsconfig.json')

export async function compile(task) {
  await task
    .source('src/**/*.ts')
    .typescript(config.compilerOptions)
    .target('dist')
}

export async function pack(task) {
  task
    .source('src')
    .shell(
      'funcpack pack -d ./dist'
    )
}

export async function copy(task) {
  await task.source('src/**/*.json').target('dist')
}

export async function build(task) {
  await task.serial(['clean', 'compile', 'copy', 'pack'])
}

export async function debug(task) {
  await task.serial(['clean', 'compile', 'copy'])
}

export async function clean(task) {
  await task.clear('dist')
}

export default async function(task) {
  await task.start('build')
}
