import * as d3 from "d3";

class Graph {
  constructor(container, props) {
    this.context = container.getContext("2d");
    this.props = props;
    this.updateData();
    console.log(props.width, props.height);
    console.log(this.props.nodes);
  }

  ticked = () => {
    console.log("hi");
    this.context.clearRect(0, 0, this.props.width, this.props.height);
    this.context.save();
    this.props.nodes?.forEach((node) => {
      this.context.beginPath();
      this.drawNode(node);
      this.context.fillStyle = "black";
      this.context.strokeStyle = "red";
      this.context.strokeWidth = 1;
      this.context.fill();
    });
    this.context.restore();
  };

  drawNode = (d) => {
    this.context.moveTo(d.x, d.y);
    this.context.arc(d.x, d.y, 4, 0, 2 * Math.PI);
  };

  updateData = () => {
    d3.forceSimulation(this.props.nodes)
      .force(
        "center",
        d3.forceCenter(this.props.width / 4, this.props.height / 2)
      )
      .on("tick", this.ticked);
  };
}

export default Graph;
