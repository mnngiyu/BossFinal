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

// attraper une id de promo
async function getPromosbyId(id) {
    const response = await fetch(urlBase + "promos/" + id, {
        method: "GET",
        headers: {
            Authorization: "Bearer " + token
        }
    });

    const data = await response.json();
    const startDate = data.startDate ? formatDate(data.startDate) : '';
    const endDate = data.endDate ? formatDate(data.endDate) : '';

    document.querySelector('#modifier-promo-name').value = data.name;
    document.querySelector('#modifier-promo-start').value = startDate;
    document.querySelector('#modifier-promo-end').value = endDate;
    document.querySelector('#modifier-promo-description').value = data.formationDescription;

    return data;
}

// affiche une promo
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
    const descriptionPromo = document.createElement('h3')
    descriptionPromo.innerHTML = promo.formationDescription
    card.appendChild(descriptionPromo)

    // afficher date de fin
    const startPromo = document.createElement('p')
    startPromo.innerHTML = formatDate(promo.startDate)
    card.appendChild(startPromo)

    // afficher date de début
    const endPromo = document.createElement('p')
    endPromo.innerHTML = formatDate(promo.endDate)
    card.appendChild(endPromo)

    //bouton supprimer
    const buttonDelete = document.createElement('button')
    buttonDelete.id = "deletePromo"
    buttonDelete.innerHTML = `<i class="fa-solid fa-trash"></i>`
    buttonDelete.addEventListener('click', () => {

        deletePromos(promo._id, card)
    })
    card.appendChild(buttonDelete)

    //bouton modifier
    const buttonUpdate = document.createElement('button')
    buttonUpdate.id = "updatePromo"
    buttonUpdate.innerHTML = `<i class="fa-solid fa-pencil"></i>`
    buttonUpdate.addEventListener('click', (e) => {

        e.preventDefault()
        const modifier = document.querySelector('#modifier-container')
        const formModifier = document.querySelector('#modifier-form-container')

        modifier.style.display = "flex"
        formModifier.style.background = "#F2CEA2"
        getPromosbyId(promo._id)

        const modifierForm = document.querySelector('#modifier-container');
        modifierForm.addEventListener('submit', async (e) => {
            e.preventDefault()
            const formModifier = document.querySelector('#modifier-form-container')
            formModifier.style.background = "#98d68b"
            await updatePromo(promo._id)
            reloadPage();
        });
    })


    card.appendChild(buttonUpdate)

    //voir le détails
    const details = document.createElement('a')
    details.innerHTML = 'voir le détail'
    details.href = `./student.html?id=${promo._id}`
    card.append(details)
    details.addEventListener("click", () => {
        localStorage.setItem('idPromo', promo._id)
    })
}

// affiche toutes les promos
async function displayAllPromos() {
    const promos = await getPromos()
    promos.forEach(promo => {
        displayPromos(promo)
    });
}

/// soumettre le formulaire, method post inside
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
            "Content-Type": "Application/json"
        },
        body: JSON.stringify(data)
    })
    if (response.ok) {
        const promo = await response.json()
        displayPromos(promo.data)
    }
    clearForm()
})

// function modifier une promo
async function updatePromo(id) {
    let data = {
        name: document.querySelector('#modifier-promo-name').value,
        startDate: formatDate(document.querySelector('#modifier-promo-start').value),
        endDate: formatDate(document.querySelector('#modifier-promo-end').value),
        formationDescription: document.querySelector('#modifier-promo-description').value,
    };

    const response = await fetch(urlBase + "promos/" + id, {
        method: "PUT",
        headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })

    if (response.ok) {
        
        console.log('Promo mise à jour avec succès');
    }
}

// fermer la modale modifier
document.querySelector('#close').addEventListener('click', () => {
    const modifier = document.querySelector('#modifier-container')
    const formModifier = document.querySelector('#modifier-form-container')
    modifier.style.display = "none"
    formModifier.style.background = "red"
})

// supprime une promo
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

// formater la date
function formatDate(isoDateString) {
    const date = new Date(isoDateString)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
}

// Nettoie le formulaire
function clearForm() {
    const form = document.getElementById('promoForm');
    form.reset();
}


function reloadPage() {
    location.reload();
}
displayAllPromos()