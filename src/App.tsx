import "./App.scss";
import { RouterProvider, createBrowserRouter, } from "react-router-dom";
import { Root, Feed, Profile, About } from "./pages/exports";
import SearchPhotos from "./components/searchComps/SearchPhotos";
import SearchUsers from "./components/searchComps/SearchUsers";
import SearchToggler from "./components/searchComps/SearchToggler/SearchToggler";
import Error from "./components/UIComponents/Error/Error";

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
                    element: <SearchToggler/>,
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
