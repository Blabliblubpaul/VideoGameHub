import { igdbAccess } from "../../../../app/utils"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export default function CategoryPreview({title, query}) {
    const [games_, setGames_] = useState([])

    let fullQuery = "fields *,cover.*; " + query

    useEffect(() => {
        async function fetchGames() {
            const games = await igdbAccess("games", fullQuery)
            setGames_(games)
        }

        fetchGames()
    }, [fullQuery])

    return (
        <div className="categoryPreview">
            <h2 className="categoryHeader">{title}</h2>
            <div className="categoryItems">
                <CreateItems games={games_}/>
            </div>
        </div>
    )
}

function CreateItems({games}) {
    return games.map((x, index) => <CreateItem game={x} key={index} />)
}

function CreateItem({game}) {
    return (
        <div className="categoryItem">
            <Link to={"/inspect?id=" + game.id}><h4 className="categoryItemHeader">{game.name}</h4></Link>
            <img src={game.cover ? game.cover.url : null} alt={"Not available."}></img>
            <p>{"Rating: " + Math.round(game.rating)}</p>
        </div>
    )
}