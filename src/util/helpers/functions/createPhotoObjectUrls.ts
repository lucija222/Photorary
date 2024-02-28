import { ApiPhotosArray, PhotosArray } from "../types";

export const createPhotoObjectUrls = async (data: ApiPhotosArray): Promise<PhotosArray> => {
    
    const responsesArr = await Promise.all(
        data.map(async (photoObj) => {
            const response = await fetch(photoObj.urls.small);

            if (!response.ok) {
                return "./images/photoOnError.jpg";
            } else {
                const imgBlob = await response.blob();
                return URL.createObjectURL(imgBlob);
            }
        })
    );

    const mergedArr: PhotosArray = data.map((photoObj, index) => {
        return {
            ...photoObj,
            urls: {
                ...photoObj.urls,
                small_object_url: responsesArr[index],
                regular_object_url: "",
            },
        };
    });

    return mergedArr;
};
