import { MouseEventHandler, useState } from "react";
import { HamburgerSvg, LogoSvg } from "../../../assets/svg/exports";
import "./Header.scss";
import Menu from "../Menu/Menu";
import useDelayedUnmount from "../../../util/helpers/functions/customHooks/useDelayedUnmount";
import SearchBar from "../SearchBar/SearchBar";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../store/hooks";
import { resetPhotosStatus } from "../../../store/photosSlice";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const shouldRenderMenu = useDelayedUnmount(isMenuOpen, 1000);
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleMenuToggle: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.stopPropagation();
        setIsMenuOpen(!isMenuOpen);
    };
    
    const handleHeadingRouting: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.stopPropagation();
        if (location.pathname === "/") {
            dispatch(resetPhotosStatus());

        } else {
            navigate("/");
        }
    };

    return (
        <>
            <header>
                <h1>
                    <button type="button" onClick={handleHeadingRouting}>
                        <LogoSvg /> <span>Photorary</span>
                    </button>
                </h1>
                <SearchBar />
                <button type="button" onClick={handleMenuToggle}>
                    <HamburgerSvg />
                </button>
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
