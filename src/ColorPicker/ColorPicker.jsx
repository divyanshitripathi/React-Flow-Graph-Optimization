import { useDispatch } from "react-redux";
import { updateNodeColor } from "../store/graphSlice";

export default function ColorPicker({
  selectedColor,
  setSelectedColor,
  selectedNode,
}) {
  const dispatch = useDispatch();

  const labelStyle = { margin: "8px", width: "130px", float: "left" };
  const actionStyles = {
    float: "left",
    margin: "8px",
    width: "20vw",
  };

  const handleColorChange = (event) => {
    if (selectedNode !== null) {
      const color = event.target.value;
      setSelectedColor(color);
      dispatch(updateNodeColor({ nodeId: selectedNode?.id, color }));
    }
  };

  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium" style={labelStyle}>
        Color Selector :
      </label>
      <input
        type="color"
        value={selectedColor}
        onChange={handleColorChange}
        className="w-full mt-1 cursor-pointer"
        style={actionStyles}
      />
    </div>
  );
}
