import { useEffect, useState } from "react"
import CharacterCard from "../components/CharacterCard";
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
  const [characters, setCharacters] = useState<CharacterI[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/characters`)
    .then((response) => response.json())
    .then((data) => {
      setCharacters(data);
    })
  },[]);
  

  return (
    <main>
      <h1>Les Personnages</h1>
      <div className="characters-container">
      {characters ? (characters.map((char) => <CharacterCard key={char.idcharacters} character={char}/>)) : <p>Personnages en cours de chargement...</p>
      }
      </div>
    </main>
  )
}