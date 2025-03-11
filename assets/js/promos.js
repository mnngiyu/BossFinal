const token = "ef562880-cbd5-4eec-adfb-693136c939d1"
const urlBase = "http://146.59.242.125:3009/"
const addForm = document.querySelector('form')


// fonction attraper une promo
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

async function deletePromos(id, el) {
    const response = await fetch(urlBase + "promos/" + id, {
        method: "DELETE",
        headers: {
            Authorization: "Bearer " + token
        }
    })
    if (response.ok) {
        el.remove()
    }
}

/// soumettre le formulaire
addForm.addEventListener('submit', async (e) => {

    e.preventDefault()
    let data = {
        name: document.querySelector('#promo-name').value,
        startDate: document.querySelector('#promo-start').value,
        endDate: document.querySelector('#promo-end').value,
        formationDescription: document.querySelector('#promo-description').value,
    }

    const response = await fetch(urlBase + "promos", {
        method: "POST",
        headers: {
            Authorization: "Bearer " + token,
            "Content-type": "Application/json"
        },
        body: JSON.stringify(data)
    })
    if (response.ok) {
        displayPromos(data)
    }

})

async function displayAllPromos() {
    const promos = await getPromos()
    promos.forEach(promo => {
        displayPromos(promo)
    });
}

function displayPromos(promo) {
    const displayCards = document.querySelector('.display-cards')

    // affiche la div card
    const card = document.createElement('div')
    card.classList.add('cards')
    displayCards.appendChild(card)

    // afficher le nom de la promo
    const namePromo = document.createElement('h2')
    namePromo.innerHTML = promo.name
    card.appendChild(namePromo)

    // afficher le descriptif
    const descriptionPromo = document.createElement('h2')
    descriptionPromo.innerHTML = promo.formationDescription
    card.appendChild(descriptionPromo)

    // afficher date de fin
    const startPromo = document.createElement('p')
    startPromo.innerHTML = promo.startDate
    card.appendChild(startPromo)

    // afficher date de début
    const endPromo = document.createElement('p')
    endPromo.innerHTML = promo.endDate
    card.appendChild(endPromo)

    //bouton supprimer
    const buttonDelete = document.createElement('button')
    buttonDelete.id = "deletePromo"
    buttonDelete.innerHTML = "X"
    buttonDelete.addEventListener('click', () => {
        deletePromos(promo._id, card)
    })
    card.appendChild(buttonDelete)

    //voir le détails
    const details = document.createElement('a')
    details.innerHTML = 'voir le détail'
    details.href = "./student.html"
    card.append(details)

}

displayAllPromos()
