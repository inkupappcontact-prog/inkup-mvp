"use client"; // Important : Ce composant doit être un "Client Component"

import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
// Assurez-vous que le chemin d'importation est correct
// Il part de 'src/context/' pour remonter à 'src/'
import { auth } from '../firebaseConfig.js'; 

// 1. Créer le Contexte
const AuthContext = createContext();

// 2. Créer le "Fournisseur" (Provider)
// C'est le composant qui va "envelopper" toute notre application
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // onAuthStateChanged est le "détecteur" magique de Firebase.
    // Il s'exécute une fois au chargement, puis à chaque fois
    // que l'utilisateur se connecte ou se déconnecte.
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // L'utilisateur est connecté
        setUser(user);
      } else {
        // L'utilisateur est déconnecté
        setUser(null);
      }
      setLoading(false); // Le chargement est terminé
    });

    // Nettoyer le détecteur quand le composant est "démonté"
    return () => unsubscribe();
  }, []); // Le tableau vide [] signifie que cet effet ne s'exécute qu'une fois (au montage)

  const value = { user, loading };

  // Affiche un écran de chargement si Firebase n'a pas encore répondu
  // (pour éviter les "flashs" de contenu)
  if (loading) {
    return <div>Chargement de l'application...</div>;
  }

  // Rend le contexte disponible à tous les enfants (notre application)
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// 3. Créer le "Hook" (Raccourci)
// C'est ce que nos composants utiliseront pour accéder aux infos
export const useAuth = () => {
  return useContext(AuthContext);
};