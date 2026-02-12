import { useState, useEffect } from "react";
import type { CharacterI } from "../pages/Characters";
import "./EditModal.css"; 

interface AddLocationModalProps {
  onClose: () => void;
  onSave: (formData: FormData) => void;
}

export default function AddLocationModal({ onClose, onSave }: AddLocationModalProps) {
  const [name, setName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [characters, setCharacters] = useState<CharacterI[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  // Charger les personnages pour la sélection
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/characters`)
      .then((res) => res.json())
      .then((data) => setCharacters(data))
      .catch((err) => console.error("Erreur chargement personnages:", err));
  }, []);

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
    // On envoie les IDs sous forme de chaîne séparée par des virgules
    formData.append("characterIds", selectedIds.join(","));

    onSave(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Ajouter un nouveau lieu</h2>
        <form onSubmit={handleSubmit}>
          <label>Nom du lieu</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

          <label>Image du lieu</label>
          <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />

          <label>Personnages présents ici :</label>
          <div className="character-selection-list" style={{ maxHeight: '150px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
            {characters.map((char) => (
              <div key={char.idcharacters} className="checkbox-item">
                <input
                  type="checkbox"
                  id={`char-${char.idcharacters}`}
                  checked={selectedIds.includes(char.idcharacters)}
                  onChange={() => handleCheck(char.idcharacters)}
                />
                <label htmlFor={`char-${char.idcharacters}`}>{char.name}</label>
              </div>
            ))}
          </div>

          <div className="modal-buttons">
            <button type="button" onClick={onClose} className="btn-cancel">Annuler</button>
            <button type="submit" className="btn-save">Enregistrer</button>
          </div>
        </form>
      </div>
    </div>
  );
}