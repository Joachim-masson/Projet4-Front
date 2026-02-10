import { NavLink } from "react-router-dom"

export default function Navbar () {
  return (
    <nav>
      <NavLink to="/">Accueil</NavLink>
      <NavLink to="/characters">Personnages</NavLink>
      <NavLink to="/locations">Lieux</NavLink>
      <NavLink to="/userManager">Gestion</NavLink>
      <NavLink to="/pages/Connexion">sign in</NavLink>
    </nav>
  )
}