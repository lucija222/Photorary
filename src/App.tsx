import "./App.scss";
import Error from "./components/UIComponents/Error/Error";
import { RouterProvider, createBrowserRouter, } from "react-router-dom";
import { Root, Feed, Profile, About, SearchPhotos, SearchUsers } from "./pages/exports";
import SearchToggler from "./components/headerComps/SearchToggler/SearchToggler";

const App = () => {

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Root />,
            errorElement: <Error />,
            children: [
                {
                    index: true,
                    element: <Feed />,
                },
                {
                    path: "user/:username",
                    element: <Profile />,
                },
                {
                    path: "about",
                    element: <About />,
                },
                {
                    path: "search",
                    element: <SearchToggler />,
                    children: [
                        { 
                            path: "photos", 
                            element: <SearchPhotos /> 
                        },
                        { 
                            path: "users", 
                            element: <SearchUsers /> 
                        },
                    ],
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
};

export default App;
