import { Outlet } from "react-router-dom";
import Header from "../components/headerComps/Header/Header";

const Root = () => {

    return (
        <>
            <Header />
            <Outlet />
        </>
    );
};

export default Root;