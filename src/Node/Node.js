import React from "react";
import NodeHeader from "./NodeHeader.js";
import NodeBody from "./NodeBody.js";

const makeRGBA = function (color, opacity = 0.2) {
  if (color === "red") {
    return `rgba(255, 0, 0, ${opacity})`;
  } else if (color === "blue") {
    return `rgba(0, 0, 255, ${opacity})`;
  } else if (color === "green") {
    return `rgba(0, 255, 0, ${opacity})`;
  } else if (color === "purple") {
    return `rgba(128, 0, 128, ${opacity})`;
  } else if (color === "orange") {
    return `rgba(255, 165, 0, ${opacity})`;
  }
};

const Node = (props) => {
  let nodeStyle = {
    // border: `1px solid ${props.color}`,
    boxShadow: "rgb(38 57 77) 10px 10px 15px -10px",
    display: "flex",
    flexDirection: "column",
    width: "fit-content",
    padding: "5px 10px 10px 10px",
    backgroundColor: makeRGBA(props.color, 0.15),
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={nodeStyle} className="node">
        {/* <div style={{backgroundColor: makeRGBA(props.color, 0.15)}}> */}
        <NodeHeader
          page={props.page}
          id={props.node.id}
          removeNode={props.removeNode}
        ></NodeHeader>
        <NodeBody
          page={props.page}
          color={props.color}
          genotype={
            props.latent
              ? props.node.latent_display_genotype
              : props.node.display_observed_genotype
          }
          node={props.node}
        ></NodeBody>
        {/* </div> */}
      </div>
      <div className="node-info">
        {props.node.shared_alleles ? (
          <div className="node-info-item">
            <label>Shared</label>
            <span style={{ marginLeft: "10px", color: "red" }}>
              {props.node.shared_alleles}
            </span>
          </div>
        ) : null}
        <div className="node-info-item">
          <label>Total</label>
          <span style={{ marginLeft: "10px", color: props.color }}>
            {props.node.alleles_count}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Node;
