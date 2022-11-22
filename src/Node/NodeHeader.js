import React from "react";

const NodeHeader = (props) => {
  return (
    <div className="node-header">
      {props.id}
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
