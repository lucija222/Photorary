import "./UsersGrid.scss";
import { useEffect, useRef } from "react";
import Loader from "../../UIComponents/Loader/Loader";
import NoResults from "../../UIComponents/NoResults/NoResults";
import { selectScrollLoader, turnOffMainLoader } from "../../../store/loaderSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { selectIsNoUserResults } from "../../../store/usersSlice";
import RenderDynamicGridColumns from "../../gridComps/RenderDynamicGridColumns/RenderDynamicGridColumns";

const UsersGrid = () => {
    const dispatch = useAppDispatch();
    const isNoResults = useAppSelector(selectIsNoUserResults);
    const isScrollLoader = useAppSelector(selectScrollLoader);
    const usersGridRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (isNoResults) {
            dispatch(turnOffMainLoader());
        }
    }, [dispatch, isNoResults]);

    return (
        <section id="users-grid" ref={usersGridRef}>
            {isNoResults && <NoResults />}
            <RenderDynamicGridColumns gridRef={usersGridRef} isPhotoGrid={false} />
            {isScrollLoader && <Loader type="in-grid"/>}
        </section>
    );
};

export default UsersGrid;
