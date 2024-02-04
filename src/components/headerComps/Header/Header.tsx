import { MouseEventHandler, useState } from "react";
import { HamburgerSvg, LogoSvg } from "../../../assets/svg/exports";
import "./Header.scss";
import Menu from "../Menu/Menu";
import useDelayedUnmount from "../../../util/helpers/functions/customHooks/useDelayedUnmount";
import { Link } from "react-router-dom";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const shouldRenderMenu = useDelayedUnmount(isMenuOpen, 1000);

    const handleMenuToggle: MouseEventHandler<HTMLElement> = (e) => {
        e.stopPropagation();
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <header>
                <h1>
                    <Link to="/">
                        <LogoSvg /> Photorary
                    </Link>
                </h1>
                <button type="button" onClick={handleMenuToggle}>
                    <HamburgerSvg />
                </button>
            </header>
            {shouldRenderMenu && (
                <Menu
                    isMenuOpen={isMenuOpen}
                    setIsMenuOpen={setIsMenuOpen}
                    handleMenuToggle={handleMenuToggle}
                />
            )}
        </>
    );
};

export default Header;
