const APIKEY = "1bff38ec408bb51714640fc05610b005"
const HASH = "0f110776353a8bb4d1d5702be7b11e01" //md5 (ts + privat kay + public kay) encriptada
const TS = "1"
const URL = "https://gateway.marvel.com/v1/public/"
//const URL = "data/"
 
async function sendRequest(direccion){
        const response = await fetch(
            URL + direccion + "?ts=" + TS + "&apikey=" + APIKEY + "&hash=" + HASH )
        if (!response.ok) throw Error(response.statusText)
        const json = await response.json()
        return json.data.results
    }

async function sendRequestLocal(direccion){    
    const response= await fetch(URL+direccion+".json")
    if (!response.ok) throw Error(response.statusText)
    const json = await response.json()
    return json.data.results    
}
async function main(){
    const comics = await sendRequest("comics")
    console.log(comics)
    
    const container = document.getElementById("card_container")
    comics.forEach((comic)=>{
        const template = document.querySelector("#card_template")
        const clone = template.cloneNode(true)
        clone.removeAttribute("style");

        if(comic.thumbnail.path.includes("image_note_avaliable")){
            return
        }
        clone.querySelector(".comic_img")
        .setAttribute("src", `${comic.thumbnail.path}.${comic.thumbnail.extension}`)

        clone.querySelector(".comic_name").textContent = comic.title

        let original_price = comic.prices[0].price == 0?2.99: comic.prices[0].price

        clone.querySelector(".comic_ori_price").textContent = original_price

        clone.querySelector(".comic_price").textContent = (original_price - 2.0).toFixed(2)

        clone.querySelector(".comic_button").addEventListener("click", ()=>{
            localStorage.setItem("product_id", comic.id)
            window.location.href = "product.html"
            /* window.open("/product.html", "_blank") */
        })
        container.appendChild(clone)
    }
    )
}
main()