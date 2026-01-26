# React + TypeScript (Fast Reference)

## 1) Discriminated union props

Use a shared discriminant (`type`, `variant`, `mode`, etc.) so TS can narrow props.

```ts
type Props = { type: "a"; a: string } | { type: "b"; b: string };

function Example(props: Props) {
  if (props.type === "a") {
    props.a;
  } else {
    props.b;
  }
}
```

## 2) Don’t destructure before narrowing

If you destructure `a`/`b` before checking the discriminant, TS can lose the correlation.

Prefer:

```ts
function Example(props: Props) {
  if (props.type === 'a') return <div>{props.a}</div>
  return <div>{props.b}</div>
}
```

If you really want destructuring, destructure after the check:

```ts
function Example(props: Props) {
  if (props.type === 'a') {
    const { a } = props
    return <div>{a}</div>
  }
  const { b } = props
  return <div>{b}</div>
}
```

## 3) Mental model

- Narrow first (by discriminant), then destructure.
- Keep union members clearly separated.
- Prefer exhaustive checks for more than 2 variants.
