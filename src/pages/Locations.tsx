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
      .then((data) => setLocations(data));
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
    const res = await fetch(API_URL, { method: "POST", body: formData });
    if (res.ok) {
      const newLoc = await res.json();
      setLocations([...locations, newLoc]);
      setIsAddModalOpen(false);
    }
  };

  const handleUpdate = async (formData: FormData) => {
    if (!editingLocation) return;
    const res = await fetch(`${API_URL}/${editingLocation.idlocation}`, { 
      method: "PATCH", 
      body: formData 
    });
    if (res.ok) {
      // Recharger les données pour simplifier
      window.location.reload(); 
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

      <div className="header-section" style={{ display: 'flex', gap: '1rem', padding: '0 3rem' }}>
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
          <div key={loc.idlocation}>
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