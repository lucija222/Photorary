import { useLocation } from "react-router-dom";
import "./NoResults.scss";
import { useAppDispatch } from "../../../store/hooks";
import { useEffect } from "react";
import { turnOffMainLoader } from "../../../store/loaderSlice";

const NoResults = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const isProfile = location.pathname.includes("user/");
    const text = isProfile ? "User has no photographs" : "No matches found";

    useEffect(() => {
            dispatch(turnOffMainLoader());
    }, [dispatch]);

    return (
        <div id="no-matches-wrapper">
            <p>{text}</p>
        </div>
    );
};

export default NoResults;