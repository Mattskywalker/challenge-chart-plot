import Error from "./pages/Error";
import Home from "./pages/Home";

const routes  = [
    {
        path: '/',
        exact: true,
        component: Home,
    },
    {
        path: '*',
        exact: true,
        component: Error,
    }
]

export default routes;