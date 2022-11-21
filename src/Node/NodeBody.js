import React, {useState} from "react";
import Row from "./Row.js"

const NodeBody = (props) => {
    const [page, setPage] = useState(0);
    return <div>
        <div className="rows-container">
            {props.genotype[page].map((alleleRow) => {
                return <Row row={alleleRow}></Row>
            })}
        </div>
    </div>
}

export default NodeBody;