import React from "react";
import Node from "./Node/Node.js"

const Panel = (props) => {
    return <div className="app-panel">
        <div>
        {props.nodes?.primary ? <Node node={props.nodes.primary}></Node> : null}
        </div>
        <div>
            {props.nodes?.secondaries ? null : null}
        </div>
    </div>
}

export default Panel