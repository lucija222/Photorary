import "./SearchBar.scss";
import { FormEventHandler, useRef, useState } from "react";
import { useAppDispatch } from "../../../store/hooks";
import { setQuery } from "../../../store/urlSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { resetUsersStatus } from "../../../store/usersSlice";
import { resetPhotosStatus } from "../../../store/photosSlice";

const SearchBar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const pathname = location.pathname;
    const isUsersRoute = pathname === "/search/users";     
    const dispatch = useAppDispatch();
    const [input, setInput] = useState("");
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleFormSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const encodedInput = encodeURIComponent(input);
        dispatch(setQuery(encodedInput));
        setInput("");
        dispatch(isUsersRoute ? resetUsersStatus() : resetPhotosStatus());
        if (!pathname.includes("/search/")) {
            navigate("/search/photos");
        } else {
            window.scrollTo(0, 0);
        }
        inputRef.current?.blur();
    };

    return (
        <form onSubmit={handleFormSubmit}>
            <input
                type="search"
                id="search-bar"
                placeholder="Search"
                autoComplete="off"
                maxLength={60}
                value={input}
                onChange={(e) => {
                    setInput(e.target.value);
                }}
                ref={inputRef}
                required
            />
        </form>
    );
};

export default SearchBar;
