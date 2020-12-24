const fs = require("fs");
const path = require("path");
const ejs = require("ejs");
const parser = require("@babel/parser");
const types = require("@babel/types");
const generator = require("@babel/generator");
const traverse = require("@babel/traverse");

class NormalModule {
  constructor({ name, context, request }) {
    // chunk name
    this.name = name;
    this.context = context;
    // 相当于当前模块的绝对路径
    this.request = request;
    // 依赖的模块数组
    this.dependencies = [];
    // 模块ID
    this.moduleId = "";
    // 当前依赖模块的抽象语法树
    this._ast = null;
    // 源码
    this._source = null;
  }


  getSource(request,compilation){
      // 读取『当前模块』的内容
    //   let source = compliation.input
  }
  
  
}
