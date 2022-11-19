import React, { useState, useEffect, useRef } from "react";
import Graph from "./GraphSim.js";
import GraphData from "../GraphData.js";
import * as d3 from "d3";

let vis;
let graphData = new GraphData();

const App = () => {
  const container = useRef(null);
  const canvasRef = useRef(null);
  const simulationRef = useRef(null);
  const [width, setWidth] = useState(0);
  const [nodes, setNodes] = useState([]);
  const [appHeight, setAppHeight] = useState(0);
  const [links, setLinks] = useState([]);
  const [active, setActive] = useState(null);

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

  useEffect(() => {
    initVis();
  }, [width, nodes, active]);

  let handleNodeClick = (node, e) => {
    simulationRef.current.stop();
    if (e.ctrlKey) {
      if (active === node.id) {
        setActive(null);
      } else {
        setActive(node.id)
      }
    }
  }

  let initVis = () => {
    if (width) {
      vis = new Graph(canvasRef.current, {
        width: width,
        nodes: [...nodes],
        height: 600,
        appHeight: appHeight,
        links: [...links],
        active: active,
        handleNodeClick: handleNodeClick,
        simulationRef: simulationRef,
      });
    }
  };

  return (
    <div>
      <div ref={container} className="app-container">
        {active}
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
    </div>
  );
};

export default App;
