import { useRef, useState, useCallback, useEffect } from 'react';

import Places from './components/Places.jsx';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import AvailablePlaces from './components/AvailablePlaces.jsx';
import { fetchUserPlaces, updateUserPlaces } from './https.js';
import PlaceTiers from './components/PlaceTiers.jsx';

function App() {
  const selectedPlace = useRef();
  const droppableArea = useRef();
  const draggingItem = useRef();
  const documentRef = useRef(document)

  const [doUserPlaces, setDoUserPlaces] = useState([]);
  const [dontUserPlaces, setDontUserPlaces] = useState([])

  const [errorUpdatingPlaces, setErrorUpdatingPlaces] = useState(false)
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [isLoading, setIsloading] = useState(true)
  const [isError, setIsError] = useState(false)

  function onMouseEnterDroppableArea(areaName) {
    console.log(areaName)
    droppableArea.current = areaName
  }
  function onMouseLeaveDroppableArea() {
    console.log(droppableArea.current)
    droppableArea.current = undefined
  }

  // This can easily be made async since its connected to an event listener
  function handleSelectPlace(place, e) {
    draggingItem.current = e
    selectedPlace.current = place
    console.log(selectedPlace.current)
    documentRef.current.addEventListener('mousemove', dragItem)
    documentRef.current.addEventListener('mouseup', handleReleasePlace)
    
  }

  const dragItem = (e) => {
    console.log("TODO implement dragging item here")
  }

  function handleStartRemovePlace(place) {
    setModalIsOpen(true);
    selectedPlace.current = place;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        setIsloading(true)
        setIsError(false)
        const response = await fetchUserPlaces()
        setDoUserPlaces(response.places)

      } catch (error) {
        setIsError(true)
        alert(error)
      }

      setIsloading(false)
    }

    fetchPlaces()
  }, [])
  

  async function handleReleasePlace() {
    
    documentRef.current.removeEventListener('mousemove', dragItem)
    documentRef.current.removeEventListener('mouseup', handleReleasePlace)
      switch (droppableArea.current) {
        case "Visit":
          setDoUserPlaces([selectedPlace.current, ...doUserPlaces])
          break;
        case "NotVisit":
          setDontUserPlaces([selectedPlace.current,...dontUserPlaces])
          break
  
        default:
          break;
      }
    droppableArea.current = undefined
    selectedPlace.current = undefined

  }

  const handleRemovePlace = useCallback(async function handleRemovePlace() {
    switch(droppableArea.current)
    {
      case "Visit":
        setDoUserPlaces((prevPickedPlaces) =>
          prevPickedPlaces.filter((place) => place.id !== selectedPlace.current.id)
        );
        break
      case "NotVisit":
        setDontUserPlaces((prevPickedPlaces) => prevPickedPlaces.filter((place) => place.id !== selectedPlace.current.id))
        break
    }

    try {
      switch(droppableArea.current)
      {
        case "Visit":
          updateUserPlaces(
            doUserPlaces.filter((place) => place.id !== selectedPlace.current.id), "Visit"
          )
          break
        case "NotVisit":
          updateUserPlaces(
            dontUserPlaces.filter((place) => place.id !== selectedPlace.current.id), "NotVisit"
          )
        break
      }
      
    } catch (error) {
      setDoUserPlaces(doUserPlaces)
      setDontUserPlaces(dontUserPlaces)
      setErrorUpdatingPlaces({message: "Failed to delete place"})
    }
    setModalIsOpen(false);
  }, []);

  return (
    <>
      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        <PlaceTiers
          title="I'd like to visit ..."
          fallbackText="Select the places you would like to visit below."
          isLoading={isLoading}
          loadingText={"Fetching data..."}
          places={{visit: doUserPlaces, dontVisit: dontUserPlaces}}
          onSelectPlace={handleStartRemovePlace}
          onMouseEnter={onMouseEnterDroppableArea}
          onMouseExit={ () => {}}
        />

        <AvailablePlaces onSelectPlace={handleSelectPlace} />
      </main>
    </>
  );
}

export default App;
