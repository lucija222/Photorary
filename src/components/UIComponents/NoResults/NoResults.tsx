import { useLocation } from "react-router-dom";
import "./NoResults.scss";

const NoResults = () => {
    const location = useLocation();
    const isProfile = location.pathname.includes("user/");
    const text = isProfile ? "User has no photographs" : "No matches found";

    return (
        <div id="no-matches-wrapper">
            <p>{text}</p>
        </div>
    );
};

export default NoResults;