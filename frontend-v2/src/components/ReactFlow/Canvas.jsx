import React, { useCallback, useEffect } from "react";
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from "reactflow";
import { MarkerType } from "reactflow";

// import {
// nodes as initialNodes,
// edges as initialEdges,
// } from "./initial-elements";
import CustomNode from "./CustomNode";

import "reactflow/dist/style.css";
import "./overview.css";
import axios from "../../axios";

const nodeTypes = {
  custom: CustomNode,
};

const minimapStyle = {
  height: 120,
};

const onInit = (reactFlowInstance) =>
  console.log("flow loaded:", reactFlowInstance);

// const sampleParse = [
//   {
//     id: 1,
//     file_name: "dep.py",
//     file_path:
//       "https://raw.githubusercontent.com/the-amazing-team/sample-repo/main/dep.py",
//     function_name: "sum",
//     arguments: ["a", "b"],
//     code: "def sum(a, b):\n    return a + b",
//     functions_called: [],
//   },
//   {
//     id: 2,
//     file_name: "dep.py",
//     file_path:
//       "https://raw.githubusercontent.com/the-amazing-team/sample-repo/main/dep.py",
//     function_name: "sub",
//     arguments: ["a", "b"],
//     code: "def sub(a, b):\n    return a - b",
//     functions_called: [],
//   },
//   {
//     id: 3,
//     file_name: "dep.py",
//     file_path:
//       "https://raw.githubusercontent.com/the-amazing-team/sample-repo/main/dep.py",
//     function_name: "mul",
//     arguments: ["a", "b"],
//     code: "def mul(a, b):\n    result = 0\n    for _ in range(b):\n        result = sum(result, a)\n    return result",
//     functions_called: [1],
//   },
//   {
//     id: 4,
//     file_name: "dep.py",
//     file_path:
//       "https://raw.githubusercontent.com/the-amazing-team/sample-repo/main/dep.py",
//     function_name: "div",
//     arguments: ["a", "b"],
//     code: "def div(a, b):\n    result = 0\n    while a >= b:\n        a = sub(a, b)\n        result = sum(result, 1)\n    return result",
//     functions_called: [1, 2],
//   },
// ];
const Canvas = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/get_functions?url=https://github.com/dante-biase/jar2app");
        const parsedData = res.data; 
        const newNodes = parsedData.map((node) => ({
          id: node.id.toString(),
          type: "custom",
          data: {
            label: node.function_name,
            name: node.function_name,
            Id: node.id,
            code: node.code,
            description: "[Code Description]",
          },
          position: { x: 100, y: 200 },
        }));

        const newEdges = [];
        parsedData.forEach((node) => {
          node.functions_called.forEach((called) => {
            newEdges.push({
              id: node.id.toString() + called.toString(),
              source: node.id.toString(),
              target: called.toString(),
              animated: true,
              markerEnd: {
                type: MarkerType.ArrowClosed,
              },
            });
          });
        });

        setNodes(newNodes);
        setEdges(newEdges);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  // we are using a bit of a shortcut here to adjust the edge type
  // // this could also be done with a custom edge for example
  // const edgesWithUpdatedTypes = edges.map((edge) => {
  //   if (edge.sourceHandle) {
  //     const edgeType = nodes.find((node) => node.type === "custom").data
  //       .selects[edge.sourceHandle];
  //     edge.type = edgeType;
  //   }

  //   return edge;
  // });


  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onInit={onInit}
      fitView
      attributionPosition="top-right"
      nodeTypes={nodeTypes}
    >
      <MiniMap style={minimapStyle} zoomable pannable />
      <Controls />
      <Background color="#aaa" gap={16} />
    </ReactFlow>
  );
};

export default Canvas;
