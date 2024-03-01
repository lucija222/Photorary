import "./Nav.scss";
import { MouseEventHandler } from "react";
import { Link } from "react-router-dom";

interface NavProps {
    handleMenuToggle: MouseEventHandler<HTMLElement>;
}

const Nav = ({ handleMenuToggle }: NavProps) => {

    return (
        <nav>
            <ul onClick={handleMenuToggle}>
                <li><Link to="/about">About</Link></li>
            </ul>
        </nav>
    );
};

export default Nav;