import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import 'bootstrap/dist/css/bootstrap.min.css';
import "@fontsource/inter";

document.body.style.fontFamily =
  "Inter, sans-serif";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);