import { useEffect } from "react";
import { useAppDispatch } from "../store/hooks";
import { turnOffMainLoader } from "../store/loaderSlice";

const About = () => {
    const dispatch = useAppDispatch();
   
    useEffect(() => {
        dispatch(turnOffMainLoader());
    }, [dispatch]);

    return (
        <h1>
            Page to be added.
        </h1>
    );
}

export default About;