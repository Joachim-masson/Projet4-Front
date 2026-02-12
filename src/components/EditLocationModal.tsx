import { useState, useEffect } from "react";
import type { LocationI } from "../pages/Locations";
import type { CharacterI } from "../pages/Characters";
import "./EditModal.css";

interface EditLocationModalProps {
  location: LocationI;
  onClose: () => void;
  onSave: (formData: FormData) => void;
}

export default function EditLocationModal({ location, onClose, onSave }: EditLocationModalProps) {
  const [name, setName] = useState(location.name);
  const [file, setFile] = useState<File | null>(null);
  const [allCharacters, setAllCharacters] = useState<CharacterI[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  useEffect(() => {
    // 1. Charger tous les personnages
    fetch(`${import.meta.env.VITE_API_URL}/api/characters`)
      .then((res) => res.json())
      .then((data) => setAllCharacters(data));

    // 2. Charger les personnages déjà liés à ce lieu
    fetch(`${import.meta.env.VITE_API_URL}/api/location/${location.idlocation}/characters`)
      .then((res) => res.json())
      .then((data: CharacterI[]) => {
        setSelectedIds(data.map(c => c.idcharacters));
      });
  }, [location.idlocation]);

  const handleCheck = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    if (file) formData.append("img_path", file);
    formData.append("characterIds", selectedIds.join(","));

    onSave(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Modifier {location.name}</h2>
        <form onSubmit={handleSubmit}>
          <label>Nom du lieu</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

          <label>Changer l'image (optionnel)</label>
          <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />

          <label>Modifier les personnages liés :</label>
          <div className="character-selection-list" style={{ maxHeight: '150px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
            {allCharacters.map((char) => (
              <div key={char.idcharacters} className="checkbox-item">
                <input
                  type="checkbox"
                  id={`edit-char-${char.idcharacters}`}
                  checked={selectedIds.includes(char.idcharacters)}
                  onChange={() => handleCheck(char.idcharacters)}
                />
                <label htmlFor={`edit-char-${char.idcharacters}`}>{char.name}</label>
              </div>
            ))}
          </div>

          <div className="modal-buttons">
            <button type="button" onClick={onClose} className="btn-cancel">Annuler</button>
            <button type="submit" className="btn-save">Mettre à jour</button>
          </div>
        </form>
      </div>
    </div>
  );
}