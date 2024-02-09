import { ApiPhotosArray, PhotosArray } from "../types";

export const createObjectURLs = async (data: ApiPhotosArray) => {

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
            urls: { ...photoObj.urls, small_object_url: responsesArr[index] },
        };
    });

    return mergedArr;
};

// export const createObjectURLs = async (data: ApiPhotosArray) => {

//     // const pendingFetches: Promise<Response>[] = [];
//     // data.map((photoObj) => {
//     //     return pendingFetches.push(fetch(photoObj.urls.small));
//     // });
//     // const responsesArr = await Promise.all(pendingFetches);

//     // const urlArr = responsesArr.map(async (response) => {
//     //     const imgBlob = await response.blob();
//     //     return URL.createObjectURL(imgBlob);
//     // });

//     // const resolvedUrlArr = await Promise.all(urlArr);

//     const mergedArr: PhotosArray = data.map((photoObj, index) => {
//         return {
//             ...photoObj,
//             urls: { ...photoObj.urls, small_object_url: resolvedUrlArr[index] },
//         };
//     });

//     return mergedArr;
// };
