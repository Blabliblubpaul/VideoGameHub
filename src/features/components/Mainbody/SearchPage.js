import { useSearchParams } from "react-router-dom"
import { igdbAccess } from "../../../app/utils"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export default function HomePage() {
    const [searchPrams] = useSearchParams()
    const [games_, setGames_] = useState([])

    let query = searchPrams.get("query").replace("%amp", "&")

    useEffect(() => {
        async function fetchGames() {
            const games = await igdbAccess("games", query)
            setGames_(games)
        }

        fetchGames()
    }, [searchPrams, query])

    return (
        <div>
            <h1>Search</h1>
            <CreateItems games={games_}/>
        </div>
    )
}

function CreateItems({games}) {
    return games.map((x, index) => <CreateItem game={x} key={index} />)
}

function CreateItem({game}) {
    return (
        <div id="item">
            <Link to={"/inspect?id=" + game.id}><h4 className="categoryItemHeader">{game.name}</h4></Link>
            <h2>{"ID: " + game.id}</h2>
            <img src={game.cover ? game.cover.url : null} alt={"Not available."}></img>
            <h3>{"Rating: " + game.rating}</h3>
            <h4>{"Number of ratings: " + game.rating_count}</h4>
            <h4>{"Total ratings: " + game.total_rating_count}</h4>
            <h3>{game.summary}</h3>
        </div>
    )
}