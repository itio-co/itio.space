# CLAUDE.md - AI Assistant Guide for ITIO Space

> **Last Updated**: November 19, 2025
> **Project**: ITIO Space - Web3-Enabled 3D Portfolio Website
> **Repository**: itio-co/itio.space

## Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture & Tech Stack](#architecture--tech-stack)
3. [Directory Structure](#directory-structure)
4. [Key Components & Files](#key-components--files)
5. [Development Workflow](#development-workflow)
6. [Code Conventions & Patterns](#code-conventions--patterns)
7. [Common Tasks](#common-tasks)
8. [Environment Configuration](#environment-configuration)
9. [Build & Deployment](#build--deployment)
10. [Troubleshooting Guide](#troubleshooting-guide)

---

## Project Overview

**ITIO Space** is a modern web application combining:
- **3D Visualization**: Interactive isometric room rendered with Three.js
- **Web3 Authentication**: Social login (Google/Facebook) via Web3Auth
- **Blockchain Integration**: Ethereum wallet management and transactions
- **Multi-Platform**: Web (Vercel) + Desktop (Electron)

**Live Site**: https://itio.space

### Key Features
- Social login to Web3 wallets
- 3D interactive scene with OrbitControls
- User profile with wallet information
- ETH balance checking
- Transaction signing capabilities
- Dark theme with gradient design

---

## Architecture & Tech Stack

### Core Framework
- **Next.js** 12.3.1 - React framework with SSR/SSG
- **React** 18.2.0 - UI library
- **TypeScript** 4.8.4 - Type safety (strict mode disabled)

### 3D Graphics Stack
- **Three.js** 0.145.0 - 3D rendering engine
- **@react-three/fiber** 8.8.7 - React renderer for Three.js
- **@react-three/drei** 9.32.4 - Helper components for Three.js

### UI & Styling
- **Material-UI (MUI)** 5.10.7 - Component library
- **Emotion** 11.10.4 - CSS-in-JS styling
- **CSS Modules** - Scoped component styles
- **Global CSS** - Base styles with Tailwind directives

### Web3 & Blockchain
- **Web3Auth** 2.1.2 - Social login for Web3
- **Web3.js** 1.8.0 - Ethereum blockchain interaction
- **Network**: Ethereum Mainnet via Infura

### Additional Libraries
- **lottie-react** 2.3.1 - Animation library
- **Electron** 21.0.1 - Desktop app wrapper

### Development Tools
- **ESLint** 8.24.0 - Linting (next/core-web-vitals config)
- **env-cmd** 10.1.0 - Environment variable management

---

## Directory Structure

```
/home/user/itio.space/
├── .env.dev              # Development environment variables
├── .eslintrc.json        # ESLint configuration
├── .gitignore           # Git ignore patterns
├── LICENSE              # Project license
├── README.md            # Project documentation
├── next.config.js       # Next.js configuration
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
│
├── components/          # React components
│   └── THREE/          # Three.js 3D components
│       ├── index.tsx   # Barrel exports
│       ├── model.tsx   # 3D model loader (888 lines)
│       └── scene.tsx   # 3D scene setup
│
├── constants/          # Configuration constants
│   └── config.tsx      # App configuration
│
├── docs/              # Documentation files
│   ├── CNAME          # Custom domain config
│   └── README.md      # Docs readme
│
├── electron/          # Electron desktop app
│   ├── index.js       # Main electron process
│   └── preload.js     # Preload script
│
├── models/            # TypeScript type definitions
│   └── web3.tsx       # Web3Auth types
│
├── pages/             # Next.js pages (file-based routing)
│   ├── _app.tsx       # App wrapper
│   ├── index.tsx      # Homepage (main page)
│   └── api/           # API routes
│       ├── evm.ts     # Ethereum RPC operations
│       ├── hello.js   # Test endpoint
│       └── web3Auth.ts # Web3Auth connection
│
├── public/            # Static assets
│   ├── itio.png       # Logo
│   ├── GitHub-Mark-Light-32px.png
│   ├── lottie/        # Lottie animations
│   │   └── loading.json
│   └── model/         # 3D models
│       └── scene-transformed.glb (889MB)
│
└── styles/           # Stylesheets
    ├── globals.css   # Global styles
    └── Home.module.css # Homepage styles
```

---

## Key Components & Files

### Critical Files

#### `/pages/index.tsx` - Homepage (Route: `/`)
**Purpose**: Main application page with 3D scene and Web3 authentication

**State Management**:
```typescript
const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(null);
const [web3UserInfo, setWeb3UserInfo] = useState<UserInfo | null>(null);
const [web3, setWeb3] = useState<Web3 | null>(null);
const [profile, setProfile] = useState<boolean>(false); // Toggle 3D/profile view
```

**Key Features**:
- Web3Auth initialization on mount
- Auto-login if session exists
- Profile view with wallet info (address, balance)
- Toggle between 3D scene and user profile
- Material-UI components with custom yellow theme (#F3E600)

#### `/components/THREE/scene.tsx` - 3D Scene
**Purpose**: Sets up Three.js scene with camera, lighting, and controls

**Configuration**:
- Camera: Position (0, 2, 4), Rotation (-30°)
- Lighting: Ambient + Point lights
- Controls: OrbitControls with auto-rotation (speed: 0.1)
- Canvas fills viewport with responsive sizing

#### `/components/THREE/model.tsx` - 3D Model
**Purpose**: Loads and renders isometric room 3D model

**Details**:
- Auto-generated with gltfjsx tool
- 888 lines of mesh geometry
- Source: Sketchfab "Isometric Room" (CC-BY-4.0)
- Model file: `/public/model/scene-transformed.glb`

#### `/pages/api/web3Auth.ts` - Web3Auth Setup
**Purpose**: Initializes Web3Auth connection

**Configuration**:
```typescript
{
  clientId: process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID,
  chainConfig: {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: "0x1", // Ethereum Mainnet
    rpcTarget: "https://rpc.ankr.com/eth"
  },
  uiConfig: {
    theme: "dark",
    loginMethodsOrder: ["google", "facebook"],
    appLogo: "https://itio.space/itio.png"
  }
}
```

#### `/pages/api/evm.ts` - Ethereum RPC
**Purpose**: Blockchain interaction methods

**Class Methods**:
- `getAccounts()`: Fetch wallet addresses
- `getBalance()`: Get ETH balance in Wei
- `signMessage(message)`: Sign arbitrary messages
- `signTransaction(transaction)`: Sign transactions
- `signAndSendTransaction()`: Execute transfers

#### `/next.config.js` - Next.js Configuration
```javascript
{
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true // Required for static export/Electron
  }
}
```

#### `/electron/index.js` - Desktop App
**Configuration**:
- Loads production URL: `https://itio.space`
- Dark theme enabled
- DevTools disabled (can be enabled for debugging)
- Window maximization disabled

---

## Development Workflow

### Setup

1. **Install Dependencies**
```bash
npm install
```

2. **Create Environment File**
Create `.env.dev` with:
```
NEXT_PUBLIC_DEBUG=true
NEXT_PUBLIC_WEB3AUTH_CLIENT_ID=<your-web3auth-client-id>
```

3. **Get Web3Auth Client ID**
- Visit https://dashboard.web3auth.io/
- Create a project and copy the client ID

### Available Scripts

```bash
# Development server (http://localhost:3000)
npm run dev

# Development build (uses .env.dev)
npm run build

# Development production server
npm run start

# Production build (no env file)
npm run build:prod

# Production server
npm run start:prod

# Run linting
npm run lint

# Run Electron desktop app
npm run electron
```

### Development Server

**Start**: `npm run dev`
**URL**: http://localhost:3000
**Hot Reload**: Enabled (auto-updates on file changes)

### Workflow Tips

1. **Always use `npm run dev`** for development (loads .env.dev)
2. **Test in browser first**, then Electron if needed
3. **Lint before committing**: `npm run lint`
4. **Environment variables** require `NEXT_PUBLIC_` prefix for client-side access
5. **Type errors** are warnings, not blockers (strict mode disabled)

---

## Code Conventions & Patterns

### Component Organization

#### Naming Conventions
- **Components**: PascalCase (`Scene.tsx`, `Model.tsx`)
- **Utilities**: camelCase (`connectWeb3Auth`, `getBalance`)
- **Types**: PascalCase interfaces (`UserInfo`, `EthereumRpc`)
- **Files**: Match component name (`scene.tsx` exports `Scene`)

#### File Structure
```
components/
  FeatureName/
    index.tsx      # Barrel export
    Component.tsx  # Main component
    utils.tsx      # Helper functions
```

#### Barrel Exports
Use index files for cleaner imports:
```typescript
// components/THREE/index.tsx
export { Scene } from './scene'
export { Model } from './model'

// Usage
import { Scene, Model } from '@/components/THREE'
```

### State Management

**Pattern**: React Hooks (useState, useEffect)
**No global state library** - Local state only

**Example Pattern**:
```typescript
const [loading, setLoading] = useState<boolean>(true);
const [data, setData] = useState<DataType | null>(null);

useEffect(() => {
  const fetchData = async () => {
    try {
      const result = await apiCall();
      setData(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  fetchData();
}, [dependency]);
```

### Styling Approaches

#### 1. CSS Modules (Scoped)
```typescript
import styles from '../styles/Home.module.css'

<div className={styles.container}>
```

#### 2. Global CSS
```css
/* styles/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  background-image: linear-gradient(to top left, rgba(255, 0, 255, 0.267), black);
}
```

#### 3. Material-UI Theme
```typescript
const customTheme = createTheme({
  palette: {
    primary: { main: '#F3E600' }, // Brand yellow
  },
});
```

#### 4. Inline Styles (Dynamic)
```typescript
<img
  src="/itio.png"
  style={{filter: 'drop-shadow(0 3px 5px)'}}
/>
```

### Async/Await Pattern

**Standard**: Always use try-catch
```typescript
const handleLogin = async () => {
  try {
    const provider = await web3auth?.connect();
    setProvider(provider);

    const user = await web3auth?.getUserInfo();
    setWeb3UserInfo(user);
  } catch (error) {
    console.error("Login error:", error);
  }
};
```

### Type Safety

**Approach**: TypeScript with relaxed strictness
```typescript
// tsconfig.json
{
  "compilerOptions": {
    "strict": false, // Allows more flexibility
    "target": "es5",
    "module": "esnext",
    "jsx": "preserve"
  }
}
```

**Type Usage**:
```typescript
// Explicit typing preferred but optional
const [value, setValue] = useState<string | null>(null);

// Type inference allowed
const handleClick = (e) => { /* event type inferred */ }
```

---

## Common Tasks

### Adding a New Page

1. **Create file in `/pages` directory**:
```typescript
// pages/about.tsx
import type { NextPage } from 'next'

const About: NextPage = () => {
  return (
    <div>
      <h1>About Page</h1>
    </div>
  )
}

export default About
```

2. **Access at** `/about` (automatic routing)

### Adding a New Component

1. **Create component file**:
```typescript
// components/MyComponent.tsx
import React from 'react'

interface MyComponentProps {
  title: string
}

export const MyComponent: React.FC<MyComponentProps> = ({ title }) => {
  return <div>{title}</div>
}
```

2. **Import and use**:
```typescript
import { MyComponent } from '@/components/MyComponent'

<MyComponent title="Hello" />
```

### Adding a New API Route

1. **Create file in `/pages/api`**:
```typescript
// pages/api/myEndpoint.ts
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200).json({ message: 'Success' })
}
```

2. **Access at** `/api/myEndpoint`

### Modifying the 3D Scene

**Location**: `/components/THREE/scene.tsx`

**Example: Change camera position**:
```typescript
<PerspectiveCamera
  makeDefault
  position={[0, 5, 8]}  // Adjust X, Y, Z
  rotation={[-0.3, 0, 0]}
/>
```

**Example: Adjust lighting**:
```typescript
<ambientLight intensity={0.5} />  // Increase/decrease
<pointLight position={[10, 10, 10]} intensity={2} />
```

**Example: Change auto-rotation speed**:
```typescript
<OrbitControls autoRotate autoRotateSpeed={0.5} />  // 0.1 to 1.0
```

### Adding Web3 Functionality

**Location**: `/pages/api/evm.ts`

**Example: Add new RPC method**:
```typescript
async myCustomMethod(): Promise<any> {
  try {
    const web3 = new Web3(this.provider as any);
    const accounts = await web3.eth.getAccounts();

    // Your Web3 logic here
    const result = await web3.eth.someMethod();

    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
```

### Updating Material-UI Theme

**Location**: `/pages/index.tsx`

```typescript
const customTheme = createTheme({
  palette: {
    primary: { main: '#F3E600' },
    secondary: { main: '#FF00FF' }, // Add secondary color
    mode: 'dark', // dark or light
  },
  typography: {
    fontFamily: 'Your-Font-Name',
  },
});
```

### Adding Environment Variables

1. **Add to `.env.dev`**:
```
NEXT_PUBLIC_MY_VAR=my_value
```

2. **Access in code**:
```typescript
const myVar = process.env.NEXT_PUBLIC_MY_VAR
```

**Important**:
- Must start with `NEXT_PUBLIC_` for client-side access
- Restart dev server after changes
- Never commit sensitive values to git

---

## Environment Configuration

### Environment Files

**Development**: `.env.dev` (gitignored)
```
NEXT_PUBLIC_DEBUG=true
NEXT_PUBLIC_WEB3AUTH_CLIENT_ID=BMQy-NVFv500r-TUYAQXZLcGrS2pP_YKgWfK_32v9mk5fzrSq_j3KFr6faH3xdB_PQTxyZxeQw6W6Cu1JIcCkkU
```

**Production**: No env file (uses Vercel environment variables)

### Loading Strategy

- **Development**: `env-cmd -f .env.dev` (loaded by npm scripts)
- **Production**: Next.js automatically loads from deployment platform

### Required Variables

| Variable | Purpose | Where Used |
|----------|---------|------------|
| `NEXT_PUBLIC_WEB3AUTH_CLIENT_ID` | Web3Auth authentication | `/pages/api/web3Auth.ts` |
| `NEXT_PUBLIC_DEBUG` | Enable debug mode | Various components |

### Adding New Variables

1. Add to `.env.dev`
2. Use `NEXT_PUBLIC_` prefix for client access
3. Update this documentation
4. Add to Vercel dashboard for production

---

## Build & Deployment

### Development Build

```bash
npm run build      # Uses .env.dev
npm run start      # Serve build locally
```

### Production Build

```bash
npm run build:prod  # No env file
npm run start:prod  # Production server
```

### Deployment Platforms

#### Vercel (Web)
- **URL**: https://itio.space
- **Auto-Deploy**: Enabled on push to main
- **Environment**: Set variables in Vercel dashboard
- **Build Command**: `npm run build:prod`
- **Output**: Static export compatible

#### Electron (Desktop)
```bash
npm run electron   # Run desktop app
```

**Package for distribution**:
```bash
# Install electron-builder
npm install --save-dev electron-builder

# Add to package.json scripts
"pack": "electron-builder --dir"
"dist": "electron-builder"

# Build
npm run dist
```

### Build Optimization

**Next.js Config** (`next.config.js`):
- `swcMinify: true` - Fast minification with SWC
- `images.unoptimized: true` - Required for static export
- `reactStrictMode: true` - Development warnings

### Static Export

For hosting without Node.js server:
```bash
# Add to next.config.js
module.exports = {
  output: 'export',
  // ... other config
}

# Build
npm run build

# Output in /out directory
```

---

## Troubleshooting Guide

### Common Issues

#### 1. Web3Auth Connection Fails

**Symptoms**: Login button doesn't work, console shows auth errors

**Solutions**:
- Check `NEXT_PUBLIC_WEB3AUTH_CLIENT_ID` is set
- Verify client ID is valid at https://dashboard.web3auth.io/
- Check network connectivity
- Clear browser cache and cookies
- Verify domain is whitelisted in Web3Auth dashboard

**Debug**:
```typescript
useEffect(() => {
  console.log('Web3Auth Client ID:', process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID);
  console.log('Web3Auth instance:', web3auth);
}, [web3auth]);
```

#### 2. 3D Model Not Loading

**Symptoms**: Blank canvas, no 3D scene, console errors

**Solutions**:
- Check model file exists: `/public/model/scene-transformed.glb`
- Verify file size (889MB - ensure not corrupted)
- Check browser WebGL support: visit https://get.webgl.org/
- Check console for Three.js errors
- Try different browser

**Debug**:
```typescript
<Suspense fallback={<div>Loading 3D Model...</div>}>
  <Model />
</Suspense>
```

#### 3. Environment Variables Not Loading

**Symptoms**: `undefined` values, features not working

**Solutions**:
- Ensure `.env.dev` exists in root directory
- Verify variable names start with `NEXT_PUBLIC_`
- Restart development server (required after env changes)
- Check `env-cmd` is installed: `npm install env-cmd`

**Debug**:
```typescript
console.log('All env vars:', process.env);
```

#### 4. TypeScript Errors

**Symptoms**: Red squiggly lines, build warnings

**Solutions**:
- Check `tsconfig.json` has `"strict": false`
- Install missing type definitions: `npm install --save-dev @types/package-name`
- Use `// @ts-ignore` for specific line (use sparingly)
- Run `npm install` to ensure all dependencies installed

**Common fixes**:
```typescript
// Add explicit types
const [value, setValue] = useState<string | null>(null);

// Use 'any' as escape hatch (use sparingly)
const handleEvent = (e: any) => { /* ... */ }
```

#### 5. Module Not Found Errors

**Symptoms**: `Cannot find module` errors

**Solutions**:
- Run `npm install` to install dependencies
- Check import paths are correct
- Verify file exists at specified location
- Clear Next.js cache: `rm -rf .next`
- Check for typos in import statements

#### 6. Electron App Issues

**Symptoms**: Electron won't start, blank window

**Solutions**:
- Ensure Electron is installed: `npm install electron`
- Check `/electron/index.js` exists
- Verify production URL is accessible: https://itio.space
- Enable DevTools for debugging (uncomment in electron/index.js)
- Check for JavaScript console errors

**Enable DevTools**:
```javascript
// electron/index.js
mainWindow.webContents.openDevTools(); // Uncomment this line
```

#### 7. Styling Issues

**Symptoms**: Styles not applying, layout broken

**Solutions**:
- Check CSS module imports: `import styles from './Component.module.css'`
- Verify global styles imported in `_app.tsx`
- Clear browser cache
- Check for CSS syntax errors
- Verify Material-UI theme provider wraps components

#### 8. Performance Issues

**Symptoms**: Slow loading, laggy interactions

**Solutions**:
- Check 3D model complexity (889MB is large - consider optimization)
- Reduce auto-rotation speed in OrbitControls
- Optimize images and assets
- Use React.memo for expensive components
- Check browser performance in DevTools

**Optimize 3D model**:
```bash
# Use gltf-pipeline to compress
npm install -g gltf-pipeline
gltf-pipeline -i model.glb -o model-compressed.glb -d
```

### Getting Help

1. **Check Console**: Browser DevTools Console (F12)
2. **Check Network**: Browser DevTools Network tab
3. **Check Logs**: Terminal running `npm run dev`
4. **Enable Debug Mode**: Set `NEXT_PUBLIC_DEBUG=true` in `.env.dev`
5. **Verify Dependencies**: Run `npm list` to check installed packages

### Debug Mode

Enable detailed logging:
```typescript
// Add to component
useEffect(() => {
  if (process.env.NEXT_PUBLIC_DEBUG) {
    console.log('Debug info:', { web3auth, provider, web3UserInfo });
  }
}, [web3auth, provider, web3UserInfo]);
```

---

## Git Workflow & Branching

### Branch Naming Convention

All feature branches MUST follow this pattern:
```
claude/claude-md-<identifier>-<session-id>
```

Example: `claude/claude-md-mi66bxstsrvm6mq0-01BsF3H2ereo18iqz1ooyUmo`

### Git Operations

**Create feature branch**:
```bash
git checkout -b claude/claude-md-<identifier>-<session-id>
```

**Commit changes**:
```bash
git add .
git commit -m "Descriptive commit message"
```

**Push to remote**:
```bash
git push -u origin claude/claude-md-<identifier>-<session-id>
```

**Important**:
- Always use `-u origin <branch-name>` when pushing
- Branch must start with `claude/` and end with session ID
- Push will fail with 403 if branch name is incorrect

### Commit Message Conventions

Follow conventional commit format:
```
<type>: <description>

[optional body]

[optional footer]
```

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Formatting, missing semicolons, etc.
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `perf`: Performance improvement
- `test`: Adding tests
- `chore`: Updating build tasks, package manager configs, etc.

**Examples**:
```
feat: Add user profile component with wallet info
fix: Resolve Web3Auth connection timeout issue
docs: Update CLAUDE.md with new component patterns
refactor: Simplify 3D scene lighting setup
```

---

## Testing Guidelines

### Manual Testing Checklist

Before committing changes:

- [ ] `npm run lint` passes without errors
- [ ] `npm run build` completes successfully
- [ ] Dev server (`npm run dev`) runs without errors
- [ ] Homepage loads at http://localhost:3000
- [ ] 3D scene renders correctly
- [ ] Web3Auth login works (Google/Facebook)
- [ ] User profile displays after login
- [ ] No console errors in browser DevTools
- [ ] Responsive design works on mobile viewport
- [ ] All new environment variables documented

### Browser Testing

Test in these browsers:
- Chrome/Chromium (primary)
- Firefox
- Safari (macOS)
- Edge

### Feature Testing

**3D Scene**:
- Model loads without errors
- OrbitControls work (drag to rotate)
- Auto-rotation functions
- No performance issues

**Web3 Authentication**:
- Login modal appears
- Social login works (Google/Facebook)
- User info displays correctly
- Wallet address shown
- ETH balance retrieved
- Logout functions properly

**Desktop App**:
- Electron launches without errors
- App loads production site
- All features work same as web version

---

## Performance Considerations

### 3D Model Optimization

**Current model**: 889MB GLB file (very large)

**Recommendations**:
1. Use Draco compression
2. Reduce polygon count
3. Optimize textures
4. Consider level-of-detail (LOD) system
5. Implement lazy loading

**Tools**:
- gltf-pipeline
- Blender (model optimization)
- gltfjsx (React component generation)

### Code Splitting

Next.js automatically splits code, but you can optimize further:

```typescript
import dynamic from 'next/dynamic'

const Scene = dynamic(() => import('@/components/THREE/scene'), {
  ssr: false, // Disable server-side rendering for Three.js
  loading: () => <p>Loading 3D scene...</p>
})
```

### Image Optimization

Currently disabled (`unoptimized: true`) for static export.

For Vercel deployment, enable:
```javascript
// next.config.js
module.exports = {
  images: {
    unoptimized: false,
    domains: ['itio.space'],
  },
}
```

---

## Security Considerations

### Environment Variables

- **Never commit** `.env.dev` to git (already in .gitignore)
- **Never expose** private keys or secrets in client-side code
- **Always use** `NEXT_PUBLIC_` prefix for intentionally public variables
- **Rotate** Web3Auth client ID if exposed

### Web3Auth

- Client ID is public (safe to expose)
- Private keys never leave user's device
- Web3Auth handles secure key management
- Always verify transactions before signing

### Dependencies

- Regularly update dependencies: `npm audit`
- Check for vulnerabilities: `npm audit fix`
- Review dependency licenses
- Pin versions in package.json for stability

---

## Resources & Documentation

### Official Documentation

- **Next.js**: https://nextjs.org/docs
- **React**: https://react.dev/
- **Three.js**: https://threejs.org/docs/
- **React Three Fiber**: https://docs.pmnd.rs/react-three-fiber
- **Web3Auth**: https://web3auth.io/docs/
- **Material-UI**: https://mui.com/material-ui/getting-started/
- **Electron**: https://www.electronjs.org/docs/latest/

### Tools & Utilities

- **gltfjsx**: Convert GLB to React components
  ```bash
  npx gltfjsx model.glb
  ```

- **Web3Auth Dashboard**: https://dashboard.web3auth.io/
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Infura**: https://infura.io/ (Ethereum RPC)

### Helpful Commands

```bash
# Check package versions
npm list three @react-three/fiber react next

# Find outdated packages
npm outdated

# Update specific package
npm update package-name

# Clean install
rm -rf node_modules package-lock.json && npm install

# Clear Next.js cache
rm -rf .next

# Check TypeScript errors
npx tsc --noEmit
```

---

## AI Assistant Guidelines

### When Working on This Project

1. **Read this file first** before making changes
2. **Check file locations** in Directory Structure section
3. **Follow code conventions** documented above
4. **Test changes** using manual testing checklist
5. **Update this file** if patterns change
6. **Ask for clarification** if requirements are ambiguous

### Making Changes

**DO**:
- Follow existing patterns and conventions
- Add comments for complex logic
- Update documentation when changing behavior
- Test in development before committing
- Use TypeScript types where helpful
- Keep commits focused and atomic

**DON'T**:
- Change core dependencies without discussion
- Enable strict TypeScript mode (breaks existing code)
- Commit directly to main branch
- Add unnecessary dependencies
- Remove or modify 3D model files without backup
- Change Web3Auth configuration without testing

### Code Review Checklist

Before marking work complete:

- [ ] Code follows project conventions
- [ ] No console errors in development
- [ ] Lint passes (`npm run lint`)
- [ ] Build succeeds (`npm run build`)
- [ ] Changes are documented in commit message
- [ ] Environment variables documented if added
- [ ] This CLAUDE.md updated if patterns changed
- [ ] Manual testing completed
- [ ] No sensitive data committed

---

## Frequently Asked Questions

### Why is strict mode disabled in TypeScript?

The project was built with flexibility in mind. Enabling strict mode would require significant refactoring of existing code. This is a conscious trade-off for faster development.

### Why are images unoptimized?

`unoptimized: true` is required for static export compatibility and Electron. This allows the app to run without a Next.js server.

### Can I add a new page without API routes?

Yes! Just create a file in `/pages` and it will be automatically routed. API routes are optional.

### How do I use a different blockchain network?

Modify the `chainConfig` in `/pages/api/web3Auth.ts`:
```typescript
chainConfig: {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0x89", // Polygon
  rpcTarget: "https://polygon-rpc.com"
}
```

### Why is the model file so large?

The current 3D model is highly detailed. Consider optimizing with Draco compression or using a simpler model for better performance.

### Can I add server-side rendering?

Yes, but you'll need to disable it for Three.js components using `dynamic` imports with `ssr: false`.

### How do I add a new social login provider?

Update `loginMethodsOrder` in Web3Auth config:
```typescript
uiConfig: {
  loginMethodsOrder: ["google", "facebook", "twitter", "discord"]
}
```

---

## Changelog

### 2025-11-19
- Initial CLAUDE.md creation
- Comprehensive codebase documentation
- Development workflow guidelines
- Troubleshooting guide added

---

## Contact & Support

- **Repository**: https://github.com/itio-co/itio.space
- **Website**: https://itio.space
- **Issues**: Report bugs via GitHub Issues

---

**Last Updated**: November 19, 2025
**Maintained By**: ITIO Development Team
**For**: AI Assistants and Human Developers
