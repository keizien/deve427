# Tests End-to-End (Playwright)

Pré-requis:
- Node.js installé
- Installer les dépendances du frontend et du backend

Installation:

```bash
cd frontend
npm install
npm run e2e:install
```

Notes importantes:
- Ces tests mockent les appels API (`/api/products`, `/api/login`, `/api/orders`) pour être indépendants du backend.
- Si vous voulez exécuter contre le backend réel, démarrez le backend (`cd ../backend && npm run start`) et modifiez `playwright.config.ts` pour désactiver les mocks dans les tests.

Exécution des tests:

```bash
cd frontend
npm run e2e:test
```

Exécution en mode interactif (fenêtré):

```bash
cd frontend
npm run e2e:headed
```

Afficher le rapport HTML après exécution:

```bash
cd frontend
npm run e2e:report
```
