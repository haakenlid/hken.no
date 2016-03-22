/* eslint-disable no-param-reassign */
module.exports = (config, env) => {
  config.loader('meta', cfg => {
    cfg.test = /\.meta$/
    cfg.loader = 'null'
    return cfg
  })
  config.removeLoader('md')
  config.loader('md', cfg => {
    cfg.test = /\.md$/
    cfg.loader = '../loaders/meta-loader'
    return cfg
  })
  config.loader('ipynb', cfg => {
    cfg.test = /\.ipynb$/
    cfg.loader = '../loaders/ipynb-loader'
    return cfg
  })
  config.merge({resolve: { extensions: ['ipynb']}})
  return config
}
