import React, { useState, useEffect, useRef } from "react";
import Graph from "./GraphSim.js";
import * as d3 from "d3";

let vis;

const App = () => {
  const container = useRef(null);
  const canvasRef = useRef(null);
  const [width, setWidth] = useState(0);
  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    console.log(container.current.getBoundingClientRect());
    setWidth(container.current.getBoundingClientRect().width);
    d3.json("./data/full_nodes.json").then((data) => {
      console.log(data);
      setNodes(data.nodes);
    });
  }, []);

  useEffect(() => {
    initVis();
  }, [width, nodes]);

  let initVis = () => {
    if (width) {
      vis = new Graph(canvasRef.current, {
        width: width,
        nodes: nodes,
        height: 500,
      });
    }
  };

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
      <canvas ref={canvasRef} height="500" width={width}></canvas>
    </div>
  );
};

export default App;
