

# Separation des Reglages du Shop Editor

## Ce qui change

Le Shop Editor devient purement visuel (personnalisation de la boutique), et les reglages techniques/business sont accessibles depuis une page dediee.

## Structure actuelle vs nouvelle structure

### Shop Editor (reste sur `/shop-editor`)
- Onglet **Ma Boutique** : Identite, Hero, Produits (inchange)
- Onglet **Apparence** : Design, Reassurance, Temoignages, Sections, Marquee, Promo, Footer, Avance (inchange)
- ~~Onglet Reglages~~ : **SUPPRIME** de l'editeur

### Nouvelle page : Reglages Boutique (`/shop-settings`)
Page dediee qui regroupe :
- Contact et Reseaux sociaux
- SEO et Partage
- Zones de Livraison

Design simple et epure, coherent avec les autres pages du dashboard (comme Products, Orders, etc.)

### Navigation Sidebar
L'entree "Ma boutique" dans la sidebar devient extensible (comme "Produits") avec deux sous-items :

```text
COMMERCE
  Produits              v
    Tous les produits
    Categories
  Commandes
  Avis clients
  Ma boutique           v
    Editeur visuel        -> /shop-editor
    Reglages              -> /shop-settings
```

## Fichiers concernes

### 1. `src/components/Sidebar.tsx`
- Transformer l'item "Ma boutique" en item avec sous-items
- Sous-item 1 : "Editeur visuel" (`/shop-editor`, icone Paintbrush)
- Sous-item 2 : "Reglages" (`/shop-settings`, icone Settings)
- Ajouter `/shop-editor` dans `expandedItems` par defaut

### 2. `src/pages/ShopEditor.tsx`
- Supprimer l'onglet "Reglages" et son `TabsContent`
- Passer la grille des onglets de 3 colonnes a 2 colonnes
- Retirer les imports de `ContactSection`, `SEOSection`, `DeliverySection`

### 3. `src/pages/ShopSettings.tsx`
- Refaire cette page pour afficher les 3 sections de reglages : Contact, SEO, Livraison
- Layout simple avec un titre, une description, et les 3 sections en accordeon
- Reutiliser les composants existants (`ContactSection`, `SEOSection`, `DeliverySection`)
- Utiliser le hook `useShopEditor` pour l'etat et les actions

### 4. `src/App.tsx`
- La route `/shop-settings` pointe deja vers `ShopEditor` -- la rediriger vers la page `ShopSettings` renovee

