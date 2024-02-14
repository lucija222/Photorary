import { useEffect } from "react";
import { useBeforeUnload } from "react-router-dom";
import UsersGrid from "../userComps/UsersGrid/UsersGrid";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchUsers, resetUsersStatus, selectUsersStatus, } from "../../store/usersSlice";
import { selectActionType, selectPageNum, selectQuery, setQuery, } from "../../store/urlSlice";

const SearchUsers = () => {
    const dispatch = useAppDispatch();
    const usersStatus = useAppSelector((state) => selectUsersStatus(state));

    const pageNum = useAppSelector((state) => selectPageNum(state));
    const action = useAppSelector((state) => selectActionType(state));
    const query = useAppSelector((state) => selectQuery(state));
    const url = `https://api.unsplash.com/search/users?query=${query}&page=${pageNum}&per_page=30`;

    useBeforeUnload(() => {
        sessionStorage.setItem("userQuery", query);
    });

    useEffect(() => {
        if (query) {
            if (usersStatus === "idle") {
                const payload = { url: url, action: action };
                dispatch(fetchUsers(payload));
            }
        } else {
            const queryFromStorage = sessionStorage.getItem("userQuery");
            queryFromStorage && dispatch(setQuery(queryFromStorage));
        }

        return () => {
            if (usersStatus === "failed" || usersStatus === "succeeded") {
                dispatch(resetUsersStatus());
            }
        };
    }, [query, dispatch, usersStatus, url, action]);

    return <UsersGrid />;
};

export default SearchUsers;
