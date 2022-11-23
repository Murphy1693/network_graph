import React from "react";

const PanelInfo = (props) => {
  return (
    <div className="panel-info">
      <div className="genotype-display">
        {props.display ? "Latent" : "Observed"}
      </div>
      <div className="panel-page-info">
        <div>Page: {props.page}</div>
        <div
          style={{
            display: "flex",
            // justifyContent: "space-between",
            paddingTop: ".5rem",
          }}
        >
          <div
            onClick={() => {
              if (props.page !== 0) {
                props.setPage(props.page - 1);
              }
            }}
            className="minus-button minus-button--small"
          ></div>
          <div
            onClick={() => {
              if (props.page !== 4) {
                props.setPage(props.page + 1);
              }
            }}
            className="plus-button plus-button--small"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default PanelInfo;
