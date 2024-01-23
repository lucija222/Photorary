import "./App.scss";
import Error from "./components/UIComponents/Error/Error";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Root, Photos, Profile, Users } from "./pages/exports";

const App = () => {

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Root />,
            errorElement: <Error />,
            children: [
                {
                    index: true,
                    element: <Photos />,
                },
                {
                    path: "users",
                    element: <Users />,
                },
                {
                    path: "user/:username",
                    element: <Profile />,
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
};

export default App;
