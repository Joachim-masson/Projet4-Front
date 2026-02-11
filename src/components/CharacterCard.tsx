import type {CharacterI} from "../pages/Characters.tsx"
import "./CharacterCard.css"

interface CharacterCardProps {
  character: CharacterI;
  onEdit: () => void;
  onDeleteSuccess: (id: number) => void;
}

export default function CharacterCard ({character, onEdit, onDeleteSuccess}: CharacterCardProps) {
  const API_URL = import.meta.env.VITE_API_URL

  const handleEdit = () => {
    console.log(`Modifier le personnage ${character.idcharacters}`);
    onEdit();
  };

  const handleDelete = async () => {
    if (window.confirm(`Voulez-vous vraiment supprimer ${character.name} ?`)) {
      try {
        const response = await fetch(`${API_URL}/api/characters/${character.idcharacters}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          alert("Personnage supprimé !");
          // Appel d'une fonction passée en props pour rafraîchir la liste côté Parent
          onDeleteSuccess(character.idcharacters);
        } else {
          alert("Erreur lors de la suppression");
        }
      } catch (error) {
        console.error("Erreur réseau :", error);
      }
    }
  }


  return (
    <article className="characterCard-article">
      <img src={`${API_URL}/uploads/${character.portrait_path}`} alt={`Portrait du personnage :${character.name}`}/>
      <div className="characterCard-article-body">
        <h3>{character.name}</h3>
        <p><span className="label">age:</span> {character.age}</p>
        <p><span className="label">Profession:</span> {character.occupation}</p>
        <p><span className="label">Description:</span> {character.description}</p>
      </div>
      <div className="character-card-actions">
        <button className="btn-edit" onClick={handleEdit}>
          Modifier
        </button>
        <button className="btn-delete" onClick={handleDelete}>
          Supprimer
        </button>
      </div>
    </article>
  )
}
