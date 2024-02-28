import  "./PhotoFrame.scss";
import Photo from "../Photo/Photo";

interface PhotoFrameProps {
    id: string;
}

const PhotoFrame = ({ id }: PhotoFrameProps) => {

    return (
        <article className="frame-container">
            <div className="frame">
                <Photo id={id} />
            </div>
        </article>
    );
};

export default PhotoFrame;
