import type {CharacterI} from "../pages/Characters.tsx"
import "./CharacterCard.css"

interface CharacterCardProps {
  character: CharacterI;
}

export default function CharacterCard ({character}: CharacterCardProps) {

  const API_URL = import.meta.env.VITE_API_URL

  return (
    <article className="characterCard-article">
      <img src={`${API_URL}/uploads/${character.portrait_path}`} alt={`Portrait du personnage :${character.name}`}/>
      <div className="characterCard-article-body">
        <h3>{character.name}</h3>
        <p><span className="label">age:</span> {character.age}</p>
        <p><span className="label">Profession:</span> {character.occupation}</p>
        <p><span className="label">Description:</span> {character.description}</p>
      </div>
    </article>
  )
}
