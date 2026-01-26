
# Plan de Redesign Immersif des Cartes Produit - Thème Modern

## Contexte du Problème

Les utilisateurs trouvent que la grille actuelle à 2 colonnes sur mobile n'est **"pas intéressante"**. Le problème :
- Les cartes sont trop petites et comprimées
- Difficile de voir les détails des produits
- L'expérience n'est pas immersive ni engageante
- Ne correspond pas aux standards modernes (Instagram, TikTok, etc.)

## Solution Proposée : Layout Hybride Adaptatif

Créer un système de présentation qui s'adapte au nombre de produits et au type d'affichage souhaité :

### Option A : Mode "Feed" (Style Instagram) - RECOMMANDÉ
Sur mobile, afficher les produits en **une seule colonne** avec des cartes plus grandes et immersives.

```
+----------------------------------------+
|  [Image produit - Grande, ratio 4:5]   |
|                                        |
|  ❤️ 👁️                                |
|                                        |
+----------------------------------------+
|  ⭐⭐⭐⭐⭐  |  NOUVEAU                |
|  Laptop Gaming                          |
|  650 000 FCFA                          |
|  [🛒 Ajouter au panier]                |
+----------------------------------------+
        (swipe up pour le suivant)
```

### Option B : Mode "Showcase" Alterné
Premier produit en pleine largeur (featured), puis grille 2 colonnes.

```
+----------------------------------------+
|     [Produit 1 - Full Width]           |
+----------------------------------------+
+-----------------+  +-----------------+
| [Produit 2]     |  | [Produit 3]     |
+-----------------+  +-----------------+
```

## Modifications Techniques

### 1. ModernProductGrid.tsx - Nouveau Layout Adaptatif

**Changement de la grille mobile :**
- Avant : `grid-cols-2` (2 colonnes sur mobile)
- Après : `grid-cols-1 sm:grid-cols-2` (1 colonne sur petit mobile, 2 sur grand mobile/tablette)

**Ajout d'un sélecteur de vue :**
- Bouton toggle pour choisir entre "Grille" et "Liste/Feed"
- Persistance du choix dans localStorage

```tsx
// Nouveau state pour le mode d'affichage
const [viewMode, setViewMode] = useState<'grid' | 'feed'>('feed');

// Classes dynamiques
const gridClasses = viewMode === 'feed' 
  ? 'flex flex-col gap-4 md:grid md:grid-cols-3 lg:grid-cols-4 md:gap-6'
  : 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6';
```

### 2. ModernProductCard.tsx - Variante "Feed"

Créer une variante de carte optimisée pour l'affichage en colonne unique :

**Ratio d'image ajusté :**
- Mode grille : `AspectRatio ratio={1}` (carré)
- Mode feed : `AspectRatio ratio={4/5}` (plus vertical, plus immersif)

**Layout horizontal pour le contenu en mode feed :**
```tsx
// En mode feed, le contenu s'affiche en ligne
<div className={variant === 'feed' 
  ? 'flex items-center justify-between p-4' 
  : 'p-3 md:p-4 space-y-2'
}>
```

**Informations enrichies en mode feed :**
- Nom complet du produit (pas de truncate)
- Description courte visible
- Prix plus grand et proéminent
- Bouton d'ajout au panier plus large

### 3. Nouveau Composant : ViewModeToggle

Petit toggle UI pour basculer entre les modes :

```tsx
const ViewModeToggle = ({ mode, onChange }) => (
  <div className="flex bg-muted rounded-lg p-1">
    <Button 
      variant={mode === 'feed' ? 'default' : 'ghost'}
      size="sm"
      onClick={() => onChange('feed')}
    >
      <LayoutList className="h-4 w-4" />
    </Button>
    <Button 
      variant={mode === 'grid' ? 'default' : 'ghost'}
      size="sm"
      onClick={() => onChange('grid')}
    >
      <LayoutGrid className="h-4 w-4" />
    </Button>
  </div>
);
```

### 4. Améliorations UX Additionnelles

**Animation de scroll fluide :**
- Snap-to-card en mode feed pour un défilement "TikTok-like"
- `scroll-snap-type: y mandatory` avec `scroll-snap-align: start`

**Lazy loading amélioré :**
- Charger les images au fur et à mesure du scroll
- Placeholder blur pendant le chargement

**Micro-interactions :**
- Parallax léger sur l'image au scroll
- Transition douce entre les modes grille/feed

## Fichiers à Modifier

| Fichier | Action |
|---------|--------|
| `src/components/shop/themes/modern/ModernProductGrid.tsx` | Ajouter state viewMode, toggle, et classes adaptatives |
| `src/components/shop/themes/modern/ModernProductCard.tsx` | Ajouter prop `variant: 'grid' \| 'feed'`, ajuster ratio et layout |
| (Nouveau) `src/components/shop/ViewModeToggle.tsx` | Créer composant toggle grille/liste |

## Résultat Visuel Attendu

### Avant (Problème actuel)
```
+--------+  +--------+
| Petit  |  | Petit  |
| carré  |  | carré  |
+--------+  +--------+
| Laptop |  | Phone  |
| 650K   |  | 450K   |
[Ajouter]  [Ajouter]
```
- Images comprimées
- Détails difficiles à lire
- Pas engageant

### Après (Mode Feed)
```
+----------------------------------+
|                                  |
|    [Grande image produit]        |
|         Ratio 4:5                |
|                                  |
|  ❤️ 👁️                          |
+----------------------------------+
| ⭐⭐⭐⭐⭐     NOUVEAU           |
| Laptop Gaming Pro 15"            |
| Le meilleur pour les gamers      |
|                                  |
| 650 000 FCFA                     |
| [  🛒 Ajouter au panier  ]       |
+----------------------------------+
```
- Image grande et immersive
- Tous les détails visibles
- Expérience Instagram/TikTok-like
- Plus engageant pour l'acheteur

## Avantages de cette Approche

1. **Flexibilité** : L'utilisateur choisit son mode préféré
2. **Immersion** : Le mode feed offre une expérience premium sur mobile
3. **Compatibilité** : Desktop reste en grille classique (comportement attendu)
4. **Progressive** : Amélioration sans casser l'existant
5. **Moderne** : Aligné avec les tendances TikTok/Instagram Shopping

## Détails Techniques

### Props ModernProductCard mise à jour
```tsx
interface ModernProductCardProps {
  product: Product;
  shopUrl: string;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onToggleWishlist?: (productId: string) => void;
  isInWishlist?: boolean;
  buttonStyle?: 'rounded' | 'pill' | 'square';
  variant?: 'grid' | 'feed'; // NOUVEAU
}
```

### Classes conditionnelles pour le mode feed
```tsx
// Container de la carte
className={cn(
  "group relative bg-card overflow-hidden transition-all duration-300",
  variant === 'feed' 
    ? "rounded-2xl border-0 shadow-lg" 
    : "rounded-xl border border-border hover:shadow-2xl hover:-translate-y-2"
)}

// Ratio d'image
<AspectRatio ratio={variant === 'feed' ? 4/5 : 1}>

// Zone de contenu
className={cn(
  variant === 'feed' 
    ? "p-4 space-y-3" 
    : "p-3 md:p-4 space-y-2 md:space-y-3"
)}
```
