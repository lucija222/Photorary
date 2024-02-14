import "./Menu.scss";
import Nav from "../Nav/Nav";
import { XSvg } from "../../../assets/svg/exports";
import { MouseEventHandler, useEffect, useRef, } from "react";

interface MenuProps {
    isMenuOpen: boolean;
    handleMenuToggle: MouseEventHandler<HTMLElement>;
}

const Menu = ({ isMenuOpen, handleMenuToggle }: MenuProps) => {
    const menuRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const currentRef = menuRef.current;
        if (currentRef) {
            currentRef.classList.toggle("slide-in-right", isMenuOpen);
            currentRef.classList.toggle("fade-out", !isMenuOpen);
        }
    }, [isMenuOpen]);

    return (
        <div id="menu" ref={menuRef}>
            <button type="button" onClick={handleMenuToggle}>
                <XSvg />
            </button>
            <Nav handleMenuToggle={handleMenuToggle}/>
        </div>
    );
};
export default Menu;
