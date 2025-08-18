import {StrictMode} from "react";

import App from "./components/App";
import {createRoot} from "react-dom/client";

import "./reset.css";
import "./styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
