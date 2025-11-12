import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// --- IMPORTS CORRIGÉS ---
// On importe le "Fournisseur" de Contexte (le "Cerveau")
import { AuthProvider } from "../context/AuthContext.js"; 
// On importe le "Header" (la barre de navigation)
import Header from "../components/Header.js"; 
// --- FIN ---

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "InkUp - La plateforme de BD Indé",
  description: "Le lien direct auteur-lecteur.",
};

// C'est le "Layout" principal (Server Component)
// CE FICHIER NE DOIT PAS UTILISER "useAuth()" OU "loading"
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        {/* 1. On enveloppe TOUTE l'application dans le "Cerveau" (AuthProvider). 
             C'est LUI qui gère le "loading" à l'intérieur.
        */}
        <AuthProvider>
          
          {/* 2. On affiche le Header en haut de chaque page */}
          {/* Header est un ENFANT de AuthProvider, il peut donc utiliser "useAuth()" */}
          <Header /> 
          
          {/* 3. "children" représente la page actuelle (ex: page.tsx) */}
          {/* page.tsx est aussi un ENFANT, il peut donc utiliser "useAuth()" */}
          <main style={{ padding: '2rem' }}>
            {children}
          </main>
          
        </AuthProvider>
      </body>
    </html>
  );
}