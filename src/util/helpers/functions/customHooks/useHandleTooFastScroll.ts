import { useEffect } from "react";
import { ArticleRef } from "../../types";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { incrementPageNum, selectIsMaxPages } from "../../../../store/urlSlice";
import { selectCheckPhotoStatus } from "../../../../store/photosSlice";
import { selectCheckUsersStatus } from "../../../../store/usersSlice";

const useHandleTooFastScroll = (elemRef: ArticleRef, isPhotos: boolean) => {
    const dispatch = useAppDispatch();
    const isMaxPages = useAppSelector(selectIsMaxPages);
    const isLoaded = useAppSelector(isPhotos ? selectCheckPhotoStatus("succeeded") : selectCheckUsersStatus("succeeded"));

    useEffect(() => {
        const element = elemRef.current;
        
        const observer = new IntersectionObserver(
            ([entry]: IntersectionObserverEntry[]) => {
                if (entry.isIntersecting) {
                    dispatch(incrementPageNum());
                }
            }
        );

        if (element && !isMaxPages && isLoaded) {
            observer.observe(element);
        }

        return () => {
            observer.disconnect();
        };
    }, [elemRef, dispatch, isMaxPages, isLoaded]);

};

export default useHandleTooFastScroll;