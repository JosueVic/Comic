import CLIENT from "./modules/client.js"
import STORAGE from "./modules/storage.js";
import DOM from "./modules/dom.js";
import { comicRender } from "./modules/render.js";

async function main(){
    //Obtenemos el ID dentro del storage
    const product_id = STORAGE.get("product_id")
    //obtener la data del servido id
    const data = await CLIENT.sendRequest("comics/"+product_id)

    const comic = comicRender(data)
    console.log("informacion: ",comic)

    DOM.find("#comic_image").src = comic.image;
    DOM.find("#title").textContent = comic.title;     //busqueda dentro del card
    DOM.find("#price").textContent = "$" + comic.price.sale;
    DOM.find("#format").textContent = comic.format;
    DOM.find("#description").innerHTML = comic.description;
    DOM.find("#stock").innerHTML = comic.stock
    
    comic.creators.forEach(({name,role})=>{
        const li = DOM.create("li")
        li.textContent = `${name} - ${role}`
        DOM.find("#creators").appendChild(li);
    })

    DOM.find("#btn_add").addEventListener("clicl", ()=>{
        const {id, title, price: {sale}}= comic;
        STORAGE.setArray(`card`, {id,title,sale});
        window.location.href= "index.html"
    })
}
main()