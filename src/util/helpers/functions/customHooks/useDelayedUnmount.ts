import { useEffect, useState } from "react";

const useDelayedUnmount = (isMounted: boolean, delayTime: number) => {
    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;
        if (isMounted && !shouldRender) {
            setShouldRender(true);

        } else if (!isMounted && shouldRender) {
            timeoutId = setTimeout(() => {
                setShouldRender(false);
            }, delayTime)
        }

        return () => clearTimeout(timeoutId);
    }, [isMounted, delayTime, shouldRender]);

    return shouldRender;
};

export default useDelayedUnmount;