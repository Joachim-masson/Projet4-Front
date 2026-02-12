import { NavLink, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"; // Import du hook
import "./Navbar.css"

export default function Navbar () {
  const { user, logout } = useAuth(); // On récupère l'utilisateur et la fonction logout
  const navigate = useNavigate();
    

 const handleLogout = async (e: React.MouseEvent) => {
  e.preventDefault();
  await logout(); // On attend que le cookie soit supprimé
  navigate("/Connexion");
};
  return (
    <nav className="navbar">
      <NavLink to="/">Accueil</NavLink>
      <NavLink to="/characters">Personnages</NavLink>
      <NavLink to="/locations">Lieux</NavLink>

      {/* On vérifie si l'utilisateur est un admin (ex: "fullAdmin") */}
      {user && (user.habilitation === "fullAdmin" || user.habilitation === "updateAdmin") && (
        <NavLink to="/userManager">Gestion</NavLink>
      )}

      {user ? (
        <div className="nav-auth">
          <a href="#" onClick={handleLogout}>Sign Out</a>
        </div>
      ) : (
        <NavLink to="/Connexion">Sign In</NavLink>
      )}
    </nav>
  );
}