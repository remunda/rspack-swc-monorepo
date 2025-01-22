# RSpack, SWC Monorepo

This is a proof of concept (POC) project to test and explore the integration of various modern technologies in a monorepo setup. The goal is to evaluate the performance, developer experience, and overall feasibility of using these tools together.

## Technologies

This monorepo project uses the following technologies:

- **[React](https://reactjs.org/)** for the frontend
- **[Express](https://expressjs.com/)** for the backend
- **[Zod](https://zod.dev/)** for schema validation
- **[Zustand](https://zustand-demo.pmnd.rs/)** for state management
- **[Rsbuild](https://rsbuild.org/)** for building the frontend
- **[SWC](https://swc.rs/)** for building the backend
- **[Biome](https://biomejs.dev/)** for formatting and linting
- **[TypeScript](https://www.typescriptlang.org/)** for type checking

## Cool Features:

- **Hot Module Replacement (HMR)** with React for a seamless development experience.
- **Schema validation** with Zod to ensure data integrity.
- **State management** with Zustand for a simple and scalable state solution.
- **High-performance builds** with Rsbuild and SWC.
- **Code quality** enforced by Biome for consistent formatting and linting.
- **Type safety** with TypeScript to catch errors early in the development process.

## Setup

Install the dependencies:

```bash
yarn install
```

## Get Started

Start the frontend dev server:

```bash
yarn dev:fe
```

Start the backend dev server:

```bash
yarn dev:be
```

Start both frontend and backend dev servers:

```bash
yarn dev
```

## Build

Build the frontend:

```bash
yarn workspace frontend build
```

Build the backend:

```bash
yarn workspace backend build
```

or Build both:

```bash
yarn build
```

## Preview

Preview the production build locally:

```bash
yarn preview
```
