import { MouseEventHandler } from "react";
import { XSvg } from "../../assets/svg/exports";

interface XButtonProps {
    handleButtonClick: MouseEventHandler<HTMLButtonElement>;
}

const XButton = ({ handleButtonClick: handleXButtonClick }: XButtonProps) => {

    return (
        <button type="button" onClick={handleXButtonClick}>
            <XSvg />
        </button>
    );
};

export default XButton;
