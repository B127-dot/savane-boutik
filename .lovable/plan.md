

# Ajouter des Transitions de Page Fluides (Style Vercel)

## Objectif
Ajouter un effet de glissement/fondu fluide lors de la navigation entre les pages du dashboard (Accueil, Statistiques, Produits, Commandes, etc.), similaire a l'experience Vercel.

## Approche Technique

### 1. Wrapper AnimatePresence dans App.tsx
Encapsuler les Routes avec `AnimatePresence` de framer-motion pour detecter les changements de route et animer les transitions entree/sortie.

Comme `react-router-dom` v6 ne supporte pas nativement `AnimatePresence` sur `<Routes>`, on va creer un composant `AnimatedRoutes` qui utilise `useLocation()` comme cle pour declencher les animations.

### 2. Appliquer PageTransition aux pages du dashboard
Wrapper chaque page protegee (Dashboard, Analytics, Products, Orders, Reviews, Categories, ShopSettings, ShopEditor, Settings, Marketing, PaymentIntegration) avec le composant `PageTransition` existant.

### 3. Optimiser l'animation PageTransition
Ajuster les parametres pour un effet plus subtil et rapide, inspire de Vercel :
- Reduire la duree de 0.4s a 0.25s
- Utiliser uniquement un fondu + leger glissement vertical (pas de scale ni de x)
- Easing cubic-bezier fluide

## Fichiers a modifier

### `src/components/PageTransition.tsx`
- Changer l'animation : remplacer le deplacement horizontal (x: 20) par un leger deplacement vertical (y: 8)
- Supprimer le scale pour un effet plus propre
- Reduire la duree a 0.25s

### `src/App.tsx`
- Creer un composant `AnimatedRoutes` interne qui utilise `useLocation()` et `AnimatePresence`
- Wrapper les routes protegees avec `PageTransition`

### Pages concernees (14 pages)
Wrapper avec `PageTransition` :
- Dashboard, Analytics, Products, Orders, Reviews, Categories
- ShopSettings, ShopEditor, Settings, Marketing, PaymentIntegration
- Shop, ProductDetail, Checkout

## Resultat attendu
Navigation fluide avec un leger fondu + glissement vers le haut lors du changement de page, creant une experience premium similaire a Vercel.

