import * as d3 from "d3";

class Graph {
  constructor(container, props) {
    this.context = container.getContext("2d");
    this.props = props;
    this.mousedown = false;
    this.nodeSize = 5;
    this.simulation = null;
    this.updateData();
    d3.select(container)
      .on("mousedown", this.handleMouseDown)
      .on("mousemove", this.handleMouseMove)
      .on("mouseup", this.handleMouseUp)
      .on("contextmenu", this.handleRightClick);
    console.log(props.width, props.height);
    console.log(this.props.nodes);
    console.log(this.props.links)
  }

  handleMouseDown = (e) => {
    // console.log(e.x, e.y - this.props.appHeight);
    this.mousedown = true;
    e.subject = this.simulation.find(
      e.pageX,
      e.pageY - this.props.appHeight,
      this.nodeSize * 1.5
    );
    if (e.subject) {
      this.handleClick(e);
    }
  };

  handleMouseUp = (e) => {
    this.mousedown = false;
  };

  handleMouseMove = (e) => {
    if (this.mousedown) {
      this.cursor_x = e.pageX;
      this.cursor_y = e.pageY - this.props.appHeight;
      // console.log(this.cursor_x, this.cursor_y);
    } else {
      this.cursor_x = null;
      this.cursor_y = null;
    }
  };

  handleClick = (e) => {
    let x = setInterval(() => {
      this.simulation.alphaTarget(0.05).restart();
      if (this.mousedown) {
        if (this.cursor_x !== null && this.cursor_y !== null) {
          e.subject.fx = this.cursor_x;
          e.subject.fy = this.cursor_y;
        }
      } else {
        clearInterval(x);
      }
    }, 10);
  };

  handleRightClick = (e) => {
    e.preventDefault();
    let selectedNode = this.simulation.find(
      e.pageX,
      e.pageY - this.props.appHeight,
      this.nodeSize * 1.5
    );
    console.log(selectedNode);
    if (selectedNode) {
      // this.links.forEach(function (link) {
      //   if (link.source === selectedNode || link.target === selectedNode) {
      //     link.source.fx = null;
      //     link.source.fy = null;
      //     link.target.fx = null;
      //     link.target.fy = null;
      //   }
      // });
      selectedNode.fx = null;
      selectedNode.fy = null;
    }
  };

  ticked = () => {
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
    this.context.arc(d.x, d.y, this.props.nodeSize=4, 0, 2 * Math.PI);
  };

  updateData = () => {
    const forceNode = d3.forceManyBody().strength(() => {
      return -15 * Math.max(1, this.nodeSize / 5);
    });
    const forceLink = d3
      .forceLink(this.props.links)
      .strength((d) => {
        return 1;
      })
      .distance(this.props.linkDistance=30)
    this.simulation = d3
      .forceSimulation(this.props.nodes)
      .force(
        "x",
        d3
          .forceX()
          .x((d) => {
            if (d.hasLink) {
              return this.props.width / 4;
            } else {
              return (this.props.width * 3) / 4;
            }
          })
          .strength(() => {
            return .1
          })
      )
      .force("links", forceLink)
      .force("y", d3.forceY(this.props.height / 2))
      .force("collide", d3.forceCollide((this.props.collideForce = 15)))
      .on("tick", this.ticked);
  };
}

export default Graph;
