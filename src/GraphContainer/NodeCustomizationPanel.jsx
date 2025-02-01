import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setHistory } from "../store/historySlice";
import ColorPicker from "../ColorPicker/ColorPicker";
import FontSizeControl from "../FontSizeControl/FontSizeControl";

export default function NodeCustomizationPanel({
  selectedNode,
  setNodes,
  selectedFont,
  setSelectedFont,
  selectedColor,
  nodeChangeStack,
  setSelectedColor,
}) {
  const dispatch = useDispatch();
  const nodesFromStore = useSelector((state) => state.graph.nodes);

  /** Sync Redux with ReactFlow state */
  useEffect(() => {
    if (selectedColor || selectedFont) {
      /** Mapping through the nodes to ensure the backgroundColor is correctly applied */
      setNodes((nodesFromStore) =>
        nodesFromStore.map((node) => {
          if (
            node.data.color.toLowerCase() === "#000000" &&
            node.id === selectedNode?.id
          ) {
            /** notifying react flow about the change in nodes background color */
            return {
              ...node,
              style: {
                ...node.style,
                backgroundColor: selectedColor,
                fontsize: selectedFont,
              },
            };
          }
          return node;
        })
      );
      /** Maintaining history of nodeColor Changes */
      const filteredNode = nodesFromStore.filter(
        (n) => n?.id === selectedNode?.id
      );
      nodeChangeStack.push(filteredNode);
      dispatch(
        setHistory({
          past: nodeChangeStack[nodeChangeStack.length - 1],
          present: nodeChangeStack[nodeChangeStack.length - 1][0],
        })
      );
    }
  }, [nodesFromStore, setNodes, selectedColor, selectedNode, nodeChangeStack]);

  return (
    <div className="nodePanel_custom">
      <ColorPicker
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
        selectedNode={selectedNode}
      />
      <FontSizeControl
        selectedFont={selectedFont}
        setSelectedFont={setSelectedFont}
        selectedNode={selectedNode}
      />
    </div>
  );
}
