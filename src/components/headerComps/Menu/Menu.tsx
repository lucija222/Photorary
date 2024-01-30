import "./Menu.scss";
import Nav from "../Nav/Nav";
import { XSvg } from "../../../assets/svg/exports";
import {
    Dispatch,
    MouseEventHandler,
    SetStateAction,
    useEffect,
    useRef,
} from "react";

interface MenuProps {
    isMenuOpen: boolean;
    setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
    handleMenuToggle: MouseEventHandler<HTMLElement>;
}

const Menu = ({ isMenuOpen, setIsMenuOpen, handleMenuToggle }: MenuProps) => {
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
            <Nav />
        </div>
    );
};
export default Menu;
