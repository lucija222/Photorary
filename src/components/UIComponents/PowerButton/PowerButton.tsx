import "./PowerButton.scss";
import { PowerButtonSvg } from "../../../assets/svg/exports";
import { MouseEventHandler, MutableRefObject, useRef, useState } from "react";

interface PowerButtonProps {
    lampLightRef: MutableRefObject<HTMLDivElement | null>;
}

type ElemRefArray = [
    MutableRefObject<HTMLDivElement | null>,
    MutableRefObject<HTMLButtonElement | null>
];

const PowerButton = ({ lampLightRef }: PowerButtonProps) => {
    const [isLightOn, setIsLightOn] = useState(false);
    const powerBtnRef = useRef<HTMLButtonElement | null>(null);

    const handlePowerButtonClick: MouseEventHandler<HTMLButtonElement> = (
        e
    ) => {
        e.stopPropagation();

        const toggleLightOnClass = (elemRefArr: ElemRefArray) => {
            elemRefArr.forEach((elem) => {
                elem.current?.classList.toggle("light-on", !isLightOn);
            })
        };

        toggleLightOnClass([lampLightRef, powerBtnRef]);
        setIsLightOn(!isLightOn);
    };

    return (
        <button
            type="button"
            className="light-switch"
            onClick={handlePowerButtonClick}
            ref={powerBtnRef}
        >
            <PowerButtonSvg />
        </button>
    );
};

export default PowerButton;
