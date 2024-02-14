import { ApiUsersArray, UsersArray } from "../types";

export const createUserObjectUrls = async (data: ApiUsersArray): Promise<UsersArray> => {

    const responsesArr = await Promise.all(

        data.map(async (userObj) => {
            const response = await fetch(userObj.profile_image.large);

            if (!response.ok) {
                return "./images/photoOnError.jpg";
                
            } else {
                const imgBlob = await response.blob();
                return URL.createObjectURL(imgBlob);
            }
        })
    );

    const mergedArr: UsersArray = data.map((userObj, index) => {
        return {
            ...userObj,
            profile_image: { ...userObj.profile_image, object_url: responsesArr[index] },
        };
    });

    return mergedArr;
};