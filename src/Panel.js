import React, { useState } from "react";
import Node from "./Node/Node.js";
import PanelInfo from "./PanelInfo.js";

const Panel = (props) => {
  const [page, setPage] = useState(0);
  const [latent, setLatent] = useState(false);
  return (
    <div className="app-panel">
      <PanelInfo setLatent={setLatent} setPage={setPage} latent={latent} page={page}></PanelInfo>
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
            shared={latent ? props.nodes.primary.latent_shared_alleles : props.nodes.primary.shared_alleles}
            total={latent ? props.nodes.primary.latent_alleles_count : props.nodes.primary.alleles_count}
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
        //   paddingTop: "2rem",
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {props.nodes?.secondaries
          ? props.nodes.secondaries.map((node, i) => {
              return (
                <Node
                  key={node.id}
                  shared={latent ? node.latent_shared_alleles : node.shared_alleles}
                  total={latent ? node.latent_alleles_count : node.alleles_count}
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
