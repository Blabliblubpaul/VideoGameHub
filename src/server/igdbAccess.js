const axios = require("axios")

async function igdbGetFullGames(client_id, access_token, filter) {
    const games = await igdbGetGames(client_id, access_token, filter)

    let coverIds = games.map((x) => x.cover)
    coverIds = coverIds.find((x) => !!x)
    let coverFilter = "fields: url; where image_id = (" + coverIds + ");"

    console.log(coverFilter)

    const covers = await igdbGetCovers(client_id, access_token, coverFilter)

    console.log(covers)
    if (covers) {
        covers.forEach(cover => {
            let game = games.find((x) => x.cover == cover.image_id)
            if (game) {
                game.coverUrl = cover.url
            }
        });
    }

    return games
}

async function igdbGetGames(client_id, access_token, filter) {
    const result = await axios.post("https://api.igdb.com/v4/games", filter, {
        headers: {
            "Client-ID": client_id,
            "Authorization": "Bearer " + access_token
        }
    });

    return result.data
}

async function igdbGetCovers(client_id, access_token, filter) {
    const result = await axios.post("https://api.igdb.com/v4/covers", filter, {
        headers: {
            "Client-ID": client_id,
            "Authorization": "Bearer " + access_token
        }
    });

    return result.data
}

async function igdbGet(client_id, access_token, endpoint, filter) {
    const result = await axios.post("https://api.igdb.com/v4/" + endpoint, filter, {
        headers: {
            "Client-ID": client_id,
            "Authorization": "Bearer " + access_token
        }
    });

    return result.data
}

module.exports = {
    igdbGetGames: igdbGetGames,
    igdbGetFullGames: igdbGetFullGames,
    igdbGetCovers: igdbGetCovers,
    igdbGet: igdbGet
}