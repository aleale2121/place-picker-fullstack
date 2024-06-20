import { useEffect } from "react";

import Places from "./Places.jsx";
import { useState } from "react";

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true)
      const response = await fetch("http://localhost:3000/places");
      const resData = await response.json();
      setAvailablePlaces(resData.places);
      setIsFetching(false)
    }
    fetchPlaces();
  }, []);
  return (
    <Places
      title="Available Places"
      isLoading={isFetching}
      loadingtext="Fetching place data..."
      places={availablePlaces}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
