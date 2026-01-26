

# Plan : Page Catégorie Dédiée avec Grille 3 Colonnes et Mode Feed Mobile

## Objectif

Créer une page dédiée pour chaque catégorie avec :
- URL propre et partageable
- Layout **3 colonnes** sur desktop (plus aéré)
- Mode **Feed immersif 1 colonne** sur mobile (réutilisant le travail précédent)

## Architecture de la Page

```text
+--------------------------------------------------+
|  [← Retour]     Logo     [Panier]                |
+--------------------------------------------------+
|                                                  |
|  ┌──────────────────────────────────────────┐   |
|  │     [Image de couverture catégorie]       │   |
|  │                                           │   |
|  │     MODE                                  │   |
|  │     12 produits disponibles              │   |
|  └──────────────────────────────────────────┘   |
|                                                  |
+--------------------------------------------------+
|  [Rechercher...]    [Toggle]    Trier: [Récents]|
+--------------------------------------------------+
|                                                  |
|  ┌──────┐  ┌──────┐  ┌──────┐                   |
|  │      │  │      │  │      │                   |
|  │  P1  │  │  P2  │  │  P3  │  ← 3 colonnes     |
|  │      │  │      │  │      │                   |
|  └──────┘  └──────┘  └──────┘                   |
|                                                  |
+--------------------------------------------------+
```

## Responsive Design

| Écran | Layout |
|-------|--------|
| Mobile (< 768px) | **1 colonne Feed** (ratio 4:5, immersif) |
| Tablette (768-1024px) | 2 colonnes grille |
| Desktop (> 1024px) | **3 colonnes** grille |

## Fichiers à Créer/Modifier

### 1. CRÉER : `src/pages/CategoryPage.tsx`

Nouvelle page dédiée avec :
- Header avec bouton retour et panier
- Hero de catégorie (image, nom, nombre de produits)
- Toggle Grille/Feed (réutilise ViewModeToggle)
- Barre de recherche et tri
- Grille de produits avec ModernProductCard
- Bottom navigation mobile

```tsx
// Structure principale
const CategoryPage = () => {
  const { shopUrl, categorySlug } = useParams();
  const [viewMode, setViewMode] = useState<'grid' | 'feed'>('feed');
  
  // Grille responsive : 1 col feed / 2 col tablette / 3 col desktop
  const gridClasses = viewMode === 'feed'
    ? 'flex flex-col gap-4 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6'
    : 'grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6';
    
  return (
    <div className="min-h-screen bg-background">
      <CategoryHeader shopUrl={shopUrl} cartCount={cart.length} />
      <CategoryHero category={category} productCount={products.length} />
      <FilterBar viewMode={viewMode} onViewModeChange={setViewMode} />
      <ProductGrid products={products} viewMode={viewMode} />
      <BottomNavMobile /> {/* Sur mobile */}
    </div>
  );
};
```

### 2. MODIFIER : `src/App.tsx`

Ajouter la nouvelle route :
```tsx
import CategoryPage from './pages/CategoryPage';

// Dans les routes publiques
<Route path="/shop/:shopUrl/category/:categorySlug" element={<CategoryPage />} />
```

### 3. MODIFIER : `src/components/shop/CategoryShowcase.tsx`

Changer le comportement du clic pour naviguer vers la page dédiée :
```tsx
import { useNavigate } from 'react-router-dom';
import { slugify } from '@/lib/utils';

// Ajouter shopUrl en props
interface CategoryShowcaseProps {
  categories: Category[];
  products: Product[];
  shopUrl: string; // NOUVEAU
  onCategoryClick?: (categoryName: string) => void; // Optionnel maintenant
}

// Dans le composant
const navigate = useNavigate();

const handleCategoryClick = (category: Category) => {
  const slug = slugify(category.name);
  navigate(`/shop/${shopUrl}/category/${slug}`);
};
```

### 4. MODIFIER : `src/lib/utils.ts`

Ajouter la fonction slugify :
```tsx
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Supprime accents
    .replace(/[^a-z0-9]+/g, '-')     // Remplace caractères spéciaux par tirets
    .replace(/(^-|-$)/g, '');        // Supprime tirets en début/fin
}
```

### 5. MODIFIER : `src/pages/Shop.tsx`

Passer `shopUrl` au composant CategoryShowcase :
```tsx
<CategoryShowcase
  categories={categories}
  products={products}
  shopUrl={shopUrl || ''}
/>
```

## Composants Réutilisés

Le travail précédent sur le thème Modern sera réutilisé :

| Composant | Utilisation |
|-----------|-------------|
| `ViewModeToggle` | Toggle grille/feed dans CategoryPage |
| `ModernProductCard` | Cartes produit avec variant 'grid' ou 'feed' |
| `BottomNavMobile` | Navigation mobile en bas de page |
| `ModernHeader` | Header de la page catégorie |

## Flux Utilisateur

```text
1. Boutique principale (/shop/ma-boutique)
   │
   ├── Clic sur catégorie "Mode"
   │
   ▼
2. Page catégorie (/shop/ma-boutique/category/mode)
   │
   ├── Hero avec image et titre "MODE"
   ├── Toggle Grille/Feed
   ├── 12 produits affichés
   │   └── Desktop: 3 colonnes
   │   └── Mobile: 1 colonne Feed immersif
   │
   ├── Bouton retour → Retour à la boutique
   │
   ▼
3. Clic sur produit → Page détail produit
```

## Classes Tailwind pour la Grille

```tsx
// Mode Feed (mobile par défaut)
const feedClasses = "flex flex-col gap-4 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6";

// Mode Grille
const gridClasses = "grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6";

// Déterminer la variante de carte
const cardVariant = viewMode === 'feed' && isMobile ? 'feed' : 'grid';
```

## Avantages de cette Approche

1. **Cohérence** : Réutilise le système Feed/Grille déjà créé
2. **SEO** : URLs propres indexables par Google
3. **Partage** : Liens directs vers catégories spécifiques
4. **UX Mobile** : Mode Feed immersif déjà validé par les utilisateurs
5. **Aéré** : 3 colonnes desktop = meilleure lisibilité que 4

