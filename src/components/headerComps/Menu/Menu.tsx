import "./Menu.scss";
import Nav from "../Nav/Nav";
import { MouseEventHandler, useEffect, useRef, } from "react";

interface MenuProps {
    isMenuOpen: boolean;
    handleMenuToggle: MouseEventHandler<HTMLButtonElement>;
}

const Menu = ({ isMenuOpen, handleMenuToggle }: MenuProps) => {
    const menuRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const currentRef = menuRef.current;
        if (currentRef) {
            currentRef.classList.toggle("slide-in-right", isMenuOpen);
        }
    }, [isMenuOpen]);

    return (
        <div id="menu" ref={menuRef}>
            <Nav handleMenuToggle={handleMenuToggle}/>
        </div>
    );
};
export default Menu;
