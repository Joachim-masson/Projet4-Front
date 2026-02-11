import { useState } from "react"
import type { CharacterI } from "../pages/Characters";
import "./EditModal.css"

interface EditModalProps {
  character: CharacterI;
  onClose: () => void;
  onSave: (updatedData: FormData) => void;
}

export default function EditModal({ character, onClose, onSave }: EditModalProps) {
  // On initialise le formulaire avec les données actuelles
  const [formData, setFormData] = useState<CharacterI>({ ...character });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value } = e.target;
    setFormData({ ...formData, 
      [name]: name === "age" ? parseInt(value) || 0 : value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // On crée un objet FormData pour emballer le texte + le fichier
    const dataToSend = new FormData();
    dataToSend.append("name", formData.name);
    dataToSend.append("age", formData.age.toString());
    dataToSend.append("occupation", formData.occupation);
    dataToSend.append("description", formData.description);
    
    if (selectedFile) {
      dataToSend.append("portrait_path", selectedFile); // Le nom "portrait_path" doit matcher req.file dans le back
    }
    
    onSave(dataToSend);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Modifier {character.name}</h2>
        <form onSubmit={handleSubmit}>
          <label>Nom :</label>
          <input name="name" value={formData.name} onChange={handleChange} />

          <label>Âge :</label>
          <input type="number" name="age" value={formData.age} onChange={handleChange} />

          <label>Profession :</label>
          <input name="occupation" value={formData.occupation} onChange={handleChange} />

          <label>Description :</label>
          <textarea name="description" value={formData.description} onChange={handleChange} />

          <label>Changer le portrait :</label>
          <input type="file" accept="image/*" onChange={handleFileChange} />

          <div className="modal-actions">
            <button type="submit" className="btn-save">Enregistrer</button>
            <button type="button" className="btn-cancel" onClick={onClose}>Annuler</button>
          </div>
        </form>
      </div>
    </div>
  );
}