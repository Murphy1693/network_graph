// drawArrow(d, color, opacity = 1, arrowFill) {
export var lineX1 = (d, nodeSize=5, arrowFill=2) => {
    var length = Math.sqrt(
    Math.pow(d.target.y - d.source.y, 2) +
        Math.pow(d.target.x - d.source.x, 2)
    );
    var scale = (length - nodeSize) / length;
    var offset = d.source.x - d.target.x - (d.source.x - d.target.x) * scale;
    return d.source.x - offset;
};
export var lineY1 = (d, nodeSize=5, arrowFill=2) => {
    var length = Math.sqrt(
    Math.pow(d.target.y - d.source.y, 2) +
        Math.pow(d.target.x - d.source.x, 2)
    );
    var scale = (length - nodeSize) / length;
    var offset = d.source.y - d.target.y - (d.source.y - d.target.y) * scale;
    return d.source.y - offset;
};

export var lineX2 = (d, nodeSize=5, arrowFill=2) => {
    var length = Math.sqrt(
    Math.pow(d.target.y - d.source.y, 2) +
        Math.pow(d.target.x - d.source.x, 2)
    );
    var scale = (length - nodeSize - arrowFill) / length;
    var offset = d.target.x - d.source.x - (d.target.x - d.source.x) * scale;
    return d.target.x - offset;
};
export var lineY2 = (d, nodeSize=5, arrowFill=2) => {
    var length = Math.sqrt(
    Math.pow(d.target.y - d.source.y, 2) +
        Math.pow(d.target.x - d.source.x, 2)
    );
    var scale = (length - nodeSize - arrowFill) / length;
    var offset = d.target.y - d.source.y - (d.target.y - d.source.y) * scale;
    return d.target.y - offset;
};
export var drawArrow = (link) => {

    let endX = lineX2(link, true);
    let startX = lineX1(link);
    let endY = lineY2(link);
    let startY = lineY1(link);
    this.context.save();
    const headlen = 2;
    const angle = Math.atan2(endY - startY, endX - startX);

    // starting path of the arrow from the start square to the end square and drawing the stroke
    this.context.beginPath();
    this.context.moveTo(Math.floor(endX), Math.floor(endY));
    this.context.lineTo(Math.floor(startX), Math.floor(startY));
    this.context.strokeStyle = color;
    this.context.globalAlpha = opacity;
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
    this.context.globalAlpha = opacity;
    this.context.lineTo(endX, endY);
    this.context.lineTo(endX - arrowLen1, endY - arrowLen2);

    // draws the paths created above
    // this.context.strokeStyle = color;
    this.context.lineWidth = arrowFill;
    this.context.stroke();
    this.context.fillStyle = color;
    this.context.fill();
    this.context.restore();
}