import "./UsersGrid.scss";
import { useEffect, useRef } from "react";
import NoResults from "../../searchComps/NoResults/NoResults";
import { setMainLoader } from "../../../store/loaderSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { selectUsersIds, selectUsersStatus } from "../../../store/usersSlice";
import ResizeObserverComp from "../../gridComps/observers/ResizeObserverComp/ResizeObserverComp";

const UsersGrid = () => {
    const dispatch = useAppDispatch();
    const usersIds = useAppSelector(selectUsersIds);
    const usersStatus = useAppSelector((state) => selectUsersStatus(state));
    const isNoResults = usersIds.length === 0;
    const isDataLoaded = usersStatus === "succeeded";
    const usersGridRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (isNoResults) {
            dispatch(setMainLoader(false));
        }
    }, [dispatch, isNoResults]);

    return (
        <section id="users-grid" ref={usersGridRef}>
            {isNoResults && isDataLoaded && <NoResults />}
            {!isNoResults && isDataLoaded && <ResizeObserverComp gridRef={usersGridRef} isPhotos={false} />}
        </section>
    );
};

export default UsersGrid;
