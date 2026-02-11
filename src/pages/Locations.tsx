import { useEffect, useState } from "react"
import LocationCard from "../components/LocationCard"
import "./Locations.css"

export interface LocationI {
  idlocation: number,
  img_path : string,
  name: string,
}

export default function Locations () {
  const [locations, setLocations] = useState<LocationI[]>([]);

  // État pour stocker l'ID du lieu sélectionné
  const [selectedLocationId, setSelectedLocationId] = useState<string>("all");

    //Charge tous les lieux
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/location`)
    .then((response) => response.json())
    .then((data) => {
      setLocations(data);
    })
  },[]);

  // Logique de filtrage
  const filteredLocations = selectedLocationId === "all" 
    ? locations 
    : locations.filter(loc => loc.idlocation === parseInt(selectedLocationId));

  //Permet un affichage différent lorsqu'il n'y a qu'une image  
  const isSingle = filteredLocations.length === 1;  

  return (
  <main>
      <h1>Les Lieux</h1>

      {/* Menu déroulant de recherche */}
      <div className="search-container" style={{ marginBottom: '20px' }}>
        <label htmlFor="location-select"> </label>
        <select 
          id="location-select"
          value={selectedLocationId}
          onChange={(e) => setSelectedLocationId(e.target.value)}
          className="location-select"
        >
          <option value="all">-- Tous les lieux --</option>
          {locations.map((loc) => (
            <option key={loc.idlocation} value={loc.idlocation}>
              {loc.name}
            </option>
          ))}
        </select>
      </div>

      <section className="locations-grid">
        {filteredLocations.length > 0 ? (
          filteredLocations.map((loc) => (
            <div key={loc.idlocation} className={isSingle ? "single-card-wrapper" : ""}>
              <LocationCard location={loc} />
            </div>
          ))
        ) : (
          <p>Lieux en cours de chargement ou aucun résultat...</p>
        )}
      </section>
    </main>
  )
}
