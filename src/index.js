
let dogBar = document.querySelector("#dog-bar")
let dogInfoDiv = document.querySelector("#dog-info")
let goodDogFilter = document.querySelector("#good-dog-filter")
let displayDog
let dogButton

const state = {
  dogs: [],
  selectedDog: null,
  goodDogs: [],
  goodDogFilter: false
}

dogApiCall = (id="") => fetch('http://localhost:3000/pups/' + id).then(resource => resource.json())

renderDog = (dog) => {
  dogBar.innerHTML += `<span data-id="${dog.id}">${dog.name}</span>`
}

renderAllDogs = (dogs) => {
  dogBar.innerHTML = ""
  dogs.forEach(renderDog)
}

getAndRenderAllDogs = () => {
  dogApiCall().then(dogs => {
    state.dogs = dogs
    renderAllDogs(state.dogs)
  })
}

toggleGoodDogBadDog = () => {
  state.selectedDog.isGoodDog = !state.selectedDog.isGoodDog
  if (state.goodDogFilter) renderGoodDogs()
}

getDogButtonText = () => state.selectedDog.isGoodDog ? "Good Dog!" : "Bad Dog!"

updateDogInfo = () => { fetch('http://localhost:3000/pups/' + state.selectedDog.id, {
    method: "PUT",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(state.selectedDog)
  })
}

changeDogInfo = () => {
  toggleGoodDogBadDog()
  dogButton.innerText = getDogButtonText()
  updateDogInfo()
}

renderDogInfo = (event) => {
  state.selectedDog = state.dogs.find(dog => dog.id == event.target.dataset.id)
  dogInfoDiv.innerHTML = `
    <img src=${state.selectedDog.image}>
    <h2>${state.selectedDog.name}</h2>
    <button id="dog-button">${getDogButtonText()}</button>
  `
  dogButton = document.querySelector("#dog-button")
  dogButton.addEventListener('click', changeDogInfo)
}

renderGoodDogs = () => {
  state.goodDogs = state.dogs.filter(dog => dog.isGoodDog)
  dogBar.innerHTML = ""
  state.goodDogs.forEach(renderDog)
}

toggleGoodDogFilter = () => {
  if (state.goodDogFilter) {
    state.goodDogFilter = false
    goodDogFilter.innerText = "Filter good dogs: OFF"
    renderAllDogs(state.dogs)
  } else {
    state.goodDogFilter = true
    goodDogFilter.innerText = "Filter good dogs: ON"
    renderGoodDogs()
  }
}

dogBar.addEventListener("click", renderDogInfo)
goodDogFilter.addEventListener("click", toggleGoodDogFilter)

document.onload = getAndRenderAllDogs()
