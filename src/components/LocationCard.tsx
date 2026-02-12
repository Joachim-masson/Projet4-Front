import type { LocationI } from "../pages/Locations"; // Adapte le chemin selon ta structure
import "./LocationCard.css"

interface LocationCardProps {
  location: LocationI;
  onEdit?: () => void;
  onDeleteSuccess?: (id: number) => void;
}

export default function LocationCard({ location, onEdit, onDeleteSuccess }: LocationCardProps) {
  
  const handleDelete = async () => {
    console.log("ID envoyé au DELETE du LocationCard:", location.idlocation);
    if (window.confirm("Supprimer ce lieu ?")) {
      try{
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/location/${location.idlocation}`, { method: 'DELETE' });
      if (res.ok) {
        onDeleteSuccess?.(location.idlocation);
      } else {
        const errorData = await res.json();
        alert(`Erreur: ${errorData.message}`);
      }
      } catch (error) {
        console.error("Erreur réseau :", error);
      }}
  };

  return (
    <div className="location-card">
      <img src={`${import.meta.env.VITE_API_URL}/uploads/${location.img_path}`} alt={location.name} />
      <h3>{location.name}</h3>
      <div className="actions">
        {onEdit && <button onClick={onEdit} className="btn-edit">Modifier</button>}
        {onDeleteSuccess && <button onClick={handleDelete} className="btn-delete">Supprimer</button>}
      </div>
    </div>
  );
}