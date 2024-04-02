const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const axios = require("axios")
const { igdbGetGames, igdbGetFullGames, igdbGetCovers, igdbGet } = require("./igdbAccess")

const app = express()
const port = 3001

const client_id = "uqb090mlvhhwgg8r9x671t1uh45c59"
const client_secret = "73boubzvqel3vo3tp7kvw7h9z0paab"

let authorized = false
let authData = null
let authorizationTime = null

app.use(cors({
    allowedHeaders: ["Content-Type"]
}))

app.use(bodyParser.json())

app.listen(port, () => {
    console.log("Server is running on http://localhost:" + port)
})

app.post("/igdbaccess", async (req, res) => {
    const { endpoint, filter } = req.body;
    console.log('Endpoint:', endpoint);
    console.log('Filter:', filter);

    let fetch
    let specifyEndpoint = false

    switch (endpoint) {
        case "games":
            fetch = igdbGetGames
            break

        case "fullGames":
            fetch = igdbGetFullGames
            break

        case "covers":
            fetch = igdbGetCovers
            break

        default:
            fetch = igdbGet
            specifyEndpoint = true
            break
    }

    await authorize()

    try {
        if (specifyEndpoint) {
            const response = await fetch(client_id, authData.access_token, endpoint, filter)
            res.json(response)
        }
        else {
            const response = await fetch(client_id, authData.access_token, filter)
            res.json(response)
        }
    }
    catch (error) {
        console.error("API Error: " + error.message)
        res.status(500).json({error: "Internal Server Error"})
    }
})

async function authorize() {
    let success = false
    let result

    console.log("Checking for existing authorization...")

    currentTime = new Date().getTime()

    // Subtract 1000 from expires_in as a small buffer
    if (authData == null || (currentTime - authorizationTime > authData.expires_in - 1000)) {
        console.log("No valid authoriazion found")
    }
    else {
        console.log("Valid authorization found.")
        console.log("access_token: " + authData.access_token)
        console.log("expires_in: " + authData.expires_in)
        console.log("token_type: " + authData.token_type)

        return
    }

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

    authorizationTime = new Date().getTime()
}