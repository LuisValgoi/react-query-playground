import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import App from "./components/app";
import Provider from "./components/provider";

ReactDOM.render(
  <React.StrictMode>
    <Provider>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
