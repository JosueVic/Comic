const APIKEY = "1bff38ec408bb51714640fc05610b005"
const HASH = "0f110776353a8bb4d1d5702be7b11e01" //md5 (ts + privat kay + public kay) encriptada
const TS = "1"
const URL = "https://gateway.marvel.com/v1/public/"
//const URL = "../data"

const CLIENT = {
    sendRequest: async(path) => {
        const response = await fetch(
            URL + path + "?ts=" + TS + "&apikey=" + APIKEY + "&hash=" + HASH )
        if (!response.ok) throw Error(response.statusText)
        const json = await response.json()
        return json.data.results
    },
    sendRequestLocal: async(path)=>{
        const response= await fetch(URL+path+".json")
        if (!response.ok) throw Error(response.statusText)
        const json = await response.json()
        return json.data.results
    }
}
export default CLIENT
