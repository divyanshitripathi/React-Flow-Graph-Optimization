// import logo from "./logo.svg";
import "./App.css";
import GraphFlow from "./GraphContainer/GraphContainer";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <GraphFlow />
      </Provider>
    </div>
  );
}

export default App;
