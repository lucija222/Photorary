import "./SocialContainer.scss";
import SocialLink, { LinkTypes } from "../SocialLink/SocialLink";

interface SocialContainerProps {
    instagram_username: string | null;
    twitter_username: string | null;
    portfolio_url: string | null;
}

const SocialContainer = ({ instagram_username, twitter_username, portfolio_url }: SocialContainerProps) => {

    const socialLinks = [
        {
            username: instagram_username,
            url: "https://www.instagram.com/",
            linkType: "instagram" as LinkTypes,
        },
        {
            username: twitter_username,
            url: "https://twitter.com/",
            linkType: "twitter" as LinkTypes,
        },
        { username: portfolio_url, url: "", linkType: "portfolio" as LinkTypes },
    ];

    const validSocialLinks = socialLinks.filter(
        (link) => link.username !== null
    );

    return (
        <>
            {validSocialLinks.length > 0 && (
                <div className="social-container">
                    {validSocialLinks.map((link) => {
                        const { username, url, linkType } = link;
                        return (
                            <SocialLink
                                key={linkType}
                                url={`${url}${username}`}
                                linkType={linkType}
                            />
                        );
                    })}
                </div>
            )}
        </>
    );
};

export default SocialContainer;
