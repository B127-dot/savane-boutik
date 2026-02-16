
# Correction des erreurs 404 sur Vercel

## Le probleme

Votre projet est une **application monopage (SPA)** : toutes les routes sont gerees cote client par React Router. Quand vous naviguez directement vers une URL (ex: `/shop/ma-boutique`, `/dashboard`) ou que vous rafraichissez la page, Vercel cherche un fichier reel a cette adresse. Comme il n'existe pas, il renvoie une erreur **404 Not Found**.

## La solution

Creer un fichier `vercel.json` a la racine du projet. Ce fichier indique a Vercel de **rediriger toutes les requetes** vers `index.html`, permettant a React Router de prendre le relais.

## Details techniques

### Fichier a creer : `vercel.json` (racine du projet)

Ce fichier contiendra une seule regle de reecriture (rewrite) :
- Toute URL demandee (`(.*)`) sera servie par `/index.html`
- Cela couvre toutes les routes : `/dashboard`, `/shop/:shopUrl`, `/shop/:shopUrl/product/:id`, `/login`, etc.

Configuration :

```text
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### Aucun autre fichier modifie

- Les routes dans `App.tsx` sont deja toutes correctement definies
- Le probleme ne vient pas du code React mais de la configuration du serveur Vercel
- Apres ajout de ce fichier, un nouveau deploiement sur Vercel corrigera tous les 404

## Apres implementation

Vous devrez **redeployer** le projet sur Vercel pour que la configuration prenne effet. Toutes les pages fonctionneront ensuite correctement, y compris le bouton "retour" du navigateur et le rafraichissement de page.
