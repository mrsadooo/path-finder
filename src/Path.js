export default class Path {
  constructor({ metric, neighbours }) {
    this.metric = metric;
    this.neighbours = neighbours;
  }

  async find(start, goal) {
    throw new ReferenceError(`${this.constructor.name}#find(Path.Position start, Path.Position goal) is not implemented.`);
  }
}