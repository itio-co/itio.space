# Developer Guide

## Project Setup

This section guides you through setting up the project for local development.

### Environment Variables

Before running the development server, you need to create a `.env.dev` file in the root of the project. This file will contain environment-specific variables.

Add the following line to your `.env.dev` file, replacing `<web3auth client id>` with your actual Web3Auth client ID:

```
NEXT_PUBLIC_WEB3AUTH_CLIENT_ID=<web3auth client id>
```

### Running the Development Server

Once the environment variables are set up, you can start the development server. Open your terminal and run one of the following commands:

Using npm:
```bash
npm run dev
```

Or using pnpm:
```bash
pnpm dev
```

### Accessing the Application

After the server starts, you can access the application by opening [http://localhost:3000](http://localhost:3000) in your web browser. The page will auto-update as you make changes to the source files.

## Project Structure

This section provides an overview of the key directories in the project and their purpose:

- `components/`: This directory contains reusable UI components that are used throughout the application. These components help in building a consistent user interface and promote code reusability.

- `pages/`: This directory is central to Next.js applications. It contains the application's pages. Each file in this directory (or its subdirectories) often corresponds to a route in the application. It also houses API routes, typically within a `pages/api/` subdirectory, which allow for server-side logic.

- `public/`: This directory is used to serve static assets. Files placed here, such as images, fonts, 3D models, or other static files, are accessible directly via the application's URL.

- `styles/`: This directory holds all styling-related files. This can include global stylesheets that apply to the entire application, as well as CSS modules for component-specific styles.

- `electron/`: This directory contains all files specifically related to the Electron application setup and functionality. This includes the main Electron process files, preload scripts, and any other resources needed for the desktop application version.

- `constants/`: This directory is used to store constant values that are used across different parts of the application. This helps in managing and maintaining fixed values like configuration keys, event names, or thematic constants.

- `models/`: This directory contains data models or schemas for the application. These models define the structure of data used within the application, for example, when interacting with a database or an API.

## Key Components

This section highlights some of the core components and modules within the application.

### THREE.js Components

The 3D visualization in this project is rendered using THREE.js, integrated into the React application via the `@react-three/fiber` library. This library allows for a declarative, component-based approach to building 3D scenes.

- **Main Scene Component**: The primary logic for the 3D scene, including models, lighting, and camera setup, is located in `components/THREE/scene.tsx`. The `components/THREE/index.tsx` file often serves as an entry point or aggregator for the THREE.js related components in this directory.

- **Canvas Integration**: To render the 3D scene within a React page, the `<Canvas>` component from `@react-three/fiber` is utilized. You can see this integration in `pages/index.tsx`, where the `<Canvas>` component is added to the page structure, and the `Scene` component (from `components/THREE/scene.tsx`) is rendered within it.

### API Routes

The application uses Next.js API routes for server-side logic and to handle requests from the client. These are located in the `pages/api/` directory.

- **`evm.ts`**: This API route is responsible for interactions with Ethereum Virtual Machine (EVM) compatible blockchains. It handles operations such as fetching account balances, retrieving transaction details, and sending transactions. It leverages the `web3` library to communicate with the blockchain.

- **`hello.js`**: This is a sample API route often included by default in Next.js projects. It can be used for testing API functionality or as a template for creating new API endpoints.

- **`web3Auth.ts`**: This route manages the functionality related to Web3Auth. It handles the initialization of the Web3Auth service, user authentication, and potentially other Web3Auth-specific operations, enabling decentralized authentication for the application.

## Authentication Flow

User authentication in this application is handled by Web3Auth, which provides a streamlined way to connect users to decentralized applications.

### Initialization

- **Web3Auth Service**: The core of the Web3Auth integration is managed within `pages/api/web3Auth.ts`. This file contains the `connectWeb3Auth` function, which is responsible for initializing the Web3Auth service with the necessary configurations.
- **Client ID**: For Web3Auth to function, it requires a client ID, which is provided through the `NEXT_PUBLIC_WEB3AUTH_CLIENT_ID` environment variable. This variable must be set in your `.env.dev` file as mentioned in the 'Project Setup' section.

### Client-Side Integration (`pages/index.tsx`)

The main interaction with Web3Auth on the client-side occurs in `pages/index.tsx`:

- **Initial Connection**: A `useEffect` hook is used to call the `connectWeb3Auth` function (imported from `pages/api/web3Auth.ts`) when the main page component mounts. This ensures that the Web3Auth service is initialized and ready when the user interacts with the login functionality.

- **Login Process**:
    - The `login` function is triggered when the user initiates the login process (e.g., by clicking a login button).
    - This function interacts with the initialized Web3Auth service to open the Web3Auth modal, allowing the user to choose their preferred login method (e.g., social login, email, or direct wallet connection).
    - Upon successful authentication, Web3Auth provides a provider (e.g., an EIP-1193 provider for EVM chains) and user information.

- **Logout Process**:
    - The `logout` function is called when the user chooses to sign out.
    - This function disconnects the session from Web3Auth, clearing the user's authentication state from the application.

- **User State Management**:
    - After a successful login, user-specific information is retrieved and stored in the React component's state. This typically includes:
        - Profile details (e.g., name, email, profile picture if available through the chosen login provider).
        - Wallet address associated with the user's account.
        - Wallet balance, which can be fetched using the provider obtained from Web3Auth.
    - This information is then displayed in the user interface, for example, in a user profile section or to show connection status.
