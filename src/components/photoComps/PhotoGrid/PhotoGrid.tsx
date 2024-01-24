import "./PhotoGrid.scss";
import { useRef } from "react";
import Observer from "../ResizeObserver/ResizeObserver";
import SvgComposition from "../../UIComponents/SvgComposition/SvgComposition";


const PhotoGrid = () => {

    const mainPhotosGridRef = useRef<HTMLDivElement | null>(null);

    return (
        <>
            <div id="photos-grid" ref={mainPhotosGridRef}>
                <Observer mainPhotosGridRef={mainPhotosGridRef}/>
            </div>
            <SvgComposition />
        </>
    );
};

export default PhotoGrid;