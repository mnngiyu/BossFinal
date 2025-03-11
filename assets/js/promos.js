const token = "ef562880-cbd5-4eec-adfb-693136c939d1"
const urlBase = "http://146.59.242.125:3009/"
const addForm = document.querySelector('form')

async function getPromos() {
    const response = await fetch(urlBase + "promos", {
        method: "GET",
        headers: {
            Authorization: "Bearer " + token
        }
    })
    const data = await response.json()
    return data
}

addForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    let data = {
        name: document.querySelector('#promo-name').value,
        startDate: document.querySelector('#promo-start').value,
        endDate: document.querySelector('#promo-end').value,
        formationDescription: document.querySelector('#promo-description').value,
    }
    data = JSON.stringify(data)
    const response = await fetch(urlBase + "promos", {
        method: "POST",
        headers: {
            Authorization: "Bearer " + token,
            "Content-type": "Application/json"
        },
        body: data
    })
    displayPromos(promo)
})

async function displayAllPromos() {
    const promos = await getPromos()
    promos.forEach(promo => {
        displayPromos(promo)
    });

}


function displayPromos(promo) {
    const response = fetch(urlBase) + "promos" +
    const displayCards = document.querySelector('display-cards')
    console.log(response);

    // affiche la div card
    const card = document.createElement('div')
    card.classList.add('cards')


    // afficher le nom de la promo
    const namePromo = document.createElement('h2')


    // afficher le descriptif
    const descriptionPromo = document.createElement('h2')

    // afficher date de fin
    const startPromo = document.createElement('p')

    // afficher date de début
    const endPromo = document.createElement('p')
}

displayAllPromos()
