import Path from '../Path';

export default class AStar extends Path {
  find(start, goal) {
    const
      CLOSED = true,
      VISITED = true,
      metric = this.metric,
      neighbours = this.neighbours,
      startId = toString(start),
      goalId = toString(goal),
      closed = {},
      visited = {},
      parent = {},
      g = {},
      f = {},
      opened = [start];

    g[startId] = 0;
    f[startId] = metric(start, goal);

    while(opened.length) {
      const
        current = opened.pop(),
        currentId = toString(current);

      if (currentId === goalId) {
        return build(goal, parent, []);
      }

      closed[currentId] = CLOSED;

      const list = neighbours(current);

      for (let i = 0, n = list.length; i < n; i++) {
        const
          next = list[i],
          nextId = toString(next);

        if (closed[nextId] === CLOSED) {
          continue;
        }

        const nextG = g[currentId] + metric(current, next);
        let nextF = 0;

        if (visited[nextId] !== VISITED) {
          nextF = nextG + metric(next, goal);
          visited[nextId] = VISITED;

          push(next, nextF, opened, f);
        } else if (nextG >= g[nextId]) {
          continue;
        }

        parent[nextId] = current;
        g[nextId] = nextG;
        f[nextId] = nextF;
      }
    }

    return [];
  }
}

function push(next, nextF, opened, f) {
  let i = 0;

  for (let n = opened.length; i < n; i++) {
    const point = opened[i];

    if (f[toString(point)] <= nextF)
      break;
  }

  opened.splice(i, 0, next);
}

function toString(position) {
  return position + '';
}

function build(position, parent, path) {
  const next = parent[toString(position)];

  if (next !== undefined) {
    path = build(next, parent, path);
  }

  path.push(position);

  return path;
}