module.exports = api => {
  return {
    presets: [['@babel/env', {modules: api.env('test') ? 'commonjs' : false}]]
  }
}
