import { useEffect } from "react";
import { useBeforeUnload } from "react-router-dom";
import UsersGrid from "../components/userComps/UsersGrid/UsersGrid";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { resetUsersStatus, selectUsersStatus, } from "../store/usersSlice";
import { selectActionType, selectPageNum, selectQuery, setQuery, } from "../store/urlSlice";
import { fetchUsers } from "../store/asyncThunks/fetchUsers";

const SearchUsers = () => {
    const dispatch = useAppDispatch();
    const usersStatus = useAppSelector(selectUsersStatus);

    const pageNum = useAppSelector(selectPageNum);
    const action = useAppSelector(selectActionType);
    const query = useAppSelector(selectQuery);
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
    }, [query, dispatch, usersStatus, url, action]);

    useEffect(() => {
        return () => {
            dispatch(resetUsersStatus());
        };
    }, [dispatch]);

    return <UsersGrid />;
};

export default SearchUsers;
