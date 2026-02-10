import { NavLink, useNavigate } from "react-router-dom"
import "./Navbar.css"

export default function Navbar () {
  //  Ces valeurs proviendront plus tard de ton Context (ex: AuthContext)
  const isLoggedIn = true; // À remplacer par ton état réel
  const userRole = "admin";  // À remplacer par "admin" par exemple
  const navigate = useNavigate();

  const handleLogout = () => {
    // Logique de déconnexion (supprimer le JWT, etc.)
    console.log("Déconnexion...");
    navigate("/pages/Connexion");
  };
  return (
  <>

    <nav className="navbar">
      
      <NavLink to="/">Accueil</NavLink>
      <NavLink to="/characters">Personnages</NavLink>
      <NavLink to="/locations">Lieux</NavLink>
      {/* Affichage conditionnel de Gestion */}
      {isLoggedIn && userRole === "admin" && (
        <NavLink to="/userManager">Gestion</NavLink>
      )}

      {/* Switch Sign In / Sign Out */}
      {isLoggedIn ? (
        <a href="#" onClick={handleLogout}>Sign Out</a>
      ) : (
        <NavLink to="/pages/Connexion">Sign In</NavLink>
      )}
    </nav>
    
   </>
  )
}