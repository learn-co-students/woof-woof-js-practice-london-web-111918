const dogBarDiv = document.getElementById('dog-bar')
const dogInfo = document.getElementById('dog-info')
const filterDogsButton = document.querySelector("#good-dog-filter")
filterDogsButton.addEventListener("click", toggleFilterDogs)

const state = {
  dogs: [],
  filterGoodDogs: false,
  selectedDog: null
}

function getDogs() {
  return fetch('http://localhost:3000/pups/')
    .then(res => res.json())
}

function toggleFilterDogs(){
  if (filterDogsButton.innerText.includes("OFF")){
    dogBarDiv.innerHTML = ""
    filterDogsButton.innerText = "Filter good dogs: ON"
    insertDogNames(state.dogs.filter(element => element.isGoodDog))
  } else {
    filterDogsButton.innerText = "Filter good dogs: OFF"
    dogBarDiv.innerHTML = ""
    insertDogNames(state.dogs.filter(element => !element.isGoodDog))
  }
}

function insertDogNames(dogs) {
  dogs.forEach(dog => insertDogName(dog))
}

function insertDogName(dog) {
  dogBarDiv.appendChild(createDogSpan(dog))
}

function createDogSpan(dog) {
  dogSpan = document.createElement('span')
  dogSpan.classList.add('dog-span')
  dogSpan.innerText = dog.name
  dogSpan.addEventListener('click', () => insertDogInfo(dog))
  return dogSpan
}

function insertDogInfo(dog) {
  state.selectedDog = dog
  dogInfo.innerHTML = dogInfoHTML(dog)
  const toggleBtn = dogInfo.querySelector('#toggle-dog-btn')
  toggleBtn.addEventListener('click', () => toggleGoodDog(state.selectedDog))
}

function toggleGoodDog(dog) {
  dog.isGoodDog = !dog.isGoodDog
  updateDog(dog)
  insertDogInfo(dog)
}

function updateDog(dog) {
  return fetch(`http://localhost:3000/pups/${dog.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dog)
  }).then(res => res.json())
}

function dogInfoHTML(dog) {
  return `
    <img src='${dog.image}'>
    <h2>${dog.name}</h2>
    <button id='toggle-dog-btn'>${dog.isGoodDog ? 'Good' : 'Bad'} Dog!</button>
  `
}

getDogs()
  .then(dogs => {
    state.dogs = dogs
    insertDogNames(state.dogs)
  })
