const dogsUrl = 'http://localhost:3000/pups'

const filterDiv = document.querySelector('#filter-div')
const dogFilterBtn = document.querySelector('.good-dog-filter')
const dogBarDiv = document.querySelector('#dog-bar')
const dogSummary = document.querySelector('#dog-summary-container')
const dogInfoEl = document.querySelector('#dog-info')



const getDogs = () => {
  return fetch(dogsUrl)
    .then(resp => resp.json())
      .then(dogData => {
        renderDogs(dogData)
        state.dogs = dogData
      })
}

state = {
  dogs: [],
  dogFilter: false
}

const renderDog = (dog) => {
  const dogSpanEl = document.createElement('span')
  dogSpanEl.innerHTML = `${dog.name}`
  dogSpanEl.dataset.id = dog.id
  dogBarDiv.append(dogSpanEl)
  dogSpanEl.addEventListener("click", dogSpanClick)
}

const renderDogs = (dogs) => {
  dogs.forEach(dog => renderDog(dog))
}

const renderBigDog = (dog) => {
  let isGoodDog = dog.isGoodDog
  if (isGoodDog){
    isGoodDog = "Good Dog!"}
  else {
    isGoodDog = "Bad Dog!"
  }
  dogInfoEl.innerHTML = `<h2>${dog.name}</h2>
  <img src=${dog.image} </img>
  <button data-id=${dog.id}>${isGoodDog}</button>
  `
  dogInfoEl.addEventListener("click", dogButtonClick)
}

const dogSpanClick = (event) => {
  dogId = event.target.dataset.id
  selectedDog = state.dogs.find(dog => dog.id == dogId)
  renderBigDog(selectedDog)
}

const dogButtonClick = (event) => {
  event.target.dataset.id
  selectedDog = state.dogs.find(dog => dog.id == dogId)
  if (selectedDog.isGoodDog){
    selectedDog.isGoodDog = false
  }
  else {selectedDog.isGoodDog = true
  }
  dogInfoEl.innerHTML = ""
  renderBigDog(selectedDog)
  dogPatchDB(selectedDog)
}


const filterDogs = event => {
  state.dogFilter = !state.dogFilter
    if (state.dogFilter){
      dogFilterBtn.innerText = "Filter Good Dogs: Off"
      goodDogs = state.dogs.filter(dog => dog.isGoodDog)
      dogBarDiv.innerHTML = ""
      renderDogs(goodDogs)
    }
    else {
      dogFilterBtn.innerText = "Filter Good Dogs: On"
      badDogs = state.dogs.filter(dog => !dog.isBadDog)
      dogBarDiv.innerHTML = ""
      renderDogs(badDogs)
    }
}

dogFilterBtn.addEventListener("click", filterDogs)

const dogPatchDB = dog => {
  return fetch(`http://localhost:3000/pups/${dog.id}`, {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(dog)
  }).then(resp => resp.json())
}


getDogs()
