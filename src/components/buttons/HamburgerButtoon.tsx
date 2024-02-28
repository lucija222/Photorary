import { MouseEventHandler } from "react";
import { HamburgerSvg } from "../../assets/svg/exports";

interface HamburgerButtonProps {
    handleMenuToggle: MouseEventHandler<HTMLButtonElement>;
}

const HamburgerButton = ({ handleMenuToggle }: HamburgerButtonProps) => {
    
    return (
        <button type="button" onClick={handleMenuToggle}>
            <HamburgerSvg />
        </button>
    );
};

export default HamburgerButton;
