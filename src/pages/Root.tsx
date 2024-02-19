import { Outlet } from "react-router-dom";
import Header from "../components/headerComps/Header/Header";
import ScrollToTop from "../components/UIComponents/ScrollToTop/ScrollToTop";
import Loader from "../components/UIComponents/Loader/Loader";
import { useAppSelector } from "../store/hooks";
import { selectMainLoader } from "../store/loaderSlice";
import SvgComposition from "../components/UIComponents/SvgComposition/SvgComposition";
import { selectCheckPhotoStatus } from "../store/photosSlice";
import { selectCheckUsersStatus } from "../store/usersSlice";
import Error from "../components/UIComponents/Error/Error";

const Root = () => {
    const mainLoaderStatus = useAppSelector(selectMainLoader);
    const isPhotoError = useAppSelector(selectCheckPhotoStatus("failed"));
    const isUserError = useAppSelector(selectCheckUsersStatus("failed"));
    const isError = isPhotoError || isUserError;

    return (
        <>
            <ScrollToTop />
            <Header />
            {isError && <Error />}
            <main>
                {mainLoaderStatus && <Loader type="main"/>}
                <Outlet />
                <SvgComposition />
            </main>
        </>
    );
};

export default Root;
