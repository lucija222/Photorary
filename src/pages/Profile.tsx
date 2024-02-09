import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { setMainLoader } from "../store/loaderSlice";
import User from "../components/userComps/User/User";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchPhotos, resetPhotosStatus, selectPhotosStatus } from "../store/photosSlice";
import { fetchUsers, resetUsersStatus, selectUserStatus } from "../store/usersSlice";

const Profile = () => {
    const { username } = useParams();
    const dispatch = useAppDispatch();
    const usersStatus = useAppSelector((state) => selectUserStatus(state));
    const photosStatus = useAppSelector((state) => selectPhotosStatus(state));
    const isUserLoading = usersStatus !== "succeeded";

    useEffect(() => {
            if (usersStatus === "idle") {
                dispatch(
                    fetchUsers({
                        url: `https://api.unsplash.com/users/${username}`,
                        action: "overwrite",
                    })
                );
            }

            if (photosStatus === "idle") {
                dispatch(
                    fetchPhotos({
                        url: `https://api.unsplash.com/users/${username}/photos?page=1&per_page=30`,
                        action: "overwrite",
                    })
                );
            }

        return () => {
            const shouldResetUser =
                usersStatus === "failed" || usersStatus === "succeeded";
            const shouldResetPhotos =
                photosStatus === "failed" || photosStatus === "succeeded";

            if (shouldResetUser && shouldResetPhotos) {
                dispatch(resetUsersStatus());
                dispatch(resetPhotosStatus());
                dispatch(setMainLoader(true));
            }
        };
    }, [dispatch, username, usersStatus, photosStatus]);

    return <User isUserLoading={isUserLoading} />;
};

export default Profile;
