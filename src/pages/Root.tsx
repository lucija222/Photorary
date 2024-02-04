import { Outlet } from "react-router-dom";
import Header from "../components/headerComps/Header/Header";
import { useAppDispatch } from "../store/hooks";
import { fetchPhotos } from "../store/photosSlice";

const Root = () => {
    const dispatch = useAppDispatch();

    dispatch(
        fetchPhotos({
            url: "https://api.unsplash.com/photos?page=1&per_page=96",
            action: "overwrite",
        })
    );

    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
        </>
    );
};

export default Root;
