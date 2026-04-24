# 🎭 Playwright Test Suite - Formation & Démonstration

> Un dépôt regroupant une collection de tests automatisés développés avec **Playwright (TypeScript)**. Ce projet a été conçu dans le cadre d'une formation technique approfondie et couvre un large spectre de fonctionnalités modernes de l'outil.

## 🛠️ Stack Technique

- **Framework** : [Playwright](https://playwright.dev/) `v1.59.1`
- **Langage** : TypeScript
- **Gestionnaire de paquets** : Yarn
- **Rapports** : HTML intégré + Allure
- **CI/CD** : GitHub Actions

## ✅ Fonctionnalités & Types de Tests

Ce dépôt démontre les capacités suivantes :

- 🖥️ **Tests UI** : Navigation, interactions complexes, assertions, gestion des dialogs & popups
- 🌐 **Tests API** : Requêtes HTTP, validation de payloads, chaînage UI/API
- 📱 **Multi-navigateurs & Émulation Mobile** : Exécution sur Chromium, Firefox, Webkit + profils mobiles
- 🧩 **Architecture** : Utilisation de `data`, contexts isolés, parallélisation et bonnes pratiques de structuration

## 🚀 Installation & Exécution

### Prérequis

- Node.js `>= 18.x`
- Yarn (`npm install -g yarn`)

### 1. Installation des dépendances

```bash
yarn install
```

### 2. Installation des binaires navigateurs

```bash
yarn playwright install
```

### 3. Lancer les tests

```bash
yarn playwright test
```

#### Commandes utiles

| Commande                                  | Description                                     |
| ----------------------------------------- | ----------------------------------------------- |
| `yarn playwright test --headed`           | Exécution en mode visible (interface graphique) |
| `yarn playwright test --project=chromium` | Exécution sur un navigateur spécifique          |

## 📊 Rapports & Visualisation

### Rapport HTML intégré

Généré automatiquement après exécution :

```bash
yarn playwright show-report
```

### Rapport Allure

Les résultats sont exportés dans le dossier `allure-results/`. Pour visualiser le rapport Allure localement :

```bash
allure serve allure-results
```

_(Nécessite l'installation d'Allure CLI : `npm i -g allure`)_

## 🔄 CI/CD (GitHub Actions)

Un workflow GitHub Actions minimal est inclus. Il s'exécute automatiquement à chaque `push` sur la branche principale, installant les dépendances, les navigateurs et lançant la suite de tests.

## 📁 Structure du Dépôt

```
.
├── tests/ # Suite de tests (UI, API)
├── pages/ # (Optionnel) Helpers / Page Object Model
├── data/  # Jeux de données
├── playwright.config.ts # Configuration centrale
├── playwright-report/ # Rapport HTML généré
├── allure-results/ # Données brutes pour Allure
└── .github/workflows/ # Pipeline CI GitHub Actions
```

## 📜 Licence & Contribution

Ce projet est actuellement utilisé à des fins de **formation et de démonstration**. Aucune licence formelle n'est définie pour le moment.
Les contributions (PR, issues, suggestions) sont les bienvenues pour améliorer la qualité, la couverture et la maintenabilité des tests.
