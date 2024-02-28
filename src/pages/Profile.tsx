import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import User from "../components/userComps/User/User";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectActionType, selectPageNum } from "../store/urlSlice";
import PhotoGrid from "../components/photoComps/PhotoGrid/PhotoGrid";
import { resetUsersStatus, selectCheckUsersStatus, selectUserForProfile, } from "../store/usersSlice";
import { fetchUsers } from "../store/asyncThunks/fetchUsers";

const Profile = () => {
    const { username } = useParams();
    const dispatch = useAppDispatch();
    const userId = useAppSelector(selectUserForProfile);
    const isStatusIdle = useAppSelector(selectCheckUsersStatus("idle"));
    const isUserLoaded = useAppSelector(selectCheckUsersStatus("succeeded"));

    const pageNum = useAppSelector(selectPageNum);
    const action = useAppSelector(selectActionType);
    const photosUrl = `https://api.unsplash.com/users/${username}/photos?page=${pageNum}&per_page=30`;
    const payload = { url: photosUrl, action: action };
    const isMounting = useRef(true);

    useEffect(() => {
        if (isStatusIdle && isMounting.current) {
            dispatch(
                fetchUsers({
                    url: `https://api.unsplash.com/users/${username}`,
                    action: "overwrite",
                })
            );
            isMounting.current = false;
        }
    }, [dispatch, username, isStatusIdle]);

    useEffect(() => {
        return () => {
            dispatch(resetUsersStatus());
        };
    }, [dispatch]);

    return (
        <>
            {isUserLoaded && <User id={userId} />}
            <PhotoGrid payload={payload} />
        </>
    );
};

export default Profile;
