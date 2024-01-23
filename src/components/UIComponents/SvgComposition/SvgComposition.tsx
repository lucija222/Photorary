import "./SvgComposition.scss";
import { LampSvg, PlantSvg, TableSvg } from "../../../assets/svg/exports";

const SvgComposition = () => {
    return (
        <div className="svg-container">
            <div className="table-decor">
                <LampSvg />
                <PlantSvg />
            </div>
            <div className="table-container">
            <TableSvg />
            </div>
        </div>
    );
};

export default SvgComposition;
