# Project Structure

The project separates Electron's privileged main process, the renderer user interface, and the limited API exposed to the renderer. The current implementation is intentionally a scaffold: it creates a window, displays a placeholder screen, and retrieves the application version through IPC. Assessment workflows are not implemented.

## Current files and directories

```text
electron/
  main/
    index.ts                  Application lifecycle and BrowserWindow creation
  preload/
    index.ts                  Restricted API exposed to the renderer
src/
  renderer/
    index.html                Renderer document and Content Security Policy
    src/
      main.ts                 Renderer entry point
      style.css               Initial renderer styles
  shared/
    assessment-app.d.ts       TypeScript declaration for the preload API
docs/
  README-electron.md          Electron concepts, commands, and references
  README-structure.md         Project structure and module responsibilities
electron.vite.config.ts       Build and development configuration
package.json                 Project metadata, dependencies, and scripts
tsconfig.json                TypeScript compiler configuration
```

## Responsibility boundaries

- `electron/main` owns the desktop application lifecycle, windows, and privileged integrations with the operating system.
- `electron/preload` defines the small, explicit API available to renderer code. Keep privileged operations out of the renderer and do not expose unrestricted Electron APIs.
- `src/renderer` contains the user interface. It must not access Node.js APIs, credentials, the filesystem, or Docker directly.
- `src/shared` contains shared type declarations. It should not become a general-purpose location for business logic or Electron-dependent code.
- `docs` contains project documentation.

The renderer-to-main boundary uses IPC. New IPC operations should have specific names, typed inputs and outputs, and validation in the main process.

## Planned areas

```text
electron/
  main/
    [preflight/]
    [pairing/]
    [session/]
    [environment/]
    [submission/]
    [updates/]
  preload/
src/
  renderer/
    src/
      [app/]
      [features/]
        [consent/]
        [pairing/]
        [session/]
        [environment/]
        [submission/]
        [updates/]
  shared/
```

Folder responsibilities:

- `electron/`: contains Electron-specific process code.
- `electron/main/`: hosts the main-process modules that manage privileged application operations.
- `electron/main/[preflight/]`: checks system requirements and connectivity before an assessment starts, and reports actionable failures.
- `[pairing/]` under `electron/main`: performs the privileged parts of device registration and session pairing.
- `[session/]` under `electron/main`: manages the local session lifecycle, status, and recovery.
- `electron/main/[environment/]`: prepares and controls the IDE and Runner environment, including container-related operations.
- `electron/main/[submission/]`: coordinates telemetry flushing, Git push, and submission freeze requests.
- `electron/main/[updates/]`: handles application version checks and update operations.
- `electron/preload/`: contains the isolated bridge between the renderer and approved main-process capabilities.
- `src/`: contains renderer-facing application code and shared type declarations.
- `src/renderer/`: contains the renderer document and user-interface application.
- `src/renderer/src/`: contains the renderer entry point, styles, and feature modules.
- `src/renderer/src/[app/]`: renderer-level application shell, navigation, and shared layout.
- `src/renderer/src/[features/]`: groups renderer user-interface capabilities by assessment workflow.
- `src/renderer/src/[features/consent/]`: presents the consent information and records the student's choice.
- `[pairing/]` under `src/renderer/src/features`: provides the pairing screens and user feedback.
- `[session/]` under `src/renderer/src/features`: displays session status, deadline, and connection state.
- `[environment/]` under `src/renderer/src/features`: presents environment preparation progress and relevant errors.
- `[submission/]` under `src/renderer/src/features`: provides the submit action and submission progress or result.
- `[updates/]` under `src/renderer/src/features`: displays update availability and guides the user through updating.
- `src/shared/`: holds types shared across process boundaries, without placing privileged operations or business logic there.

Bracketed directory names are proposed additions and are not part of the current scaffold.

Code identifiers, comments, and user-facing application strings follow the repository's English-language requirement. Documentation is written in English for this project.
