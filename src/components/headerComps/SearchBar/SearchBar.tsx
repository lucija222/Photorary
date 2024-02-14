import "./SearchBar.scss";
import { FormEventHandler, useRef, useState } from "react";
import { useAppDispatch } from "../../../store/hooks";
import { setQuery } from "../../../store/urlSlice";
import { useLocation, useNavigate } from "react-router-dom";

const SearchBar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isUsersRoute = location.pathname === "/search/users";     
    const dispatch = useAppDispatch();
    const [input, setInput] = useState("");
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleFormSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const encodedInput = encodeURIComponent(input);
        dispatch(setQuery(encodedInput));
        setInput("");
        navigate(isUsersRoute ? "/search/users" : "/search/photos");
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
