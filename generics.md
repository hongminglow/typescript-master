# Generics (Fast Reference)

## 1) Generic identity ("return what I pass in")

Why: replacing `unknown` with a generic preserves the exact input type.

```ts
const returnWhatIPassIn = <T>(param: T) => param;

const one = returnWhatIPassIn(1);
//    ^? 1

const matt = returnWhatIPassIn("matt");
//    ^? 'matt'
```

## 2) Generic constraints (`extends`)

Why: restrict what can be passed, while still keeping literal inference.

```ts
const onlyStrings = <T extends string>(t: T) => t;

onlyStrings("hello");
// onlyStrings(123) // error
```

## 3) Mental model

- A generic function is like a **type-level function**: input type → output type.
- Add constraints when the implementation requires a certain shape.
