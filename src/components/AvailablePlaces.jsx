import { fetchAvailablePlaces } from '../https.js';
import { sortPlacesByDistance } from '../loc.js';
import Places from './Places.jsx';
import { useEffect, useState } from 'react';

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([])
  const [isLoading, setIsloading] = useState(true)
  const [isError, setIsError] = useState(false)
  useEffect(() => {
    const fetchPlaces = async () => {
      let resData = await fetchAvailablePlaces()
      let userLoc = navigator.geolocation.getCurrentPosition((position) => {
        const sortedPlaces = sortPlacesByDistance(resData.places, position.coords.latitude, position.coords.longitude)
        setIsloading(false)
        setAvailablePlaces(sortedPlaces)
      })


    }
    try {
      fetchPlaces();
    } catch (error) {
      alert(error)
      setIsloading(false)
      setIsError(true)
    }
  }, [])

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isLoading}
      loadingText="Loading places..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
      onMouseEnter={ () => {}}
      onMouseLeave={() => {}}
    />
  );
}
