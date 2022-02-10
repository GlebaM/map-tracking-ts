import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import MapProvider from "./store/MapProvider";
// import * as dotenv from "dotenv";

// dotenv.config();

ReactDOM.render(
  <MapProvider>
    <App />
  </MapProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
