import { Link } from "react-router-dom";
import Error404Img from "../assets/Error404.png"
import "./Error404.css"

export default function Error404 () {
  return (
    <main className="error-page">
      <h1>Plus de donuts ici !</h1>
      <div className="button-container">
        <Link to="/" className="btn-home">
          D'oh ! Ramène-moi à la maison
        </Link>
      </div>
      <img src={Error404Img} alt="Homer la bouche ouverte" />
    </main>
  )
}