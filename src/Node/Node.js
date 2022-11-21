import React from "react";
import NodeHeader from "./NodeHeader.js";
import NodeBody from "./NodeBody.js";

const Node = (props) => {
  let nodeStyle = {
    // border: `1px solid ${props.color}`,
    boxShadow: "rgb(38 57 77) 10px 10px 15px -10px",
    display: "flex",
    flexDirection: "column",
    width: "fit-content",
    padding: "5px 10px 10px 10px",
  };

  return (
    <div style={nodeStyle} className="node">
      <NodeHeader page={props.page} id={props.node.id}></NodeHeader>
      <NodeBody
        page={props.page}
        color={props.color}
        genotype={
          props.latent
            ? props.node.latent_display_genotype
            : props.node.display_observed_genotype
        }
      ></NodeBody>
    </div>
  );
};

export default Node;
