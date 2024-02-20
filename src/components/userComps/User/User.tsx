import "./User.scss";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { selectUserById } from "../../../store/usersSlice";
import UserSocialLink from "../UserSocialLink/UserSocialLink";
import { useAppSelector } from "../../../store/hooks";
import useTurnOffLoaders from "../../../util/helpers/functions/customHooks/useTurnOffLoaders";
import useInfiniteScroll from "../../../util/helpers/functions/customHooks/useInfiniteScroll";
import useHandleTooFastScroll from "../../../util/helpers/functions/customHooks/useHandleTooFastScroll";

interface UserProps {
    id: string;
    isLastElem?: boolean;
    isObserverElem?: boolean;
}

const User = ({ id, isLastElem, isObserverElem }: UserProps) => {
    const user = useAppSelector((state) => selectUserById(state, id));
    const lastUserRef = useRef<HTMLDivElement | null>(null);
    const observerElemRef = useInfiniteScroll();
    useHandleTooFastScroll(lastUserRef);
    useTurnOffLoaders(lastUserRef, observerElemRef, false);

    const {
        name, username, bio, profile_image, instagram_username,
        twitter_username, portfolio_url,
    } = user;

    const isSocialLinks: boolean = (instagram_username ? true : false) || (twitter_username ? true : false) || (portfolio_url ? true : false);

    return (
        <div className="user-container" ref={isLastElem ? lastUserRef : null}>
            <Link to={`/user/${username}`}> <img src={profile_image.object_url} alt="User" /></Link> 
            <div className="user-data">
            <Link to={`/user/${username}`}> <h2>{name}</h2> </Link> 
                {bio && <p className="bio">{bio}</p>}
               <div className={isSocialLinks ? "social-container" : ""}>
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
                    {isObserverElem && <div className="observer-div" ref={observerElemRef} ></div>}
                </div>
            </div>
        </div>
    );
};

export default User;
