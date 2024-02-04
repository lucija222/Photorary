import { InstagramSvg, PortofolioSvg, TwitterSvg } from "../../../assets/svg/exports";

type LinkTypes = "instagram" | "twitter" | "portfolio"

interface UserSocialLinkProps {
    url: string, 
    linkType: LinkTypes,
}

const UserSocialLink = ({url, linkType}: UserSocialLinkProps) => {
    const svgMap = {
        instagram: <InstagramSvg />,
        twitter: <TwitterSvg />,
        portfolio: <PortofolioSvg />
    };

    return (
        <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
    >
        {svgMap[linkType]}
    </a>
    );
};

export default UserSocialLink;