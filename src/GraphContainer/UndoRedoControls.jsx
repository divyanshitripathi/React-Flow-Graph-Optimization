import React from "react";

export default function UndoRedoControls({ onUndo, onRedo, canUndo, canRedo }) {
  return (
    <div className="undoRedoPanel">
      <button onClick={onUndo} disabled={!canUndo} className="UndoRedoButton">
        Undo
      </button>
      <button onClick={onRedo} disabled={!canRedo} className="UndoRedoButton">
        Redo
      </button>
    </div>
  );
}
