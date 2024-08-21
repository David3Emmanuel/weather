import { useState } from "react";

import './Search.css';

export default function Search({ getSuggestions, submit }: {
    getSuggestions: (city: string) => string[],
    submit: (city: string) => void
}) {
    const [city, setCity] = useState('');
    const [suggestions, setSuggestions] = useState<string[]>([]);

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCity(e.target.value);
        setSuggestions(getSuggestions(e.target.value));
    }

    return <div className="search">
        <input type="text" placeholder="City Name" value={city} onChange={handleInput} />
        <ul className="suggestions">
            {suggestions.map((suggestion, i) => <li key={i} onClick={() => submit(suggestion)}>{suggestion}</li>)}
        </ul>
    </div>
}
