import "./Loader.scss";

interface LoaderProps {
    type: "main" | "in-grid";
}

const Loader = ({ type }: LoaderProps) => {
    return (
        <div className={`spinner-wrapper ${type}`}>
             <div className="spinner"></div>
        </div>
    );
};

export default Loader;
