import React from "react";
import NodeHeader from "./NodeHeader.js"
import NodeBody  from "./NodeBody.js";

const Node = (props) => {
    return <div className="node">
        <NodeHeader id={props.node.id}></NodeHeader>
        <NodeBody genotype={props.node.display_observed_genotype}></NodeBody>
    </div>
}

export default Node;