import { MutableRefObject } from "react";

//--------------------------------------------------------------SLICES
export type Status = "idle" | "loading" | "succeeded" | "failed";
export interface FetchThunkArg {
    url: string;
    action: "overwrite" | "add";
}

export interface InitAdapterState {
    status: Status;
    error: string;
}

//--------------------------------------------------------API RESPONSE TYPES
interface UserProfileImage {
    small: string;
    medium: string;
    large: string;
}

export interface ApiPhotoObj {
    id: string;
    created_at: string;
    alt_description?: string | null;
    description?: string | null;
    urls:  {
        full: string;
        regular: string;
        small: string;
    };
    likes: number;
    liked_by_user: false;
    links:  {
        download_location: string;
    };
    user: ApiUserObj;
}

export interface PhotoObj extends ApiPhotoObj {
    urls: ApiPhotoObj["urls"] & {
        small_object_url: string;
    }
}
export interface ApiUserObj {
    id: string;
    username: string;
    name: string;
    twitter_username: string | null;
    bio?: string | null;
    location?: string | null;
    profile_image: UserProfileImage;
    instagram_username: string | null;
    portfolio_url: string | null;
    total_photos: number;
}

export interface UserObj extends ApiUserObj {
    profile_image: ApiUserObj["profile_image"] & {
        object_url: string;
    }
}

export type ApiPhotosArray = ApiPhotoObj[];
export type PhotosArray = PhotoObj[];
export type ApiUsersArray = ApiUserObj[];
export type UsersArray = UserObj[];

export type DivRef = MutableRefObject<HTMLDivElement | null>;
export type ObserverElemRef = MutableRefObject<HTMLElement | null> | undefined;
// export type ObserverElemRef = DivRef | undefined;