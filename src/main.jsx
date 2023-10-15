import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import { BookProvider } from "./context/book";
// TODO: Import BookProvider component from context and wrap App with it

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <BookProvider>
        <App />
      </BookProvider>
    </Router>
  </React.StrictMode>
);
