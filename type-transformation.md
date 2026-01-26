# Type Transformations (Fast Reference)

This file is a **clean summary** of the TypeScript type-transformation notes you copied from Total TypeScript.

Goal: let you **recall each feature at a glance**.

## Quick index

- Extracting types: `typeof`, `ReturnType`, `Parameters`, `Awaited`
- Keys/values: `keyof typeof`, indexed access (`T["k"]`), unions from values
- Unions: discriminated unions, `Extract`, `Exclude`, extracting the discriminator
- Literal inference: `as const`, unions from arrays/objects
- Template literal types: patterns, filtering, permutations, recursion
- Type helpers: generics, constraints, defaults
- Conditional types: logic, `infer`, distributivity
- Mapped types: key remapping, conditional picks, deep transforms

---

## 1) Extracting types from runtime code

### `ReturnType<typeof fn>`

Use it to stay in sync with a function’s implementation.

```ts
const myFunc = () => ({ ok: true as const, value: 123 });

type Result = ReturnType<typeof myFunc>;
// { ok: true; value: number }
```

### `Parameters<typeof fn>`

Returns a tuple of parameters. Index into it when needed.

```ts
function makeQuery(url: string, opts?: { method?: string }) {}

type Args = Parameters<typeof makeQuery>;
// [url: string, opts?: { method?: string } | undefined]

type SecondArg = Args[1];
```

### `Awaited<ReturnType<typeof fn>>`

Unwrap the resolved value from a Promise-returning function.

```ts
async function getUser() {
  return { id: "u_1", name: "Ada" };
}

type User = Awaited<ReturnType<typeof getUser>>;
// { id: string; name: string }
```

---

## 2) Keys, values, and indexed access

### `keyof typeof obj` → union of keys

Order matters: `keyof` works on types; `typeof` bridges runtime values to types.

```ts
const testingFrameworks = {
  vitest: { fast: true },
  jest: { fast: false },
  mocha: { fast: false },
} as const;

type Framework = keyof typeof testingFrameworks;
// "vitest" | "jest" | "mocha"
```

### Indexed access types: `T["key"]`

Pull property types out of an object/union type.

```ts
const fakeDataDefaults = {
  String: "x",
  Int: 123,
  obj: { nested: { ok: true as const } },
};

type Defaults = typeof fakeDataDefaults;

type StringType = Defaults["String"];
// string

type Deep = Defaults["obj"]["nested"]["ok"];
// true
```

### Union from object values

A common “enum map” pattern.

```ts
const status = { Draft: "draft", Published: "published" } as const;

type Status = (typeof status)[keyof typeof status];
// 'draft' | 'published'
```

### Union from array values

Use `as const` + `[number]`.

```ts
const roles = ["admin", "editor", "viewer"] as const;

type Role = (typeof roles)[number];
// 'admin' | 'editor' | 'viewer'
```

---

## 3) Unions & discriminated unions

### Union vs discriminated union

A discriminated union has a shared “tag” field (often `type`).

```ts
type A =
  | { type: "a"; a: string }
  | { type: "b"; b: string }
  | { type: "c"; c: string };

type B = "a" | "b" | "c";

function handle(result: A) {
  if (result.type === "a") {
    result.a; // ok
  }
}
```

### Extract a member: `Extract<Union, Match>`

```ts
type Event =
  | { type: "click"; event: MouseEvent }
  | { type: "focus"; event: FocusEvent }
  | { type: "keydown"; event: KeyboardEvent };

type ClickEvent = Extract<Event, { type: "click" }>;
```

### Exclude a member: `Exclude<Union, Match>`

```ts
type NonKeyDown = Exclude<Event, { type: "keydown" }>;
```

### Extract the discriminator: `Union["type"]`

Works only if **every** member has that property.

```ts
type EventType = Event["type"];
// 'click' | 'focus' | 'keydown'
```

### “Union multiverse” mental model

If a value could be several things, TypeScript forces your code to be safe for **all** of them until you narrow it.

---

## 4) `as const` (literal inference)

Use `as const` to:

- infer literal values (`"draft"` instead of `string`)
- make object properties readonly

```ts
export const programModeEnumMap = {
  GROUP: "group",
  ONE_ON_ONE: "1on1",
} as const;
```

---

## 5) Template literal types

### Only allow specified string patterns

```ts
type Route = `/users/${string}` | `/posts/${string}`;
```

### Filter a union by pattern

```ts
type Events = "click" | "keydown" | "touch:start" | "touch:end";

type OnlyTouch<T> = T extends `touch:${string}` ? T : never;

type TouchEvents = OnlyTouch<Events>;
// 'touch:start' | 'touch:end'
```

### Create all permutations from two unions

```ts
type Size = "sm" | "md" | "lg";
type Color = "red" | "blue";

type Variant = `${Size}-${Color}`;
```

### Split a string into a tuple (recursive)

```ts
type Split<
  S extends string,
  D extends string,
> = S extends `${infer Head}${D}${infer Tail}`
  ? [Head, ...Split<Tail, D>]
  : [S];

type Parts = Split<"a/b/c", "/">;
// ['a', 'b', 'c']
```

### Built-in string transformers

```ts
type Loud = Uppercase<"hello">;
// 'HELLO'
```

---

## 6) Type helpers (your own utilities)

Type helpers are type-level “functions”:

```ts
type Box<T> = { value: T };
```

Common patterns:

```ts
type Maybe<T> = T | null;

type ValuesOf<T> = T[keyof T];

type NonEmptyArray<T> = [T, ...T[]];
```

Constraints and defaults:

```ts
type ApiResponse<TData, TError = { message: string }> =
  | { ok: true; data: TData }
  | { ok: false; error: TError };
```

---

## 7) Conditional types & `infer`

### Conditional logic

```ts
type IsString<T> = T extends string ? true : false;
```

### `infer` to extract a piece

```ts
type UnwrapPromise<T> = T extends Promise<infer R> ? R : T;
```

### Distributivity

Conditional types distribute over unions by default:

```ts
type OnlyStrings<T> = T extends string ? T : never;

type Strings = OnlyStrings<string | number | boolean>;
// string
```

---

## 8) Mapped types (big transforms)

### Map a union into an object

```ts
type Keys = "home" | "settings";

type Routes = { [K in Keys]: `/${K}` };
```

### Transform keys with `as`

```ts
type PrefixKeys<T, P extends string> = {
  [K in keyof T as `${P}${string & K}`]: T[K];
};
```

### Conditionally keep properties

```ts
type PickByValue<T, V> = {
  [K in keyof T as T[K] extends V ? K : never]: T[K];
};
```

### Map a discriminated union to an object

```ts
type Event =
  | { type: "click"; x: number; y: number }
  | { type: "focus"; elementId: string };

type EventMap = {
  [E in Event as E["type"]]: E;
};

// EventMap['click'] -> { type: 'click'; x: number; y: number }
```

### Map an object to a union of tuples (Entries)

```ts
type Entries<T> = { [K in keyof T]: [K, T[K]] }[keyof T];

type User = { id: string; active: boolean };

type UserEntries = Entries<User>;
// ['id', string] | ['active', boolean]
```

### Transform an object into a union of template literals

```ts
type ToRoutes<T extends Record<string, string>> = {
  [K in keyof T]: `${string & K}:${T[K]}`;
}[keyof T];

type RouteTable = { users: "/users"; posts: "/posts" };

type Routes = ToRoutes<RouteTable>;
// 'users:/users' | 'posts:/posts'
```

### Transform an object into a discriminated union

```ts
type Actions = {
  add: { amount: number };
  reset: {};
};

type ActionUnion = {
  [K in keyof Actions]: { type: K; payload: Actions[K] };
}[keyof Actions];
```

### Deep transforms: `DeepPartial<T>`

```ts
type DeepPartial<T> = T extends object
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : T;
```

---

## App version of these notes

The night-theme tutorial UI renders a structured version of this content.

- Content: `src/tutorial/typeTransformations.ts`
- UI: `src/App.tsx`
