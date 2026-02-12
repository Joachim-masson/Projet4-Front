import home from "../assets/home.webp";
import { Link } from "react-router-dom"
import "./Accueil.css"

export default function () {
  return (
    <main className="Accueil-container">
      <Link to="/home"><img src={home} className="Accueil-Homer" alt="Entrer sur le site"/>
      </Link>
    </main>
  )
}