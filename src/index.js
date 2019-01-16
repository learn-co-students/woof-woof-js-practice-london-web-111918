const dogBar = document.querySelector('#dog-bar')
const dogInfo = document.querySelector('#dog-info')
const toggleBtn = document.querySelector('#good-dog-filter')
const dogBtn = document.createElement("button")

function apiRequest() {
  return fetch('http://localhost:3000/pups')
  .then(res => res.json())
}

function allDogs() {
  apiRequest().then(data => {
    data.forEach(pup => {
      dogButtons(pup)
    })
  })
}

function goodDogs() {
  apiRequest().then(data => {
    data.forEach(pup => {
      if (pup.isGoodDog) {
        dogButtons(pup)
      }
    })
  })
}

function dogButtons(pup) {
  const dogSpan = document.createElement('span')
  dogSpan.innerHTML += pup.name
  dogSpan.addEventListener('click', () => renderDog(pup))
  dogBar.appendChild(dogSpan)
}

function goodBoyfilter() {
  dogBar.innerHTML = ""
  if (toggleBtn.innerText === 'Filter good dogs: ON') {
    toggleBtn.innerText = 'Filter good dogs: OFF'
    allDogs()
  } else if (toggleBtn.innerText === 'Filter good dogs: OFF') {
    toggleBtn.innerText = 'Filter good dogs: ON'
    goodDogs()
  }
}

function renderDog(dog) {
  dogInfo.innerHTML = `
    <img src="${dog.image}"></img>
    <h2>${dog.name}</h2>
  `
  dog.isGoodDog ? dogBtn.innerText = "Bad Dog" : dogBtn.innerText = "Good Dog"
  dogBtn.addEventListener('click', () => isGoodBoy(dog))
  dogInfo.appendChild(dogBtn)
}

function isGoodBoy(dog) {
  if (dog.isGoodDog) {
    dogBtn.innerText = "Good Dog"
    dog.isGoodDog = false
  } else {
    dogBtn.innerText = "Bad Dog"
    dog.isGoodDog = true
  }
  updateDog(dog)
}

function updateDog(dog) {
  fetch(`http://localhost:3000/pups/${dog.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({isGoodDog: dog.isGoodDog})
  })
}

allDogs()
toggleBtn.addEventListener('click', goodBoyfilter)
