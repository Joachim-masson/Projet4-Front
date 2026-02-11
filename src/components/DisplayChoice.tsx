import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./DisplayChoice.css"
import type {CharacterI} from "../pages/Characters"
import type {LocationI} from "../pages/Locations"

export default function DisplayChoice () {

  //Raccourcis de l'URL pour charger les images
  const API_URL = import.meta.env.VITE_API_URL
  //Obtenir les personnages
  const [characters, setCharacters] = useState<CharacterI[]>([]);

   useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/characters`)
    .then((response) => response.json())
    .then((data) => {
      setCharacters(data);
    })
  },[]);
  

  //Obtenir les lieux
  const [locations, setLocations ] = useState<LocationI[]>([]);

     useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/location`)
    .then((response) => response.json())
    .then((data) => {
      setLocations(data);
    })
  },[]);

  const firstCharacter = characters[0];
  const firstLocation = locations[0];

  return (
  <section className="DisplayChoice-Section">
    <article className="characterCard-article">
    {firstCharacter ? (
      <div className="displayChoiceCard">
        <img src={`${API_URL}/uploads/${characters[0].portrait_path}`} alt={`Portrait du personnage :${characters[0].name}`}/>
        <div className="characterCard-article-body">
          <h3>Personnages</h3>
        </div>
        <NavLink to="/characters" className="DisplayChoice-SeeMore"> Voir plus </NavLink>
      </div>  
        ) : (<p>Chargement en cours</p>)
    }
    </article>
    <article className="characterCard-article">
    {firstLocation ? (
      <div className="displayChoiceCard">
        <img src={`${API_URL}/uploads/${locations[0].img_path}`} alt={`Portrait du personnage :${locations[0].name}`}/>
        <div className="characterCard-article-body">
          <h3>Lieux</h3>
        </div>
        <NavLink to="/locations" className="DisplayChoice-SeeMore"> Voir plus </NavLink>
        </div>  
        ) : (<p>Chargement en cours</p>)
    }
    </article>
  </section>
  )
}
