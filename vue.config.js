const MonacoEditorPlugin = require("monaco-editor-webpack-plugin");

module.exports = {
  lintOnSave: false,
  productionSourceMap: true,
  configureWebpack: {
    plugins: [
      new MonacoEditorPlugin({
        languages: ["javascript", "css", "html", "typescript", "json"]
      })
    ]
  }
};
