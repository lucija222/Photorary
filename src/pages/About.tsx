import { useEffect } from "react";
import { useAppDispatch } from "../store/hooks";
import { setMainLoader } from "../store/loaderSlice";

const About = () => {
    const dispatch = useAppDispatch();
   
    useEffect(() => {
        dispatch(setMainLoader(false));
    }, [dispatch]);

    return (
        <h1>
            Page to be added.
        </h1>
    );
}

export default About;