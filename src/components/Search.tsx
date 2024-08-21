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

    return <div className="search">
        <input
            type="text"
            placeholder="City Name"
            value={query}
            onChange={handleInput}
        />
        {state === State.LOADING && <div className="loading">Loading...</div>}
        {state === State.ERROR && <div className="error">Something went wrong. <a>Try again</a></div>}
        {state === State.DONE && suggestions && <ul>
            {suggestions.map(suggestion => <li key={suggestion.id} onClick={() => handleSubmit(suggestion)}>{suggestion.name}, {suggestion.country}</li>)}
        </ul>}
    </div>
}
