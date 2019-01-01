/* eslint-disable no-param-reassign */
module.exports = (config, env) => {
  config.removeLoader('md')
  config.removeLoader('json')
  config.merge({
    // devtool: false,
    // debug: false,
  })
  config.loader('meta', cfg => {
    cfg.test = /\.meta$/
    cfg.loader = 'null'
    return cfg
  })
  config.loader('mp4', cfg => {
    cfg.test = /\.mp4$/
    cfg.loader = 'null'
    return cfg
  })
  config.loader('webm', cfg => {
    cfg.test = /\.webm$/
    cfg.loader = 'null'
    return cfg
  })
  // ignore python files
  config.loader('ignore', cfg => {
    cfg.test = /\.(py|idml|sh)$/
    cfg.loader = 'null'
    return cfg
  })
  config.loader('json', cfg => {
    cfg.test = /\.json$/
    cfg.loader = 'null'
    return cfg
  })
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
  return config
}
