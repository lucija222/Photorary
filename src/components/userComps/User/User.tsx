import "./User.scss";
import { useEffect, useRef } from "react";
import { selectUserById } from "../../../store/usersSlice";
import UserSocialLink from "../UserSocialLink/UserSocialLink";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { selectMainLoader, setMainLoader } from "../../../store/loaderSlice";

interface UserProps {
    id: string;
    isLastElem?: boolean;
}

const User = ({ id, isLastElem }: UserProps) => {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => selectUserById(state, id));
    const lastUserRef = useRef<HTMLDivElement | null>(null);
    const isLoaderOn = useAppSelector((state) => selectMainLoader(state));

    const {
        name, bio, profile_image, instagram_username,
        twitter_username, portfolio_url,
    } = user;


    useEffect(() => {
        if (lastUserRef.current && isLoaderOn) {
            setTimeout(() => {
                dispatch(setMainLoader(false));
            }, 1000)
        }
    }, [dispatch, isLoaderOn]);

    return (
        <div className="user-container" ref={isLastElem ? lastUserRef : null}>
            <img src={profile_image.object_url} alt="User" />
            <div className="user-data">
                <h2>{name}</h2>
                {bio && <p className="bio">{bio}</p>}
                <div className="social-container">
                    {instagram_username && (
                        <UserSocialLink
                            url={`https://www.instagram.com/${instagram_username}`}
                            linkType="instagram"
                        />
                    )}
                    {twitter_username && (
                        <UserSocialLink
                            url={`https://twitter.com/${twitter_username}`}
                            linkType="twitter"
                        />
                    )}
                    {portfolio_url && (
                        <UserSocialLink
                            url={portfolio_url}
                            linkType="portfolio"
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default User;
