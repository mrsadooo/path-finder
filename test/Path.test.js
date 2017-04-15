import Path from '../src/Path';

describe('Path', function() {
  describe('#constructor()', function() {
    it('should set metric property', function() {
      const position = new Path({ metric: 1 });

      expect(position.metric).to.equal(1);
    });
  });

  describe('#find()', function() {
    it('should throw an error when it is not implemented', done => {
      new Path({}).find().catch(e => {
        expect(e.message).to.eql('Path#find(Path.Position start, Path.Position goal) is not implemented.');
        done();
      });
    });
  });
});