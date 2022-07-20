import React from "react";

const Search = ({ search, setSearch }) => {
    return (
        <span className="search">
            <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="search">Search</label>
                <input
                    id="search"
                    type="text"
                    placeholder="Post Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                ></input>
            </form>
        </span>
    );
};

export default Search;
