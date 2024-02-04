import { Outlet } from "react-router-dom";
import Header from "../components/headerComps/Header/Header";
import ScrollToTop from "../components/UIComponents/ScrollToTop/ScrollToTop";

const Root = () => {

    return (
        <>
            <ScrollToTop />
            <Header />
            <main>
                <Outlet />
            </main>
        </>
    );
};

export default Root;
