const axios = require("axios")

async function igdbGetFullGames(client_id, access_token, filter) {
    let games = await igdbGetGames(client_id, access_token, filter)

    let coverIds = games.map((x) => x.cover)
    let coverFilter = "where id = " + coverIds

    console.log(coverFilter)
}

async function igdbGetGames(client_id, access_token, filter) {
    const result = await axios.post("https://api.igdb.com/v4/games", filter,
        {
        headers: {
            "Client-ID": client_id,
            "Authorization": "Bearer " + access_token
        }
    });

    return result.data
}

async function igdbGetCovers(filter) {

}

module.exports = {
    igdbGetGames: igdbGetGames
}