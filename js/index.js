
//form to create a new monster- fields for name, age, description + 'create MOnster' button
//on button click- new monster will be saved to the api 
//bottom of list- show button when clicked to load next 50 monsters



document.addEventListener("DOMContentLoaded", () => {
    homePageLoad()
    createForm()
   document.querySelector("#monster-form").addEventListener('submit', () => {
       event.preventDefault()
       let name = document.querySelector('#monster-name').value
       let age = document.querySelector('#monster-age').value
       let description = document.querySelector('#monster-description').value
       
       monsterObj = {
           name,
           age,
           description
       }
       console.log(monsterObj)
       postNewMonster({name, age, description})
   })
})


const createForm = () => {
    let formContainer = document.querySelector("#create-monster")
    let form = document.createElement('form')
    form.id = 'monster-form'
    let nameInput = document.createElement('input')
    let nameLabel = document.createElement('label')
    let ageInput = document.createElement('input')
    let ageLabel = document.createElement('label')
    let descriptionInput = document.createElement('input')
    let descriptionLabel = document.createElement('label')
    let h2 = document.createElement('h2')
    let button = document.createElement('button')
    button.innerText = "Submit"
    nameInput.id = "monster-name"
    ageInput.id = "monster-age"
    descriptionInput.id = "monster-description"

    h2.innerText = 'Create Monster'
    nameLabel.innerText = 'name'
    ageLabel.innerText = 'age'
    descriptionLabel.innerText = 'description'
    
    form.append(nameInput, nameLabel, ageInput, ageLabel, descriptionInput, descriptionLabel, button)
    formContainer.append(h2, form)

}

const postNewMonster = ({name, age, description}) => {
    fetch('http://localhost:3000/monsters', {
        method: "POST", 
        headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
              },
        body: JSON.stringify({name, age, description})
            })
            .then(resp => resp.json())
            .then(monster =>  addOneMonster(monster))
            event.target.clear
    }


function homePageLoad() {

    
   // console.log(monsterContainer)
    fetch ("http://localhost:3000/monsters/?_limit=50&_page=0")
    .then(response => response.json())
    .then(monsterData => {
            monsterData.forEach((monster) => {
                
               addOneMonster(monster)
                //console.log(monsterContainer)

            })

        
    }) 
}
const addOneMonster = (monster) => {
    let monsterContainer = document.querySelector('#monster-container')
    let card = document.createElement('div')
    let name = document.createElement('h2')
    let age = document.createElement('h4')
    let description = document.createElement('p')
    name.innerText = monster.name
    age.innerText = `Age: ${monster.age}`
    description.innerText = `Bio: ${monster.description}`
    card.append(name, age, description)
    monsterContainer.append(card)
}


// function createMonsterForm (){}

//TO REVIEW: creating/selecting dom elements, callback, POST, object deconstruction