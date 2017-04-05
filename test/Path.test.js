import Path from '../src/Path';

describe('Path', function() {
  describe('#constructor()', function() {
    it('should set metric property', function() {
      const position = new Path({ metric: 1 });

      expect(position.metric).to.equal(1);
    });
  });

  describe('#find()', function() {
    it('should throw an error when it is not implemented', function() {
      const position = new Path({});

      (() => position.find()).should.throw('Path#find(Path.Position start, Path.Position goal) is not implemented.');
    });
  });
});