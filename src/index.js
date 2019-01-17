const dogBarFilterToggleBtn = document.querySelector('#good-dog-filter')
const dogBarEl = document.querySelector('#dog-bar')
const dogContainer = document.querySelector('#dog-summary-container')

const state = {
  dogs: [],
  isGoodDogFilter: false,
  isThisDogGood: null,
  dog: null
}

toggleBarIsGoodDogFilter = () => {    //filter sets app filter state and button display
  state.isGoodDogFilter = !state.isGoodDogFilter
  if (state.isGoodDogFilter === false) {
    dogBarFilterToggleBtn.innerText = "Filter good dogs: OFF"
    dogBarEl.innerHTML = ''
    displayDogBar()
  } else {
    dogBarFilterToggleBtn.innerText = "Filter good dogs: ON"
    dogBarEl.innerHTML = ''
    displayDogBar()
  }
}

// Dog filter checks isGoodGoodFilter state
  // if isGoodDogFilter state is false return all dogs
  // if isGoodDogFilter state is true return only isGoodDogs

dogsFilter = (data) => {
  if (state.isGoodDogFilter) {
    return data.filter(dog => dog.isGoodDog === true)
  } else {
    return data
  }
}

setDogView = () => {
  const dogBtn = document.querySelector('#dog-summary-container button')
  if (state.isThisDogGood){
    dogBtn.innerText = 'Bad Dog!'
  } else {
    dogBtn.innerText = 'Good Dog!'
  }
}

toggleGoodDogStatus = (dog) => {
 state.isThisDogGood = !state.isThisDogGood
 state.dog.isGoodDog = !state.dog.isGoodDog
 updateDogApi(state.dog)
 setDogView()
}


renderDogInfo = (dog) => {
  state.isThisDogGood = dog.isGoodDog
  state.dog = dog
  dogContainer.innerHTML = ''
  const dogDiv = document.createElement('div')
  const h2 = document.createElement('h2')
  const dogImg = document.createElement('img')
  const dogBtn = document.createElement('button')

  dogDiv.setAttribute('data-id', `${dog.id}`)
  h2.innerText = dog.name
  dogImg.setAttribute('src', `${dog.image}`)

  dogDiv.append(h2)
  dogDiv.append(dogImg)
  dogDiv.append(dogBtn)
  dogContainer.append(dogDiv)
  setDogView(dog)


  dogBtn.addEventListener('click', () => toggleGoodDogStatus(dog))
}


displayDogInfo = (e) => {
  if (e.target.className === 'dog-tag') {
      fetchDog(e.target.dataset.id)
        .then(dog => renderDogInfo(dog))
  }
}

renderDogBar = (filterData) => {
  filterData.forEach(function(dog){
    let dogSpan = document.createElement('span')
    dogSpan.setAttribute('data-id',`${dog.id}`)
    dogSpan.className = 'dog-tag'
    dogSpan.innerText = dog.name
    dogBarEl.append(dogSpan)
  })
  dogBarEl.addEventListener('click', displayDogInfo)
}


displayDogBar = () => {
  fetchAllDogs()
  .then(data => dogsFilter(data))
  .then(filterData => renderDogBar(filterData))
}

/* ----------- EVENT LISTENERS -----------------*/

dogBarFilterToggleBtn.addEventListener('click', toggleBarIsGoodDogFilter)
