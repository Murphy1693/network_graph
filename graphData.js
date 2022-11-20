export default class GraphData {
  constructor() {
    this._nodes = {};
    this._links = [];
  }

  addNode = (node) => {
    this._nodes[node.id] = this._nodes[node.id] || { ...node, links: {} };
  };

  addLink = (fromNode, toNode) => {
    this._nodes[fromNode].hasLink = true;
    this._nodes[fromNode].links[toNode] = {
      id: toNode,
      target: true,
    };
    this._nodes[toNode].hasLink = true;
    this._nodes[toNode].links[fromNode] = {
      id: fromNode,
      target: false,
    };
    this._links.push({
      source: this._nodes[fromNode],
      target: this._nodes[toNode],
    });
  };
}

export const compareNodes