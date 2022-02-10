import { BrowserRouter, Switch } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import routes from "./routes";
import { ToastContainer } from "react-toastify";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import "allotment/dist/style.css";
import ChartProvider from "./contexts/chartContext";

function App() {
    return (
        <div className="App">
            <ChartProvider>
                <BrowserRouter>
                    <ToastContainer autoClose={3000} />
                    <Switch>{renderRoutes(routes)}</Switch>
                </BrowserRouter>
            </ChartProvider>
        </div>
    );
}

export default App;
