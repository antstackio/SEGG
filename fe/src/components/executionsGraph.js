import React from "react";
import ReactFlow, { isNode, Background } from "react-flow-renderer";
import dagre from "dagre";

// import "./layouting.css";

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 150;
const nodeHeight = 27;

const getLayoutedElements = (elements, direction = "TB") => {
  const isHorizontal = direction === "LR";
  dagreGraph.setGraph({ rankdir: direction });

  elements.forEach((el) => {
    if (isNode(el)) {
      dagreGraph.setNode(el.id, {
        width: nodeWidth,
        height: nodeHeight,
      });
    } else {
      dagreGraph.setEdge(el.source, el.target);
    }
  });

  dagre.layout(dagreGraph);

  return elements.map((el) => {
    if (isNode(el)) {
      const nodeWithPosition = dagreGraph.node(el.id);
      el.targetPosition = isHorizontal ? "left" : "top";
      el.sourcePosition = isHorizontal ? "right" : "bottom";

      // unfortunately we need this little hack to pass a slightly different position
      // to notify react flow about the change. Moreover we are shifting the dagre node position
      // (anchor=center center) to the top left so it matches the react flow node anchor point (top left).
      el.position = {
        x: nodeWithPosition.x - nodeWidth / 2 + Math.random() / 1000,
        y: nodeWithPosition.y - nodeHeight / 2,
      };
    }
    return el;
  });
};

const ExecutionsGraph = (props) => {
  getLayoutedElements(props.jsonGraphData);

  return (
    <ReactFlow elements={props.jsonGraphData} defaultZoom={1}>
      <Background variant="dots" gap={25} size={1} />
    </ReactFlow>
  );
};

export default ExecutionsGraph;
