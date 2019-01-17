// Ensure that everything is loaded on the DOM before starting any JS
document.addEventListener('DOMContentLoaded', init)

// setting the baseURL as the pups API
const baseURL = `http://localhost:3000/pups`
const dogBar = document.querySelector('#dog-bar')

function init(event){
  const filterDogsButton = document.querySelector('#good-dog-filter')
  filterDogsButton.addEventListener('click', toggleFilterDogs)
  getDogs().then(addAllDogsToDogBar)
}

function toggleFilterDogs(){
  const filterDogsButton = document.querySelector('#good-dog-filter')
  if (filterDogsButton.innerText.includes("OFF")){
    filterDogsButton.innerText = "Filter good dogs: ON"
    updateDogBar()
  }
  else {
    filterDogsButton.innerText = "Filter good dogs: OFF"
    updateDogBar()
  }
}

function addAllDogsToDogBar(dogArray, filter = false){
  const dogBar = document.querySelector('#dog-bar')
  dogBar.innerHTML = ""
  if (filter) {
    dogArray.filter(dog => dog.isGoodDog).forEach(addDogSpanToDogBar)
  } else {
    dogArray.forEach(addDogSpanToDogBar)
  }
}

function addDogSpanToDogBar(dog){
  const dogSpan = document.createElement('span')
    dogSpan.innerText = dog.name
    dogSpan.dataset.id = dog.id

  dogSpan.addEventListener('click', onDogSpanClick)
  dogBar.append(dogSpan)
}

function onDogSpanClick(event){
  getSingleDog(event.target.dataset.id)
  .then(addDogInfoToPage)
}

function addDogInfoToPage(dog){
  const dogInfo = document.querySelector('#dog-info')
  dogInfo.innerHTML = ""

  const dogImg = document.createElement('img')
  dogImg.src = dog.image

  const dogTitle = document.createElement('h2')
  dogTitle.innerText = dog.name

  const dogButton = document.createElement('button')
  dogButton.innerText = dog.isGoodDog ? "Good Dog" : "Bad Dog"
  dogButton.dataset.id = dog.id
  dogButton.addEventListener('click', onGoodDogButtonClick)

  dogInfo.append(dogImg, dogTitle, dogButton)
 }

function onGoodDogButtonClick(event){
  let newValue
  if (event.target.innerText.includes("Good ")){
    event.target.innerText = "Bad Dog"
    newValue = false
  }
  else {
    event.target.innerText = "Good Dog"
    newValue = true
  }
  toggleGoodDog(event.target.dataset.id, newValue).then(updateDogBar)
}

function updateDogBar(){
  const filterDogsButton = document.querySelector('#good-dog-filter')
  if (filterDogsButton.innerText.includes("OFF")){
    getDogs().then(dogArray => addAllDogsToDogBar(dogArray))
  }
  else {
    getDogs().then(dogArray => addAllDogsToDogBar(dogArray, true))
  }
}

/*
  API CALL SECTION STARTS HERE
*/
function getDogs(){
  return fetch(baseURL)
  .then(response => response.json())
}

function getSingleDog(id){
  return fetch(baseURL + `/${id}`)
  .then(response => response.json())
}

function toggleGoodDog(id, newValue){
  const options = {
    method: "PATCH",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      isGoodDog: newValue
    })
  }
  return fetch(baseURL + `/${id}`, options)
  .then(res => res.json())
}
