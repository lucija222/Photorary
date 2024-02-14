import { MouseEventHandler } from "react";
import "./Nav.scss";
import { Link } from "react-router-dom";

interface NavProps {
    handleMenuToggle: MouseEventHandler<HTMLElement>;
}

const Nav = ({ handleMenuToggle }: NavProps) => {

    return (
        <nav>
            <ul onClick={handleMenuToggle}>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/search/photos">Search</Link></li>
            </ul>
        </nav>
    );
};

export default Nav;