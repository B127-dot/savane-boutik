

# Plan : Indicateur Glissant pour la Sidebar

## Objectif

Transformer l'indicateur d'état actif de la sidebar en un **indicateur glissant fluide** qui se déplace visuellement d'un élément de menu à l'autre, créant une expérience utilisateur premium et moderne.

## Fonctionnement Technique

L'indicateur glissant fonctionne en calculant dynamiquement la position verticale de l'élément actif et en déplaçant un élément visuel (le "pill" ou "indicator") vers cette position avec une transition CSS fluide.

```text
+-------------------+        +-------------------+
|   [ ] Accueil     |   -->  | [====] Accueil    |
|                   |        |                   |
| [====] Produits   |   -->  |   [ ] Produits    |
|                   |        |                   |
|   [ ] Commandes   |        |   [ ] Commandes   |
+-------------------+        +-------------------+
     AVANT                        APRÈS
```

L'indicateur vert **glisse verticalement** de "Produits" vers "Accueil" au lieu de disparaître puis réapparaître.

---

## Modifications Techniques

### Fichier : `src/components/Sidebar.tsx`

**1. Ajouter un ref pour tracker les positions des éléments**

```tsx
// Nouveaux imports et états
import { useRef, useEffect, useState, useLayoutEffect } from 'react';

// Dans le composant Sidebar
const navRef = useRef<HTMLDivElement>(null);
const itemRefs = useRef<Map<string, HTMLElement>>(new Map());
const [indicatorStyle, setIndicatorStyle] = useState({ top: 0, height: 0, opacity: 0 });
```

**2. Calculer la position de l'indicateur**

```tsx
// Calculer la position de l'indicateur basé sur l'élément actif
useLayoutEffect(() => {
  const activeHref = location.pathname;
  const activeElement = itemRefs.current.get(activeHref);
  
  if (activeElement && navRef.current) {
    const navRect = navRef.current.getBoundingClientRect();
    const itemRect = activeElement.getBoundingClientRect();
    
    setIndicatorStyle({
      top: itemRect.top - navRect.top + navRef.current.scrollTop,
      height: itemRect.height,
      opacity: 1
    });
  }
}, [location.pathname, expandedItems]);
```

**3. Créer l'élément indicateur glissant**

```tsx
// Indicateur glissant avec transition fluide
<div
  className="absolute left-0 right-0 mx-2 pointer-events-none z-0 
             bg-gradient-to-r from-primary to-primary/85 
             rounded-lg shadow-lg shadow-primary/30
             transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
  style={{
    top: `${indicatorStyle.top}px`,
    height: `${indicatorStyle.height}px`,
    opacity: indicatorStyle.opacity
  }}
/>
```

**4. Modifier les refs des éléments de navigation**

```tsx
// Dans renderNavItem, ajouter un ref callback
<div
  ref={(el) => {
    if (el) itemRefs.current.set(item.href, el);
    else itemRefs.current.delete(item.href);
  }}
  className={`... relative z-10 ...`}  // z-10 pour être au-dessus de l'indicateur
>
```

**5. Ajuster les styles des éléments pour transparence**

Les éléments actifs doivent être **transparents** (pas de background propre) pour laisser voir l'indicateur glissant en dessous :

```tsx
// AVANT (background sur l'élément actif)
${isActive 
  ? 'bg-gradient-to-r from-primary to-primary/85 text-primary-foreground shadow-lg...' 
  : '...'}

// APRÈS (pas de background, juste le texte blanc)
${isActive 
  ? 'text-primary-foreground' 
  : 'text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground'}
```

---

## Animation au Survol (Bonus)

Pour un effet encore plus premium, on peut ajouter un **indicateur de survol** qui suit le curseur :

```tsx
// État pour le survol
const [hoverStyle, setHoverStyle] = useState({ top: 0, height: 0, opacity: 0 });

// Indicateur de survol (plus subtil que l'actif)
<div
  className="absolute left-0 right-0 mx-2 pointer-events-none z-0 
             bg-accent/50 rounded-lg
             transition-all duration-200 ease-out"
  style={{
    top: `${hoverStyle.top}px`,
    height: `${hoverStyle.height}px`,
    opacity: hoverStyle.opacity
  }}
/>

// Gestionnaires onMouseEnter/onMouseLeave sur chaque élément
onMouseEnter={(e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  const navRect = navRef.current?.getBoundingClientRect();
  if (navRect) {
    setHoverStyle({
      top: rect.top - navRect.top,
      height: rect.height,
      opacity: 1
    });
  }
}}
onMouseLeave={() => setHoverStyle(prev => ({ ...prev, opacity: 0 }))}
```

---

## Gestion des Sous-menus

Pour les sous-menus (comme "Produits > Tous les produits"), l'indicateur doit également pouvoir glisser vers les sous-éléments :

```tsx
// Stocker les refs des sous-éléments aussi
ref={(el) => {
  if (el) itemRefs.current.set(subItem.href, el);
  else itemRefs.current.delete(subItem.href);
}}
```

---

## Détails Techniques

| Aspect | Détail |
|--------|--------|
| **Courbe d'animation** | `cubic-bezier(0.25, 0.1, 0.25, 1)` - Easing naturel et fluide |
| **Durée de transition** | `300ms` pour le glissement actif, `200ms` pour le survol |
| **Z-index** | Indicateur = `z-0`, Éléments = `z-10` |
| **Position** | `absolute` dans un conteneur `relative` |
| **Recalcul** | Sur changement de route (`location.pathname`) |

---

## Comportement Attendu

1. **Au clic sur "Statistiques"** : L'indicateur vert glisse de "Accueil" vers "Statistiques" en 300ms
2. **Au survol d'un élément** : Un highlight subtil apparaît sous le curseur
3. **Ouverture d'un sous-menu** : L'indicateur peut glisser vers un sous-élément
4. **Mode collapsed** : L'indicateur s'adapte à la taille réduite des icônes

---

## Résumé des Modifications

| Fichier | Modification |
|---------|--------------|
| `src/components/Sidebar.tsx` | Refonte complète du système d'indicateur actif avec refs, calcul de position, et deux indicateurs animés (actif + survol) |

---

## Impact Visuel

**Avant** : L'indicateur vert apparaît/disparaît instantanément sur chaque élément
**Après** : L'indicateur vert **glisse fluidement** d'un élément à l'autre, créant une sensation de navigation premium et réactive

Cette amélioration donne une sensation de **fluidité Apple/Google** à la sidebar, élevant significativement la perception de qualité de l'interface.

