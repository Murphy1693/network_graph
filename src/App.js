import React, { useState, useEffect, useRef } from "react";
import Graph from "./GraphSim.js";
import GraphData, {compareNodes} from "../graphData.js";
import * as d3 from "d3";

let vis;
let graphData = new GraphData();
const colors = ["blue", "green", "purple", "orange"];

const App = () => {
  const container = useRef(null);
  const canvasRef = useRef(null);
  const simulationRef = useRef(null);
  const [width, setWidth] = useState(0);
  const [nodes, setNodes] = useState([]);
  const [appHeight, setAppHeight] = useState(0);
  const [links, setLinks] = useState([]);
  const [active, setActive] = useState(null);
  const [selectedNodes, setSelectedNodes] = useState([]);

  useEffect(() => {
    setAppHeight(container.current.getBoundingClientRect().bottom);
    setWidth(container.current.getBoundingClientRect().width);
    d3.json("/data/full_nodes.json").then((data) => {
      data.nodes.forEach((node) => {
        graphData.addNode(node);
      });
      data.network.forEach((link) => {
        graphData.addLink(link.from, link.to);
      });
      setNodes(Object.values(graphData._nodes));
      setLinks(graphData._links);
    });
    window.graphData = graphData;
  }, []);

  const handleNodeClick = (node, e) => {
    if (e.altKey) {
      handleActive(node.id);
    } else if (e.shiftKey) {
      handleSelected(node.id);
    }
  };

  const handleActive = (id) => {
    if (active === id) {
      setActive(null);
      return;
    }
    let copySelectedNodes = selectedNodes.slice();
    if (copySelectedNodes.includes(id)) {
      copySelectedNodes.splice(copySelectedNodes.indexOf(id), 1);
    }
    simulationRef.current.stop();
    setActive(id);
    setSelectedNodes(copySelectedNodes);
  };

  const handleSelected = (id) => {
    if (id === active) {
      return;
    }
    let copySelectedNodes = selectedNodes.slice();
    if (copySelectedNodes.includes(id)) {
      copySelectedNodes.splice(copySelectedNodes.indexOf(id), 1);
    } else {
      copySelectedNodes.push(id);
    }
    simulationRef.current.stop();
    setSelectedNodes(copySelectedNodes);
  };

  let initVis = () => {
    if (width) {
      vis = new Graph(canvasRef.current, {
        width: width,
        nodes: [...nodes],
        height: 600,
        appHeight: appHeight,
        links: [...links],
        active: active,
        selectedNodes: selectedNodes,
        handleNodeClick: handleNodeClick,
        simulationRef: simulationRef,
        colors: colors,
      });
    }
  };

  useEffect(() => {
    console.log(compareNodes(null, selectedNodes, graphData))
    initVis();
  }, [width, nodes, active, selectedNodes]);

  return (
    <div>
      <div ref={container} className="app-container">
        <div className="app-header">
          <div className="app-title">Network Graph</div>
          <div className="app-nav-bar">
            <div>Graph</div>
            <div>File</div>
            <div></div>
          </div>
        </div>
      </div>
      <canvas ref={canvasRef} height="600" width={width}></canvas>
      <div style={{ position: "fixed", bottom: 0 }}>
        {JSON.stringify(selectedNodes)}
      </div>
    </div>
  );
};

export default App;
