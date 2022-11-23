import React, { useState } from "react";
import Node from "./Node/Node.js";
import PanelInfo from "./PanelInfo.js";

const Panel = (props) => {
  const [page, setPage] = useState(0);
  const [latent, setLatent] = useState(false);
  return (
    <div className="app-panel">
      <PanelInfo setPage={setPage} latent={latent} page={page}></PanelInfo>
      {/* <div
        onClick={() => {
          if (page !== 4) {
            setPage(page + 1);
          }
        }}
      >
        Page: {page}
      </div>
      <div
        onClick={() => {
          setLatent(!latent);
        }}
      >
        {latent ? "latent genotype" : "observed genotype"}
      </div> */}
      <div>
        {props.nodes?.primary ? (
          <Node
            removeNode={props.removeNode}
            latent={latent}
            page={page}
            color={"red"}
            node={props.nodes.primary}
          ></Node>
        ) : null}
      </div>
      <div
        style={{
          paddingTop: "2rem",
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        {props.nodes?.secondaries
          ? props.nodes.secondaries.map((node, i) => {
              return (
                <Node
                  removeNode={props.removeNode}
                  latent={latent}
                  page={page}
                  color={props.colors[i]}
                  node={node}
                ></Node>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default Panel;
