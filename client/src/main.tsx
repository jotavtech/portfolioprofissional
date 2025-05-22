import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

<BrowserRouter basename="/portfolioprofissional">
    <App />
</BrowserRouter>


createRoot(document.getElementById("root")!).render(<App />);
