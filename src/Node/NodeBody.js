import React, { useState } from "react";
import Row from "./Row.js";

const NodeBody = (props) => {
  return (
    <div>
      <div className="rows-container">
        {props.genotype[props.page].map((alleleRow) => {
          return <Row color={props.color} row={alleleRow}></Row>;
        })}
      </div>
    </div>
  );
};

export default NodeBody;
