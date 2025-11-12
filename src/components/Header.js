"use client"; // Ce composant est interactif (boutons), c'est un "Client Component"

import React from 'react';
// On importe notre "Hook" pour savoir si l'utilisateur est connecté
import { useAuth } from '../context/AuthContext.js';
// On importe "auth" de Firebase...
import { auth } from '../firebaseConfig.js';
// ...et les fonctions de connexion/déconnexion de Google
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

export default function Header() {
  // On récupère l'utilisateur depuis notre Contexte
  const { user, loading } = useAuth();

  // Fonction de connexion avec Google
  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      // Firebase gère le reste, l'AuthProvider (fichier 1)
      // détectera le changement et mettra à jour l'état "user".
    } catch (error) {
      console.error("Erreur lors de la connexion Google:", error);
    }
  };

  // Fonction de déconnexion
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      // L'AuthProvider détectera le changement.
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      backgroundColor: '#fff',
      borderBottom: '1px solid #eaeaea'
    }}>
      <div className="logo" style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
        Ink<span style={{ color: '#2563EB' }}>Up</span> {/* J'utilise le bleu de votre logo */}
      </div>
      
      <nav>
        {/* C'est la logique conditionnelle : */}
        {loading ? (
          <div>Chargement...</div>
        ) : user ? (
          // Si l'utilisateur EST connecté
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img 
              src={user.photoURL || 'https://placehold.co/40x40'} 
              alt="Avatar" 
              style={{ width: '40px', height: '40px', borderRadius: '50%' }}
            />
            <span>Bonjour, {user.displayName}</span>
            <button onClick={handleSignOut} style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>
              Déconnexion
            </button>
          </div>
        ) : (
          // Si l'utilisateur N'EST PAS connecté
          <button onClick={handleSignIn} style={{ padding: '0.5rem 1rem', cursor: 'pointer', backgroundColor: '#2563EB', color: 'white', border: 'none', borderRadius: '5px' }}>
            Connexion avec Google
          </button>
        )}
      </nav>
    </header>
  );
}