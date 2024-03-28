import { InstagramSvg, PortofolioSvg, TwitterSvg } from "../../../assets/svg/exports";

export type LinkTypes = "instagram" | "twitter" | "portfolio"

interface UserSocialLinkProps {
    url: string, 
    linkType: LinkTypes,
}

const SocialLink = ({url, linkType}: UserSocialLinkProps) => {
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

export default SocialLink;