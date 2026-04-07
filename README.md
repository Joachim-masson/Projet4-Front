<h1 align="center" id="title">Project4: The Simpsons</h1>

<p id="description">A website showcasing the animated series The Simpsons/Front-end. You need the back-end to use this front-end: https://github.com/Joachim-masson/projet4/tree/main)</p>

<h2>📚 Stack</h2>

![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)

<h2>Project Screenshots:</h2>

<img width="1104" height="635" alt="LandingPage" src="https://github.com/user-attachments/assets/cd389b49-8415-48bb-8544-9cfe701d4f59" />
<div style="display: flex; flex-direction: row; justify-content: space-between; align-items: flex-start;">
  <img width="30%" alt="HomePage" src="https://github.com/user-attachments/assets/40f7fa56-e587-44fd-8270-719e47fc0858" />
  <img width="15%" alt="Character" src="https://github.com/user-attachments/assets/035b701f-52ba-4b1d-8aa6-f3f447540314" />
  <img width="45%" alt="Location" src="https://github.com/user-attachments/assets/9c8c7bb7-2852-40e0-b4c6-fca4dbe35ad6" />
</div>

<h2>🧐 Features</h2>

Here're some of the project's best features:

*   list of characters
*   list of locations

<h2>🛠️ Installation Steps:</h2>

<p>1. Clone the repository</p>

```
git clone git@github.com:Joachim-masson/Projet4-Front.git
```

<p>2. install dependencies</p>

```
npm install
```

<p>3. run the app</p>

```
npm run dev
```



# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
