import { AStar } from '../src';

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

describe('AStar', () => {
  describe('#find', () => {
    it('returns valid path for no obstacles', () => {
      const path = new AStar({ metric, neighbours }).find([0,0], [5,5]);

      expect(path).to.eql([ [0,0], [1,1], [2,2], [3,3], [4,4], [5,5] ]);
    });
  });
});