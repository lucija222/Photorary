import "./PhotoFrame.scss";
import { useRef } from "react";
import Photo from "../Photo/Photo";
import useTurnOffLoaders from "../../../util/helpers/functions/customHooks/useTurnOffLoaders";
import useInfiniteScroll from "../../../util/helpers/functions/customHooks/useInfiniteScroll";
import { updateArticleRefs } from "../../../util/helpers/functions/updateArticleRefs";
import useHandleTooFastScroll from "../../../util/helpers/functions/customHooks/useHandleTooFastScroll";

interface PhotoFrameInGridProps {
    id: string;
    isLastElem: boolean;
    isObserverElem: boolean;
}

const PhotoFrame = ({ id, isLastElem, isObserverElem }: PhotoFrameInGridProps) => {

    const lastPhotoRef = useRef<HTMLDivElement | null>(null);
    const observerElemRef = useInfiniteScroll();
    useTurnOffLoaders(lastPhotoRef, observerElemRef, true);
    useHandleTooFastScroll(lastPhotoRef, true);

    const handleRefUpdates = (node: HTMLElement | null) => {
        const refObjArr = [
            {
                shouldAttachRef: isLastElem,
                elemRef: lastPhotoRef,
            },
            {
                shouldAttachRef: isObserverElem,
                elemRef: observerElemRef,
            },
        ];
        updateArticleRefs(refObjArr, node);
    };

    return (
        <article
            className="frame-container"
            ref={(node) => {
                handleRefUpdates(node);
            }}
        >
            <div className="frame">
                <Photo id={id} />
                {/* <Photo id={id} isInGrid={true} /> */}
            </div>
        </article>
    );
};

export default PhotoFrame;
