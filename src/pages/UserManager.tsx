import { useEffect, useState } from "react";
import "./UserManager.css";

interface UserI {
  idusers: number;
  name: string;
  email: string;
  habilitation: "visitor" | "createAdmin" | "deleteAdmin" | "updateAdmin" | "fullAdmin";
}

export default function UserManager() {
  const [users, setUsers] = useState<UserI[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const API_URL = `${import.meta.env.VITE_API_URL}/api/user`;

  // 1. Charger les utilisateurs
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Erreur chargement users:", err));
  }, [API_URL]);

  // 2. Supprimer un utilisateur
  const handleDelete = async (id: number) => {
    if (window.confirm("Supprimer cet utilisateur définitivement ?")) {
      try {
        const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        if (res.ok) {
          setUsers(users.filter((u) => u.idusers !== id));
        }
      } catch (err) {
        console.error("Erreur suppression:", err);
      }
    }
  };

  // 3. Modifier l'habilitation avec Confirmation
  const handleHabilitationChange = async (id: number, newHab: string) => {
    // AJOUT DE LA CONFIRMATION ICI
    const confirmChange = window.confirm(
      `Êtes-vous sûr de vouloir modifier le rôle de cet utilisateur vers "${newHab}" ?`
    );

    if (!confirmChange) return; // On arrête tout si l'admin annule

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ habilitation: newHab }),
      });
      if (res.ok) {
        setUsers(users.map((u) => (u.idusers === id ? { ...u, habilitation: newHab as any } : u)));
      }
    } catch (err) {
      console.error("Erreur modification habilitation:", err);
    }
  };

  // 4. Filtrage
  const filteredUsers = users.filter((u) =>
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="user-manager-container">
      <h1>Gestion des Utilisateurs</h1>

      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Rechercher par email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="user-search-input"
        />
      </div>

      <div className="user-list">
        <div className="user-header">
          <span>Nom</span>
          <span>Email</span>
          <span>Habilitation</span>
          <span>Actions</span>
        </div>

        {filteredUsers.map((user) => (
          <div key={user.idusers} className="user-row">
            <span className="user-name">{user.name}</span>
            <span className="user-email">{user.email}</span>
            <span className="user-hab">
              <select
                value={user.habilitation}
                onChange={(e) => handleHabilitationChange(user.idusers, e.target.value)}
                className="hab-select"
              >
                <option value="visitor">Visitor</option>
                <option value="createAdmin">Create Admin</option>
                <option value="deleteAdmin">Delete Admin</option>
                <option value="updateAdmin">Update Admin</option>
                <option value="fullAdmin">Full</option>
              </select>
            </span>
            <span className="user-actions">
              <button onClick={() => handleDelete(user.idusers)} className="btn-delete-user">
                Supprimer
              </button>
            </span>
          </div>
        ))}
      </div>
    </main>
  );
}