import { useEffect } from "react";
import { ArticleRef, ObserverElemRef } from "../../types";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { selectCheckPhotoStatus } from "../../../../store/photosSlice";
import { selectCheckUsersStatus } from "../../../../store/usersSlice";
import { selectMainLoader, selectScrollLoader, turnOffMainLoader, turnOffScrollLoader } from "../../../../store/loaderSlice";

const useTurnOffLoaders = (
    lastElemRef: ArticleRef,
    observerElemRef: ObserverElemRef,
    isPhotoGrid: boolean
) => {
    
    const dispatch = useAppDispatch();
    const isMainLoader = useAppSelector(selectMainLoader);
    const isScrolLoader = useAppSelector(selectScrollLoader);
    const isDataLoaded = useAppSelector(
        isPhotoGrid
            ? selectCheckPhotoStatus("succeeded")
            : selectCheckUsersStatus("succeeded")
    );

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        if (lastElemRef.current && isMainLoader && isDataLoaded) {
            timeoutId = setTimeout(() => {
                dispatch(turnOffMainLoader());
            }, 1000);
        }

        return () => {
            clearTimeout(timeoutId);
        };
    }, [lastElemRef, observerElemRef, isMainLoader, isDataLoaded, dispatch]);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        if (observerElemRef?.current && isScrolLoader && isDataLoaded) {
            timeoutId = setTimeout(() => {
                dispatch(turnOffScrollLoader());
            }, 1000);
        }

        return () => {
            clearTimeout(timeoutId);
        };
    }, [lastElemRef, observerElemRef, isScrolLoader, isDataLoaded, dispatch]);
};

export default useTurnOffLoaders;
