// https://www.codewars.com/kata/64a815e3e96dec077e305750

class UnionFind {
    constructor(n) {
      this.parent = new Array(n).fill(-1);
    }
  
    find(x) {
      if (this.parent[x] === -1) {
        return x;
      }
      this.parent[x] = this.find(this.parent[x]);
      return this.parent[x];
    }
  
    union(x, y) {
      const rootX = this.find(x);
      const rootY = this.find(y);
      if (rootX !== rootY) {
        this.parent[rootX] = rootY;
      }
    }
  }
  
  function bridge(islands) {
    const n = islands.length;
    const edges = [];
  
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        const distance = Math.sqrt(
          Math.pow(islands[i][0] - islands[j][0], 2) +
          Math.pow(islands[i][1] - islands[j][1], 2)
        );
        edges.push([i, j, distance]);
      }
    }
  
    edges.sort((a, b) => a[2] - b[2]);
  
    const uf = new UnionFind(n);
  
    let totalLength = 0;
    let numEdges = 0;
    for (let i = 0; i < edges.length; i++) {
      const [u, v, distance] = edges[i];
      const parentU = uf.find(u);
      const parentV = uf.find(v);
  
      if (parentU !== parentV) {
        uf.union(parentU, parentV);
        totalLength += distance;
        numEdges++;
  
        if (numEdges === n - 1) break;
      }
    }
  
    return totalLength;
  }

console.log(bridge([[0, 0], [1, 0], [1, 1]]));