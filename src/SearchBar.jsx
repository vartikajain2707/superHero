import { useState } from "react";
import useSuperheroSearch from "./useSuperheroSearch";
import "./styles.css";

export default function SearchBar({ onSelectHero }) {
    const [query, setQuery] = useState("");
    const { results, loading } = useSuperheroSearch(query);

    const handleSelect = (hero) => {
        setQuery(hero.name);
        onSelectHero(hero);
        setQuery('')
    };

    return (
        <div className="search-container">
            <input
                type="text"
                placeholder="Search Superhero"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="search-input"
            />

            {loading && <div className="loader">Loading...</div>}

            {results.length > 0 && (
                <ul className="dropdown">
                    {results.map((hero) => (
                        <li
                            key={hero.id}
                            onClick={() => {
                                handleSelect(hero);
                            }}
                            className="dropdown-item"
                        >
                            {hero.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
