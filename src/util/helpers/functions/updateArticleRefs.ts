type RefObjArr = {
    shouldAttachRef: boolean | undefined;
    elemRef: React.MutableRefObject<HTMLElement | null>;
}[];

export const updateArticleRefs = (refObjArr: RefObjArr, node: HTMLElement | null) => {
    refObjArr.forEach((obj) => {
        const { shouldAttachRef, elemRef } = obj;

        if (shouldAttachRef) {
            elemRef.current = node; 
            
        } else {
            elemRef.current = null;
        }
    })
};