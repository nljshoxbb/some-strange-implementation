const fs = require("fs");

class NodeEnviromentPlugin {
  apply(compiler) {
    // 当你读取文件的时候使用哪个模块
    compiler.inputFileSystem = fs;
    compiler.outputFileSystem = fs;
  }
}

module.exports = NodeEnviromentPlugin;
