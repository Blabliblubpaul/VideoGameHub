import { useSearchParams } from "react-router-dom"
import { igdbAccess } from "../../../app/utils"
import { useEffect, useState } from "react"

// const games = await igdbAccess("games", "fields: name, summary, rating; limit: 50; where rating > 50;")

export default function HomePage() {
    const [searchPrams] = useSearchParams()
    const [games_, setGames_] = useState([])

    let query = searchPrams.get("query")

    useEffect(() => {
        async function fetchGames() {
            const games = await igdbAccess("games", query)
            setGames_(games)
        }

        fetchGames()
    }, [searchPrams])

    return (
        <div>
            <h1>HomePage</h1>
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
            <h1>{game.name}</h1>
            <h3>{"Rating: " + game.rating}</h3>
            <h4>{"Number of ratings: " + game.rating_count}</h4>
            <h4>{"Total ratings: " + game.total_rating_count}</h4>
            <h3>{game.summary}</h3>
            <img src={game.cover ? game.cover.url : null} alt={"Image at not available."}></img>
        </div>
    )
}