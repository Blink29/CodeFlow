import React, { useCallback, useEffect, useState } from "react";
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from "reactflow";
import { MarkerType } from "reactflow";

import CustomNode from "./CustomNode";

import "reactflow/dist/style.css";
import "./overview.css";
import axios from "../../axios";

import { useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const nodeTypes = {
  custom: CustomNode,
};

const minimapStyle = {
  height: 120,
};

const onInit = (reactFlowInstance) =>
  console.log("flow loaded:", reactFlowInstance);

const Canvas = () => {
  const query = useQuery();
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const url = query.get("url");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/get_functions?url=${url}`);
        const parsedData = res.data;
        const sortedData = parsedData
          .slice()
          .sort((a, b) => b.function_rating - a.function_rating);

        const ratingMap = new Map();
        const yCoordinatesMap = new Map();
        let currentX = 400;

        sortedData.forEach((node) => {
          if (!ratingMap.has(node.function_rating)) {
            ratingMap.set(node.function_rating, currentX);
            yCoordinatesMap.set(currentX, new Set());
            currentX -= 250;
          }

          const xCoordinate = ratingMap.get(node.function_rating);

          const yCoordinatesSet = yCoordinatesMap.get(xCoordinate);

          let yCoordinate =
            100 +
            (yCoordinatesSet.size % 2 === 0
              ? yCoordinatesSet.size * 80
              : -yCoordinatesSet.size * 80);

          while (yCoordinatesSet.has(yCoordinate)) {
            yCoordinate += yCoordinatesSet.size % 2 === 0 ? 80 : -80;
          }

          yCoordinatesSet.add(yCoordinate);

          node["X_coordinate"] = xCoordinate;
          node["Y_coordinate"] = yCoordinate;
        });

        const newNodes = parsedData.map((node) => ({
          id: node.id.toString(),
          type: "custom",
          data: {
            label: node.function_name,
            name: node.function_name,
            file_name: node.file_name,
            file_path: node.file_path,
            Id: node.id,
            code: node.code,
            class_name: node.class_name,
            // description: "[Code Description]",
          },
          position: { x: node.X_coordinate, y: node.Y_coordinate },
        }));

        const newEdges = [];
        parsedData.forEach((node) => {
          node.functions_called.forEach((called) => {
            newEdges.push({
              id: node.id.toString() + called.toString(),
              // source: node.id.toString(),
              // target: called.toString(),
              source: called.toString(),
              target: node.id.toString(),
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

  useEffect(() => {
    if(selectedNode) {
      const resetEdges = edges.map((edge) => {
        return {
          ...edge,
          style: {},
          markerEnd: {
            type: MarkerType.ArrowClosed,
          },
        };
      })
      const updatedEdges = resetEdges.map((edge) => {
        if (edge.source === selectedNode || edge.target === selectedNode) {
          return {
            ...edge,
            style: {
              strokeWidth: 2,
              stroke: "#FF0072",
            },
            markerEnd: {
              type: MarkerType.ArrowClosed,
              color: "#FF0072",
            },
          };
        }
        return edge;
      });
      setEdges(updatedEdges);
    }
  }, [selectedNode])

  const onNodeClick = (event, node) => {
    setSelectedNode(node.id);
    setOpenModal(node.id);
  };
  
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

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
      onNodeClick={onNodeClick}
      nodeTypes={nodeTypes}
    >
      <MiniMap style={minimapStyle} zoomable pannable />
      <Controls />
      <Background color="#aaa" gap={16} />
    </ReactFlow>
  );
};

export default Canvas;
