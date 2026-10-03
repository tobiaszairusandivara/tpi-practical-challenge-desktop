# Electron: Overview and Development Commands

## What Electron is

Electron is an open-source framework for building cross-platform desktop applications with web technologies. An Electron application bundles Chromium, which renders the user interface, with Node.js, which provides access to operating-system and application capabilities. The application can therefore use a web-based renderer while retaining a native desktop application lifecycle.

Electron is a runtime and framework, not a user-interface library or a complete build and packaging workflow. This project uses `electron-vite` to run the application during development and to build its main, preload, and renderer processes. Packaging and distribution are not configured in the current scaffold.

## Application process model

An Electron application is organized around three process roles:

| Process or component | Responsibility in this project |
|---|---|
| Main process | Runs in Node.js, owns the application lifecycle, and creates the `BrowserWindow`. Entry point: `electron/main/index.ts`. |
| Renderer process | Runs the web user interface in Chromium. Entry document: `src/renderer/index.html`; TypeScript and styles are under `src/renderer/src/`. |
| Preload script | Runs in an isolated context associated with a renderer and exposes a deliberately limited API. Entry point: `electron/preload/index.ts`. |

The renderer and main process communicate through Electron's inter-process communication (IPC) mechanism. In this scaffold, the preload exposes only `getAppVersion`; it invokes a named IPC handler rather than exposing `ipcRenderer` directly. The `BrowserWindow` enables context isolation and sandboxing and disables Node.js integration in the renderer.

These boundaries are security-relevant. Do not place secrets or privileged operations in renderer code. Add future capabilities as narrowly scoped preload methods backed by main-process handlers, and validate all values crossing the IPC boundary.

## Commands available in this scaffold

Run project commands from the repository root.

| Command | Purpose |
|---|---|
| `npm ci` | Installs the dependency versions recorded in `package-lock.json` and runs the project `postinstall` script to download the matching Electron runtime. Prefer this for a reproducible local or CI installation. |
| `npm install` | Installs dependencies and updates the lockfile when dependency declarations change. |
| `npm run dev` | Runs `electron-vite dev`: starts the development workflow and launches Electron with the renderer served for development. This is the normal command for working on the application. |
| `npm run build` | Runs `electron-vite build`: compiles the main process, preload script, and renderer into `out/`. It does not create a platform installer. |
| `npm run preview` | Runs `electron-vite preview`, builds the application, and launches it using the production output. Use this to verify the production build in Electron. |
| `npm run typecheck` | Runs `tsc --noEmit` to check the TypeScript files included by `tsconfig.json` without writing compiled files. |

## Electron CLI

The `electron` package also supplies the Electron executable. The following commands are useful for checking the installed runtime or launching the already-built application:

| Command | Purpose |
|---|---|
| `npx electron --version` | Prints the Electron runtime version installed in this project. |
| `npx electron .` | Opens the application described by the root `package.json` `main` field. For this scaffold, build first with `npm run build`; this is a direct runtime launch, not the recommended development workflow. |
| `npx electron --inspect=9229 .` | Launches the application with the main process available to a debugger on port `9229`. Use only in a trusted local development environment. |

`npx electron` invokes Electron's runtime executable. The `npm run` commands above invoke scripts declared by this repository; `electron-vite` is the development/build tool behind those scripts and is not part of Electron itself.

## Official documentation

- [Electron: Introduction](https://www.electronjs.org/docs/latest/)
- [Electron: Quick Start](https://www.electronjs.org/docs/latest/tutorial/quick-start)
- [Electron: Process Model](https://www.electronjs.org/docs/latest/tutorial/process-model)
- [Electron: Inter-Process Communication](https://www.electronjs.org/docs/latest/tutorial/ipc)
- [Electron: Security](https://www.electronjs.org/docs/latest/tutorial/security)
- [Electron: Context Isolation](https://www.electronjs.org/docs/latest/tutorial/context-isolation)
- [Electron: `contextBridge`](https://www.electronjs.org/docs/latest/api/context-bridge)
- [Electron: `BrowserWindow`](https://www.electronjs.org/docs/latest/api/browser-window)
- [Electron: Command Line Switches](https://www.electronjs.org/docs/latest/api/command-line-switches)

The commands in the project command table are defined by this repository and its dependencies. Consult the official Electron documentation for Electron APIs and runtime behavior; consult the [`electron-vite` documentation](https://electron-vite.org/) for its development and build commands.
