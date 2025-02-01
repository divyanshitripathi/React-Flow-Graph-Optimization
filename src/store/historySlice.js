import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  past: [],
  present: null,
  future: [],
};

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    setHistory(state, { payload }) {
      state.past.push(payload.past);
      state.present = payload.present;
    },
    undo(state) {
      if (state.past.length > 0) {
        /** Push present to future to make Redo stack */
        state.future = [state.present, ...state.future];
        state.past = state.past.slice(0, -1);
        if (state?.past?.length > 0) {
          state.present = state.past[state.past.length - 1][0];
        } else {
          state.present = state.past[0];
        }
      } else {
        state.past = [];
        state.present = null;
        state.future = [];
      }
    },
    redo(state) {
      if (state.future.length > 0) {
        const next = state.future.shift();
        state.past.push(state.present);
        state.present = next;
      }
    },
  },
});

export const { undo, redo, setHistory } = historySlice.actions;
export default historySlice.reducer;
