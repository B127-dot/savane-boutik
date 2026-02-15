
# Optimisation Mobile du Dashboard Vendeur

## Contexte

Le dashboard vendeur est actuellement concu principalement pour desktop. Dans un marche ou le telephone mobile est l'outil principal des commercants, il est essentiel d'adapter chaque page pour une utilisation confortable sur ecrans 320px-428px.

## Strategie : Quoi montrer, quoi simplifier, quoi masquer

Voici l'approche par page, basee sur les priorites d'un commercant sur mobile :

```text
+---------------------+-------------------+---------------------------+
| Page                | Priorite Mobile   | Strategie                 |
+---------------------+-------------------+---------------------------+
| Dashboard           | HAUTE             | Vue simplifiee            |
| Commandes           | HAUTE             | Vue carte (pas tableau)   |
| Produits            | HAUTE             | Grille 1 col adaptee      |
| Statistiques        | MOYENNE           | Vue limitee               |
| Marketing           | MOYENNE           | Adapte                    |
| Avis clients        | BASSE             | Vue carte (pas tableau)   |
| Editeur visuel      | BASSE             | Banniere "desktop only"   |
| Reglages boutique   | MOYENNE           | Tabs horizontaux          |
| Parametres          | BASSE             | Adapte                    |
| Paiement            | BASSE             | Adapte                    |
+---------------------+-------------------+---------------------------+
```

## Modifications detaillees

### 1. Sidebar (src/components/Sidebar.tsx)
- Le bouton hamburger mobile existe deja mais est a `top-4 left-4` ce qui peut chevaucher le contenu des pages
- Ajouter un padding-top sur les pages pour laisser la place au bouton hamburger sur mobile (`pt-14 lg:pt-0`)
- Quand le sidebar mobile s'ouvre, fermer automatiquement au clic sur un lien de navigation

### 2. Dashboard (src/pages/Dashboard.tsx) - PRIORITE HAUTE
**Vue mobile simplifiee :**
- Header : reduire avatar a `h-10 w-10`, titre a `text-lg`, masquer le badge role
- KPIs : passer en grille `grid-cols-2` sur mobile (au lieu de 1) avec des cartes plus compactes
- KPICard : reduire le padding (`p-4` au lieu de `p-6`), la valeur (`text-xl` au lieu de `text-3xl`), masquer le sparkline et le watermark icon sur mobile
- Graphiques Performance : masquer completement sur mobile, ajouter un lien "Voir les stats" vers /analytics
- Activite Recente : afficher seulement les 3 dernieres commandes (au lieu de 5), masquer la section "Produits Populaires"
- Section QR Code : masquer le QR code sur mobile, garder seulement le lien et le bouton copier
- Masquer le switch "Comparer avec periode precedente" sur mobile

### 3. Commandes (src/pages/Orders.tsx) - PRIORITE HAUTE
**Remplacer le tableau par des cartes sur mobile :**
- Sur mobile : afficher chaque commande comme une carte avec nom, telephone, statut, total et bouton "Voir"
- Sur desktop : garder le tableau existant
- Reduire le titre a `text-2xl` sur mobile
- Filtre statut et recherche empiles verticalement (deja fait avec `flex-col sm:flex-row`)

### 4. Produits (src/pages/Products.tsx) - PRIORITE HAUTE
- Reduire le titre a `text-2xl` sur mobile
- Grille produits : `grid-cols-1` sur mobile (deja fait)
- Reduire la taille de l'image produit sur mobile
- Rendre le bouton "Ajouter un produit" plus compact sur mobile (icone seule ou texte court)

### 5. Statistiques (src/pages/Analytics.tsx) - VUE LIMITEE
- Header : empiler le titre et les controles (select + export) verticalement
- Masquer le bouton "Exporter PDF" sur mobile (fonctionnalite desktop)
- TabsList : rendre scrollable horizontalement avec des labels courts
- Stats cards : grille `grid-cols-2` sur mobile
- Masquer les details de ventes par categorie sur mobile, garder seulement les graphiques

### 6. Avis clients (src/pages/Reviews.tsx) - VUE CARTE
- Remplacer le tableau par des cartes sur mobile (meme approche que Commandes)
- Chaque carte affiche : nom client, etoiles, extrait du commentaire, actions (approuver/rejeter)

### 7. Reglages boutique (src/pages/ShopSettings.tsx)
- La sidebar de 280px ne rentre pas sur mobile
- Sur mobile : transformer la navigation laterale en tabs horizontaux scrollables en haut
- Le contenu prend toute la largeur

### 8. Editeur visuel (src/pages/ShopEditor.tsx)
- Ajouter une banniere informative sur mobile : "L'editeur visuel est optimise pour les ecrans larges. Utilisez un ordinateur pour une meilleure experience."
- Permettre quand meme l'acces mais avec un avertissement

### 9. Marketing (src/pages/Marketing.tsx)
- Adapter les tabs pour etre scrollables sur mobile
- Reduire les paddings et tailles de texte

### 10. Global : padding-top pour le hamburger
- Toutes les pages dashboard utilisent `p-6` : ajouter `pt-16 lg:pt-6` pour eviter que le contenu soit masque par le bouton hamburger sur mobile

## Details techniques

### Fichiers modifies (12 fichiers) :
1. `src/pages/Dashboard.tsx` - Vue simplifiee mobile
2. `src/components/dashboard/KPICard.tsx` - Cartes compactes mobile
3. `src/components/dashboard/QuickActions.tsx` - Deja bien adapte (scroll horizontal)
4. `src/pages/Orders.tsx` - Vue cartes mobile
5. `src/pages/Products.tsx` - Ajustements mineurs
6. `src/pages/Analytics.tsx` - Vue limitee mobile
7. `src/pages/Reviews.tsx` - Vue cartes mobile
8. `src/pages/ShopSettings.tsx` - Tabs horizontaux mobile
9. `src/pages/ShopEditor.tsx` - Banniere avertissement mobile
10. `src/pages/Marketing.tsx` - Adaptations responsives
11. `src/components/Sidebar.tsx` - Fermer au clic navigation
12. `src/pages/Settings.tsx` - Ajustements padding

### Aucun nouveau fichier, aucune nouvelle dependance

### Breakpoints utilises :
- `< 640px (sm)` : Mobile - vue simplifiee
- `640px-1023px (md)` : Tablette - vue intermediaire
- `>= 1024px (lg)` : Desktop - vue complete actuelle
