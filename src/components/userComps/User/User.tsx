import "./User.scss";
import PhotoGrid from "../../photoComps/PhotoGrid/PhotoGrid";
import UserSocialLink from "../UserSocialLink/UserSocialLink";
import { useAppSelector } from "../../../store/hooks";
import { selectUserForProfile } from "../../../store/usersSlice";

interface UserProps {
    isUserLoading: boolean,
}

const User = ({ isUserLoading }: UserProps) => {
    const user = useAppSelector((state) => selectUserForProfile(state));

    return (
        <>
            {!isUserLoading && (
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
            )}
            <PhotoGrid />
        </>
    );
};

export default User;