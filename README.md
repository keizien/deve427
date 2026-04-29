Group 2:

- Léo Bergeaud
- Clément Salingue
- Ethan Gobain


# MonShop — Application e-commerce

Application e-commerce full-stack développée dans le cadre du cours DEVE427 de maintenance applicative.

---

## Technologies utilisées

- **Frontend** : React + TypeScript
- **Backend** : Express.js + TypeScript
- **Base de données** : PostgreSQL (hébergé sur Neon)
- **Authentification** : JWT + bcryptjs
- **Tests** : Jest + Supertest
- **Linting** : ESLint avec la règle `arrow-body-style`

---

## Prérequis

Avant de commencer, installe ces outils sur ta machine :
- [Node.js v18+](https://nodejs.org)
- [Git](https://git-scm.com)

Pour vérifier que Node.js et npm sont bien installés :
node -v   # devrait afficher v18 ou supérieur
npm -v    # devrait afficher v9 ou supérieur

---

## Installation

**1. Clone le repo :**
git clone https://github.com/keizien/deve427.git
cd deve427

**2. Configure les variables d'environnement :**

Crée un fichier `.env` dans le dossier `backend/` :
DATABASE_URL=postgresql://user:password@ep-xxx.neon.tech/ecommerce
JWT_SECRET=ta_cle_secrete_longue_et_complexe

> Ne commite jamais ce fichier sur GitHub. Il est protégé par le `.gitignore`.

**3. Installe les dépendances :**
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install

---

## Lancer l'application

Dans deux terminaux séparés :

# Terminal 1 — Backend
cd backend
npm start
# → Serveur démarré sur le port 3001

# Terminal 2 — Frontend
cd frontend
npm start
# → Application disponible sur http://localhost:3000

---

## Lancer les tests

cd backend
npm test

---

## Structure du projet

ecommerce-app/
├── frontend/                    → React + TypeScript (port 3000)
│   └── src/
│       ├── App.tsx              → routing principal
│       ├── App.css
│       ├── App.test.tsx             
│       ├── Checkout.tsx              
│       ├── Checkout.css              
│       ├── declaration.d.ts              
│       ├── index.tsx             
│       ├── index.css       
│       ├── Navbar.tsx           → barre de navigation
│       ├── ProductList.tsx      → liste des produits
│       ├── ProductList.css      → liste des produits
│       ├── Cart.tsx             → panier
│       ├── CartContext.tsx      → contexte React du panier
│       ├── Checkout.tsx         → page de paiement
│       ├── LoginPage.tsx        → page de connexion
│       ├── LoginPage.css        → page de connexion
│       ├── RegisterPage.tsx     → page d'inscription
│       └── AdminPage.tsx        → espace admin
│       └── AdminPage.css        → espace admin
│       └── RegisterPage.tsx     → page d'inscription
│       └── RegisterPage.css     → page d'inscription
│       ├── Navbar.tsx       
│       ├── Navbar.css
│       ├── react-app-env.d.ts 
│       ├── react-app-env.d.ts       
│       ├── setupTests.ts  
│       ├── reportWebVitals.ts       
└── backend/                     → Express + TypeScript (port 3001)
    └── src/
        ├── index.ts             → point d'entrée du serveur
        ├── db.ts                → connexion PostgreSQL
	├── checkout.ts 
	├── debug.ts 
        ├── auth.ts              → route POST /api/login
        ├── register.ts          → route POST /api/register
        ├── authMiddleware.ts    → middlewares JWT et admin
        ├── products.ts          → route GET /api/products
        ├── productsRepository.ts→ requêtes SQL produits
        ├── products.test.ts     → tests produits
        ├── orders.ts            → route GET /api/admin/orders
        ├── ordersRepository.ts  → requêtes SQL commandes
        ├── orders.test.ts       → tests commandes
        ├── cart.ts              → routes panier
        ├── cartRepository.ts    → requêtes SQL panier
        └── cart.test.ts         → tests panier


---

## Fonctionnalités

- Consulter le catalogue de produits
- Ajouter des produits au panier
- Passer une commande avec adresse de livraison
- S'inscrire et se connecter
- Espace admin protégé par JWT (consultation des 10 dernières commandes)
- Navigation dynamique selon le rôle de l'utilisateur

---

## Comptes de test

| Rôle | Email | Mot de passe | Accès |
|------|-------|--------------|-------|
| Admin | admin@ecommerce.fr | admin1234 | Toute l'application + espace admin |
| Utilisateur | leo@leo.leo | leo | Catalogue, panier, commandes |


---

## Routes API

| Méthode | Route | Protection | Description |
|---------|-------|------------|-------------|
| POST | /api/login | Aucune | Connexion — retourne un token JWT |
| POST | /api/register | Aucune | Inscription — crée un compte et retourne un token JWT |
| GET | /api/products | Aucune | Liste complète des produits |
| GET | /api/admin/orders | Admin uniquement | 10 dernières commandes |
| POST | /api/orders | Connecté | Passer une commande |

---

## Base de données

La base de données PostgreSQL est hébergée sur [Neon](https://neon.tech). Les tables principales sont :

| Table | Description |
|-------|-------------|
| users | Utilisateurs (role: user ou admin) |
| products | Catalogue des produits |
| carts / cart_items | Paniers des utilisateurs |
| orders / order_items | Commandes passées |
| addresses | Adresses de livraison |

---

## Sécurité

- Mots de passe hashés avec bcryptjs (10 rounds) — jamais stockés en clair
- Authentification par token JWT avec expiration 24h
- Routes sensibles protégées par des middlewares (authMiddleware + adminMiddleware)
- Requêtes SQL paramétrées pour éviter les injections SQL

---

## Commandes utiles

| Action | Commande | Dossier |
|--------|----------|---------|
| Lancer le backend | `npm start` | backend/ |
| Lancer le frontend | `npm start` | frontend/ |
| Lancer les tests | `npm test` | backend/ |
| Vérifier le linting | `npm run lint` | frontend/ |
| Vérifier les types | `npm run typecheck` | frontend/ |

---

## Workflow Git

git checkout main
git pull origin main
git checkout -b feature/nom-de-la-feature
# ... coder + écrire les tests
git add .
git commit -m "feat: description de la feature"
git push origin feature/nom-de-la-feature
# → Ouvrir une Pull Request sur GitHub

### Conventions de commit

| Préfixe | Usage |
|---------|-------|
| `feat:` | Nouvelle fonctionnalité |
| `fix:` | Correction d'un bug |
| `tech:` | Tâche technique |
| `merge:` | Fusion de branches |
