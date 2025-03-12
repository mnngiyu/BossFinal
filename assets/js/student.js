const token = "ef562880-cbd5-4eec-adfb-693136c939d1";
const urlBase = "http://146.59.242.125:3009/";
const idpromo = getId()

function getId(){
    let params = new URLSearchParams(document.location.search);
    let id = params.get("id")
    return id
}

async function getPromoDetails() {
    const response = await fetch(urlBase + "promos/" + idpromo, {
        method: "GET",
        headers: {
            Authorization: "Bearer " + token
        }
    });
    const data = await response.json();
    console.log(data);
    
    return data;
}

getPromoDetails()