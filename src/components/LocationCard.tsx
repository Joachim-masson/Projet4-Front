import type { LocationI } from "../pages/Locations"; // Adapte le chemin selon ta structure
import "./LocationCard.css"

interface LocationCardProps {
  location: LocationI;
}

export default function LocationCard ({location}: LocationCardProps) {
  
  const API_URL = import.meta.env.VITE_API_URL

  return (
    <div className="location-card">
      <img src={`${API_URL}/uploads/${location.img_path}`} alt={`lieux :${location.name}`} />
      <h3>{location.name}</h3>
  </div>
  )
}