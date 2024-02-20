import { useEffect } from "react";
import { DivRef } from "../../types";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { incrementPageNum, selectIsMaxPages } from "../../../../store/urlSlice";
import { selectScrollLoader } from "../../../../store/loaderSlice";

const useHandleTooFastScroll = (elemRef: DivRef) => {
    const dispatch = useAppDispatch();
    const isMaxPages = useAppSelector(selectIsMaxPages);
    const isScrollLoader = useAppSelector(selectScrollLoader);

    useEffect(() => {
        const element = elemRef.current;
        
        const observer = new IntersectionObserver(
            ([entry]: IntersectionObserverEntry[]) => {
                if (entry.isIntersecting) {
                    dispatch(incrementPageNum());
                }
            }
        );

        if (element && !isMaxPages && !isScrollLoader) {
            observer.observe(element);
        }

        return () => {
            observer.disconnect();
        };
    }, [elemRef, dispatch, isMaxPages, isScrollLoader]);

};

export default useHandleTooFastScroll;