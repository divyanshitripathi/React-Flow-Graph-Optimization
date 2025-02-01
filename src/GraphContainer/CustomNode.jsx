import React from "react";
import { Handle, Position } from "reactflow";

const CustomNode = ({ data }) => {
  return (
    <div
      style={{
        padding: "10px",
        borderRadius: "8px",
        textAlign: "center",
        border: "2px solid #333",
        boxShadow: "rgb(42 195 219) 0px 8px 10px",
      }}
    >
      <strong>{data.label}</strong>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default CustomNode;
