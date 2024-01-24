import "./SvgComposition.scss";
import { LampSvg, PlantSvg, TableSvg } from "../../../assets/svg/exports";

const SvgComposition = () => {
    return (
        <div id="table-svg-container">
            <div id="table-decor">
                <LampSvg />
                <PlantSvg />
            </div>
            <div id="table-container">
            <TableSvg />
            </div>
        </div>
    );
};

export default SvgComposition;
