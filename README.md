# TypeScript Master

A night-theme TypeScript tutorial/reference app that explains each TypeScript concept in a focused section.

Each section translates a class of type-system ideas into a **clean, scannable layout** with short explanations and copyable code snippets so you can quickly refresh a pattern.

## What you get

- A dark-mode UI that groups TypeScript features into sections (utility types, unions, template literal types, conditional types, mapped types, etc.)
- Fast recall: each topic is a 10–30 second refresher with a minimal code example
- Search across topics (e.g. `ReturnType`, `infer`, `keyof`, `as const`, `DeepPartial`)

## Run locally

```bash
npm install
npm run dev
```

Then open the URL Vite prints in your terminal.

## Where the learning content lives

- The summarized notes are in [type-transformation.md](type-transformation.md)
- Additional fast references:
  - [generics.md](generics.md)
  - [advanced-patterns.md](advanced-patterns.md)
  - [react-typescript.md](react-typescript.md)
- The UI content is currently driven by [src/tutorial/typeTransformations.ts](src/tutorial/typeTransformations.ts)

## Covered TypeScript features (high level)

- Extracting types: `typeof`, `ReturnType`, `Parameters`, `Awaited`, indexed access
- Unions: discriminated unions, `Extract`, `Exclude`, union “multiverse” mental model
- Literal inference: `as const`, unions from object/array values
- Template literal types: patterns, filtering, combinations, recursion
- Type helpers: generics, constraints, defaults
- Conditional types: distributivity, `infer`
- Mapped types: key remapping, conditional picks, deep transforms like `DeepPartial`
- Advanced patterns: branded/opaque types (model “validated” values)
- React + TS: discriminated union props + narrowing-first patterns

## Design system

Generated via the `ui-ux-pro-max` workflow:

- [design-system/typescript-master/MASTER.md](design-system/typescript-master/MASTER.md)
- [design-system/typescript-master/pages/app.md](design-system/typescript-master/pages/app.md)
