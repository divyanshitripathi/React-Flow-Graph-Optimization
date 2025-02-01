import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nodes: [],
  edges: [],
};

const nodeStyleSlice = createSlice({
  name: "nodeStyle",
  initialState,
  reducers: {
    updateNodeColor(state, { payload }) {
      console.log({ payload }, JSON.stringify(state));
      if (!payload || !payload.nodeId) {
        console.error("Invalid payload for updateNodeColor:", payload);
        return;
      }
      const { nodeId, color } = payload;
      /** Deep clone nodes array to remove Proxies */
      const nodesData = state.nodes.map((node) => ({
        ...node,
        position: { ...node.position }, // Clone position object
        data: { ...node.data }, // data object
      }));

      state.nodes = nodesData.map((n) =>
        n.id === nodeId ? { ...n, data: { ...n.data, color } } : n
      );
    },
    updateNodeFontSize(state, { payload }) {
      // const { nodeId, fontSize } = payload;
      // const node = state.nodes.find((n) => n.id === nodeId);
      // if (node) {
      //   node.data.fontSize = fontSize;
      // }
      if (!payload || !payload.nodeId) {
        console.error("Invalid payload for updateNodeColor:", payload);
        return;
      }
      const { nodeId, fontSize } = payload;
      /** Deep clone nodes array to remove Proxies */
      const nodesData = state.nodes.map((node) => ({
        ...node,
        position: { ...node.position }, // Clone position object
        data: { ...node.data }, // data object
      }));
      state.nodes = nodesData.map((n) =>
        n.id === nodeId ? { ...n, data: { ...n.data, fontSize } } : n
      );
    },
  },
});

export const { updateNodeColor, updateNodeFontSize } = nodeStyleSlice.actions;
export default nodeStyleSlice.reducer;
