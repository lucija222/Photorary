import "./User.scss";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { selectUserById } from "../../../store/usersSlice";
import { useAppSelector } from "../../../store/hooks";
import SocialContainer from "../SocialContainer/SocialContainer";
import useTurnOffLoaders from "../../../util/helpers/functions/customHooks/useTurnOffLoaders";
import useInfiniteScroll from "../../../util/helpers/functions/customHooks/useInfiniteScroll";
import { updateArticleRefs } from "../../../util/helpers/functions/updateArticleRefs";
import useHandleTooFastScroll from "../../../util/helpers/functions/customHooks/useHandleTooFastScroll";

interface UserProps {
    id: string;
    isLastElem?: boolean;
    isObserverElem?: boolean;
}

const User = ({ id, isLastElem, isObserverElem }: UserProps) => {

    const user = useAppSelector((state) => selectUserById(state, id));
    const lastUserRef = useRef<HTMLElement | null>(null);
    const observerElemRef = useInfiniteScroll();
    useHandleTooFastScroll(lastUserRef, false);
    useTurnOffLoaders(lastUserRef, observerElemRef, false);

    const {
        name, username, bio, profile_image, instagram_username, 
        twitter_username, portfolio_url
    } = user;

    const handleRefUpdates = (node: HTMLElement | null) => {
        const refObjArr = [
            {
                shouldAttachRef: isLastElem,
                elemRef: lastUserRef,
            },
            {
                shouldAttachRef: isObserverElem,
                elemRef: observerElemRef,
            },
        ];
        updateArticleRefs(refObjArr, node);
    };

    return (
        <article
            className="user-container"
            ref={(node) => {
                handleRefUpdates(node);
            }}
        >
            <Link to={`/user/${username}`}>
                <img src={profile_image.object_url} alt="User" />
            </Link>
            <div className="user-data">
                <Link to={`/user/${username}`}>
                    <h2>{name}</h2>
                </Link>
                {bio && <p className="bio">{bio}</p>}
                <SocialContainer
                    instagram_username={instagram_username}
                    twitter_username={twitter_username}
                    portfolio_url={portfolio_url}
                />
            </div>
        </article>
    );
};

export default User;