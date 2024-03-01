import "./Header.scss";
import Menu from "../Menu/Menu";
import SearchBar from "../SearchBar/SearchBar";
import { MouseEventHandler, useState } from "react";
import MainHeadingButton from "../../buttons/MainHeadingButton";
import HamburgerButton from "../../buttons/HamburgerOrXButtoon";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenuToggle: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.stopPropagation();
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <header>
                <MainHeadingButton />
                <SearchBar />
                <HamburgerButton isMenuOpen={isMenuOpen} handleMenuToggle={handleMenuToggle} />
            </header>
            {isMenuOpen && (
                <Menu
                    isMenuOpen={isMenuOpen}
                    handleMenuToggle={handleMenuToggle}
                />
            )}
        </>
    );
};

export default Header;
