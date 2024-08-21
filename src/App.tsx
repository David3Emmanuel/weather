import Map from "./pages/Map";
import './App.css';
import { useState } from "react";
import { Page } from "./util";

export default function App() {
  const [currentPage, _setCurrentPage] = useState(Page.MAP);

  return <div className="app">
    <Map active={currentPage === Page.MAP} />
  </div>
}
