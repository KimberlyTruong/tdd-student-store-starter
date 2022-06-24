import * as React from "react"
import "./Search.css"

export default function Search(props) {
  // passing something into value
  return (
    <div className="search">
      <input type="text" placeholder="Search" id="search-input" value={props.searchTerm} onChange={() => props.handleFiltering()}/>
      <i className="fa-solid fa-magnifying-glass"></i>
    </div>
  )
}

// filter as you type into the search
// if the phrase is in the word
