import "./SvgComposition.scss";
import { LampSvg, PlantSvg, TableSvg } from "../../../assets/svg/exports";
import PowerButton from "../PowerButton/PowerButton";
import { useRef } from "react";

const SvgComposition = () => {
    const lampLightRef = useRef<HTMLDivElement | null>(null);

    return (
        <>
            <LampSvg />
            <div id="light-div" className="" ref={lampLightRef}></div>
            <PowerButton lampLightRef={lampLightRef} />
            <PlantSvg />
            <TableSvg />
        </>
    );
};

export default SvgComposition;
