//--------------------------------------------------------------SLICES
type Status = "idle" | "pending" | "succeeded" | "failed";

export interface FetchThunkArg {
    url: string;
    action: "overwrite" | "add";
}

export interface InitAdapterState {
    status: Status;
    loader: boolean;
    error: string;
    totalSearchResults: number;
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