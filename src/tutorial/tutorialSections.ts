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
		| "function"
		| "overload"
		| "inference"
		| "react"
		| "pattern"
		| "context"
		| "hooks"
		| "forms"
		| "hoc"
		| "pipeline"
		| "mutability"
		| "ts-only"
		| "annotation"
		| "assertion"
		| "safety"
		| "fun-fact"
	>;
	code?: string;
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

export const tutorialSections: TutorialSection[] = [
	{
		id: "extracting-types",
		title: "Extracting Types",
		description: "Pull types out of existing runtime code so your types stay in sync with implementation.",
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
				details: "You can index into the tuple (e.g. `[0]`, `[1]`) to grab a specific parameter type.",
				tags: ["utility-type", "typeof", "indexed-access"],
				io: {
					input: "function makeQuery(url: string, opts?: { method?: string })",
					transform: "type Args = Parameters<typeof makeQuery>; type Second = Args[1]",
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
				summary: "Extract the resolved value type from a Promise-returning function.",
				details:
					"This pattern is common for async functions: first capture the return type, then unwrap it with `Awaited`.",
				tags: ["utility-type", "typeof"],
				io: {
					input: "async function getUser(): Promise<{ id: string; name: string }>",
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
					input: "const testingFrameworks = { vitest: ..., jest: ..., mocha: ... } as const",
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
				details: "Works great with `typeof` for extracting nested shapes. Use brackets (not dot notation) in types.",
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
			{
				id: "union-indexed-access",
				title: "Union as indexed access",
				summary: "Index an object/map with a union key to get a union of value types.",
				details:
					"A really common pattern: `type K = keyof typeof Map`, then `(typeof Map)[K]` is the union of all value shapes. You can also define your own union and index with it.",
				tags: ["typeof", "indexed-access", "union"],
				io: {
					input: "const TestingMap = { a: { ok: true }, b: { ok: false } } as const",
					transform: "type Key = keyof typeof TestingMap; type Value = (typeof TestingMap)[Key]",
					output: "Value = { ok: true } | { ok: false }",
				},
				code: `const TestingMap = {
  a: { ok: true, label: 'A' },
  b: { ok: false, label: 'B' },
} as const

type Key = keyof typeof TestingMap
//    ^? 'a' | 'b'

type Value = (typeof TestingMap)[Key]
//    ^? { ok: true; label: 'A' } | { ok: false; label: 'B' }

type UnionA = 'a' | 'b'
type Value2 = (typeof TestingMap)[UnionA]
//    ^? same as Value`,
			},
		],
	},
	{
		id: "unions",
		title: "Unions & Discriminators",
		description: "Model “one of many possibilities” and safely narrow to the correct member at runtime.",
		topics: [
			{
				id: "discriminated-union",
				title: "Discriminated Union vs Union",
				summary: "A discriminated union is a union with a shared “tag” field.",
				details: "The discriminator (often `type`) lets TypeScript narrow to the correct shape after a check.",
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
				details: 'Great for discriminated unions: extract the member with `type: "click"` (or any unique field).',
				tags: ["utility-type", "union"],
				io: {
					input: "type Event = { type: 'click'; ... } | { type: 'focus'; ... } | { type: 'keydown'; ... }",
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
				summary: "TypeScript checks all code paths across all union possibilities.",
				details: "If a value could be multiple things, your code must be safe for all of them until you narrow it.",
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
			{
				id: "type-guard-predicate",
				title: "Type guards (type predicates)",
				summary: "Teach TypeScript how to narrow using `value is Type` return types.",
				details: "Most common use: array filtering, parsing, and runtime checks on `unknown` values.",
				tags: ["union", "pattern"],
				io: {
					input: "const raw: Array<string | null | undefined>",
					transform: "raw.filter(isDefined)",
					output: "string[]",
				},
				code: `function isDefined<T>(value: T): value is NonNullable<T> {
  return value !== null && value !== undefined
}

const raw = ['a', null, 'b', undefined]

const filtered = raw.filter(isDefined)
//    ^? string[]`,
			},
			{
				id: "assertion-functions",
				title: "Assertion functions",
				summary: "Narrow by throwing at runtime: `asserts value is Type`.",
				details:
					"Perfect for boundary validation: if input is wrong, fail fast — and downstream code becomes strongly typed.",
				tags: ["pattern"],
				io: {
					input: "value?: string",
					transform: "assertDefined(value)",
					output: "value: string",
				},
				code: `function assertDefined<T>(value: T): asserts value is NonNullable<T> {
  if (value === null || value === undefined) {
    throw new Error('Value is missing')
  }
}

function getLength(value?: string) {
  assertDefined(value)
  return value.length
}`,
			},
			{
				id: "discriminated-tuples",
				title: "Discriminated tuples",
				summary: "Model events/actions as `[tag, payload]` tuples for compact APIs.",
				details: "Tuples can be discriminated the same way as objects: narrow on the first element.",
				tags: ["union", "pattern"],
				io: {
					input: "type Action = ['add', number] | ['remove', string]",
					transform: "if (action[0] === 'add') ...",
					output: "payload narrows to number (or string)",
				},
				code: `type Action =
  | ['add', number]
  | ['remove', string]

function reducer(action: Action) {
  const [type, payload] = action

  if (type === 'add') {
    payload
    // ^? number
  } else {
    payload
    // ^? string
  }
}`,
			},
			{
				id: "exhaustive-switch",
				title: "Exhaustive checks with never",
				summary: "Make missing union branches a compile-time error.",
				details: "When you add a new union member later, this pattern forces you to update the switch/if chain.",
				tags: ["union", "pattern"],
				io: {
					input: "type Shape = Circle | Square",
					transform: "default: assertNever(x)",
					output: "New union member => error until handled",
				},
				code: `type Shape =
  | { kind: 'circle'; r: number }
  | { kind: 'square'; size: number }

function assertNever(x: never): never {
  throw new Error('Unexpected object: ' + JSON.stringify(x))
}

function area(s: Shape) {
  switch (s.kind) {
    case 'circle':
      return Math.PI * s.r ** 2
    case 'square':
      return s.size ** 2
    default:
      return assertNever(s)
  }
}`,
			},
		],
	},
	{
		id: "literals",
		title: "Literal Types & “as const”",
		description: "Lock values down to their literal types so you can derive precise unions and mappings.",
		topics: [
			{
				id: "enum-vs-as-const",
				title: "enum vs as const",
				summary: "Prefer `as const` objects when you want unions + tree-shakable runtime values.",
				details:
					"`enum` emits runtime code and has a few quirks (especially numeric enums). An `as const` object gives you a real runtime map, plus easy unions via `keyof typeof` or values indexing.",
				tags: ["typeof", "keyof", "union", "pattern"],
				code: `// ✅ Enum (runtime), but less flexible for deriving types
enum ProgramModeEnum {
  GROUP = 'group',
  ANNOUNCEMENT = 'announcement',
  ONE_ON_ONE = '1on1',
}

type EnumValue = ProgramModeEnum
//    ^? ProgramModeEnum (not a plain union of string literals)

// ✅ as const object: easy unions + runtime map
export const ProgramMode = {
  GROUP: 'group',
  ANNOUNCEMENT: 'announcement',
  ONE_ON_ONE: '1on1',
} as const

type ProgramModeKey = keyof typeof ProgramMode
//    ^? 'GROUP' | 'ANNOUNCEMENT' | 'ONE_ON_ONE'

type ProgramModeValue = (typeof ProgramMode)[ProgramModeKey]
//    ^? 'group' | 'announcement' | '1on1'`,
			},
			{
				id: "as-const",
				title: "as const",
				summary: "Freeze inference to literals + readonly.",
				details: "Useful for enums-as-objects, maps, config, and deriving unions from values.",
				tags: ["typeof"],
				code: `export const programModeEnumMap = {
  GROUP: 'group',
  ANNOUNCEMENT: 'announcement',
  ONE_ON_ONE: '1on1',
} as const

// values are literals, keys are readonly`,
			},
			{
				id: "satisfies-vs-as-const",
				title: "satisfies vs as const",
				summary:
					"`satisfies` validates a shape without changing inference; `as const` freezes inference to literals/readonly.",
				details:
					"Use `satisfies` for config objects when you want strict checking but still want precise inferred literals.",
				tags: ["typeof", "pattern"],
				io: {
					input: "const routes = { ... }",
					transform: "... satisfies Record<string, RouteConfig>",
					output: "Shape-checked + keep literal paths",
				},
				code: `type RouteConfig = { path: string; auth: boolean }

// ✅ checked, while keeping precise inference
const routes = {
  home: { path: '/', auth: false },
  admin: { path: '/admin', auth: true },
} satisfies Record<string, RouteConfig>

type RouteKey = keyof typeof routes
//    ^? 'home' | 'admin'

routes.home.path
//    ^? '/' (still a literal)

// ✅ freeze literal arrays
const roles = ['admin', 'editor'] as const
type Role = (typeof roles)[number]`,
			},
			{
				id: "union-from-values",
				title: "Union from object values",
				summary: "Create a union of an object’s values.",
				details: "Combine `typeof` + indexed access with `keyof` to get a values union.",
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
			{
				id: "union-from-array-fruits",
				title: "Create union out of array",
				summary: "The most common pattern: `const arr = [...] as const` then `typeof arr[number]`.",
				details:
					"Without `as const`, arrays widen to `string[]` (or `number[]`), and you lose literal unions. With `as const`, TypeScript treats it as a readonly tuple of literals.",
				tags: ["typeof", "indexed-access", "union"],
				io: {
					input: "const fruits = ['apple', 'banana', 'orange'] as const",
					transform: "type Fruit = typeof fruits[number]",
					output: "Fruit = 'apple' | 'banana' | 'orange'",
				},
				code: `const fruits = ['apple', 'banana', 'orange'] as const

type Fruit = typeof fruits[number]
//    ^? 'apple' | 'banana' | 'orange'

function eat(fruit: Fruit) {
  return fruit
}

eat('apple')
// eat('durian') // error`,
			},
		],
	},
	{
		id: "template-literals",
		title: "Template Literal Types",
		description: 'Build and filter string unions using patterns like `"get:${string}"`.',
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
		description: "Write your own reusable type-level “functions” with constraints and defaults.",
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
				id: "extends-with-default",
				title: "extends with a default value",
				summary: "Combine constraints + defaults: `T extends X = Default`.",
				details:
					"If you want the default to be `undefined`, the constraint must allow it (e.g. `Error | undefined`). This is handy for optional error types and other opt-in generic parameters.",
				tags: ["generic", "pattern"],
				io: {
					input: "type Result<TData, TError extends Error | undefined = undefined>",
					transform: "Provide TError explicitly only when you need it",
					output: "Result<number> has error: undefined; Result<number, TypeError> has error: TypeError",
				},
				code: `type Result<TData, TError extends Error | undefined = undefined> = {
  data: TData
  error: TError
}

type Ok = Result<number>
//    ^? { data: number; error: undefined }

type Bad = Result<number, TypeError>
//    ^? { data: number; error: TypeError }`,
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
			{
				id: "function-overloads",
				title: "Function overloads",
				summary: "Expose multiple call signatures while sharing one implementation.",
				details:
					"Overloads are best when your API truly behaves differently per input. The implementation signature must cover all overloads.",
				tags: ["pattern"],
				io: {
					input: "parse('hello') or parse(123)",
					transform: "Declare overload signatures + implement once",
					output: "Return type narrows based on the input",
				},
				code: `type Parsed =
  | { kind: 'string'; value: string }
  | { kind: 'number'; value: number }

function parse(input: string): Extract<Parsed, { kind: 'string' }>
function parse(input: number): Extract<Parsed, { kind: 'number' }>
function parse(input: string | number): Parsed {
  if (typeof input === 'string') return { kind: 'string', value: input }
  return { kind: 'number', value: input }
}

const a = parse('hello')
//    ^? { kind: 'string'; value: string }

const b = parse(123)
//    ^? { kind: 'number'; value: number }`,
			},
			{
				id: "overload-vs-union",
				title: "Overloads vs unions",
				summary: "Unions describe one signature; overloads can produce different return types per input.",
				details:
					"If your function always returns the same shape regardless of input, a union parameter is often enough. Reach for overloads when you want the call-site to get a more specific return type based on the input.",
				tags: ["function", "overload", "union", "inference"],
				code: `// Union version: one signature
function parse2(input: string | number) {
  return typeof input === 'string'
    ? ({ kind: 'string', value: input } as const)
    : ({ kind: 'number', value: input } as const)
}

const x = parse2('hello')
// x.kind is 'string' | 'number' (often less specific)

// Overload version (previous topic) narrows at the call-site`,
			},
			{
				id: "overload-vs-conditional-types",
				title: "Overloads vs conditional types",
				summary:
					"Conditional types model input→output mapping at the type level; overloads model it at the value level.",
				details:
					"If you’re building a pure type helper, conditional types are the right tool. If you’re building a real runtime function and want ergonomic inference at the call-site, overloads are often simpler and easier to read.",
				tags: ["overload", "conditional-type", "function", "inference"],
				code: `type ParseType<I> = I extends string
  ? Extract<Parsed, { kind: 'string' }>
  : I extends number
    ? Extract<Parsed, { kind: 'number' }>
    : never

// Great for types-only helpers.
// For real runtime functions, overloads usually read better.`,
			},
			{
				id: "variadic-tuples",
				title: "Variadic tuple types",
				summary: "Use tuple spreads and `infer` to model flexible arguments.",
				details:
					"This is the backbone of strongly typed `pipe`, `compose`, and many helper APIs that forward arguments.",
				tags: ["generic", "pattern", "infer"],
				io: {
					input: "type T = [1, 2, 3]",
					transform: "type Tail<T> = T extends [any, ...infer R] ? R : never",
					output: "Tail<[1,2,3]> = [2,3]",
				},
				code: `type Tail<T extends readonly unknown[]> =
  T extends readonly [unknown, ...infer Rest] ? Rest : never

type A = Tail<[1, 2, 3]>
//    ^? [2, 3]

type B = Tail<['a']>
//    ^? []`,
			},
			{
				id: "generics-in-overloads",
				title: "Generics in overloads",
				summary: "Use generics inside overload signatures to preserve literals or carry type arguments through.",
				details:
					"This is common for helpers like `pick`, `get`, and many React hooks: overloads give nice call-site inference, and generics keep output tied to input.",
				tags: ["overload", "generic", "function", "inference"],
				code: `function first<T>(arr: readonly [T, ...T[]]): T {
  return arr[0]
}

const v = first(['a', 'b', 'c'] as const)
//    ^? 'a'`,
			},
			{
				id: "type-assertion-as",
				title: "Type assertions (`as`)",
				summary: "Tell TypeScript “trust me” — useful, but easy to abuse.",
				details:
					"Prefer runtime checks when safety matters. Use `as` when you've already proven something TS can't see.",
				tags: ["pattern"],
				io: {
					input: "const el = document.querySelector('#email')",
					transform: "narrow with instanceof (preferred) or assert with `as`",
					output: "HTMLInputElement access becomes safe",
				},
				code: `const el = document.querySelector('#email')

// Unsafe if el can be null:
const input1 = el as HTMLInputElement
input1.value

// Safer: narrow first
if (el instanceof HTMLInputElement) {
  el.value
}`,
			},
		],
	},
	{
		id: "conditional-infer",
		title: "Conditional Types & infer",
		description: "Add “if/else” logic to types and infer pieces out of complex shapes.",
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
		description: "Map, reshape, and generate new types from unions and object keys.",
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
				id: "attribute-getters",
				title: "Remapping object keys into getters",
				summary: "Use key remapping + `Capitalize` to generate getter names like getName/getAge.",
				tags: ["mapped-type", "template-literal", "keyof"],
				code: `type Attributes = {
  name: string
  age: number
}

type AttributeGetters = {
  [K in keyof Attributes as \`get\${Capitalize<string & K>}\`]: () => Attributes[K]
}

// Hover AttributeGetters:
// {
//   getName: () => string
//   getAge: () => number
// }`,
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
				summary: "Turn union members into a lookup map keyed by the discriminator.",
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

type Values = { id: string; active: boolean }

type ValuesAsUnionOfTuples = {
  [K in keyof Values]: [K, Values[K]]
}[keyof Values]

// ValuesAsUnionOfTuples =
// ['id', string] | ['active', boolean]`,
			},
			{
				id: "object-to-template-literals",
				title: "Transform an object into a union of template literals",
				summary: "Generate strings from keys/values for routes, events, analytics, etc.",
				tags: ["mapped-type", "template-literal", "indexed-access"],
				code: `type FruitMap = {
  apple: 'red'
  banana: 'yellow'
  orange: 'orange'
}

type TransformedFruit = {
  [K in keyof FruitMap]: \`\${string & K}:\${FruitMap[K]}\`
}[keyof FruitMap]

// 'apple:red' | 'banana:yellow' | 'orange:orange'`,
			},
			{
				id: "routes-object",
				title: "Create an object from a route union",
				summary: "Map a union into an object using key remapping, then conditionally pick fields.",
				tags: ["mapped-type", "union", "conditional-type", "indexed-access", "infer"],
				code: `type Route =
  | {
      route: '/'
      search: {
        page: string
        perPage: string
      }
    }
  | {
      route: '/about'
    }

type RoutesObject = {
  [R in Route as R['route']]: R extends { search: infer S } ? S : undefined
}

// Hover RoutesObject:
// {
//   '/': { page: string; perPage: string }
//   '/about': undefined
// }`,
			},
			{
				id: "object-to-du",
				title: "Transform an object into a discriminated union",
				summary: "Convert a config/map into a union of { type, payload } objects.",
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
		description: "Core generic patterns: infer literal types, add constraints, and keep APIs flexible but safe.",
		topics: [
			{
				id: "generic-identity",
				title: "Return what I pass in (generic identity)",
				summary: "Replace unknown with a generic so TypeScript preserves the specific input type.",
				details: "Think of it like a type helper: you pass in a type and you get the same type back.",
				tags: ["generic"],
				io: {
					input: "returnWhatIPassIn(1) and returnWhatIPassIn('matt')",
					transform: "const returnWhatIPassIn = <T>(param: T) => param",
					output: "returnWhatIPassIn(1) -> 1; returnWhatIPassIn('matt') -> 'matt'",
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
				summary: "Constrain generic parameters while still preserving literal inference.",
				tags: ["generic"],
				io: {
					input: "Only allow strings, but keep literals",
					transform: "<T extends string>(t: T) => t",
					output: "returnWhatIPassIn('hi') -> 'hi'; returnWhatIPassIn(123) -> error",
				},
				code: `export const returnWhatIPassIn = <T extends string>(t: T) => t

const a = returnWhatIPassIn('hello')
//    ^? 'hello'

// returnWhatIPassIn(123) // error`,
			},
			{
				id: "identity-fn-vs-as-const",
				title: "Identity helper vs as const",
				summary: "An identity helper can preserve inference with less asserting, great for config builders.",
				details:
					"as const is excellent, but it is still an assertion. A typed identity helper (often paired with satisfies) can keep literal inference while still checking the object shape you intended.",
				tags: ["generic", "inference", "pattern"],
			},
			{
				id: "partial-autocomplete-quirk",
				title: "Autocomplete quirk: union with string",
				summary:
					"If you do `Size | string`, TypeScript often collapses the union to just `string`, killing autocomplete.",
				details:
					"A common workaround is to wrap `string` in parentheses and intersect it with an empty object: `Size | (string & {})`. This seems to delay widening just enough for the editor to still suggest `'xs' | 'sm' | ...` while permitting any other string. It’s a bit magical, but it works.",
				tags: ["generic", "pattern", "fun-fact"],
				code: `type Size = 'xs' | 'sm'

type Loose1 = Size | string
//    ^? string (often loses your literal union)

type Loose2 = Size | (string & {})
//    ^? 'xs' | 'sm' | (string & {})`,
			},
			{
				id: "localstorage-type-args",
				title: "Typing localStorage with generics",
				summary:
					"If you want `useLocalStorage<{name: string}>()`, your function must accept a type argument and thread it through get/set.",
				details:
					"Important details: (1) add `<T>` to the function so the call-site can pass a type argument, (2) make `set` accept `T` and `get` return `T | null` (because JSON parse can return null), and (3) if callers don’t provide the type arg, `T` will often be inferred as `unknown` — so document that this API expects explicit type arguments.",
				tags: ["generic", "safety", "pattern"],
				code: `export const useLocalStorage = <T>(prefix: string) => {
  return {
    get: (key: string): T | null => {
      return JSON.parse(window.localStorage.getItem(prefix + key) || 'null')
    },
    set: (key: string, value: T) => {
      window.localStorage.setItem(prefix + key, JSON.stringify(value))
    },
  }
}

const userStorage = useLocalStorage<{ name: string }>('user')
const matt = userStorage.get('matt')
//    ^? { name: string } | null`,
			},
		],
	},
	{
		id: "advanced-patterns",
		title: "Advanced TS Patterns",
		description: "Practical patterns seen in real codebases: branded (opaque) types and safety-by-construction.",
		topics: [
			{
				id: "branded-types",
				title: "Branded (Opaque) Types",
				summary: "Create nominal-like types in TypeScript so plain strings can't be used accidentally.",
				details: "A Brand intersects the base type with an impossible-to-produce marker using `unique symbol`.",
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
			{
				id: "module-augmentation",
				title: "Module augmentation (extend a library’s types)",
				summary: "Add/override types for an existing module without forking it.",
				details: "This is commonly used to extend third-party libraries (e.g. adding fields to a session/user type).",
				tags: ["pattern"],
				io: {
					input: "A library exports an interface",
					transform: "declare module 'lib' { interface X { ... } }",
					output: "Your project sees the extended interface",
				},
				code: `// imagine this comes from 'my-lib'
export type Session = { userId: string }

// in your app (e.g. src/types/my-lib.d.ts)
declare module 'my-lib' {
  export type Session = { userId: string; role: 'admin' | 'user' }
}

// Now Session includes role in your project`,
			},
			{
				id: "declare-global",
				title: "declare global (augment the global scope)",
				summary: "Safely add types to `globalThis` / `Window` / global namespaces.",
				tags: ["pattern"],
				code: `export {}

declare global {
  interface Window {
    __APP_VERSION__: string
  }
}

window.__APP_VERSION__`,
			},
		],
	},
	{
		id: "react-advanced",
		title: "React + TypeScript",
		description:
			"Advanced React typing patterns: discriminated unions, generics in props/hooks/context, and avoiding common React namespace pitfalls.",
		topics: [
			{
				id: "du-props",
				title: "Discriminated union props",
				summary: "Model component prop variants so invalid prop combinations become type errors.",
				tags: ["react", "union"],
				io: {
					input: "variant: 'no-title' | 'title' with title?: string (too loose)",
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
				id: "generics-vs-discriminated-unions",
				title: "Generics vs discriminated unions",
				summary:
					"If you’re modeling a finite set of UI variants, discriminated unions are often cleaner than a generic TVariant.",
				details:
					"A tempting approach is `ModalProps<TVariant>` and then trying to conditionally include props based on TVariant. If the variants are finite (e.g. `with-button` vs `without-button`), a discriminated union usually gives clearer types, better autocomplete, and simpler component code.",
				tags: ["react", "union", "pattern", "generic"],
				code: `type ModalProps =
  { isOpen: boolean } &
    (
      | { variant: 'with-button'; buttonLabel: string; onButtonClick: () => void }
      | { variant: 'without-button' }
    )`,
			},
			{
				id: "du-destructure",
				title: "Destructuring discriminated unions (pitfall + fix)",
				summary: "Destructuring props can lose narrowing when a field isn't on every union member.",
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
			{
				id: "currying-hooks",
				title: "Currying (and “curried hook” factories)",
				summary: "Split parameters across calls to improve inference and reuse.",
				details:
					"In React, currying is often used to create a specialized hook (e.g. pre-binding a key) while keeping strong return types.",
				tags: ["react", "generic", "pattern"],
				io: {
					input: "createUseStoreKey('theme')",
					transform: "returns a hook specialized for that key",
					output: "useTheme(): 'dark' | 'light'",
				},
				code: `// “Curried hook” factory pattern (types-only example)
type Store = { theme: 'dark' | 'light'; locale: 'en' | 'ms' }

function createUseStoreKey<K extends keyof Store>(key: K) {
  return function useStoreKey(): Store[K] {
    // imagine reading from context/store here
    throw new Error('not implemented')
  }
}

const useTheme = createUseStoreKey('theme')
// useTheme(): 'dark' | 'light'`,
			},
			{
				id: "du-optional-props-undefined-branch",
				title: "Optional props via an explicit union branch",
				summary:
					"Instead of making a prop optional everywhere, make it required in one branch and forbidden in another.",
				details:
					"This keeps the API honest. A helpful trick is to use `title?: undefined` (or `title?: never`) in the branch where the prop must not exist.",
				tags: ["react", "union", "pattern", "safety"],
				code: `type ModalProps =
  | { variant: 'no-title'; title?: undefined }
  | { variant: 'title'; title: string }

function Modal(props: ModalProps) {
  if (props.variant === 'no-title') return null
  props.title
}`,
			},
			{
				id: "reactnode-reactelement-reactfc",
				title: "ReactNode vs ReactElement vs React.FC",
				summary:
					"ReactNode is anything renderable; ReactElement is a specific element; React.FC adds implicit children and has tradeoffs.",
				details:
					"For most components, prefer typing props and returning `JSX.Element` (or `React.ReactElement`) rather than using `React.FC`. Use `React.ReactNode` for children because it matches what React can render (strings, numbers, fragments, arrays, null, etc.).",
				tags: ["react", "ts-only", "fun-fact"],
			},
			{
				id: "generic-props-and-type-args",
				title: "Generic props + inference in components",
				summary: "Make components reusable by parameterizing props, and rely on inference when possible.",
				details:
					"You can define `Props<T>` and use it in a generic component. Usually, TypeScript infers `T` from props, so you rarely need to manually pass type arguments.",
				tags: ["react", "generic", "inference"],
				code: `type ListProps<T> = { items: T[]; render: (item: T) => React.ReactNode }

function List<T>(props: ListProps<T>) {
  return <div>{props.items.map(props.render)}</div>
}

// <List items={[1,2,3]} render={(n) => n} /> // T inferred as number`,
			},
			{
				id: "tsx-angle-bracket-type-args",
				title: "Passing a type argument to a component (TSX angle brackets)",
				summary: "Just like functions, generic components can accept manual type arguments: `<Table<User> ... />`.",
				details:
					"For test/demo purposes, you can also call the component like a function: `Table<User>({...})`. In real apps you’ll usually rely on inference, but it’s useful to know you can override it. When defining a generic component as a const arrow function in TSX, the `<T,>` syntax helps avoid parsing ambiguity.",
				tags: ["react", "generic", "inference"],
				code: `type TableProps<T> = {
  rows: T[]
  renderRow: (row: T) => React.ReactNode
}

// Generic component definition
const Table = <T,>(props: TableProps<T>) => {
  return <div>{props.rows.map(props.renderRow)}</div>
}

type User = { id: number }

// Manual type argument in TSX
const el = (
  <Table<User>
    // @ts-expect-error rows should be User[]
    rows={[{ id: '123' }]}
    renderRow={() => null}
  />
)

// (demo only) Calling it like a function also works
Table<User>({ rows: [{ id: 123 }], renderRow: () => null })`,
			},
			{
				id: "typed-context-with-generics",
				title: "Strongly typed context (with a factory)",
				summary: "Create a context factory so each context instance carries its own type.",
				details:
					"This avoids `any` contexts. The factory closes over `T`, and a runtime null check makes the hook safe to use.",
				tags: ["react", "context", "generic", "safety"],
				code: `function createStrictContext<T>() {
  const Ctx = React.createContext<T | null>(null)

  function useCtx() {
    const value = React.useContext(Ctx)
    if (!value) throw new Error('Missing provider')
    return value
  }

  return [Ctx.Provider, useCtx] as const
}`,
			},
			{
				id: "hooks-type-args-query-mutation",
				title: "Type args in custom query/mutation hooks",
				summary: "Expose generics so call-sites can specify result/error/input types when inference isn’t enough.",
				details:
					"A good hook API usually lets you omit generics most of the time (inference), but still allows explicit type args for tricky wrapper hooks.",
				tags: ["react", "hooks", "generic", "inference"],
			},
			{
				id: "mutation-hook-best-inference-refactor",
				title: "Refactoring a mutation hook for best inference",
				summary:
					"Don’t capture an entire function type as a generic if you later need to re-create it — capture args + return separately.",
				details:
					"Capturing `TMutation extends (...args) => Promise<any>` seems appealing, but you often hit assignability issues when you try to return a newly created function typed as `TMutation`. A robust approach is: infer/carry `TArgs extends any[]` and `TReturn`, then define `mutate: (...args: TArgs) => Promise<TReturn>`.",
				tags: ["react", "hooks", "generic", "pattern", "inference"],
				code: `type Mutation<TArgs extends any[], TReturn> = (...args: TArgs) => Promise<TReturn>

interface UseMutationOptions<TArgs extends any[], TReturn> {
  mutation: Mutation<TArgs, TReturn>
}

interface UseMutationReturn<TArgs extends any[], TReturn> {
  mutate: Mutation<TArgs, TReturn>
  isLoading: boolean
}

export const useMutation = <TArgs extends any[], TReturn>(
  opts: UseMutationOptions<TArgs, TReturn>,
): UseMutationReturn<TArgs, TReturn> => {
  return {
    isLoading: false,
    mutate: async (...args) => {
      return opts.mutation(...args)
    },
  }
}`,
			},
			{
				id: "render-props-children-typing",
				title: "Typing children for render props",
				summary: "If `children` is a function, type it as a function returning ReactNode.",
				details: "This keeps render props flexible: callers can return strings, fragments, arrays, or elements.",
				tags: ["react", "pattern"],
				code: `type RenderProps<T> = {
  value: T
  children: (value: T) => React.ReactNode
}

function WithValue<T>({ value, children }: RenderProps<T>) {
  return <>{children(value)}</>
}`,
			},
			{
				id: "generic-hoc",
				title: "Generic higher-order components (HOCs)",
				summary:
					"Preserve wrapped component props by expressing the wrapper as `<P>(Component: ComponentType<P>) => ComponentType<P>`.",
				details:
					"The main goal is: don’t lose props inference. Many HOC bugs come from using `any` or failing to forward generics correctly.",
				tags: ["react", "hoc", "generic", "pattern"],
				code: `function withLogger<P>(Component: React.ComponentType<P>) {
  return function Logged(props: P) {
    console.log('render')
    return <Component {...props} />
  }
}`,
			},
			{
				id: "withrouter-generic-hoc",
				title: "A practical generic HOC: withRouter",
				summary:
					"To inject a prop (router) and remove it from the public API, use generics + Omit — plus an assertion to satisfy assignability.",
				details:
					"Pattern: capture full props as `TProps`, return a component that takes `Omit<TProps, 'router'>`, inject `router`, and forward. TypeScript may complain that `Omit<TProps, 'router'> & { router: ... }` isn’t assignable to `TProps` because `TProps` could be instantiated arbitrarily; the pragmatic fix is `props as TProps` right at the injection boundary.",
				tags: ["react", "hoc", "generic", "pattern", "safety"],
				code: `type Router = { push: (path: string) => void }
declare function useRouter(): Router

export const withRouter = <TProps extends { router: Router }>(
  Component: (props: TProps) => React.ReactNode,
) => {
  const NewComponent = (props: Omit<TProps, 'router'>) => {
    const router = useRouter()
    return <>{Component({ ...(props as TProps), router })}</>
  }

	NewComponent.displayName =
		'withRouter(' + (Component.name ?? 'Component') + ')'
  return NewComponent
}`,
			},
			{
				id: "react-namespace",
				title: "Understanding the React namespace",
				summary:
					"The React namespace contains runtime APIs and types: React.ComponentType, ReactNode, ReactElement, etc.",
				details:
					"In modern TS + JSX runtime, you may not need `import React from 'react'` for JSX, but you can still import types from React. Prefer `import type` for types to keep output clean.",
				tags: ["react", "ts-only", "pipeline"],
			},
			{
				id: "react-hook-form-types",
				title: "Understanding useForm type declarations (React Hook Form)",
				summary: "useForm is generic over your form values, so the shape of fields and errors stays consistent.",
				details:
					"Even if you don’t use React Hook Form, the pattern is useful: `useSomething<TValues>()` lets libraries connect string field names to a concrete object type via `keyof` and conditional types.",
				tags: ["react", "forms", "generic"],
			},
		],
	},
	{
		id: "extras-fun-facts",
		title: "Extras & Fun Facts",
		description:
			"Extra TypeScript ideas (and common footguns) that help you reason about safety, runtime behavior, and the build pipeline.",
		topics: [
			{
				id: "ts-pipeline-typecheck-vs-transpile",
				title: "Type-checking vs transpiling",
				summary:
					"TypeScript has two big jobs: verify types (type-check) and output JS (transpile/emit) — tools may split these roles.",
				details:
					"In many modern setups, a fast transpiler (like esbuild via Vite) turns TS/TSX into JavaScript, while `tsc` is run separately to type-check. This is why a project can “build” JavaScript even if type errors exist — unless you wire `tsc` into CI/build to fail on errors.",
				tags: ["pipeline", "safety", "fun-fact"],
			},
			{
				id: "ts-types-are-erased",
				title: "Types are erased at runtime",
				summary: "Most TypeScript types disappear after compilation, so you can’t rely on them for runtime checks.",
				details:
					"Interfaces, type aliases, generics, and access modifiers are compile-time only. If you need runtime validation, you must validate values at runtime (e.g., schema validation) — TypeScript can’t stop untrusted JSON from being the wrong shape.",
				tags: ["ts-only", "safety", "fun-fact"],
			},
			{
				id: "annotation-vs-assertion-vs-satisfies",
				title: "Annotation vs assertion vs `satisfies`",
				summary: "Three ways to “connect” a value to a type, with very different safety tradeoffs.",
				details:
					"A type annotation (`const x: T = ...`) makes TypeScript check the value matches `T`. A type assertion (`... as T`) tells TypeScript to trust you (it can bypass errors). `satisfies T` checks the value conforms to `T` but keeps a more specific inferred type, which is great for config objects and `as const` maps.",
				tags: ["annotation", "assertion", "safety"],
			},
			{
				id: "unknown-double-assertion",
				title: "The “escape hatch”: `as unknown as X`",
				summary:
					"A double assertion can force almost any value to almost any type — useful in rare interop cases, risky in app code.",
				details:
					"`unknown` is a top type that blocks property access until you narrow. Casting to `unknown` and then to `X` sidesteps compatibility checks and can hide real bugs. Prefer proper narrowing (type guards), parsing/validation, or reshaping the data instead.",
				tags: ["assertion", "safety", "fun-fact"],
			},
			{
				id: "readonly-is-compile-time",
				title: "`readonly` is compile-time only",
				summary: "Readonly types prevent mutation in your code, but they don’t freeze objects at runtime.",
				details:
					"`readonly` (and `Readonly<T>`) protects you from accidental writes, but it doesn’t make the JavaScript value immutable. If other code holds the same object reference, it can still mutate it. If you need runtime immutability, you must use runtime mechanisms like `Object.freeze` (with tradeoffs).",
				tags: ["mutability", "safety"],
			},
			{
				id: "as-const-and-literal-inference",
				title: "`as const`: literal inference + deep readonly",
				summary:
					"`as const` keeps values narrow (literals) and makes object/array properties readonly — extremely useful for creating unions.",
				details:
					"Without `as const`, TypeScript often widens values (`'dark'` becomes `string`, `true` becomes `boolean`). With `as const`, you can build a runtime map and derive precise types like `keyof typeof map` or `(typeof map)[K]` without repeating yourself.",
				tags: ["mutability", "typeof", "keyof"],
			},
			{
				id: "structural-typing",
				title: "Structural typing (not nominal)",
				summary:
					"In TypeScript, “if it looks like a duck, it’s a duck”: compatibility is based on shape, not declared name.",
				details:
					"Two different types with the same properties are usually assignable to each other. If you need nominal-ish behavior (e.g., `UserId` not assignable to `OrderId`), a common pattern is branding (intersection with a unique symbol) so the shapes differ even if both are strings.",
				tags: ["fun-fact", "pattern", "safety"],
			},
			{
				id: "enum-vs-as-const-map",
				title: "`enum` vs `as const` object map",
				summary: "Enums create runtime objects; `as const` maps are plain JS objects with types derived from them.",
				details:
					"`enum` can be convenient but it emits JavaScript (and has some surprising runtime behaviors, especially with numeric enums). An `as const` object map is explicit runtime data, tree-shake friendly, and works great with `keyof typeof` to derive unions. For many apps, `as const` maps are a simpler alternative.",
				tags: ["ts-only", "fun-fact", "safety"],
			},
			{
				id: "const-enum-note",
				title: "`const enum` is compile-time only (with caveats)",
				summary:
					"`const enum` can inline values and avoid runtime emit, but can cause tooling/interoperability issues.",
				details:
					"Because `const enum` values are inlined, consumers don’t have a runtime enum object. This can be great for performance but can also make builds trickier across package boundaries. Many projects avoid `const enum` unless they control the full compilation pipeline.",
				tags: ["ts-only", "pipeline", "fun-fact"],
			},
			{
				id: "type-imports-and-tree-shaking",
				title: "`import type` helps separate runtime from types",
				summary: "Type-only imports keep the JS output clean and can prevent accidental side effects.",
				details:
					"Using `import type` makes it clear an import is erased at runtime. This helps avoid pulling in runtime code when you only needed types (useful for bundling, tree-shaking, and avoiding unintended module side effects).",
				tags: ["ts-only", "pipeline", "safety"],
			},
			{
				id: "empty-object-type",
				title: "The empty object type (`{}`) is not “an empty object”",
				summary:
					"`{}` means “any non-nullish value” (almost), not “an object with no keys” — it can accept numbers, strings, functions, etc.",
				details:
					"This is one of TypeScript’s weird-but-important corners. If you mean “an object with no known properties”, prefer `Record<string, never>` (strict) or `{ [k: string]: never }`. If you mean “some object” (not primitives), use `object`. If you mean “anything”, use `unknown` (safest) or `any` (least safe).",
				tags: ["fun-fact", "safety", "ts-only"],
			},
			{
				id: "type-world-vs-value-world",
				title: "Type world vs value world",
				summary:
					"TypeScript runs in two “worlds”: values exist at runtime; types exist only at compile time — confusing bugs happen when you mix them up.",
				details:
					"You can’t `console.log` a type, and you can’t use a runtime value where a type is expected without bridging via tools like `typeof` (value → type) or `as const` (keep literals). Many errors become clearer when you ask: “Am I writing JavaScript (values) or TypeScript (types) right now?”.",
				tags: ["ts-only", "fun-fact"],
			},
			{
				id: "recommended-tsconfig-defaults",
				title: "Recommended default TypeScript config (pragmatic)",
				summary:
					"A strong baseline is: keep strictness on, avoid emitting from `tsc` if a bundler emits, and tighten checks gradually as the codebase matures.",
				details:
					"Common “good defaults” include enabling `strict`, `noUncheckedIndexedAccess` (when you’re ready), `exactOptionalPropertyTypes` (when you can adopt it), and keeping `skipLibCheck` on for speed in many apps. In Vite-style pipelines, it’s normal to set `noEmit: true` and run `tsc` purely for type-checking, while Vite/esbuild handles transpilation and bundling.",
				tags: ["pipeline", "safety", "fun-fact"],
			},
			{
				id: "interface-vs-type",
				title: "`interface` vs `type` (when to use which)",
				summary:
					"Both model object shapes well, but they differ in ergonomics: interfaces merge and extend nicely; type aliases compose anything.",
				details:
					"Use `interface` when you want a primarily object-shaped contract, especially for public API surfaces and extension via `extends` / declaration merging. Use `type` when you need unions, intersections, tuples, conditional types, mapped types, or you’re composing lots of pieces. In most teams, consistency matters more than the choice — pick a rule of thumb and stick with it.",
				tags: ["pattern", "safety", "fun-fact"],
			},
			{
				id: "modules-scripts-and-dts",
				title: "Modules, scripts, and `.d.ts` files",
				summary:
					"Whether a file is a module affects scope, imports, and how TypeScript understands globals — `.d.ts` is how you describe types without runtime code.",
				details:
					"A file with `import`/`export` is a module, so its declarations are scoped. “Script” files can leak globals across the project (surprising in large codebases). Declaration files (`.d.ts`) let you declare types for JS libraries, ambient globals, or publish types for consumers — but remember they don’t add runtime behavior.",
				tags: ["pipeline", "ts-only", "safety"],
			},
			{
				id: "utility-folder-and-architecture",
				title: "The “utility folder” pattern (TypeScript angle)",
				summary:
					"Utilities aren’t just about code reuse — they’re also about centralizing types, narrowing logic, and safe boundaries between “unknown” and “known”.",
				details:
					"A great TS-driven approach is to put type guards, parsers, and small adapters in utilities so the rest of your app consumes well-typed data. This reduces repeated assertions and encourages a pipeline where untrusted input becomes `unknown` → validated → typed.",
				tags: ["pattern", "safety"],
			},
			{
				id: "designing-types-top-down",
				title: "Designing your types: model the domain",
				summary:
					"Strong types are designed, not guessed: start with the domain rules, then encode them using unions, discriminators, and branded primitives.",
				details:
					"A recurring theme: use literal unions for finite sets, discriminated unions for state machines, and separate “input types” (looser) from “validated/internal types” (stricter). When you feel tempted to reach for `any`/assertions, it’s often a sign the type design can be improved.",
				tags: ["union", "pattern", "safety"],
			},
			{
				id: "deriving-types-dont-repeat-yourself",
				title: "Deriving types (don’t repeat yourself)",
				summary:
					"Prefer deriving types from runtime values or existing types instead of re-declaring shapes in multiple places.",
				details:
					"Patterns like `typeof`, `keyof`, indexed access types, and utility types let you keep types in sync with implementation. This reduces drift (where code changes but types don’t) and makes refactors safer.",
				tags: ["typeof", "keyof", "utility-type"],
			},
			{
				id: "objects-and-widening",
				title: "Objects, widening, and mutability surprises",
				summary:
					"Many TS “gotchas” come from widened types and shared references: values widen unless you ask them not to, and objects are mutable references.",
				details:
					"If a value widens too much, you may lose exhaustiveness and auto-complete. Tools like `as const`, `satisfies`, and careful annotations help keep types precise. For mutability, remember that copying references (not cloning) is the default in JS — TS can prevent some mutations, but it can’t make shared references safe by itself.",
				tags: ["mutability", "safety", "fun-fact"],
			},
			{
				id: "unions-literals-and-narrowing",
				title: "Unions, literals, and narrowing (core superpower)",
				summary: "TypeScript shines when you model finite possibilities and narrow them safely using control flow.",
				details:
					"Literal unions model “one of a few values”. Narrowing happens via `if`, `switch`, `in`, `typeof`, truthiness checks, and user-defined type guards. A great practice is to design types so narrowing is obvious (e.g., discriminated unions), then let TypeScript guide you to handle every case.",
				tags: ["union", "safety"],
			},
			{
				id: "essential-types-and-annotations",
				title: "Essential types + annotations (use them strategically)",
				summary:
					"You usually want inference first, then add annotations at boundaries: function params, public APIs, and tricky generics.",
				details:
					"Annotations are most valuable where inference can’t see enough context (API boundaries) or where you’re encoding intent. Over-annotating can make refactors harder, but under-annotating can leak `any` or widen types. Treat annotations as guardrails, not busywork.",
				tags: ["annotation", "safety"],
			},
		],
	},
];
