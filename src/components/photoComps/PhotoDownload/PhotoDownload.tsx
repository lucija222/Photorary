import "./PhotoDownload.scss";
import { MouseEventHandler } from "react";
import SvgButton from "../../buttons/SvgButton";
import { DownloadSvg } from "../../../assets/svg/exports";
import { dowloadAndCleanup } from "../../../util/helpers/functions/triggerDowload";
import { fetchPhotoForDownload } from "../../../util/helpers/functions/fetchPhotoForDownload";

interface PhotoDownloadProps {
    id: string;
    url: string;
}

const PhotoDownload = ({ id, url }: PhotoDownloadProps) => {

    const handlePhotoDownload: MouseEventHandler<HTMLButtonElement> = async (
        e
    ) => {
        e.stopPropagation();
        const imgObjectUrl = await fetchPhotoForDownload(url);

        if (imgObjectUrl) {
            dowloadAndCleanup(imgObjectUrl, id);
        }
    };

    return (
        <SvgButton
            SvgComponent={DownloadSvg}
            handleButtonClick={handlePhotoDownload}
        />
    );
};

export default PhotoDownload;
