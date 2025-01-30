export async function fetchAvailablePlaces() {
    const response = await fetch('http://localhost:3000/places');
    const resData = await response.json();

    if (!response.ok) {
      throw new Error("Failed to fetch places");
    }
    return resData
}

export async function fetchUserPlaces() {
  const response = await fetch('http://localhost:3000/user-places');
  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch places");
  }
  return resData
}

// Upload places
export async function updateUserPlaces(places, condition) {
  const response = await fetch(`http://localhost:3000/user-places/${condition}`, {
    method: 'PUT',
    body: JSON.stringify({places}),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if (!response.ok) {
    throw new Error("Failed to update user data")
  }
  const resData = await response.json()

  return resData.message

}