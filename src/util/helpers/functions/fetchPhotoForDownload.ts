import { authHeader } from "../constants";

export const fetchPhotoForDownload = async (
    url: string,
) => {
    try {
        const imgResponse = await fetch(url, authHeader);

        if (!imgResponse.ok) {
            throw new Error ("Response not ok in photo download");
        }

        const imgBlob = await imgResponse.blob();
        return URL.createObjectURL(imgBlob);

    } catch (error) {
        console.error(error);
    }
};
