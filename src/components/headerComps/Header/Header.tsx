import "./Header.scss";
import Menu from "../Menu/Menu";
import SearchBar from "../SearchBar/SearchBar";
import { MouseEventHandler, useState } from "react";
import MainHeadingButton from "../../buttons/MainHeadingButton";
import HamburgerButton from "../../buttons/HamburgerButtoon";
import useDelayedUnmount from "../../../util/helpers/functions/customHooks/useDelayedUnmount";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const shouldRenderMenu = useDelayedUnmount(isMenuOpen, 1000);

    const handleMenuToggle: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.stopPropagation();
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <header>
                <MainHeadingButton />
                <SearchBar />
                <HamburgerButton handleMenuToggle={handleMenuToggle} />
            </header>
            {shouldRenderMenu && (
                <Menu
                    isMenuOpen={isMenuOpen}
                    handleMenuToggle={handleMenuToggle}
                />
            )}
        </>
    );
};

export default Header;
