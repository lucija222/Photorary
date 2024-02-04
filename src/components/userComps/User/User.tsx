import "./User.scss";
import { useAppSelector } from "../../../store/hooks";
import { ApiUserObj } from "../../../util/helpers/types";
import Loader from "../../UIComponents/Loader/Loader";
import PhotoGrid from "../../photoComps/PhotoGrid/PhotoGrid";
import UserSocialLink from "../UserSocialLink/UserSocialLink";
import { selectUserForProfile, selectUserLoader, } from "../../../store/usersSlice";

const User = () => {
    
    const isLoadingUsers = useAppSelector((state) => selectUserLoader(state));
    const user: ApiUserObj = useAppSelector((state) =>
        selectUserForProfile(state)
    );

    return (
        <>
            {isLoadingUsers ? (
                <Loader />
            ) : (
                <>
                    <div className="user-container">
                        <img src={user.profile_image.large} alt="User" />
                        <div className="user-data">
                            <h2>{user.name}</h2>
                            {user.bio && <p className="bio">{user.bio}</p>}
                            <div className="social-container">
                                {user.instagram_username && (
                                    <UserSocialLink
                                        url={`https://www.instagram.com/${user.instagram_username}/`}
                                        linkType="instagram"
                                    />
                                )}
                                {user.twitter_username && (
                                    <UserSocialLink
                                        url={`https://twitter.com/${user.twitter_username}`}
                                        linkType="twitter"
                                    />
                                )}
                                {user.portfolio_url && (
                                    <UserSocialLink
                                        url={user.portfolio_url}
                                        linkType="portfolio"
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                    <PhotoGrid />
                </>
            )}
        </>
    );
};

export default User;
