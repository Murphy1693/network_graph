import React from "react";

const PanelInfo = (props) => {
  return (
    <div className="panel-info">
      <div className="genotype-display">
        {props.display ? "Latent" : "Observed"}
      </div>
      <div>{props.page}</div>
    </div>
  );
};

export default PanelInfo;
