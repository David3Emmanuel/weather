import { useState } from 'react'
import './App.css'
import countriesMap from './api/countries.json'

function App() {
  const countries = Object.keys(countriesMap);
  const [country, setCountry] = useState(countries[0]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }

  return <div className='app'>
    <h1>Weather</h1>
    <form onSubmit={handleSubmit}>
      <select value={country} onChange={e => setCountry(e.target.value)}>
        {countries.map((country, i) => <option key={i} value={country}>{country}</option> )}
      </select>
      <button type='submit'>Submit</button>
    </form>
  </div>
}

export default App
