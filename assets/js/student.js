const token = "ef562880-cbd5-4eec-adfb-693136c939d1";
const urlBase = "http://146.59.242.125:3009/";
const idpromo = getId()
const studentForm = document.querySelector('form')

function getId(){
    let params = new URLSearchParams(document.location.search);
    let id = params.get("id")
    return id
}


//  soumettre le formulaire  POST
studentForm.addEventListener('submit', async (e)=>{

    e.preventDefault()

    const formdata = new FormData()
    formdata.append('firstName', document.querySelector('#prenom').value)            
    formdata.append('lastName',  document.querySelector('#nom').value)
    formdata.append('age', document.querySelector('#age').value)
    formdata.append('avatar', document.querySelector('#avatar').files[0])
    const response = await fetch(urlBase + "promos/" + idpromo + "/students", {
        method: "POST",
        headers: {

            Authorization: "Bearer " + token,
        },
        body: formdata
    })
    if (response.ok) {
        displayStudents(formdata)
    }
    clearForm()
console.log(formdata);

})

// nettoyer le formulaire après soumission
function clearForm() {
    const form = document.getElementById('#studentForm');
    form.reset();
}

// affiche tous les students
async function displayAllStudents() {
    const promo = await getPromo()
    promo.students.forEach(student => {
        displayStudents(student)
    });
}

// fonction attraper un etudiant
async function getPromo() {
    const response = await fetch(urlBase + "promos/" + getId() , {
        method: "GET",
        headers: {
            Authorization: "Bearer " + token
        }
    });    
    const data = await response.json()
console.log(data);

    return data
}

// afficher les etudiants
function displayStudents(student) {
    const displayCards = document.querySelector('#cardsContainer')

    // création de la carte
    const card = document.createElement('div')
    card.classList.add('card')
    displayCards.appendChild(card)

    // afficher l'image
    const img = document.createElement('img')
    img.src = student.avatar
    card.appendChild(img)

    // afficher le nom de l'etudiant
    const name = document.createElement('h2')
    name.textContent = student.firstName + " " + student.lastName
    card.appendChild(name)
    
    // afficher l'age de l'etudiant
    const age = document.createElement('p')
    age.textContent = student.age
    card.appendChild(age)

    // afficher le bouton de suppression
    const deleteButton = document.createElement('button')
    deleteButton.textContent = "Supprimer"
    card.appendChild(deleteButton)
    deleteButton.addEventListener('click', async ()=>{
        const response = await fetch(urlBase + "promos/" + idpromo + "/students/" + student._id, {
            method: "DELETE",
            headers: {
                Authorization: "Bearer " + token
            }
        })
        if (response.ok) {
            card.remove()
        }
    })

    // afficher le bouton de modification
    const updateButton = document.createElement('button')
    updateButton.textContent = "Modifier"
    card.appendChild(updateButton)
    updateButton.addEventListener('click', async ()=>{
        const response = await fetch(urlBase + "promos/" + idpromo + "/students/" + student._id, {
            method: "PUT",
            headers: {
                Authorization: "Bearer " + token
            }
        })
        if (response.ok) {
            card.remove()
        }
    })
}

displayAllStudents()