import { useNavigate } from "react-router-dom"

import { isStringEmpty } from "../../../app/utils";

export default function Searchbar({}) {
    const navigate = useNavigate();

    function search() {
        let query = document.getElementById("searchBar").value

        if (isStringEmpty(query)) {
            navigate("/")
        }
        else {
            navigate("/?query=" + query)
        }
    }

    function handleEnterKey (e) {
        if(e.key === "Enter"){
            search()
        }
    }

    return (
        <div id="searchComponent">
            <input id="searchBar" className="headerSearchbar" type="text" onKeyDown={(event) => handleEnterKey(event)}></input>
            <button id="searchButton" onClick={search}>Search</button>
        </div>
    )
}