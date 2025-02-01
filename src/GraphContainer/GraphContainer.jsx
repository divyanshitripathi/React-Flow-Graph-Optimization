import React, { useCallback, useEffect, useState } from "react";
import "@xyflow/react/dist/style.css";
import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
} from "reactflow";
import "reactflow/dist/style.css";
import { useDispatch, useSelector } from "react-redux";
import { undo, redo } from "../store/historySlice";
import CustomNode from "./CustomNode";
import NodeCustomizationPanel from "./NodeCustomizationPanel";
import UndoRedoControls from "./UndoRedoControls";
import { setGraph, updateNodePosition } from "../store/graphSlice";

const initialNodes = Array.from({ length: 10 }, (_, i) => ({
  id: `${i + 1}`,
  type: "custom",
  position: { x: Math.random() * 400, y: Math.random() * 400 },
  data: {
    label: `Node ${i + 1}`,
    color: "#000000",
    fontSize: 16,
  },
  draggable: true,
}));

const initialEdges = initialNodes.slice(1).map((node, i) => ({
  id: `e${i + 1}-${i + 2}`,
  source: `${i + 1}`,
  target: `${i + 2}`,
  animated: true,
  type: "smoothstep", // Options: 'default', 'bezier', 'straight', 'step', 'smoothstep'
  style: {
    stroke: "rgb(0 200 255 / 73%)",
    strokeWidth: 1,
    strokeDasharray: "25, 5",
  },
}));

const nodeChangeStack = [];
const nodeTypes = {
  custom: CustomNode,
};

export default function GraphFlow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedColor, setSelectedColor] = useState("#ffffff");
  const [selectedFont, setSelectedFont] = useState("12px");
  const dispatch = useDispatch();
  const { past, future, present } = useSelector((state) => state.history);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeClick = useCallback((event, node) => {
    setSelectedNode(node);
    setSelectedColor("#ffffff");
  }, []);

  const onNodeDragStop = useCallback((event, node) => {
    setSelectedNode(node);
    dispatch(
      updateNodePosition({ nodeId: node?.id, position: node?.position })
    );
  }, []);

  /** Ensure initial state is set for the Graph Nodes in Redux*/
  useEffect(() => {
    dispatch(setGraph({ nodes: initialNodes, edges: initialEdges }));
    setSelectedNode(null);
    setSelectedColor("");
  }, [dispatch]);

  /** Syncing Redux State nodes with ReactFlow state To maintain History */
  useEffect(() => {
    if (past.length || future.length) {
      if (present) {
        setNodes((past) => {
          console.log({ past });
          return past.map((node) =>
            node.id === present.id
              ? {
                  ...node,
                  position: present.position, // Apply the position of node from Redux
                  style: {
                    ...node.style,
                    backgroundColor:
                      present.data.color.toLowerCase() === "#000000"
                        ? "#ffffff"
                        : present.data.color, // Apply the color from Redux
                    fontSize: present.data.fontSize, // Apply the font from Redux
                  },
                }
              : node
          );
        });
      }
    }
  }, [past, future, present, setNodes]);

  return (
    <div className="w-full h-full " style={{ height: "80vh", width: "98vw" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onNodeDragStop={onNodeDragStop}
        fitView
        panOnScroll
        zoomOnScroll
      >
        <Controls />
        <Background variant="none" />
      </ReactFlow>
      <div className="nodePanel">
        <NodeCustomizationPanel
          selectedNode={selectedNode}
          setSelectedNode={setSelectedNode}
          setNodes={setNodes}
          setSelectedColor={setSelectedColor}
          selectedColor={selectedColor}
          setSelectedFont={setSelectedFont}
          selectedFont={selectedFont}
          nodeChangeStack={nodeChangeStack}
        />
      </div>
      <UndoRedoControls
        onUndo={() => dispatch(undo())}
        onRedo={() => dispatch(redo())}
        canUndo={past.length > 0 && present !== undefined}
        canRedo={future.length > 0}
      />
    </div>
  );
}
