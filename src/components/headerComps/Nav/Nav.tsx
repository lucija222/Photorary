import "./Nav.scss";
import { Link } from "react-router-dom";

const Nav = () => {

    return (
        <nav>
            <ul>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/search">Search</Link></li>
            </ul>
        </nav>
    );
};

export default Nav;