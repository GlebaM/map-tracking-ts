import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import * as dotenv from "dotenv";
dotenv.config();
// const path = require("path");
// require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });
// const dotenv = require("dotenv");
// dotenv.config();

ReactDOM.render(<App />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
