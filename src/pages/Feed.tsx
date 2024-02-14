import PhotoGrid from "../components/photoComps/PhotoGrid/PhotoGrid";
import { useAppSelector } from "../store/hooks";
import { selectActionType, selectPageNum } from "../store/urlSlice";

const Feed = () => {
    const pageNum = useAppSelector((state) => selectPageNum(state));
    const action = useAppSelector((state) => selectActionType(state));
    const url = `https://api.unsplash.com/photos?page=${pageNum}&per_page=30`;
    const payload = { url: url, action: action };

    return <PhotoGrid payload={payload} />;
};

export default Feed;
