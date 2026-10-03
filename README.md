# TPI Practical Challenge Desktop

The desktop application is intended to provide the local client for practical coding assessments. This repository currently contains an initial Electron scaffold: it creates a desktop window and renders a placeholder screen. Pairing, Docker orchestration, backend communication, telemetry collection, and assessment workflows are not implemented yet.

## Requirements

- Node.js 22.12.0 or later and npm.
- A supported desktop operating system: Windows, macOS, or Linux.

Docker and WSL2 are assessment-environment requirements described by the product specifications. They are not required to run this initial scaffold.

## Getting started

Run these commands from the repository root:

```bash
npm ci
npm run dev
```

`npm ci` installs the exact dependency versions recorded in `package-lock.json`. `npm run dev` starts the development server and launches the Electron application.

## Documentation

- [Electron concepts, commands, and official references](docs/README-electron.md)
- [Project structure and module responsibilities](docs/README-structure.md)
