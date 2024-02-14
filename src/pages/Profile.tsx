import { useEffect } from "react";
import { useParams } from "react-router-dom";
import User from "../components/userComps/User/User";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectActionType, selectPageNum } from "../store/urlSlice";
import PhotoGrid from "../components/photoComps/PhotoGrid/PhotoGrid";
import {
    fetchUsers, resetUsersStatus, selectUserForProfile, selectUsersStatus,
} from "../store/usersSlice";

const Profile = () => {
    const { username } = useParams();
    const dispatch = useAppDispatch();
    const userId = useAppSelector((state) => selectUserForProfile(state));
    const usersStatus = useAppSelector((state) => selectUsersStatus(state));
    const isUserLoaded = usersStatus === "succeeded";

    const pageNum = useAppSelector((state) => selectPageNum(state));
    const action = useAppSelector((state) => selectActionType(state));
    const photosUrl = `https://api.unsplash.com/users/${username}/photos?page=${pageNum}&per_page=30`;
    const payload = { url: photosUrl, action: action };

    useEffect(() => {
        if (usersStatus === "idle") {
            dispatch(
                fetchUsers({
                    url: `https://api.unsplash.com/users/${username}`,
                    action: "overwrite",
                })
            );
        }

        return () => {
            if (usersStatus === "failed" || usersStatus === "succeeded") {
                dispatch(resetUsersStatus());
            }
        };
    }, [dispatch, username, usersStatus]);

    return (
        <>
            {isUserLoaded && <User id={userId} />}
            <PhotoGrid payload={payload} />
        </>
    );
};

export default Profile;
