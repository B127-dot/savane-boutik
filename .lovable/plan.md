
# Plan de Correction : Supprimer la Couche Blanche Derrière les Headers

## Problème Identifié

Les captures d'écran montrent clairement une **bande blanche** entre le header et le hero. Cela se produit parce que les headers alternatifs (`GlassHeader`, `MinimalHeader`, `GradientHeader`) utilisent :

1. **`position: sticky`** au lieu de **`position: fixed`**
2. Des **fonds opaques** (`bg-background`) au lieu de transparents
3. Du **padding externe** qui crée un espace visible

### Comparaison des Headers

| Header | Position | Fond Initial | Problème |
|--------|----------|--------------|----------|
| `ModernHeader` ✅ | `fixed` | `bg-transparent` | Aucun |
| `GlassHeader` ❌ | `sticky` | `bg-background/60` | Bande blanche visible |
| `MinimalHeader` ❌ | `sticky` | `bg-background` | Bande blanche opaque |
| `GradientHeader` ❌ | `sticky` | `bg-background/80` | Bande blanche semi-transparente |

## Solution Proposée

Transformer tous les headers en **headers fixes et transparents** au départ, qui deviennent opaques au scroll (comme le `ModernHeader`).

### Modifications à Apporter

```text
┌─────────────────────────────────────────────────────────────┐
│ AVANT (sticky + fond blanc)                                 │
├─────────────────────────────────────────────────────────────┤
│ ╔══════════════════════════════════════════════════════════╗│
│ ║ Header [fond blanc]                                      ║│
│ ╠══════════════════════════════════════════════════════════╣│
│ ║                                                          ║│
│ ║               Hero (image)                               ║│
│ ║                                                          ║│
│ ╚══════════════════════════════════════════════════════════╝│
│                      ↑                                      │
│           Bande blanche visible ici                         │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ APRÈS (fixed + transparent)                                 │
├─────────────────────────────────────────────────────────────┤
│ ╔══════════════════════════════════════════════════════════╗│
│ ║ Header [transparent, flotte au-dessus]                   ║│
│ ║══════════════════════════════════════════════════════════║│
│ ║               Hero (image visible derrière)              ║│
│ ║                                                          ║│
│ ╚══════════════════════════════════════════════════════════╝│
│                                                             │
│           Pas de bande blanche !                            │
└─────────────────────────────────────────────────────────────┘
```

---

## Fichiers à Modifier

### 1. `src/components/shop/headers/GlassHeader.tsx`

**Avant :**
```tsx
<header className="sticky top-0 z-50 py-4 px-4 lg:px-8">
  <div className="... bg-background/60 ...">
```

**Après :**
```tsx
const [isScrolled, setIsScrolled] = useState(false);

useEffect(() => {
  const handleScroll = () => setIsScrolled(window.scrollY > 20);
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);

<header className="fixed top-0 left-0 right-0 z-50 py-4 px-4 lg:px-8">
  <div className={`... ${isScrolled ? 'bg-background/80 shadow-lg' : 'bg-transparent border-transparent'} ...`}>
```

### 2. `src/components/shop/headers/MinimalHeader.tsx`

**Avant :**
```tsx
<header className="sticky top-0 z-50 bg-background">
```

**Après :**
```tsx
const [isScrolled, setIsScrolled] = useState(false);

useEffect(() => {
  const handleScroll = () => setIsScrolled(window.scrollY > 20);
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);

<header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
  isScrolled ? 'bg-background/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
}`}>
```

### 3. `src/components/shop/headers/GradientHeader.tsx`

**Avant :**
```tsx
<header className="sticky top-0 z-50">
  <nav className="... bg-background/80 backdrop-blur-md">
```

**Après :**
```tsx
const [isScrolled, setIsScrolled] = useState(false);

useEffect(() => {
  const handleScroll = () => setIsScrolled(window.scrollY > 20);
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);

<header className="fixed top-0 left-0 right-0 z-50">
  <nav className={`... transition-all duration-300 ${
    isScrolled ? 'bg-background/80 backdrop-blur-md' : 'bg-transparent'
  }`}>
```

---

## Ajustements Visuels Complémentaires

### Couleur du Texte

Les liens de navigation et le nom de la boutique doivent également s'adapter :
- **Quand transparent** : Texte blanc (visible sur l'image hero sombre)
- **Quand scrolled** : Texte normal (`text-foreground`)

```tsx
// Exemple pour les liens
className={`... ${isScrolled ? 'text-foreground' : 'text-white'} ...`}
```

### GlassHeader Spécifique

Le GlassHeader a un design "flottant" avec des bords arrondis. Pour maintenir ce style tout en étant transparent :
- Conserver le `rounded-2xl` 
- Rendre la bordure transparente quand non scrolled
- Appliquer le backdrop-blur uniquement au scroll

---

## Résumé des Changements

| Fichier | Changement Principal |
|---------|---------------------|
| `GlassHeader.tsx` | `sticky` → `fixed`, fond dynamique, texte adaptatif |
| `MinimalHeader.tsx` | `sticky` → `fixed`, fond transparent → opaque au scroll |
| `GradientHeader.tsx` | `sticky` → `fixed`, fond transparent → gradient au scroll |

## Résultat Attendu

Après ces modifications :
1. L'image hero sera visible à 100% derrière tous les headers
2. Le header "flottera" au-dessus du contenu
3. Au scroll, le header deviendra opaque avec backdrop-blur
4. Plus aucune bande blanche visible
