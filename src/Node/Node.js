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
    <div style={nodeStyle} className="node">
        {/* <div style={{backgroundColor: makeRGBA(props.color, 0.15)}}> */}
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
    {/* </div> */}
    </div>
  );
};

export default Node;
