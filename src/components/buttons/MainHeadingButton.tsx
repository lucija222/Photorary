import { MouseEventHandler } from "react";
import { LogoSvg } from "../../assets/svg/exports";
import { resetPhotosStatus } from "../../store/photosSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";

const MainHeadingButton = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    
    const handleHeadingRouting: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.stopPropagation();
        if (location.pathname === "/") {
            dispatch(resetPhotosStatus());

        } else {
            navigate("/");
        }
    };

    return (
        <h1>
            <button type="button" onClick={handleHeadingRouting}>
                <LogoSvg /> <span>Photorary</span>
            </button>
        </h1>
    );
};

export default MainHeadingButton;
