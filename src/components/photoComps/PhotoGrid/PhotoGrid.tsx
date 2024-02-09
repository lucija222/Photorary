import "./PhotoGrid.scss";
import { useRef } from "react";
import ResizeObserverComp from "../ResizeObserverComp/ResizeObserverComp";
import SvgComposition from "../../UIComponents/SvgComposition/SvgComposition";

const PhotoGrid = () => {
    const mainPhotosGridRef = useRef<HTMLDivElement | null>(null);

    return (
        <>
            <section id="photos-grid" ref={mainPhotosGridRef}>
                <ResizeObserverComp mainPhotosGridRef={mainPhotosGridRef} />
            </section>
            <SvgComposition />
        </>
    );
};

export default PhotoGrid;
