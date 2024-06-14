import React from "react";
import ReactDOM from "react-dom/client";


import "./sassStyles/_base.css";
import "./sassStyles/_reset.css";
import "./sassStyles/_typography.css";
import "./sassStyles/_variables.css";

import App from "./App.jsx";



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
