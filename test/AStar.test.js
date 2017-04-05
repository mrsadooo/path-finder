import AStar from '../src/path/AStar';
import Path from '../src/Path';

function metric(a, b) {
  return Math.sqrt(Math.pow(a[0] - b[0]) + Math.pow(a[1] - b[1]));
}

describe('AStar', () => {
  it('should extend Path', () => {
    const a = new AStar({});

    expect(a instanceof Path).to.equal(true);
  });

  describe('#find', () => {
    it('should return path with single start point for same start and goal', () => {
      const
        a = [0,0],
        b = [0,0],
        path = new AStar({ metric });

      expect(path.find(a, b)).to.eql([a]);
    });
  });
});