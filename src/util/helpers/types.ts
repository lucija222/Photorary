//--------------------------------------------------------------SLICES
type Status = "idle" | "pending" | "succeeded" | "failed";
type SliceError = string | undefined;

export interface FetchThunkArg {
    url: string;
    action: "overwrite" | "add";
}

export interface InitAdapterState {
    status: Status;
    loader: boolean;
    error: SliceError;
    totalSearchResults: number;
}

//--------------------------------------------------------API RESPONSE TYPES
interface UserProfileImage {
    small: string;
    medium: string;
    large: string;
}

interface PhotoUrls {
    regular: string;
    small: string;
}

interface PhotoLink {
    download_location: string;
}

export interface ApiPhotoObj {
    id: string;
    created_at: string;
    urls: PhotoUrls;
    likes: number;
    liked_by_user: false;
    links: PhotoLink;
    user: ApiUserObj;
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
}

export type ApiPhotosArray = ApiPhotoObj[];
export type ApiUsersArray = ApiUserObj[];