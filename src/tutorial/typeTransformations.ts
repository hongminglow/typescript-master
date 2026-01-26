export type TutorialTopic = {
  id: string;
  title: string;
  summary: string;
  details?: string;
  tags: Array<
    | "utility-type"
    | "typeof"
    | "keyof"
    | "indexed-access"
    | "union"
    | "template-literal"
    | "conditional-type"
    | "infer"
    | "mapped-type"
    | "generic"
    | "react"
    | "pattern"
  >;
  code: string;
  io?: {
    input: string;
    transform: string;
    output: string;
  };
};

export type TutorialSection = {
  id: string;
  title: string;
  description: string;
  topics: TutorialTopic[];
};

export const typeTransformationSections: TutorialSection[] = [
  {
    id: "extracting-types",
    title: "Extracting Types",
    description:
      "Pull types out of existing runtime code so your types stay in sync with implementation.",
    topics: [
      {
        id: "returntype",
        title: "ReturnType<typeof fn>",
        summary: "Extract a function's return type without re-declaring it.",
        details:
          "Use `typeof` to get the function type, then `ReturnType<...>` to capture what it returns. This is great when the function changes over time.",
        tags: ["utility-type", "typeof"],
        io: {
          input: "const myFunc = () => ({ ok: true as const, value: 123 })",
          transform: "type R = ReturnType<typeof myFunc>",
          output: "R = { ok: true; value: number }",
        },
        code: `const myFunc = () => {
  return { ok: true as const, value: 123 }
}

type MyFuncReturn = ReturnType<typeof myFunc>
//    ^? { ok: true; value: number }`,
      },
      {
        id: "parameters",
        title: "Parameters<typeof fn>",
        summary: "Extract a function's parameter list as a tuple.",
        details:
          "You can index into the tuple (e.g. `[0]`, `[1]`) to grab a specific parameter type.",
        tags: ["utility-type", "typeof", "indexed-access"],
        io: {
          input: "function makeQuery(url: string, opts?: { method?: string })",
          transform:
            "type Args = Parameters<typeof makeQuery>; type Second = Args[1]",
          output:
            "Args = [url: string, opts?: { method?: string } | undefined]; Second = { method?: string } | undefined",
        },
        code: `function makeQuery(
  url: string,
  opts?: { method?: string; headers?: Record<string, string>; body?: string },
) {
  // ...
}

type MakeQueryParameters = Parameters<typeof makeQuery>
//    ^? [url: string, opts?: { ... } | undefined]

type SecondArg = MakeQueryParameters[1]
//    ^? { method?: string; headers?: Record<string, string>; body?: string } | undefined`,
      },
      {
        id: "awaited",
        title: "Awaited<ReturnType<typeof fn>>",
        summary:
          "Extract the resolved value type from a Promise-returning function.",
        details:
          "This pattern is common for async functions: first capture the return type, then unwrap it with `Awaited`.",
        tags: ["utility-type", "typeof"],
        io: {
          input:
            "async function getUser(): Promise<{ id: string; name: string }>",
          transform: "type User = Awaited<ReturnType<typeof getUser>>",
          output: "User = { id: string; name: string }",
        },
        code: `async function getUser() {
  return { id: 'u_1', name: 'Ada' }
}

type GetUserPromise = ReturnType<typeof getUser>
//    ^? Promise<{ id: string; name: string }>

type User = Awaited<GetUserPromise>
//    ^? { id: string; name: string }`,
      },
      {
        id: "keyof-typeof",
        title: "keyof typeof obj",
        summary: "Create a union from an object's keys.",
        details:
          "`keyof` operates on types; `typeof` bridges runtime values to types. Order matters: `keyof typeof obj`.",
        tags: ["keyof", "typeof", "union"],
        io: {
          input:
            "const testingFrameworks = { vitest: ..., jest: ..., mocha: ... } as const",
          transform: "type Framework = keyof typeof testingFrameworks",
          output: "Framework = 'vitest' | 'jest' | 'mocha'",
        },
        code: `const testingFrameworks = {
  vitest: { fast: true },
  jest: { fast: false },
  mocha: { fast: false },
} as const

type Framework = keyof typeof testingFrameworks
//    ^? "vitest" | "jest" | "mocha"`,
      },
      {
        id: "indexed-access",
        title: "Indexed Access Types",
        summary: 'Pull out a property type using T["key"].',
        details:
          "Works great with `typeof` for extracting nested shapes. Use brackets (not dot notation) in types.",
        tags: ["indexed-access", "typeof"],
        code: `const fakeDataDefaults = {
  String: 'Default string',
  Int: 123,
  obj: { nested: { ok: true as const } },
}

type Defaults = typeof fakeDataDefaults

type StringType = Defaults['String']
//    ^? string

type Deep = Defaults['obj']['nested']['ok']
//    ^? true`,
      },
    ],
  },
  {
    id: "unions",
    title: "Unions & Discriminators",
    description:
      "Model “one of many possibilities” and safely narrow to the correct member at runtime.",
    topics: [
      {
        id: "discriminated-union",
        title: "Discriminated Union vs Union",
        summary: "A discriminated union is a union with a shared “tag” field.",
        details:
          "The discriminator (often `type`) lets TypeScript narrow to the correct shape after a check.",
        tags: ["union"],
        code: `type A =
  | { type: 'a'; a: string }
  | { type: 'b'; b: string }
  | { type: 'c'; c: string }

type B = 'a' | 'b' | 'c'

function handle(result: A) {
  if (result.type === 'a') {
    result.a // ok: narrowed to { type: 'a'; a: string }
  }
}`,
      },
      {
        id: "extract-union-member",
        title: "Extract<Union, Match>",
        summary: "Pick only union members that match a shape.",
        details:
          'Great for discriminated unions: extract the member with `type: "click"` (or any unique field).',
        tags: ["utility-type", "union"],
        io: {
          input:
            "type Event = { type: 'click'; ... } | { type: 'focus'; ... } | { type: 'keydown'; ... }",
          transform: "type ClickEvent = Extract<Event, { type: 'click' }>",
          output: "ClickEvent = { type: 'click'; event: MouseEvent }",
        },
        code: `type Event =
  | { type: 'click'; event: MouseEvent }
  | { type: 'focus'; event: FocusEvent }
  | { type: 'keydown'; event: KeyboardEvent }

type ClickEvent = Extract<Event, { type: 'click' }>
//    ^? { type: 'click'; event: MouseEvent }`,
      },
      {
        id: "exclude-union-member",
        title: "Exclude<Union, Match>",
        summary: "Remove union members that match a shape.",
        details: "Use this when you want “everything except …”.",
        tags: ["utility-type", "union"],
        io: {
          input: "type Testing = 'a' | 'b' | 'c'",
          transform: "type ExcludeTest = Exclude<Testing, 'b'>",
          output: "ExcludeTest = 'a' | 'c'",
        },
        code: `type NonKeyDown = Exclude<Event, { type: 'keydown' }>
//    ^? { type: 'click'; ... } | { type: 'focus'; ... }`,
      },
      {
        id: "extract-discriminator",
        title: 'Union["type"] to extract the tag',
        summary: "Get the union of discriminator values.",
        details:
          "This only works if every union member has that property. If one member is missing it, TypeScript errors (which is a good signal).",
        tags: ["indexed-access", "union"],
        code: `type EventType = Event['type']
//    ^? 'click' | 'focus' | 'keydown'`,
      },
      {
        id: "multiverse",
        title: "Union “Multiverse” Mental Model",
        summary:
          "TypeScript checks all code paths across all union possibilities.",
        details:
          "If a value could be multiple things, your code must be safe for all of them until you narrow it.",
        tags: ["union"],
        code: `function walkToTheOffice(action: 'grabACoffee' | 'keepWalking') {
  const transitions = {
    grabACoffee: 'late',
    keepWalking: 'on time',
  } as const

  return transitions[action]
  // TypeScript ensures action can only be a valid key
}`,
      },
    ],
  },
  {
    id: "literals",
    title: "Literal Types & “as const”",
    description:
      "Lock values down to their literal types so you can derive precise unions and mappings.",
    topics: [
      {
        id: "as-const",
        title: "as const",
        summary: "Freeze inference to literals + readonly.",
        details:
          "Useful for enums-as-objects, maps, config, and deriving unions from values.",
        tags: ["typeof"],
        code: `export const programModeEnumMap = {
  GROUP: 'group',
  ANNOUNCEMENT: 'announcement',
  ONE_ON_ONE: '1on1',
} as const

// values are literals, keys are readonly`,
      },
      {
        id: "union-from-values",
        title: "Union from object values",
        summary: "Create a union of an object’s values.",
        details:
          "Combine `typeof` + indexed access with `keyof` to get a values union.",
        tags: ["keyof", "typeof", "indexed-access", "union"],
        code: `const status = {
  Draft: 'draft',
  Published: 'published',
  Archived: 'archived',
} as const

type Status = (typeof status)[keyof typeof status]
//    ^? 'draft' | 'published' | 'archived'`,
      },
      {
        id: "all-values",
        title: "Get all values (generic helper)",
        summary: "Turn “values of object” into a reusable type helper.",
        details: "When you use this a lot, wrap it as a helper type.",
        tags: ["generic", "keyof", "indexed-access"],
        code: `type ValuesOf<T> = T[keyof T]

type Status2 = ValuesOf<typeof status>
//    ^? 'draft' | 'published' | 'archived'`,
      },
      {
        id: "array-values-union",
        title: "Union from array values",
        summary: "Derive unions from arrays using (typeof arr)[number].",
        details: "Use `as const` to preserve literal array items.",
        tags: ["indexed-access", "typeof", "union"],
        code: `const roles = ['admin', 'editor', 'viewer'] as const

type Role = (typeof roles)[number]
//    ^? 'admin' | 'editor' | 'viewer'`,
      },
    ],
  },
  {
    id: "template-literals",
    title: "Template Literal Types",
    description:
      'Build and filter string unions using patterns like `"get:${string}"`.',
    topics: [
      {
        id: "string-patterns",
        title: "Only allow specified string patterns",
        summary: "Constrain strings like `user:${id}` or `get:/path`.",
        tags: ["template-literal"],
        code: `type Route = \`/users/\${string}\` | \`/posts/\${string}\`

function navigateTo(route: Route) {
  return route
}

navigateTo('/users/123')
// navigateTo('/settings') // error`,
      },
      {
        id: "extract-by-pattern",
        title: "Extract union strings matching a pattern",
        summary: "Filter a union by matching a template literal.",
        tags: ["template-literal", "conditional-type", "union"],
        code: `type Events = 'click' | 'keydown' | 'touch:start' | 'touch:end'

type OnlyTouch<T> = T extends \`touch:\${string}\` ? T : never

type TouchEvents = OnlyTouch<Events>
//    ^? 'touch:start' | 'touch:end'`,
      },
      {
        id: "permutations",
        title: "All combinations (two unions)",
        summary: "Create every possible pair like `size-color`.",
        tags: ["template-literal", "union"],
        code: `type Size = 'sm' | 'md' | 'lg'
type Color = 'red' | 'blue'

type Variant = \`\${Size}-\${Color}\`
//    ^? 'sm-red' | 'sm-blue' | 'md-red' | ...`,
      },
      {
        id: "split-string",
        title: "Split a string into a tuple (recursive)",
        summary: "Use conditional types to recursively build a tuple.",
        tags: ["template-literal", "conditional-type", "infer"],
        code: `type Split<S extends string, Delim extends string> =
  S extends \`\${infer Head}\${Delim}\${infer Tail}\`
    ? [Head, ...Split<Tail, Delim>]
    : [S]

type Parts = Split<'a/b/c', '/'>
//    ^? ['a', 'b', 'c']`,
      },
      {
        id: "uppercase",
        title: "Uppercase<T>",
        summary: "Transform string literals to uppercase.",
        tags: ["template-literal"],
        code: `type Loud = Uppercase<'hello world'>
//    ^? 'HELLO WORLD'`,
      },
    ],
  },
  {
    id: "type-helpers",
    title: "Type Helpers (Generics)",
    description:
      "Write your own reusable type-level “functions” with constraints and defaults.",
    topics: [
      {
        id: "introducing-helpers",
        title: "Introducing type helpers",
        summary: "Type aliases can take generics: `type Helper<T> = ...`.",
        tags: ["generic"],
        code: `type Box<T> = { value: T }

type NumberBox = Box<number>
//    ^? { value: number }`,
      },
      {
        id: "maybe",
        title: "Maybe<T>",
        summary: "A classic helper: “T or null”.",
        tags: ["generic", "union"],
        code: `type Maybe<T> = T | null

type MaybeUserId = Maybe<string>
//    ^? string | null`,
      },
      {
        id: "constraints",
        title: "Constraints for safety",
        summary: "Use `extends` to restrict inputs to a helper.",
        tags: ["generic"],
        code: `type ReturnOf<T extends (...args: any[]) => any> = ReturnType<T>

type R = ReturnOf<() => 123>
//    ^? number`,
      },
      {
        id: "optional-type-params",
        title: "Optional type parameters (defaults)",
        summary: "Provide a default type parameter with `=`.",
        tags: ["generic"],
        code: `type ApiResponse<TData, TError = { message: string }> =
  | { ok: true; data: TData }
  | { ok: false; error: TError }`,
      },
      {
        id: "non-nullish",
        title: "Exclude null/undefined",
        summary: "Constrain or transform away nullish values.",
        tags: ["utility-type", "generic"],
        code: `type NonNullish<T> = Exclude<T, null | undefined>

type Clean = NonNullish<string | null | undefined>
//    ^? string`,
      },
      {
        id: "non-empty-array",
        title: "Non-empty arrays",
        summary: "Represent arrays with at least one element.",
        tags: ["generic"],
        code: `type NonEmptyArray<T> = [T, ...T[]]

function head<T>(arr: NonEmptyArray<T>) {
  return arr[0]
}

head([1])
head([1, 2, 3])`,
      },
    ],
  },
  {
    id: "conditional-infer",
    title: "Conditional Types & infer",
    description:
      "Add “if/else” logic to types and infer pieces out of complex shapes.",
    topics: [
      {
        id: "conditional-logic",
        title: "Add conditional logic",
        summary: "Use `T extends X ? Y : Z`.",
        tags: ["conditional-type"],
        code: `type IsString<T> = T extends string ? true : false

type A = IsString<'x'> // true
type B = IsString<123> // false`,
      },
      {
        id: "infer-intro",
        title: "infer (extract a piece)",
        summary: "Capture a type inside a conditional type.",
        tags: ["conditional-type", "infer"],
        code: `type UnwrapPromise<T> = T extends Promise<infer R> ? R : T

type A = UnwrapPromise<Promise<number>> // number
type B = UnwrapPromise<string> // string`,
      },
      {
        id: "extract-type-args",
        title: "Extract type arguments into another helper",
        summary: "Compose helpers by inferring then reusing.",
        tags: ["conditional-type", "infer", "generic"],
        code: `type ElementOf<T> = T extends ReadonlyArray<infer E> ? E : never

type E = ElementOf<['a', 'b']> // 'a' | 'b'`,
      },
      {
        id: "extract-string-parts",
        title: "Extract parts of a string with template literals",
        summary: "Pull named pieces out of strings.",
        tags: ["template-literal", "conditional-type", "infer"],
        code:
          `type GetId<S extends string> =
  S extends ` +
          "`user:${infer Id}`" +
          ` ? Id : never

type Id = GetId<'user:123'>
//    ^? '123'`,
      },
      {
        id: "multiple-function-shapes",
        title: "Handle several possible function shapes",
        summary: "Match and infer return types across overload-like unions.",
        tags: ["conditional-type", "infer", "union"],
        code: `type ResultOf<T> = T extends (...args: any[]) => infer R ? R : never

type R = ResultOf<(() => string) | (() => number)>
//    ^? string | number`,
      },
      {
        id: "distributivity",
        title: "Distributive conditional types",
        summary: "Conditionals distribute over unions by default.",
        tags: ["conditional-type", "union"],
        code: `type OnlyStrings<T> = T extends string ? T : never

type Mixed = string | number | boolean

type Strings = OnlyStrings<Mixed>
//    ^? string`,
      },
    ],
  },
  {
    id: "mapped-types",
    title: "Mapped Types & Big Transformations",
    description:
      "Map, reshape, and generate new types from unions and object keys.",
    topics: [
      {
        id: "union-to-object",
        title: "Map over a union to create an object",
        summary: "Use mapped types to turn keys into properties.",
        tags: ["mapped-type", "union"],
        code: `type Keys = 'home' | 'settings'

type Routes = {
  [K in Keys]: \`/\${K}\`
}
// { home: '/home'; settings: '/settings' }`,
      },
      {
        id: "mapped-objects",
        title: "Mapped types with objects",
        summary: "Transform every property in an object type.",
        tags: ["mapped-type"],
        code: `type MakeReadonly<T> = { readonly [K in keyof T]: T[K] }

type User = { id: string; name: string }

type ReadonlyUser = MakeReadonly<User>`,
      },
      {
        id: "transform-keys",
        title: "Transform object keys in mapped types",
        summary: "Rename keys using `as` + template literals.",
        tags: ["mapped-type", "template-literal"],
        code: `type PrefixKeys<T, P extends string> = {
  [K in keyof T as \`\${P}\${string & K}\`]: T[K]
}

type API = PrefixKeys<{ users: '/users' }, 'GET '>
// { 'GET users': '/users' }`,
      },
      {
        id: "conditional-pick",
        title: "Conditionally extract properties",
        summary: "Pick keys based on a rule.",
        tags: ["mapped-type", "conditional-type"],
        code: `type PickByValue<T, V> = {
  [K in keyof T as T[K] extends V ? K : never]: T[K]
}

type Model = { id: string; count: number; active: boolean }

type OnlyNumbers = PickByValue<Model, number>
// { count: number }`,
      },
      {
        id: "du-to-object",
        title: "Map a discriminated union to an object",
        summary:
          "Turn union members into a lookup map keyed by the discriminator.",
        tags: ["mapped-type", "union", "indexed-access"],
        code: `type Event =
  | { type: 'click'; x: number; y: number }
  | { type: 'focus'; elementId: string }

type EventMap = {
  [E in Event as E['type']]: E
}

// EventMap['click'] -> { type: 'click'; x: number; y: number }`,
      },
      {
        id: "object-to-tuples",
        title: "Map an object to a union of tuples",
        summary: "Create an “Entries” union like [key, value] pairs.",
        tags: ["mapped-type", "indexed-access", "union"],
        code: `type Entries<T> = { [K in keyof T]: [K, T[K]] }[keyof T]

type User = { id: string; active: boolean }

type UserEntries = Entries<User>
// ['id', string] | ['active', boolean]`,
      },
      {
        id: "object-to-template-literals",
        title: "Transform an object into a union of template literals",
        summary:
          "Generate strings from keys/values for routes, events, analytics, etc.",
        tags: ["mapped-type", "template-literal", "indexed-access"],
        code: `type ToRoutes<T extends Record<string, string>> = {
  [K in keyof T]: \`\${string & K}:\${T[K]}\`
}[keyof T]

type RouteTable = { users: '/users'; posts: '/posts' }

type Routes = ToRoutes<RouteTable>
// 'users:/users' | 'posts:/posts'`,
      },
      {
        id: "object-to-du",
        title: "Transform an object into a discriminated union",
        summary:
          "Convert a config/map into a union of { type, payload } objects.",
        tags: ["mapped-type", "union", "indexed-access"],
        code: `type Actions = {
  add: { amount: number }
  reset: {}
}

type ActionUnion = {
  [K in keyof Actions]: { type: K; payload: Actions[K] }
}[keyof Actions]

// { type: 'add'; payload: { amount: number } } | { type: 'reset'; payload: {} }`,
      },
      {
        id: "path-params",
        title: "Transform path params (strings → objects)",
        summary: 'Parse "/users/:id" into { id: string }.',
        tags: ["template-literal", "conditional-type", "infer"],
        code: `type Params<S extends string> =
      S extends \`\${string}:\${infer P}/\${infer Rest}\`
        ? { [K in P | keyof Params<Rest>]: string }
        : S extends \`\${string}:\${infer P}\`
      ? { [K in P]: string }
      : {}

    type P = Params<'/users/:id/posts/:postId'>
    // { id: string; postId: string }`,
      },
      {
        id: "deep-partial",
        title: "DeepPartial<T>",
        summary: "Make nested properties optional recursively.",
        tags: ["mapped-type", "conditional-type"],
        code: `type DeepPartial<T> = T extends object
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : T

type Config = { ui: { theme: { accent: string } } }

type Patch = DeepPartial<Config>
// { ui?: { theme?: { accent?: string } } }`,
      },
    ],
  },
  {
    id: "generics",
    title: "Generics",
    description:
      "Core generic patterns: infer literal types, add constraints, and keep APIs flexible but safe.",
    topics: [
      {
        id: "generic-identity",
        title: "Return what I pass in (generic identity)",
        summary:
          "Replace unknown with a generic so TypeScript preserves the specific input type.",
        details:
          "Think of it like a type helper: you pass in a type and you get the same type back.",
        tags: ["generic"],
        io: {
          input: "returnWhatIPassIn(1) and returnWhatIPassIn('matt')",
          transform: "const returnWhatIPassIn = <T>(param: T) => param",
          output:
            "returnWhatIPassIn(1) -> 1; returnWhatIPassIn('matt') -> 'matt'",
        },
        code: `const returnWhatIPassIn = <T>(param: T) => {
  return param
}

const one = returnWhatIPassIn(1)
//    ^? 1

const matt = returnWhatIPassIn('matt')
//    ^? 'matt'`,
      },
      {
        id: "generic-constraints",
        title: "Constrain generics with extends",
        summary:
          "Constrain generic parameters while still preserving literal inference.",
        tags: ["generic"],
        io: {
          input: "Only allow strings, but keep literals",
          transform: "<T extends string>(t: T) => t",
          output:
            "returnWhatIPassIn('hi') -> 'hi'; returnWhatIPassIn(123) -> error",
        },
        code: `export const returnWhatIPassIn = <T extends string>(t: T) => t

const a = returnWhatIPassIn('hello')
//    ^? 'hello'

// returnWhatIPassIn(123) // error`,
      },
    ],
  },
  {
    id: "advanced-patterns",
    title: "Advanced TS Patterns",
    description:
      "Practical patterns seen in real codebases: branded (opaque) types and safety-by-construction.",
    topics: [
      {
        id: "branded-types",
        title: "Branded (Opaque) Types",
        summary:
          "Create nominal-like types in TypeScript so plain strings can't be used accidentally.",
        details:
          "A Brand intersects the base type with an impossible-to-produce marker using `unique symbol`.",
        tags: ["pattern", "generic"],
        io: {
          input: "string",
          transform: "Brand<string, 'Password'>",
          output: "Password (not assignable from plain string)",
        },
        code: `declare const brand: unique symbol

type Brand<T, TBrand> = T & { [brand]: TBrand }

type Password = Brand<string, 'Password'>

const password = '123123' as Password

let passwordSlot: Password

// passwordSlot = 'asdf' // error
passwordSlot = 'asdf' as Password`,
      },
      {
        id: "branded-validation",
        title: "Branding after validation",
        summary: "Return branded types only after runtime checks succeed.",
        tags: ["pattern"],
        io: {
          input: "{ email: string; password: string }",
          transform: "validate → return { email: Email; password: Password }",
          output: "createUserOnApi(validated) type-checks",
        },
        code: `type Email = Brand<string, 'Email'>
type Password = Brand<string, 'Password'>

function validateValues(values: { email: string; password: string }) {
  if (!values.email.includes('@')) throw new Error('Email invalid')
  if (values.password.length < 8) throw new Error('Password too short')

  return {
    email: values.email as Email,
    password: values.password as Password,
  }
}

function createUserOnApi(values: { email: Email; password: Password }) {
  return values
}

createUserOnApi(validateValues({ email: 'a@b.com', password: '12345678' }))`,
      },
    ],
  },
  {
    id: "react-advanced",
    title: "React + TypeScript",
    description:
      "Advanced props typing patterns: discriminated unions and safe destructuring.",
    topics: [
      {
        id: "du-props",
        title: "Discriminated union props",
        summary:
          "Model component prop variants so invalid prop combinations become type errors.",
        tags: ["react", "union"],
        io: {
          input:
            "variant: 'no-title' | 'title' with title?: string (too loose)",
          transform: "Split into union branches per variant",
          output: "'title' requires title; 'no-title' forbids title",
        },
        code: `type ModalProps =
  | { variant: 'no-title' }
  | { variant: 'title'; title: string }

export const Modal = (props: ModalProps) => {
  if (props.variant === 'no-title') {
    return <div>No title</div>
  }

  return <div>Title: {props.title}</div>
}

// <Modal variant="no-title" title="oops" /> // error
// <Modal variant="title" /> // error`,
      },
      {
        id: "du-destructure",
        title: "Destructuring discriminated unions (pitfall + fix)",
        summary:
          "Destructuring props can lose narrowing when a field isn't on every union member.",
        details:
          "Fix: destructure only the discriminator in the params, keep the rest in an object (or destructure after narrowing).",
        tags: ["react", "union", "pattern"],
        io: {
          input: "({ variant, title }: ModalProps) // title may not exist",
          transform: "({ variant, ...rest }: ModalProps)",
          output: "rest.title becomes available after narrowing",
        },
        code: `type ModalProps =
  | { variant: 'no-title' }
  | { variant: 'title'; title: string }

export const Modal = ({ variant, ...rest }: ModalProps) => {
  if (variant === 'no-title') {
    return <div>No title</div>
  }

  return <div>Title: {rest.title}</div>
}

// Alternative: keep props param and destructure inside the 'title' branch`,
      },
    ],
  },
];
