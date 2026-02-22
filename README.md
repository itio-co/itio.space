# ITIO Space Home page

Welcome to **ITIO Space**!. This is our main website source code Project

View online page at [https://itio.space/itio-space](https://itio.space/itio-space)

## Table of Contents

- [Dependencies](#Dependencies)
- [Installation](#installation)
- [Scripts](#scripts)
- [Folder Structure](#folder-structure)
- [Environment Variables](#environment-variables)
- [Testing](#testing)
- [Linting & Formatting](#linting--formatting)

---


## Dependencies

- **React 18+**: Latest stable version of React with hooks and functional components.
- **NextJS 14+**: The React server-side rendering framework.
- **Material UI**: UI Framework
- **TailwindCSS**: CSS Utility
- **Redux Toolkit**: State management
- **Vitest & msw**: Testing framework for unit and integration tests.
- **Husky**: Automatically lint your commit messages, code, and run tests upon committing or pushing.
- [**React Flow**](https://reactflow.dev/): A customizable React component for building node-based editors and interactive diagrams 


## Installation

This project uses [Yarn](https://yarnpkg.com/) and requires Corepack to manage the package manager version. Before installing dependencies, ensure Corepack is enabled:

```bash
corepack enable
yarn
```

## Scripts

- **Start the development server:**

  ```bash
  npm run dev
  ```

  Runs the app in development mode at `http://localhost:3000`.

- **Build and Start the production version:**

  ```bash
  npm run build
  ```

  ```bash
  npm run start
  ```

  Runs the app in production mode at `http://localhost:3000`.

- **Run tests:**

  ```bash
  npm run test
  ```


- **Run depoy:**

  ```bash
  npm run deploy
  ```

  Build project and deploy to firebase hosting.


## Folder Structure

```bash
├── public/                 # Static assets like index.html
├── src/
│   ├── components/         # Reusable UI components
│   ├── contants/           # Reusable contants values
│   ├── fonts/              # Store the font file assets
│   ├── helper/             # Utility functions
│   ├── pages/              # Page components for routing
│   ├── redux/              # All Redux Store
│   ├── services/           # API service files
│   └── styles/             # Global or shared CSS/SCSS
│   └── tests/              # Testing Library
├── .env.example            # Environment variables
├── .eslintrc.json          # ESLint configuration
├── .prettierrc.js          # Prettier configuration
├── tailwind.config.ts      # Tailwind Theme configuration
└── package.json            # Dependencies and scripts
```

### Environment Variables

You can configure environment-specific variables using `.env` files. Create a `.env` file in the root of your project and add your variables as needed:

```bash
NEXT_PUBLIC_API_ENDPOINT=https://api.example.com
```

These variables will be accessible via `process.env.NEXT_PUBLIC_*`.

## Testing

This boilerplate includes Jest and React Testing Library for writing unit and integration tests. You can write tests in files with a `.test.tsx` suffix.

To run tests, simply use:

```bash
npm run test
```

or run coverage tests use:

```bash
npm run test:coverage
```

## Linting & Formatting

We use ESLint for linting and Prettier for code formatting.

---

Happy Coding! 🎉
