import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../pages/Connexion.css"; // Réutilisation des styles

export default function Inscription() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newUser = {
      name,
      email,
      password,
      habilitation: "visitor", // Forcé en automatique
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        alert("Compte créé avec succès ! Vous pouvez maintenant vous connecter.");
        navigate("/connexion");
      } else {
        const errorData = await response.json();
        alert(`Erreur : ${errorData.message || "Impossible de créer le compte"}`);
      }
    } catch (error) {
      console.error("Erreur inscription:", error);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="modal-content">
        <h2>Créer un compte</h2>
        
        {/* Message informatif demandé */}
        <p className="info-text" style={{ fontStyle: 'italic', fontSize: '0.9rem', marginBottom: '1rem', color: '#555' }}>
          Note : La création de compte est réservée aux utilisateurs souhaitant devenir administrateurs du site. 
          La consultation simple des personnages et lieux ne nécessite pas de compte.
        </p>

        <div className="login-div">
          <label>Nom d'utilisateur</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          
          <label>Mot de passe</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          
          <button type="submit" className="btn-save">S'inscrire</button>
          
          <Link to="/connexion" style={{ marginTop: '10px', textAlign: 'center', fontSize: '0.8rem' }}>
            Déjà un compte ? Se connecter
          </Link>
        </div>
      </form>
    </div>
  );
}