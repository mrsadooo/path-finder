# Path finder

Basic path finder module to perform path search.

Currently supports only A* algorithm.

## Basic usage

The api is promise-based, so to perform a search you need to 
either wrap the result in ```.then | .catch``` or
use ```async | await``` syntax.


```javascript
import { AStar } from 'path-finder';

// We need something to measure the distance between 2 points
function metric(a, b) {
  // Pythagoras would be proud
  return Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2));
}

// And we need something to tell us, where to go next
function neighbours(point) {
  return [
    [-1,-1],[-1, 0],[-1, 1],
    [ 0,-1],        [ 0, 1],
    [ 1,-1],[ 1, 0],[ 1, 1]
  ].map(v => [point[0] + v[0], point[1] + v[1]]);
}

// So we can now wrap it up
const path = new AStar({ metric, neighbours });

// And do the search!
path.find([0,0], [5,5]).then(result => console.log(result));

// alternatively
const result = await path.find([0,0], [5,5]);
```

No obstacles there, so as a result you should get 
```[[0,0], [1,1], [2,2], [3,3], [4,4], [5,5]]```

## Uniqness of every point

The key thing about checking whether position was 
already evaluated (visited) is to cast it to string. 
So, casting ```[0,0]``` to string will give us ```"0,0"``` 
and internally algorithm is looking for this value on the 
list of already visited fields.
  
You can implement your own ```Point``` class and use it 
inside an algorithm instead of array points.

Example:
```javascript
class GMapsPoint {
  constructor(lan, lat) {
    this.lan = lan;
    this.lat = lat;
  }
  
  toString() {
    return this.lan + ';' + this.lat;
  }
}

path.find(
  new GMapsPoint(50.085922, 19.975505), 
  new GMapsPoint(50.085922, 19.975505)
).then(result => console.log(result));
```

Of course you need to prepare ```neighbours``` method, to 
let algorithm now where it should go from each point.