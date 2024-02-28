import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { incrementPageNum, selectIsMaxPages } from "../../../../store/urlSlice";

const useInfiniteScroll = () => {
    const dispatch = useAppDispatch();
    const isMaxPages = useAppSelector(selectIsMaxPages);
    const observerElemRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const observerElem = observerElemRef.current;
        
        const observer = new IntersectionObserver(
            ([entry]: IntersectionObserverEntry[]) => {
                if (entry.isIntersecting) {
                    dispatch(incrementPageNum());
                }
            }, {threshold: 1.0}
        );

        if (observerElem && !isMaxPages) {
            observer.observe(observerElem);
        }

        return () => {
            observer.disconnect();
        };
    }, [observerElemRef, dispatch, isMaxPages]);

    return observerElemRef;
};

export default useInfiniteScroll;