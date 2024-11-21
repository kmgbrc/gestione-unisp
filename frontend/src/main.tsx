// src/main.tsx
import * as React from 'react';
import * as ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "@mui/material";
import theme from "./theme/theme";
import { Provider } from "react-redux";
import store from "./store";
import "./index.css";

const rootElement = document.getElementById("root");

if (rootElement) {
    ReactDOM.createRoot(rootElement).render(
        <React.StrictMode>
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <App />
                </ThemeProvider>
            </Provider>
        </React.StrictMode>
    );
}
