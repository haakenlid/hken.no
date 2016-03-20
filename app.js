const getContext = () => require.context('./pages', true)

exports.loadContext = (callback) => {
  const context = getContext()
  if (module.hot) {
    module.hot.accept(context.id, () => callback(getContext()))
  }
  return callback(context)
}
