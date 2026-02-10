
# Simplification du Shop Editor -- Analyse UX et Plan de Reorganisation

## Diagnostic : le probleme actuel

Le Shop Editor actuel empile **14 sections accordion** dans une seule colonne de 400px :

1. Identite (nom, logo, favicon, URL)
2. Contact et Reseaux (telephone, WhatsApp, reseaux sociaux)
3. SEO et Partage (titre SEO, description, image Open Graph)
4. Design (palette couleurs, police)
5. Hero (image, titre, bouton CTA)
6. Barre de Reassurance (trust bar items)
7. Marquee (texte defilant)
8. Produits (colonnes, affichage)
9. Temoignages (avis clients)
10. Ordre des Sections (drag-and-drop)
11. Zones de Livraison (quartiers, tarifs)
12. Banniere Promo (texte, couleurs)
13. Personnalisation Fine (espacement, bordures, animations)
14. Pied de page (a propos, liens, newsletter)

**Problemes identifies :**
- Un vendeur de Ouagadougou qui veut juste changer son image Hero doit scroller a travers SEO, Contact, Design... pour y arriver
- Les sections "operationnelles" (Livraison, Promo) sont melangees avec les sections "visuelles" (Hero, Design, Produits)
- 14 sections sans categorisation = surcharge cognitive immediate
- L'utilisateur ne sait pas par ou commencer

## Solution : regrouper en 3 onglets clairs

Au lieu de 14 accordions en vrac, organiser l'editeur en **3 onglets** avec un vocabulaire simple :

```text
+------------------+------------------+------------------+
|   Ma Boutique    |   Apparence      |   Reglages       |
+------------------+------------------+------------------+
```

### Onglet 1 : "Ma Boutique" (l'essentiel pour demarrer)
Ce que le vendeur touche le plus souvent :
- Identite (nom, logo, URL)
- Hero (image, titre, CTA)
- Produits (colonnes, affichage)

### Onglet 2 : "Apparence" (le design)
Pour ceux qui veulent aller plus loin visuellement :
- Design (palette, police)
- Barre de Reassurance
- Temoignages
- Ordre des Sections (drag-and-drop + blocs)
- Marquee
- Banniere Promo
- Pied de page
- Personnalisation Fine

### Onglet 3 : "Reglages" (configuration business)
Les parametres techniques/operationnels :
- Contact et Reseaux
- SEO et Partage
- Zones de Livraison

## Details techniques

### Fichier modifie : `src/pages/ShopEditor.tsx`
- Ajouter un systeme d'onglets (`Tabs` de Radix) dans la sidebar, entre le header (bouton Publier + theme actif) et le contenu scrollable
- 3 onglets : "Ma Boutique", "Apparence", "Reglages"
- Chaque onglet affiche uniquement ses sections accordion
- Le header (bouton Publier, carte theme actif, statut brouillon) reste commun au-dessus des onglets

### Nouveau composant : aucun
Pas de nouveau fichier -- on reorganise simplement la disposition des sections existantes dans ShopEditor.tsx en les repartissant sous 3 `TabsContent`.

### Impact visuel
- Au lieu de 14 sections visibles d'un coup, le vendeur voit **3 a 5 sections maximum** par onglet
- L'onglet par defaut "Ma Boutique" montre uniquement les 3 choses essentielles
- Les vendeurs avances peuvent explorer "Apparence" et "Reglages" a leur rythme

### Fichiers concernes
- `src/pages/ShopEditor.tsx` : ajout des Tabs, reorganisation des sections dans les 3 onglets
- Aucun autre fichier modifie (les composants de section restent identiques)
