import React, { useState } from "react";
import Row from "./Row.js";

const NodeBody = (props) => {
  return (
    <div className="node-body-container">
      <div className="rows-container">
        {props.genotype[props.page].map((alleleRow) => {
          return <Row color={props.color} row={alleleRow}></Row>;
        })}
      </div>
      {/* <div className="node-info-container">
        {props.node.shared_alleles ? (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label>Shared</label>
            <span style={{ paddingLeft: "5px", color: props.color }}>
              {props.node.shared_alleles}
            </span>
          </div>
        ) : null}
      </div> */}
    </div>
  );
};

export default NodeBody;
