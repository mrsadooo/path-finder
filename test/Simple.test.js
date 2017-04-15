import { AStar } from '../src';
import samples from './samples';

function mapMetric(map) {
  return function(a, b) {
   return metric(a, b) * cost(b, map);
  }
}

function cost(point, map) {
  const
    x = point[0],
    y = point[1];

  return map[y] && map[y][x] || Infinity;
}

function metric(a, b) {
  return Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2));
}

function neighbours(point) {
  return [
    [-1,-1],[-1, 0],[-1, 1],
    [ 0,-1],        [ 0, 1],
    [ 1,-1],[ 1, 0],[ 1, 1]
  ].map(v => [point[0] + v[0], point[1] + v[1]]);
}

function draw(path, map) {
  return map.map((row, y) =>
    `|` + row
      .map((cost, x) =>
        contains([x, y], path) ? `x` : cost
      )
      .join(``) + `|`
  ).join(`\n`);
}

function contains(point, path) {
  return path.some(v => point[0] === v[0] && point[1] === v[1]);
}

describe('AStar', () => {
  describe('#find', () => {
    it('returns valid path for no obstacles', done => {
      new AStar({ metric, neighbours }).find([0,0], [5,5]).then(path => {
        expect(path).to.eql([ [0,0], [1,1], [2,2], [3,3], [4,4], [5,5] ]);
        done();
      });
    });

    samples.forEach((sample, index) => {
      const result = draw(sample.path, sample.map);

      it(`returns valid path for sample no: ${index}`, done => {
        const metric = mapMetric(sample.map);
        new AStar({ metric, neighbours }).find(sample.from, sample.to).then(path => {
          expect(draw(path, sample.map)).to.eql(result);
          done();
        });
      })
    })
  });
});