# CONTRIBUTING.md — Guide de contribution et plan de maintenance

---

## Sommaire

1. Faire une demande de maintenance
2. Types de maintenance
3. Niveaux de priorité
4. Processus de traitement
5. Niveaux de service (SLO)

---

## 1. Faire une demande de maintenance

Toute demande (bug, évolution, tâche technique) doit être enregistrée sous forme d'issue GitHub avant tout développement.

### Ce que doit contenir un ticket

- Titre : court et explicite
- Description : contexte, comportement observé, comportement attendu
- Priorité : Critique / Haute / Moyenne / Basse (voir section 3)
- Type de maintenance : Corrective / Préventive / Adaptative / Évolutive (voir section 2)
- Impact métier : qu'est-ce que ça coûte si on ne le traite pas ?

### Incidents critiques en dehors des heures de travail

Pour un bug critique (ex : le paiement est impossible) :

1. Ouvrir une issue sur GitHub en lui appliquant le label critical
2. Le support niveau 0 prend en charge en **moins de 2h**
3. Le support collecte les informations de base avant de mobiliser une ressource :
   - Est-ce que l'interface s'affiche ?
   - Le paiement plante-t-il avant ou après validation ?
   - Y a-t-il un message d'erreur visible ?
4. Selon les réponses, orientation vers la bonne ressource :
   - Interface ne s'affiche pas → **Développeur Frontend**
   - Interface s'affiche mais paiement échoue → **Développeur Backend**
   - Impossible de déterminer → **Développeur Backend** en premier (accès aux logs)

> Les bugs non critiques détectés en dehors des heures de travail ne déclenchent pas d'astreinte. Ils sont traités lors du prochain jour ouvré selon la priorité du GitHub Project.


---

## 2. Types de maintenance

| Type | Description | Exemples dans le projet |
|---|---|---|
| Corrective | Correction de bugs après livraison | Crash paiement, liens 404, injection SQL |
| Préventive | Actions pour éviter de futurs bugs | Headers HTTP, protection brute force, tests |
| Adaptative | Mise en conformité avec l'environnement | Provenance produits (réglementation européenne) |
| Évolutive | Ajout de nouvelles fonctionnalités | Paiement PayPal, avis clients, recommandations |

---

## 3. Niveaux de priorité

| Priorité | Critère | Temps de prise en charge | Temps de résolution |
|---|---|---|---|
| Critique | Impact direct sur le CA ou sécurité des données | < 2h | < 24h |
| Haute | Failles sécurité, inaccessibilité partielle | < 4h | < 3 jours |
| Moyenne | Évolutions fonctionnelles planifiées | < 1 jour ouvré | Planifiée |
| Basse | Améliorations qualité, documentation | Planifiée | Planifiée |

---

## 4. Processus de traitement

Chaque demande suit ce processus avant d'être livrée :

1. Enregistrement de l'issue GitHub
        ↓
2. Analyse technique
        ↓
3. Développement sur une branche dédiée
        ↓
4. Revue de code (Pull Request)
        ↓
5. Tests (unitaires + e2e)
        ↓
6. Validation en préproduction
        ↓
7. Déploiement + suivi post-production

> Les incidents critiques sont traités en priorité absolue.  
> Les demandes de sécurité passent avant les évolutions.  
> Les évolutions sont planifiées après stabilisation.

---

## 5. Niveaux de service (SLO)

| Indicateur | Objectif |
|---|---|
| Disponibilité | 99,5% |
| Temps de chargement | < 3 secondes |
| Prise en charge incident critique | < 2h |
| Résolution incident critique | < 24h |
| Prise en charge incident sécurité | < 4h |
| Résolution incident sécurité | < 3 jours |
| Prise en charge incident fonctionnel | < 1 jour ouvré |

---

