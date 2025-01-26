import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import { Activation } from "./pages/Activation.tsx";
import PostView from "./pages/PostView";
import PostCreation from "./pages/PostCreation";
import Registration from "./pages/Registration";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { lightBlue, orange } from "@mui/material/colors";

const theme = createTheme({
    palette: {
        primary: lightBlue,
        secondary: orange,
    },
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    "& .MuiInputBase-input": {
                        color: "black",
                    },
                    "& .MuiOutlinedInput-root": {
                        backgroundColor: "white",
                    },
                },
            },
        },
    },
});

export const API_URL =
    import.meta.env.VITE_API_URL || "http://localhost:8080/v1";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/verify/:token",
        element: <Activation />,
    },
    {
        path: "/posts/:id",
        element: <PostView />,
    },
    {
        path: "/register",
        element: <Registration />,
    },
    {
        path: "/create-post",
        element: <PostCreation />,
    },
]);

const App: React.FC = () => {
    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <RouterProvider router={router} />
            </ThemeProvider>
        </div>
    );
};

export default App;
