import type {CharacterI} from "../pages/Characters.tsx"
import "./CharacterCard.css"

interface CharacterCardProps {
  character: CharacterI;
  onEdit?: () => void;
  onDeleteSuccess?: (id: number) => void;
}

export default function CharacterCard ({character, onEdit, onDeleteSuccess}: CharacterCardProps) {
  const API_URL = import.meta.env.VITE_API_URL

  const handleEdit = () => {
    console.log(`Modifier le personnage ${character.idcharacters}`);
    if(onEdit){
      onEdit();}
  };

  const handleDelete = async () => {
    if (window.confirm(`Voulez-vous vraiment supprimer ${character.name} ?`)) {
      try {
        const response = await fetch(`${API_URL}/api/characters/${character.idcharacters}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          alert("Personnage supprimé !");
          // Appel d'une fonction passée en props , si elle existe, pour rafraîchir la liste côté Parent
          if (onDeleteSuccess) {
          onDeleteSuccess(character.idcharacters);}
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
        {onEdit && <button className="btn-edit" onClick={handleEdit}>Modifier</button>}
        {onDeleteSuccess &&<button className="btn-delete" onClick={handleDelete}>
          Supprimer
        </button>}
      </div>
    </article>
  )
}
