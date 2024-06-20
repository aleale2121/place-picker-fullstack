import { useEffect } from "react";

import Places from "./Places.jsx";
import Error from "./Error.jsx";
import { useState } from "react";

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();
  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);
      try {
        const response = await fetch("http://localhost:3000/places");
        if (!response.ok) {
          throw new Error("Failed to fetch places");
        }
        const resData = await response.json();
        setAvailablePlaces(resData.places);
      } catch (error) {
        setError({
          message:
            error.message || "Couldn't fetch places please try again later",
        });
      }

      setIsFetching(false);
    }
    fetchPlaces();
  }, []);

  if (error) {
    return <Error title="An error occurred!" message={error.message}></Error>;
  }
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
