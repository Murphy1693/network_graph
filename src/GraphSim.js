import * as d3 from "d3";
import { lineX1, lineX2, lineY1, lineY2 } from "../graphFunctions.js";

class Graph {
  constructor(container, props) {
    this.context = container.getContext("2d");
    this.props = props;
    this.mousedown = false;
    this.nodeSize = 5;
    this.simulation = null;
    this.arrowFill = 4;
    this.updateData();
    d3.select(container)
      .on("mousedown", this.handleMouseDown)
      .on("mousemove", this.handleMouseMove)
      .on("mouseup", this.handleMouseUp)
      .on("contextmenu", this.handleRightClick);
    console.log(this.props.nodes);
  }

  handleMouseDown = (e) => {
    this.mousedown = true;
    e.subject = this.simulation.find(
      e.pageX - 20,
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
      this.cursor_x = e.pageX - 20;
      this.cursor_y = e.pageY - this.props.appHeight;
    } else {
      this.cursor_x = null;
      this.cursor_y = null;
    }
  };

  handleClick = (e) => {
    if (e.button === 0) {
      if (e.altKey || e.shiftKey) {
        this.props.handleNodeClick(e.subject, e);
      } else {
        let x = setInterval(() => {
          console.log("mouse is down");
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
      }
    }
  };

  handleRightClick = (e) => {
    e.preventDefault();
    let selectedNode = this.simulation.find(
      e.pageX - 20,
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
      this.simulation.alphaTarget(0.05).restart();
      selectedNode.fx = null;
      selectedNode.fy = null;
    }
  };

  ticked = () => {
    this.context.clearRect(0, 0, this.props.width, this.props.height);
    this.context.save();
    this.props.links.forEach((link) => {
      this.drawArrow(link);
    });
    this.context.restore();
    this.context.save();
    this.props.nodes.forEach((node) => {
      if ((this.props.fontEnabled = true)) {
        this.context.fillStyle = "black";
        this.context.font = "8px Arial";
        this.context.fillText(node.id, node.x, node.y + 15);
      }
      this.context.beginPath();
      this.drawNode(node);
      this.context.fillStyle =
        this.props.active === node.id
          ? "red"
          : this.props.selectedNodes.includes(node.id)
          ? this.props.colors[this.props.selectedNodes.indexOf(node.id)]
          : this.props.nodeColor || "black";
      // this.context.strokeStyle = "red";
      // this.context.strokeWidth = 1;
      this.context.fill();
    });
    this.context.restore();
  };

  drawNode = (d) => {
    this.context.moveTo(d.x, d.y);
    this.context.arc(d.x, d.y, (this.props.nodeSize = 4), 0, 2 * Math.PI);
  };

  drawArrow = (link) => {
    let endX = lineX2(link, this.nodeSize, this.arrowFill);
    let startX = lineX1(link, this.nodeSize, this.arrowFill);
    let endY = lineY2(link, this.nodeSize, this.arrowFill);
    let startY = lineY1(link, this.nodeSize, this.arrowFill);
    this.context.save();
    const headlen = 2;
    const angle = Math.atan2(endY - startY, endX - startX);

    // starting path of the arrow from the start square to the end square and drawing the stroke
    this.context.beginPath();
    this.context.moveTo(Math.floor(endX), Math.floor(endY));
    this.context.lineTo(Math.floor(startX), Math.floor(startY));
    this.context.strokeStyle = "black";
    this.context.globalAlpha = 1;
    this.context.lineWidth = 1;
    this.context.stroke();

    //starting a new path from the head of the arrow to one of the sides of the point
    const arrowLen1 = headlen * Math.cos(angle - Math.PI / 7);
    const arrowLen2 = headlen * Math.sin(angle - Math.PI / 7);

    this.context.beginPath();
    this.context.moveTo(endX, endY);
    this.context.lineTo(endX - arrowLen1, endY - arrowLen2);

    // path from the side point of the arrow, to the other side point
    this.context.lineTo(
      endX - headlen * Math.cos(angle + Math.PI / 7),
      endY - headlen * Math.sin(angle + Math.PI / 7)
    );

    // // path from the side point back to the tip of the arrow, and then again to the opposite side point
    this.context.globalAlpha = 1;
    this.context.lineTo(endX, endY);
    this.context.lineTo(endX - arrowLen1, endY - arrowLen2);

    // draws the paths created above
    // this.context.strokeStyle = color;
    this.context.lineWidth = this.arrowFill;
    this.context.stroke();
    this.context.fillStyle = "black";
    this.context.fill();
    this.context.restore();
  };

  updateData = () => {
    const forceNode = d3
      .forceManyBody()
      .strength(() => {
        return -15 * Math.max(1, this.nodeSize / 5);
      })
      .theta(0.99);

    const forceX = d3
      .forceX()
      .x((d) => {
        if (d.hasLink) {
          return this.props.width / 4;
        } else {
          return (this.props.width * 3) / 4;
        }
      })
      .strength(0.05);

    const forceY = d3.forceY(this.props.height / 2).strength(0.05);
    const forceCollide = d3.forceCollide((this.props.collideForce = 15));

    const forceLink = d3
      .forceLink(this.props.links)
      .strength((d) => {
        return 1;
      })
      .distance((this.props.linkDistance = 30));

    this.simulation = d3
      .forceSimulation(this.props.nodes)
      .force("collide", forceCollide)
      .force("x", forceX)
      .force("link", forceLink)
      .force("charge", forceNode)
      .force("y", forceY)
      .on("tick", this.ticked);
    this.props.simulationRef.current = this.simulation;
  };
}

export default Graph;
