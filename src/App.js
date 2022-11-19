import React, { useState, useEffect, useRef } from "react";
import Graph from "./GraphSim.js";
import GraphData from "../GraphData.js";
import * as d3 from "d3";

let vis;
let graphData = new GraphData();

const App = () => {
  const container = useRef(null);
  const canvasRef = useRef(null);
  const [width, setWidth] = useState(0);
  const [nodes, setNodes] = useState([]);
  const [appHeight, setAppHeight] = useState(0);
  const [links, setLinks] = useState([]);

  // useEffect(() => {
  //   console.log(container.current.getBoundingClientRect());
  //   setAppHeight(container.current.getBoundingClientRect().bottom);
  //   setWidth(container.current.getBoundingClientRect().width);
  //   d3.json("./data/full_nodes.json").then((data) => {
  //     console.log(data);
  //     setNodes(data.nodes);
  //     data.network.forEach((link) => {
  //       for (let i = 0; i < nodes.length; i++) {
  //         if (link.to === nodes[i].id) {

  //         }
  //       }
  //     })
  //   });
  // }, []);

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
      // setLinks(
      //   data.network.map((ele) => {
      //     for (let i = 0; i < data.nodes.length; i++) {
      //       if (data.nodes[i].id === ele.to) {
      //         ele.target = data.nodes[i];
      //         data.nodes[i].hasLink = true;
      //         if (ele.source) {
      //           break;
      //         }
      //       } else if (data.nodes[i].id === ele.from) {
      //         ele.source = data.nodes[i];
      //         data.nodes[i].hasLink = true;
      //         if (ele.target) {
      //           break;
      //         }
      //       }
      //     }
      //     return ele;
      //   })
      // );
      //   console.log(data);
      //   setNodes(data.nodes);
      setNodes(Object.values(graphData._nodes));
      setLinks(graphData._links);
    });
    window.graphData = graphData;
  }, []);

  useEffect(() => {
    initVis();
  }, [width, nodes]);

  let initVis = () => {
    if (width) {
      vis = new Graph(canvasRef.current, {
        width: width,
        nodes: [...nodes],
        height: 600,
        appHeight: appHeight,
        links: [...links],
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
      <canvas ref={canvasRef} height="600" width={width}></canvas>
    </div>
  );
};

export default App;
