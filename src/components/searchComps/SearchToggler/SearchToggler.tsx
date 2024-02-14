import "./SearchToggler.scss";
import { NavLink, Outlet } from "react-router-dom";

const SearchToggler = () => {
    return (
        <>
            <div id="search-links-wrapper">
                <NavLink to="/search/photos"> Photos </NavLink>
                <NavLink to="/search/users"> Users </NavLink>
            </div>
            <Outlet />
        </>
    );
};

export default SearchToggler;