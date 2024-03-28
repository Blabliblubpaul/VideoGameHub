import axios from "axios"

export function isStringEmpty(s) {
    return (!s || !s.trim())
}

export async function igdbAccess(endpoint, filter) {
    try {
        const result = await axios.post("http://localhost:3001/igdbaccess", {
            endpoint: endpoint,
            filter: filter
        })

        return result.data
    }
    catch {
        return []
    }
}