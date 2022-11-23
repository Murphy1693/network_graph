import React from "react";

const AlleleBox = ({ boxSize = "6", borderColor = "black", color, value }) => {
  let style = {
    boxSizing: "border-box",
    width: `${boxSize}px`,
    aspectRatio: "1/1",
    border: `1px solid ${
      value === "1"
        ? "red"
        : value === "2"
        ? color
        : value === "3"
        ? "red"
        : "black"
    }`,
    backgroundColor:
      value === "0"
        ? "white"
        : value === "1"
        ? "red"
        : value === "2"
        ? color
        : "white",
    marginLeft: "2px",
  };

  return <div style={style} className="allele-box"></div>;
};

export default AlleleBox;
