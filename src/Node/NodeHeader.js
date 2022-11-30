import React from "react";

const NodeHeader = (props) => {
  return (
    <div className="node-header">
      <span style={{color: props.color, fontWeight: "bold"}}>{props.id}</span>
      <div
        className="close"
        onClick={() => {
          props.removeNode(props.id);
        }}
      ></div>
    </div>
  );
};

export default NodeHeader;
