import { useSearchParams } from "react-router-dom"
import { igdbAccess } from "../../../../app/utils"
import { useEffect, useState } from "react"

const fields = [
    "*",
    "cover.url",
    "age_ratings.*",
    "bundles.name",
    "collection.name",
    "dlcs.name",
    "expanded_games.name",
    "expansions.name",
    "forks.name",
    "franchise.name",
    "franchises.name",
    "game_engines.name"
]

export default function GamePage() {
    const [searchPrams] = useSearchParams()
    const [game, setGame] = useState()
    const [notFound, setNotFound] = useState(false)

    let id = searchPrams.get("id")

    let query = "fields "

    for (let i = 0; i < fields.length; i++) {
        if (i === fields.length - 1) {
            query += fields[i]
        }
        else {
            query += fields[i] + ", "
        }
    }

    query += "; where id = " + id + ";"

    useEffect(() => {
        async function fetchGames() {
            const games = await igdbAccess("games", query)

            if (games[0] != null) {
                setGame(games[0])
            }
            else {
                setNotFound(true)
            }
        }

        fetchGames()
    }, [searchPrams, query])

    if (game == null) {
        return <h1>Loading...</h1>
    }
    else if (notFound) {
        return <h1>Game not found.</h1>
    }
    else {
        return (
            <div id="GamePage">
                <h1 id="GamePageHeader">{game.name}</h1>
                <img id="GamePageCover" src={game.cover ? game.cover.url : null} alt={"Not available."}></img>
                <p>{"Rating: " + Math.round(game.rating)}</p>
                <p>{"Age Rating (PEGI): " + GetPegiRating(game.age_ratings)}</p>
                Artworks
                <p>{"Bundles: " + GetBundles(game.bundles)}</p>
                <p>{"Collection: " + (game.collection != undefined ? game.collection.name : "N/A")}</p>
                <p>{"DLCs: " + GetDlcs(game.dlcs)}</p>
                <p>{"Expanded Games: " + GetExpandedGames(game.expanded_games)}</p>
                <p>{"Expansions: " + GetExpansions(game.expansions)}</p>
                <p>{"Release: " + game.first_release_date}</p>
                <p>{"Forks: " + GetForks(game.forks)}</p>
                <p>{"Franchise: " + (game.franchise != undefined ? game.franchise.name : "N/A")}</p>
                <p>{"Franchises: " + GetFranchises(game.franchises)}</p>
                <p>{"Game Engines: " + GetEngines(game.game_engines)}</p>
            </div>
        )
    }
}

function GetPegiRating(ratings) {
    let rating = ratings.find((x) => x.category === 2)

    if (rating != null) {
        return rating.rating
    }
    else {
        return "N/A"
    }
}

function GetBundles(bundles) {
    if (bundles == null) {
        return "N/A"
    }
    else {
        return bundles.map((x, index) => {
            // An ungly way to get a space after each comma in the list
            if (index === 0) {
                return x.name
            }
            else {
                return " " + x.name
            }
        })
    }
}

function GetDlcs(dlcs) {
    if (dlcs == null) {
        return "N/A"
    }
    else {
        return dlcs.map((x, index) => {
            // An ungly way to get a space after each comma in the list
            if (index === 0) {
                return x.name
            }
            else {
                return " " + x.name
            }
        })
    }
}

function GetExpandedGames(exp_games) {
    if (exp_games == null) {
        return "N/A"
    }
    else {
        return exp_games.map((x, index) => {
            // An ungly way to get a space after each comma in the list
            if (index === 0) {
                return x.name
            }
            else {
                return " " + x.name
            }
        })
    }
}

function GetExpansions(expansions) {
    if (expansions == null) {
        return "N/A"
    }
    else {
        return expansions.map((x, index) => {
            // An ungly way to get a space after each comma in the list
            if (index === 0) {
                return x.name
            }
            else {
                return " " + x.name
            }
        })
    }
}

function GetForks(forks) {
    if (forks == null) {
        return "N/A"
    }
    else {
        return forks.map((x, index) => {
            // An ungly way to get a space after each comma in the list
            if (index === 0) {
                return x.name
            }
            else {
                return " " + x.name
            }
        })
    }
}

function GetFranchises(franchises) {
    if (franchises == null) {
        return "N/A"
    }
    else {
        return franchises.map((x, index) => {
            // An ungly way to get a space after each comma in the list
            if (index === 0) {
                return x.name
            }
            else {
                return " " + x.name
            }
        })
    }
}

function GetEngines(engines) {
    if (engines == null) {
        return "N/A"
    }
    else {
        return engines.map((x, index) => {
            // An ungly way to get a space after each comma in the list
            if (index === 0) {
                return x.name
            }
            else {
                return " " + x.name
            }
        })
    }
}