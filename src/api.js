fetchAllDogs = () => {
  return fetch('http://localhost:3000/pups')
  .then((res) => res.json())
}

fetchDog = (id) => {
  return fetch(`http://localhost:3000/pups/${id}`)
  .then((res) => res.json())
}

const updateDogApi = (dog) => {
	fetch(`http://localhost:3000/pups/${dog.id}`, {
		method: 'PATCH',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(dog)
	})
}
