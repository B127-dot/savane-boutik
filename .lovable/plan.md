
# Plan : Intégration de la Section Témoignages avec Effet Marquee

## Objectif

Intégrer un nouveau composant de témoignages avec un effet de défilement horizontal infini (marquee) dans le thème Modern, créant une présentation plus dynamique et moderne des avis clients.

## Analyse du Projet

### Ce qui existe déjà
- **Avatar component** : `src/components/ui/avatar.tsx` ✅ (déjà installé)
- **Dépendance `@radix-ui/react-avatar`** : ✅ (déjà dans package.json)
- **`TestimonialsBlock`** : `src/components/shop/blocks/TestimonialsBlock.tsx` (version grille statique)
- **Animations scroll** : Le `tailwind.config.ts` a déjà `scroll-left` et `scroll-right` keyframes

### Ce qui manque
- Le composant `TestimonialCard` pour la version marquee
- Le composant `TestimonialsSection` avec l'effet marquee
- L'animation `marquee` dans Tailwind config
- L'intégration dans le thème Modern

## Architecture des Fichiers

```text
src/components/ui/
├── avatar.tsx                    ← Existe déjà ✅
├── testimonial-card.tsx          ← À créer (carte individuelle)
└── testimonials-with-marquee.tsx ← À créer (section avec marquee)

src/pages/Shop.tsx                ← À modifier (ajouter la section)
tailwind.config.ts                ← À modifier (ajouter animation marquee)
```

## Fichiers à Créer/Modifier

### 1. CRÉER : `src/components/ui/testimonial-card.tsx`

Composant de carte de témoignage individuelle avec avatar, nom et avis.

```tsx
// Structure :
// - Avatar avec image (via Radix Avatar)
// - Nom et handle (@pseudonyme)
// - Texte du témoignage
// - Lien optionnel vers le profil
```

### 2. CRÉER : `src/components/ui/testimonials-with-marquee.tsx`

Section complète avec :
- Titre et description
- Effet marquee (défilement horizontal infini)
- Dégradés de fondu sur les bords (fade-out)
- Duplication automatique des cartes pour l'effet infini

```tsx
// Props :
interface TestimonialsSectionProps {
  title: string
  description: string
  testimonials: Array<{
    author: TestimonialAuthor
    text: string
    href?: string
  }>
  className?: string
}
```

### 3. MODIFIER : `tailwind.config.ts`

Ajouter l'animation marquee et la largeur max-container :

```js
// Dans extend.maxWidth :
container: "1280px",

// Dans extend.keyframes :
marquee: {
  from: { transform: 'translateX(0)' },
  to: { transform: 'translateX(calc(-100% - var(--gap)))' }
}

// Dans extend.animation :
marquee: 'marquee var(--duration) linear infinite',
```

### 4. MODIFIER : `src/pages/Shop.tsx`

Intégrer la nouvelle section de témoignages dans le thème Modern, entre les produits et le footer :

```tsx
// Import
import { TestimonialsSection } from '@/components/ui/testimonials-with-marquee';

// Données par défaut (localisées en français pour Burkina Faso)
const TESTIMONIALS_DATA = [
  {
    author: {
      name: "Fatou Traoré",
      handle: "@fatou_style",
      avatar: "https://images.unsplash.com/..."
    },
    text: "Livraison ultra rapide ! J'ai reçu ma commande en 24h à Ouagadougou."
  },
  // ... autres témoignages
];

// Dans le rendu du thème Modern
<TestimonialsSection
  title="Ce que nos clients disent"
  description="Rejoignez des milliers de clients satisfaits"
  testimonials={TESTIMONIALS_DATA}
/>
```

## Données des Témoignages (Burkinabization)

Les témoignages seront localisés pour le marché burkinabè :

| Nom | Handle | Avis |
|-----|--------|------|
| Fatou Traoré | @fatou_style | Livraison ultra rapide ! J'ai reçu ma commande en 24h. |
| Ibrahim Kaboré | @ibrahim_biz | Le paiement Orange Money est très pratique. Service 5 étoiles ! |
| Aminata Ouédraogo | @aminata_mode | Produits de qualité et service client exceptionnel via WhatsApp. |
| Moussa Sawadogo | @moussa_tech | Ma boutique préférée ! Les prix sont imbattables et la livraison fiable. |
| Adama Compaoré | @adama_shop | J'ai commandé 3 fois déjà. Jamais déçue ! |
| Salamata Zongo | @sala_chic | Excellent rapport qualité-prix. Je recommande vivement ! |

## Effet Visuel

```text
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│              Ce que nos clients disent                      │
│     Rejoignez des milliers de clients satisfaits            │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│ ░░░                                                     ░░░ │
│ ░░░  ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐    ░░░ │
│ ░░░  │ Fatou  │→ │Ibrahim │→ │Aminata │→ │ Moussa │→   ░░░ │
│ ░░░  │ ★★★★★  │  │ ★★★★★  │  │ ★★★★★  │  │ ★★★★★  │    ░░░ │
│ ░░░  │ "..."  │  │ "..."  │  │ "..."  │  │ "..."  │    ░░░ │
│ ░░░  └────────┘  └────────┘  └────────┘  └────────┘    ░░░ │
│ ░░░                                                     ░░░ │
│     ← Dégradé fade-out                  Dégradé fade-out → │
└─────────────────────────────────────────────────────────────┘
                           ↓
            Défilement horizontal infini ←────────────────────┘
```

## Avantages de cette Approche

1. **Effet WOW** : Le défilement continu attire l'œil et crée une impression de dynamisme
2. **Social Proof** : Les témoignages renforcent la confiance des acheteurs
3. **Localisation** : Noms et contextes burkinabè pour l'authenticité
4. **Performance** : Animation CSS pure, pas de JavaScript
5. **Accessibilité** : Support du `prefers-reduced-motion`
6. **Réutilisable** : Composant UI indépendant dans `/components/ui`

## Ordre d'Implémentation

1. Étendre `tailwind.config.ts` avec l'animation marquee
2. Créer `testimonial-card.tsx` (composant de carte)
3. Créer `testimonials-with-marquee.tsx` (section complète)
4. Intégrer dans `Shop.tsx` pour le thème Modern
