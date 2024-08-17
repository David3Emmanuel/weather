import { useState } from 'react'
import './App.css'
import countriesMap from './api/countries.json'
import { fetchWeatherData } from './api/country';
import ReportData from './components/ReportData';

function App() {
  const countries = Object.keys(countriesMap);
  const [country, setCountry] = useState(countries[0] as keyof typeof countriesMap);
  const [report, setReport] = useState<Object | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setReport(null);
    const { lat, long } = countriesMap[country];
    try {
      const data = await fetchWeatherData(lat, long);
      setReport(data);
    } catch (e) {
      setReport({ "Something went wrong.": '' })
    }
  }

  return <div className='app'>
    <h1>Weather Report</h1>
    <form onSubmit={handleSubmit}>
      <select value={country} onChange={e => setCountry(e.target.value as keyof typeof countriesMap)}>
        {countries.map((country, i) => <option key={i} value={country}>{country}</option>)}
      </select>
      <button type='submit'>Submit</button>
    </form>

    {report && Object.entries(report).map(([key, value], i) => <ReportData key={i} reportKey={key} value={value} />)}
  </div>
}

export default App
