import Places from "./Places";

export default function PlaceTiers({ title, places, isLoading, loadingText, fallbackText, onSelectPlace, onMouseEnter, onMouseExit: onMouseLeave }) {
  
    return (
        <>
            <Places
            title="I'd like to visit ..."
            fallbackText="Drag here the places you would like to visit below."
            isLoading={isLoading}
            loadingText={loadingText}
            places={places.visit}
            onSelectPlace={onSelectPlace}
            onMouseEnter={() => onMouseEnter("Visit")}
            onMouseLeave={onMouseLeave}
            />
            <Places
            title="I don't want to visit ..."
            fallbackText="Drag here the places you would not like to visit below."
            isLoading={isLoading}
            loadingText={"Fetching data..."}
            places={places.dontVisit}
            onSelectPlace={onSelectPlace}
            onMouseEnter={() => onMouseEnter("NotVisit")}
            onMouseLeave={onMouseLeave}
            />
        </>
    );
  }
  