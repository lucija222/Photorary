import { Outlet } from "react-router-dom";
import Header from "../components/headerComps/Header/Header";
import ScrollToTop from "../components/UIComponents/ScrollToTop/ScrollToTop";
import Loader from "../components/UIComponents/Loader/Loader";
import { useAppSelector } from "../store/hooks";
import { selectMainLoader } from "../store/loaderSlice";

const Root = () => {
    const mainLoaderStatus = useAppSelector((state) => selectMainLoader(state));

    return (
        <>
            <ScrollToTop />
            <Header />
            <main>
                {mainLoaderStatus && <Loader />}
                <Outlet />
            </main>
        </>
    );
};

export default Root;
