// (Supprimez le contenu actuel et remplacez-le par ceci)
"use client"; 

// --- IMPORT CORRIGÉ ---
// Le chemin est : ../ (remonte de app/ à src/) -> context/AuthContext.js
import { useAuth } from "../context/AuthContext.js";
// --- FIN IMPORT ---

export default function Home() {
  // On récupère l'utilisateur (juste pour l'exemple)
  const { user } = useAuth();

  return (
    <div>
      <h1>Bienvenue sur InkUp !</h1>
      <p>Le lien direct entre auteurs et lecteurs de BD.</p>

      {user ? (
        <p>Vous êtes connecté en tant que : {user.email}</p>
      ) : (
        <p>Veuillez vous connecter pour accéder à votre espace.</p>
      )}
    </div>
  );
}