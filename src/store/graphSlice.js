import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nodes: [],
  edges: [],
};

const graphSlice = createSlice({
  name: "graph",
  initialState,
  reducers: {
    setGraph(state, { payload }) {
      state.nodes = payload.nodes;
      state.edges = payload.edges;
    },
    updateNodeColor(state, { payload }) {
      if (!payload || !payload.nodeId) {
        console.error("Invalid payload for updateNodeColor:", payload);
        return;
      }
      const { nodeId, color } = payload;
      /** Deep clone nodes array to remove Proxies */
      const nodesData = state.nodes.map((node) => ({
        ...node,
        position: { ...node.position },
        data: { ...node.data },
      }));

      state.nodes = nodesData.map((n) =>
        n.id === nodeId ? { ...n, data: { ...n.data, color } } : n
      );
    },
    updateNodeFontSize(state, { payload }) {
      if (!payload || !payload.nodeId) {
        console.error("Invalid payload for updateNodeFontSize:", payload);
        return;
      }
      const { nodeId, fontSize } = payload;
      /** Deep clone nodes array to remove Proxies */
      const nodesData = state.nodes.map((node) => ({
        ...node,
        position: { ...node.position },
        data: { ...node.data },
      }));
      state.nodes = nodesData.map((n) =>
        n.id === nodeId ? { ...n, data: { ...n.data, fontSize } } : n
      );
    },
    updateNodePosition(state, { payload }) {
      if (!payload || !payload.nodeId) {
        console.error("Invalid payload for updateNodePosition:", payload);
        return;
      }
      const { nodeId, position } = payload;
      /** Deep clone nodes array to remove Proxies */
      const nodesData = state.nodes.map((node) => ({
        ...node,
        position: { ...node.position },
        data: { ...node.data },
      }));
      state.nodes = nodesData.map((n) =>
        n.id === nodeId ? { ...n, data: { ...n.data }, position } : n
      );
    },
  },
});

export const {
  setGraph,
  updateNodeColor,
  updateNodeFontSize,
  updateNodePosition,
} = graphSlice.actions;
export default graphSlice.reducer;
