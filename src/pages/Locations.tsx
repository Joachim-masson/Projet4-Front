import { useEffect, useState } from "react"
import LocationCard from "../components/LocationCard"
import type { CharacterI } from "./Characters";
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
  // État pour les personnages liés
  const [linkedCharacters, setLinkedCharacters] = useState<CharacterI[]>([]);

    //Charge tous les lieux
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/location`)
    .then((response) => response.json())
    .then((data) => {
      setLocations(data);
    })
  },[]);
 
  //Charger les personnages quand le lieu change
  useEffect(() => {
    if (selectedLocationId !== "all") {
      fetch(`${import.meta.env.VITE_API_URL}/api/location/${selectedLocationId}/characters`)
        .then((res) => res.json())
        .then((data) => setLinkedCharacters(data))
        .catch(() => setLinkedCharacters([]));
    } else {
      setLinkedCharacters([]);
    }
  }, [selectedLocationId]);

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

              {/* AFFICHAGE DES PERSONNAGES SI UN LIEU EST SELECTIONNÉ */}
              {selectedLocationId !== "all" && (
                <div className="linked-characters-section">
                  <h4>Habitants / Visiteurs :</h4>
                  <div className="mini-char-list">
                    {linkedCharacters.length > 0 ? (
                      linkedCharacters.map(char => (
                        <div key={char.idcharacters} className="mini-char-item">
                          <img src={`${import.meta.env.VITE_API_URL}/uploads/${char.portrait_path}`} alt={char.name} />
                          <p>{char.name}</p>
                        </div>
                      ))
                    ) : (
                      <p>Aucun personnage lié à ce lieu.</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>Lieux en cours de chargement ou aucun résultat...</p>
        )}
      </section>
    </main>
  )
}
