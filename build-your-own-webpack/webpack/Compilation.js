const path = require("path");
const ejs = require("ejs");
const fs = require("fs");
const { SyncHook, AsyncParallelHook, AsyncSeriesHook } = require("tapable");
const Chunk = require("./Chunk");
let normalModuleFactory = require("./NormalModuleFactory");

// webpack 最终打包生成代码套用的模板
// 同步加载的模块模板
const mainTemplate = fs.readFileSync(
  path.posix.join(__dirname, "template", "main.ejs"),
  "utf8"
);
// 异步加载的模块模板
const chunkTemplate = fs.readFileSync(
  path.posix.join(__dirname, "template", "chunk.ejs"),
  "utf8"
);
const mainRender = ejs.compile(mainTemplate);
const chunkRender = ejs.compile(chunkTemplate);
