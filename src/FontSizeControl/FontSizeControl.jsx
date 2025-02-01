import { useDispatch } from "react-redux";
import { updateNodeFontSize } from "../store/graphSlice";

export default function ColorPicker({
  selectedFont,
  setSelectedFont,
  selectedNode,
}) {
  const dispatch = useDispatch();

  const labelStyle = { margin: "8px", width: "130px", float: "left" };
  const actionStyles = {
    float: "left",
    margin: "8px",
    width: "20vw",
  };

  const handleFontSizeChange = (event) => {
    if (selectedNode !== null) {
      const fontSize = parseInt(event.target.value, 10);
      setSelectedFont(fontSize);
      dispatch(updateNodeFontSize({ nodeId: selectedNode?.id, fontSize }));
    }
  };
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium" style={labelStyle}>
        Font Size:
      </label>
      <select
        onChange={handleFontSizeChange}
        value={selectedFont}
        className="w-full mt-1 border rounded p-1"
        style={actionStyles}
      >
        {[12, 14, 16, 18, 20, 22, 24].map((size) => (
          <option key={size} value={size}>
            {size}px
          </option>
        ))}
      </select>
    </div>
  );
}
