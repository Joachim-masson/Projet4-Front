import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Connexion.css"

export default function Connexion() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        login(data.user); // On stocke l'user dans le contexte
        navigate("/home");    // Redirection vers l'accueil
      } else {
        alert("Identifiants incorrects");
      }
    } catch (error) {
      console.error("Erreur login:", error);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="modal-content">
        <h2>Connexion</h2>
        <div className="login-div">
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <label>Mot de passe</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit" className="btn-save">Se connecter</button>
          <Link to="/inscription" style={{ marginTop: '15px', textAlign: 'center', display: 'block', fontSize: '0.9rem' }}>
          Pas encore de compte ? Créer un profil administrateur
          </Link>
        </div>
      </form>
    </div>
  );
}