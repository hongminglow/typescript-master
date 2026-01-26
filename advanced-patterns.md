# Advanced TypeScript Patterns (Fast Reference)

## 1) Branded / Opaque / Nominal types

Goal: prevent accidentally passing a plain value (like `string`) into a slot that requires a validated/special value.

### Brand helper

```ts
declare const brand: unique symbol;

type Brand<T, TBrand> = T & { [brand]: TBrand };
```

### Example: Password

```ts
type Password = Brand<string, "Password">;

let passwordSlot: Password;

// passwordSlot = 'asdf' // error
passwordSlot = "asdf" as Password;
```

## 2) Brand after runtime validation

Pattern: do checks at runtime, then return branded values.

```ts
type Email = Brand<string, "Email">;

type Password = Brand<string, "Password">;

function validateValues(values: { email: string; password: string }) {
  if (!values.email.includes("@")) throw new Error("Email invalid");
  if (values.password.length < 8) throw new Error("Password too short");

  return {
    email: values.email as Email,
    password: values.password as Password,
  };
}
```

When you see mentions of **type predicates**, **assertion functions**, and **globals**, they all follow the same goal: move “this is safe” knowledge into the type system.
