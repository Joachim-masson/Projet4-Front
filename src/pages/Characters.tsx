import { useEffect, useState } from "react"
import CharacterCard from "../components/CharacterCard";
import AddModal from "../components/AddModal";
import EditModal from "../components/EditModal";
import { useAuth } from "../context/AuthContext";
import "./Character.css"

export interface CharacterI {
  idcharacters: number,
  portrait_path : string,
  name: string,
  age: number,
  occupation: string,
  description:string
}


export default function Characters () {
  const { user } = useAuth(); // Récupération de l'utilisateur connecté
  const [characters, setCharacters] = useState<CharacterI[]>([]);
  const [editingCharacter, setEditingCharacter] = useState<CharacterI | null>(null);
  // Pour la search barre
  const [searchTerm, setSearchTerm] = useState<string>("");
  // État pour la modale d'ajout
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // --- Gestion des Permissions ---
  const isFullAdmin = user?.habilitation === "fullAdmin";
  const canCreate = isFullAdmin || user?.habilitation === "createAdmin";
  const canUpdate = isFullAdmin || user?.habilitation === "updateAdmin";
  const canDelete = isFullAdmin || user?.habilitation === "deleteAdmin";

  const API_URL = `${import.meta.env.VITE_API_URL}/api/characters`;

  //Charge tous les personnages
  useEffect(() => {
    fetch(API_URL)
    .then((response) => response.json())
    .then((data) => {
      setCharacters(data);
    })
    .catch(err => console.error("Erreur fetch:", err));
  },[API_URL]);

  // Fonction pour ajouter un personnage
  const handleAdd = async (newData: FormData) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        body: newData,
      });

      if (response.ok) {
        const createdChar: CharacterI = await response.json();
        console.log("Personnage reçu du serveur :", createdChar);
        // On ajoute le nouveau personnage à la liste existante
        setCharacters((prev) => [...prev, createdChar]);
        setIsAddModalOpen(false);
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout :", error);
    }
  };


  // Pour modifier l'un des personnages
  const handleUpdate = async (updatedData: FormData) => {
    // Appel fetch PUT vers ton API
    // On récupère l'ID depuis l'état du personnage en cours d'édition
    const id = editingCharacter?.idcharacters;

    if (!id) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      body: updatedData, // On envoie le FormData pur
      // NE PAS mettre de Headers Content-Type ici
      });

      if (response.ok) {
      // Ton backend doit renvoyer le personnage mis à jour en JSON
      const updatedCharFromServer: CharacterI = await response.json();

      setCharacters((prev) =>
        prev.map((char) =>
          char.idcharacters === id ? updatedCharFromServer : char
        )
      );
      setEditingCharacter(null);
      }
    } catch (error) {
    console.error("Erreur lors de la mise à jour :", error);
    }
  }
  // Pour supprimer l'un des personnages
  const handleDeleteSuccess = (id: number) => {
    setCharacters((prev) => prev.filter(char => char.idcharacters !== id));
  };


  

  // Logique de filtrage 
  const filteredCharacters = characters.filter((char) => {
  const name = char?.name || ""; 
  return name.toLowerCase().includes(searchTerm.toLowerCase());
});

  return (
    <main>
      <h1>Les Personnages</h1>
      <div className="Characters-containerSearchAdd">
        {/* Barre de recherche */}
        <input
          type="text"
          placeholder="Rechercher un personnage..."
          className="Characters-search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {/* Bouton Ajouter visible uniquement si autorisé */}
        {canCreate && (
        <button className="btn-add-main" onClick={() => setIsAddModalOpen(true)}>
          + Ajouter un personnage
        </button> )}
      </div>  
      <div className="characters-container">
      {filteredCharacters.length > 0 ? 
        (filteredCharacters.map((char) => (
          <CharacterCard 
            key={char.idcharacters} 
            onDeleteSuccess={canDelete ? handleDeleteSuccess : undefined}
            character={char} 
            onEdit={canUpdate ? () => setEditingCharacter(char) : undefined}
          />
        ))) : <p>Aucun personnage ne correspond à votre recherche...</p>
      }

      {/* Modale d'ajout */}
      {isAddModalOpen && (
        <AddModal 
          onClose={() => setIsAddModalOpen(false)} 
          onSave={handleAdd} 
        />
      )}

      {/* Modale de suppression et d'ajout directement sur les cartes */}
      {editingCharacter && (
        <EditModal 
          character={editingCharacter} 
          onClose={() => setEditingCharacter(null)} 
          onSave={handleUpdate}
        />
      )}
      </div>
    </main>
  )
}
