
# Systeme de Zones de Livraison avec Tarification

## Concept
Remplacer le champ texte libre "Adresse de livraison" sur la page Checkout par un **selecteur de quartier/zone** avec des frais de livraison pre-configures par le vendeur. Cote dashboard, le vendeur configure ses zones de livraison (nom du quartier + prix) depuis une nouvelle section dediee.

## Ce qui change pour l'acheteur (Checkout)
- Le champ "Adresse de livraison" devient un **menu deroulant** listant les quartiers configures par le vendeur (ex: "Pissy - 500 FCFA", "Gounghin - 1 000 FCFA")
- Un champ texte optionnel "Precision d'adresse" reste disponible pour les details (numero de porte, repere, etc.)
- Les **frais de livraison** s'ajoutent automatiquement au recapitulatif (sous-total + livraison = total)
- Si aucune zone n'est configuree, le comportement actuel (champ texte libre, livraison gratuite) est conserve

## Ce qui change pour le vendeur (Dashboard)
- Une nouvelle section **"Zones de livraison"** dans la page **Parametres boutique** (ShopSettings), sous forme d'onglet ou de section dans l'onglet existant
- Interface simple : tableau avec colonnes **Quartier** | **Prix (FCFA)** | **Actions**
- Bouton "Ajouter une zone" pour creer de nouvelles entrees
- Possibilite de modifier et supprimer chaque zone
- Option "Livraison gratuite a partir de X FCFA" (seuil optionnel)

## Details techniques

### 1. Nouveau type `DeliveryZone` dans AppContext
```typescript
interface DeliveryZone {
  id: string;
  name: string;       // ex: "Pissy", "Gounghin", "Ouaga 2000"
  price: number;      // ex: 500, 1000, 1500
  isActive: boolean;
}
```

Ajout dans `ShopSettings` :
```typescript
deliveryZones?: DeliveryZone[];
freeDeliveryThreshold?: number; // seuil livraison gratuite
```

### 2. Page Checkout (src/pages/Checkout.tsx)
- Remplacement du champ `address` par un `Select` (menu deroulant) listant les zones
- Ajout d'un champ "Precision" (Input texte) pour les details
- Calcul dynamique : `total = subtotal + deliveryFee` (ou 0 si seuil atteint)
- Le recapitulatif affiche la ligne "Livraison (Pissy)" avec le prix

### 3. Section vendeur (src/pages/ShopSettings.tsx)
- Nouvel onglet "Livraison" avec icone Truck
- Formulaire d'ajout rapide : champ nom + champ prix + bouton ajouter
- Liste des zones existantes avec boutons modifier/supprimer
- Toggle pour activer le seuil de livraison gratuite
- Persistance dans localStorage via `updateShopSettings`

### 4. Integration commande (Order interface)
- Ajout de `deliveryFee?: number` et `deliveryZone?: string` dans l'interface `Order`
- Le total de la commande inclut les frais de livraison
- L'information est visible dans le detail de commande cote vendeur

### 5. Fichiers concernes
- `src/contexts/AppContext.tsx` : ajout types DeliveryZone, champs Order, champs ShopSettings
- `src/pages/Checkout.tsx` : refonte section adresse avec Select + calcul frais
- `src/pages/ShopSettings.tsx` : nouvel onglet "Livraison" avec gestion des zones
- `src/components/CartSheet.tsx` : optionnel, afficher un apercu des frais de livraison
