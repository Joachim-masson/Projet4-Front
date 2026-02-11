// AddModal.tsx
import { useState } from "react";
import "./EditModal.css"; // On réutilise le même CSS

interface AddModalProps {
  onClose: () => void;
  onSave: (newData: FormData) => void;
}

export default function AddModal({ onClose, onSave }: AddModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    age: 0,
    occupation: "",
    description: ""
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === "age" ? parseInt(value) || 0 : value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("age", formData.age.toString());
    data.append("occupation", formData.occupation);
    data.append("description", formData.description);
    if (selectedFile) data.append("portrait_path", selectedFile);
    
    onSave(data);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Nouveau Personnage</h2>
        <form onSubmit={handleSubmit}>
          <label>Nom :</label>
          <input name="name" placeholder="Ex: Ned Flanders" onChange={handleChange} required />
          
          <label>Âge :</label>
          <input type="number" name="age" onChange={handleChange} required />

          <label>Profession :</label>
          <input name="occupation" onChange={handleChange} required />

          <label>Description :</label>
          <textarea name="description" onChange={handleChange} required />

          <label>Portrait :</label>
          <input type="file" accept="image/*" onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} required />

          <div className="modal-actions">
            <button type="submit" className="btn-save">Créer</button>
            <button type="button" className="btn-cancel" onClick={onClose}>Annuler</button>
          </div>
        </form>
      </div>
    </div>
  );
}