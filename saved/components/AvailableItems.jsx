import { fetchAvailablePlaces } from '../https.js';
import { sortPlacesByDistance } from '../loc.js';
import Items from './Items.jsx';
import TierList from './TierList.jsx';
import { useEffect, useState } from 'react';

export default function AvailableItems({ onSelectItem }) {
  const [availableItems, setavailableItems] = useState([])
  const [isLoading, setIsloading] = useState(true)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    const fetchItems = async () => {

    }
  }, [])

  return (
    <div  className="places-category">
      <Items 
      />
    </div>
  )
}
