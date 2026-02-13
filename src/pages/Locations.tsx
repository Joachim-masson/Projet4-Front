import { useEffect, useState } from "react";
import LocationCard from "../components/LocationCard";
import AddLocationModal from "../components/AddLocationModal";
import EditLocationModal from "../components/EditLocationModal";
import { useAuth } from "../context/AuthContext";
import type { CharacterI } from "./Characters";
import "./Locations.css";

export interface LocationI {
  idlocation: number;
  img_path: string;
  name: string;
}

export default function Locations() {
  const { user } = useAuth();
  const [locations, setLocations] = useState<LocationI[]>([]);
  const [selectedLocationId, setSelectedLocationId] = useState<string>("all");
  const [linkedCharacters, setLinkedCharacters] = useState<CharacterI[]>([]);
  
  // États pour les modales
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingLocation, setEditingLocation] = useState<LocationI | null>(null);

  // --- Permissions ---
  const isFullAdmin = user?.habilitation === "fullAdmin";
  const canCreate = isFullAdmin || user?.habilitation === "createAdmin";
  const canUpdate = isFullAdmin || user?.habilitation === "updateAdmin";
  const canDelete = isFullAdmin || user?.habilitation === "deleteAdmin";

  const API_URL = `${import.meta.env.VITE_API_URL}/api/location`;

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        console.log("Données reçues du serveur sur Locations.tsx:", data[0]);
        setLocations(data)});
  }, []);

  useEffect(() => {
    if (selectedLocationId !== "all") {
      fetch(`${API_URL}/${selectedLocationId}/characters`)
        .then((res) => res.json())
        .then((data) => setLinkedCharacters(data))
        .catch(() => setLinkedCharacters([]));
    }
  }, [selectedLocationId]);

  const handleAdd = async (formData: FormData) => {
    try {
      const res = await fetch(API_URL, { method: "POST", body: formData });
      if (res.ok) {
        const newLoc = await res.json();
      // On s'assure que newLoc contient idlocation, name et img_path
        setLocations((prev) => [...prev, newLoc]);
        setIsAddModalOpen(false);
      } else {
        const errorText = await res.text();
        console.error("Erreur serveur:", errorText);
      }
    } catch (err) {
      console.error("Erreur réseau:", err);
    }
  };

  const handleUpdate = async (formData: FormData) => {
    if (!editingLocation) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/location/${editingLocation.idlocation}`, {
        method: "PATCH",
        body: formData,
      });

      if (res.ok) {
        // On récupère l'objet complet (updatedLocation du back)
        const updatedLoc = await res.json();
        // On met à jour la liste localement
        setLocations((prev) =>
          prev.map((loc) =>
            loc.idlocation === editingLocation.idlocation ? updatedLoc : loc
          )
        );
        
        // Fermer la modale
        setEditingLocation(null);
        
        // Optionnel : Si le lieu modifié était celui sélectionné, on peut forcer 
        // un rechargement des personnages liés
        if (selectedLocationId === editingLocation.idlocation.toString()) {
            // Déclencher manuellement le refresh des persos si nécessaire
            setSelectedLocationId("all"); // Petit "reset" rapide ou appel fetch characters
        }
      }
    } catch (err) {
      console.error("Erreur lors de l'update front:", err);
    }
  };

  const handleDeleteSuccess = (id: number) => {
    setLocations(locations.filter(l => l.idlocation !== id));
    setSelectedLocationId("all");
  };

  const filteredLocations = selectedLocationId === "all" 
    ? locations 
    : locations.filter(loc => loc.idlocation === parseInt(selectedLocationId));

  return (
    <main>
      <h1>Les Lieux</h1>

      <div className="location-SelectAndAdd" >
        <select 
          value={selectedLocationId}
          onChange={(e) => setSelectedLocationId(e.target.value)}
          className="location-select"
        >
          <option value="all">-- Tous les lieux --</option>
          {locations.map((loc) => (
            <option key={loc.idlocation} value={loc.idlocation}>{loc.name}</option>
          ))}
        </select>

        {canCreate && (
          <button className="btn-add-main" onClick={() => setIsAddModalOpen(true)}>
            + Ajouter un lieu
          </button>
        )}
      </div>

      <section className="locations-grid">
        {filteredLocations.map((loc) => (
          <div key={loc.idlocation} className={selectedLocationId !== "all" ? "Location-container-single" : ""}>
            <LocationCard 
              location={loc} 
              onDeleteSuccess={canDelete ? handleDeleteSuccess : undefined}
              onEdit={canUpdate ? () => setEditingLocation(loc) : undefined}
            />
            
            {selectedLocationId !== "all" && (
              <div className="linked-characters-section">
                <h4>Habitants / Visiteurs :</h4>
                <div className="mini-char-list">
                  {linkedCharacters.map(char => (
                    <div key={char.idcharacters} className="mini-char-item">
                      <img src={`${import.meta.env.VITE_API_URL}/uploads/${char.portrait_path}`} alt={char.name} />
                      <p>{char.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </section>

      {isAddModalOpen && <AddLocationModal onSave={handleAdd} onClose={() => setIsAddModalOpen(false)} />}
      {editingLocation && <EditLocationModal location={editingLocation} onSave={handleUpdate} onClose={() => setEditingLocation(null)} />}
    </main>
  );
}