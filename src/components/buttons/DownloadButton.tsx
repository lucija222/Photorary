import { MouseEventHandler } from "react";
import { DownloadSvg } from "../../assets/svg/exports";
import { fetchPhotoForDownload } from "../../util/helpers/functions/fetchPhotoForDownload";
import { dowloadAndCleanup } from "../../util/helpers/functions/triggerDowload";

interface DownloadButtonProps {
    id: string;
    url: string;
}

const DownloadButton = ({ id, url }: DownloadButtonProps) => {

    const handlePhotoDownload: MouseEventHandler<HTMLButtonElement> = async (e) => {
        e.stopPropagation();
        const imgObjectUrl = await fetchPhotoForDownload(url);
        if (imgObjectUrl) {
            dowloadAndCleanup(imgObjectUrl, id);
        }
    };

    return (
        <button type="button" onClick={handlePhotoDownload}>
        <DownloadSvg />
    </button>
    );
};

export default DownloadButton;