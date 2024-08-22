import { useState } from "react";

import './Search.css';
import getSuggestions from "../api/getSuggestions";
import { Location } from "../types";

export default function Search({ submit }: {
    submit: (location: Location) => void
}) {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState<Location[]>([]);

    enum State { LOADING, ERROR, DONE };
    const [state, setState] = useState(State.DONE);

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
        setState(State.LOADING);
        getSuggestions(e.target.value)
            .then(suggestions => {
                setSuggestions(suggestions);
                setState(State.DONE);
            })
            .catch(() => {
                setState(State.ERROR);
            });
    }

    const handleSubmit = (suggestion: Location) => {
        submit(suggestion);
        setQuery(suggestion.name);
        setSuggestions([]);
    }

    const clearQuery = () => {
        setQuery('');
        setSuggestions([]);
        setState(State.DONE);
    }

    return <div className="search">
        <div className="search__header">
            <span className="search__icon material-symbols-outlined">search</span>
            <input
                type="text"
                placeholder="City Name"
                value={query}
                onChange={handleInput}
            />
            {query && <span className="search__clear material-symbols-outlined" onClick={clearQuery}>close</span>}
        </div>
        {suggestions.length > 0 && <div className="divider"></div>}
        {state === State.LOADING && <div className="loading message">Loading...</div>}
        {state === State.ERROR && <div className="error message">Something went wrong. <a>Try again</a></div>}
        {state === State.DONE && suggestions.length > 0 && <ul>
            {suggestions.map(suggestion => <li key={suggestion.id} onClick={() => handleSubmit(suggestion)}>
                <div className="search__suggestion-overlay"></div>
                <div className="search__suggestion-content">
                    <div className="search__city">{suggestion.name}</div>
                    <div className="search__country">{suggestion.country}</div>
                </div>
            </li>)}
        </ul>}
    </div>
}
