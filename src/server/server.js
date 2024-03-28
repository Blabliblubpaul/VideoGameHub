const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const axios = require("axios")
const { igdbGetGames } = require("./igdbAccess")

const app = express()
const port = 3001

const client_id = "uqb090mlvhhwgg8r9x671t1uh45c59"
const client_secret = "39nlisdo1d59wsw3jq7ochso5io9t1"

let authorized = false
let authData = null

app.use(cors({
    allowedHeaders: ["Content-Type"]
}))

app.use(bodyParser.json())

app.listen(port, () => {
    console.log("Server is running on http://localhost:" + port)
})

app.post("/igdbaccess", async (req, res) => {
    await authorize()

    const { endpoint, filter } = req.body;
    console.log('Endpoint:', endpoint);
    console.log('Filter:', filter);

    try {
        const response = await igdbGetGames(client_id, authData.access_token, filter)
        res.json(response)
    }
    catch (error) {
        console.error("API Error: " + error.message)
        res.status(500).json({error: "Internal Server Error"})
    }
})

async function igdbPost(endpoint) {
    if (!authorized) {
        console.log("Client not authorized. Please call authorize() first.")
        return
    }

    const result = await axios.post("https://api.igdb.com/v4/" + endpoint, "fields *;",
        {
        headers: {
            "Client-ID": client_id,
            "Authorization": "Bearer " + authData.access_token
        }
    });

    // console.log(result.data)

    return result.data
}

async function authorize() {
    let success = false
    let result

    console.log("Trying to authorize against igdb...")

    await axios.post("https://id.twitch.tv/oauth2/token", {
            client_id: client_id,
            client_secret: client_secret,
            grant_type: "client_credentials"
        })
        .then (function (response) {
            success = true
            result = response.data
        })
        .catch (function (error) {
            result = error.response.data
        })
        .finally (function () {
            if (success) {
                console.log("Authorization successful.")
                console.log("access_token: " + result.access_token)
                console.log("expires_in: " + result.expires_in)
                console.log("token_type: " + result.token_type)

                authorized = true
                authData = result
            }
            else {
                console.error("Authorization failed.")
                console.error("Error: " + result.status + ": " + result.message)
            }
        });
}