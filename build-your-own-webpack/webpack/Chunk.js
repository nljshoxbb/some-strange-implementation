class Chunk {
  constructor(module) {
    this.name = module.name;
    this.file = [];
    this.modules = [];
    if (module.isAsyncChunk) {
      this.asyncModule = module;
    } else {
      this.entryMoule = module;
    }
  }
}
