import { MouseEventHandler } from "react";
import { HamburgerSvg, XSvg } from "../../assets/svg/exports";

interface HamburgerButtonProps {
    isMenuOpen: boolean;
    handleMenuToggle: MouseEventHandler<HTMLButtonElement>;
}

const HamburgerButton = ({ isMenuOpen, handleMenuToggle }: HamburgerButtonProps) => {
    
    return (
        <button type="button" id="hamburger" onClick={handleMenuToggle}>
            {isMenuOpen ? <XSvg /> : <HamburgerSvg />}
        </button>
    );
};

export default HamburgerButton;
