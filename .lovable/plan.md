
# Plan de Correction : Débordement Horizontal sur Mobile

## Problèmes Identifiés

En analysant l'image et le code, j'ai identifié **4 sources principales** de débordement horizontal sur mobile :

### 1. Absence de `overflow-x-hidden` sur le conteneur principal Shop
- **Fichier** : `src/pages/Shop.tsx` (ligne 921)
- **Problème** : Le conteneur principal du thème Modern n'a pas `overflow-x-hidden`, contrairement à d'autres pages comme `Index.tsx` et `Login.tsx` qui l'utilisent.
- **Impact** : Les éléments larges (marquee, animations, stats) peuvent déborder horizontalement.

### 2. Grille des Stats dans le Hero trop large sur mobile
- **Fichier** : `src/components/shop/themes/modern/ModernHero.tsx` (ligne 250)
- **Problème** : La grille `grid-cols-3` avec `gap-6` et les textes larges peuvent dépasser la largeur du viewport sur petits écrans (320px-375px).
- **Impact** : Les labels comme "Note moyenne" ou "Clients" débordent, causant le scroll horizontal visible sur la capture d'écran.

### 3. Espace insuffisant dans les Headers sur très petits écrans
- **Fichier** : `src/components/shop/headers/GlassHeader.tsx` (ligne 33)
- **Problème** : Le padding `px-4` combiné au conteneur interne `px-6` peut créer des éléments trop larges sur mobile 320px.

### 4. Section Testimonials Marquee
- **Fichier** : `src/components/ui/testimonials-with-marquee.tsx`
- **Problème** : Bien que la section ait `overflow-hidden`, le conteneur parent pourrait ne pas hériter cette contrainte.

## Architecture des Corrections

```text
┌───────────────────────────────────────────────────┐
│ AVANT (débordement)                               │
├───────────────────────────────────────────────────┤
│                                                   │
│  ┌─────────────────────────────────────────────┐  │
│  │ Shop.tsx (pas d'overflow-x-hidden)          │  │
│  │ ┌─────────────────────────────────────────┐ │  │
│  │ │ Hero Stats: 500+ | 1000+ | 4.9★         │→│←─ Déborde
│  │ └─────────────────────────────────────────┘ │  │
│  └─────────────────────────────────────────────┘  │
│                                                   │
└───────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────┐
│ APRÈS (contenu contenu)                           │
├───────────────────────────────────────────────────┤
│                                                   │
│  ┌─────────────────────────────────────────────┐  │
│  │ Shop.tsx (overflow-x-hidden)                │  │
│  │ ┌─────────────────────────────────────────┐ │  │
│  │ │ Hero Stats adaptifs sur mobile          │ │  │
│  │ │   500+        1000+        4.9★         │ │  │
│  │ │  Produits    Clients       Note         │ │  │
│  │ └─────────────────────────────────────────┘ │  │
│  └─────────────────────────────────────────────┘  │
│                                                   │
└───────────────────────────────────────────────────┘
```

---

## Fichiers à Modifier

### 1. `src/pages/Shop.tsx`

**Modification** : Ajouter `overflow-x-hidden` au conteneur principal de chaque thème.

```tsx
// Ligne 921 - Thème Modern (et autres thèmes similaires)
// AVANT :
<div className={`min-h-screen pb-20 md:pb-0 bg-background ${fontClass}`}>

// APRÈS :
<div className={`min-h-screen pb-20 md:pb-0 bg-background overflow-x-hidden ${fontClass}`}>
```

Cette modification s'appliquera à tous les thèmes (Modern, Artisan, Aesthetique, Y2k, Savane, Urbanwave).

---

### 2. `src/components/shop/themes/modern/ModernHero.tsx`

**Modifications** :

a) **Réduire l'espace entre les stats sur mobile** (ligne 250) :
```tsx
// AVANT :
className={`grid grid-cols-3 gap-6 mt-16 transition-all ...`}

// APRÈS :
className={`grid grid-cols-3 gap-2 sm:gap-6 mt-12 sm:mt-16 transition-all ...`}
```

b) **Adapter la taille du texte des stats sur mobile** (ligne 73) :
```tsx
// AVANT :
className="text-3xl md:text-4xl font-display font-bold text-white mb-2"

// APRÈS :
className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white mb-1 sm:mb-2"
```

c) **Tronquer ou adapter les labels trop longs** (ligne 76) :
```tsx
// AVANT :
<div className="font-body text-white/70 text-sm">{label}</div>

// APRÈS :
<div className="font-body text-white/70 text-[10px] sm:text-xs md:text-sm truncate max-w-[80px] sm:max-w-none mx-auto">{label}</div>
```

d) **Ajouter un padding horizontal au conteneur** (ligne 160) :
```tsx
// AVANT :
<div className="relative z-10 container mx-auto px-4">

// APRÈS :
<div className="relative z-10 container mx-auto px-3 sm:px-4">
```

---

### 3. `src/components/shop/headers/GlassHeader.tsx`

**Modifications** :

a) **Réduire le padding sur très petits écrans** (ligne 33) :
```tsx
// AVANT :
<header className="fixed top-0 left-0 right-0 z-50 py-4 px-4 lg:px-8">

// APRÈS :
<header className="fixed top-0 left-0 right-0 z-50 py-3 sm:py-4 px-2 sm:px-4 lg:px-8">
```

b) **Réduire le padding interne du conteneur** (ligne 34) :
```tsx
// AVANT :
<div className={`relative max-w-7xl mx-auto rounded-2xl px-6 transition-all ...`}>

// APRÈS :
<div className={`relative max-w-7xl mx-auto rounded-2xl px-3 sm:px-6 transition-all ...`}>
```

---

### 4. `src/components/shop/headers/MinimalHeader.tsx`

**Modification** : Réduire les marges sur mobile (ligne 27) :
```tsx
// AVANT :
<div className="mx-6">

// APRÈS :
<div className="mx-3 sm:mx-6">
```

---

### 5. `src/components/shop/headers/GradientHeader.tsx`

**Modification** : Réduire le padding sur mobile (ligne 26) :
```tsx
// AVANT :
<nav className={`flex md:px-12 md:py-6 px-6 py-4 ...`}>

// APRÈS :
<nav className={`flex md:px-12 md:py-6 px-3 sm:px-6 py-4 ...`}>
```

---

### 6. `src/components/ui/testimonials-with-marquee.tsx`

**Modification** : S'assurer que le conteneur parent gère bien l'overflow (ligne 22) :
```tsx
// AVANT :
<section className={cn("py-16 md:py-20 overflow-hidden", className)}>

// APRÈS :
<section className={cn("py-12 sm:py-16 md:py-20 overflow-hidden w-full", className)}>
```

Et ajuster le padding du conteneur interne :
```tsx
// AVANT :
<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

// APRÈS :
<div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
```

---

## Résumé des Changements

| Fichier | Type de Correction | Impact |
|---------|-------------------|--------|
| `Shop.tsx` (tous thèmes) | Ajouter `overflow-x-hidden` | Empêche tout débordement global |
| `ModernHero.tsx` | Responsive stats + gaps réduits | Stats visibles sur 320px |
| `GlassHeader.tsx` | Padding réduit sur mobile | Header compact sur petits écrans |
| `MinimalHeader.tsx` | Marges réduites sur mobile | Plus d'espace pour le contenu |
| `GradientHeader.tsx` | Padding réduit sur mobile | Header bien contenu |
| `testimonials-with-marquee.tsx` | Largeur 100% + padding réduit | Marquee bien contenu |

---

## Résultat Attendu

Après ces corrections :
1. Plus de scroll horizontal sur mobile (320px à 428px)
2. Les statistiques du Hero seront lisibles sur tous les écrans
3. Les headers resteront contenus sans débordement
4. La section témoignages avec marquee sera parfaitement alignée
5. L'expérience utilisateur sera fluide sur tous les appareils
