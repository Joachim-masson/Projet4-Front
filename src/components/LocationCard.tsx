import type { LocationI } from "../pages/Locations"; // Adapte le chemin selon ta structure
import "./LocationCard.css"

interface LocationCardProps {
  location: LocationI;
  onEdit?: () => void;
  onDeleteSuccess?: (id: number) => void;
}

export default function LocationCard({ location, onEdit, onDeleteSuccess }: LocationCardProps) {
  const handleDelete = async () => {
    if (window.confirm("Supprimer ce lieu ?")) {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/location/${location.idlocation}`, { method: 'DELETE' });
      if (res.ok) onDeleteSuccess?.(location.idlocation);
    }
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