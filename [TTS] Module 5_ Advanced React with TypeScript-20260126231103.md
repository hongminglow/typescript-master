# Module 5: Advanced React with TypeScript



# (a) Advanced Props



# 1. Type-Checking React Props With Discriminated Unions

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/04-advanced-props/22-discriminated-union-props.problem.tsx

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/04-advanced-props/22-discriminated-union-props.problem.tsx)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=9f2ac69d-7e31-4737-9cb8-c2c1c25e48d4&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0101-type-checking-react-props-with-discriminated-unions-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=9f2ac69d-7e31-4737-9cb8-c2c1c25e48d4&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0101-type-checking-react-props-with-discriminated-unions-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
Here we have a type of `ModalProps` that takes in two possible variants: either `no-title` or `title`. Depending on the variant, it can either receive a title or not.

```typescript
type ModalProps = {
  variant: "no-title" | "title"
  title?: string
}


```

Inside the component, if it has a variant of `no-title`, it returns an element with `No title` in it.

If it has a variant of `title`, it returns a title with `props.title`:

```typescript
export const Modal = (props: ModalProps) => {
  if (props.variant === "no-title") {
    return <div>No title</div>
  } else {
    return <div>Title: {props.title}</div>
  }
}
```

This works fine inside the component, but outside of the component, it's not accurately representing the possible combinations of props.

As it is, the type allows us to pass in a variant of `no-title` with a title attached. Ideally, we should get an error if we try to pass in a title when we pass in `no-title`. Similarly, if we fail to pass in a title when using the `title` variant, it should also throw an error.

## Challenge
Your job here is to try to work out if you can find a way to change the type of `ModelProps` to better meet these goals.

Hint: Check out the [Discriminated Unions are a Frontend Dev's Best Friend article](https://www.totaltypescript.com/discriminated-unions-are-a-devs-best-friend) for some ideas on how to solve this challenge.

## Transcript
0:00 For this exercise, we're going to look at using a discriminated union to handle props in React and improve the types of props that we're passing into our components. Here we have a type of modal props and it takes in two possible variants, either no title or a title. And it can either receive a title or not.

00:19 And inside here, if it has a variant of no title, then it just returns an element with no title in it or it returns a title with props.title. Except this is fine inside of the component, but outside of the component, it's kind of lying to our consumers a little bit

00:37 because it's letting us pass various kind of impossible things in. So what it's letting us do is first of all, it's letting us pass in a variant of no title with a title attached. So ideally, what we should be getting here is an error if we try to pass in a title when we pass in no title.

00:54 And if we fail to pass in a title, it should be erroring at us as well. So this should be an error too. Your job here is to try to work out if you can find a way to change this type of modal props to better meet these goals. And I'll give you a clue. You're probably going to want to use a discriminated union for this.

01:14 I'll attach some resources below. Good luck.

# Solution: Using Discriminated Unions to Create Flexible Component Props in React

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/04-advanced-props/22-discriminated-union-props.solution.tsx

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/04-advanced-props/22-discriminated-union-props.solution.tsx)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=facc024e-8134-408c-8471-d8fdd5e9fe38&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0102-type-checking-react-props-with-discriminated-unions-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=facc024e-8134-408c-8471-d8fdd5e9fe38&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0102-type-checking-react-props-with-discriminated-unions-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
Here's the starting point of our `Modal` component:

```typescript
type ModalProps = {
  variant: "no-title" | "title"
  title?: string
}

export const Modal = (props: ModalProps) => {
  if (props.variant === "no-title") {
    return <div>No title</div>
  } else {
    return <div>Title: {props.title}</div>
  }
}
```

The props are currently a bit messy, as they allow us to pass in any value for the `title`.

We can think about this problem by considering the various states that we want the modal props to be in. In this case there are two different states: one with `title` and one `no-title`.

In order to fix the problem, let's start by working on just the `no-title` variant. We'll remove the `title` prop from the `ModalProps` type and change the `variant` to be `"no-title"`:

```typescript
type ModalProps = {
  variant: "no-title"
}
```

When we make this change we will get errors in the `Modal` component showing that the `title` variant doesn't exist and neither does `props.title`.

To fix this we'll add the state to `ModalProps` using the `|` symbol which is the union type. We'll add a new `title` variant and add a `title` prop of type `string`:

```typescript
type ModalProps =
  | {
      variant: "no-title";
    }
  | {
      variant: "title";
      title: string;
    };
```

Now, when we try to write a `Modal` component from scratch, we'll have autocomplete. If we use the `title` variant, a `title` prop will be required. Unlike before where it was incorrectly optional.

This discriminated union pattern is incredibly useful for managing different states in your React components.

In the next few exercises, we'll explore more of its possibilities!

## Transcript
00:00 So the best way to solve this is with a discriminated union. And the way you can think about that is you can think about the various different states that you want your modal props to be in. Now we really have two different states here. We have a state with no title and a state with a title. Currently this is very, very mushy.

00:19 It's just letting us pass in whatever we want to. So I'm actually going to remove that and then just make this the no title variance here. Now props.title is erroring because it doesn't exist in type of modal props and it's erroring down here too. So we want to now add the different states, the different possibility into this.

00:38 So we can do that with this or symbol here, which is the union type, and we can add a new title. So variant title. And let's now add in title string here. Now what this does is it means that we can either hit this branch of the union or this branch here.

00:57 And this means that if we try to, let's say, just code this up from scratch, then first of all it's going to yell at us because it's like not assignable to type intrinsic attributes and modal props. Very helpful error. But the thing we're missing here is a variant. And so we can either pass in no title or title. So we get this here.

01:13 If we pass in title, then it's going to yell at us again because title is missing in variant title. So now let's stick that in. Beautiful. And now we're forced to pass our title. And if we pass no title, then it's going to error at us because we've not, well, because we've passed in the title there.

01:32 Title title title title title, etc. So this is a really powerful pattern and you should probably be using it more often in your React apps. In the next few exercises, we're going to dive deeper into this and look more at its

01:43 possibilities.

# 2. Destructuring Discriminated Unions in React Props

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/04-advanced-props/23-destructuring-discriminated-unions.problem.tsx

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/04-advanced-props/23-destructuring-discriminated-unions.problem.tsx)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=48891c21-2a43-4c69-98a3-f416ce3974f8&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0201-destructuring-discriminated-unions-in-react-props-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=48891c21-2a43-4c69-98a3-f416ce3974f8&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0201-destructuring-discriminated-unions-in-react-props-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
In this exercise, we're starting with the same Modal component that has the variants all lined up in a discriminated union:

```typescript
type ModalProps =
  | {
      variant: "no-title"
    }
  | {
      variant: "title"
      title: string
    }
```

However, this time the component has changed from using just props to instead destructure `variant` and `title`:

```typescript
export const Modal = ({ variant, title }: ModalProps) => {
  if (variant === "no-title") {
    return <div>No title</div>
  } else {
    return <div>Title: {title}</div>
  }
}
```

```typescript
export const Modal = ({ variant, title }: ModalProps) => {
  if (variant === "no-title") {
    return <div>No title</div>
  } else {
    return <div>Title: {title}</div>
  }
}
```

The `variant` seems to be fine, but `title` doesn't seem to exist on type `ModalProps`.

```typescript
// hovering over title shows the error
Property 'title' does not exist on type 'ModalProps'.
```

Your task is to find a way to fix this error while still destructuring the props.

Hint: Refresh your memory by reading [the Narrowing entry in the TypeScript Docs](https://www.typescriptlang.org/docs/handbook/2/narrowing.html).

## Transcript
00:00 In this exercise, we're starting with our modal components again. In exactly the same setup, we have our modal props with the variants all lined up in the discriminated union, except we've got an error down here. And that's because we've changed it from using just props into doing some destructuring here.

00:17 So we have our variant being destructured and our title being destructured. Variant seems to be fine, like it's no title or title, lovely. But title doesn't seem to exist on type modal props.

00:30 Your job here is to try to find a way to fix the error and try to work around this little bit of pain here. Let's imagine that we still want to destructure the props, but we might not be able to do it quite here.

00:44 So your job is to try and fix this. Good luck.

# Solution: Destructuring vs Accessing Discriminated Union Props

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/04-advanced-props/23-destructuring-discriminated-unions.solution.1.tsx

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/04-advanced-props/23-destructuring-discriminated-unions.solution.1.tsx)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=43ed70f9-cda5-49fe-b2a7-6d3c2c04514b&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0202-destructuring-discriminated-unions-in-react-props-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=43ed70f9-cda5-49fe-b2a7-6d3c2c04514b&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0202-destructuring-discriminated-unions-in-react-props-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
Here's the initial code we're working with:

```typescript
type ModalProps =
  | {
    variant: "no-title"
    }
  | {
    variant: "title"
      title: string
    }

export const Modal = ({ variant, title }: ModalProps) => {
  if (variant === "no-title") {
    return <div>No title</div>
  } else {
    return <div>Title: {title}</div>
  }
}
```

Let's try a couple of different approaches for destructuring the discriminated union.

## Trying the Rest Syntax
Instead of just having `title` here, let's use the rest syntax with `...props`:

```typescript
export const Modal = ({ variant, ...props }: ModalProps) => {
  if (variant === "no-title") {
    return <div>No title</div>
  } else {
    return <div>Title: {props.title}</div>
  }
}
```

Unfortunately, this doesn't work. Hovering over the `...props` shows:

```typescript
(parameter) props: {} | {
  title: string;
}
```

This says that `title` is present in one of the branches but not the other.

This means that TypeScript basically will ignore the fact that `title` exists altogether.

To make this work, you would have to add an `else if` statement to see if `title` is in `props`:

```typescript
  if (variant === "no-title") {
    return <div>No title</div>
  } else if ('title' in props) {
    return <div>Title: {props.title}</div>
  }
```

This isn't ideal because TypeScript should be narrowing that for us already.

## Access Props After Narrowing
The better solution is to check `props.variant`. Then TypeScript will understand that the thing we're narrowing is `props`. After the variant has been narrowed, we can destructure the title from props, though generally I would prefer to just access it off of `props`:

```typescript
export const Modal = (props: ModalProps) => {
  if (props.variant === "no-title") {
    return <div>No title</div>
  } else {
    const { title } = props  // destructuring here
    return <div>Title: {title}</div>
  }
}
```

## Transcript
00:00 Let's try a couple of different approaches here. First, what we're going to try and do is take this title and instead of just having title here, let's go dot dot dot props. Let's imagine that we really want to destructure up in here. And now props, let's see if we can do props dot title here. Nothing. Okay, why is that?

00:19 Props is okay. It's either an empty object or it's this title here. So title is present in one of the branches but not the other. This means that TypeScript basically will ignore the fact that title exists and you

00:33 would have to do something like else if, let's say title in props. Now it will understand that props is that branch of the other one, whereas the other. But really it should be narrowing that already.

00:49 Now this is a slight limitation in TypeScript which is that if you separate the discriminator from the rest of the thing that it's discriminating, then it basically won't apply what it understands about this to the rest of the props.

01:05 The only way to really get this working is to do this and say props dot variant and now it understands that the thing you're narrowing is that props. Whereas if you were to split them out into two different variables, then it wouldn't understand.

01:19 So if we do like const my props or let's say underscore props up here equals props, then we can't access underscore props here because this one hasn't been narrowed, this one has. And TypeScript's control flow isn't quite smart enough to pick that up.

01:37 So if you're really keen on doing destructuring, then the best way to do it is just to do it inside here because now it understands that inside this scope that props is the one with the title so you can do const title equals props and this is absolutely fine.

01:54 But my preferred solution is really just the one that we started out with which is just to have the props kind of at the top level and just access them based on there because it's really not too much pain and it means that if you're using this discriminated union props, it's going to be the same kind of everywhere you use it. Whereas this solution is perfectly fine if you want to do destructuring or if you have,

02:14 you know, you're doing a big refactor or something and the previous component was destructured. But I would always prefer to just access it off the props.

02:22 It's nice and simple.

# 3. Adding a Prop Required Across

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/04-advanced-props/24-discriminated-union-with-other-props.problem.tsx

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/04-advanced-props/24-discriminated-union-with-other-props.problem.tsx)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=c92d7137-407d-4982-ba34-c81434a12709&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0301-adding-a-prop-required-across-discriminated-union-variants-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=c92d7137-407d-4982-ba34-c81434a12709&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0301-adding-a-prop-required-across-discriminated-union-variants-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
We're dealing with a modal which has two variants: one with a title and one without a title. The current `ModalProps` type is defined as follows:

```typescript
type ModalProps =
  | {
      variant: "no-title"
    }
  | {
      variant: "title"
      title: string
    }
```

Now, we want to add a `buttonColor` prop to the `ModalProps` type that is always required across different variants. In other words, regardless of the modal's variant, we should always have to pass in a button color.

Here is the current `Modal` component:

```typescript
export const Modal = (props: ModalProps) => {
  if (props.variant === "no-title") {
    return (
      <div>
        <span>No title</span>
        <button
          style={{
            backgroundColor: props.buttonColor,
          }}
        >
          Click me!
        </button>
      </div>
    )
  } else {
    return (
      <div>
        <span>Title: {props.title}</span>
        <button
          style={{
            backgroundColor: props.buttonColor,
          }}
        >
          Click me!
        </button>
      </div>
    )
  }
}
```

At the moment, we have errors because the `buttonColor` property is not on the `ModalProps` type at all.

## Challenge
Your task is to figure out a way to type `ModalProps` so that `buttonColor` is included on either variant. (Obviously you could manually add this to each variant, but this is not efficient, especially if you've got lots and lots of variants or lots of props to add!)

Your challenge is to find a more efficient way to type this so that you can attach it to each variant.

Good luck!

## Transcript
00:00 In this exercise, we're going back to our modal. And this time, in either variant, we want to be able to pass in a button color prop. And that's going to be put on this button here as the background color. So in the no title variant, there's one, and in the title variant, there's one. And this is going to be a required prop.

00:19 You're always going to have to pass this in. So now it's kind of currently erroring because it's not on the props type at all. So your job is to try to figure out a way to type these modal props so that button color is included on either variant. Of course, you could do this, right? But this is way too much like hard work, especially if you've got lots and lots of variants

00:38 or lots and lots of props to add here. So your job is to find a way to type this so that you can attach it to each variant.

00:47 Good luck.

# Solution: Resolving Discriminated Union Types with an Intersection

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/04-advanced-props/24-discriminated-union-with-other-props.solution.tsx

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/04-advanced-props/24-discriminated-union-with-other-props.solution.tsx)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=6266d40e-0133-4a15-b12d-7cc053c246a8&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0302-adding-a-prop-required-across-discriminated-union-variants-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=6266d40e-0133-4a15-b12d-7cc053c246a8&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0302-adding-a-prop-required-across-discriminated-union-variants-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
The best way to approach this is by using an intersection. Initially, the code looks like this:

```typescript
type ModalProps =
  | {
      variant: "no-title"
    }
  | ({
      variant: "title"
      title: string
    } & {
      buttonColor: string
    })
```

However, saving the file will cause Prettier to rearrange things a bit. You'll notice that it places the brackets in such a way that the `buttonColor` is only attached to one branch.

```typescript
// Error: Property 'buttonColor' does not exist on type '{ variant: "no-title"; };'.
```

If we're on the title variant and inside `no-title`, it actually throws an error because it doesn't exist on type variant `no-title`. Thus, we need a way to tell TypeScript that we want to attach this to both variants.

Even without the parentheses, if you look at the operational order, TypeScript or Prettier is correct. This is because 'and' actually goes before 'or' in the operation order. This means that this gets resolved as one type and it's behaving exactly the same as you can see below, even without the brackets:

```typescript
type ModalProps =
  | {
      variant: "no-title"
    }
  | {
      variant: "title"
      title: string
    } & {
      buttonColor: string
    }
```

This gets resolved as a separate member of the union.

## Bracketing Up the Entire Union
The only proper solution is by bracketing up the entire union. Wrapping these in parentheses is valid syntax, having it just sort of floating before the union.

```typescript
type ModalProps = (
  | {
      variant: "no-title"
    }
  | {
      variant: "title"
      title: string
    }
) & {
  buttonColor: string
}
```

Upon saving this, it will be properly formatted. Now `buttonColor` gets applied to each member of the union.

Even though this looks a bit ugly, this is the smoothest way to do it. It's actually clear which union is being intersected with which.

## Nicer Looking Variant
Now, let's create a `variantModalProps` to try to make this a bit prettier:

```typescript
type VariantModalProps =
  | {
      variant: "no-title"
    }
  | {
      variant: "title"
      title: string
    }

type ModalProps = VariantModalProps & {
  buttonColor: string
}
```

Now the `modalProps` reads a little bit easier.

This might be the best way to go if you're aiming for code readability, but both work equally well.

## Transcript
00:00 The best way to do this then is by using an intersection. And the intersection kind of looks like this, where we use this ampersand symbol and add in button color string here. Now, if we save this file, then Prettier is actually gonna kind of screw us over a little bit. Because if you notice,

00:17 the way that it places these brackets here, these parentheses, is actually like only attaching button color into one branch here. And we can see this if we go into our component itself. So we're on the title variant. And now if we're inside no title, it's actually erring at us

00:36 because it doesn't exist on type variant no title. So we need a way to basically say to TypeScript, actually, I want to attach this to both variants. So even without the parentheses, actually, if you look at the operational order, TypeScript is correct, or Prettier is correct here,

00:54 because and actually goes before or in the operation order. This means that this gets resolved as one type and it's behaving exactly the same as you can see below, even without the brackets. And this gets resolved as a separate member of the union. So the only way to properly solve this is by bracketing up the entire union.

01:13 So wrapping these in parentheses, and yes, this is valid syntax, having kind of this just sort of floating before the union. And if we save this, then it's gonna properly format it. And you can see that this is a type and then this gets intersected with it. So now button color gets applied to each member of the union.

01:31 And it means that we have button color on here. And it means that all of these tests are passing below too. So this is, even though this looks a little bit ugly, this is the smoothest way to do it. And it's actually the way it formats it, it's nice and clear kind of which union is being intersected with which. You could even, if you wanted to take this out

01:51 and say my little props is, let's just leave it like that for now. And let's say, variant modal props. You could add that as kind of like a second declaration there and then add that in variant modal props. And now the modal props reads a little bit easier too. So you don't need to use this parentheses pattern,

02:11 but that's kind of what's happening under the hood, right? We're just sort of attaching, like using this alias to attach them in parentheses and then intersecting it with the button color and we're good to go. So this might be the best way to go if you're aiming for code readability, but both work equally well.

# 4. Differentiating Props With a Boolean Discriminator

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/04-advanced-props/25-toggle-props.problem.tsx

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/04-advanced-props/25-toggle-props.problem.tsx)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=4905dddb-5f86-4ffa-8bc8-f17a19046ef3&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0401-differentiating-props-with-a-boolean-discriminator-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=4905dddb-5f86-4ffa-8bc8-f17a19046ef3&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0401-differentiating-props-with-a-boolean-discriminator-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
In this exercise, we are working with an `EmbeddedPlayground` component. This component allows us to use either `Code Sandbox` or `StackBlitz`, both of which are services that provide embedded playgrounds:

```typescript
const EmbeddedPlayground = (props: EmbeddedPlaygroundProps) => {
  if (props.useStackblitz) {
    return (
      <iframe
        src={`https://stackblitz.com/edit/${props.stackblitzId}?embed=1`}
      />
    )
  }

  return <iframe src={`https://codesandbox.io/embed/${props.codeSandboxId}`} />
}
```

We use an `iframe` within this component and the `src` attribute is used to navigate to either `StackBlitz` or `Code Sandbox` by default.

Interestingly, we are using a default setting as well as a `Boolean` as the differentiator.

However, our props are quite messy. We have a `stackblitzId` and a `codeSandboxId`, both of which can either be passed or not. This can lead to some complicated situations:

```typescript
type EmbeddedPlaygroundProps = {
  useStackblitz?: boolean
  stackblitzId?: string
  codeSandboxId?: string
}
```

For example, it might be used something like this:

```typescript
<>
  <EmbeddedPlayground useStackblitz stackblitzId="my-stackblitz-id" />
  <EmbeddedPlayground codeSandboxId="my-codesandbox-id" />

  <EmbeddedPlayground
    useStackblitz
    // @ts-expect-error
    codeSandboxId="my-codesandbox-id"
  />

  {/* @ts-expect-error */}
  <EmbeddedPlayground stackblitzId="my-stackblitz-id" />
</>
```

However, we have an error if we are using `StackBlitz` but passing a `codeSandboxId`. Similarly, it's problematic if we pass a `stackblitzId` when the default is `Code Sandbox`.

## Challenge
Your task is to figure out a solution where, if `useStackblitz` is `false` or `undefined`, we want to use `codeSandboxId`. If `useStackblitz` is `true`, we want to use a `stackblitzId`.

It's somewhat like a discriminated union, but with Booleans.

Good luck!

## Transcript
00:00 In this exercise, we have an embedded playground component, and that component can either be used to use Code Sandbox or use StackBlitz, which are two services that offer embedded playgrounds. We're using an iframe inside here, and in the iframe, we're basically using the SRC to either go to StackBlitz if we use StackBlitz,

00:19 or go to Code Sandbox by default. So there's an interesting behavior here. We're using a default, and we're also kind of using a Boolean as the differentiator. So, but our props here are really messy. We have StackBlitz ID, which can always be passed or not passed, or Code Sandbox ID,

00:38 which can be passed or not passed, meaning that we can end up in some really nasty situations. This should be an error here, because we're using StackBlitz, but passing a Code Sandbox ID. And here, we're passing a StackBlitz ID, even though the default is Code Sandbox. So your job here is to try to figure out a way

00:58 where we can say, when useStackBlitz is false or undefined, we want to use Code Sandbox. And when useStackBlitz is true, we want to use a StackBlitz ID, or we want to receive a StackBlitz ID. So it's kind of like a discriminated union, but with Booleans.

01:16 Good luck.

# Solution: Discriminated Unions for Conditional Props in TypeScript

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/04-advanced-props/25-toggle-props.solution.tsx

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/04-advanced-props/25-toggle-props.solution.tsx)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=57a6bb9e-9b1f-41a3-a7d7-c367c541bf14&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0402-differentiating-props-with-a-boolean-discriminator-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=57a6bb9e-9b1f-41a3-a7d7-c367c541bf14&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0402-differentiating-props-with-a-boolean-discriminator-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
The solution is to use a discriminated union to handle the different behaviors based on a prop value.

We'll start by looking at the `useStackBlitz` version.

First, let's delete everything and set `useStackBlitz` to `true`. Notice that we're using the required version here, which means that when you pass `useStackBlitz: true`, you must also pass in a `stackBlitzId` string.

```typescript
type EmbeddedPlaygroundProps = {
  useStackBlitz: true
  stackBlitzId: string
}
```

This means that the first case is working as expected, with `useStackBlitz` and `stackBlitzId` being passed in correctly:

```typescript
<EmbeddedPlayground useStackBlitz stackBlitzId="my-stackblitz-id" />
```

Now let's look at the second branch, where `useStackBlitz` is set to `false`.

In this case, we want the user to pass in a `codeSandboxId` instead.

```typescript
type EmbeddedPlaygroundProps =
  | {
      useStackBlitz: true
      stackBlitzId: string
    }
  | {
      useStackBlitz: false
      codeSandboxId: string
    }
```

At this point, most of our cases are working correctly, but we also want to cover the scenario where `useStackBlitz` is not passed in at all.

We can do this by setting `useStackBlitz` to `undefined` and requiring a `codeSandboxId` inside of `EmbeddedPlaygroundProps`:

```typescript
type EmbeddedPlaygroundProps =
  | {
      useStackBlitz: true
      stackBlitzId: string
    }
  | {
      useStackBlitz: false
      codeSandboxId: string
    }
  | {
      useStackBlitz?: undefined
      codeSandboxId: string
    }
```

Now everything works as expected!

## Simplifying the Branches
We can simplify the discriminated union by combining the last two branches.

Instead of having separate branches for `useStackBlitz: false` and `useStackBlitz: undefined`, we can make `codeSandboxId` optional and remove the separate branch for `undefined`.

```typescript
type EmbeddedPlaygroundProps =
  | {
      useStackBlitz: true
      stackBlitzId: string
    }
  | {
      useStackBlitz?: false
      codeSandboxId: string
    }
```

This solution now covers all desired cases.

When `useStackBlitz` is `true`, a `stackBlitzId` is required. When it's `false` or not passed in at all (i.e., `undefined`), a `codeSandboxId` is required.

This approach is a great way to handle toggling behavior on and off based on a single prop value in your TypeScript interfaces.

## Transcript
00:00 So the solution here is to use a discriminated union. And what we're going to do then is we want to split these into two different categories. We're going to look at the useStackBlitz version first. Let me just actually delete all of this. We're going to say useStackBlitz and we're going to mark this as true.

00:16 And you notice that we're using the required version here. So when you pass useStackBlitz true, you also must pass in a stackBlitzId string. This means then that this first one is working here. We've got useStackBlitz and stackBlitzId, all good. Now we want to look at the second branch.

00:33 And the second branch, let's say that we have useStackBlitz false. I'm going to mark that for now. And it's going to be codeSandboxId and you must pass that in here. So what we can see here then is that most of our stuff is working.

00:52 This error is working correctly now, which is great. And except this one isn't working because useStackBlitz is missing in type codeSandboxId string but required in this. So what we also want to cover here is when you don't pass in a useStackBlitz false.

01:10 So what we could do is we could do this. We could say useStackBlitz, let's say when you don't pass it in, when we have an undefined there, now you have to pass in a codeSandboxId. And this now works, except we can actually split these into like the same branch here.

01:27 So just to cover this again, useStackBlitzId when it's true, require this. When it's false, require this. And when it's undefined or not passed, which is what this means, then codeSandboxId. But we can actually join these two together. And we can say codeSandboxId like this, make it optional.

01:47 And this will still work when we delete this branch. So this is the answer here. Because now what we're saying is whether it's true, it goes into this branch, or whether it's false or undefined or not passed, then it goes into that branch. You notice too that we can actually pass in useStackBlitz, let's say, undefined,

02:05 and it will work here. Really, really nice setup. So this is how you handle things where you want to toggle behavior on and off, just with a props interface.

# 5. Using the Record Type to Represent an Empty Object

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/04-advanced-props/26-empty-object-type.explainer.tsx

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/04-advanced-props/26-empty-object-type.explainer.tsx)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=abda3ec8-858b-4215-9538-2342762b60d8&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0501-Using the Record Type to Represent an Empty Object.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=abda3ec8-858b-4215-9538-2342762b60d8&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0501-Using the Record Type to Represent an Empty Object.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Explainer
Let's examine a specific component. This component accepts a single property, described as `config`. Interestingly, `config` accepts an empty object type:

```typescript
const Component = (props: { config: {} }) => {
  return <div />
}
```

This type is somewhat unusual because it allows us to pass virtually anything we want into `config` with a few restrictions.

For instance, we can pass any object, but we would not receive any autocomplete suggestions:

```typescript
<Component config={{
  foo: 'bar',
  whatever: {},
  awdawd: 123,  
  }}
/>
```

We can pass in any value, remove the entire object, pass in a number, or a string, and it won't trigger an error. Even passing in a boolean value of `false` is permissible.

The only circumstances that will trigger an error are if we pass in `null` or `undefined`:

```typescript
// Errors!
<Component config={null} />
<Component config={undefined} />
```

## Why Does This Happen?
This behavior is due to a special type in TypeScript.

The empty object type represents anything with zero or more properties. So, it applies to anything that you can access something on. While it has no properties on it, it could technically represent things with more properties.

For example, when we declare a string it will have some properties on it like `charAt`, `match`, and others.

```typescript
const str = "123123"

str.charAt(0)
```

Therefore, you can think of the empty object type as representing everything that's not `null` or `undefined` in TypeScript.

This concept is worth noting because some upcoming exercises will necessitate understanding this special type!

## Representing `config` Without any Properties
If we want to represent `config` as an object without any properties, ensuring an object is being passed, then you would pass in a `Record<string, never>`.

```typescript
// `Record` is a helper type that allows us to express an object.

const Component = (props: { config: Record<string, never> }) => {
  return <div />
}
```

With the above implementation, we can't pass in a string, a number, or `true`.

We have to pass in an empty object. If we try to pass in anything else, it will trigger an error because `foo` is not assignable to type `never`.

The method in this example is the best practice for representing empty objects, however there are some additional use cases.

Understanding the empty object type's behavior is essential for the upcoming exercises!

Read more about [the empty object type on totaltypescript.com](https://www.totaltypescript.com/the-empty-object-type-in-typescript).

## Transcript
00:00 Let's take a look at this component here. This component takes in a single prop, which is described as config. And config takes in this kind of empty object type here. But this is a very strange type because it lets me pass absolutely anything I want

00:17 into config with a couple of limits. So I can pass in anything into this object here. I'm not getting autocomplete, obviously. I can pass in literally anything. Or I can remove this entire object. I can pass in a number. I can pass in a string, and it's not going to error at me. I can even pass in a boolean or false here.

00:36 Now, the only thing that will make this error is if I pass in null or if I pass in undefined. Now, why on earth would this be happening? Well, this is actually a special type in TypeScript. And what this type says is this type represents anything with zero or more properties.

00:56 So anything that you can sort of access something on it. And this has no properties on it, but technically it could represent things that have more properties. So if you think about what a string is, a string, if I go const this is blah, blah, blah, blah, now, this has some properties on it.

01:13 So it has properties like at, charAt, symbol, and all of these different things. And you can think of this as just being something that represents everything that's not null or undefined in TypeScript. And I wanted to touch on this here because there are some exercises coming up

01:30 that you're gonna need to know about this special type in order to really get around them. Now, if we wanted to represent config as like an object without any properties, we wanted to make sure it was an object being passed, then you would pass in record string, never. Record is like a helper type here that lets us express an object.

01:50 And now we can't pass in a string here. We can't pass in a number. We can't pass in true. We have to pass in this empty object. And if we pass in anything here, then it's going to error at us because foo is not assignable to type, never. So this is the way that you actually represent empty objects.

02:07 But this type does have some use cases, but you're gonna need to know why it's slightly strange in the upcoming exercises.

# 6. Conditionally Require Props With Discriminated Unions

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/04-advanced-props/27-either-all-these-props-or-none.problem.tsx

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/04-advanced-props/27-either-all-these-props-or-none.problem.tsx)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=e6ac00d5-e141-4331-a81e-551136690e58&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0601-conditionally-require-props-with-discriminated-unions-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=e6ac00d5-e141-4331-a81e-551136690e58&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0601-conditionally-require-props-with-discriminated-unions-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
In this exercise, we have a standard `Input` component with a clever twist in its prop types:

```typescript
type InputProps = (
  | {
      value: string
      onChange: ChangeEventHandler
    }
  | {}
) & {
  label: string
}

export const Input = ({ label, ...props }: InputProps) => {
  return (
    <div>
      <label>
        {label}
        <input {...props} />
      </label>
    </div>
  )
}
```

The goal is to have our component in either of two states:

It will either be a controlled component, where we pass in `value` and `onChange`:

```typescript
<Input label="greeting" value="hello" onChange={handleChange} />
```

Or it will be an uncontrolled component, where neither of those is passed:

```typescript
<Input label="greeting" />
```

Technically other props like `defaultValue` could potentially be passed in, but currently the only other required prop is `label`.

Note that the `label` prop is present on both the controlled and uncontrolled components, and has been added in order to make this exercise a bit more complex.

## Challenge
There are some tests that are currently failing.

```typescript
export const Test = () => {
  return (
    <div>
      <Input label="Greeting" value="Hello" onChange={() => {}} />
      <Input label="Greeting" />

      {/* @ts-expect-error */} // not working!
      <Input label="Greeting" value="Hello" />

      {/* @ts-expect-error */} // not working!
      <Input label="Greeting" onChange={() => {}} />
    </div>
  );
};
```

Currently our `@ts-expect-error` directives are not working as they should when we only pass the `value` or `onChange` without the required `label` prop.

Your task is to figure out how to properly implement an "all or none" scenario for these props.

Hint: Focus on modifying the `InputProps`, possibly by expanding it or adding a couple more properties:

```typescript
type InputProps = (
  | {
      value: string
      onChange: ChangeEventHandler
    }
  | {}
) & {
  // <-- this is the line to modify
  label: string
}
```

Refer back to the previous explainer about the empty object type to jog your memory!

## Transcript
00:00 In this exercise, we have an input component. And this input component is a very standard input component, except we've gotten a bit clever in the prop types. We want to basically have two different states for our components. Either it's going to be a controlled component where we're going to pass in value and onChange,

00:18 or it's going to be an uncontrolled component where we pass in neither of those. We can pass in things like maybe default value or something. But currently the only other required prop is this label string here. Now, this label string, as we can see, is present on both of them. I've just added it in for a little bit of complexity.

00:36 But there are some tests that are failing here. Nothing seems to be wrong inside the input component, but there's some bad stuff happening here. So we have our label greeting, which is present on all of these, and we have value hello and onChange up here. That's working nicely.

00:52 Except here, it's not erroring when we only pass the value. It's not erring when we only pass the onChange too. So your job is to work out how we can properly get like all of these props or none of these props situation happening. I'll give you a clue.

01:09 It's all about changing this line of code here, expanding this out maybe and adding a couple more properties to it. Because we know based on the explainer in this section that this is not doing what we think it's doing in this position. Good luck.

# Solution: Allow Optional Props Using A Discriminated Union Branch With Undefined Types

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/04-advanced-props/27-either-all-these-props-or-none.solution.tsx

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/04-advanced-props/27-either-all-these-props-or-none.solution.tsx)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=599f6e70-47ac-45c2-8c2f-41c46e2e1845&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0602-conditionally-require-props-with-discriminated-unions-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=599f6e70-47ac-45c2-8c2f-41c46e2e1845&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0602-conditionally-require-props-with-discriminated-unions-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

In order to get our tests passing, we need to change the `InputProps` type because it's not explicit enough about saying "don't include `value` and `onChange` in the branch".

Here's how the `InputProps` currently look:

```typescript
// Starting point
type InputProps = (
  | {
      value: string
      onChange: ChangeEventHandler
    }
  | {}
) & {
  label: string
}
```

The reason the branch is too permissive is because we're using an empty object type, which can receive any number of properties.

To fix this branch, we will specify `value` and `onChange` again, and assign them to `undefined` and set them both as optional:

```typescript
type InputProps = (
  | {
      value: string
      onChange: ChangeEventHandler
    }
  | {
      value?: undefined
      onChange?: undefined
    }
) & {
  label: string
}
```

We have essentially replaced the empty object type with an object where its values will be undefined no matter what is passed in.

## Checking Our Work
Inside the `Test` for our first use of `Input`, we're hitting the correct branch of our discriminated union where we are explicitly setting both `value` and `onChange`:

```typescript
<Input label="Greeting" value="Hello" onChange={() => {}} />
```

Now if we create a new `Input` with only a `label` and `value`, it's going to warn me that `onChange` is required too:

```typescript
// Warning to add onChange
<Input label="Greeting" value="Hello"/>
```

This setup is cool because it lets you be much more explicit about different props that you're passing in.

## A Less Desirable Solution
Many developers would solve this challenge by passing `never` into the the `value` inside of `InputProps`:

```typescript
type InputProps = (
  | {
      value: string
      onChange: ChangeEventHandler
    }
  | {
      value?: never
      onChange?: never
    }
) & {
  label: string
}
```

This does work, but only because `never` in this situation gets reduced to `undefined`.

As seen in this example, `never` is in a union with something else, it will always just reduce itself out of that union:

```typescript
type Example = never | undefined

// Hovering over Example:
type Example = undefined
```

This is why the best solution is the one above, where `value` and `onChange` are set as `undefined` directly instead of being resolved out of the `never`.

We'll see later in this module how to take the branch we made and turn it into a reusable type helper.

But for now, understanding how this works is enough!

## Transcript
00:00 So in order to get this working, we need to change this type here. This is definitely a fender because it's not explicit enough about needing to say, don't include value and on change in this branch. Because this branch currently, because we're using this empty object type, which can sort

00:17 of receive any number of properties, it's too permissive at the moment. So we need to change this so that it's basically saying, don't include value and on change in this branch, and you're allowed to include both of them in this branch.

00:32 So the way we can do that is by specifying value again, and we're going to say undefined here. And on change too, we're also going to say undefined. So this means now instead of having this kind of like empty object type, which is going

00:48 to sort of permit you to do lots of weird stuff in it, we're actually saying this object here, it's always going to be undefined no matter what you pass in. So here now, on this first one, we're hitting the correct branch. So we're saying value and on change up here.

01:04 And then if I add value here, then it's going to warn me if I don't add on change here, which is super duper nice. So this setup is really, really cool because it lets you be much more explicit about different props that you're passing in.

01:21 A lot of people think that the correct solution to this is actually by passing never into here. And this does work. But this only works actually because never in this situation is actually reduced to undefined. So if I say const input props, and let's say it's going to be input props here. Beautiful.

01:40 And I just pass in label 123. Now if we look at input props dot on change, you can see here that it's actually not like it's not resolved to never, it's actually resolved to undefined. And that's because in this position, never actually reduces itself to undefined.

02:00 Because never actually, if you take a look at it, type example equals never or undefined. If never is in a union with something else, it will always just reduce itself out of that union.

02:14 So the proper best way to define this is actually as undefined, because that never even makes it into the type itself. So this is really, really nice. It's a little bit verbose. And I'm going to show you later in this module, how you can take this and turn it into a type

02:32 helper that you can reuse again and again and again.

02:35 But for now, understanding how this works is enough.

# 7. Finding a Better Type Definition For A Mapped Component

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/04-advanced-props/28-passing-react-components-vs-passing-react-nodes.problem.tsx

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/04-advanced-props/28-passing-react-components-vs-passing-react-nodes.problem.tsx)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=dbfa9311-89fc-42ab-957f-dab9109ce2a6&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0701-finding-a-better-type-definition-for-a-mapped-component-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=dbfa9311-89fc-42ab-957f-dab9109ce2a6&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0701-finding-a-better-type-definition-for-a-mapped-component-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
In this exercise, we're working with a `Table` component that takes in a `renderRow` function.

The `renderRow` function is passed an index, and we're mapping over the indices and passing `props.renderRow` into the mapping function.

The `Table` component is working with a `ReactNode` that represents a React component:

```typescript
interface TableProps {
  renderRow: React.ReactNode
}

const Table = (props: TableProps) => {
  return <div>{[0, 1, 3].map(props.renderRow)}</div>
}
```

However, there's an issue with the type definition for the `TableProps` interface.

Inside of the `Parent` component where the `Table` component is being used, we are getting errors stemming from the `index`.

The `index` should be a number, but we're getting an error:

```typescript
Type '(index: any) => Element' is not assignable to type 'ReactNode'.

Did you mean to call this expression?

Parameter 'index' implicitly has an 'any' type.
```

Surprisingly, we're not getting an error when passing in a plain React component, even though we should be expecting one.

## Challenge
Your task is to figure out what's wrong with the `TableProps` interface and find a better type definition to use in its place.

```typescript
interface TableProps {
  renderRow: React.ReactNode
}
```

You can read more in [this article about](https://www.totaltypescript.com/jsx-element-vs-react-reactnode) [`ReactNode`](https://www.totaltypescript.com/jsx-element-vs-react-reactnode) [on totaltypescript.com](https://www.totaltypescript.com/jsx-element-vs-react-reactnode).

Good luck!

## Transcript
00:00 In this exercise, we have a table component. And this table component basically takes in a renderRow function. And this renderRow function, as we can see, we're just passing in like 0, 1, 3, and we're mapping over it and passing in props.renderRow into that mapping function.

00:18 And we're passing in this React node, which, as far as I understand, represents a React component. So, really, what we should be doing here should be working nicely. We've got this index inside here, but this appears to be... Did you mean to call this expression? Has an any type index here.

00:36 Index should be number, as we've got this test here. But it doesn't seem to be working, and it seems to be working in a bunch of strange ways. We should be expecting an error if we pass in just a plain React component, because this should be this thing here, like an index there. But currently, it's not erroring.

00:55 So your job here is to try to figure out what we've gotten wrong about this table props interface

01:00 and see if there's a better type definition that we can use in its place.

# Solution: What's The Difference Between React.ReactNode and React.FC?

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/04-advanced-props/28-passing-react-components-vs-passing-react-nodes.solution.2.tsx

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/04-advanced-props/28-passing-react-components-vs-passing-react-nodes.solution.2.tsx)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=2ffedc0e-0478-4123-ac64-f20bf2ddd7b2&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0702-finding-a-better-type-definition-for-a-mapped-component-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=2ffedc0e-0478-4123-ac64-f20bf2ddd7b2&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0702-finding-a-better-type-definition-for-a-mapped-component-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
There are a couple of different solutions that both rely on understanding the `ReactNode` type.

```typescript
interface TableProps {
  renderRow: React.ReactNode
}
```

## A Closer Look at `ReactNode`
If we command click on `ReactNode` in local VS Code, it will take us to the definition of the type. Alternatively, you can [view the types on the DefinitelyTyped repo](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/8bf4a95b555faf65a9b1f1bd9dc6e4c90e775922/types/react/index.d.ts#L256-L266).

Inside, we can see that `ReactNode` might not quite be what we thought it was:

```typescript
/**
 * For internal usage only.
 * Different release channels declare additional types of ReactNode this particular release channel accepts.
 * App or library types should never augment this interface.
 */
interface DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_REACT_NODES {}
type ReactNode =
    | ReactElement
    | string
    | number
    | Iterable<ReactNode>
    | ReactPortal
    | boolean
    | null
    | undefined
    | DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_REACT_NODES[keyof DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_REACT_NODES];
```

It ends up that `ReactNode` doesn't represent a component. Instead, it actually represents a member of JSX or a thing that you can render in `React`.

It has `ReactElement`, `string`, `number`, `ReactFragment`, `ReactPortal`, `Boolean`, `null` or `undefined`. These are all things that you are allowed to pass into a `div`.

Essentially, `ReactNode` represents the thing that gets put into JSX.

To drive the point home, we can create a component that is typed as a `ReactNode` and pass in a `<div>` or `null` or `undefined` or numbers– anything that we can pass into JSX. However, we can't pass in an object.

```typescript
const component: React.ReactNode = <div />;
const component: React.ReactNode = null;
const component: React.ReactNode = undefined;
const component: React.ReactNode = 123;

const component: React.ReactNode = {}; // Error!
```

## Troubleshooting `renderRow`
It's important to understand that `renderRow` isn't doing what we want because `ReactNode` is not a function.

We can fix this by making changing the `TableProps` interface so that `renderRow` is a function that returns `React.ReactNode`:

```typescript
interface TableProps {
  renderRow: () => React.ReactNode
}
```

However, this doesn't solve our errors yet.

Inside the `Parent` component where the `Table` component is being used, we're getting errors stemming from the `index` being implicitly typed as `any`.

What we can do is add an `index` parameter to the `renderRow` function and type it as a `number`:

```typescript
interface TableProps {
  renderRow: (index: number) => React.ReactNode
}
```

With this change, the errors go away and `@ts-expect-error` works as expected because `React.ReactNode` is correctly representing a thing that gets returned from a component and not a component itself.

## A Helpful React Type: `React.FC`
React does have a type that can help you out in this situation.

The `React.FC` type, which is short for `React.FunctionComponent`, was controversial for a long time. However, since TypeScript v5.1, `React.FC` has gotten much better, as I expand on in [this article on totaltypescript.com](https://www.totaltypescript.com/you-can-stop-hating-react-fc).

Open up the type definitions by command clicking on `React.FC` in local VS Code, or viewing definition in the [DefinitelyTyped repo](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/8bf4a95b555faf65a9b1f1bd9dc6e4c90e775922/types/react/index.d.ts#L553-L561).

From the type definition, we can see that `React.FC` is an alias for `FunctionComponent`. `FunctionComponent`

It is an `interface` which describes a function that takes in `props` and `context` then returns a `ReactNode`:

```typescript
type FC<P = {}> = FunctionComponent<P>;

interface FunctionComponent<P = {}> {
    (props: P, context?: any): ReactNode;
    propTypes?: WeakValidationMap<P> | undefined;
    contextTypes?: ValidationMap<any> | undefined;
    defaultProps?: Partial<P> | undefined;
    displayName?: string | undefined;
}
```

From the type definitions, we can see that we could essentially rewrite our `TableProps` interface like this:

```typescript
interface TableProps {
  renderRow: React.FC<number>
}
```

The `React.FC<number>` basically serves as an alias for our original solution where we used a function that took an `index` and returned a `ReactNode`.

However, using `React.FC` does bring some additional properties like `displayName` into `props.renderRow`.

The big takeaway though is that `React.FC` gives you a way to express a function that can return a `React.ReactNode`.

## A Preference for `React.ReactNode`
While the `React.FC` syntax solves the challenge, generally I have a preference for using `React.ReactNode`:

```typescript
interface TableProps {
  renderRow: (index: number) => React.ReactNode
}
```

There are a couple of reasons for this, but for now the short answer is that it makes it very clear what's happening. You also will end up using `React.ReactNode` a lot when typing children.

We'll go further into the other reasons to use `React.ReactNode` later in the workshop.

## Transcript
00:00 There are a couple of different solutions here, but they all rely on understanding this React node type here. If we command click on it, which takes us to the definition of the type, we end up in types React here. And we see that React node here is not quite what we thought it was. React node doesn't represent a component,

00:19 it actually represents a member of JSX or a thing that you can render in React. So we have React element, string, number, React fragment, React portal, Boolean null or undefined. All of these things you can pass into a div, let's say. So if we were to just say like div and then props.renderRow,

00:38 this actually is correct because React.ReactNode represents the thing that gets put into JSX. So again, just to really firm this up, let's say const component and React.ReactNode, and we can put inside here

00:55 anything that we can pass into this section there. So we've got our component React.ReactNode, we can put null in there, we can put undefined in there, one, two, three, like numbers we can put in there. We can't pass objects into there because that's not a part of React node basically.

01:14 So now we need to understand that this renderRow function isn't quite doing what we want because React.ReactNode is not a function. We can change this by making it a function that returns a React.ReactNode. Except now, if we take a look down here,

01:32 this index, like we're expecting to receive an index here, which is going to go into our div here. So let's say we've got index and let's make it a number. Now the errors below go away because we've properly represented what we're trying to do here. So renderRow, this should be an error

01:51 because we should need to pass a function into here. So React.ReactNode doesn't represent a component, it actually represents a thing that gets returned from a component. Now you may be looking at this and thinking, I wonder if there's like a type within React itself that can help me out here. And there is.

02:10 This is React.fc, which is React.FunctionalComponent. Now this type is kind of relatively controversial and, or at least it was for a long time. But since TypeScript 5.1, which is, as I record this, the current version of TypeScript,

02:27 then React.fc has actually gotten a lot better. And if we take a look at it by just command-clicking on fc, you can see that it's an alias for FunctionComponent. Lovely. FunctionComponent is right here. And this is an interface which describes a function. And we can see that this is an interface that describes a function with this

02:45 because this is a call signature for this interface. Slightly complicated syntax. But what we can see is that it takes in props, p, and context, any, this is like an old sort of React API, and it returns, hey, our friend, a React node.

03:01 So this is basically an alias over the top of this solution, which was our previous one here, indexNumberReact.ReactNode, by just using a slightly more terse syntax. And you also get a couple of extra things here. So you've got props.renderRow. You've also got access to displayName, if you need that.

03:22 And you've got access to default props, context types. I think context types and default props are going away, possibly. But displayName is very occasionally useful. But essentially, React.fc just gives you a way to express a function that can return a React.ReactNode. And I'll link some more materials below

03:41 that I've written publicly on my opinion about React.fc. Really, I think I actually just prefer this syntax for a couple of other reasons, which we'll go into when we cover forward ref. But this just makes it really, really clear what's happening, and you're gonna be using React.ReactNode a lot,

03:59 because you're gonna be using it to type children as well, which I covered in previous, I think in the beginners React tutorial. So there you go. This is the difference between React.ReactNode, thinking of it as a component, and thinking of it as something that JSX returns,

04:14 or that represents JSX.

# 8. Syncing Types without Manual Updates

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/04-advanced-props/29-variants-with-classnames.problem.tsx

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/04-advanced-props/29-variants-with-classnames.problem.tsx)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=eebf2122-07a6-43cb-bcd3-b3a110ff6f7c&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0801-syncing-types-without-manual-updates-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=eebf2122-07a6-43cb-bcd3-b3a110ff6f7c&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0801-syncing-types-without-manual-updates-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
In this exercise, we're working with a `classNamesMap` for our Button component. This map is designed to take a variant as the key and return corresponding Tailwind class names as the value:

```typescript
const classNamesMap = {
  primary: "bg-blue-500 text-white",
  secondary: "bg-gray-200 text-black",
  success: "bg-green-500 text-white",
};
```

The benefit of this approach is that we don't need to parse in all of these class names every time we want to style our button. Instead, we can simply parse in the variant:

```typescript
type ButtonProps = {
  variant: "primary" | "secondary" | "success";
};

export const Button = (props: ButtonProps) => {
  return <button className={classNamesMap[props.variant]}>Click me</button>;
};
```

With this setup, we can get autocomplete for all our variants, which certainly improves our efficiency.

However, there's a small issue with this approach.

We have `primary`, `secondary`, and `success` defined in the class names map, but they're also typed in the `variant`.

This redundancy is not causing any errors, but it would be great if we could streamline this.

## Challenge
Your challenge is to refactor `ButtonProps` so that it's automatically synchronized with `classNamesMap` without having to manually update the type.

In order to solve this, you will need to turn the runtime value into a type.

This way, when we add a new variant to the `classNamesMap`, it will automatically flow down into the button component.

Hint: You will need to make use of `typeof` and `keyof`!

## Transcript
00:00 In this exercise, we have a class names map here, and this class names map basically takes in a variant as the key and returns a bunch of Tailwind class names as the value here. And what we're doing here is in some button props, or this button component here,

00:18 we're basically mapping the class names map with props.variant, meaning we don't need to parse in all of these class names every time, we can just parse in the variant. So that means down here that we can get autocomplete for all of our variants, which is very, very nice. But it also means that we don't need to parse in these class names every time.

00:37 But there's something that's a little bit dodgy here. We have primary, secondary and success up here in the class names map, but we also have it typed down here in the variant. And this works, there's no errors here, but wouldn't it be great if you could actually rearrange this

00:54 so you don't have to manually sync all of the types? Now, there is a method to do it, and it's going to involve turning this runtime value into a type. So when we add a new one up here, it will just automatically flow down into the button component below. You'll need typeof and keyof,

01:13 and it just involves changing this type here. I think I've given you enough hint for you to get started. Good luck.

# Solution: The `keyof typeof` Pattern

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/04-advanced-props/29-variants-with-classnames.solution.tsx

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/04-advanced-props/29-variants-with-classnames.solution.tsx)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=88536420-6377-4b58-ac1f-de787bf417dd&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0802-syncing-types-without-manual-updates-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=88536420-6377-4b58-ac1f-de787bf417dd&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0802-syncing-types-without-manual-updates-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
The solution is to turn `classNamesMap` into a type and derive its keys from there.

Before we do this, let's look at an example of the process in action.

## Using `typeOf` to Derive Types from Variables

```typescript
type Example = typeof classNamesMap;
```

In TypeScript, `typeof` acts like a function on the type level, which is different than how it works in JavaScript.

When using `typeof`, the thing on the right-hand side is inferred, and a type of what that thing has been inferred to be is returned.

For instance, when we hover over `ClassNamesMap`, we can see it has `primary`, `secondary`, and `success` keys.

Then if we hover over `Example`, we get the same readout as when we hovered over `ClassNamesMap`.

```typescript
// hover over ClassNamesMap
const classNamesMap = {
  primary: string;
  secondary: string;
  success: string;
};

// hover over Example
type Example = {
  primary: string;
  secondary: string;
  success: string;
};
```

Essentially, `typeOf` takes what TypeScript infers that variable to be and turns it into a type.

In order to use this information, we need to use `keyOf`.

## Extracting Keys with `keyOf`
By adding `keyof` in front of `typeof`, we can extract the keys from `classNamesMap`.

Let's rename the `Example` to `ClassNamesMapType` to make things clearer. Then we will create a new `Variant` type to hold the keys.

```typescript
type ClassNamesMapType = typeof classNamesMap;

type Variant = keyof ClassNamesMapType;
```

Now we can access the `Variant` inside of `ButtonProps`:

```typescript
type ButtonProps = {
  variant: Variant;
};
```

## Using `keyof typeof` to Derive Types from Variables
Another option would be to skip the intermediate type and just use `keyof typeof` directly:

```typescript
type ButtonProps = {
  variant: keyof typeof classNamesMap;
};
```

Just like that, we get `primary` or `secondary` or `success` as our keys. If we add a new entry to our map, it will show up automatically.

This is the solution we've been looking for. It's neat, it's efficient, and it makes it so we can have data structures that infer all the way down.

We have our `ClassNamesMap` as the source of truth, and the props, the actual behavior, can be inferred from the runtime behavior. This makes everything solid and means we're not needing to keep updating types all over the place.

This pattern is extremely useful, and we're just scratching the surface of its potential!
## Transcript
00:00 The solution here then is to turn ClassNamesMap into a type and derive its key from there. Let's just check this out first. So let's say we've got typeExample equals typeOf ClassNamesMap. Now this typeOf you may have seen before in JavaScript and you're thinking, what's it doing here?

00:17 Well it's actually doing something different from what you're used to. On the type level, typeOf actually acts like a function. It takes in the thing on the right hand side and returns a type of what that thing has been inferred to. So if you hover over ClassNamesMap, you can see that it has primary, secondary, and success here.

00:36 And if you hover over example, it's exactly the same readout as when we hovered over this. So this basically just takes what TypeScript understands that variable to be and turns it into a type. So now, how do we take the key of that? How do we get primary, secondary, and success? How do we get this from this?

00:55 Well, what we do is we just say keyOf. So keyOf typeOf. It's not the other way around. It's not typeOf keyOf. Because typeOf keyOf makes no sense because the thing to the right hand side of typeOf needs to be a runtime variable. So we're basically saying keyOf typeOf ClassNamesMap.

01:13 We could even just extract this into its own type here, ClassNamesMap type. And then type keys equals keyOf ClassNamesMap type. Can't type. There we go. Now these keys then are primary or secondary or success.

01:32 And if we add a new one here, like something, let's just give it an empty one, this is going to be added here too. So something is there now there. Beautiful stuff. So how do we then use it? Well, we can just stick this down here. So we can say variant is keys here. And let's actually rename this something more sensible to variant there.

01:50 And we don't need to do this kind of like all of this song and dance, like declaring all of these separate types. We can literally just delete all that and just say keyOf typeOf ClassNamesMap. And that is the solution. And it's really, really pretty. And it means that you can just have these data structures that just infer all the way down.

02:10 You have actually just your ClassNamesMap, which is your source of truth, the thing that's happening at runtime. And then the props, the actual behavior can be inferred from the runtime behavior. It makes everything really, really nice and solid. And it means that you're not needing to update types all over the place.

02:27 This pattern is so, so useful and we're really just getting started with it.

# 9. The Partial Autocompletion Quirk

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/04-advanced-props/30-partial-autocomplete.problem.tsx

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/04-advanced-props/30-partial-autocomplete.problem.tsx)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=acc96c3b-08d1-46da-9baa-2c4f1f2f00e3&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0901-the-partial-autocompletion-quirk-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=acc96c3b-08d1-46da-9baa-2c4f1f2f00e3&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0901-the-partial-autocompletion-quirk-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Icon Component Exercise: Loose Size Prop
In this exercise, we're working with an `icon component`. This component accepts a `size` prop, which we're referring to as a `LooseSize`. This `LooseSize` can be either a `size` or a `String`.

```typescript
type LooseSize = Size | string;

export const Icon = (props: { size: LooseSize }) => {
   ...
```

The `Size` is a type that we're deriving from `presetSizes`, which are basically aliases for `0.5 rem` and `1 rem`.

We're using the `keyof typeof` technique to derive the type from this, similar to what we've looked at previously.

```typescript
const presetSizes = {
  xs: "0.5rem",
  sm: "1rem",
};

type Size = keyof typeof presetSizes;
```

This implementation allows us to either pass in `Size` or a `string`, and it's working as expected.

However, you might notice a little hiccup where we need to pass `as` to it because TypeScript isn't quite understanding that `props.size` is `size`. But don't worry, this is okay and you don't need to change this to complete the exercise.

```typescript
export const Icon = (props: { size: LooseSize }) => {
  return (
    <div
      style={{
        width:
          props.size in presetSizes
            ? presetSizes[
                /**
                 * The 'as' is necessary here because TS can't seem to narrow
                 * props.size to Size properly
                 */
                props.size as Size
              ]
            : props.size,
      }}
    />
  );
};
```

## Challenge
The problem with this current implementation is that the autocomplete for `sm` and `xs` sizes is not working as expected:

```typescript
<Icon size="sm"></Icon>
<Icon size="xs"></Icon>
```

We can still pass in any string, which is good, but it's not behaving the way we want it to.

Your task in this exercise is to find a type for `LooseSize` that will make the autocomplete work and make sense.

As a warning, this is a really hard exercise!

So, take your time, experiment with different solutions, but don't be discouraged if you can't figure it out!

## Transcript
00:00 In this exercise we have a icon component here. And the icon component takes in a single prop, which is size. And size here is loose size, which is size or string. OK, well, what is size? So size is basically a type here that we're deriving from preset sizes.

00:19 Now, these preset sizes are basically just sort of like aliases over the top of 0.5 rem, 1 rem here. And we're using key of type of just like in the kind of exercise we've already seen to derive the type from this. This means then that we should be able to either pass in size or pass in a string. And this is working.

00:39 There's a funny little bit here where we need to pass an as to it because TypeScript isn't quite understanding that props.size is size. But it's absolutely fine. And you don't need to change this in order to make the exercise work. The thing that's sort of breaking, though, is that autocomplete for SM and XS are no longer working.

00:59 So inside here, SM is like we're not getting the options that are possible for this here. And we're not getting options for this either for XS. We can still pass in any string, which is really nice, but it's not actually behaving in the way that we want to.

01:15 So your job here is to try to find a type for loose size here that is actually going to make it work and make sense. Now, this exercise is really hard, and it's actually probably if you're just trying to like work it out yourself, it's probably not possible to work it out yourself.

01:34 So feel free to have a go and feel free to like try a few things and then see what the solution is, because the solution is pretty crazy.

# Solution: Solving Partial Autocompletion

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/04-advanced-props/30-partial-autocomplete.solution.tsx

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/04-advanced-props/30-partial-autocomplete.solution.tsx)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=59f21fb9-ca97-476d-a870-578be81fa125&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0902-the-partial-autocompletion-quirk-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=59f21fb9-ca97-476d-a870-578be81fa125&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0902-the-partial-autocompletion-quirk-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
The solution is to wrap `string` in parentheses and intersect it with an empty object:

```typescript
type LooseSize = Size | (string & {});
```

Confused? You're not alone. Even I don't understand why this works, but it is the solution to the problem at hand.

Let's break it down.

We have our `Size` on one side and then by intersecting it with `string`, TypeScript somehow computes it so that `string` no longer gets in the way of `Size`.

```typescript
// hovering over `LooseSize`
type LooseSize = "xs" | "sm" | (string & {});
```

If we remove this intersection like in the exercise introduction, you'll notice that `Size` is just inferred as a string.

```typescript
type LooseSize = Size | string;

// hovering over `LooseSize`
type LooseSize = string;
```

I think that somewhere in the compiler it's saying, "Let's eagerly compute this before we even show it to the developers so that we get the autocomplete options."

Adding the intersection delays the computation of the string, which means it's just in time to show us the autocomplete for `sm` or `xs` is available.

## Diving into the React Types
We can see this same solution [inside of the React types](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/3d5f320ea82cfb2077687560927df712c0da9f9d/types/react/index.d.ts#L1911). If we take a look at the `AriaRole` type, we can see that it accepts any string while giving us nice autocomplete options.

```typescript
// Inside the ARIA Roles in the React Types
| 'tree'
| 'treegrid'
| 'treeitem'
| (string & {});
```

There are all of the built-in roles, and then there's this intersection with `string` and an empty object to allow us to pass in any string.

## This Solution is Here to Stay
In addition to being used inside of the React types, this unusual solution has been integrated into actual codebases.

The TypeScript team tests its version of TypeScript against almost everything in the community, and ensures a broad range of compatibility.

This is an incredibly smart solution, though I do find myself wishing for it to be a bit more intrinsic or at least more aesthetically pleasing.

I look forward to a time when I'll be able to revisit this and make some modifications, transitioning it to the new and fancy syntax that's been making the rounds. But for the time being, this current syntax is the way to go.

## Transcript
00:00 You want to see the solution? The solution is to wrap this in parentheses, then take an and and intersect it with an empty object. What? How? Why would this possibly work? Well,

00:16 I have no idea why it works, but this is the accepted solution to this problem. What's going on here is that we have our size on one side and then by intersecting it with a string, it somehow computes it so that string no longer gets in the way of size. Because

00:31 if we remove this, you'll notice that actually this loose size is just inferred as string here. Whereas if you do this, then it computes it just enough so that it retains the other members of the union while still having this little section here kind of separated from

00:48 that. So by having this, it means that, okay, we're not going to compute the string just yet and that means it's just in time so that when the autocomplete comes in, the SM or XS is still available for the TypeScript server to show us. It's really strange. I think there

01:04 must be something happening in the compiler that's saying like eagerly compute this before we even show it to the people so that we get the autocomplete options and this prevents that. So this is the accepted solution. There is also, I think, in React itself, if we dive

01:19 into these types, if we take a look, there is a, and yeah, just here, which is in the ARIA role type at the top here. So for ARIA role, you can pass in alert, alert, dialogue, all this stuff and string and this. So it also accepts any string while giving us nice

01:36 autocomplete there. So this is a really, really, really strange quirk of TypeScript and certainly like TypeScript and prop types, but this is the accepted solution that's been adopted by the community and it's not going to break anytime soon because this has made its way

01:52 into actual code bases as you can see and the TypeScript team actually tests its version of TypeScript against every, almost everything in the community. It's a really smart testing system so this syntax is not going away, but I sort of wish they would make it kind of intrinsic or maybe a little bit prettier. So who knows, maybe sometime in the future

02:11 I'll be able to revisit this and actually change this out so that it's using the new

02:15 fancy syntax. But for now, this is the way to do it.

# 10. Extracting Keys and Values from a Type

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/04-advanced-props/31-as-const.problem.ts

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/04-advanced-props/31-as-const.problem.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=9e1b87e5-39cc-42a5-82be-0a068dd7bd2b&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="1001-extracting-keys-and-values-from-a-type-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=9e1b87e5-39cc-42a5-82be-0a068dd7bd2b&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="1001-extracting-keys-and-values-from-a-type-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
Let's take a break from props and delve into the realm of TypeScript types.

Here we have a `BACKEND_TO_FRONTEND_STATUS_MAP`, where the backend status is represented by numeric keys, and the frontend status represented by string values for `"pending"`, `"success"`, and `"error"`.

```typescript
const BACKEND_TO_FRONTEND_STATUS_MAP = {
  0: "pending",
  1: "success",
  2: "error",
};
```

However, the code on the frontend is using a string union as seen in the test cases:

```typescript
type BackendStatus = unknown;
type FrontendStatus = unknown;

// Errors!
type test = [
  Expect<Equal<BackendStatus, 0 | 1 | 2>>,
  Expect<Equal<FrontendStatus, "pending" | "success" | "error">>
];
```

## Challenge
The task at hand is to extract the statuses into types to that `BackendStatus` to be `0 | 1 | 2` (which are the keys), and our `FrontendStatus` to be `"pending" | "success" | "error"`.

There are a couple things to work though to get there.

Currently, our `BACKEND_TO_FRONTEND_STATUS_MAP` only shows strings for each key. It's not inferring `"pending"`, `"success"`, and `"error"` as we want it to. So, we'll need to transform it into a type that can infer these values.

```typescript
// hovering over `BACKEND_TO_FRONTEND_STATUS_MAP`
const BACKEND_TO_FRONTEND_STATUS_MAP: {
    0: string;
    1: string;
    2: string;
}
```

Once you have a suitable type, you will then need to extract the values from it.

To tackle these challenges, we have a couple of useful tools at our disposal:

You've already got some practice with the `keyof typeof` technique. The `as const` construct might be of help in treating the map as a constant, which would allowing TypeScript to infer more precise types. You should also look into the indexed access type, which allows you to access the type of a property at a specific index.

_Check out_ [_the Unions & Indexing module of the Type Transformations workshop_](https://www.totaltypescript.com/workshops/type-transformations) _for more on indexed access types._

## Transcript
00:00 In this exercise, we're going to leave the world of props for a minute. We have a backend to frontend status map here, where on the keys, we have the backend status, which is like 0, 1, and 2. But on the frontend, we've decided to use a string enum or a string union

00:16 instead of this, where we've got pending success and error here. So what we want to do is we want to extract these out into types using the kind of key of type of technique that we've seen before. We want backend status to be 0 or 1 or 2, which is these keys,

00:33 and we want the frontend status to be pending or success or error. But we've got a few problems before we even get there. We know that we're going to need to turn this into a type, but backend to frontend status map currently just is string, string, string. It's not actually inferring pending success and error here.

00:51 So you're going to need to find a way to transform this into something that we can even grab pending success and error from. Then you're going to need to find a way to extract out from that type something like we're going to need to grab the values of that type because we know how to grab the keys, but how do you grab the values?

01:10 There's going to be a couple of interesting little things below which are going to help. I think as const will help. And you're also going to need to investigate something called indexed access types. So quite a lot in this very small exercise. Good luck.

# Solution: Using `as const` and Indexed Access Types to Extract Keys and Values from a Type

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/04-advanced-props/31-as-const.solution.ts

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/04-advanced-props/31-as-const.solution.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=59432e4f-6ac6-491c-8493-4fbf9b51a336&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="1002-extracting-keys-and-values-from-a-type-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=59432e4f-6ac6-491c-8493-4fbf9b51a336&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="1002-extracting-keys-and-values-from-a-type-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
Let's work through the solution step-by-step.

## Updating `BackendStatus`
First we need to update `BackendStatus` so we get the value of the keys. We can do this by using `keyof typeof` to extract the keys from `BACKEND_TO_FRONTEND_STATUS_MAP`:

```typescript
type BackendStatus = keyof typeof BACKEND_TO_FRONTEND_STATUS_MAP;
```

Now we can see `0 | 1 | 2` as the type for `BackendStatus` when hovering over it, and the first test passes.

Next we need to update `FrontendStatus`, but there's a problem to be solved first.

## Inferring Values from the Map
Currently, the `BACKEND_TO_FRONTEND_STATUS_MAP` only shows `strings` for each key. It's not inferring `"pending"`, `"success"`, and `"error"` as we want it to.

The reason for this is that TypeScript is quite intelligent about how it infers these things. The properties of `BACKEND_TO_FRONTEND_STATUS_MAP` can actually be changed or mutated. This is simply how JavaScript works.

```typescript
BACKEND_TO_FRONTEND_STATUS_MAP[0] = "something else";
```

### Preventing Mutations with `Object.freeze`
We can prevent the map from being mutated by using JavaScript's `Object.freeze` method:

```typescript
const BACKEND_TO_FRONTEND_STATUS_MAP = Object.freeze({
  0: "pending",
  1: "success",
  2: "error",
});
```

Now, TypeScript recognizes that the properties are read-only, and it infers `pending`, `success`, and `error`. We can no longer modify these properties because they are read-only.

However, I wouldn't recommend this approach because it operates at the runtime level.

There's a better way to do this, which prevents mutation at the type level.

### Treat the Map as a Constant
We can use `as const` to treat the map as a constant, which allows TypeScript to infer more precise types.

```typescript
const BACKEND_TO_FRONTEND_STATUS_MAP = {
  0: "pending",
  1: "success",
  2: "error",
} as const;
```

Using `as const` ensures that the object won't change. It's a deep constant, which implies that every property within the object is immutable. In contrast, `Object.freeze` only freezes the top level properties.

When hovering over `BACKEND_TO_FRONTEND_STATUS_MAP`, we can see that the properties are now read-only:

```typescript
// Hovering over `BACKEND_TO_FRONTEND_STATUS_MAP`
const BACKEND_TO_FRONTEND_STATUS_MAP: {
    readonly 0: "pending";
    readonly 1: "success";
    readonly 2: "error";
}
```

Now that we have values being inferred, we need to access them.

## Using Indexed Access Types to Extract Values
Indexed access types allow us to access the type of a property at a specific index.

For clarity, let's create a new `BackendStatusMap` type set to the type of `BACKEND_TO_FRONTEND_STATUS_MAP`:

```typescript
type BackendStatusMap = typeof BACKEND_TO_FRONTEND_STATUS_MAP;
type BackendStatus = keyof BackendStatusMap;
```

Then for `FrontendStatus` we can use the indexed access type to extract the value from our `BackendStatusMap` type by using square brackets:

```typescript
type FrontendStatus = BackendStatusMap["0"] |
                      BackendStatusMap["1"] |
                      BackendStatusMap["2"];
```

This works and our second test passes, but it's not exactly elegant.

One option would be to use a union to extract multiple values from our `BackendStatusMap`:

```typescript
type FrontendStatus = BackendStatusMap["0" | "1" | "2"];
```

This has less repetition, but it's still not ideal since we're hardcoding each key individually.

The best solution is to just pass in `BackendStatus` directly:

```typescript
type FrontendStatus = BackendStatusMap[BackendStatus];
```

This is a much cleaner solution, and it's also more flexible. If we were to add a new key to `BACKEND_TO_FRONTEND_STATUS_MAP`, we wouldn't need to update `FrontendStatus` because it's already being derived from `BackendStatus`.

Using `as const`, `keyof`, and `typeof` is a great combination for extracting keys and values from a type.

## Transcript
00:00 Okay, let's do this. We know that we can extract the keys for this backend status. This is gonna be relatively easy because if we hover over this, you can see that all of the information that we need is there, 0, 1, 2. We can actually use a technique that we've seen before. Key of, type of, backend to frontend status map. Now backend status, boom.

00:19 First test passing, this is great. But how do we grab the pending success and error information from this? Because it's not even being inferred here. Now the reason this is not being inferred here is because TypeScript is actually being very smart about the way that it's inferring this.

00:36 These can actually be mutated. So if we say backend to frontend status map, 0, we can just change it to something else because this is how JavaScript works, right? Like this further down line could just be mutated into some strange thing. But we could change that.

00:53 We could actually make this read-only if we want to. We can do that on the runtime level if we want to. We can say object.freeze here, which is just something that's available in JavaScript. And now TypeScript understands that this is actually read-only and it's got pending success and error inferred here.

01:12 And we can no longer change it because it's a read-only property. This though is not what I recommend because this actually operates on the runtime level. Wouldn't it be great if there was a type-only way that we could do this? Well, there is, and it's called as const. So this is you saying to TypeScript

01:30 that this object that I'm declaring here is not going to change. It's a deep constant. And it means that anything that you put in here can not be changed at all. Whereas actually object.freeze only works on the top level. So here what we've got cannot assign to zero because it's a read-only property.

01:48 We hover over this and we've got read-only zero pending read-only one success, read-only two error. Beautiful. So now we've actually got all of the inference that we need and we can actually take this and grab our success pending or error. But how are we going to do that? Well, we can use something called an indexed access type.

02:08 So let me grab this out into its own type just for clarity. Let's go type backend status map equals type of backend blah, blah, blah, blah, blah, blah. Can't talk and type at the same time apparently. There we go. Backend status map. Now we've got this grabbed out as a type

02:25 and we can actually do key or backend status map here. That's lovely. Now frontend status, this is going to be backend status map. And ideally what we want to do is kind of index into it and grab out a type from in there. And we can do that via an indexed access type.

02:44 So we can actually grab, this is now pending because we're grabbing zero from backend status map. So in order to grab success or error, we could do a union here, right? We could do backend status map one or backend status map two. And now it's kind of working, but this is pretty horrible.

03:03 Wouldn't it be great if there was a way that we could actually like just grab all of them? Like we can actually reduce this a little bit already because you can actually pass in a union into this member here. This is why it uses this syntax instead of let's say like this, for instance, because it's just a little bit nicer.

03:21 So what we can do is we can actually grab one and two inside here, and we can actually pull those into there. And now frontend status is pending success or error. If we only grabbed zero and one, then it would just be pending and success there. But because we're passing all of them in,

03:42 then we could do that. But we've got backend status right here. So why don't we just take backend status and put it inside there and see what happens. Backend status. Ooh, now what we've got, is it still pending or success or error? Because the way that these keys work, by the way,

04:01 is you can either index into them with a number, if it's a numeric key, or a string representation of that number, because this is how JavaScript works as well. It's slightly funky. But essentially what we've got here then is we've got backend status. We're using each of these to index into backend status map,

04:20 which is then returning each member of that union in there. We could also do backend status or two, and this would be an error actually, or it should, oh no, sorry, or three. And this would be an error because three does not exist on this object here, unless we were to add it, let's say. But this is so, so nice, because as you can see,

04:40 not only are we deriving the type of backend status map and deriving backend status, we're then using that to transform the frontend status there and grab that out. So it means then that going forward, we don't need to edit any of this code. This code is just automatically computing

04:58 the types of frontend status and backend status just by what we add up here. So this is by using as const, we get to do this, and we can also use an index access type to grab all of the values of our object here. So, so nice.

# 11. Ensuring Correct Inference for Prop Types

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/04-advanced-props/32-satisfies-vs-annotation-vs-as.problem.tsx

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/04-advanced-props/32-satisfies-vs-annotation-vs-as.problem.tsx)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=841d4f14-fcd1-4761-9ddc-df6f229b337c&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="1101-ensuring-correct-inference-for-prop-types-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=841d4f14-fcd1-4761-9ddc-df6f229b337c&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="1101-ensuring-correct-inference-for-prop-types-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
In this exercise, we're dealing with a TypeScript issue involving the `buttonProps` object.

This object has a `type` of `"button"` and also contains an `illegalProperty`.

```typescript
const buttonProps = {
  type: "button";
  // @ts-expect-error   (not currently an error)
  illegalProperty: string;
};
```

The `buttonProps` are being spread into a button, and there's an error as seen in the test:

```typescript
// button has an error
<>
  <button {...buttonProps}>Click Me!</button>
</>

const buttonPropType = buttonProps.type;

// The test case is failing
type test = Expect<Equal<typeof buttonPropType, "button">>;
```

Here's the full error message when hovering over `button`:

```typescript
Type '{ children: string; type: string; illegalProperty: string; }' is not assignable to type 'DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>'. 

Type '{ children: string; type: string; illegalProperty: string; }' is not assignable to type 'ButtonHTMLAttributes<HTMLButtonElement>'. 

Types of property 'type' are incompatible. 

Type 'string' is not assignable to type '"button" | "submit" | "reset" | undefined'.

(property) JSX.IntrinsicElements.button: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
```

## Challenge
Your challenge is to diagnose and fix the errors in this code.

You need to ensure that the `buttonPropType` at the bottom is inferred only as `button`, instead of `button | submit | reset`. The `@ts-expect-error` should have its red underline go away, and the test case should pass.

Make sure to pay attention to the error message, as it contains useful information for resolving the issue!

There are multiple ways to approach this problem. However, be aware that only one solution will completely resolve all of the issues. Adding a small helper function at the top of the code might be useful.

Hint: The best solution involves a keyword we haven't looked at yet, so make sure to check out the additional resources!

We'll walk through all of the different potential solutions in the next video.

## Transcript
00:00 For this exercise, we have a ButtonProps object here with a type of button and an illegal property and we are spreading that button or these ButtonProps into this button here. There is a massive error that's happening here and I'd like you to try and diagnose the error to try and figure out what's going on.

00:17 Make sure you read towards the end of the error because that's probably where the actual useful stuff is going to be. And we're also looking here to make sure that ButtonPropType down the bottom is inferred as button, not string or not button or submit or reset, just literally button.

00:35 So that's your job and there's a few things that you're going to be able to try here. There's actually maybe like four different solutions but only one of them actually works completely because we want to make sure that this property is erroring because we're actually expecting an error in there.

00:52 We want to make sure this error goes away and we want to make sure this is being inferred as literally button. So there's also a little helper up there which might end up being useful. There's going to be a new keyword actually in the solution that we've not covered before. So make sure you check in the resources below just to get some hints if you need them.

01:11 And I'll walk through all of the different potential ways you could solve this problem in the solution.

01:16 Good luck!

# Solution: Comparing `as const`, `as`, and `satisfies`

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/04-advanced-props/32-satisfies-vs-annotation-vs-as.solution.tsx

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/04-advanced-props/32-satisfies-vs-annotation-vs-as.solution.tsx)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=74b00555-2a88-4e04-9440-94bd8cd08ce9&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="1102-ensuring-correct-inference-for-prop-types-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=74b00555-2a88-4e04-9440-94bd8cd08ce9&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="1102-ensuring-correct-inference-for-prop-types-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
Let's start by fixing the error where `buttonProps` was being inferred as a `string` which is not assignable to `button`, `submit`, or `reset`.

## A First Attempt with `as const`
As we've seen before, using `as const` will allow us to infer this properly.

```typescript
const buttonProps = {
  type: "button",
  // @ts-expect-error
  illegalProperty: "I AM ILLEGAL",
} as const;
```

With this change in place, the `buttonPropType` is now being inferred as `"button"`, which is what we want:

```typescript
const buttonPropType = buttonProps.type;

// hovering shows
const buttonPropType: "button"
```

We've rectified the error that was occurring because the type of the property `type` was incompatible.

The inference is working, but we don't have autocomplete inside of `buttonProps` and the `@ts-expect-error` is not working as it should.

## Typing the `buttonProps` Object with `ComponentProps`
Let's consider another approach, where we'll type `buttonProps` with the `ComponentProps` helper from React:

```typescript
const buttonProps: ComponentProps<'button'> = {
  type: "button",
  // @ts-expect-error
  illegalProperty: "I AM ILLEGAL",
};
```

Now the `buttonProps` will contain all of the component props of a `button` as seen when we hover over it:

```typescript
// hovering over `buttonProps`
const buttonProps: React.DetailHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
```

We get autocomplete on all of the possible properties, and the `illegalProperty` is now being flagged as an error since it's not a valid property.

However, this approach isn't perfect. Because all of the possible types of `button` are being inferred, we can access things on `buttonProps` beyond what we've declared.

While this approach might work, it's not necessarily the best solution.

## Typing with `as` and `ComponentProps`
Another potential solution is to use `as ComponentProps<'button'>`. This fixes one error, but doesn't alert us to the `illegalProperty` error:

```typescript
const buttonProps = {
  type: "button",
  // This should be erroring! Why isn't it?
  illegalProperty: "I AM ILLEGAL",
} as ComponentProps<'button'>;
```

The error isn't being caught because the `as` keyword does not validate properties on the `buttonProps` object. Instead, the `as` keyword performs a type transformation, so the `illegalProperty` is passed in without being checked.

This could be seen as a cheeky way to assign this property, but it can lead to potential issues due to its permissive nature.

## Using `satisfies` to Validate Type Contracts
We still need a way to ensure that `buttonProps` satisfies a type contract without forcing it to be that contract outright.

This is where `satisfies` comes in.

The `satisfies` keyword validates that `buttonProps` aligns with a certain type:

```typescript
const buttonProps = {
  type: "button",
  // @ts-expect-error
  illegalProperty: "I AM ILLEGAL",
} satisfies ComponentProps<'button'>;
```

This approach is clever enough to understand that the type `button` can only be of certain elements, so it won't allow us to pass anything illegal.

It correctly infers the type without us needing to use `as const`, so we get autocomplete for all of the possible properties.

However, it's smart enough to not override the type itself. When we hover over `buttonProps.type`, we'll see only what we specified:

```typescript
const buttonPropType = buttonProps.type;

// hovering shows
const buttonPropType: {
  type: "button";
  illegalProperty: string;  
}
```

This is the best solution.

## A Last Word About `satifies`
It's important to understand how `satisfies` fits into the TypeScript landscape, particularly in comparison to the normal annotation operator and `as const`.

The `satisfies` keyword in TypeScript isn't necessarily the default go-to for every situation, but it really shines in certain scenarios.

In this case, we wanted to ensure that `buttonProps` is of a specific type, while at the same time not allowing access to properties that might not be defined. The `satisfies` so smart is its ability to handle these types of situations with ease.

## Transcript
00:00 Okay, let's take a look. The first thing I want to take a look at is actually this button prop type down the bottom here. This is being inferred as string. We know that we can change that by making this an as const, because as const here actually freezes this type of button, and it means that we can actually infer this properly.

00:18 This actually means here that button props now works because the error that was happening was because this button, the type of the property type is incompatible. Type string, which is what it was being inferred as, is not assignable to button or submit or reset. So what we kind of want to do here

00:37 is we can just add as const, then that error goes away, and this means that this is being inferred as button, but we're not getting any kind of erroring or even any autocomplete inside these button props. So what you kind of want to do, or what like my first instinct would be, is actually to remove the as const

00:57 and type this as component props button, because what this is going to do is it's going to actually make this button props, the component props of a button. It means that inside here, we're going to get all of the autocomplete that we want in order to actually make these props work, and this illegal property is going to error

01:15 because illegal property does not exist on button props, but this means actually the button prop type here, it's actually being inferred as all of the possible types of that button. And you can actually go inside here and like access things that aren't even on this button props that we've actually declared here.

01:35 So this is like less of a good solution. Another way you could potentially think to do it is you could actually do using as here, and you could say as component props button. Let's just try this briefly. And what's going on here now is, let me just add this semicolon to the end. You might think, okay, this is working fine,

01:53 but actually there's no error here because as actually does a transformation. It doesn't really like validate the thing that's on the button props. And this illegal property is actually allowed to pass into the as without being checked. So as is kind of like the most cheaty,

02:11 cheeky way of possibly assigning this property. And it lets you do kind of illegal things here. So I'm going to ditch as completely. But what if there was a way that we could ensure that button props sort of satisfies a contract without actually overriding it and forcing it to be that contract?

02:30 Well, we can use satisfies. Now satisfies, what it's doing is it's making sure that button props validates this type. So illegal property is erroring here, and it's going to give us autocomplete on all of these elements. But it's also going to not override the type itself. This means that button props

02:48 is actually just what we've specified here. And you notice that because it's clever enough to understand that type button can only be of those elements, we actually can't pass in anything illegal up here, not assignable to type button or submit or reset or undefined. It's actually properly inferring the type there without us needing to use as const.

03:07 So this is the solution here. Satisfies shouldn't be necessarily your default, but it's really great in situations where you just want to make sure that button props is of a certain type, but you don't want to allow access to things that might not be defined on there. And it's really, really smart for doing a lot of this kind of thing.

03:25 And I wanted to cover it just to give you some clarity over where it sits in comparison to this sort of normal annotation operator

03:33 and as, and also with as const too.

# 12. Inference from a Single Source of Truth

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/04-advanced-props/33-prop-groups-with-variants.problem.tsx

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/04-advanced-props/33-prop-groups-with-variants.problem.tsx)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=46102ea3-0204-48f6-9100-dd31b7cf22b5&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="1201-inference-from-a-single-source-of-truth-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=46102ea3-0204-48f6-9100-dd31b7cf22b5&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="1201-inference-from-a-single-source-of-truth-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
In this exercise, we're going to bring together several of the TypeScript concepts that we've seen so far.

Here we've got a `buttonPropsMap` object, which contains various button variants organized into three categories: `reset`, `submit`, and `next`:

```typescript
const buttonPropsMap = {
  reset: {
    className: "bg-blue-500 text-white",
    type: "reset",
    // @ts-expect-error
    illegalProperty: "whatever",
  },
  submit: {
    className: "bg-gray-200 text-black",
    type: "submit",
    // @ts-expect-error
    illegalProperty: "whatever",
  },
  next: {
    className: "bg-green-500 text-white",
    type: "button",
    // @ts-expect-error
    illegalProperty: "whatever",
  },
};
```

These variants are then incorporated into a `ButtonProps` type by using `keyof typeof`:

```typescript
type ButtonProps = {
  variant: keyof typeof buttonPropsMap;
};
```

However, we have an error on `button` where the types don't seem to be correctly assigned:

```typescript
const Button = (props: ButtonProps) => {
  return <button {...buttonPropsMap[props.variant]}>Click me</button>;
};
```

The error message is really long, but it's going to be helpful for us to understand what's going on:

```typescript
Type '{ 
  children: string; 
  className: string; 
  type: string; 
  illegalProperty: string; 
} | { 
  children: string; 
  className: string; 
  type: string; 
  illegalProperty: string; 
} | { 
  children: string; 
  className: string; 
  type: string; 
  illegalProperty: string; 
}' is not assignable to type 'DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>'.

Type '{ 
  children: string; 
  className: string; 
  type: string; 
  illegalProperty: string; 
}' is not assignable to type 'DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>'.

Type '{ 
  children: string; 
  className: string; 
  type: string; 
  illegalProperty: string; 
}' is not assignable to type 'ButtonHTMLAttributes<HTMLButtonElement>'.

Types of property 'type' are incompatible. 

Type 'string' is not assignable to type '"button" | "submit" | "reset" | undefined'. ts(2322)
```

## Challenge
Your task is to identify and resolve this error by using `ComponentProps` and other techniques we've seen so far.

The categorization of `next`, `reset`, and `submit` buttons should be maintained, and any illegal properties need to show errors. You should also be able to autocomplete properties as expected.

## Transcript
00:00 In this exercise, we're combining a few things that we've learned together. We have this button props map kind of object here, which has a bunch of different variants of buttons. So we have our reset button, our submit button and our next button, like in a multi-step form. And in our button props, we're taking that variance and we're putting them in here.

00:19 But there's an error kind of below here where we're not getting the right types in, it seems. So your job is to figure out what this error is. We also want to make sure we retain this kind of next reset and submit thing. And we want to make sure that these illegal properties start erroring.

00:38 So you're going to need to find a type, again, possibly using component props and using some other stuff that we've seen before, to type button props map correctly so that we get rid of these errors, get rid of this error, and we still get the nice autocomplete below.

# Solution: Understanding and Implementing Dynamic Props Mapping in React

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/04-advanced-props/33-prop-groups-with-variants.solution.tsx

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/04-advanced-props/33-prop-groups-with-variants.solution.tsx)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=cd333fdd-119b-4b67-8682-45e15c9abda9&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="1202-inference-from-a-single-source-of-truth-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=cd333fdd-119b-4b67-8682-45e15c9abda9&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="1202-inference-from-a-single-source-of-truth-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
First things first, we need to discern a type for our `buttonPropsMap`.

## Typing the `buttonPropsMap`
We'll define a type called `Map` which will be a `Record` with a `string` key and a value of `ComponentProps<"button">`.

```typescript
type Map = Record<string, ComponentProps<"button">>;
```

This `Map` type is essentially an index signature on an object, which is a string. Then the `React.DetailHTMLProps` represents the `button` props.

Now we can apply the `Map` type to our `buttonPropsMap`:

```typescript
const buttonPropsMap: Map = {
   ...
```

With this change, we're now getting autocomplete inside the `buttonPropsMap` and all of the illegal properties have disappeared.

However, there's a snag.

## Fixing the `variant` Error
Our `variant` has stopped working. It's being inferred as a string, instead of `reset`, `submit` or `next`:

```typescript
// inside the Parent component's return:

{/* @ts-expect-error */} // not erroring like it should!
<Button variant="something"></Button>
```

The key inside of the `Record` is actually crucial to understanding this issue.

Here's what we currently have:

```typescript
type Map = Record<string, ComponentProps<"button">>;
```

Manually specifying the keys for the variants would fix the issue:

```typescript
type Map = Record<"reset" | "submit" | "next", ComponentProps<"button">>;
```

However, this isn't a great solution because it the variants aren't actually being inferred, and they are specified in two different places since `buttonPropsMap` is being specified as the `Map` type while also containing the variants.

As we've seen before, the way to get around this is to use `satisfies`.

## Using `satisfies` to Ensure Correct Inference
We'll remove the annotation on `buttonPropsMap` and use `satisfies` instead. We also can remove the `Map` type and specify the `Record` directly:

```typescript
// before:
const buttonPropsMap: Map = {
   ...
}

// after:
const buttonPropsMap = {
   ...
} satisfies Record<string, ComponentProps<"button">>;
```

Using `satisfies` ensures that our `button` variant satisfies the `Record` without overriding the type.

This gives us the `reset`, `submit`, and `next` variants, and can be used in the component along with autocomplete:

```typescript
// hovering over buttonPropsMap

const buttonPropsMap: {
   reset: {
      className: string;
      type: "reset";
      illegalProperty: string;
   }
   ...
```

Using `satisfies` lets us avoid duplication by inferring everything from a single source of truth.

## Transcript
00:00 Okay, let's see if we can solve this. This button props map here, we need to first of all just figure out a type that would even represent what this is trying to do here. It's kind of like a record or a map where the keys are component props button. So let's try and figure that out first.

00:18 Let's say type map for instance, equals a record and let's say string and now component props button here. So we've got this map and this looks good. I mean, this is a pretty horrible readout, but this is essentially what it's doing. It's an index signature on this object, which is a string.

00:36 And this huge React detail HTML props is just essentially an interface here that represents the button props. So we've got our map. Let's now take that map and use it on our button props map. So we've got map down here and this is really great. We're now getting auto-complete inside here.

00:55 The illegal properties have disappeared and it all seems well. Now inside our button here, we've got button props map props.variant and this all seems good too. But there's something wrong here. There's a single error. And this single error is the key to understanding this exercise

01:13 because now our variant has stopped working. This variant here, key of type of button props map is being inferred as a string, not as reset, submit or next. So this string here, the key inside of record is actually kind of key to understanding this. So we've got this record.

01:32 Now record here, we could actually manually type this. We could say reset or we could say submit or we could say button down the bottom. And okay, this now works here. Or does it work? No, because I put next or put button instead of next. This works.

01:53 And it means now that the variants down the bottom are all working. We've got next, reset and submit. Yay! Except this variant is now kind of lame because or rather this setup is really lame because we now have reset, submit and next, but they're not being inferred.

02:12 We now have this duplicated in two places. Wouldn't it be great if we could infer one from the other? Well, there seems to be no way around this because it's kind of circular, right? This is being typed as map and this is being sort of typed before we even get to map. Well, there is a way around it. Let's put string back in here and we're going to take this

02:32 and we're going to actually just delete this annotation. And just like in another exercise in this section, we're going to use satisfies here. And satisfies, what it's going to do is it's actually going to make sure that it satisfies that record string component props while not overriding the type. Yes!

02:50 So now we get reset, submit and next. And we've got these two types inside here, which means that we can then use them later to figure out this variant down there, which is just perfect. So we've still got the autocompletes here. And it means now that if we add a new one to this,

03:08 then we're still going to get autocomplete in here too and it's still going to be inferred down. So this means satisfies is a really, really nice way when you combine it with key of type of to actually still retain the responsibility principle for your types, a single source of truth, while still making sure that you can get autocomplete

03:27 on that source of truth.

# (b) Using Generics with Components



# 1. DRY out Code with Generic Type Helpers

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/05-generics/34-type-helpers.problem.tsx

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/05-generics/34-type-helpers.problem.tsx)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=385728af-d6bd-4dbb-99e9-eeaffa6c367a&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0101-dry-out-code-with-generic-type-helpers-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=385728af-d6bd-4dbb-99e9-eeaffa6c367a&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0101-dry-out-code-with-generic-type-helpers-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Autocomplete Type Refactoring in TypeScript
In this exercise, we're going to revisit the loose autocomplete type concept we've seen before.

Here, we have a `LooseIcon` type, which is either an `Icon` or string and an empty object.

This setup provides us with autocomplete for `home`, `settings`, and `about` inside these icons. The same applies to button variants: `primary`, `secondary`, `tertiary`.

```typescript
type Icon = "home" | "settings" | "about";
type ButtonVariant = "primary" | "secondary" | "tertiary";

// How do we refactor this to make it DRY?
type LooseIcon = Icon | (string & {});
type LooseButtonVariant = ButtonVariant | (string & {});
```

So far, so good. But there's room for improvement.

We want to refactor this code to make it more DRY (Don't Repeat Yourself) and to clarify what's happening. After all, someone new to the code might find the current setup confusing.

```typescript
export const icons: LooseIcon[] = [
	"home",
	"settings",
	"about",
	"any-other-string",
	// I should get autocomplete if I add a new item here!
];

export const buttonVariants: LooseButtonVariant[] = [
	"primary",
	"secondary",
	"tertiary",
];
```

## Challenge
Your task is to wrap the icon and button variants in a new type helper that makes use of generics. You'll know it's working correctly when you get autocomplete on new items that are added.

Here are some resources to check out for help:

[

www.totaltypescript.com

https://www.totaltypescript.com/concepts/type-helpers

](https://www.totaltypescript.com/concepts/type-helpers)

[

www.totaltypescript.com

https://www.totaltypescript.com/workshops/type-transformations/type-helpers/introducing-type-helpers

](https://www.totaltypescript.com/workshops/type-transformations/type-helpers/introducing-type-helpers)

[

www.typescriptlang.org

https://www.typescriptlang.org/docs/handbook/2/generics.html

](https://www.typescriptlang.org/docs/handbook/2/generics.html)

## Transcript
00:00 In this exercise, we're going to revisit something that we've seen before, which is this loose autocomplete type here, where we have a loose icon type, which is the icon or string and empty object. The result of this is that we get autocomplete for about home and settings inside these icons here. The same is true for these button variants too,

00:19 we get primary, secondary, tertiary. So everything's working, everything's all fine, except we want to refactor this so that it's a little bit more dry, and so it's a little bit more obvious what's happening, because someone stumbling upon this code might look at this and go, what on earth is happening here? This looks terrifying to me.

00:37 So ideally, we would find a way to extract out this logic into some type function. I'm going to link some resources below on type helpers, because this is the primary thing we're looking at here. What I'd like you to do is I'd like you to wrap icon and button variants in a new type helper,

00:59 define that type helper, and use it to sort of capture this behavior inside it. So there we go. I've given you, I think, enough for you to get started, and make sure you dive into the TypeScript docs for this, and check out generics and generic types. Good luck.

# Solution: Implement a Generic Type Helper

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/05-generics/34-type-helpers.solution.tsx

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/05-generics/34-type-helpers.solution.tsx)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=1e3320c3-89b2-4168-a6fd-59adb59be6fb&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0102-dry-out-code-with-generic-type-helpers-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=1e3320c3-89b2-4168-a6fd-59adb59be6fb&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0102-dry-out-code-with-generic-type-helpers-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Creating a Type Helper
Let's start by declaring a type `LooseAutoComplete`, which accepts a type variable `T`.

```typescript
type LooseAutoComplete<T> = ...
```

The `<T>` indicates that `LooseAutoComplete` takes an argument of type `T`, kind of like a function.

For example, if we set `LooseAutoComplete` to the string "hello", then it will act like a function that takes in an input `T` and returns the string "hello".

```typescript
type LooseAutoComplete<T> = 'hello';

const looseAutoComplete = (t: any) => {
  return "hello";
}
```

In the above code, `LooseAutoComplete` is defined as a JavaScript function that takes in an input `T` (which we'll consider as `any` type for now), and returns the string 'hello'.

But what happens when we try to use `LooseAutoComplete` without passing any type arguments?

```typescript
type Example = LooseAutoComplete; // Error!
```

The above example will result in an error because `LooseAutoComplete` requires a type argument. That's why the term 'generic type' is used here.

In TypeScript, a generic type is a way of creating reusable components that can work over several types rather than a single one.

We can pass a type argument to `LooseAutoComplete` using the following syntax:

```typescript
type Example = LooseAutoComplete<123>;
```

In this case, `Example` will be 'hello', because that's what we're returning from the `LooseAutoComplete` type function.

# Capturing Logic in our Loose Autocomplete Helper
In order to capture logic inside of our `LooseAutoComplete` helper, we can update it to take in a type `T` and return the type `T`. Since we want to use `Icon`, we'll then update the `Example` to pass in an argument `Icon`.

```typescript
type LooseAutoComplete<T> = T;
type Example = LooseAutoComplete<Icon>;
```

Since the `Icon` type is `home`, `settings`, or `about`, when we hover over `Example` we can see that its type is a union of the `Icon` types.

We can extend the `LooseAutoComplete` type to include the `(string & {})` from the `LooseIcon` we started with.

Then we can update `LooseIcon` to be `LooseAutoComplete<Icon>`, and `LooseButtonVariant` to be `LooseAutoComplete<ButtonVariant>`

```typescript
type LooseIcon = LooseAutoComplete<Icon>;
type LooseButtonVariant = LooseAutoComplete<ButtonVariant>;
type LooseAutoComplete<T> = T | (string & {});
```

The pattern we've followed here is not just useful for capturing different types in different type functions, but it also offers a way to describe complicated setups while being much more readable that what we started with.

## Transcript
00:00 Okay, so the first thing we need to do is set up a type function which is going to capture this behavior. The way we can do that is by saying type loose autocomplete. That's going to be the name of this function. And we're going to give it a T here. Now, what are these brackets doing?

00:16 Well, these brackets are basically describing that this loose autocomplete takes in an argument of T. So now if I just return, let's say I just return hello, for instance, like this. Now, what we've got here is kind of like a function. So we've got loose autocomplete.

00:33 Let's say this is just defined as a JavaScript function. And we're taking in T, which I'm just going to describe as any for now. And we're returning hello. That's the mental model you should have here. So now when we go type example equals loose autocomplete, then it's going to error at us if we just use it like this.

00:52 Because it requires one type arguments. And here we've got generic type as well. So it's using that phrase generic type. This is a generic type, a type helper in my language. So how do we pass it something? Well, we can pass it something using this syntax here.

01:11 So if we pass it just like, let's say 123 inside here, what do you think example is going to be? Well, example is going to be hello, because that's what we're returning from this type here. That's what we're returning from this return statement, let's say.

01:26 So how do we actually capture this logic inside our loose autocomplete helper? Well, what we can do is let's say that we're passing in icon into here. Now icon is home or settings or about. And let's say we were just to return this from loose autocomplete.

01:44 Now you can see, by the way, if you have got your brightness turned up, that this currently is an unused variable here. It's declared, but its value is never read. And when we start using it, then it's just like in JavaScript. It's then going to be like properly colored in. And you can see that we're now doing something with this T.

02:03 So now example is going to be home settings or about, because that's what this icon represents. We could add something onto this union if we like. We go icon or 123. And now we've got icon or 123 in there. Pretty cool, right? So how do we capture this logic inside here?

02:21 Well, we can say whatever gets passed in icon or button variance is going to be our T. And now we can say T or string and empty object. And now what we get is icon or string or empty object. This means then that we can actually remove both references to this.

02:40 And we can say, let me grab that there, wrap both of these in brackets and go loose autocomplete. Lovely. Now we're getting somewhere. You can see now that loose icon is loose autocomplete icon and loose button variant is loose autocomplete button variant. And we can even add a comment onto here.

02:59 Comment explaining what loose autocomplete does. Beautiful. So now these icons down here, is this still working? Do I get autocomplete? Yes, I do. Fantastic. Do I get autocomplete down here? Yes, I do. Brilliant.

03:15 So this pattern then is so useful because not only does it let you capture different types in different type functions, just as you would in kind of normal functional programming, but it means that you can actually describe what these complicated setups do here.

03:32 And it means that actually your code becomes a lot more readable.

# 2. Refactoring to a Type Helper

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/05-generics/35-type-helpers-2.problem.tsx

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/05-generics/35-type-helpers-2.problem.tsx)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=6fd56bc1-37fa-489f-bb26-d42f1fe1179a&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0201-refactoring-to-a-type-helper-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=6fd56bc1-37fa-489f-bb26-d42f1fe1179a&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0201-refactoring-to-a-type-helper-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
Type Helpers are a vital concept to understand when we get to more advanced topics later on, so let's work on another example.

In a previous exercise we looked at an "all or nothing" idea where we had `InputProps` that had two different branches. One branch had `value` and `onChange` and the other branch had then as optional properties:

```typescript
export type InputProps = (
  | {
    value: string;
    onChange: ChangeEventHandler;
  }
  | {
    value?: undefined;
    onChange?: undefined;
  }
) & {
  label: string;
};
```

The current logic can be a bit difficult to read, as we have to manually specify all of this and wrap it in parentheses.

## Challenge
Your challenge is to find a neater way to express this logic and encapsulate it in a reusable type.

Refactor `InputProps` to use one (or more!) type helpers to achieve the same result. The type helper(s) you create should take in a type `T` and return something that looks similar to the branches seen in the `InputProps` type above.

Resources:

[

www.totaltypescript.com

https://www.totaltypescript.com/concepts/type-helpers

](https://www.totaltypescript.com/concepts/type-helpers)

[

www.totaltypescript.com

https://www.totaltypescript.com/workshops/type-transformations/type-helpers/introducing-type-helpers

](https://www.totaltypescript.com/workshops/type-transformations/type-helpers/introducing-type-helpers)

[

www.typescriptlang.org

https://www.typescriptlang.org/docs/handbook/utility-types.html

](https://www.typescriptlang.org/docs/handbook/utility-types.html)

## Transcript
00:00 I want to really hammer in this idea of these type helpers because it's such a crucial idea for understanding the latest stuff that we're going to cover like generic functions, generic classes and things.

00:09 So we are going to go back to another previous exercise that we had, which was this all or nothing idea, where if you have these input props and you have value string on change change handler, then you need to have another branch in there which covers the other side of it.

00:25 So value is an optional property with undefined on it as is on change undefined too. And this means then that when you add in value down here, you're going to be prompted to add on change. So this logic is a little bit hard to read as well. We have to wrap this stuff in a parentheses.

00:43 We have to kind of manually specify all of this. I think there is going to be a much neater way to actually get this across and capture it in a reusable type.

00:54 So that's your job is to try to refactor this while keeping all of the tests intact so that we lose some of this sort of terrible syntax here and we capture it in a type helper that makes more sense.

01:05 You're going to need, I think, a couple of type helpers from TypeScript itself because you're going to need to actually do a little bit of transformation here. You're going to need to take in this as this T and then return something that looks like that, except all of its properties are going to be undefined. So that's your job.

01:25 Good luck.

# Solution: Creating an "All or Nothing" Type Helper for React props

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/05-generics/35-type-helpers-2.solution.tsx

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/05-generics/35-type-helpers-2.solution.tsx)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=d82175fb-f756-4737-9360-6a656c0dc9d1&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0202-refactoring-to-a-type-helper-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=d82175fb-f756-4737-9360-6a656c0dc9d1&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0202-refactoring-to-a-type-helper-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
We want to make our props behave in an "all or nothing" manner. To do this, we'll create a new type helper called `AllOrNothing` that will take in a parameter `T` and returns that `T` for the time being:

```typescript
type AllOrNothing<T> = T;
```

## Testing `AllOrNothing` by Replicating `Input`
To iteratively write the type helper, we'll start by creating a new type called `Result` that passes the desired props into `AllOrNothing`.

```typescript
type Result = AllOrNothing<{
	value: string;
	onChange: ChangeEventHandler;
}>;
```

Since we return `T` in our `AllOrNothing` helper, we'll see `T` showing up in our `Result` type which is what we want.

But we want to do more than just preserve `T` in our union. It also needs to support an object with undefined values from the second branch of `InputProps`.

How can we add this extra thing into our type?

## Creating a `ToUndefinedObject` Type Helper
Instead of having the `AllOrNothing` type helper perform a transformation for the empty object, we can create a new type helper called `ToUndefinedObject`.

This new type helper will take in `T` then return a `Record` with `keyof T` and `undefined`:

```typescript
type ToUndefinedObject<T> = Record<keyof T, undefined>;
```

So now, inside our `AllOrNothing` helper, we have a union of `T` or `ToUndefinedObject<T>`.

```typescript
type AllOrNothing<T> = T | ToUndefinedObject<T>;
```

Our shapes are starting to match, but for the time being the optional properties aren't being preserved:

```typescript
type Example = ToUndefinedObject<{
	value: string;
	onChange: ChangeEventHandler;
}>;

// hovering over Example
type Example = {
	value: undefined;
	onChange: undefined;
};
```

## Making Properties Optional with `Partial`
The best way to make the values optional is to wrap the `ToUndefinedObject` type helper's `Record` with `Partial`.

The `Partial` is a utility that takes a type `T` and makes all of its properties optional:

```typescript
type ToUndefinedObject<T> = Partial<Record<keyof T, undefined>>;
```

With `Partial`, our `Example` type now has `value` and `onChange` as optional properties.

```typescript
// hovering over Example
type Example = {
	value?: undefined;
	onChange?: undefined;
};
```

## Checking the `AllOrNothing` Type Helper
Now that we've covered both branches of our `AllOrNothing` type helper, we can check with a `Result` type that it works as expected:

```typescript
type AllOrNothing<T> = T | ToUndefinedObject<T>;

type ToUndefinedObject<T> = Partial<Record<keyof T, undefined>>;

type Result = AllOrNothing<{
	value: string;
	onChange: ChangeEventHandler;
}>;

// hovering over Result
type Result =
	| {
			value: string;
			onChange: ChangeEventHandler;
	  }
	| Partial<Record<"value" | "onChange", undefined>>;
```

Now our `AllOrNothing<T>` type will give us either our original object or an object with all properties set to `undefined`.

## Update `InputProps` to use the `AllOrNothing` Type Helper
Now that we've created our `AllOrNothing` type helper, we can update our `InputProps` to use it:

Here's the before:

```typescript
export type InputProps = (
	| {
			value: string;
			onChange: ChangeEventHandler;
	  }
	| {
			value?: undefined;
			onChange?: undefined;
	  }
) & {
	label: string;
};
```

And the after:

```typescript
export type InputProps = AllOrNothing<{
	value: string;
	onChange: ChangeEventHandler;
}> & {
	label: string;
};
```

Our code still works as expected. If you test it out with a "hello" input, you'll notice that it continues to function perfectly.

We've managed to encapsulate our logic into two `AllOrNothing` and `ToUndefinedObject` type helpers that are one line each.

The code is concise and efficient, and works exactly as we want it to!

## Transcript
00:00 Okay, let's give this a go. So let's first define our type helper. We're going to call this type all or nothing, right, and it's going to take in a T. Now this T is going to need to be kind of like the shape of an object but as we'll see it doesn't actually we don't need to worry about that too

00:17 much. So let's just try by actually just sort of replicating this and passing it in there as an example. So let's say type result equals all or nothing and we're actually not going to pass like the entirety of this, right, because this would sort of defeat the purpose. We're actually just

00:34 going to pass in the type of props that we want to turn into an all or nothing. So now we have results and of course this is just an empty object here, right, which is the thing that we're returning. If we return T here then we're going to get this showing here. Good. So we want to

00:51 preserve T in our union here, right, but we also want to add another thing here. So like something else inside here which is going to be represented by this. So the question is then how do we turn

01:05 this into this? Well one thing you can do is you can use a record type and that record is basically going to take T as its input and then turn it into like a... in fact you know what what we could do

01:20 is actually turn this into another type helper which is we could go to undefined object here and so this to undefined object what it's going to do is it's going to take in a T and then it's going to do the transform in there and so we're inside here we're going to have T or to undefined object

01:41 T there. So does that make sense? We've got two branches here. This one is the first one and then this one is the second one and now we need to figure out what the right transform here is to transform this T into this sort of shape. So my solution for this is to use a record type

01:59 and this record type is going to basically it takes in two parameters. It takes in the key of the object you want to create and then all of its values. So we can say record key of T

02:12 is undefined. Now let's take a look at that. So we can say type to undefined object and let's just pass in this value and on change here. Let's stick that there and we'll go type example equals to

02:27 undefined object. Now what we get here is value undefined and on change undefined. Very nice. So this is starting to look like this one down there but can you see the difference? We've got this one here which has the question marks in it, the optional properties, but the optional

02:47 properties are not being preserved here. So now this record, which is a record of the keys of T and passing in undefined in the values, we need to somehow make all of those values optional. The best way to do that is by wrapping this with a partial. Now partial takes in

03:07 something, takes in T and makes all of its properties optional. So now example here is value undefined and on change optional property undefined. Beautiful. Super duper nice. So this

03:21 means now that our all or nothing type helper actually works beautifully because this result is now value string on change change event handler and we've got this partial record value on change undefined. So it sort of slightly mangles this type output here but we know that if you actually

03:40 look at the implementation of our all or nothing T we've got T or T to undefined object here. Lovely. Now the last thing to do is just replace this with our all or nothing type helper. So I'm going to wrap this in all or nothing. Now I can remove this branch here and I can save it and

04:00 prettier actually just removes the parentheses because you don't need them anymore. And now we've got all or nothing value string on change change event handler and down here it still works as before. So hello still working still doing exactly what we wanted to. So this is really nice because

04:16 actually there's not a huge amount of complexity here. We've just captured our all or nothing type in a one line type helper and two undefined objects still a one line type helper. Super nice.

# 3. Constraining a Type Helper to Accept Specific Values

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/05-generics/36-type-helpers-with-constraints.problem.tsx

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/05-generics/36-type-helpers-with-constraints.problem.tsx)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=598b739b-b438-4668-965b-deb8fc261598&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0301-constraining-a-type-helper-to-accept-specific-values-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=598b739b-b438-4668-965b-deb8fc261598&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0301-constraining-a-type-helper-to-accept-specific-values-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
Here we have the `AllOrNothing` and `ToUndefinedObject` type helpers from the previous exercise:

```typescript
type AllOrNothing<T> = T | ToUndefinedObject<T>;

type ToUndefinedObject<T> = Partial<Record<keyof T, undefined>>;
```

However, there's a slight hiccup.

Currently, the type helpers are a bit too flexible. It's not limited to just objects. It can also receive strings, numbers, undefined, null... any possible value.

This is not exactly what we want.

The type helpers should be modified to restrict the input to objects only, and add a warning mechanism for when unsuitable data types are passed in.

## Challenge
Your task is to find a constraint that we can add to `T` to ensure it only accepts specific types of values.

More specifically, we want the value to be an object to be the type that matches what we see in the test:

```typescript
Expect<Equal<AllOrNothing<{ a: string }>, { a: string } | { a?: undefined }>>
```

The main aim is to exclude `strings`, `numbers`, or `undefined` from the list of acceptable types.

There's not a perfect solution, but we'll look at a couple possible ways to tackle this problem.

Hint: The key phrase you should be looking for is "generic constraints".

Resources:

[

www.totaltypescript.com

https://www.totaltypescript.com/workshops/typescript-generics

](https://www.totaltypescript.com/workshops/typescript-generics)

[

www.typescriptlang.org

https://www.typescriptlang.org/docs/handbook/2/generics.html

](https://www.typescriptlang.org/docs/handbook/2/generics.html)

## Transcript
00:00 So we've introduced this new type helper into the code base. Everyone's happy, but there is a problem, which is we have like all or nothing can receive anything, like not just objects, like it can receive strings, numbers, undefined, null. Anything can be passed into this T here, which seems really, really strange.

00:19 So we want to find a way where we can warn people if they pass in something that's unsuitable. We only want to allow them to pass in objects into here. And while you're at it, we might as well do the same with two undefined object as well, because, you know, one without the other, it looks a little bit strange. So your job is to try to find a constraint

00:39 that we can add onto this T to make sure it only accepts certain types of values. And to also make sure that kind of the object is the thing that we want to be passed in here. This, there's no perfect solution to this, but really I just want you to get rid of a string or number or undefined from this. And I'll show you the limitations

00:58 of the few solutions that there are. Anyway, generic constraints, that's what you're looking for. Good luck.

# Solution: Add Generic Constraints to Type Helpers

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/05-generics/36-type-helpers-with-constraints.solution.1.tsx

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/05-generics/36-type-helpers-with-constraints.solution.1.tsx)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=1e75265a-178c-428d-9ac9-e916bb14c029&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0302-constraining-a-type-helper-to-accept-specific-values-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=1e75265a-178c-428d-9ac9-e916bb14c029&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0302-constraining-a-type-helper-to-accept-specific-values-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
We'll start by taking a closer look at the concept of generic constraints in TypeScript.

Imagine we have a runtime function `toUndefinedObject`, which accepts a type parameter `T` and returns an empty object:

```typescript
const toUndefinedObject = (t) => {
  return {};
}
```

If we want to constrain this runtime function to only accept an object, we can specify the type of `t` as `object`. Then when we call it with something that is not an object, TypeScript will throw an error:

```typescript
const toUndefinedObject = (t: object) => {
  return {};
}

toUndefinedObject(123123) // Error!
```

This works for the runtime version, but now we want to apply the same constraint to our `ToUndefinedObject` type helper.

## Using `extends` to Constrain Generic Type Parameters
In order to apply a similar constraint to `T` in our `ToUndefinedObject` type helper, we can use the `extends` keyword.

Adding `extends object` will constrain `T` to the `object` type. This behaves in the same way as the constraint we mentioned earlier.

```typescript
type ToUndefinedObject<T extends object> = Partial<Record<keyof T, undefined>>;
```

Now if we try to pass a string to `ToUndefinedObject`, TypeScript will throw an error because a string does not satisfy the `object` constraint.

```typescript
type Example = ToUndefinedObject<string> // Error: 'string' does not satisfy the constraint 'object'.
```

However, we are now getting a new error in the `AllOrNothing` type helper on the `ToUndefinedObject` branch because type `T` does not satisfy the constraint `object`.

```typescript
type AllOrNothing<T> = T | ToUndefinedObject<T>; // Error: Type 'T' does not satisfy the constraint 'object'.
```

We get this error because when there is not a constraint, the type defaults to `unknown`.

To fix this, we need to constrain the `AllOrNothing` in the same way.

```typescript
type AllOrNothing<T extends object> = T | ToUndefinedObject<T>;
```

With this constraint in place, TypeScript is now able to correctly handle our `AllOrNothing` type and will throw appropriate errors if the wrong type is passed in.

## A Catch & Alternative Solution
There's a catch to this solution, though– the `object` type constraint is not perfect.

For example, it allows arrays of any type to be passed in, such as string or number arrays. This is due to TypeScript treating everything apart from primitives as an `object`.

```typescript
AllOrNothing<string[]> // No error!
```

An alternative solution that offers a bit more description is using `extends Record<string, any>`.

This behaves the same as the `object` type but gives a clearer picture of what's happening.

```typescript
type AllOrNothing<T extends Record<string, any>> = T | ToUndefinedObject<T>;

type ToUndefinedObject<T extends Record<string, any>> = Partial<Record<keyof T, undefined>>;
```

This solution demonstrates cascading constraints throughout the application and our types. You'll find this pattern of using generic constraints in many open source libraries.

Enforcing constraints helps you prevent errors from occurring, and ensures your type helpers are being used in the correct way.

## Transcript
00:00 Generic constraints. Let's imagine that toUndefinedObject here was in fact a runtime function which took in a T and returned an empty object, let's say.

00:10 So here then, you notice that T, we need to give it something in order to make sure that what we're passing it can be constrained or is constrained to something. So toUndefinedObject, we don't want to be able to pass it a string or a number or anything like that.

00:24 We only want to be able to pass it a, I think the type that most corresponds to this is actually the object type, lowercase object type. Lowercase object kind of represents sort of any object really, and so we can now pass it an object with a bunch of different properties or things like that,

00:41 and we can't pass it things like numbers, things like undefined, things like null. So this object looks like a pretty good constraint for this T, but how do we actually map it onto this T up here onto the toUndefinedObject type helper?

00:57 How do we constrain this? Because you notice that we have to pass something to this one, we have to annotate it somehow, but with this one we can actually just leave it bare, we don't have to annotate it. But we can using the extends keyword, so T extends object.

01:13 This behaves exactly the same way as this constraint here, where now if we say typeExample equals toUndefinedObject and we pass it in a string, now it's going to yell at us because typeString does not satisfy the constraint object.

01:31 Same idea. So object is working okay. Now though we've still got all of these errors down here, we've still got this error here. Why is that happening? Well, it's because all or nothing, this one is still unconstrained. And so this means that type T does not satisfy the constraint object.

01:48 When you don't have a constraint on something, it defaults it to unknown, or TypeScript treats it as if it were unknown. And so we need to constrain this one as well. So we need to say extends object here too. Now everything starts working because this all or nothing type is properly constrained.

02:06 Like we now get proper errors if we don't pass in the right thing here. But this object type is not quite perfect. And in fact, when I was trying to research this, I didn't actually find a perfect solution for this. The reason it's not perfect is that you can actually pass in like arrays of things. So you can pass in string array here or number array.

02:26 So that's, I think, because TypeScript really treats everything as an object. And so everything except for primitives as an object, really. The second solution I found, which is maybe a little bit more descriptive than this lowercase object type, is by using extend record string.

02:45 This at least gives you a little bit more description as to what's happening here, but it behaves actually the same as the object type there. So it's not entirely perfect. But what you notice here is that we get these kind of like cascading constraints throughout our application and throughout kind of our types here.

03:02 Because if we don't have, let's say, this one, then we're going to get an error. Oh, actually, no, if we don't have the other one, then we're going to get an error just up here because the thing that it relies on doesn't have the proper constraints.

03:14 So that's a pattern that you see a lot in open source libraries, especially where they have these common constraints that need to flow in through different types and things like that. But generic constraints are extremely powerful for making sure that really that your type helpers are being used in the correct way.

# 4. Adding Type Arguments to a Hook

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/05-generics/37-generic-localstorage-hook.problem.ts

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/05-generics/37-generic-localstorage-hook.problem.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=ab54ca10-b2bb-4054-891a-1bbc83ce11ee&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0401-adding-type-arguments-to-a-hook-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=ab54ca10-b2bb-4054-891a-1bbc83ce11ee&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0401-adding-type-arguments-to-a-hook-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
Consider this `useLocalStorage` function:

```typescript
export const useLocalStorage = (prefix: string) => {
  return {
    get: (key: string) => {
      return JSON.parse(window.localStorage.getItem(prefix + key) || "null");
    },
    set: (key: string, value: any) => {
      window.localStorage.setItem(prefix + key, JSON.stringify(value));
    },
  };
};
```

The `useLocalStorage` function is like a namespace for all `localStorage` entries. It takes a prefix as an argument, which is used to group related entries under this prefix.

For example, we can use `useLocalStorage` to store users and their names:

```typescript
const user = useLocalStorage<{name: string}>("user");
```

As seen in the tests, the function should allow us to get and set values:

```typescript
user.set("matt", {name: "Matt"});

const mattUser = user.get("matt");
```

However, we currently have an error because the user returned by this function is of type `any`.

When we call `user`, we expect the result to be either a string representing the name, or `null`. This is because when we get an item from `localStorage`, it might not exist, in which case, `localStorage` returns `null`.

It's also important to note that the function should not allow setting a value that is different from the type argument passed in. This is where we encounter an issue. When we try to pass a type into `useLocalStorage` (similar to what we did with `useState` in previous modules), we get an error - "expected zero type arguments but got one."

We have another issue where the function is allowing us to set values that are different from the type argument passed in. We shouldn't be able to do this, as seen in the tests:

```typescript
// inside the tests

user.set(
  "something",
  // @ts-expect-error
  {},
);
```

## Challenge
Your task is to find a way to turn `useLocalStorage` into a generic function takes in a type argument. The `get` and `set` types should not return `any`, or allow for `any` to be passed in.

## Transcript
00:00 In this exercise, we're going to be doing something really interesting, which is using a or passing a type argument to a function. So useLocalStorage here, what we're doing is we're basically saying, okay, we've got a prefix, which is like a namespace that we're going to put all of this local storage entries under.

00:19 So here I have useLocalStorage name string user. So this is where I'm going to put all my users and their names, and it should let you get and set values. So it should let you say user.setMat name mat, except this mat user that's being returned is of type any. When we call user.getMat,

00:38 what we're expecting is for it to be name string or null. Because when you get something from local storage, you might not find it, and in which case local storage returns null. So it should also not let you set a value that is not the same type as the type argument passed in. So it should basically be erring here

00:56 because we're not passing in our name. There's an error here which is happening, expected zero type arguments but got one. That's because what we're trying to do here is pass in a type into useLocalStorage itself, like what we were doing with useState back in the previous modules.

01:15 So what your job is, is to try to find a way to make useLocalStorage a generic function, to turn it into something that takes in a type argument that we can manually pass in here. That's your job. So you will need to basically find some way to do that,

01:34 and then change the types of get and set so that it's not returning any here or not letting you pass in any, and the get here instead of returning any, actually returns the thing that we're receiving from this type argument.

# Solution: Adding Type Arguments to a Function

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/05-generics/37-generic-localstorage-hook.solution.ts

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/05-generics/37-generic-localstorage-hook.solution.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=0388683d-a5bb-45c1-ad2a-892f7eb90d41&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0402-adding-type-arguments-to-a-hook-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=0388683d-a5bb-45c1-ad2a-892f7eb90d41&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0402-adding-type-arguments-to-a-hook-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
Here's the starting point for the `useLocalStorage` function and how we're currently calling it:

```typescript
export const useLocalStorage = (prefix: string) => {
  return {
    get: (key: string) => {
      return JSON.parse(window.localStorage.getItem(prefix + key) || "null");
    },
    set: (key: string, value: any) => {
      window.localStorage.setItem(prefix + key, JSON.stringify(value));
    },
  };
};

// error on `{ name: string }`
const user = useLocalStorage<{ name: string }>("user");
```

We can see that the function takes a runtime argument, `prefix: string`.

When calling it, we are passing not only the runtime argument, but also a type argument as evidenced by the angle brackets `<>`.

In other words, we are passing a type argument into a function that currently isn't set up to accept one.

## Adding a Type Argument to a Function
To add support for a type argument, we can add a `T` to our function. This will also fix the error pointed out above:

```typescript
export const useLocalStorage = <T>(prefix: string) => { ...
```

Now when we hover over the call to `useLocalStorage` we can see that it's expecting a type argument:

```typescript
// hovering over `useLocalStorage`

const useLocalStorage: <{
  name: string;
}>(prefix: string) => {
  get: (key: string) => any;
  set: (key: string, value: any) => void;
}
```

However, we also see several `any`s that should be typed as `T`.

## Fixing the `get` and `set` Types
The `get` and `set` inside of `useLocalStorage` are currently typed as `any`:

```typescript
get: (key: string) => {
  return JSON.parse(window.localStorage.getItem(prefix + key) || "null");
},
set: (key: string, value: any) => {
  window.localStorage.setItem(prefix + key, JSON.stringify(value));
}
```

It might look like the `get` function should be typed as `T`, but that's not quite right because we can see from the return that the type will either be a string parsed from JSON or `null`.

This means the type should be `T | null`:

```typescript
get: (key: string): T | null => { ...
```

The `set` function's `any` type in the `value` should be updated to match the `T` that is passed in:

```typescript
set: (key: string, value: T) => { ...
```

## Type Arguments are Inferred as `unknown`
If we hover over `useLocalStorage` again, we can see that the type argument is being inferred as `unknown`:

```typescript
// hovering over `useLocalStorage`

const useLocalStorage: <unknown>(prefix: string) => {
  get: (key: string) => unknown;
  set: (key: string, value: unknown) => void;
}
```

Down in the tests we also still have an error when checking the type of `mattUser`:

```typescript
const user = useLocalStorage("user")
const mattUser = user.get("matt");

// error!
type tests = [Expect<Equal<typeof mattUser, { name: string } | null>>];
```

The reason we have this error is because the `user` isn't using the type argument, so it's being inferred as `unknown`.

The fix is to specify it:

```typescript
const user = useLocalStorage<{ name: string }>("user")
```

When you have this type of API where you require people to pass the type arguments in, it's crucial to have it well-documented and ensure that they continue to do so.

## Transcript
00:00 Let's take a look. UseLocalStorage here. We can see that it accepts one runtime argument here, prefix string, but we're passing it our runtime arguments, but we're also passing it a type argument. This syntax here with these little, what do you call it, angle braces,

00:19 angle brackets, they basically let you parse in a type argument to a function. Here we're parsing in this, but how do we configure UseLocalStorage so that it accepts a type argument? You can see actually if we use const isUseState here from React,

00:37 we can parse in a type argument here if we want to. You can see that if you hover over it, it actually useState undefined, so it's actually being inferred as undefined here. Whereas if we hover over local storage, you can see that it just accepts prefix string, there's none of those angle brackets just here. There are the angle brackets, useState just before the two parentheses,

00:57 and then none here. The way that we do that in TypeScript is we can actually add in a T just here, and this can be anything, so it can be whatever inside here. But T is the convention, so I like to teach and stick with T. Now, UseLocalStorage, it's no longer erroring down here.

01:15 That's great. When we hover over it, we can see that the angle brackets are in place, and they're letting us parse in this type argument. Great stuff. How do we then use that to fix these methods down here? Now, mapUser is still typed as any, and that's because this get function

01:33 really should be typed as this, should be typed as T here. Except not just T, because what we're seeing here is json.parse and then inside here, get the item or return a string with null in it. What this means is if we json.parse null, we'll actually just get null back.

01:52 For this one, this is going to be the T if it succeeds, or we just grab null here. So let's do that. So T or null. Now, this is working. MapUser is now a type of name string or null there. Beautiful. Now, this value here, it shouldn't be typed as any,

02:11 it should in fact be typed as the thing that we get from here. Lovely, lovely stuff. Now, you might be thinking, what happens if the user doesn't parse in this? Because we notice with useState, you don't have to parse it in. Well, what happens is it actually just automatically gets inferred as unknown.

02:28 We're going to see why that is in the next couple of exercises. But this means then that MapUser is of type unknown, and down here, the set function actually receives a value of unknown. So it means that when you have this type of API where you require people to parse the type arguments in, it's good to have it documented and make sure that they do continue to do it.

02:48 So well done, keeping on in our generics journey. Next, we're going to look at inferring these types from the arguments of the functions.

# 5. Wrapping a Generic Function Inside of Another

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/05-generics/38-generic-hooks.problem.ts

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/05-generics/38-generic-hooks.problem.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=6024b238-7063-449c-a92f-4b3d47de7bad&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0501-wrapping-a-generic-function-inside-of-another-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=6024b238-7063-449c-a92f-4b3d47de7bad&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0501-wrapping-a-generic-function-inside-of-another-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
Here we have a function called `useStateAsObject`. The function is a simple wrapper for `useState`, but instead of returning a tuple, we're opting to return an object:

```typescript
export const useStateAsObject =  (initial: any) => {
  const [value, set] = useState(initial);

  return {
    value,
    set
  };
};
```

As seen in the tests, when using the function we expect the `value` to be typed as `string` and the `set` to be typed as `React.Dispatch<React.SetStateAction<{ name: string }>>`. However, the `value` is being inferred as `any`:

```typescript
const example = useStateAsObject({ name: "Matt" });

// hovering over useStateAsObject
const useStateAsObject: (initial: any) => {
  value: any;
  set: React.Dispatch<any>;
}
```

## Challenge
Your task is to figure out a way to make this function actually work.

Notice that when calling `useStateAsObject` we aren't passing any type arguments. It looks like we're expecting it to "just work" by passing it `{ name: string }` as the initial value.

Use some of the syntax that we've seen so far to turn `useStateAsObject` into a generic function.

There are multiple solutions to this, but they all involve instantiating a generic in some form.

## Transcript
00:00 In this exercise, we have a function called useStateAsObject, and we're just basically doing a simple wrapping of useState here. What we're doing is we're saying, instead of returning it as a tuple, I actually just want to return it as an object. Sometimes this is nice and this mimics

00:18 often what you want to do with certain things that wrap useState. Our example here really should be value like name mat and set React.dispatch any. But instead, it's being inferred as any. We should be having this name string being the example.value,

00:37 but instead, example.value is just typed as any. We need to figure out a way to make this function actually work. You notice that in this function call down there, we're not actually passing any type arguments. It seems that just from this usage here,

00:56 example is expected to understand that it's supposed to represent name string. Your job is to using some of the syntax that we've seen so far. In fact, you won't need that much here really, is to grab this and turn it into a generic function. There are many different solutions here,

01:13 but they all do involve instantiating a generic in some form. Good luck.

# Solution: Type Inference with Generic Functions in TypeScript

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/05-generics/38-generic-hooks.solution.1.ts

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/05-generics/38-generic-hooks.solution.1.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=76182349-a14a-4881-9212-d436280b038b&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0502-wrapping-a-generic-function-inside-of-another-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=76182349-a14a-4881-9212-d436280b038b&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0502-wrapping-a-generic-function-inside-of-another-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## The Simplest Solution
Let's start with the simplest solution, which might blow your mind as to how easy it is.

Similar to what we've seen before, we can add a type argument of `T` to the `useStateAsObject` function:

```typescript
export const useStateAsObject = <T>(initial: T) => { ...
```

With just this implementation, our tests work perfectly.

Hovering over the `example`, you'll notice that our `T` is appropriately typed with `value` as `name: string` and `set` is typed as `React.Dispatch` with that same `T`:

```typescript
const example = useStateAsObject({ name: "Matt" });

// hovering over example
const example: {
  value: {
    name: string;
  };
  set: React.Dispatch<React.SetStateAction<{
    name: string;
  }>>;
}
```

This showcases how clever TypeScript can be, but let's dive a little deeper.

## A Deeper Dive into Type Inference
TypeScript has a feature where if you pass a runtime argument into a slot where a type argument is expected, it will try to infer the type argument from the runtime arguments.

In our example, when we pass in `{ name: "Matt" }` when creating our example, it is inferred into the type argument of `T`.

If we were to pass in another random key with a type of number, that change would be reflected as well:

```typescript
const example = useStateAsObject({ name: "Matt", awdjkhawbd: 123 });

// hovering over example
const example: {
  value: {
    name: string;
    awdjkhawbd: number;
  };
  set: React.Dispatch<React.SetStateAction<{
    name: string;
    awdjkhawbd: number;
  }>>;
}
```

However, if we specify `name: string` when creating the example, it will take precedence over the runtime version and the key with the `number` will cause an error:

```typescript
// error on awdjkhawbd
const example = useStateAsObject<{ name: string}>({ name: "Matt", awdjkhawbd: 123 });
```

Remember, this only happens if you don't pass in any type arguments!

# Why it Works
This solution works because the declaration of `useStateAsObject` specifies `initial` as `T`, which is then passed into `useState`. Since `useState` is a generic function itself, TypeScript infers all of the stuff it needs to do from there.

```typescript
export const useStateAsObject = <T>(initial: T) => {
  const [value, set] = useState(initial);
  ...

// hovering over `useState`
useState: <T>(initialState: T | (() => T)) => [T, React.Dispatch<React.SetStateAction<T>>];

// hovering over `set`
const set: React.Dispatch<React.SetStateAction<T>>;
```

This feature of TypeScript is incredibly powerful and shows how smart the language really is.

## Alternative Solutions
There are a few more ways we can approach this.

You may have noticed that in our initial example, we weren't annotating the return type- we're simply letting it pass through.

We could specify the return type manually, matching what we saw from the tests:

```typescript
export const useStateAsObject = <T>(initial: T): { value: T; set: React.Dispatch<React.SetStateAction<T>> } => {
  const [value, set] = useState(initial);
  ...
```

However, this isn't necessarily the best solution, as it can become quite verbose for something that can be as simple as the first solution.

Another solution would be to extract `UseStateAsObject` return into its own type helper:

```typescript
type UseStateAsObjectReturn<T> = {
  value: T;
  set: React.Dispatch<React.SetStateAction<T>>;
};

export const useStateAsObject = <T>(initial: T): UseStateAsObjectReturn<T> => {
  const [value, set] = useState(initial);
  ...
```

This solution would also work with an interface with no difference in behavior.

You may notice a pattern here where different type helpers pass their types into other type helpers.

One last possible solution would be to pass the generic parameter `T` into `useState` manually:

```typescript
// inside useStateAsObject
const [value, set] = useState<T>(initial);
```

However, this is more like a "double check" of the correctness of our code, rather than a necessity.

## Wrapping Up
The first solution that we discussed seems to be the cleanest. It's got a minimal setup, and everything functions seamlessly.

Generics are awesome!

## Transcript
00:00 Okay, let's start with the simplest version of this solution. This is going to be so simple actually, it might blow your mind as to how easy it is. What we want to do is similar to how we declared a type argument on our function before, is to declare one here. Now, what we do is we just replace the initial,

00:18 which is like the thing that we want to infer from, instead of any, that's going to be T. Okay, now all of our tests are working. How on earth does that work? You notice that now value is typed as T, set is typed as react.dispatch, react.setStateAction, T,

00:38 and value and set down there are all working. And our example is typed as value nameString, and nameString has found its way into here too. TypeScript is pretty clever sometimes. What we can see that when we call useState as object, what we're getting is this little type argument

00:57 is being parsed somehow. So it's almost as if that we parsed in manually this type argument, but we didn't. We're not parsing in that type argument. Here's the thing that TypeScript does that makes this stuff so, so clever. If you don't parse in any type arguments

01:15 into a slot where a type argument is expected, it will try to infer the type argument from the runtime arguments. So now, because we're parsing in this name mat here, that will be inferred into the type arguments. If I parse something else into here,

01:32 like, which is gonna be a number, then that is going to be inferred in there as well. And now, if you do this way around, if you say nameString inside here, then actually this beats the runtime version. So if you, TypeScript only does this

01:51 if you don't parse in any type arguments there. But this is so incredibly powerful. And you notice how smart it is too. TypeScript sees the initial is a T. And so what it does is it parses T into useState here. And now this initial state is T,

02:10 value is T, set is the thing that wraps T. And so useState is a generic function itself, but because it's being used in another generic function, it infers all of the stuff it needs to do from there. Incredible. So there are a few more solutions here. So we could, if we wanted to, manually annotate the return type.

02:31 Because you notice in this first one, we're not actually annotating the return type. We're just letting it pass through. And this, by the way, I think is not as good a solution because you see quite how verbose you have to be to capture something which can be as simple as just this.

02:49 This is just beautifully simple. Let's try a couple more. This one, we can extract it out into its own type helper, right, if we want to. useState is object return, where we just grab that out. You notice that, again, we're seeing that thing where different type helpers parse their types into other type helpers. So this function instantiates T

03:08 and then uses T in the initial here and then parses it into useState is object return name string here. Pretty cool. We can do this with an interface as well, same deal. Literally no difference really in terms of this particular behavior. Or we can, the final thing here is you notice

03:25 that you can manually parse T into useState here. That's cool. So here what we've got, useState, it's actually being inferred as T because we're just parsing in initial as T here. But we can parse in this T manually just to kind of like double make sure, I guess.

03:43 But even here, I think the first solution that we've got is the cleanest because it just makes sure that like, I mean, it's a minimal, minimal setup here but everything still works and works beautifully. So here we're starting to see just how powerful generics can be. And we've gone through the three ways

04:02 that they mainly happen is in generic types, is in parsing type arguments to functions. And then thirdly, it's inferring type arguments in functions from the runtime arguments. Oh, generics are awesome.

# 6. Applying Generics to Components

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/05-generics/39-generic-props.problem.tsx

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/05-generics/39-generic-props.problem.tsx)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=107903e5-59ab-49db-ab11-489153738afd&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0601-applying-generics-to-components-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=107903e5-59ab-49db-ab11-489153738afd&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0601-applying-generics-to-components-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
Now we'll move to to applying what we've learned about functions and type helpers to components.

Consider this `Table` component:

```typescript
interface TableProps {
  rows: any[];
  renderRow: (row: any) => React.ReactNode;
}

export const Table = (props: TableProps) => {
  return (
    <table>
      <tbody>
        {props.rows.map((row) => (
          <tr>{props.renderRow(row)}</tr>
        ))}
      </tbody>
    </table>
  )
}
```

The component takes in some rows and a function to render those rows into a React node. The `renderRow` function is called on each row, wrapping it in a `tr` element which then renders out all of the cells in that row.

Inside of the `Parent` component we use the `Table` component in a couple of different ways.

```typescript
const data = [
  {
    id: 1,
    name: "John",
  }
]

<Table rows={data} renderRow={(row) => <td>{row.name}</td>} />
```

In the second usage of the `Table` component we can see some issues with the test inside of the `renderRow` function:

```typescript
<Table
  rows={data}
  renderRow={(row) => {
    type test = Expect<Equal<typeof row, { id: number; name: string}>> // Error!
    return (
      <td>
        {
          // @ts-expect-error   // Error!
          row.doesNotExist
        }
      </td>
    );
  }}
/>
```

Even though we know the type of the data that's passing in, we can access properties like `row.doesNotExist` without getting proper warnings. This is dangerous.

## Challenge
Your task is to update the code to ensure that `rows` is the same type as `renderRow`, and somehow attach that so that the inference starts working on the `Table` component.

Hint: Notice that we are now working in a `.tsx` file, which you might need to take into account when solving this problem.

## Transcript
00:00 Now, we're going to apply what we've learned with functions, with type helpers onto components. We have our table here, and a table is basically going to take in some rows and then a function to render that row into a React node. Here inside the table components, we have our rows being mapped over,

00:19 and then render row is being called on each one.
Basically, put it inside a TR, which is going to render out all of the
cells in that row. We have here in this version, we're passing in the
data and we have our row here, and then we're passing in a TD with
[row.name](http://row.name).

00:37 Great. We'll end up with a table with just one row with name John, but this means we can reuse the table with different types of data and pass it different things to render different types of tables. Very, very common pattern. There's an issue though. Our render row function, the row here is typed as any,

00:56 even though we know the type of the data that's passing in here. This is bad because it means that we can access properties like row does not exist without getting proper warnings here. Dangerous, dangerous, dangerous. What we want to do is we definitely want to turn this into a generic type,

01:15 because we probably know that rows needs to be the same type here as here. Rows is going to need to be the same type as render row, and then we need to somehow attach that so that the inference starts working on this table component here. That's given you, I think, all the information you need.

01:33 There are some little tricks that you might need to do to get this working in a .tsx file because elsewhere we've been working in .ts files. So bear that in mind, and I think that's it. Good luck.

# Solution: Add a Generic Type Argument to a Props Interface

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/05-generics/39-generic-props.solution.tsx

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/05-generics/39-generic-props.solution.tsx)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=11dc4477-d15f-4d02-8cd8-48d61468a6a2&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0602-applying-generics-to-components-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=11dc4477-d15f-4d02-8cd8-48d61468a6a2&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0602-applying-generics-to-components-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
The first thing we need to do is convert our `TableProps` into a generic type.

To do this we will add a placeholder `TRow` type parameter to the `TableProps` interface and replace the `rows: any[]`:

```typescript
interface TableProps<TRow> {
  rows: TRow[];
  renderRow: (row: any) => React.ReactNode;
}
```

This `TRow` is going to be used for both `row` and `renderRow` properties.

Next we need to pass it a type argument when we use it.

Inside of the `Table` component, add the `TRow` type argument to the `TableProps` type:

```typescript
// Error on TRow!
export const Table = (props: TableProps<TRow>) {
    ...
```

However, we have an error because `TRow` hasn't been instantiated anywhere.

We can can work around this by placing it at the start of the function signature, just like any other function.

Note that because we are in a `.tsx` file, we need to add a comma at the end of the type argument to let TypeScript know that this is not a JSX element.

```typescript
// Notice the comma!
export const Table = <TRow,>(props: TableProps<TRow>) {
  ...

// Alternative syntax
export const Table = <TRow extends unknown>(props: TableProps<TRow>) {
  ...
```

With these changes, the errors have gone away!

Hovering over the `Table` component, we can see that it now accepts `TRow` as a type argument and the `rows` data is being inferred correctly.

```typescript
// Hovering over `rows`
TableProps<{ id: number; name: string; }>.rows: {
  id: number;
  name: string;
}[]
```

## Wrapping Up
Just like we can have generic functions, we can also have generic components. This is really powerful because components always return either React nodes or JSX elements. We'll delve deeper into the differences between these two in a later section, but for now, let's focus on the fact that they always return the same output.

Generics are incredibly useful, especially when you have different props that depend on each other.

In this example, we have `TableProps` inferring `TRow` from the rows being passed in. This can be thought of as a directional flow. The system understands that `TRow` is what's being passed in, and consequently, the type of the `renderRow` function gets inferred from whatever `rows` is.

This pattern is particularly beneficial for select components when you have multiple options. It's a testament to the power and flexibility that React brings to the table.

## Transcript
00:00 Okay, let's start with the thing we know we need to do which is to turn table props into a generic type. So we can put a T here and I'm actually going to call this T row just to differentiate it from some of the other exercises we've done. Now T row here is going to take a row and it's also going to take this render row. So I'm going to put it in both slots here.

00:19 Now T row is basically if we were to instantiate this and say type example equals table props and let's just pass it ID string, then this means we're going to end up with the type that we probably specify. So type example 2 equals example, let's just say rows.

00:38 And here we're going to get, yeah, perfect, ID string inside an array. Lovely. So this is working. Table prop seems good. And we now need to pass it a type argument because it requires one type argument. So let's do that. Let's put that on here and let's pass it T row like that.

00:57 But T row hasn't been instantiated anywhere. How are we going to do that? Well, what we can do is just like every other function, we can put it at the start of this thing here.

01:08 Except you notice when I did that, when I opened up these brackets here, I get this weird thing where it thinks I want to put a react fragment there. So, okay, I need to just delete that indie bit there. And let me add T row inside here. Okay, something weird is going on. I'm losing my syntax highlighting here.

01:27 I'm getting this kind of strange thing. JSX element T row has no corresponding closing tag. It thinks that these angle brackets represent a JSX element, but they don't. They just represent a type parameter instantiation.

01:42 So the way you can do this, the way you can get around this, is by actually adding a comma on the end here. How strange is that? So just by adding a comma, it understands, okay, this isn't a JSX element. It's actually a type instantiation. The other way you can do it is by saying extends unknown, which is nice.

02:00 But I actually prefer the comma just because it's slightly terser. So when you're in TSX files, you need to do this because it doesn't understand that this is not a JSX component or a JSX element. So now we've done that. Is everything working? All the red seems to be gone from my little scroller on the side.

02:19 And yes, it is working. Wow. Hover over table here. We can see that it's now accepts T row as a type argument. And we've got rows data. Okay, that's being inferred properly. And you can see that when you hover over rows here, it's saying table props, and we can see what's being instantiated here.

02:38 So now row has [row.name](http://row.name), and we can get proper
autocomplete for what's available here. So render row, it's now properly
grabbing this and does not exist, is erroring because it does not exist
on the type that we're inferring. So there we go.

02:53 Just like we can have generic functions, we can have generic components. And this is really powerful because, you know, like components, they always return the same thing. They always return React nodes, right? Or in this case, JSX elements. And we'll get into the difference in that later in a section.

03:11 But they always return the same thing. And so components or generics are most useful in basically having different props that rely on each other. So here we have to infer this T row from the rows that are being passed in. You can think of it as kind of like a directional flow, right?

03:30 It understands, okay, T row is what's being passed in. And then the type of this function gets inferred from whatever rows is. So when you have kind of things like that, and this is a really great pattern. And this is really good for select components for, you know, when you have multiple options.

03:49 We're going to be looking at other things in this section too. So there we go. Our first generic component. Well done.

# 7. Generics in Class Components

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/05-generics/40-generic-class-components.problem.tsx

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/05-generics/40-generic-class-components.problem.tsx)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=e4b6eb87-581d-48ea-a9bb-cb059fcaed10&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0701-generics-in-class-components-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=e4b6eb87-581d-48ea-a9bb-cb059fcaed10&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0701-generics-in-class-components-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
Class components still exist in legacy codebases, and it's important to understand how to convert them to be generic.

Here we have another `Table` component, but this time it's a class component:

```typescript
interface TableProps {
  rows: any[];
  renderRow: (row: any) => ReactNode;
}

export class Table extends React.Component<TableProps> {
  render(): ReactNode {
    return (
      <table>
        <tbody>
          {this.props.rows.map((row) => (
            <tr>{this.props.renderRow(row)}</tr>
          ))}
        </tbody>
      </table>
    );
  }
}
```

The `Table` class extends `React.Component`, a classic approach, and we're passing in `TableProps` as the props for our React components.

Down in the `Parent` component, we're encountering the same issue as before where we're not able to infer the type of `row`, and we are able to access properties that don't exist.

## Challenge
Your challenge is to replicate the same process from the previous lesson: find a way to make the table generic, and pass in `TRow` into `TableProps`.

## Transcript
00:00 In this exercise, we're going to work with exactly the same component as we've seen before, this table, which has exactly the same behavior. In fact, we're starting from exactly the same point, except it's not a functional component anymore, it's a class. So there are still class components knocking around in legacy codebases, and it's important to understand how to turn it into

00:19 a generic class because classes can be generic too. So here we've got our table class extending React.Component, which is the classic way to do this, and we pass in table props here as the props for our React components. So down here, we're having exactly the same issues as we had before.

00:38 What we need to do is to basically try to find a way to make table generic and to pass in T row into table props and do exactly the same thing as we had before. So good luck.

# Solution: Converting a Class Component to be Generic

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/05-generics/40-generic-class-components.solution.tsx

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/05-generics/40-generic-class-components.solution.tsx)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=3601d9d8-097f-4f54-ba5c-79b50b830aa0&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0702-generics-in-class-components-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=3601d9d8-097f-4f54-ba5c-79b50b830aa0&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0702-generics-in-class-components-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
Like before, we'll bring `TRow` into `TableProps`:

```typescript
interface TableProps<TRow> {
  rows: TRow[];
  renderRow: (row: TRow) => ReactNode;
}
```

Then we'll add `TRow` to the `Table` component:

```typescript
// Error on TRow!
export class Table extends React.Component<TableProps<TRow>> {
  ...
```

But we have an error that the `TRow` name cannot be found.

In order to instantiate `TRow`, we'll add it next to the `Table`:

```typescript
export class Table<TRow> extends React.Component<TableProps<TRow>> {
  ...
```

This approach works perfectly!

Our `Table` now has `TRow` in the generic slot, and we have achieved successful inference for the `rows` and `renderRow` props.

It's important to note that props work the same whether we're using functional components or class components.

In fact, even outside of React, generic classes have a plethora of applications. They can represent a multitude of different dynamic data structures, making them an incredibly versatile tool.

## Transcript
00:00 Okay. So we know TableProps has to be pretty similar to what we saw before. So let's add T row back in and put in T row here too. Now, we're having exactly the same issues we had before. TableProps T row requires a type argument. So let's put T row in there for now,

00:18 but we cannot find name T row. So where on this line do we instantiate T row? Well, the key is to put it just next to this table here. So table T row extends React component TableProps T row. This again works just beautifully.

00:38 We've got our table here, which has got T row in the generic slot there. Hover over rows, we can see this ID number, name, string, beautiful. That's really working nicely, and we've got this inference all working too. So these props can be like, it doesn't matter whether you're using

00:58 functional components or class components, they can work just the same. In fact, generic classes actually have a lot of different applications too, outside of even React. So generic classes, they can be used to represent lots and lots of different dynamic data structures. Very, very cool setup. But this is how you get generics working with class components.

# 8. Passing Type Arguments To Components

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/05-generics/41-passing-types-to-components.problem.tsx

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/05-generics/41-passing-types-to-components.problem.tsx)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=809163ee-e963-4a4a-92ba-911822025de1&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0801-passing-type-arguments-to-components-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=809163ee-e963-4a4a-92ba-911822025de1&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0801-passing-type-arguments-to-components-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

# Working with TypeScript and React Components
We're back to the functional `Table` component that we've seen before.

This time, it's the tests that have changed.

In the first usage of the `Table` component, we want the `rows` to be an array of `User`, but this is currently failing:

```typescript
<Table
	// @ts-expect-error rows should be User[]
	rows={[1, 2, 3]}
	renderRow={(row) => {
		type test = Expect<Equal<typeof row, User>>;
		return <td>{row.name}</td>;
	}}
/>
```

In the second usage, we have an error because we are accidentally passing in an `id` of `string`.

```typescript
<Table
	rows={[
		{
			id: 1,
			name: "John",
			age: 30,
		},
		{
			// @ts-expect-error id should be string
			id: "2",
			name: "Jane",
			age: 30,
		},
	]}
	renderRow={(row) => {
		type test = Expect<Equal<typeof row, User>>;
		return <td>{row.name}</td>;
	}}
></Table>
```

When hovering over `row` in the `renderRow` function, we see that we have two different objects competing:

```typescript
row: {
  id: number;
  name: string;
  age: number;
} | {
  id: string;
  name: string;
  age: number;
}
```

## Challenge
Your challenge is to find a way to pass a specific type argument when instantiating the component to enforce the `User` type for our data.

```typescript
interface User {
	id: number;
	name: string;
	age: number;
}
```

You'll know it works when the error messages disappear!

## Transcript
00:00 Okay, we're still with our table. What we're doing with our table now, it's back to being a functional component. What we want to do is, we're actually going to keep all of this all the same. So you don't need to change anything about how the component is set up. Really, what I've done is I've changed the way the tests work. Now, the tests, what we're doing here,

00:19 is we basically want to say to this table, I want you to be a set of users, a row of users. Because currently, what we're getting here is an error because rows should be an array of users. Now, this is slightly thinking backwards here, because sometimes what you have is you

00:39 have a big array of mock data here. You would expect here that, okay, we've got this first one here, it looks like it's formatted correctly. So ID is a number, age is a number, name is a string, ID number, age number, name string, perfect, looking good. But this one, we're accidentally passing in an ID of a string here.

00:58 This isn't good because actually what gets inferred is we now got two different objects competing for each other here. So where ID number or ID string could be one of the possibilities. So TypeScript is being too clever here. It's actually not erroring in the place where we want it to,

01:17 it's actually filtering down and hurting us a little bit. So your job here is to try to work out if we can actually pass a type to this instantiation of the components. This bit here and this bit here, really the type that we want to be passing and enforcing is this user type.

01:37 So your job is to see if there's a way that you can pass a type as an argument to a component in order to enforce this error and enforce this error. Good luck.

# Solution: Use the Angle Brackets Syntax to Pass a type to a Component

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/05-generics/41-passing-types-to-components.solution.tsx

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/05-generics/41-passing-types-to-components.solution.tsx)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=4b80fe7b-c616-44ef-8f0b-8b81f74a849c&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0802-passing-type-arguments-to-components-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=4b80fe7b-c616-44ef-8f0b-8b81f74a849c&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0802-passing-type-arguments-to-components-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
Before we get to the solution, let's look at an example for test purposes only– this is not something you should do in real life!

Here we create a new variable `result` by calling `Table` like a function:

```typescript
const result = Table({
  rows: [
    {
      id: "123",
    },
  ],
  renderRow: () => {
    return null
  }
});
```

When we hover over `Table`, we can see that we have inference which is good.

But how do we manually pass in a type to make sure that `rows` is what we want it to be?

When can add `User` as a type argument to `Table`, we can see that `id` will now error because it's expecting a number.

```typescript
const result = Table<User>({
  rows: [
    {
      id: "123",  // Error on id!
    },
  ],
  ...
```

If we update the `rows` to match the `User` interface, the errors go away.

This illustrates that type annotations work in regular functions.

Now we need to add a type annotation to our function component.

## Add a Type Annotation to a Component
The type annotation for a component goes right after the JSX element itself.

It might seem strange, but here's how it looks:

```typescript
<Table<User>
  // @ts-expect-error rows should be User[]
  rows={[1, 2, 3]}
  ...
```

Adding the `<User>` type argument to both of the `Table` components fixes the errors.

Just like a function where you can pass in types to override inference, you can do the same thing with components.

## Transcript
00:00 This is a cool solution. The way this works is in a normal function, let's say we were going like a const result equals table. Let's actually call it like a function. This is something you should never do, but I'm going to do it for just test purposes to show how it works. So table here.

00:17 Now table, we can pass in rows and we can pass in like, let's go ID for now and just have this render row function which just returns and I'll just grab this row just to make sure we're getting the inference. Now, when we call it like a function, what we can see is we can actually see the inference site here.

00:37 So ID string. Very nice. But how would we manually pass in a type to make sure that rows was what we wanted it to be? Well, we've got this option here where we can actually pass in user, and now this user, this is going to error just here.

00:56 Type string is not assignable to type number. So if we pass in actually 1, 2, 3, then we need to pass in 24 and name Sophia or something. Then you can see that this rows is actually being typed from this type annotation here.

01:14 So this type annotation here works in functions, but does it also work in components? Yes, it does. Where do we put it though? Do we put it here? Is that going to work? No, that looks crazy. Do we put it here? No, that doesn't work. Turns out the slot that they decided to put this in

01:32 was just after the JSX element itself. So this tag here, we can put user like that. Doesn't that look crazy? So now it's expecting 1, 2, 3 here to be a user. If we hover over this error type number is not assignable to type user, and this row here is typed as user2.

01:52 Let's do the same thing here. Whoops, no, not you. User, bam. And suddenly, this is erroring because string is not assignable to type number. So just like a function where you can pass in types to override the inference that's happening, you can do the same thing with components.

02:11 What a crazy piece of syntax. It's pretty amazing that they actually thought of this and decided to implement it. I love it.

# 9. Generic Inference through Multiple Type Helpers

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/05-generics/42-generic-inference-through-multiple-helpers.problem.tsx

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/05-generics/42-generic-inference-through-multiple-helpers.problem.tsx)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=46a3de11-7c83-4c47-942b-102ac27bc8d8&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0901-generic-inference-through-multiple-type-helpers-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=46a3de11-7c83-4c47-942b-102ac27bc8d8&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0901-generic-inference-through-multiple-type-helpers-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

# ButtonGroup Component and Props
Here we have a component named `ButtonGroup` that takes in a set of props, referred to as `ButtonGroupProps`.

These props include an array of `buttons`, each of which follows a specific interface structure with a `value` and `label` strings as well as an `onClick` handler:

```typescript
interface Button {
  value: string;
  label: string;
}

interface ButtonGroupProps {
  buttons: Button[];
  onClick: (value: string) => void;
}

const ButtonGroup = (props: ButtonGroupProps) => {
  return (
    <div>
      {props.buttons.map((button) => {
        return (
          <button
            key={button.value}
            onClick={() => {
              props.onClick(button.value);
            }}
          >
            {button.label}
          </button>
        );
      })}
    </div>
  );
};
```

The `buttons` are being mapped and created with their `button.value` being the value that gets sent up when a button is clicked. The `label` is used as the display text on the button.

Inside the `ButtonGroup` test, we want the `value` to be inferred as `"add" | "delete"` instead of just being a string.

The reason for this is that `string` isn't as descriptive as it could be.

We know the exact values that are being passed in here, and ideally, we should be able to just grab those and use them as the value.

## Challenge
Your challenge is to make the `ButtonGroup` component generic, and ensure the `value` is inferred correctly.

## Transcript
00:00 In this exercise, we have a component called ButtonGroup, and ButtonGroup takes in ButtonGroup props, takes in an array of buttons, which is this interface here, a value string, label string, and then it takes in an onClick where it takes in the value that it's getting from these buttons and passes it back up.

00:18 So it's like an event handler that it bubbles up. So we can see that buttons are being mapped here and they're being created with their button.value being the thing that gets clicked here or get sent up when it's clicked, and then the label is the thing that's being grabbed there. So we have an Add button and a Delete button,

00:36 for instance, which each have different values. But what I'd like to do here and the way I'd like to change this, is I'd like value to actually be inferred as Add or Delete instead of just string here. Because string, it's just not as descriptive as it could be.

00:54 We know the exact values that are being passed in here, and ideally, we want to just grab those and put them in the value there. Seems simple enough. So we've got a generic component that needs to be made here obviously, and we need to somehow make sure that value here and value here are the same thing or one is being inferred from the other.

01:14 Anyway, that's your challenge. Good luck.

# Solution: Adding Generic Type Arguments to Type Helperst

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/05-generics/42-generic-inference-through-multiple-helpers.solution.tsx

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/05-generics/42-generic-inference-through-multiple-helpers.solution.tsx)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=b5a1d89c-9561-4c6f-a42e-1ffdaffec3e7&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0902-generic-inference-through-multiple-type-helpers-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=b5a1d89c-9561-4c6f-a42e-1ffdaffec3e7&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0902-generic-inference-through-multiple-type-helpers-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
Alright, let's dive into button group props. As we look into this, we can probably infer that `value` is going to need to be a generic type. So, for the time being, let's denote it as `T value`.

As we've seen before, we can tell that `value` is going to need to be a generic type. We'll denote it as `TValue` for now.

Let's start by putting it on `ButtonGroupProps`:

```typescript
interface ButtonGroupProps<TValue> {
  buttons: Button[];
  onClick: (value: TValue) => void;
}
```

Then we will instantiate and add it to the `ButtonGroup`:

```typescript
const ButtonGroup = <TValue,>(props: ButtonGroupProps<TValue>) => {
  ...
```

With this change, we now have a different error at `props.onClick(button.value)`.

```typescript
// inside ButtonGroup

onclick={() => {
  props.onClick(button.value); // Error!
}}
```

The error tells us:

```typescript
Argument of type 'string' is not assignable to parameter of type 'TValue', and that 'TValue' could be instantiated with an arbitrary type which could be unrelated to 'string'.
```

We're getting this error because inside of `ButtonGroupProps`, `value` is currently being inferred as `unknown`. This is because at this point, `onClick` doesn't know what `value` is supposed to be. TypeScript doesn't attempt any inference there.

## Fixing the `value` Inference
One approach to fix this error would be to specify `value` to be `'add' | 'delete'` inside of the `ButtonGroup` component's `onClick` prop:

```typescript
<ButtonGroup
  onClick={(value: 'add' | 'delete') => {
    ...
```

Now the test passes, but it isn't very DRY and it isn't constrained properly either.

The real solution is to infer the `value` inside of the `Button` interface. We can do this by adding the `TValue` type argument to the `Button` interface, and update `value` to use it:

```typescript
interface Button<TValue> {
  value: TValue;
  label: string;
}
```

With this change, we now need to update the `ButtonGroupProps` to pass the `TValue` as a type argument to the `buttons` array:

```typescript
interface ButtonGroupProps<TValue> {
  buttons: Button<TValue>[];
  onClick: (value: TValue) => void;
}
```

## Updating the `key` Prop
We have inference working, but now we have a new error in the `key` prop when the buttons are rendered:

```typescript
// inside the `props.buttons.map` function
return(
  <button
    key={button.value} // Error!
  ...
```

The error here is that `TValue` is not assignable to type `Key | null | undefined`.

We get this error because React's `Key` expects to be a `string` or a `number` which we can find in the React types.

In order to transform `TValue` into a string, we need to update the `ButtonGroup`'s type argument to extend `string`:

```typescript
const ButtonGroup = <TValue extends string,>(
  props: ButtonGroupProps<TValue>
) => {
  ...
```

Now our errors are all clear!

## Recap
This pattern of inferring type arguments from multiple different helpers is super useful.

We have a generic type `TValue` that is being passed into `ButtonGroupProps`. Then it is passed down into `Button` where it finally finds a place where it can infer from. We also have the constraint to ensure that the `value` prop is what we expect.

Even though the type is passed down through a couple of different layers, TypeScript still manages to get the inference working.

## Transcript
00:00 Okie-dokie. So button group props. We can see probably that value is going to need to be a generic type, right? So let's call it T value for now. T value. And we need to instantiate this somewhere.

00:13 So let's put this on button group props. T value there. Now button group props is also going to need T value, as we can imagine. And this T value also needs to be put somewhere, needs to be instantiated from somewhere. So let's put it there.

00:27 Remove the end of the fragment, go T value, and then we're good to go. So this is working nicely. Now props.onclick here, we can see that argument type string is not assignable to parameter of type T value. T value could be instantiated with an arbitrary type, which could be unrelated to string.

00:46 Oh, okay. TypeScript. Thanks. Yeah, that's true. It could. It could. What it's saying there is it's saying that T value doesn't necessarily have to be related to string, right? So onclick currently receives T value, button value. It's a string, right? It's not T value.

01:05 So how do we get there then? Currently, you can see that value is being inferred as unknown here. That's because at this point, this onclick, it doesn't know what value is supposed to be.

01:19 So it doesn't try to do any inference there. So what we could do is we could just say, okay, add or delete here. And then this would work, you know, this is working fine. But actually, this is not very dry, because we've got add, delete here, and we've got add, delete here.

01:37 And actually, we don't even need to pass in add or delete here. It's not actually being constrained to the other one. So let's remove that. That's definitely not a solution. The way we've got to do this is we actually need to infer it from the type of value here.

01:51 So what we've got is an array of buttons in there. And we need to basically say, okay, this is T value, and this is T value. So let's make this a generic type. T value goes in there. And instead of value here, we've got T value there.

02:08 Now button, it's saying generic type button T value requires one type argument. So let's give it T value. And suddenly, it starts to work. Not quite. I thought it would work, actually, but it's not going to.

02:23 Now the reason that it's not working here is because actually, well, there's like an error up here, which sort of tells us why. T value is not assignable to type key or null or undefined.

02:34 We're using value in this little slot just here to basically type to pass a key, a unique key to the button to make sure that when it's rendered, it sort of doesn't re-render unnecessarily. You guys should know this.

02:48 When you're inside a map function inside of React, you should pass key to the elements that you're rendering in order to get it. So how do we know what type this expects? Well, if we command click into it, we can see that key, react.key is string or number, just that.

03:05 So what we want to do is, because T value can be anything, we actually want to constrain it to something that maps onto this key. So what we can do is T value extends, and let's just say extends string.

03:21 Oh, now we're getting somewhere. Now we're getting somewhere. So this value now, it's add or delete. So what's happening here is that basically we've got our button group, and let me actually just say const example equals button group,

03:37 and I'm going to call it manually. So by calling it manually, I'm just going to get a little bit better autocomplete here. So buttons, let's just say an empty array, and onClick like this, and I'll say our value here. And I'll actually do this below the button group so we don't get that error. There we go.

03:54 So now value here, we've got value string, so it's being inferred as, it's actually being inferred as string because we're not passing in any buttons. But as soon as we pass in a button, we've got our value, and let's just say wow, and label wow.

04:08 And we've got this value here is now being inferred as wow. So what's going on is that we instantiate our T value. That gets passed into button group props. That then passes itself down into button where it finally finds a place where it can infer from.

04:24 So this is the pattern that I wanted to show you. You're actually inferring your type argument through multiple different helpers. You've got this helper, and you've got this helper inside it. And even though it's down through a couple of different layers, it still manages to get the inference working.

04:40 And we used a constraint to make sure that it mapped onto the value of key here, or the type of key. Amazing.

# 10. Build a useMutation hook

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/05-generics/43-inference-flow-with-constraints.problem.ts

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/05-generics/43-inference-flow-with-constraints.problem.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=330c99fc-4483-4e5b-a825-976b9aab5296&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="1001-build-a-use-mutation-hook-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=330c99fc-4483-4e5b-a825-976b9aab5296&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="1001-build-a-use-mutation-hook-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
Consider this complex `useMutation` hook that allows us to pass any mutation into its `opts`, then returns a `mutate` function.

```typescript
export const useMutation = (opts: UseMutationOptions): UseMutationReturn => {
	const [isLoading, setIsLoading] = useState(false);

	return {
		mutate: async (...args) => {
			setIsLoading(true);

			try {
				const result = await opts.mutation(...args);
				return result;
			} catch (e) {
				throw e;
			} finally {
				setIsLoading(false);
			}
		},
		isLoading,
	};
};
```

Let's look at an example that uses a `createUser` mutation that comes from a fake external library:

```typescript
// inside fake-external-lib/index.ts

export const createUser = (
	user: {
		name: string;
		email: string;
	},
	opts?: {
		throwOnError?: boolean;
	}
): Promise<{
	id: string;
	name: string;
	email: string;
}> => {
	return fetch("/user", {
		method: "POST",
		body: JSON.stringify(user),
	}).then((response) => response.json());
};
```

We can see that it accepts `user`, `name`, `email`, and a second parameter, `options`. These `options` can be used to throw an error or not. The return is a promise with `id`, `name`, and `email` that correspond to the user we've just created.

Although this function is a mock and doesn't perform any real operations, it will help us infer the types for our `useMutation` hook.

Here's how we would call `useMutation`:

```typescript
const mutation = useMutation({
	mutation: createUser,
});
```

Currently there are some errors.

The call to `mutation.mutate` doesn't throw an error when the `user` object has missing values, and we can pass extra arguments to `mutation.mutate` that are not needed.

## Challenge
The `useMutation` hook needs to be updated to become a generic function.

Also, the `any`s inside of the `Mutation` type need to be dealt with:

```typescript
type Mutation = (...args: any[]) => Promise<any>;
```

Your challenge is to find the correct expression for those type arguments to make all of the errors go away.

## Transcript
00:00 In this exercise, we have quite a complex hook here. It's called useMutation. What useMutation does is it takes in a mutation in its options, and then it has a return which has a mutate in it. What this does is it means we can basically pass in any mutation in here.

00:18 Let's say we've got a createUser here. This createUser is actually coming from a fake external lib that I've just created for the sake of this. We look inside createUser, we can see that it takes in user, name, e-mail, and the second thing which is options here, so throw an error or not. It returns a promise with ID, name, and e-mail in it.

00:37 It's returning our user that we've just created with the name and e-mail. Of course, this is all mocked up. It doesn't really do anything, but this is basically just to get the types here so that we can infer them in our useMutation hook. What's going on inside the hook is you don't need to worry about this too much.

00:55 We have an isLoading boolean and setIsLoading boolean, and inside this mutate, what we're doing is we're basically setting isLoading true. We're running the mutation and then just returning the results. If we have an error there, then we just throw the error. This is mocking something like saving it in a state value or something like this.

01:15 But finally, we set isLoading false. Then we return mutate and isLoading inside here as we've got it set up in our useMutation return. But what we want to do is we want to say basically, okay, mutation.mutate, we should be able to pass in the right stuff. We shouldn't be able to pass in the wrong stuff.

01:34 So here e-mail is missing, and here we can't pass in extra stuff to the mutation.mutate. Currently, we can just pass in anything inside here actually. It's actually inferred as args any and returns a promise any. So it should be this. This is the full type that mutation.mutate should be.

01:54 And mutation.isLoading is working fine, but this is very much not. Currently, mutation.mutate is just this type of mutation. How many times can I say the word mutation without this being like an X-Men reference? So we obviously need to make useMutation into a generic function.

02:12 And we need to get rid of these anys inside here and capture them in some other way. So your job is to try to find a way that we can take all of this stuff here and use the right constraints and use the right sort of flow and the right type arguments,

02:30 the right expression for those type arguments to get this all working. Good luck.

# Solution: Refactoring a Generic Hook for Best Inference

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/05-generics/43-inference-flow-with-constraints.solution.ts

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/05-generics/43-inference-flow-with-constraints.solution.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=9e46925e-8518-4fef-ba9a-830606796c18&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="1002-build-a-use-mutation-hook-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=9e46925e-8518-4fef-ba9a-830606796c18&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="1002-build-a-use-mutation-hook-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
We know that `useMutation` needs to capture something specific in its type arguments.

What we're interested in is the `createUser` type, which has a lot we want to capture that we can see when hovering over it:

```typescript
// hovering over createUser
const createUser: (user: {
  name: string;
  email: string;
}, opts?: {
  throwOnError?: boolean;
}) => Promise<{
  id: string;
  name: string;
  email: string;
}>
```

## Adding a `TMutation` Type Argument to `useMutation`
Let's try adding a `TMutation` type argument to `useMutation` and passing it into `tMutationOptions`:

```typescript
export const useMutation = <TMutation>(opts: UseMutationOptions<TMutation>): UseMutationReturn => {
  ...
```

We'll also rename the `Mutation` type to `MutationBase` to avoid conflicts with `TMutation`:

```typescript
type MutationBase = (...args: any[]) => Promise<any>;
```

Now we're getting an error because `UseMutationOptions` is not generic, so let's add a type argument to it and update it to use `MutationBase`:

```typescript
interface UseMutationOptions<TMutation> {
  mutation: TMutation;
}
```

With these updates, our `TMutation` is now being used as the type argument for `TMutationOptions`, and if we hover over `useMutation`, we can see that we're capturing the entire function including all of its arguments and all of its return values.

```typescript
// hovering over useMutation
const useMutation: <(user: {
  name: string;
  email: string;
}, opts?: {
  throwOnError?: boolean | undefined;
} | undefined) => Promise<{
  id: string;
  name: string;
  email: string;
}>>...
```

This is good, but we've now got an error saying that `opts.mutation` isn't callable.

## Making `opts.mutation` Callable
Hovering over the error, we can see that `opts.mutation` is of type `unknown` and has no call signatures.

If you don't constrain a type argument, it's going to behave as if it were `unknown`, and we can't call `unknown` because we don't know if it's a function.

In order to get around this, we need to update `useMutation` to constrain `TMutation` with `MutationBase`:

```typescript
export const useMutation = <TMutation extends MutationBase>(opts: UseMutationOptions<TMutation>): UseMutationReturn => {
  ...
```

With this change, the `opts.mutation` error goes away. We've successfully captured the entire function in our type argument.

As a rule of thumb, when working with a type argument that's going to be passed around a lot, it's a good practice to define all the constraints upfront. This ensures that we're capturing the right argument and assigning it to the right area.

While we're at it, we also need to update `UseMutationOptions` to extend `MutationBase`:

```typescript
interface UseMutationOptions<TMutation extends MutationBase> {
  mutation: TMutation;
}
```

Even after doing this, we still have errors.

## Ensure the Returned Object is the Same Being Inferred
Hovering over the call to `mutation.mutate`, we can see that the `useMutationReturn` is still typed as `any`:

```typescript
// hovering over mutation.mutate
UseMutationReturn.mutate: (...args: any[]) => Promise<any>
```

To fix this we need to pass `TMutation` into `useMutationReturn`.

This requires `UseMutationReturn` to be made generic, with `TMutation` extending `MutationBase`.

```typescript
interface UseMutationReturn<TMutation extends MutationBase> {
  ...
```

By doing this, everything seems to work correctly and this error goes away.

However, a new error emerges that reveals a flaw in our approach.

## The Flaw in Our Approach
The error is on the `mutate` inside of the `useMutation` return:

```typescript
// inside useMutation
return {
  mutate: async (...args) => { // error on mutate!
    ...
```

The errors message reads:

```typescript
Type '(...args: any[]) => Promise<any>' is not assignable to type 'TMutation'.
  'TMutation' could be instantiated with an arbitrary type which could be unrelated to '(...args: any[]) => Promise<any>'.
```

This issue arises because of the `UseMutationReturn`.

Here's what the interface currently looks like:

```typescript
interface UseMutationReturn<TMutation extends MutationBase> {
  mutate: TMutation;
  isLoading: boolean;
}
```

Essentially what this says is that the mutation that comes back is exactly the same type as the mutation we get from the thing we pass in. A `TMutation` comes in as a type argument, and `mutate` is typed as `TMutation` there.

Functions in TypeScript can be quite complicated, especially due to the concept of function overloads. You can have functions with multuple overloads that all have different levels of complexity, or you could have a simple function with only one overload.

Because of this, TypeScript has a built-in system where it doesn't like comparing generic functions to normal functions.

This is exactly what's causing our current issue.

We've made a mistake in capturing the entire function in the type argument.

Instead of capturing the entire function in the type argument, we need to grab just parts of the function.

In this case, we need `user` and `opts` from the parameters, as well as the thing that comes back from it.

## Refactoring `TMutation` to `TArgs` and `TReturn`
It's time for some refactoring.

We are going to remove the `TMutation`s in favor of two new types: `TArgs` and `TReturn`.

Replace the instances in `UseMutationOptions`, `UseMutationReturn`, and `useMutation`:

```typescript
interface UseMutationReturn<TArgs, TReturn> {
  mutate: TMutation;
  isLoading: boolean;
}

interface UseMutationOptions<TArgs, TReturn> {
  mutation: TMutation;
}

export const useMutation = <TArgs, TReturn>(
  opts: UseMutationOptions<TArgs, TReturn>
): UseMutationReturn<TArgs, TReturn> => {
  ...
```

Next we'll rename `MutationBase` back to `Mutation`, and replace the `TMutation` in `useMutation` with `TArgs` and `TReturn`.

We'll also add `TArgs` for the array of arguments, and `TReturn` for the return value:

```typescript
type Mutation<TArgs, TReturn> = (...args: TArgs extends any[]) => Promise<TReturn>;
```

We'll then make similar changes to the other `TArgs`:

```typescript
interface UseMutationReturn<TArgs extends any[], TReturn> {...}

interface UseMutationOptions<TArgs extends any[], TReturn> {...}

export const useMutation = <TArgs extends any[], TReturn>(
  ...
```

Now the errors have gone, and the `result` is being inferred correctly:

```typescript
// inside useMutation
const result = await opts.mutatation(...args);

// hovering shows
const result: Awaited<TReturn>
```

Everything is working now!

We've successfully managed to handle all of the types in our custom hook.

## Recapping Our Work
The `useMutation` hook has two type parameters we can see when hovering:

```typescript
// hovering over useMutation
const useMutation: <[user: {
  name: string;
  email: string;
}, opts?: {
  throwOnError?: boolean | undefined;
} | undefined], {
  id: string;
  name: string;
  email: string;
}>(opts: UseMutationOptions<[user: {
  name: string;
  email: string;
}, opts?: {
  throwOnError?: boolean | undefined;
} | undefined], {
  id: string;
  name: string;
  email: string;
}>) => UseMutationReturn<[user: {
  name: string;
  email: string;
}, opts?: {
  ...
```

It's a bit hard to read, but we can see that the first type parameter is what we're passing in, and the second is what we're getting back.

Using these type arguments avoids the issue of having to compare functions to functions. Instead, we only need to compare `TArgs` to `TArgs` and `TReturn` to `TReturn`.

Consider this type of comparison to be a best practice when dealing with function assignability in TypeScript.

## Transcript
00:00 Okey-doke, let's give this a go. We know that useMutation definitely needs to capture something in its type arguments. When we call useMutation, we want to grab the type of createUser. There's a bunch of stuff we want to grab here. We want to grab the parameters, we want to grab the return type. In fact, why don't we try grabbing

00:17 the entire function and putting it in the type argument? Let's see what happens there. What we can do is we can say tMutation and we'll pass that into tMutationOptions, because this is the point at which we actually want to grab the mutation from. While we're here, I'm actually going to rename this from mutation to mutationBase,

00:37 just so it doesn't interfere with our tMutation. Now we need to, this is erroring because, useMutationOptions is not generic, so let's give it a type arguments, let's say tMutation. Now then, this is looking pretty good. We need to then exchange the mutation,

00:55 mutationBase for tMutation. Now, this is looking good. If we hover useMutation down here, you can see that we're grabbing the entire function, so all of its arguments and all of its return values into the type argument here, so we're capturing all of it. Nice. That's good,

01:14 except that Ops.Mutation, this expression is not callable. Type unknown has no call signatures. What could that mean? Well, we know that if you don't constrain a type argument, it's going to behave as if it were unknown. We can't call unknown because we don't know that it's a function. We actually need to constrain

01:33 tMutation with mutationBase. Let's say extends mutationBase. Now, this error goes away. Nice. When I have a type argument, which we're going to pass around a lot, I like to add all the constraints in nice and early.

01:50 I know that tMutation is going to be extends mutationBase too. This is good. We're now capturing the right argument in here and we're sticking it in the right area. Great. Now, though, we're still not getting the proper errors down here. Mutation.Mutate is still typed as mutationBase,

02:09 still typed as this anything up here. We need to make sure that the thing that we're returning is the thing that we're inferring. That was a nice bit of poetry. The way we do that is we need to pass tMutation into useMutationReturn down here.

02:26 Then we need to make sure this is generic too. Let's also make sure it extends the mutationBase. Now, we put it in here instead of the mutationBase. This seems to be working. Fabulous stuff. On the outside of our function now, it's actually all doing what it's supposed to be doing.

02:45 All of our tests are passing, except we've got an error here. This is a really, truly horrible error. It exposes something wrong with our approach here, or at least there's something in our approach that I don't recommend. We have our mutate function.

03:03 This mutate function says type argsAny to promiseAny is not assignable to type tMutation. argsAny, promiseAny is assignable to the constraint of type tMutation, but tMutation could be instantiated with a different subtype of it.

03:19 What's going on here is we have our useMutationReturn here. This useMutationReturn, what it's doing is it's basically saying this mutation that comes back is exactly the same type of the mutation that we get from the thing that we pass in. tMutation is there, tMutation is there.

03:38 Lovely. Sorry, it's this one. That's the one that we're passing back. The thing is that functions are really complicated in TypeScript, because technically you can have functions that have different overloads that are different levels of complexity. You can have a function with 10 overloads

03:55 versus a function with only one overload. Because of that, TypeScript has this built-in thing where it doesn't like comparing generic functions to normal functions. This is what's biting us here. The thing that I don't recommend we do is I think we've gone

04:12 wrong in capturing the whole function in the type argument. What we should be doing instead is we should be capturing two things from this function, two different arguments. Instead of grabbing the entire thing, we actually need to grab the parameters of the function. We have user and opts here. We need to grab that in a tuple,

04:31 and we also need to grab the thing that comes back from it. We need to do a lot of refactoring. This refactoring is basically going to take the tMutation out of contention, and instead it's going to put in two type arguments instead. Let's start from the top. Let's start from here.

04:48 We're going to have tArgs and tReturn. Now use mutation options. This is also going to take tArgs and tReturn, and we are going to have to be careful with this mutation base now. You can start to see this is going to take a lot of work here.

05:05 Let's add tArgs, tReturn to all of these different slots. Let's go no more mutation for you. Let's go tArgs, tReturn. This tMutation is now no longer available, no longer in scope. What we're going to do here is we're actually going to rename

05:23 this as a mutation with some tArgs and a tReturn. Instead of these anys in here, we're going to have promise tReturn, which is the thing we get back, and then these args are going to be args, tArgs. Notice there, I didn't do tArgs like this,

05:42 but I'm using it to represent the entire array there, the entire array. Now, why is this erroring? A rest parameter must be of an array type. That's right. tArgs is unknown and we can't spread unknown. Let's do tArgs extends any array.

06:00 Now, instead of these tMutations, we're going to say mutation tArgs, tReturn. Some errors here. This type tArgs does not satisfy the constraint any. Of course, it doesn't. This is unknown, and we're trying to pass it into a slot that's extending or expect any array here.

06:20 Let's do the same here and the same up here too. Whoopsie-daisy, there we go. Something's happened. The errors have gone. We now have args is being captured as tArgs.

06:37 This result is actually being a weighted tReturn. We have our tReturn there. Now, what we're getting is everything is working. If you look in our use mutation hook, we've got now two type parameters. This is pretty hard to read, but we've got our params,

06:55 the things we're passing to our function, and we've got the thing that we're getting back from our function. These are being captured in two different parameters. This avoids the issue of having to compare functions to functions. What we're doing here is we're basically comparing now,

07:12 is this whole function is assignable to the other one because it takes in the same arguments, takes in tArgs, and it returns tReturn. This feels like such a nitpicky thing, but because we're not comparing function to function, we're actually just comparing args to args, and tReturn to tReturn,

07:31 then TypeScript is okay with that. It means, I think, that this is a best practice in general. The way you can, you should be inferring the components of functions and not the entire function itself. Just like that, we've got it working. Lovely, lovely stuff. Well done if you managed to find this solution, if this was your first solution.

07:51 If you came and went in and went through the tMutation route, like I did when I was actually trying to solve this problem first, then you'll know the pain that you might have gone through if you came across that particular error. But hopefully, this was useful.

# 11. Generics vs Discriminated Unions

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/05-generics/44-generics-vs-discriminated-unions.problem.tsx

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/05-generics/44-generics-vs-discriminated-unions.problem.tsx)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=10998c4b-344e-44c1-93ef-cbbe19732ee7&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="1101-generics-vs-discriminated-unions-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=10998c4b-344e-44c1-93ef-cbbe19732ee7&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="1101-generics-vs-discriminated-unions-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
Let's explore an interesting scenario where generics might not be as beneficial as another approach.

Here we have a `ModalProps` type that takes in a type argument of `TVariant` that extends `PossibleVariants`. This means when using `ModalProps`, we can only pass in `'with-button'` or `'without-button'`. Inside of `ModalProps` is what is essentially a conditional type that will be different based on the variant passed in:

```typescript
export type ModalProps<TVariant extends PossibleVariants> = {
  isOpen: boolean;
  variant: TVariant;
} & (TVariant extends "with-button"
  ? {
    buttonLabel: string;
      onButtonClick: () => void;
    }
  : {});

export type PossibleVariants = "with-button" | "without-button";
```

There's also a `Modal` component that takes in `ModalProps` that requires a variant from `PossibleVariants` in order to work properly:

```typescript
export const Modal = <TVariant extends PossibleVariants>(
  props: ModalProps<TVariant>,
) => {
  // ...
  return null;
};
```

## Challenge
While this is a clever use of generics, it's not the most straightforward approach.

Your challenge is to refactor this code to make it more simple.

It may seem daunting due to the complex syntax, but the solution lies in navigating around it and replacing it with simpler, more familiar constructs and will look similar to something we've seen before.

## Transcript
00:00 In this exercise, we're going to take a look at an example where generics are actually not as helpful as a different way of doing things. So here we have a type of modal props. Modal props takes in a type or type argument of T variant and T variant extends possible variants.

00:19 So you can only pass in, for instance, if we go type example equals modal props, we can only pass in two things, with button or without button. If we just go without, then it's not assignable to the constraint possible variants.

00:33 So we have an is open Boolean on there and we have a variant T variant on there. And then we've got this other very complicated type. We have T variant extends with button.

00:46 If it does extend with button or if it matches with button, then we get button label string on button click this. Otherwise, we get that. So what's happening then is we've got basically a conditional type here. This is what this is, a conditional type. T variant extends with button.

01:04 And if T variant matches with button, then we add the stuff where button is needed. Now modal here, it's not actually sort of being implemented here, but we can see that we have modal is open. And when we have a with button variant, then it's working properly.

01:21 And if we add a without button variant, then it's going to error and it's going to not allow you to pass button label or on button click. So this is all very clever, very clever generic stuff, right? It's sort of understanding the variant that's being passed in and returning different stuff based on that.

01:37 But is there an easier way to handle this? And is there a way that you can refactor this code to make it simpler? And this is stuff that you've seen before. Don't worry, but you're going to just have to navigate around the kind of more complex syntax that's here and pull in something that's simpler, something you've seen before.

01:56 Good luck.

# Solution: Refactoring from Generics to a Discriminated Union

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/05-generics/44-generics-vs-discriminated-unions.solution.tsx

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/05-generics/44-generics-vs-discriminated-unions.solution.tsx)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=d5a33877-75bf-427a-8e0b-45e3968cd79b&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="1102-generics-vs-discriminated-unions-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=d5a33877-75bf-427a-8e0b-45e3968cd79b&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="1102-generics-vs-discriminated-unions-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
Looking at `ModalProps`, we're trying to say that there are two different states for it to be in:

If you pass in the `with-button` variant, you must also pass in `buttonLabel` and `onButtonClick`.

If you pass in the `without-button` variant, you don't need to pass those in.

This is a classic use case for a discriminated union.

## Refactoring `ModalProps` to use a Discriminated Union
Let's start by handling just the `with-button` variant in `ModalProps`:

```typescript
export type ModalProps<TVariant extends PossibleVariants> = {
  isOpen: boolean;
} & ({
  variant: "with-button";
  buttonLabel: string;
  onButtonClick: () => void;
});
```

Now let's add the `without-button` variant. We can also delete the `TVariant` slot because we don't need it anymore.

```typescript
export type ModalProps = {
  isOpen: boolean;
} & ({
  variant: "with-button";
  buttonLabel: string;
  onButtonClick: () => void;
} | {
  variant: "without-button";
});
```

Both variants are handled, and `ModalProps` is no longer generic.

## Removing the `TVariant` Type Argument from `Modal`
Since `ModalProps` is no longer generic, we can remove the `TVariant` type argument from `Modal`:

```typescript
export const Modal = (props: ModalProps) => {
  // ...
  return null;
};
```

Our functionality still works as expected, and we still get autocomplete on the variant props.

And there you have it! We've successfully refactored our modal props to use discriminated unions, making our code cleaner and more maintainable.

This lesson serves as a reminder that generics, despite their usefulness, are not always the answer. Sometimes, we can get cleaner outputs and make our code easier to understand by opting for different approaches.

## Transcript
00:00 So what are we trying to do here with modal props? What we're trying to do is we're trying to say that there are two different states for our modal props to be in. Either you pass a variant of with button and you need to pass in button label on button click, or there's without button and you don't need to pass those in.

00:18 We've heard this before. This is a classic use case for a discriminated union. So let's refactor this to be a discriminated union. We can add, let's say, variant up there with button. Let me just remove some of this cruft around here.

00:37 We can say that we always need to receive is open. Let's add some parentheses here and just do that. Now we've got our with button variants working. Let me add those parentheses back and we end up with another union inside there.

00:54 Let's go variant again and now without button. So we can actually delete our possible variants here because they're now being grabbed from modal props. We can see that we actually don't need this T variant at the top here. To T variants, it's declared, but its value is never read, so we can simply remove it.

01:13 Now, T variant extends possible variants. I don't even need this. Well, we certainly don't need to pass in T variant into here because modal props is no longer generic. So let's do that. Now, T variant is not being used, so we can remove that one too. So now modal is just props, modal props, and we still get exactly the same behavior down the bottom.

01:32 So if I change this to without button, now this is going to error and it's going to error. So this lesson is really just a lesson in saying, you don't need to always use really fancy generic logic in order to get something done. We can actually do a lot just with focusing on this stuff here,

01:52 by doing work with discriminated unions. We're also going to look at function overloads in a future section, although they're less useful with components. But just to say that generics are not always the answer, and sometimes you can just get a cleaner output and make your code easier to understand by doing this stuff instead.

# (c) Advanced Hooks



# 1. Fixing Type Inference in a Custom React Hook

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/06-advanced-hooks/45-tuple-return-type.problem.ts

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/06-advanced-hooks/45-tuple-return-type.problem.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=64319058-d4d3-4c3d-834b-1787a6453ac4&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0101-fixing-type-inference-in-a-custom-react-hook-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=64319058-d4d3-4c3d-834b-1787a6453ac4&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0101-fixing-type-inference-in-a-custom-react-hook-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
In this exercise, we have a custom React hook called `useID`.

This hook takes in a default ID, uses it in a `useState`, and then returns the result of the `useState` back from `useID`:

```typescript
export const useID = (defaultID: string) => {
	const [id, setID] = useState(defaultID);

	return [id, setID];
};
```

However, when we use `useID`, we don't have methods like `toUpperCase` on it, even though it's inferred as a string.

## Challenge
Your task is to figure out how you can change this function without altering the runtime behavior to actually return the right thing.

Hint: Hover over `setID` and `ID` to see what's happening.

## Transcript
00:00 In this exercise, we have a hook called useID. And what useID is doing is it takes in a default ID, sticks that in a useState, and then returns the results of the useState back from useID. This all seems fine, but when we actually go to useID, you can see that we don't have things like toUpperCase on it,

00:18 which is surprising because inside here, it's inferred as a string. Your job here is to try to figure out how you can change this function without changing the runtime behavior to actually return the right thing. And a couple of clues here might be gleaned from hovering over setID and hovering over ID to see what's happening.

00:38 So that's your job. Good luck.

# Solution: Use 'as const' to Infer a Tuple return type

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/06-advanced-hooks/45-tuple-return-type.solution.1.ts

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/06-advanced-hooks/45-tuple-return-type.solution.1.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=e25571c0-94a1-4ac9-8fc0-7a2c483d582f&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0102-fixing-type-inference-in-a-custom-react-hook-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=e25571c0-94a1-4ac9-8fc0-7a2c483d582f&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0102-fixing-type-inference-in-a-custom-react-hook-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
Hovering over our variables inside of `useId` is going to tell us what's going wrong.

Inside of `useId`, when hovering over `id` in the return statement we can see a `const id: string`, and hovering over `setId` shows `React.Dispatch` with a string:

```typescript
// inside of useId

return [id, setId];

// hovering over id
const id: string;

// hovering over setId
const setId: React.Dispatch<React.SetStateAction<string>>;
```

However, when we hover over `useId` itself, we can see that it is creating a union of `id` and `setId` and putting it inside of an array.

```typescript
// hovering over useId
const useId: (
	defaultId: string,
) => (string | React.Dispatch<React.SetStateAction<string>>)[];
```

This means that when we go to use `useId`, both `setId` and `id` have the same type.

```typescript
const [id, setId] = useId("1");

// hovering over id and setId both show:
const id: string | React.Dispatch<React.SetStateAction<string>>;
```

We need to make TypeScript understand that the thing we're returning from the function is not going to change or be appended to.

To fix this, we will tell TypeScript that `useId` is a tuple instead of an array.

There are two ways to do this:

## Solution 1: Strongly Type the Values Inside of a Tuple
The first solution is to set the return type as a tuple with the values typed inside of it:

```typescript
export const useId: (defaultId: string): [
  string,
  React.Dispatch<React.SetStateAction<string>>
  ] => {
    const [id, setId] = useState(defaultId);

    return [id, setId];
};
```

This works because it explicitly tells TypeScript what the function returns.

If we forget to leave one off, TypeScript will yell at us because the target requires two elements. If we add another element, TypeScript will yell at us for having too many.

## Solution 2: Use `as const` on the Returned Array
The second option is to use `as const` on the returned array:

```typescript
export const useId: (defaultId: string) => {
  const [id, setId] = useState(defaultId);

  return [id, setId] as const;
};
```

This tells TypeScript to infer that the returned array is a tuple instead of a big array:

```typescript
const useId: (
  defaultId: string,
) => readonly [string, React.Dispatch<React.SetStateAction<string>>];
```

Using `as const` is my preferred solution because it's just beautiful.

## Transcript
00:00 So, let's take a look and actually hover over UseID, because this is what's going to tell us what's going wrong. You can see that actually, when we return the things from UseID, it gets inferred as a string here, and this kind of React.dispatch.setStackAction thing with a string in there.

00:16 And that's all good, that's fine, but if we hover over this, you can see that it actually unions those and puts them inside an array here. So this is now an array of those possible things. So that means when we come down to here, both of these have the same type.

00:33 This SetID is a string or the dispatch, and this one is an ID, string or dispatch. So the key here is to make TypeScript understand that the thing we're returning from this is not going to change, it's not going to be appended to, right? Because if you think about this, we've just basically got an array here, right?

00:51 So if I just add R here, and technically, I could push things to this. So I could push a new string to this, right? So we need to tell TypeScript that this is a tuple, not an array. The way we can do this, there's two different ways. We can either say, okay, let's strongly type this inside here.

01:10 And so this one is a React.dispatch, React.setStateFunction or ActionString, and we can stick that in there and that will work. The reason that works is because it explicitly tells TypeScript what this returns, and now if we forget to leave, like if we just leave one off, then it's going to yell at us because the target requires two elements.

01:29 And if we add another one to this, like this, then it's going to yell at us again. There is a really nice different way to do this though, which is you can use asConst on the returned array. This is super nice because what this does is it basically tells TypeScript to infer that this is a tuple and not a big array.

01:48 So you can see here that if we remove the asConst, we get that kind of strange union type that we were dealing with before just there. But then if we put this on here, suddenly it takes a read-only thing, which is useful in itself, and we've got a tuple,

02:04 the first element containing a string and the second element containing React.dispatch. This I think is my preferred solution. It's just beautiful.

# 2. Strongly Typing React Context

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/06-advanced-hooks/46-required-context.problem.tsx

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/06-advanced-hooks/46-required-context.problem.tsx)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=be62522c-76bc-4169-8377-5e169c09abe2&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0201-strongly-typing-react-context-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=be62522c-76bc-4169-8377-5e169c09abe2&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0201-strongly-typing-react-context-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
Here's a `createRequiredContext` function that I use in almost every React project I work on:

```typescript
const createRequiredContext = () => {
	const context = React.createContext(null);

	const useContext = () => {
		const contextValue = React.useContext(context);

		if (contextValue === null) {
			throw new Error("Context value is null");
		}

		return contextValue;
	};

	return [useContext, context.Provider];
};
```

This function creates a new context, then returns the `useContext` hook and the `context.Provider`. If the `contextValue` is null, the function will throw an error. This ensures that we always get the actual context being returned.

There are a couple of examples of how `createRequiredContext` would be used:

First, we have a `useUser` hook that retrieves the user's name from a global provider:

```typescript
const [useUser, UserProvider] = createRequiredContext<{
  name: string;
}>();
```

We also have a `useTheme` hook that retrieves the theme:

```typescript
const [useTheme, ThemeProvider] = createRequiredContext<{
  primaryColor: string;
}>();
```

But we have some problems.

When we hover on `user` we expect to be a type of user, and `theme` to be a type of theme, but instead, we're getting `React.ReactNode` for both.

## Challenge
Your challenge is to make some changes to the `createRequiredContext` function so the `user` and `theme` variables are typed appropriately.

Hint: Start by adding in type arguments to the function, then make additional adjustments from there.

## Transcript
00:00 Here I'm going to show you a function that I copy over to basically every project I do in React, and also that I've seen a bunch in the wild as well. This function is called createRequiredContext. This basically creates a new context, creates a useContext hook,

00:15 and then returns them, basically returning the useContext hook and the context.provider. In the useContext, we're doing something interesting, which is we're basically saying, What we're doing here is we're saying if there is a context value here that could be null, because we're actually creating the context as null,

00:33 then we're saying throw new error context value is null. This means that we always get the actual context being returned here. So useUser, for instance, which is basically a hook to grab the user's name out of the global provider. Imagine that this global provider, then we go and grab that and stick it in,

00:52 you know, our app.tsx or something. And inside here, we've got useThemeThemeProvider. We're expecting this user here to be a type of user, right? But instead, we're actually getting React.ReactNode here. That's bizarre. And same theme here, too. We're getting React.ReactNode. How on earth can that be right?

01:11 useUser here appears to be a function that returns never or React.Provider null. There's a bunch of stuff happening here. And ideally here, inside here, we should be able to pass in a name mat here inside the top level parent, let's say. So there's just so much that's going wrong here. And see if you can fix it.

01:30 You should be able to fix it just by changing this function here. You notice we're going to need to be able to pass in type arguments or just one type argument into createRequiredContext. We're going to need to do a few more things. And just, yeah, you're going to get a sense for how to strongly type this, I think, just by messing about with it a little bit.

01:49 So that's your job. I think I've given you all the information you need. There's a bunch of errors to solve. Good luck.

# Solution: Using Type Arguments to Create A Strongly Typed Context

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/06-advanced-hooks/46-required-context.solution.1.tsx

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/06-advanced-hooks/46-required-context.solution.1.tsx)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=a83307ae-1079-454b-b26e-0e5d69e48b06&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0202-strongly-typing-react-context-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=a83307ae-1079-454b-b26e-0e5d69e48b06&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0202-strongly-typing-react-context-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
The first thing to do is add the ability to pass a type argument into `createRequiredContext`.

## Add a Type Parameter
To do this, we need to add a type parameter `T` and since we are working with a TSX file we need to separate the type parameter with a comma:

```typescript
const createRequiredContext = <T,>() => {
	...
};
```

This resolves a couple of issues right away, but we still have some work to do.

## Fixing the Return Type
For example, when we hover over `useUser` which calls `createRequiredContext`, we see that it returns either a `React.Provider` with `null` or a function that returns `never`:

```typescript
// hovering over useUser shows
const useUser: React.Provider<null> |(() => never);
```

This isn't very convenient.

We can improve this by adding `as const` to the return statement inside of `createRequiredContext`:

```typescript
// inside of createRequiredContext
return [useContext, context.Provider] as const;
```

Now, `useUser` is a function that returns `never`, and `userProvider` is a `React.Provider<null>`.

## Working with the Type Parameter
TypeScript is showing us a warning that the type parameter `T` is declared but never read.

```typescript
// hovering over T shows
'T' is declared but its value is never read.
(type parameter) T in <T>(): readonly [() => never, React.Provider<null>]
```

We want the `context` inside of the function to be strongly typed.

Currently `context` is `null`, which means that the `useContext` hook returns `never` because the `contextValue` is null so the `useContext` hook throws an error.

We do want to keep passing `null` into the `createContext` function, but we don't want to accept an initial value since the value is assigned in the `context.Provider`.

The best way to do this is passing a `T` in the `createContext`:

```typescript
const context = React.createContext<T>(null);
// error under null!
```

But this gives us an error:

```typescript
Argument of type 'null' is not assignable to parameter of type 'T'. T could be instantiated with anything which could be unrelated to 'null'.
```

We want to be able to pass in anything for `T`, but we can't pass in `null`.

One way to fix this would be to use `null as any` to quiet the error. However, this is not the preferred solution:

```typescript
// not the preferred solution
const context = React.createContext<T>(null as any);
```

A better solution is to use the type argument `T | null` which will allow the context value to be either `T` or `null`:

```typescript
// the better solution
const context = React.createContext<T | null>(null);

// hovering over context shows:
const context: React.Context<T | null>;
```

The function will return `T`, but it will filter out any `null` values.

## Being More Explicit
With our current implementation all of our errors are gone and we get good inference, but we can be more explicit.

For example, we can specify that `useContext` will always return `T`:

```typescript
// inside createRequiredContext
const useContext = (): T => {
  ...
```

And set the return type of `createRequiredContext` to be `T, React.Provider<T | null >`:

```typescript
const createRequiredContext = <T,>(): [
  () => T,
  React.Provider<T | null>
] => {
  ...
```

Combining any of these techniques provides a robust solution.

By using this method, you can avoid the common issue of creating a context and not knowing what to pass into it.

Instead of struggling with default values, you can simply pass in `null` and let TypeScript handle the types.

## Transcript
00:00 Okay, let's kick this off by noticing that we need to be able to pass a type argument into createRequiredContext. So let's do that first. Let's say we need to be able to pass in a T here. Oh, of course, there's a TSX file. So let's just add this comma here. And now this solves a couple of issues immediately.

00:17 We notice that useUserReact.provide a null or this function that returns never here. This is not very convenient. What we need to do is we need to basically mark this as const, as we've seen before. Now, this means that useUser is actually a function that returns never, userProvider is a React.provide a null.

00:39 Okay, so we're getting somewhere, but not very quickly. This createRequiredContext then, as you can see, this T is actually declared, but its value is never read. So what do we want to do with this T? Well, we want to make sure that this context is actually strongly typed. Currently, it's only null here. And this means that this useContext hook actually returns never,

01:00 because we're checking to see if context value is null. And if it is null, then we throw an error. Okay, so that means that actually this function is never, ever, ever going to complete, which is why it's inferring never. Very clever TypeScript. So how do we make sure that this is working then? This createContext, when we create this context, we actually do want to still pass in null.

01:22 We never want to accept an initial value here, because the value is actually assigned in the context.provider. So the best way to do this then is to pass in a T here. But we get an error. And the error is argument of type null is not assignable to parameter of type T. T could be instantiated with anything which could be unrelated to null. Yeah.

01:43 So how do we solve that then? Because this actually, if you notice, that now everything is working. Everything is working. So this is really doing well. This means that our useContext here is basically saying, okay, this context value is going to be T.

02:00 And if context value is null, then throw an error, which means we actually always get a proper result out of this. So how do we get around the fact that null is actually like not something that we should be able to pass in here? Well, we can say null as any. You know, we can quiet the error down that way.

02:17 But I prefer this solution, which is actually in this type argument slot is to say T or null. And now if we say T or null, you know, like this context value could be T or it could be null. What this means then is it sort of justifies the construction of this function.

02:35 Because it means that we now can say T is basically going to be like it's going to return T, but it's going to filter out any nulls from it. If we hover over this, then you can see that actually this changes everything, because now this could be T or it could be null.

02:53 And now this user is name string or null. This theme is primary color or null. So just by adding this back in, we're sort of building on the inference here. We're letting TypeScript do the hard work for us. And really, we were just able to add in kind of like three little signatures here. And TypeScript was able to figure out the rest. You can be more explicit.

03:14 If you want to, which is you can say that useContext always returns T, and this always returns, you know, T, ReactProvider or null, or you can mix and match these as well if you want to. So we can say as const here if we want. This, I think, is quite useful because if we actually remove this, then it's going to error and it's going to say T or null is not assignable to type T.

03:34 So I think then this is maybe or certainly this I think is the best solution, this combination of them. But if you want to be really explicit or your TS config says you should be doing like adding explicit return types, then this is a perfectly valid way to do it.

03:48 This means that you get around this sort of annoying situation I'm sure you might have been in before, which is where you create a context and that context, you don't know what to pass in it. You know, you like you have like a default value that maybe you can put in there, but actually you just really don't want to use it at all.

04:05 And really, you just want to pass in null, but the types don't let you. But this is a beautiful way that you can do it without casting and while still having strong access to this value throughout the rest of your application.

# 3. Using TypeScript to Manage Complex State

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/06-advanced-hooks/47-unions-in-usestate.problem.tsx

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/06-advanced-hooks/47-unions-in-usestate.problem.tsx)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=05ce64dd-a4fa-4fe6-b803-8aedcb276a7f&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0301-using-typescript-to-manage-complex-state-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=05ce64dd-a4fa-4fe6-b803-8aedcb276a7f&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0301-using-typescript-to-manage-complex-state-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
Let's explore how TypeScript can be used to make complex state management easier.

Here we have a `useLoadAsyncVideo` hook that is designed to load and play a video based on a given source:

```typescript
export const useLoadAsyncVideo = (src: string) => {
  const [state, setState] = useState("loading");

  useEffect(() => {
    ...
```

The `useLoadAsyncVideo` hook accepts a `src` parameter, which is the source of the video you want to load.

When the loading process starts, we set the state to `Loading`. This allows us to display a loading spinner or similar visual indicator.

```typescript
// inside of useLoadAsyncVideo
useEffect(() => {
	setState("loading");
  ...
```

Next, the hook fetches the video via the source and returns a `blob`. This blob is then used to append the video to the DOM and play it, and the state is set to `loaded`. If there is an error while loading or fetching the video, the state will be set to `error`:

```typescript
// inside of useLoadAsyncVideo useEffect
fetchVideo(src)
  .then((blob) => {
    appendVideoToDomAndPlay(blob);
    setState("loaded");
  })
  .catch((error) => {
    setState("error");
  });
```

Finally, if the video is cancelled at any point, we can mark the cancel flag as `true` and it won't do anything in either of these branches.

Here's the full `useEffect`:

```typescript
useEffect(() => {
	setState("loading");

	let cancelled = false;

	fetchVideo(src)
		.then((blob) => {
			if (cancelled) {
				return;
			}

			appendVideoToDomAndPlay(blob);

			setState("loaded");
		})
		.catch((error) => {
			if (cancelled) {
				return;
			}
			setState("error");
		});

	return () => {
		cancelled = true;
	};
}, [src]);
```

The code for `useEffect` looks good (and won't need to be changed) but there's an issue: the `state` is typed as `string`, which means that we don't have enough information about the possible states that may or may not exist.

```typescript
// @ts-expect-error
if (state === "does-not-exist) {}

// hovering over `state` shows
const state: string
```

## Challenge
Your task is to find a way to make `useState` more strongly typed and add some guardrails to ensure that our implementation behaves as expected with the inference we want.

## Transcript
00:00 Here, we're going to look at how you can use TypeScript to make complex state a little bit easier to deal with. We have a Use Load Async Video hook. What this hook does is it basically, in a use effect, you can pass it a source, which is the source of the video you want to load. What it's going to do is it's going to fetch the video via the source and return a blob.

00:20 That blob is then going to append the video to the DOM and play. Now, there are a few things that we need to take in mind here. When we first start this loading process, we're going to set the state to Loading. That means we can show a loading spinner or something. We're also going to add a cancellation flag, but I'll get to that in a minute.

00:37 So when we finally append the video to the DOM and play it, then we can set the state as Loaded because we know the video is there. Finally, if we have kind of an error in loading the video or even in fetching the video, then it's going to Error instead.

00:52 And finally, if it's cancelled at any point, so basically here we have a cancelled false, so it's not cancelled. Then when we kind of change to a new source, we can mark the cancel flag as true and it's not going to do anything in either of these branches. That's really crucial.

01:09 So this is all good, except for the fact that, in fact, when you go to do this exercise, you don't need to actually change any of this code up here in the use effect. Or basically from here to here, you won't need to change. Use effect is fine. But there's an issue, which is actually this state here is just typed as String.

01:28 So these states that may or may not exist, actually, like down here, it would be great if we could return a loading spinner if the state is loading. And we should also be able to assert down the bottom here that we've covered all the cases, but actually state all the time here is just String.

01:43 So your job is to try to figure out a way that we can make this a bit more strongly typed and get some behaviour in here, like, or get some guardrails so that we know the behaviour will perform as expected.

# Solution: Handling Complex State Management with TypeScript Unions

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/06-advanced-hooks/47-unions-in-usestate.solution.tsx

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/06-advanced-hooks/47-unions-in-usestate.solution.tsx)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=3ed376e5-64a3-48ea-b0d3-5a17a491bc13&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0302-using-typescript-to-manage-complex-state-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=3ed376e5-64a3-48ea-b0d3-5a17a491bc13&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0302-using-typescript-to-manage-complex-state-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
When we declared the state at the beginning of the `useLoadAsyncVideo` Hook, it's initially set as a `string`.

Since we want this state to represent different possibilities such as `loading`, `loaded`, or `error`, we can create a `State` union and then pass it into `useState`:

```typescript
type State = "loading" | "loaded" | "error";

export const useLoadAsyncVideo = (src: string) => {
  const [state, setState] = useState<State>("loading");
  ...
```

With this approach, when we try to set the state or initialize it, we will get autocompletion for one of the defined options.

This provides us with several benefits. For instance, we can't mistakenly check if the state is something that doesn't exist in the `State` union:

```typescript
if (state === "does not exist") {
	// TypeScript will show an error because "does not exist" is not part of the State union
}
```

All of the other tests pass as well.

In the final test, we we've essentially exhausted all the options so we know that the `state` variable will be of type `never`.

```typescript
type test = Expect<Equal<typeof state, never>>;
```

This pattern is incredibly useful for managing complex state in your application, as it helps you track all the possible states your application can be in.

## Transcript
00:00 So, the solution is pretty simple here. When we declare this state up here, it gets declared as String. Now, what we really want is for this actually to be a union of a few different things. We want this to be a union of Loading, Loaded or Error. These are the three different things that this should be.

00:18 And what we can do is actually we can pass this into useState here. And now when that happens, we actually get this state here which is now marked as State. And now when we try to actually set to it or initialize it, then it's going to be one of these options. So, setState Loading, setState Error, setState Loaded. And we get all of these benefits down here.

00:40 So, we can't now check if state is does not exist because this comparison appears to be unintentional. Oh, thank you TypeScript. The state and does not exist have no overlap. So, this doesn't kind of belong on here. And also, when we get to the bottom of here, then really we've run out of options.

00:59 So, now state, if we take a look at it, it's actually never because we've checked if it's Loading, we've checked if it's Loaded and we've checked if it's Errored. So, this is a really, really great pattern for if you're trying to do any kind of complex state management because it lets you figure out all of the different states that can be in your application.

01:18 And we're going to look at another example of this in a minute.

# 4. Using Discriminated Unions in useState

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/06-advanced-hooks/48-discriminated-unions-in-usestate.problem.tsx

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/06-advanced-hooks/48-discriminated-unions-in-usestate.problem.tsx)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=2f41d846-3691-4823-b139-a0b70621e8ec&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0401-using-discriminated-unions-in-usestate-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=2f41d846-3691-4823-b139-a0b70621e8ec&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0401-using-discriminated-unions-in-usestate-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
We're back with our `UseLoadAsyncVideo` hook, just with a slightly different representation of how `useState` works.

Instead of just having `loading` or `loaded`, we're now using an object with `status: "loading"`:

```typescript
export const useLoadAsyncVideo = (src: string) => {
  const [state, setState] = useState({
    status: "loading",
  });
  ...
```

This seems to be working great, except for the cases where we expect there to be an error.

Inside of the `catch` block, we want to set the state to `error`:

```typescript
// inside of useLoadAsyncVideo useEffect
setState({ status: "error", error });
```

That means that this is supposed to be an error because it only has a `status` and not an `error`:

```typescript
// @ts-expect-error
setState({ status: "error" });
```

Then when we try to `console.log(state.error)`, we get an error from TypeScript because the property `error` does not exist on type `status: string`:

```typescript
if (state.status === "error") {
	console.log(state.error);
}
```

## Challenge
Your job is to try to figure out a way that we can represent the `error` state with a type, and then use it to properly type `useState`.

## Transcript
00:00 In this exercise, we're back with our UseLoadAsyncVideo hook, except we've decided to go for a slightly different representation of how this useState works. Instead of just having loading in there or loaded in there, we're actually now using an object with status Loading.

00:15 Except, I mean, this is working great, except for the cases where we want an error. Because when we want an error here, we basically want to say, okay, whenever there is an error, we want there to be an error present on that object. So we have a piece of state that's kind of dependent on a status.

00:34 And here we've got some stuff in here that's supposed to be erroring, where we have a setState status Error. That's supposed to be an error because it's not including an error. Here we've got one which is status Loading, which is basically supposed to be erroring because it's like it shouldn't have an error on there if we're loading.

00:51 And here it's got status Loaded where it should be erroring because we've got an error and it's loaded. You get the idea. We also got a check down here to see if if state.status equals error, we want to console.log this error. And this is currently erroring because property error does not exist on type status string.

01:08 So your job is to try to figure out a way that we can represent this with a type and then use this in our useState to type it properly. Good luck.

# Solution: Handling Different State Values with Discriminated Unions

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/06-advanced-hooks/48-discriminated-unions-in-usestate.solution.tsx

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/06-advanced-hooks/48-discriminated-unions-in-usestate.solution.tsx)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=850b0c6d-361a-4dbf-a8ec-9d5ca9cf45bd&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0402-using-discriminated-unions-in-usestate-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=850b0c6d-361a-4dbf-a8ec-9d5ca9cf45bd&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0402-using-discriminated-unions-in-usestate-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
The solution to handling different states is very similar to one we've covered before with a discriminated union.

We have three different states to represent, each with different properties:
1. **Status Loading** - has no error
2. **Status Loaded** - has no error
3. **Status Error** - has an error

We can create a discriminated union to represent these states and pass it into the `useState`:

```typescript
type State =
  | {
      status: "loading";
    }
  | {
      status: "loaded";
    }
  | {
      status: "error";
      error: Error
    };

export const useLoadAsyncVideo = (src: string) => {
  const [state, setState] = useState<State>({
    ...
  });
```

Now, everything works as expected. This is cool because we're capturing two statuses in one little area, both of which have the same exact props but very different meaning to our UI.

If you don't pass an error in the error state, TypeScript will throw an error because the `error` property is missing.

Having a discriminated union with `useState` makes it a lot more concise, and provides a great alternative to using `useReducer` in cases where multiple properties need to be tracked.

## Transcript
00:00 The solution here is very similar to one that we've covered before with a discriminated union. You can think about this in that we have three different states that we need to represent here, each with different properties. We have a status Loading which has no error, we have a status Loaded which has no error, and we have a status Error which has an error.

00:17 So we can create a discriminated union. Let's say type state equals status Loading, or status Loaded, or status Error.

00:33 And with status Error, we want to make sure that you have to pass in error, which is going to be a type of error. There we go. Nice and simple. Now this error, is this not correct? Error does not exist on type status action. Of course, I actually need to pass it in to the useState here.

00:50 I was thinking TypeScript was a little bit too magic there. So now our state is state, and our state is a lot more descriptive. We can shorten this if we want to. We can say status Loading or Loaded here.

01:05 This is kind of neat actually, because now we're capturing two statuses in one little area there, both of which have the same exact props but very different meaning to our UI. One shows a loading spin and one doesn't. And this one is the only one with status Error here. So this is probably the most terse way to do it.

01:23 And now everything works as expected. If I don't pass an error here, it's going to yell at me because error is missing and blah, blah, blah, blah, blah. And this one's going to yell at me for the same reason, except I have passed an error when I shouldn't have.

01:35 So this is a really, really nice way, and I think a lot of people overlook this as a power that you can do with useState. We often reach for useReducer in these situations because we think, OK, we need more than one property to track. Let's use useReducer here. But actually useState can handle a lot of different things that you throw at it,

01:53 and having a discriminated union here makes useState a lot smarter and pretty robust.

# 5. Discriminated Tuples in Custom Hooks

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/06-advanced-hooks/49-discriminated-tuples-from-custom-hooks.problem.tsx

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/06-advanced-hooks/49-discriminated-tuples-from-custom-hooks.problem.tsx)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=8d948288-ff63-4d1f-99f7-d0dd12efb49a&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0501-discriminated-tuples-in-custom-hooks-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=8d948288-ff63-4d1f-99f7-d0dd12efb49a&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0501-discriminated-tuples-in-custom-hooks-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

Here we have a `useData` hook that returns a `Result<T>`.

`Result<T>` is defined as a tuple containing three different statuses: `loading`, `success`, and `error`.

```typescript
export type Result<T> = [
	"loading" | "success" | "error",
	T | Error | undefined
];
```

The `useData` hook fetches data from a URL, processes the response, and sets the state.

```typescript
export const useData = <T>(url: string): Result<T> => {
  const [result, setResult] = useState<Result<T>>(["loading", undefined]);
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setResult(["success", data]))
      .catch((error) => setResult(["error", error]));
  }, [url]);

  return result;
};
```

Although the `result` seems to be typed well, there's an issue when we try to use it.

Inside of `useState`, hovering over the `value` shows us that it's either an `Error`, `title: string`, or `undefined`.

When using the `useData` hook in a component, we get errors because we don't have `value.message` or `value.title` defined.

```typescript
const Component = () => {
	const [status, value] = useData<{ title: string }>(
		"https://jsonplaceholder.typicode.com/todos/1"
	);

	if (status === "loading") {
		return <div>Loading...</div>;
	}

	if (status === "error") {
		return <div>Error: {value.message}</div>; // error!
	}

	return <div>{value.title}</div>; // error!
};
```

## Challenge
Your task is to find out what kind of other type signature we could define for the `Result` type that will resolve these errors.

You shouldn't need to change anything inside the `useData` hook– just make a small change to the type definition, and you should start to see it working.

## Transcript
00:00 In this exercise, we have a UseDataHook and the UseDataHook returns a ResultTee. ResultTee is defined as a tuple with three different statuses in there. And we've got Loading or Success or Error. And here it's defined as either Tee or Error or Undefined.

00:19 So this basically, what it does, it just fetches from a URL, then grabs the response, then sets it to SuccessData. So this result is sort of seemingly typed pretty well, except for the fact that when we go to use it, they're not sort of discriminating based on each other.

00:37 So here, Value is either Error or TitleString or Undefined, and Status is Loading or Error or Success. But what we can see here is that when we have this error here, we don't have an error defined as the value. When we've filtered out Loading and Error,

00:56 we don't have a kind of value.title here either. So this isn't right. Ideally, what we would like here is for these things to be grouped together. So your job is to work out what kind of other type of type signature we could define for this result in order to make this all work.

01:15 You shouldn't have to change anything in here, I don't think. It should just be a little change up here, and then you'll start to see it working. Good luck.

# Solution: Improved Type Safety with Discriminated Tuples in TypeScript

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/06-advanced-hooks/49-discriminated-tuples-from-custom-hooks.solution.tsx

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/06-advanced-hooks/49-discriminated-tuples-from-custom-hooks.solution.tsx)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=f0029992-bdaa-42ed-8091-acb998f47136&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0502-discriminated-tuples-in-custom-hooks-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=f0029992-bdaa-42ed-8091-acb998f47136&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0502-discriminated-tuples-in-custom-hooks-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
The solution is to update `Result` to be a discriminated tuple.

Basically, we'll take all of `Result`'s content and put it inside of 3 different tuples.

Here's what `Result` looked like before:

```typescript
// starting point
export type Result<T> = [
	"loading" | "success" | "error",
	T | Error | undefined
];
```

And here's what `Result` looks like as a discriminated tuple:

```typescript
// discriminated tuple solution
export type Result<T> =
	| ["loading", undefined]
	| ["success", T]
	| ["error", Error];
```

Because `loading`'s value is `undefined`, we can mark it as optional and not have to pass it in:

```typescript
export type Result<T> =
	| ["loading", undefined?]
	| ["success", T]
	| ["error", Error];
```

With this change, everything's working.

TypeScript is able to understand that when you create this tuple, it has three different parts for `error`, `loading`, and `success`.

This means when we go to use it, we get nice autocompletion:

```typescript
// inside of useData
const [result, setResult] = useState<Result<T>>([""]);
// autocomplete for error, loading, or success
```

Down in the `Component` when we use `useData`, TypeScript understands the relationship between `status` and `value` when they are destructured.

It knows that if `status` is a certain thing, then `value` is going to be a certain thing, too:

```typescript
const Component = () => {
	const [status, value] = useData<{ title: string }>(
		"https://jsonplaceholder.typicode.com/todos/1"
	);

// hovering over value shows
const value: Error | {
  title: string;
} | undefined
```

This behavior breaks the traditional understanding of destructuring.

You might think that destructuring a discriminated union of objects wouldn't work, but surprisingly, with tuples it does!

It's surprising that more libraries don't take advantage of this technique to improve code readability and maintainability.

Don't be afraid to explore this powerful approach when working with discriminated unions of objects, as it can lead to cleaner and more understandable code for the people consuming your functions.

## Transcript
00:00 So, you might have figured out the solution here. It's really, really neat, which is we can use a discriminated tuple for this. So, let's say we take all of this and we basically put it inside three different tuples. So, tuple 1, tuple 2 and tuple 3. For the first

00:18 tuple, we're going to give the first member loading and the second member is going to be undefined here. For the second tuple, we can have success and this is going to be with our T attached to it. And you can see, as I filled in that, then this one worked here.

00:35 The other one that's not working is error any. So, let's put error and instead of any, let's use an error instead. So, now we've got our results properly typed. We've got loading undefined, success T, error, error. And now suddenly everything's working. Why

00:51 is it working? So, there's a few things to break down here. First of all, it's really smart that TypeScript understands that when you create this tuple, you get three different parts here, error, loading and success. I can't pass in an error, obviously, into success

01:05 because this is, like, it's not assignable to T. So, I have to start off with loading undefined. And by the way, you can also specify this as a kind of like an optional member of this tuple. So, I don't even need to pass this here if I don't want to, which is pretty

01:23 beautiful, actually. Then down here, we basically, this is really, really smart. When you destructure this, TypeScript understands the relationship between these two components. It understands

01:37 that if status is a certain thing, then value is going to be a certain thing, too. So, this breaks the rule or breaks our understanding of destructuring because you think of, like, destructuring a discriminated union of objects, this wouldn't work, surely. But with tuples,

01:53 it does. This is so, so smart. And it means, actually, we just get a really clean API up here and a really clean API down here. So, I would recommend actually using this more often, and I'm surprised that more libraries don't. It's just a really, really lovely way

02:09 to kind of make your code more understandable for the people that are consuming the functions of your library. Lovely stuff.

# 6. Use Function Overloads for Better Type Inference

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/06-advanced-hooks/50-use-state-overloads.problem.ts

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/06-advanced-hooks/50-use-state-overloads.problem.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=38bcc61b-36fe-4279-8769-559ad4998be1&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0601-use-function-overloads-for-better-type-inference-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=38bcc61b-36fe-4279-8769-559ad4998be1&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0601-use-function-overloads-for-better-type-inference-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

This exercise is more of a thought experiment.

The `maybeReturnsString` function takes an input and returns a string or `undefined`. If you pass a string to it, the function returns that string. However, if you pass something else, the function might return a string or `undefined`.

You can't be certain about the output in this case.

```typescript
function maybeReturnsString(defaultString?: string) {
	//If you pass a string, it always returns a string
	if (defaultString) {
		return defaultString;
	}

	//Otherwise, it MIGHT return a string or undefined
	return Math.random() > 0.5 ? "hello" : undefined;
}
```

Here's a variable `example1` that calls `maybeReturnsString` with a string of `"hello"`:

```typescript
const example1 = maybeReturnsString("hello");

// hovering over maybeReturnsString shows
function maybeReturnsString(defaultString?: string): string | undefined;
```

In this case, `example1` should be typed as just `string`, but instead it's typed as `string | undefined`.

## Challenge
Your task is to find a way to type `maybeReturnsString` function to achieve the desired behavior.

It would be better to use function overloads for your approach instead of generics.

Hint: You may want to investigate how function overloads work in the `useState` hook– there's one where an initial state is passed in, and one where it isn't.

## Transcript
00:00 This exercise is really a thought experiment. We have a function here called maybeReturnsAString. And what maybeReturnsAString does, if you return it, if you pass it a string, it's going to actually return that default string there. Otherwise, it might return a string or it might return undefined.

00:19 You actually just don't know. So what we want to do here is we want to say, OK, when maybeString returns a string, we've got this hello inside here. This should be typed as string, but it's not. It's typed as string or undefined. And this one here should be typed as string or undefined. So that's good.

00:35 So you are going to need to basically find some way of doing this. I would not recommend generics for this. I would instead recommend function overloads. That's all the clue I'm going to give you. You're going to need to investigate how function overloads work.

00:52 And I will also say that this is very, very similar to the useState overloads. So the useState overloads inside here. We've actually taken a look at these before, I think. And there's just two overloads here. One where you do pass an initial state and one where you don't.

01:08 So those might be interesting to take a look at in terms of copying them over. But good luck.

# Solution: Overloading Functions in TypeScript

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/06-advanced-hooks/50-use-state-overloads.solution.1.ts

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/06-advanced-hooks/50-use-state-overloads.solution.1.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=306f3c5a-4fd6-40a8-b55a-4941c6983675&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0602-use-function-overloads-for-better-type-inference-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=306f3c5a-4fd6-40a8-b55a-4941c6983675&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0602-use-function-overloads-for-better-type-inference-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

Let's declare some function overloads for `maybeReturnsString` that will have different behaviors based on the input parameters.

We'll do this by adding another function above `maybeReturnsString` with the same name. This function will take in `defaultString` and return a string.

```typescript
function maybeReturnsString(defaultString: string): string;
function maybeReturnsString(defaultString?: string) {
  ...
```

With this addition, the first example works as expected:

```typescript
const example1 = maybeReturnsString("hello");
```

However, the second example is showing us an error that it expected 1 argument, but got 0:

```typescript
const example2 = maybeReturnsString(); // error under maybeReturnsString
// Expected 1 arguments, but got 0.
```

The reason for this error is that the overload signature is not compatible with its implementation signature.

With function overloads, you can add multiple signatures above the original function implementation signature.

However, the actual function implementation, cannot be seen from outside the function. This means that any signature defined in the implementation must be compatible with the overload signatures.

In this case, the implementation signature is not compatible with the overload signature we added earlier, causing the error.

To fix this issue, make sure that the overload signatures are compatible with the implementation signature.

To fix this, we need to have two external facing signatures for both of our possibilities, in addition to the implementation signature:

This means we need to add an overload for when no arguments are passed in that will return `string` or `undefined`:

```typescript
function maybeReturnsString(defaultString: string): string;
function maybeReturnsString(): string | undefined;
function maybeReturnsString(defaultString?: string) {
	//If you pass a string, it always returns a string
	if (defaultString) {
		return defaultString;
	}

	//Otherwise, it MIGHT return a string or undefined
	return Math.random() > 0.5 ? "hello" : undefined;
}
```

It can be helpful in your code to add comments for each overload:

```typescript
/** 
 * Hello with default string
 */
function maybeReturnsString(defaultString: string): string;
/**
 * No parameters passed in 
 */
function maybeReturnsString(): string | undefined;
function maybeReturnsString(defaultString?: string) {
  // If you pass a string, it always returns a string
  if (defaultString) {
    return defaultString;
  }
  ...
}
```

With this change, our errors are resolved, though this approach is not very safe because of the disconnect between the function implementation signature and the overloads.

In this case it's fine because we only pass a string to the function, but it's possible to pass a number or boolean to the function, which will cause an error.

This concept of function overloads is crucial when you're wrapping `useState` and similar logic in TypeScript.

## Looking at Function Overloads for `useState`
Jumping to the type definitions of `useState`, we can see it is a generic function that takes in a parameter `S` that represents the state, and there are two overloads.

The first overload declares an initial state, which cannot be `undefined`.

```typescript
function useState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>];
```

The second overload doesn't take any argument, and the first member of the tuple can be `S` or `undefined`. The `setState` action can also be `S` or `undefined`.

```typescript
function useState<S = undefined>(): [S | undefined, Dispatch<SetStateAction<S | undefined>>];
```

## Comparing the `useState` Overload Approach to `maybeReturnsString`
The current `maybeReturnsString` implementation ensures that when you pass in a default string, you won't get `undefined` in the signature at the end.

However, there's another approach that can be taken.

In the second empty parameter overload, we make the `defaultString` optional and typed as a `string` or `undefined` and return `string` or `undefined`.

Here's the before:

```typescript
function maybeReturnsString(): string | undefined;
```

And the after:

```typescript
function maybeReturnsString(
	defaultString?: string | undefined
): string | undefined;
```

It's also important to note that function overloads are hit in the order they're declared, so you want to make sure that the order of your overloads is correct.

This updated approach is better than the original overload, as it avoids the issue of the argument of type `undefined` not being assignable to a parameter of type `string`.

When in doubt, in VS Code you can `CMD + click` on the call and it will jump you to the applicable overload.

Function overloads are great for when you want to have different behaviors based on different inputs.

## Transcript
00:00 So, what we want to do here is we want to declare some overloads that declare different behaviors for this MaybeReturnString function. Now, what we want to do here is we actually, the way you can make this work is you can actually add another function above this with the same name, MaybeReturnString.

00:18 And in here, we're going to encode what happens when you pass it a default string. So this default string is going to be a string, then we know that it returns a string inside here. So now MaybeReturnsString, you pass it a default string, and it has to return a string.

00:35 So now we can see that example one is working, MaybeReturnsHello, beautiful, but we can also see that the second one here is actually just not working at all. It says expected one arguments, but got zero. This doesn't seem to make sense because we've got this signature here, which is basically

00:53 saying, okay, you can either pass this in or not, but here's the thing. In overloads, you have these signatures above it, and you can actually have many of these if you want to. Currently, this one has five that are all the same, but this one here is the implementation signature, and the implementation signature can't be seen from outside the function.

01:12 So anything you define in here, it has to be compatible, so it can't request a number, for instance. So this one, this overload signature is not compatible with its implementation signature, but this one's not visible to outside. So in order to declare kind of two different types of behavior, which is what we have here,

01:31 we actually want to declare two different overloads, or rather three different overloads, but these two are the kind of external facing ones, and this one is the implementation one. So this one, MaybeReturnsString, here, we actually want it to pass no arguments at all,

01:48 and it's going to return string or undefined. MaybeReturnString, if you don't pass anything, returns string or undefined. So it hits this branch here. This is really, really nice, and also, by the way, we can actually add different js.comments per overload.

02:03 So we can say, hello world, up here, and let's say, hello with default string. And then if we hover over each one here, it says, hello with default string, and hello world. Really cool. So you might notice, though, that this sort of default string inside here, it's actually

02:23 not very safe, really, because technically, we could return a bunch of different stuff from here. We could return string or undefined or number or boolean, and actually, these, it seems, can be wider than this one here, but it's not really doing any kind of checking from

02:39 the function overloads to actually the function overload implementation, or it's doing kind of a tiny little bit. So for instance, if we say, default string, or you could pass a number, or you could pass a boolean, or things like this. This is still safe, because externally, we're still only passing a string, so it's never

02:58 going to hit this number or boolean branch, but you can see there's just a little bit of a disconnect between the function implementation signature and the overloads that appear above it. So this really maps on well onto our useState logic, and this is really important for when you're wrapping useState.

03:15 So if we go back to the problem here, then we can command click, and we can see that useState is a generic function that takes in this S here, which represents the state, and we've got one overload where the initial state is declared here, and it's basically

03:31 saying, okay, this can't be undefined, whereas this one down here, useState, it's got no argument being passed in, so this is when you don't pass an argument to useState, and here it's saying that the first argument of the tuple, or first member of the tuple, is going to be S or undefined, and the setState action is going to be S or undefined as well.

03:51 So yeah, like, it's interesting that useState is kind of built this way, really. I think it's to ensure that this case works really well, that when you do actually pass in a default string, you're not going to get undefined in the signature at the end. But I wonder whether that's the best approach, at least.

04:09 But there is one more approach I want to describe here, which is you can, in this second overload, you can say maybe return string and have this default string be optional here, so either string or undefined. This means you can actually pass undefined inside here, whereas here it's actually not

04:26 permitted, which is a slightly funny little wrinkle, if you notice it. Argument of type undefined is not assignable to parameter of type string. So I'd say the second solution is actually a little bit better, and just means that you have this overload. You notice that, by the way, the overloads are hit in the order that they're declared.

04:43 So if we had this one down here, then we'd actually end up erroring, because what we're doing here is we're actually passing, like, this maybe return string. A cool trick here is you can actually command click on this to see which overload is being triggered. So this one is triggering this overload, the top one, and this one is also triggering this

05:02 overload on top. So that means then that this example one is still string or undefined, because it's corresponding to this. Whereas, if I move this to the top, now this one corresponds to the top one, and this one corresponds to the second one. Beautiful. So that's a nice little trick to make sure your function overloads are all matching up

05:23 properly. But there we go. This is a kind of intro to function overloads, using them to increase our understanding of how useStates overloads work.

# 7. Mimicking useState Behavior with Function Overloads

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/06-advanced-hooks/51-function-overloads-in-hooks.problem.ts

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/06-advanced-hooks/51-function-overloads-in-hooks.problem.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=a051c007-cce5-49ba-b5a6-a98d1bceef37&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0701-mimicking-usestate-behavior-with-function-overloads-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=a051c007-cce5-49ba-b5a6-a98d1bceef37&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0701-mimicking-usestate-behavior-with-function-overloads-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
We introduced the `useStateAsObject` function in the Generics section of the workshop:

```typescript
export function useStateAsObject<T>(initial: T) {
  const [value, set] = useState(initial);
  return {
    value,
    set,
  };
}
```

Now, we want to make `useStateAsObject` behave exactly like `useState`.

## Challenge
Your challenge is to mimic the function overloads on `useState` while also replicating the generic signature.

Don't worry about the behavior where you can pass a function to `useState`. Instead, focus on the basic initial type so the tests pass.

With the knowledge and tools you've gained from our previous exploration of `useState`, you should be well-equipped to tackle this challenge!

## Transcript
00:00 We first saw our useStateAsObject function back in the generic section. But here, what we want to do is we want to make it behave exactly like useState. Now, we want to actually mimic all of the overloads on useState, but also kind of mimic the generic signature here, too.

00:16 I don't think we want to worry about the behavior where you can pass a function to useState and sort of do it that way. We just want to do it with the basic initial type here. So we just want to make these types pass, essentially. So this one here, ideally, we should be able to pass nothing to useStateAsObject. And it should be typed as value number or undefined.

00:38 And we should be able to set a state on it, number or undefined. So really, we're just like increasing the power of our abstraction, making it behave more like useState. Now, what we're going to do is we're going to need some function overloads here. I think from our explanation of useState or our exploration of it before, you should have all the equipment you need to be able to solve this yourself. Good luck.

# Solution: Wrapping useState Functionality with Function Overloads

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/06-advanced-hooks/51-function-overloads-in-hooks.solution.1.ts

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/06-advanced-hooks/51-function-overloads-in-hooks.solution.1.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=b8f732c0-64ab-4f2e-b4c2-c09527668912&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0702-mimicking-usestate-behavior-with-function-overloads-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=b8f732c0-64ab-4f2e-b4c2-c09527668912&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0702-mimicking-usestate-behavior-with-function-overloads-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
Let's start by trying a naive approach.

## The Naive Approach
First we'll update `useStateAsObject` to make the `initial` parameter optional.

```typescript
export function useStateAsObject<T>(initial?: T) {
	// ...
}
```

Now when we hover over `initial`, TypeScript interprets it as either `T` or `undefined`.

```typescript
// hovering over `initial` shows
(parameter) initial: T | undefined
```

However, this causes an issue.

When we pass a value to `useStateAsObject`, it will hit the first overload of `useState`.

```typescript
useState<T | undefined>(initialState: T | (() => T | undefined) | undefined): [T | undefined, React.Dispatch<React.SetStateAction<T | undefined>>]

(+1 overload)
```

The problem is that TypeScript isn't clever enough to hit the second overload when we pass `undefined`. Instead, it will give us an error that `undefined` is not assignable to `T`.

To fix this issue, we need to copy `useState`'s overloads in any function that wraps it.

## Copying `useState`'s Overloads
Let's first get the outer behavior working by adding an overload.

For the new overload, we'll remove the optional `?` from the `initial` parameter and set its return type to have a `value` of `T` and a `set` of `React.Dispatch<React.SetStateAction<T>>`.

Here's what it looks like so far:

```typescript
export function useStateAsObject<T>(initial: T) {
	value: T;
	set: React.Dispatch<React.SetStateAction<T>>;
}
export function useStateAsObject<T>(initial?: T) {
  // ...
```

Now we need to fix the error where not passing a value should be undefined.

To do this, we'll create another overload. This time, we'll remove the `initial` parameter and set the return type to have a `value` of `T` or `undefined` and a `set` of `React.Dispatch<React.SetStateAction<T | undefined>>`.

```typescript
export function useStateAsObject<T>(initial: T) {
	value: T;
	set: React.Dispatch<React.SetStateAction<T>>;
}
export function useStateAsObject<T>(): {
  value: T | undefined;
  set: React.Dispatch<React.SetStateAction<T | undefined>>;
}
export function useStateAsObject<T>(initial?: T) {
  // ...
```

With this extra overload the code behaves as it did before, but it's more accurate since we know that `value` is not always a number.

## Making the Code More Readable
Our code is working, but we could make it a bit more readable by wrapping the return types in a new `useStateReturnValue` type:

```typescript
type UseStateReturnValue<T> = {
  value: T;
	set: React.Dispatch<React.SetStateAction<T>>;
};

export function useStateAsObject<T>(): UseStateReturnValue<T | undefined>;
export function useStateAsObject<T>(initial: T): UseStateReturnValue<T>;
export function useStateAsObject<T>(initial?: T) {
  const [value, set] = useState(initial);
  ...
```

## Wrapping Up
We've learned that when you're wrapping `useState` and similar logic in TypeScript, you need to mimic the overloads of the hook that you're using in order to get all of its API out.

The process is kind of annoying, but it's a really cool trick to know if you're ever doing a library that directly wraps `useState` or `useReducer` or one of the other hooks that have multiple overloads.

Just remember, you should be careful with function overloads, as it's easy to end up in an impossible position and TypeScript won't warn you!

## Transcript
00:00 So let's take a look here. Let's try a naive approach first, where we just basically make this an optional param here. So what happens if we make it an optional param? Well, useState here ends up actually inferring it as T or undefined,

00:14 because technically initial here, it could be T or it could be undefined, which hits the first overload of useState here. So what that means then is that what happens if we just pass in this T inside there,

00:28 essentially removing the idea that this could be undefined? Well, type undefined is not assignable to this. So what we're seeing here is we're basically hitting this first overload again. You might think, okay, TypeScript is clever enough that when we hit the undefined overload, we're going to hit the second overload.

00:47 But in fact, no, whenever we pass an argument to this, it's going to actually just hit the first overload, meaning that undefined is never assignable to it. So what this means then is we need to copy useState's overloads in any function that wraps it.

01:03 So let's say then that instead of... let's actually just get the outer behavior working first, because this seems to be working. So what we're going to do is we're going to say export function useState as object. We're going to still keep the T, actually, and we're going to go initial T.

01:21 And now we end up needing actually a type here to explain what's being returned. So let's say value is T and set is going to be a React.dispatch React.setStateAction T. And this, if I remember correctly, yes, is the thing that we've got here.

01:39 So now inside our function, it's still working and outside our function, it's still working, except for just this bit here where we don't pass one. So let's do that as well. Let's actually copy this over. And now we just remove the initial T here. There we go. Looking good.

01:57 No, we're not, because this needs to be now value T or undefined. This one here too, T or undefined. If we didn't have those, you see that it's basically just behaving as it was before, where value is always a number. Whereas, in fact, we know it's not a number. You notice here, too, how easy it is for us to lie with these function overloads.

02:17 So here, we're basically never passing in undefined here. Well, rather, yeah, we're never going to pass an initial value here, but we're lying and saying that actually this value is T only, never undefined. So you have to be a bit careful with these function overloads because it's very easy to actually end up in an impossible position and TypeScript won't warn you about it.

02:38 But this one now is working beautifully. So what have we learned here, really? Well, actually, there's one more thing to do here, which is to take these object types and actually put them in a, like, this is very ugly, really. Like, look at this. So here's one I baked earlier, which is you actually can wrap these in a useState return value.

02:56 This is just a type helper that kind of sits next to these and make sure that these function definitions look a little bit prettier. And we can see, too, that we've also removed some duplication in the undefined bit, too. So we've got our T here and useState return value, T or undefined. You notice here we've got generics on or type arguments on each line.

03:15 You can actually have, like, different type arguments for different generics, too, or different, like, numbers of type argument per overload, which is extremely cool.

03:25 But yeah, like this song and dance where you have to mimic the overloads of the hook that you're using in order to get all of its API out is pretty annoying. But it's a really cool trick to need to know if you're ever doing a library that directly wraps useState or useReducer or one of the other hooks that have multiple overloads. There you go.

# 8. Currying Hooks

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/06-advanced-hooks/52-currying-hooks.problem.ts

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/06-advanced-hooks/52-currying-hooks.problem.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=289843d5-3e01-4eb9-b958-f1f8ec1fdba3&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0801-currying-hooks-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=289843d5-3e01-4eb9-b958-f1f8ec1fdba3&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0801-currying-hooks-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
Let's look at the pattern of currying hooks, or "hooks that return hooks".

Here we have a `useCustomState` function:

```typescript
const useCustomState = <TValue,>(initial: TValue) => {
  const [value, set] = useState<TValue>(initial);

	return {
    value,
		set,
		useComputed: (factory: (value: any) => any, deps?: DependencyList) => {
			return useMemo(() => {
        return factory(value);
			}, [value, ...(deps || [])]);
		},
	};
};
```

The `useCustomState` function takes in an initial value, which is then passed into `useState`. The function returns `value` and `set`, as well as a `useComputed` hook.

The `useComputed` hook takes in a `factory` and a list of `dependencies` which are then passed to `useMemo` which will respond to the `value`.

This function can be used in some really cool ways.

For example, we can pass in an array of numbers, and then use the `useComputed` hook to extract those numbers, make another array from them, reverse it, and map them over with a string:

```typescript
const Component = () => {
	const arrayOfNums = useCustomState([1, 2, 3, 4, 5, 6, 7, 8]);

	const reversedAsString = arrayOfNums.useComputed((nums) =>
		Array.from(nums).reverse().map(String)
	);
```

However, as seen in our test, the `reversedAsString` variable is currently typed as `any` instead of an array of strings:

```typescript
const arrayOfNums: {
  value: number[];
  set: React.Dispatch<React.SetStateAction<number[]>>;
  useComputed: (factory: (value: any) => any, deps?: DependencyList) => any;
};

type test = Expect<Equal<typeof reversedAsString, string[]>>; // error!
```

## Challenge
Your challenge is to work out how to better type the `useComputed` function so that it can handle a certain value being passed in and a different value being returned.

In other words, making the error go away by setting `useComputed` to return an array of strings is not the solution!

## Transcript
00:00 In this exercise, we're going to look at a really cool pattern that I kind of wish was utilized more, which is hooks returning other hooks. Now here we have a useCustomState function, which is kind of like a slightly rubbisher version of our useState that we pretty much just created,

00:16 where we have an initial value that's being passed in, we pass that into useState, and we return value and set, except we also return a useComputed hook.

00:26 And useComputed here takes in a factory and takes in a list of dependencies and passes those to a useMemo, where the useMemo actually responds to this value here.

00:39 This means that you can use it in a really cool way, where you have an array of numbers here, which is this useCustomState, and we've got the array of numbers value and the set. And here then we can say reverseString, basically what we're doing is we're saying array of numbers, use the computed version of this to then extract those out,

00:59 make another array from them, reverse it, and map them over with a string. So this should be an array of strings, but currently it's typed as any. So your job here is to work out how to better type this useComputed function so that it handles the criteria below and so they could potentially handle any value.

01:18 We don't want useComputed to always return an array of strings, absolutely not. It needs to be something where we can pass it in a certain value and receive out a different value. Good luck.

# Solution: Inferring Type Arguments in Curried Hooks

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/06-advanced-hooks/52-currying-hooks.solution.ts

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/06-advanced-hooks/52-currying-hooks.solution.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=f9de8b1c-a50c-4cb9-b204-d12a64c5d027&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0802-currying-hooks-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=f9de8b1c-a50c-4cb9-b204-d12a64c5d027&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0802-currying-hooks-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
First we need to infer the `reversedAsString` from the `useComputed` hook inside of `useCustomState`.

To do this, we'll add a new generic `TComputed`

```typescript
const useCustomState = <TValue, TComputed>(initial: TValue): => {
	...
```

Next for the `useComputed` hook, we'll replace the `value`'s `any` with `TValue` and the return's `any` with `TComputed`:

```typescript
// inside of useCustomState
useComputed: (
   factory: (value: TValue) => any,
   deps?: DependencyList
) => {
   return useMemo(() => {
      ...
```

Unfortunately, this doesn't work as expected.

In the tests, the `TComputed` is still inferred as `unknown` and `reversedAsString` is now also `unknown`.

This tells us that `TComputed` is in the wrong spot.

## Fixing the Computed Inference
Think of generics being bound to function calls or class instantiations.

In this example, in the outer function call to `useCustomState`, TypeScript can't infer anything about `TComputed` on its own.

We could pass in values, for example a number array and a string array:

```typescript
const arrayOfNums = useCustomState<number[], string[]>([
	1, 2, 3, 4, 5, 6, 7, 8,
]);
```

But the better solution would be to infer them at the moment `useComputed` is called. This would also support cases where multiple `useComputed` calls return different shapes of data.

This means we need to remove the `TComputed` generic from `useCustomState` and add it to `useComputed` instead:

```typescript
const useCustomState = <TValue>(initial: TValue) => {
  const [value, set] = useState<TValue>(initial);
  
  return {
    value,
    set,
    useComputed: <TComputed>(
      factory: (value: TValue) => TComputed,
      deps?: DependencyList,
    ) => {
      return useMemo(() => {
        return factory(value);
      }, [value, ...(deps || [1])]);
    },
  };
};
```

Now, `useComputed` becomes the source of where the type gets inferred from.

We can see this when we hover over `reversedAsString`'s call to `useComputed`:

```typescript
// hovering over useComputed
(property) useComputed: <string[]>(factory: (value: number[]) => string[], deps?: DependencyList) => string[]
```

If we create another example that uses an array of booleans, it also will work as expected:

```typescript
const reversedAsBoolean = arrayOfNums.useComputed((nums) =>
	Array.from(nums).reverse().map(Boolean),
);
```

Hopefully, this discussion has given you an idea of how functions that use generics need to capture them at the point where they're used and where they're inferred from.

This means you can come up with really amazing patterns with functions, like returning other generic functions, which infer the generics where they're carried in.

This pattern of creating an outer hook and returning a hook from inside it is sometimes referred to as "currying hooks".

It's a really beautiful way to compose behavior and is often underutilized.

## Transcript
00:00 Okay, so the thing we need to think about here is that really this reversed as string needs to be inferred from somewhere. And it needs to be inferred from this useComputed bit here. The function that we pass to useComputed is going to basically dictate what this reversed as string gets inferred as,

00:18 meaning we need a generic here. Now let's say we just add a generic up the top here. We've got tComputed. Now tComputed currently is not actually being used here. Its value is never read. And if we hover over useCustomState here, it's currently being inferred as unknown.

00:36 Now what we could do here, we know probably that the value here in nums, this one shouldn't be any, it should actually be tValue here. This means then that we've got inference working properly for this set of numbers here which is being inferred from this.

00:52 If we add a boolean inside here, true, then that is going to be added into that little union there. Very, very nice. So that all looks good. But then it's this any that's getting me. Should it be tComputed? Let's give it a go. tComputed. Okay, well what's happening here then?

01:10 tComputed is still being inferred as unknown and reversed as string is now also unknown. So this is actually the wrong spot for tComputed. Now you can think of generics as being really bound to function calls or class instantiations.

01:30 This function call here, this first function call, the outer one, doesn't actually infer anything about tComputed. We can't know what tComputed is at the point this function is called. We could pass it in. We could say useCustomState. Let's say we pass in numberArray and stringArray here.

01:49 Now it all works and that's because we're sort of setting it from the outside. But what we want to do is at the moment that useComputed is called, we want to infer it there because we could potentially have multiple useComputed calls that all return different shapes of things.

02:05 So the important thing then is to remove it from here and actually put it on the useComputed function. But syntactically, how do we do that? We could kind of extract this out into a type and declare it all like that, but you can actually do it in line.

02:21 We can say tComputed just here. Isn't that pretty? So just like we've got our kind of thing on the arrow function there, we can do it here inside an object property. Now what we've got is useComputed actually becomes the source of where that gets inferred from.

02:41 And so we can basically take a look here and we can see that useComputed has got this little, I don't even know what to call this, little generic holder on it. And we can see that that type argument is being inferred in the right place. So now we can actually make another one of these if we want to.

02:56 So we can say reversedAsBoolean. And instead of string, we can just have Boolean here. And this will now be an array of Booleans and this one will stay as an array of strings. This is really, really nice.

03:09 And hopefully it's given you an idea of how functions that use generics really need to capture them at the point where they're used and where they're inferred from. This means you can come up with really amazing patterns with functions kind of like returning other generic functions, which infer the generics where they're kind of carried in.

03:28 And this is kind of called, or at least I call this pattern currying hooks, right? We're creating an outer hook and then returning a hook from inside it. It's a really beautiful way to compose behavior and I think it's underutilized.

# (d) Types Deep Dive



# 1. Exploring the React Namespace

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/07-types-deep-dive/53-understand-react-namespace-export.problem.ts

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/07-types-deep-dive/53-understand-react-namespace-export.problem.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=7ac11da4-b29d-442b-b7bb-7052c2e66e07&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0101-exploring-the-react-namespace-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=7ac11da4-b29d-442b-b7bb-7052c2e66e07&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0101-exploring-the-react-namespace-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
Let's take a deep dive into the React namespace.

The React namespace is imported from `react` like so:

```typescript
import React from "react";
```

Inside of the React namespace you will find types, functions, and values.

Depending on where you use the React namespace, you'll find it suggests different things.

In the runtime world, you'll get runtime-related things like `React.Children`, `React.Component`, `React.createElement`, and others:

```typescript
const element = React. // autocomplete for runtime-level stuff
```

In the type world, you'll get types and functions for things like `React.AbstractView`, `React.Context`, `React.createRef()`, and others:

```typescript
type Example = React. // autocomplete for type-level stuff
```

## Challenge
There are two questions to answer:
*   What is the React namespace?
*   Why can `React` be used as both a type and a value?

To answer these questions, you will need to explore React's type definitions.

In VS Code on your local machine, you can `cmd + click` on `React` to jump to the `index.d.ts` file. If you are using the web-based Stackblitz editor, check out [the DefinitelyTyped repo on GitHub](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/8169bc6f114ce1b7d3c00f2a3666c4e4921aa317/types/react/index.d.ts#L66).

Explore the React namespace, and see what you find out!

## Transcript
00:00 The first thing we're going to be exploring here as we dive deeper into the types is the React namespace itself. The React namespace, you can basically just import it from React here, and it contains two types of things.

00:14 The first thing it contains is it contains types, so we can actually grab stuff from React and just pull it in. The second thing is it actually contains functions as well and values here. So we have create element, we have clone element. And you can see that depending on where I use it, either in the runtime world here,

00:32 here I get access to a bunch of actual runtime stuff like lazy memo start transition, but up here I would only get access to type stuff like abstract view, all of these different types. And you can see that it behaves differently based on where you are.

00:47 So your job is to figure out how React, the namespace itself, behaves this way. What even a namespace is, and to just see if you can understand, really start to get to grips with the index.d.ts file. If you command click on React here, you'll actually see that there is like six or seven definitions here,

01:05 because we're actually appending to it in later exercises. So the one you should be paying attention to is index.d.ts, which is actually in node modules, whereas the other ones are actually right in our source directory here. So make sure you're actually going into the index.d.ts and none of these other ones. Good luck.

# Solution: Understanding the React Namespace

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/07-types-deep-dive/53-understand-react-namespace-export.solution.ts

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/07-types-deep-dive/53-understand-react-namespace-export.solution.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=5789f2f2-5563-49e4-9a42-f590c3ca4932&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0102-exploring-the-react-namespace-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=5789f2f2-5563-49e4-9a42-f590c3ca4932&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0102-exploring-the-react-namespace-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

Let's start answering the questions about the React namespace.

Inside of the `index.d.ts`, we can see various types and function definitions that make up the React namespace.

The React team uses the strongly typed language FlowType to produce the JavaScript that makes up the React namespace. In turn, a group of contributors has handcrafted the `index.d.ts` file to provide a clear description of all the JavaScript in order to bring the types to TypeScript.

Everything that is inside the React namespace is described inside this file. There are elements like `Children` and `Fragment`, along with many types.

Both type and runtime elements are included in the namespace, which is why it can be used in both the type and runtime worlds.

## How Importing React Works
The React namespace is imported directly:

```typescript
import React from "react";
```

It's also possible to provide just the items we want to import:

```typescript
import { Children, Fragment } from "react";
```

This works because of these lines in `index.d.ts`:

```typescript
export = React;
export as namespace React;

declare namespace React {
  ...
```

## Accessing React Types Globally
The `export as namespace React` line enables some additional functionality.

For example, if we create a new `hello.ts` file inside the source directory, we can access its types inside React globally:

```typescript
// inside of src/hello.ts

type Example = React.AnimationEventHandler;
```

Back inside of `index.d.ts`, if we comment out the `export as namespace React` line, React as a namespace is no longer available to be used as a type. The `hello.ts` example wouldn't work anymore.

It's interesting that the DefinitelyTyped contributors chose to structure the React types this way, but here we are!

## Transcript
00:00 Okay, let's go through each of these questions in turn. What is the React namespace? What is it made of? How does it work? Well, if we command click on it and we go into index.d.ts, we'll see that if we double-click here, we'll actually go into the file itself, which is where we want to be.

00:16 We'll see that this namespace React contains a bunch of different types and a bunch of different definitions for functions inside here too. All of the things that are actually inside React are described inside this namespace. This is a pretty cool way to do it because it means that

00:33 you can co-locate the stuff like children, fragments, strict mode, etc, with all of the actual types that describe it. So we have React child, React text, and you notice that this is a .d.ts file. This is a .d.ts file that has been handcrafted by a bunch of very, very cool people.

00:51 All these people, lovely people up here, who have actually gone through and actually tried to describe all of the JavaScript that the React team are producing using FlowType, which is their strongly typed language. Now, this setup is really interesting because what this lets us do is we've got our namespace here,

01:10 and we can have all of these type stuff and all of the runtime stuff on there, which is why we get this behavior where you can either use it as an actual type world or in the runtime world as well. It behaves like a class almost. So that's why it works this way.

01:26 Now, why is this now the shape of the module? Why don't we have to import React like this, for instance, import React from React? Why isn't it declared as a const like this? Well, if we go back into index.d.ts,

01:45 we could actually do this. We could say in export namespace React, and we could do it like this. Now, what we get is we'd actually get the React namespace imported or exported as a named entity, it's like a named const here. But you notice the line that I just deleted,

02:03 export equals React. What we're basically saying is this entire namespace, these represent all of the exports from React itself. So that means we can either grab the entire namespace like this, or we can just grab the individual elements like this, which is very cool, that's a nice bit of syntax.

02:22 This export as namespace React, this is pretty cool too. What this means is if I actually create a new file here, let's just create one inside the source directory. So like hello.ts, for instance. What we can actually do is we can actually access the type stuff inside React globally.

02:40 So we can say type example equals React.abstractView. Now, this is all available to us. If I delete this line, it means that actually React as a namespace is not available. If I remove this, it's no longer going to basically say you cannot use namespace React as a type. Whereas if I do export as namespace,

02:59 then you're allowed to. So this is really interesting. We've got this line, which basically says all of the stuff inside namespace React, this all gets put into the exports. And this, we're just saying make this available globally. So it means that we can actually grab all the types globally inside our project, which is useful.

03:18 It's interesting they chose that direction, but they did. So here we are. So there we go. This is why this is available as a type, because we're using all of this sort of clever namespace stuff. We're exporting as the namespace. So we can actually grab this even without this module import up here. And it means that we can use the namespace as a value

03:36 because it's going export equals React. So that means we don't need to grab it like by its name. We can just use that as a module definition. Very cool.

# 2. JSX.Element, React.ReactElement, and React.ReactNode

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/07-types-deep-dive/54-understanding-jsx-element.problem.tsx

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/07-types-deep-dive/54-understanding-jsx-element.problem.tsx)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=1e758fbb-02d6-4055-adbf-fac408d8c283&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0201-jsx-element-react-reactelement-and-react-reactnode-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=1e758fbb-02d6-4055-adbf-fac408d8c283&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0201-jsx-element-react-reactelement-and-react-reactnode-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
Here we have a few different types from React:

```typescript
type ClickMe = React.ReactElement;
type ClickMeToo = JSX.Element;
type ClickMeThree = React.ReactNode;
```

There are a few different things for you to figure out here:

## Challenge 1: Differences Between Types
First, determine the differences between `React.ReactElement`, `JSX.Element`, and `React.ReactNode`.

Consider the following questions as you explore the types:
*   Which type is wider than the others?
*   Which types are the same or narrower?
*   What is the type hierarchy of these types?
*   Which could be assignable to the others?

In VS Code on your local machine, you can `cmd + click` on one of these types to jump to the `index.d.ts` file.

If you are using the web-based Stackblitz editor, check out the DefinitelyTyped repo on GitHub for the specific types:

[

github.com

https://github.com/DefinitelyTyped/DefinitelyTyped/blob/8169bc6f114ce1b7d3c00f2a3666c4e4921aa317/types/react/index.d.ts#L163

](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/8169bc6f114ce1b7d3c00f2a3666c4e4921aa317/types/react/index.d.ts#L163)

[

github.com

https://github.com/DefinitelyTyped/DefinitelyTyped/blob/8169bc6f114ce1b7d3c00f2a3666c4e4921aa317/types/react/index.d.ts#L3244

](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/8169bc6f114ce1b7d3c00f2a3666c4e4921aa317/types/react/index.d.ts#L3244)

[

github.com

https://github.com/DefinitelyTyped/DefinitelyTyped/blob/8169bc6f114ce1b7d3c00f2a3666c4e4921aa317/types/react/index.d.ts#L263

](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/8169bc6f114ce1b7d3c00f2a3666c4e4921aa317/types/react/index.d.ts#L263)

## Challenge 2: Return Type of a Component
The next challenge is to determine the return types of the following component:

```typescript
const Component = () => {
  return <div>Hello world</div>;
};
```

Hint: You can hover over the component to get some information.

## Challenge 3: Error Analysis
For the component below, determine whether it will produce an error and why:

```typescript
const Component2 = (): React.ReactNode => {
  return <div></div>;
};

<>
  <Component2 />
</>;
```

There have been some recent changes to `React.ReactNode` that have changed it's behavior. You can read more about that here.

## Challenge 4: Comparing Two Components
Finally, explain why the following component does _not_ produce an error:

```typescript
const Component3 = (): React.ReactElement => {
  return <div></div>;
};

<>
  <Component3 />
</>;
```

While this one _does_ produce an error:

```typescript
const Component4 = (): React.ReactElement => {
  return "hello!";
};
```

## Transcript
00:00 Let's now take a look at some of React's built-in types and also some of the JSX built-in types too. We have three nodes here, or three different types. We have React.ReactElement, JSX.Element, and React.ReactNode.

00:14 And I'd like you to basically do three things here, or three or four things. So the first one I want you to do is just figure out the raw difference between all of these types here, between React.ReactElement, JSX.Element, and React.ReactNode.

00:31 See if you can work out which one is wider than the other, which ones are maybe exactly the same, or which ones are narrower than the other. See if you can figure out kind of like a type hierarchy. Figure out what could be assignable to each one. And next, I want you to tell me what the return type of this component is. Simple. If you hover over it, it might give you some information there.

00:53 And this one too, I would like you to tell me whether this will error and why it would error, and also some kind of interesting fun facts here too. There's some cool stuff that's come out recently,

01:08 and there have been some differences about how React.ReactNode works or how it used to as well. And in fact, I will link something below which will give you a bit more information on that. And I'd also like you to tell me why this component does not error, but why this one does. So a few different questions there.

01:26 Take a little explore, and I'll give you my answers in a minute. Good luck!

# Solution: Understanding React's JSX Types

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/07-types-deep-dive/54-understanding-jsx-element.solution.tsx

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/07-types-deep-dive/54-understanding-jsx-element.solution.tsx)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=6cf6cb8d-3c43-4728-a5d0-4f054744e860&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0202-jsx-element-react-reactelement-and-react-reactnode-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=6cf6cb8d-3c43-4728-a5d0-4f054744e860&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0202-jsx-element-react-reactelement-and-react-reactnode-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution 1: Differences Between Types
Let's start by looking at the type definition for `React.ReactElement`.

### `React.ReactElement`
Inside of `index.d.ts` we see [the definition for](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/bdcb5e847e5c517d9f1c8f833bd933efc3988c7c/types/react/index.d.ts#L164C26-L164C26) [`ReactElement`](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/bdcb5e847e5c517d9f1c8f833bd933efc3988c7c/types/react/index.d.ts#L164C26-L164C26):

```typescript
// inside of index.d.ts
interface ReactElement<
  P = any,
  T extends string | JSXElementConstructor<any> =
    | string
    | JSXElementConstructor<any>,
> {
  type: T;
  props: P;
  key: Key | null;
}
```

The above represents the output of the `React.createElement` function.

`React.createElement` spits out an object with a `type`, `props`, and a `key`. The `type` is usually something like `div` or `span`.

You don't need to worry too much about how `ReactElement` is defined because we will see it show up elsewhere in Reacts types.

### `JSX.Element`
Let's move on to `JSX.Element`.

In [the type definitions](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/bdcb5e847e5c517d9f1c8f833bd933efc3988c7c/types/react/index.d.ts#L3245), we can see that `JSX.Element` extends `React.ReactElement`.

```typescript
// inside index.d.ts
namespace JSX {
  ...
  interface Element extends React.ReactElement<any, any> { }
}
...
```

Notice that it's not actually `JSX.Element`, but just `Element`. This is because this type is declared within a global namespace called `JSX`.

Since `JSX.Element` extends `React.ReactElement`, they are assignable to each other.

For example, if we have a variable that expects a `JSX.Element`, we can pass it something that is a `React.ReactElement` and visa versa.

```typescript
const sameThing: JSX.Element = {} as React.ReactElement;
const sameThing2: React.ReactElement = {} as JSX.Element;
```

### `React.ReactNode`
Let's take a look at [the final type,](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/bdcb5e847e5c517d9f1c8f833bd933efc3988c7c/types/react/index.d.ts#L263) [`React.ReactNode`](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/bdcb5e847e5c517d9f1c8f833bd933efc3988c7c/types/react/index.d.ts#L263).

`React.ReactNode` is a union type that contains `React.ReactElement` as well as many other types as seen below:

```typescript
// inside index.d.ts
interface DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_REACT_NODES {}
type ReactNode =
  | ReactElement
  | string
  | number
  | Iterable<ReactNode>
  | ReactPortal
  | boolean
  | null
  | undefined
  | DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_REACT_NODES[keyof DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_REACT_NODES];
```

You'll notice it also has `DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_REACT_NODES`, so make sure not to use this type.

You can see that `React.ReactNode` is the widest of the types while `React.ReactElement` and `JSX.Element` are essentially equal and narrow.

## Solution 2: Return Type of a Component
When hovering over `Component` and you'll see that `JSX.Element` is the default return type that is inferred. Depending on when you're viewing this, it might say `React.JSX.Element`.

```typescript
const Component = () => {
  return <div>Hello world</div>;
};

// hovering shows
const Component: () => JSX.Element
```

Back inside `index.d.ts` within the `React` namespace, we can see that there is [a nested](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/bdcb5e847e5c517d9f1c8f833bd933efc3988c7c/types/react/index.d.ts#L3169) [`JSX`](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/bdcb5e847e5c517d9f1c8f833bd933efc3988c7c/types/react/index.d.ts#L3169) [namespace](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/bdcb5e847e5c517d9f1c8f833bd933efc3988c7c/types/react/index.d.ts#L3169).

Then `React.JSX` [extends the](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/bdcb5e847e5c517d9f1c8f833bd933efc3988c7c/types/react/index.d.ts#L3453) [`GlobalJSXElement`](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/bdcb5e847e5c517d9f1c8f833bd933efc3988c7c/types/react/index.d.ts#L3453) so it means the same thing as `JSX.Element`.

The React team recommends using `React.JSX` to prevent pollution in the global namespace, but just know that `JSX.Element` and `React.JSX.Element` are the same.

## Solution 3: Error Analysis
`Component2` has a return type of `React.ReactNode`:

This means that it can return anything that is possible to render in React as well as `null` and `undefined`.

For example, `React.ReactNode` has no problem returning numbers:

```typescript
const Component2 = (): React.ReactNode => {
  return 1234;
};
```

But if we were to manually annotate the return type to be `JSX.Element`, we can see that we can't return numbers or the other types that would be allowed with `React.ReactNode`:

```typescript
const Component = (): JSX.Element => {
  return 1234;
  //     ^^^^^ Type 'number' is not assignable to type 'Element'.ts(2322)
};
```

## Solution 4: Comparing Two Components
With `Component3` and `Component4`, we can see that both have `React.ReactElement` as their return type:

```typescript
const Component3 = (): React.ReactElement => {
  return <div></div>;
};

const Component4 = (): React.ReactElement => {
  return "hello!";
  //     ^^^^^^^^ Type 'string' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'.
};
```

Both `React.ReactElement` and `JSX.Element` can return any type of JSX but once you give it `string`, `null` or `undefined`, it will throw an error.

A big takeaway from all of these challenges is that you don't need to worry about typing components with `JSX.Element` or `React.ReactElement` in your code.

Both `JSX.Element` and `React.ReactElement` will appear in errors occasionally so it's useful to know what they are.

For manually annotating components, you don't want to use these types because they're too narrow and don't represent all the things that you can actually render in React. They also don't provide very much information when trying to infer from them.

Remember, `React.ReactElement` is the same as `JSX.Element`, which fits inside the wider and more useful type of `React.ReactNode`.

## Transcript
00:00 Okay, let's figure this out. So React.ReactElement, let's command click on ReactElement here. This looks like a very, very scary type, but what this represents is really just the thing that's underlying kind of like the, this is kind of what React.CreateElement spits out, basically is an object with a type.

00:18 It's going to be like div or span or something like that. It's going to be the props as well that it takes and the key here. So this kind of scary object here is a little bit interesting and it's also kind of a generic as well. You don't need to worry about this too much because of how it's defined in a couple of other spots. JSX.Elements here, let's take a look here.

00:37 JSX.Element extends React.ReactElement, okay. And you can see that it's actually not JSX.Element, it's just element. So where are we here? We seem to be inside index.d.js, inside the React types again, but where on earth are we?

00:54 Oh, we're in a global namespace called JSX. And in fact, you can see that there's a React.JSX here too. That's interesting, but we'll get to that in a minute. So we're inside JSX.Element. So JSX is a namespace, a global namespace, and we've got extends React.ReactElement.

01:14 This means actually that React.ReactElement and JSX.Element are assignable to each other. If we go like const, yeah, is a, let's say it's a slot that expects a JSX.Element, then we can actually pass it something which is a React.ReactElement. So let's say here, this is kind of like,

01:33 we're creating a React.ReactElement out of nothing. These two are assignable to each other and are virtually, I'm pretty sure, are completely the same. So React.ReactElement and JSX.Element, you can think of them as the same thing. So what is a React.ReactNode? Well, this is actually,

01:51 this contains React.Element in it. That's the first part of this massive union. And we've got string, number, ReactFragment, ReactPortal, Boolean, null, or undefined. In other words, these are all of the things that you can possibly render in a React component. And you've also got this do not use

02:09 or you'll be fired experimental React nodes. Lovely, perfect. Okay, well, we won't use those. So we can see then that React.ReactNode is the widest of the three here. These two are basically equal and this one is the widest of them. Now, what we can see here though,

02:27 is if we have some code and if we have some JSX here, and if we hover over this component, we can see that JSX.Element is the thing that's inferred from here. Depending on when you're viewing this, it might say React.JSX.Element. And let me just describe that too. What we'll see here is in this namespace React,

02:46 if we go all the way down here, we can see that there is JSX, React.JSX. Let's see where this is being grabbed here. What we'll see, yeah, you can see there that inside the React kind of namespace, there's another namespace here too, which is namespace JSX.

03:07 And JSX here basically has elements which extends the global JSX element. You can see there's a little bit of tricksy stuff going on, but currently React.JSX, what it does is it just mimics the stuff that's in JSX that it cares about. If you see React.JSX,

03:24 it basically means exactly the same thing as JSX. And in fact, they encourage people now to use a React.JSX to prevent kind of like pollution into the global namespace, which is good. So JSX.Element, React.JSX.Element, same thing. Now, we've got this return type of the components here. And you notice that whatever we put in here,

03:42 it's always going to be JSX.Element. So we can say, hello, maps or anything like that. We're not getting any special information back from this component. So it's always going to return JSX.Element. Now here, component two, React.ReactNode, what's going on here is that like, we can now return anything from this. If we were to actually manually annotate this

04:02 with JSX.Element, you can see that JSX.Element, that we actually can't return stuff like numbers here. We can't return null. We can't return undefined. So JSX.Element only represents that stuff in here,

04:18 only represents really JSX stuff components. So get rid of that. And this one then, this final question. So we know React.ReactNode can actually like, manage everything here. So everything that's possible to render, you can return from a React.ReactNode.

04:38 So null, undefined, all that stuff, all assignable to it. And why does this component not error, but this one does? Well, React.ReactElement is the same as JSX.Element. And so we can't like, let's look at the error here. Type string is not assignable to React.Element

04:55 because React.Element is that specific sort of object type. And also, you can return JSX inside or a JSX.Element in place of React.ReactElement. So all of that to say, is you probably don't need to worry about JSX.Element in your code.

05:14 You won't need to be actually manually writing this at all. It will pop up in errors though, time and time again, as will React.ReactElement. So if you're manually annotating stuff, you probably don't wanna use these at all because they're just too narrow. They don't represent all of the things that you can actually render in React.

05:32 And also, if you're actually trying to infer from them, they don't give you any useful information as we'll see in a bit. JSX.Element is the only thing that you can possibly get out of a construct like this. So you can't be any more narrow. You can't say, I want a specific type of JSX where it only has hello in there instead of hello, Matt.

05:52 And this becomes an issue later as we'll see. So there we go. Those are these three elements. React.ReactElement is the same as JSX.Element which fits inside the wider type and more useful type of React.ReactNode.

# 3. Strongly Typing Children in React

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/07-types-deep-dive/55-strongly-typing-children.problem.tsx

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/07-types-deep-dive/55-strongly-typing-children.problem.tsx)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=03279bc8-c5aa-4357-a92a-4582b0eaf491&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0301-strongly-typing-children-in-react-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=03279bc8-c5aa-4357-a92a-4582b0eaf491&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0301-strongly-typing-children-in-react-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

The ability to strongly type children in React is a highly requested feature.

Sometimes you only want certain types of children to be passed to your components.

For instance, consider a `Select` component. Ideally, the only children we want to pass to it are `Option` components.

```typescript
const Select = (props: { children: OptionType }) => {
  return <select>{props.children}</select>;
};
```

This feature is partially implemented using an `Option` component which returns an `OptionType`.

```typescript
type OptionType = {
  __brand: "OPTION_TYPE";
} & ReactNode;

const Option = () => {
  return (<option></option>) as OptionType;
};
```

`OptionType` is a special type that extends a `ReactNode` but is also a [branded type](https://www.totaltypescript.com/workshops/advanced-typescript-patterns/branded-types/what-is-a-branded-type).

This branded type is technically not possible and we need to use the `as` keyword to force the component to be an `OptionType`, even though it will behave the same as a `JSX.Element` at runtime.

Inside the `Select` component, we have an error when trying to use the `<Option/>` component:

```typescript
// inside of the Select component
Property '__brand' is missing in type 'ReactElement<any, any>' but required in type '{ __brand: "OPTION_TYPE"; }'.
```

## Challenge
Your job is to figure out what's going on with the `OptionType`.

```typescript
type OptionType = {
  __brand: "OPTION_TYPE";
} & ReactNode;
```

Why does `<Option />` error out but when you change they syntax to `{Option()}` it appears to work?

Is strongly typing children like this even possible?

For more on Branded Types, read [this article on totaltypescript.com](https://www.totaltypescript.com/four-essential-typescript-patterns) and revisit [the Advanced TypeScript Patterns workshop](https://www.totaltypescript.com/workshops/advanced-typescript-patterns/branded-types/what-is-a-branded-type).

## Transcript
00:00 In this exercise, we're going to look at something that's a really strongly requested feature of React and TypeScript, which is strongly typing children. Sometimes you only want certain types of children to be passed to your components. Here we have a select component, and ideally the only children we want to admit to it are option components.

00:19 Here I've sort of got it working, but I really haven't. I've got an option component, and this option component, instead of returning JSX.element, it returns an option type. And here, if I kind of like remove this, it would just return JSX.element instead, but instead it returns option type. Very cool.

00:38 Option type is like a special type where it's a Reactor node, but it's also a special branded type. And this branded type is kind of like an impossible type. We're not supposed to be able to actually put it out in the real world, right, or in the runtime.

00:54 This brand here kind of doesn't exist here, and we're having to use as in order to actually make it work. So you should think of this as kind of like we're forcing this to be a option type, when in fact at runtime, it's just going to behave the same as a JSX.element.

01:11 And then inside the select, we actually basically say, okay, here we've got some option types. Those are the only thing you can pass into the children. But we've got an error here, which is that brand is missing in type React element, but required in type brand option type. So that's your job.

01:29 Try to figure out really what option type is all about. See if what we're doing is even possible. And also try changing option to this syntax. And this seems to work. Why would this work? And why would the other thing not work? Good luck.

# Solution: Strongly Typing Children in React Doesn't Work

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/07-types-deep-dive/55-strongly-typing-children.solution.tsx

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/07-types-deep-dive/55-strongly-typing-children.solution.tsx)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=f70a20d7-4eb2-4050-8743-8561a856580e&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0302-strongly-typing-children-in-react-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=f70a20d7-4eb2-4050-8743-8561a856580e&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0302-strongly-typing-children-in-react-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
To recap the problem, we are using this branded type to make sure that only `Option` elements can be passed as children to the `Select` component:

```typescript
type OptionType = {
  __brand: "OPTION_TYPE";
} & ReactNode;

const Option = () => {
  return (<option></option>) as OptionType;
};

const Select = (props: { children: OptionType }) => {
  return <select>{props.children}</select>;
};
```

However, the value assigned to `option` is not inferred as `OptionType`. Instead, it's inferred as `JSX.Element`:

```typescript
<Select>
  <Option />
//^^^^^^^ Property '__brand' is missing in type 'ReactElement<any, any>' but required in type '{ __brand: "OPTION_TYPE"; }'.
</Select>;
```

This is why we are getting an error. `Select` is expecting an `OptionType`, but it is receiving a `JSX.Element`.

## A Closer Look at `Option`
If we pull out `Option` out and call it as a function, the value is inferred as `OptionType`.

```typescript
const option = Option();

// hovering shows:
const option: () => OptionType;
```

This is why calling the `Option` JSX manually by using `{Option()}` inside of the `Select` component works:

```typescript
// example inside of Select that works
<Select>{Option()}</Select>
```

However, calling JSX elements manually is a bad idea because it takes them out of React's reconciliation algorithm.

So what can we do?

## Strongly Typing Children Isn't Possible
Unfortunately, strongly typing children in React is not possible right now, as they are inferred as `JSX.Element`.

This means we can't get any more information about the thing that we're rendering on the type level without a change inside of React or TypeScript themselves.

While it isn't possible, it's not really that big of an issue. In a way, strongly typing children in React ruins the compositional model. You should be able to pass anything to anything and have React figure it out.

Unless React and TypeScript make changes to make this possible, we'll have to live with this limitation.

## Transcript
00:00 Okay, so why is this not working? Let's walk through each step piece by piece. Try to understand the type of option type, what's the brand property for? Well, as I discussed in the problem setup, this is really to make this unique here. It means that if we have something that is an option type or something that expects an option type,

00:19 this is the only thing that we can pass here. Branded types are a super, super useful part of TypeScript that we won't be covering too deeply here, but you can check out a resource that I'll link below on branded types that really gives you a good insight as to what they're for. But we're trying to use it here, but it's not working. Why isn't it working?

00:39 Well, let's check out number two. There's an error happening option below. Why is that? Well, it seems that the thing that's here, if we actually just grab that out and put it in a const, const option equals this, this, if we just put that there, is actually not inferred as option type. It's inferred as JSX.element.

00:59 And so select is expecting an option type, but in fact, what it's getting is JSX.element. If we pull this out and if we actually do option here, if we actually call the function, right, because it's just this, this is actually inferred as option type. Isn't that strange? What's the difference here? Well, this, we're declaring this as a JSX.element,

01:19 whereas this actually infers from the return type of the function. So what we're getting here is like this now will work. If we just manually call this option, call it like that, and we get our select here. Isn't that crazy? So this is kind of annoying

01:38 because what we really want is we want this sort of inference, but actually calling these JSX.elements manually is a really bad idea because it takes them out of React's reconciliation algorithm. It means that you're calling them eagerly instead of scheduling them for React to call. So this is a bad, bad, bad idea.

01:56 So what can we do? We can't do anything, basically. Strongly typing children in React is not possible right now. And the reason is, is because it's inferred as JSX.element. This means we can't get any more information about the thing that we're rendering when we render it out on the type level.

02:15 So it means we're sort of stuck, really. We just can't do strongly typing children unless they make some sort of change inside of React or inside of TypeScript to make this possible. I don't mind this. I think this is fine. I think really you can do a lot of this with composition and throwing runtime errors anyway.

02:34 And honestly, if your components really expect a certain type of children, it sort of ruins React's compositional model anyway. You should be able to pass anything to anything and have it all reconcile and work out. But it does make things a little bit annoying and the dream of strongly typed context all the way through the tree,

02:54 I think is just some way off and ends up not being terribly useful anyway. So this was an unfortunate look into an impossible part of React and TypeScript that maybe they might make possible one day. We'll see.

# 4. Exploring JSX.IntrinsicElements

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/07-types-deep-dive/56-understanding-jsx-intrinsic-elements.problem.tsx

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/07-types-deep-dive/56-understanding-jsx-intrinsic-elements.problem.tsx)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=85e3d753-f49c-4467-92e9-2321f0c67352&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0401-exploring-jsx-intrinsicelements-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=85e3d753-f49c-4467-92e9-2321f0c67352&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0401-exploring-jsx-intrinsicelements-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
Let's move on to exploring `JSX.IntrinsicElements`, which is another global interface that you'll see in TypeScript and React.

```typescript
export type Example = JSX.IntrinsicElements;
```

In VS Code on your local machine, you can `cmd + click` on `IntrinsicElements` to jump to the `index.d.ts` file. If you are using the web-based Stackblitz editor, check out [the DefinitelyTyped repo on GitHub](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/8169bc6f114ce1b7d3c00f2a3666c4e4921aa317/types/react/index.d.ts#L3263).

To better understand this interface, you'll need to answer the following questions:

## Question 1: What is `JSX.IntrinsicElements`?
Explore the `IntrinsicElements` interface definition in `index.d.ts` to get an idea of what it is and what it does.

## Question 2: What is the structure of `JSX.IntrinsicElements`?
`JSX.IntrinsicElements` appears to have HTML attributes as properties. What are all of the keys and values telling us?

## Question 3: What happens when adding a new element to `JSX.IntrinsicElements`?
If you are running VS Code locally, try editing the object itself by adding a new element:

```typescript
// in `index.d.ts`
interface IntrinsicElements {
  // ...
  myNewElement: {
    foo: string;
  };
}
```

After this change, the `myNewElement` below fixes its error:

```typescript
<myNewElement foo="123" />
//^^^^^^^^^^^ Property 'myNewElement' does not exist on type 'JSX.IntrinsicElements'.
```

Why does this happen?

## Transcript
00:00 In this exercise, we're going to look at JSX.IntrinsicElements, which is a really, really interesting interface which sits globally. And I would like you to basically just walk through each of these questions. So let me set them up. What is JSX.IntrinsicElements? Make sure you command click on IntrinsicElements below to go to its definition

00:18 and make sure you're going to the original definition in index.d.ts. What is the structure of IntrinsicElements when you're in there? What actually is going on there? What are the keys? What are the values in this object that you're seeing? And try editing the object itself

00:36 and you'll notice that the element below this error actually kind of like fixes its error there. You'll see an error is happening. It doesn't exist on type JSX.IntrinsicElements. And, you know, you definitely want to go and change that back because we don't want to actually be editing the index.d.ts file itself.

00:55 So go through that. See if you can figure out what is actually happening here and why this error is even occurring in the first place. Good luck.

# Solution: Understand the Structure of React's JSX.IntrinsicElements

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/07-types-deep-dive/56-understanding-jsx-intrinsic-elements.solution.tsx

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/07-types-deep-dive/56-understanding-jsx-intrinsic-elements.solution.tsx)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=363e5352-ba14-4995-be09-1e91674cc72e&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0402-exploring-jsx-intrinsicelements-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=363e5352-ba14-4995-be09-1e91674cc72e&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0402-exploring-jsx-intrinsicelements-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
To start, let's take a look at the type definition for JSX.IntrinsicElements:

```typescript
// in `index.d.ts`interface IntrinsicElements {    // HTML    a: React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>;    abbr: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;    address: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;  ...}
```

This shows us all the things that are globally available to use as elements in React. Each element is a key in the IntrinsicElements interface.

This lists includes virtually all valid HTML5 elements and their attributes. Things like source, span, strong, and svg are all available to use as elements here.

Each value associated with a key is related to detailed HTML props, attributes, and elements.

For example, the a element is structured like this:

```typescript
// inside of index.d.ts
a: React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>;
```

Where `DetailedHTMLProps` is essentially a type helper that extends `HTMLAttributes` for the elements that we pass in, which [in this case is](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/8169bc6f114ce1b7d3c00f2a3666c4e4921aa317/types/react/index.d.ts#L2129) [`AnchorHTMLAttributes`](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/8169bc6f114ce1b7d3c00f2a3666c4e4921aa317/types/react/index.d.ts#L2129). This is what allows for the attributes like `href` and `target` to be available on the anchor tag.

```typescript
interface AnchorHTMLAttributes<T> extends HTMLAttributes<T> {
  download?: any;
  href?: string | undefined;
  hrefLang?: string | undefined;
  media?: string | undefined;
  ping?: string | undefined;
  target?: HTMLAttributeAnchorTarget | undefined;
  type?: string | undefined;
  referrerPolicy?: HTMLAttributeReferrerPolicy | undefined;
}
```

## Adding a New Element
At the top of `IntrinsicElements`, add `myNewElement` with a `foo` attribute of type `string`:

```typescript
interface IntrinsicElements {
  myNewElement: {
    foo: string;
  };
  // HTML
  ...
```

Now as far as TypeScript is concerned, `myNewElement` with an attribute of `foo` is a valid element that we can use in our application:

```typescript
<myNewElement foo="123" />
```

However, if we try to pass in a boolean instead of a string, we get an error: "Boolean is not assignable to type string."

```typescript
<myNewElement foo={true} />
//            ^^^ Type 'boolean' is not assignable to type 'string'.
```

The `IntrinsicElements` are core to how React types work.

You might see `IntrinsicElements` tends to pop up when you're trying to use an element that's not supposed to be there or encounter random errors throughout your application.

Don't forget to revert your changes in `index.d.ts`, as we don't want to actually edit the file itself!

## Transcript
00:00 Okay, let's check out GSX.IntrinsicElements, see what we're dealing with. Come on, click on this, and you'll see that we've got something here, which we'll have a look at later. But you can see that IntrinsicElements looks like this. This is a massive interface, and this massive interface basically describes all of

00:18 the things that are globally available to use as elements in React. All of this stuff, all of the SVG stuff down here, and all of the DOM stuff, these are things that are globally available for you to use. This means that we can use select, small, or source, span, strong, style, sub,

00:37 summary, sub, as elements here. And we can actually append to this if we want to. So if we go back here, go to IntrinsicElements and add a new one up here, let's say my new elements, and let's just leave it, I don't know, what should we make this type here? What should the type actually be?

00:55 Let's just leave it like this for now. The second question, or the third question, I can't remember, was what is the structure of this? Well, it's very obvious from the keys what's happening here. But what are the values of those keys? Well, each of these are detailed HTML props, HTML attributes, HTML elements, HTML elements. So that's an abbreviation.

01:14 You can see the anchor element has slightly different ones. Anchor HTML attributes, anchor HTML element, anchor HTML element. We can derive from this that if we take a look at HTML props, it's just literally a kind of like type helper here where we pass in the attributes and then we have class attributes and the E.

01:33 Let's go back there. And this HTML props, we're actually passing in some anchor HTML attributes. And these ones like download, href, sorry, href, I always say href for some reason, media, ping, target, type. These are things that are available on that element here.

01:53 So we can see that the keys are the elements that are available and here are the props that are available on those elements. So let's say that my new element takes in an ID, which is a string, and we'll go back here and we can see then that my new element, it's currently got foo on here,

02:10 but foo string is not assignable to type ID string. Let's actually copy the thing that I meant to copy before, whoopsie daisy. Yeah, there we go. So foo string, now it's going to work. And if I pass in a Boolean here, for instance, so just foo, Boolean is not assignable to type string. So this is really cool.

02:30 This gives us a sense for what Intrinsic Elements is doing because Intrinsic Elements tends to pop up in various guises when you're kind of like trying to maybe use an element that's not supposed to be there or it kind of, it comes up in all sorts of random errors throughout your application. I'm going to delete this before I forget because I will inevitably forget.

02:48 But jsx.intrinsic-elements, really, really key type that sits at the center of how you should think about React types.

# 5. Understanding React's ElementType and ComponentType

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=f7847668-9fc5-4e63-bb55-693a6960be7e&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0501-understanding-reacts-elementtype-and-componenttype.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=f7847668-9fc5-4e63-bb55-693a6960be7e&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0501-understanding-reacts-elementtype-and-componenttype.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Explainer
The `ElementType` and `ComponentType` type helpers show up often when working with React.

```typescript
type types = [React.ElementType, React.ComponentType];
```

## `React.ElementType`
The `ElementType` type helper is a bit unusual because it accepts some props and derives what types of components would be able to receive those props.

Here we have an `Example` component that accepts `audio` and `video` as well as `ComponentType<P>`.

When we pass it an `autoPlay` prop:

```typescript
export type Example = React.ElementType<{
  autoPlay?: boolean;
}>;

// hovering over Example shows:
type Example =
  | "audio"
  | "video"
  | React.ComponentType<{
      autoPlay?: boolean | undefined;
    }>;
```

`ElementType` can tell that this prop can be used with an `audio` or `video` element, or a React Component Type that accepts `autoPlay` as a prop.

Any custom component that you think of will correspond to `ElementType`, as well as any other element defined in `JSX.IntrinsicElements` that can receive props.

For example, many elements can accept an `href` prop. If you defined an `ElementType` to accept an optional `href`, all of a sudden there are several possible elements that can be used:

```typescript
type Example = React.ElementType<{
  href?: string;
}>;

// hovering over Example shows:

type Example = "symbol" | "a" | "area" | "base" | "link" |
"svg" | "animate" | "animateMotion" | "animateTransform" |
"circle" | "clipPath" | "defs" | "desc" | "ellipse" |
"feBlend" | "feColorMatrix" | ... 46 more ...
| React.ComponentType<...>
```

## `React.ComponentType`
Let's take a look at an example of how `ComponentType` can be used.

Here we have a `FuncComponent` and a `ClassComponent` that take a `prop1` that is a string:

```typescript
const FuncComponent = (props: { prop1: string }) => {
  return null;
};

class ClassComponent extends React.Component<{
  prop1: string;
}> {
  render(): React.ReactNode {
    this.props.prop1;
    return null;
  }
}
```

By using the `ComponentType` type helper, you can ensure that only components that accept `prop1` are passed to this array as seen in `tests2`:

```typescript
const tests2: Array<React.ComponentType<{ prop1: string }>> = [
  FuncComponent,
  ClassComponent,
];
```

If we change the prop name in `ClassComponent` to `propTwo`, we will see an error because `propOne` is not assignable to `propTwo`:

```typescript
class ClassComponent extends React.Component<{
  prop2: string;
}> {
  render(): React.ReactNode {
    this.props.prop2;
    return null;
  }
}

const tests2: Array<React.ComponentType<{ prop1: string }>> = [
  FuncComponent,
  ClassComponent, // Error!
];

// Error message on ClassComponent:
// Type 'ComponentType<{ prop2: string; }>' is not assignable to type 'ComponentType<{ prop1: string; }>'.
```

This demonstrates that `ComponentType` works can represent either functional or class components.

`ComponentType` is useful when working with higher-order components when you want to ensure that a specific prop type is being passed to a component.

## Wrapping Up
React's, `ElementType` and `ComponentType` are both useful type helpers that can be used to ensure that the correct props are being passed to a component.

The `ElementType` helper lets you specify certain types of elements that can receive props, while the `ComponentType` helper lets you specify a component that can receive props.

These concepts will be useful moving forward.

## Transcript
00:00 Let's take a look at two more type helpers that crop up again and again and again when you're using React. We have element type and component type here. Now element type is really weird because what it does is it basically accepts kind of some props here. And it kind of derives what types of components

00:18 would be able to be like, receive those props. So here we have example, we can see that it takes in an audio or video or a React.component type of autoplay. And that's because we've got autoplay inside here. If we, for instance, just did like a blah, blah, blah, blah,

00:39 like this, and we made it required, then we'd see that the only thing that could possibly fulfill this, we can't actually use like audio or video here. We can only have a custom component that's passed to this slot. So element type basically corresponds to any custom component that you can think of,

00:56 but also anything like div, span, or things like that that can receive these props. So for instance, if we have a href and we make it like this and a string, so optional string, then this loads of stuff can accept a href, right? So symbol, a, area, base, link, SVG, animate,

01:14 all this stuff can accept a href. So React element type, basically it's kind of like React component type, which we'll see in a second, but it can also kind of like be relied on to fetch all of these different stuff from JSX.IntrinsicElements itself. So now let's take a look at component type itself.

01:34 Component type, down here, we've basically got an array of React.ComponentTypes, and if I just indent this, you'll be able to see this a little bit clearer. Here we've got React.ComponentType, which takes in a certain prop, and that prop is prop one, it's required, and it's a string. We've got a functional component that takes in that

01:52 and a class component that takes in that too. And we're kind of just putting them down here inside this array so we can see it all working. If we change this one to prop two here, you'll see the class component actually starts erroring because prop one is not assignable to prop two string. And that's kind of interesting. So this means then that we can use component type

02:11 to basically represent either functional components or class components. And they're useful because if we pass them into like higher order components or things like this, we probably want to be using component type here. But element type does have its uses too because it means that you can actually pass in kind of any element whatsoever along with class components. And that's going to be really cool

02:31 when we approach the as prop, for instance, too.

# 6. Appending to React's Global Namespace

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/07-types-deep-dive/58-appending-to-global-namespace.problem.ts

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/07-types-deep-dive/58-appending-to-global-namespace.problem.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=5d77a71a-ce75-4880-9f4e-3d646f3c09a0&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0601-appending-to-reacts-global-namespace-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=5d77a71a-ce75-4880-9f4e-3d646f3c09a0&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0601-appending-to-reacts-global-namespace-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
It's possible to change a global namespace in TypeScript by using `declare global`.

Here were are set up to modify the `React` namespace:

```typescript
declare global {
  namespace React {}
}
```

## Challenge
We currently have a failing test:

```typescript
type test = Expect<Equal<React.MyInterface, {foo: string}>>;
```

Your job is to add the `MyInterface` interface to the newly declared `React` namespace so that the test passes.

## Transcript
00:00 It's actually possible to change things in the global namespace in TypeScript. Here we have a declare global, which is where some namespace react lives. And what we want to do here is we just want to add in a my interface interface. And that's just going to sit there and it's going to have foo string on it.

00:17 And that's all I want you to do is just want you to try and figure this out really. And we'll see later how this is so powerful and why you can do interesting things with it. But for now, that's all I want you to do. Good luck.

# Solution: Merge Namespaces in TypeScript

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/07-types-deep-dive/58-appending-to-global-namespace.solution.ts

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/07-types-deep-dive/58-appending-to-global-namespace.solution.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=3d58c8f2-aca6-40d9-84cc-e7c7215681a1&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0602-appending-to-reacts-global-namespace-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=3d58c8f2-aca6-40d9-84cc-e7c7215681a1&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0602-appending-to-reacts-global-namespace-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
We started with a `declare global` block that initiates a namespace `React`:

```typescript
declare global {
    namespace React {}
}
```

Anything declared in the `React` namespace here will be merged with the existing namespace.

In this case, since the test is expecting a `MySolutionInterface`, we can add it like this:

```typescript
declare global {
    namespace React {
        interface MySolutionInterface {
            // ...
        }
    }
}
```

Now that `MySolutionInterface` exists, we are able to access it as part of React like so:

```typescript
type Example = React.MySolutionInterface;
```

You also might notice that the error message for the test has changed. It now tells us that `MySolutionInterface` is missing a `foo` property.

We can fix this by adding the `foo` string property inside the interface:

```typescript
declare global {
  namespace React {
    interface MySolutionInterface {
      foo: string;
    }
  }
}
```

The error goes away, and we've successfully merged our custom interface into the existing `React` namespace!

Understanding how to work with the global namespace and how to append to existing namespaces is crucial. You can add new interfaces into the existing namespaces, which can be helpful in various scenarios, as we'll see in the next exercises.

## Transcript
00:00 As you might have figured out, the solution is very, very simple. Inside this declare global, we're initiating a namespace React. This isn't conflicting with the existing namespace. Actually, anything you declare in here will be merged with the existing namespace. And so, I've got, I'm expecting a MySolutionInterface here.

00:18 If I say interface MySolutionInterface, I can now, you'll now start to see this error actually changes, and MySolutionInterface now exists. I can actually use this. I can say type example equals React.MySolutionInterface. There it is. So weird.

00:35 And now, what we can do is we can say foo string inside here. And now the error goes away. Now, this is going to come up later, but this is a really, like, important thing to understand about how you can actually work with the global namespace. You can append to existing namespaces,

00:54 and inside them, you can actually add new interfaces into there, which is really interesting. And we're going to see how that comes up in the next exercises.

# 7. Modify Existing Interfaces in the Global React Namespace

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/07-types-deep-dive/59-declaration-merging-in-global-namespace.problem.ts

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/07-types-deep-dive/59-declaration-merging-in-global-namespace.problem.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=cfd37c92-acc6-4762-aae6-75c3f3239e31&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0701-modify-existing-interfaces-in-the-global-react-namespace-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=cfd37c92-acc6-4762-aae6-75c3f3239e31&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0701-modify-existing-interfaces-in-the-global-react-namespace-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
Declaration merging can be used to modify existing interfaces in the global namespace.

Consider the following interface:

```typescript
declare global {
  namespace React {
    interface MyAwesomeInterface {
      foo: string;
    }
  }
}
```

If we wanted to add a property to the interface, the easiest way would be to add a `bar: string;` like this:

```typescript
declare global {
  namespace React {
    interface MyAwesomeInterface {
      foo: string;
      bar: string;
    }
  }
}
```

But how can we do this without directly changing the existing code?

## Challenge
Your task is to use declaration merging to add `bar: string;` to the `MyAwesomeInterface` without modifying the existing code.

Hint: To do this, you will need to use `declare global`, `namespace`, and `interface` again.

## Transcript
00:00 we can use something called declaration merging in TypeScript to actually change stuff in the global namespace that's already there. So I don't want you to change this code whatsoever, right? The really easy way to solve this exercise is just to add bar string up onto this interface, right? This means that this will work down here.

00:19 But we now have a global inside the namespace React on an interface of my awesome interface. And what I'd like you to do is I'd like you just to kind of like modify that, but with a separate declaration below this comment here. And the idea of what you're trying to do

00:37 is you're trying to make it also have a bar string on it. That's your goal. So this, again, we're in the sort of like abstract here, but I just want you to see if you can figure this out using the clues here and using this link here that might help too. Good luck.

# Solution: Extend the Global React namespace with Declaration Merging in TypeScript

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/07-types-deep-dive/59-declaration-merging-in-global-namespace.solution.ts

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/07-types-deep-dive/59-declaration-merging-in-global-namespace.solution.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=81038755-cc09-4d15-a63c-a53542ca9179&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0702-modify-existing-interfaces-in-the-global-react-namespace-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=81038755-cc09-4d15-a63c-a53542ca9179&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0702-modify-existing-interfaces-in-the-global-react-namespace-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
You can have multiple `declare global` blocks in the same file, even if they both are going to modify the same namespace.

In order to solve this challenge, we will duplicate the existing `MyAwesomeSolutionInterface` and add the `bar: string;` property to the second block:

```typescript
declare global {
  namespace React {
    interface MyAwesomeSolutionInterface {
      foo: string;
    }
  }
}

declare global {
  namespace React {
    interface MyAwesomeSolutionInterface {
      bar: string;
    }
  }
}

type test = Expect<
  Equal<React.MyAwesomeSolutionInterface, { foo: string; bar: string }>
>;
```

Both of the `MyAwesomeSolutionInterface` interface declarations are in the same scope, so they get merged.

Note that this wouldn't work if these were types. In that case, TypeScript would give us an error because of the duplicate identifier:

```typescript
declare global {
  namespace React {
    type MyAwesomeSolutionInterface {
      foo: string;
    }
  }
}

declare global {
  namespace React {
    type MyAwesomeSolutionInterface { // Error!
      bar: string;
    }
  }
}
```

Declaration merging also wouldn't work if the interfaces were in different namespaces:

```typescript
declare global {
  namespace React {
    type MyAwesomeSolutionInterface {
      foo: string;
    }
  }
}

declare global {
  type MyAwesomeSolutionInterface { // different namespace!
    bar: string;
  }
  namespace React {
    type MyAwesomeSolutionInterface { 
      foo: string;
    }
  }
}
```

This is how you change code that is already available in the global scope.

## Transcript
00:00 So the solution here is basically to copy this over to add a new declareGlobal because you can have multiple per file. And now, instead of having foo string, we can actually just add bar string. And those interfaces, because they're in the same scope, they get merged. So this is declaration merging of interfaces.

00:19 This wouldn't work if these were types, right? So if we have my awesome solution up here, these aren't going to work because we have duplica identifiers in the same scope. And it also wouldn't work if they were in different scopes. So if this one was just in declareGlobal up here, so just a globally available interface,

00:35 this doesn't work because it's not in the same namespace as this. So here we can see that you can do all of this cool little kind of like declaration merging or all this interesting stuff to actually change things that are already available in the global scope. And we're going to put this into practice in the next exercise.

# 8. Add a New Global Element in TypeScript

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/07-types-deep-dive/60-add-new-global-element.problem.tsx

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/07-types-deep-dive/60-add-new-global-element.problem.tsx)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=c84174ed-41dd-4a15-a7c8-40ae7ada86b5&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0801-add-a-new-global-element-in-typescript-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=c84174ed-41dd-4a15-a7c8-40ae7ada86b5&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0801-add-a-new-global-element-in-typescript-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
Imagine that we're working with an external library that has a new global element available to us. We want to strongly type the element so that it can only be used with the correct attributes.

In this case, we want to create a `<something>` element and give it a required `id` attribute, which is a string:

```typescript
<something id="123"></something>
```

However, when we use this element TypeScript tells us that it doesn't exist on the `JSX.IntrinsicElements` interface:

```typescript
// hovering over `something` shows:

Property 'something' does not exist on type 'JSX.IntrinsicElements'.
```

It's not the code that's incorrect, it's the types that are insufficient.

## Challenge
Your goal is to strongly type the `something` element so that it can only be used with the correct attributes.

Hint: You'll need to use declaration merging with something in the global namespace that we've seen before.

## Transcript
00:00 In this exercise, I want you to imagine that we're working with an external library that has a new global element available to us. We want to strongly type this so that it can only be used with the correct attributes. In this case, we want to create a something element and give it a required ID attribute, which is a string.

00:17 We're going to need to declaration merge with something in the global namespace that we've seen before. I think you're getting the idea here. In fact, the error that we're getting here is property something does not exist on type JSX.IntrinsicElements. In this case, we're not wrong, it's the types that are wrong.

00:37 Learning what you've figured out so far, see if you can piece all that together and make this work. Good luck.

# Solution: Extend JSX.IntrinsicElements with Declaration Merging

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/07-types-deep-dive/60-add-new-global-element.solution.tsx

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/07-types-deep-dive/60-add-new-global-element.solution.tsx)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=b87dce27-ad71-472d-b9e6-91bf988c0117&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0802-add-a-new-global-element-in-typescript-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=b87dce27-ad71-472d-b9e6-91bf988c0117&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0802-add-a-new-global-element-in-typescript-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
For the solution to this challenge, we'll name the element `<something-solution>`.

From the error message, we know that the `something-solution` element does not exist on the type `JSX.IntrinsicElements`.

This tells us that we need to use declaration merging to extend the `JSX.IntrinsicElements` interface.

Like we've seen before, we'll use `declare global` and target the `JSX` namespace. Then we'll extend the `IntrinsicElements` interface with the new `something-solution` element:

```typescript
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "something-solution": {
        id: string;
      };
    }
  }
}
```

After extending the interface the error disappears.

When using the `something-solution` element, we have to pass a string for the `id` prop.

As seen in the tests, not passing the `id` prop or passing a number for the `id` prop will throw an error:

If we pass the wrong type of prop, TypeScript will throw an error, ensuring that we only pass the correct prop.

```typescript
<something-solution />
// Error: Property 'id' is missing in type '{}' but required in type '{ id: string; }'.

<something-solution id={123} />
// Error: Type 'number' is not assignable to type 'string'.
```

## Alternative Solution
Recall that `JSX.IntrinsicElements` is available both in the global `JSX` namespace and in the `React` namespace.

The first solution uses the global `JSX` namespace, but we could also use the `React.JSX` namespace.

```typescript
declare global {
  namespace React{
    namespace JSX {
      interface IntrinsicElements {
        "something-solution": {
          id: string;
        };
      }
  }}
}
```

While both of these options will work, it's generally recommended to use `React.JSX.IntrinsicElements` when working with React because it's more specific.

## Transcript
00:00 So the thing we know from this error is that JSX.IntrinsicElements is the thing we want to target with our declaration merge. We want to pull this into the global scope here, so we'll declare global. To declare global, we're going to basically say,

00:16 we need to go onto the namespace JSX and inside there, we're going to go interface intrinsic elements. I have to make sure to spell this right, intrinsic elements, and then say something solution, because it has to be inside a string here, otherwise it's invalid,

00:33 and we're going to say ID string. Now here, it starts to work and we actually get, you can see here, there we go, JSX.IntrinsicElements something solution ID string. If we command click, we actually go to this definition up here, whereas if we were to command click on a div, let's say, we would actually go all the way

00:51 into JSX.IntrinsicElements here. You're starting to see how declaration merging can be pretty powerful here, because we can actually describe custom stuff that we can render, which is really, really interesting. So now, if we pass in like the wrong thing, if we don't pass in an ID, it's missing in type empty object, but required in this,

01:09 and also if we pass it as the wrong thing, this is going to yell at us because it's expecting a string. Very, very cool. And you notice as well, that JSX.IntrinsicElements, it's also available inside the namespace React, JSX.IntrinsicElements. So up here, for instance, this also will work.

01:29 This is interesting because JSX.IntrinsicElements, it's available on the JSX namespace, but that's global. And if for whatever reason, you have types that are coming in from, let's say, React, but also another framework that uses JSX, like SolidJS or Preact, for instance, you actually want to say,

01:48 okay, this is only available inside React's namespace of JSX. So it gets a little bit confusing here, but really the main thing is that both of these will work. And probably you want to be more specific, I would say. So you probably want to say React.JSX.IntrinsicElements. But then again, how often are you going to be combining

02:06 two frameworks in the same project? So I would usually just say, namespace JSX.IntrinsicElements, add your extra kind of elements on there and type the props. Not bad.

# 9. Exploring HTML Attribute and Element Types

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/07-types-deep-dive/61-html-attributes.problem.tsx

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/07-types-deep-dive/61-html-attributes.problem.tsx)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=bde3f11a-f173-4f4c-b8c9-128b3e0b1226&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0901-exploring-html-attribute-and-element-types-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=bde3f11a-f173-4f4c-b8c9-128b3e0b1226&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0901-exploring-html-attribute-and-element-types-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
Let's shift our focus to HTML elements and attributes and how React knows what is available for each element.

Here are several questions for you to explore with help from [the](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/8169bc6f114ce1b7d3c00f2a3666c4e4921aa317/types/react/index.d.ts) [`index.d.ts`](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/8169bc6f114ce1b7d3c00f2a3666c4e4921aa317/types/react/index.d.ts) [file](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/8169bc6f114ce1b7d3c00f2a3666c4e4921aa317/types/react/index.d.ts):

## Question 1: HTML Attributes
First off, how does React know which HTML attributes can be passed to each HTML element? Which interfaces or types store this information?

## Question 2: The `div` Element
Where does the information for `div` come from? Are there `div` specific types? What interface is describing that behavior?

Check it out in the ([DefinitelyTyped repo](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/8169bc6f114ce1b7d3c00f2a3666c4e4921aa317/types/react/index.d.ts#L3295)) or by `cmd + click`ing on `div` in VS Code.

## Question 2: The `className` Prop
Next, what interface does the `className` prop lead you to?

## Question 3: The `href` Prop
Finally, what interface does the `href` prop lead you to? What interface is responsible for managing this prop? Explore [the anchor tag types in the DefinitelyTyped repo](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/8169bc6f114ce1b7d3c00f2a3666c4e4921aa317/types/react/index.d.ts#L3265)) and determine how it decides what props are available.

## Transcript
00:00 Now, we've been looking at some crazy stuff. We're looking at declaration merging, at the global scope. Let's get down to brass tacks now and let's look at the HTML attributes that come with each element here. And I'm going to ask you some questions here or you're going to try and figure out these questions. How does React know which HTML attributes can be

00:19 passed to which HTML element and on which interfaces and types are they stored? So for instance, this div here, how does TypeScript know, or React know, what can this receive here? We know that it's on jsx.intrinsic elements, but actually what

00:37 div-specific stuff is there or is there no div-specific stuff? What actual interface describes what the div can take there? Now, here too, this class name prop here, where does this class name prop actually go? What interface does it lead you to? And finally,

00:55 this href prop down the bottom here, where does this lead you to? What interface does that take you to? So your job is to really try to figure out if you have an anchor tag here, what actually decides what's possible to put on that anchor tag? Same with the div, same with audio, video, things

01:13 like that. So some interesting questions here. Good luck.

# Solution: Navigating HTMLAttribute types

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/07-types-deep-dive/61-html-attributes.solution.tsx

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/07-types-deep-dive/61-html-attributes.solution.tsx)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=9c5307cf-f33d-4d78-9da0-e8bb1f6e53cb&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0902-exploring-html-attribute-and-element-types-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=9c5307cf-f33d-4d78-9da0-e8bb1f6e53cb&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0902-exploring-html-attribute-and-element-types-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
All of the questions from this challenge can be answered by exploring the types.

Let's start by looking at the `div` element types. You can either check out the ([DefinitelyTyped repo](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/8169bc6f114ce1b7d3c00f2a3666c4e4921aa317/types/react/index.d.ts#L3295)) or `CMD + click` in VS Code.

Back inside the `JSX.IntrinsicElements` interface in `index.d.ts` is an exhaustive list of available elements.

Each element starts with `React.DetailedHTMLProps` which is a generic type that takes two parameters. The first parameter is the type of the element, and the second is the type of the props:

```typescript
type DetailedHTMLProps<E extends HTMLAttributes<T>, T> = ClassAttributes<T> & E;
```

When looking at the anchor tag `<a>`, we can see:

```typescript
(property) JSX.IntrinsicElements.a: DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>
```

Jumping to [the definition of](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/8169bc6f114ce1b7d3c00f2a3666c4e4921aa317/types/react/index.d.ts#L2129) [`AnchorHTMLAttributes`](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/8169bc6f114ce1b7d3c00f2a3666c4e4921aa317/types/react/index.d.ts#L2129) we can see that it extends `HTMLAttributes` and adds a few more properties:

```typescript
// inside index.d.ts line 2129
interface AnchorHTMLAttributes<T> extends HTMLAttributes<T> {
  download?: any;
  href?: string | undefined;
  hrefLang?: string | undefined;
  media?: string | undefined;
  ping?: string | undefined;
  target?: HTMLAttributeAnchorTarget | undefined;
  type?: string | undefined;
  referrerPolicy?: HTMLAttributeReferrerPolicy | undefined;
}
```

When [moving over to](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/8169bc6f114ce1b7d3c00f2a3666c4e4921aa317/types/react/index.d.ts#L1919) [`React.HTMLAttributes`](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/8169bc6f114ce1b7d3c00f2a3666c4e4921aa317/types/react/index.d.ts#L1919), we can see that it extends `AriaAttributes` and `DOMAttributes` and has a list of attributes that belong to all elements:

```typescript
// inside index.d.ts
interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
  // React-specific Attributes
  defaultChecked?: boolean | undefined;
  defaultValue?: string | number | ReadonlyArray<string> | undefined;
  suppressContentEditableWarning?: boolean | undefined;
  suppressHydrationWarning?: boolean | undefined;

  // Standard HTML Attributes
  accessKey?: string | undefined;
  ...
}
```

The `DOMAttributes` interface that is extended by `HTMLAttributes` is where the `className` lives. The interface also has several other React properties like `children`, and `dangerouslySetInnerHTML`, as well as a long list of event handlers that you're used to.

By getting a sense of how these types are structured and how they relate to each other, you will become more efficient at debugging the type errors you encounter in your code.

## Transcript
00:00 Let's walk through this step-by-step. Let's look at this div below. Let's try command clicking on it. Now, this will take us to the JSX.IntrinsicElements, and we end up at this React.DetailedHTMLProps. What I'm interested in looking at here is we have React.HTMLAttributes.

00:19 If we look at HTML attributes, you'll be able to see that each of these, there's loads of these different things here. When we go further down, we'll see that there's also SVG props here. It's funny that they call them HTML attributes on one side, but also SVG props down the bottom here.

00:36 HTML attributes, we can see that a couple of these have prefixes. We have HTML attributes for, let's say, main and div, things like that, and dl and span as well, I'm sure we'll have this. Let's take a look at span. SAMP, I have no idea what SAMP does. Every time I look at this list, I learn about new HTML attributes actually in elements.

00:55 This span here, it doesn't have anything specific to it. It's just HTML attributes, whereas source has something to it. If we command click on HTML attributes, we can see that index inside no modules here. We can see that it takes in a T and we

01:12 have extends ARIA attributes and DOM attributes. We can see here that there are things like default checked, default value, and then we have standard stuff, so access key, hidden, lang, nonce, radio group, and all this sort of thing. These are actually maintained by React itself.

01:29 It's not falling back on anything like lib.dom.d.ts, which is where the DOM types are stored. React is responsible for understanding which attributes you can actually pass to your elements. HTML attributes, really this is responsible for the base of all of

01:47 the things that you can pass into the DOM. If we look at the A, for instance here, then this A, it's got an anchor HTML attributes. Let's look at that. This extends HTML attributes here. HTML attributes is like the base. Then all of the other stuff, we can see like audio HTML attributes or

02:06 area HTML attributes all extended. This one extends media HTML attributes, which itself extends HTML attributes. You can see this tree of different things that all go down to HTML attributes, which itself extends ARIA attributes and DOM attributes. Let's take a look at ARIA attributes.

02:25 These are all of the ARIA things that you can add onto here, ARIA invalid, ARIA key shortcuts, etc. We've got the DOM attributes itself. We've got children, we've got dangerously set in a HTML, which you can do on all nodes, on copy, all of these different events here, which are extremely useful as well.

02:45 Yeah, those are all event handlers. This also gives you a sense for what event handlers are possible too. Mouse event handler, drag event handler, React event handler. I don't know what that's about, React event handler, event handler, synthetic. You can go deeper and deeper into this. But what we're seeing here then, how does React know which HTML attributes can be

03:04 passed to each HTML element? Basically, it's got a huge, great big list here of all of the different ones and their specific iterations too. These are only available on dialogue, for instance. These are only available on embed. Each interface here doesn't quite correspond one-to-one because a lot of these elements,

03:24 basically, they just fall back on the HTML attributes. They haven't said, okay, we'll give div a specific interface for itself. DL, DT, EM, all of those are going to have specific interfaces because those interfaces would just have nothing on really. They all get filtered through this detailed HTML props, which just grabs the class attributes,

03:43 which is essentially just a ref here, a legacy ref for undefined. Now, try come on clicking on the class name prop, that takes us to HTML attributes. Fantastic. The href down here takes us to the anchor HTML attributes. So there we go. What you'll see a lot of times is if you're trying to spread props into

04:03 like one of these native components here, one of JSX intrinsic elements, then you're going to see these names pop up all over the place. And so it's important you understand the structure of how they work so that you can actually go in and kind of like, like be able to navigate around all of that stuff. So if you didn't understand any of that,

04:22 go back to the exercise, try navigating around and explore for yourself. See if you can build up a mental picture and map that territory so that you, if you need to, you can dive in and understand exactly where each type is coming from. And so you can kind of be able to solve errors when they come up.

# 10. Add Attributes to All Elements with Declaration Merging

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/07-types-deep-dive/62-add-attribute-to-all-elements.problem.tsx

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/07-types-deep-dive/62-add-attribute-to-all-elements.problem.tsx)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=c6645f0d-ee4a-4b5f-b22d-24182cfed0aa&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="1001-add-attributes-to-all-elements-with-declaration-merging-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=c6645f0d-ee4a-4b5f-b22d-24182cfed0aa&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="1001-add-attributes-to-all-elements-with-declaration-merging-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
This list of different HTML elements all have a `testId` attribute added, which can be useful for extracting elements from the DOM for testing:

```typescript
<>
  <div testId="123" />
  <audio testId="123" />
  <video testId="123" />
  <a testId="123" />
  <abbr testId="123" />
  <address testId="123" />
</>;
```

However, there is currently an error for each since the `testId` attribute doesn't exist on these elements.

## Challenge
Your challenge is to find the correct interface to target, then use declaration merging in the global scope to add the `testId` attribute.

Keep in mind that this attribute should be optional, so it doesn't interfere with the rest of the environment.

## Transcript
00:00 Let's take everything that we've learned so far and put it into practice. Let's imagine that we wanted to add an optional attribute to all elements where we want to say, okay, we can pass this element a test ID. This test ID, it might just sort of like ping onto the DOM and it means that we can extract it out later and sort of pull it into our tests or things like that.

00:18 So your job is to make use of declaration merging in the global scope and try to find the right interface to add this on in order to add it onto all of these props down here. And we want this to be optional as well, just so we don't, you know, muck up our entire environment here. Good luck.

# Solution: Updating the Global Namespace for an Additional Attribute

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/07-types-deep-dive/62-add-attribute-to-all-elements.solution.tsx

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/07-types-deep-dive/62-add-attribute-to-all-elements.solution.tsx)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=139f4a97-bfbd-4098-bbb5-34867b9d215c&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="1002-add-attributes-to-all-elements-with-declaration-merging-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=139f4a97-bfbd-4098-bbb5-34867b9d215c&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="1002-add-attributes-to-all-elements-with-declaration-merging-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
The first step for declaration merging is to use `declare global` with the React namespace:

```typescript
declare global {
  namespace React {

  }
}
```

Over in the React types, it looks like there are a couple different choices to try.

## `DOMAttributes`
Let's try `DOMAttributes`:

```typescript
declare global {
  namespace React {
    interface DOMAttributes<T> {
      solutionTestId?: string;
    }
  }
}
```

With this change we still have an error:

```typescript
All declarations of 'DOMAttributes' must have identical type parameters.

interface React.DOMAttributes<T>
```

This error tells us that we need to include the `<T>` even though it's unused:

```typescript
interface DOMAttributes<T> {
  solutionTestID?: string;
}
```

The errors have gone away, and the attributes have been added!

## `HTMLAttributes`
Another option is to use `HTMLAttributes`, which also uses the `<T>`:

```typescript
declare global {
  namespace React {
    interface HTMLAttributes<T> {
      solutionTestId?: string;
    }
  }
}
```

## `ARIAAttributes`
Finally, using `ARIAAttributes` will also work. Note that it does not require the `<T>`:

```typescript
declare global {
  namespace React {
    interface ARIAAttributes {
      solutionTestId?: string;
    }
  }
}
```

## Wrapping Up
While there are three different ways to add the `solutionTestId` attribute, my recommendation is to use `HTMLAttributes<T>` because it's the most specific. It also makes the most sense use HTML attributes in React.

Now that you have a clear understanding of the namespace structure and hierarchy of interfaces in React, you'll be better equipped to handle any errors that might arise in the future.

When you encounter issues with type parameters in React, remember to revisit this section and the concepts discussed here to help you resolve the problem!

## Transcript
00:00 We're back on this DeclareGlobal. We definitely need that. We definitely need to use namespace react. Now it's a case of which interface do we use in order to add this solution test ID to it. We know that the base for a lot of this stuff, so it's going to be HTML attributes,

00:17 which extends ARIA attributes and DOM attributes. We could, if we wanted to, put it on DOM attributes or ARIA attributes. Let's try DOM attributes first, so interface, DOM attributes, and let's just pull this out. But this is erroring here. Why would this be erring? All declarations of DOM attributes

00:37 must have identical type parameters. And we can see that DOM attributes actually takes in a T here. So when you do like a global override like this, we need to make sure that we're getting the type parameters exactly the same. So this T, even if it's unused, it actually does contribute. So we need to make sure it's there.

00:54 Now, we can have solution test ID, and we'll make it optional, and we'll make it a string here. So this ends up working. And this now means we have all of the DOM attributes that we need pulled in. Though this, I wouldn't say it's particularly perfect because I think, I mean, there's three different ways of doing this, basically,

01:14 where we can have HTML attributes as the one we target as well. And HTML attributes, if I spell this wrong, by the way, just so you see, HTML attributes, it doesn't work because we've actually like missed out on the spelling here. And so the declaration merge doesn't work, but this one does work. HTML attributes ends up working.

01:33 Lovely, lovely, lovely. And we've also got ARIA attributes as well. So ARIA attributes, is that spelled correctly? Must have identical type parameters. So I think we just remove this one because ARIA attributes itself doesn't actually take in a type parameter here. There we go. So now this works too.

01:52 I always recommend using HTML attributes though. It just seems to make sense to me. And this means that like now this will be passed through into the DOM itself and we can strike this out with like Puppeteer or something similar. So this is really, really cool. And it means that we've kind of put all of the bits of information that we needed together,

02:11 where we now can walk through the hierarchy of different interfaces inside React. We understand like how the namespace is constructed. And now whenever we get any errors that come up around this, we'll know where to go. And that's what I want you to take from this section. Thank you.

# (e) Advanced Patterns



# 1. Strongly Typed Lazy Loading

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/08-advanced-patterns/63-lazy-load-component.problem.tsx

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/08-advanced-patterns/63-lazy-load-component.problem.tsx)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=debb247a-3058-4e28-b347-3e8eb8660c68&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0101-strongly-typed-lazy-loading-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=debb247a-3058-4e28-b347-3e8eb8660c68&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0101-strongly-typed-lazy-loading-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
Here we have a `LazyLoad` component, inspired by a real component found in the Sentry codebase.

```typescript
function Lazyload({ loader, ...props }: Props) {
	const LazyComponent = useMemo(() => lazy(loader), [loader]);
	return (
		<Suspense fallback={"Loading..."}>
			<LazyComponent {...props} />
		</Suspense>
	);
}
```

This component takes in a `loader` prop, which allows it to import a component from the outside.

Then it sticks that component in a `useMemo`, loads it with `React.lazy`, and renders that component with a `Suspense` boundary wrapping it.

The component that we're working with is an imported `fake-external-component` that takes in a [`props.id`](http://props.id) and returns a simple `div` with "hello" inside.

However, we currently have some errors because the props are not typed correctly.

## Challenge
Your goal is to properly type the props and resolve the errors.

To do this, you'll need to make `LazyLoad` a generic component and bring in `React.ComponentProps` and `React.ComponentType`, [which we've seen in a previous exercise](https://www.totaltypescript.com/workshops/advanced-react-with-typescript/types-deep-dive/understanding-react-s-elementtype-and-componenttype).

It would also be helpful to look at the type definitions for `lazy` to better understand what's happening.

```typescript
// hovering over lazy

lazy<React.ComponentType<any>>(factory: () => Promise<{
   default: React.ComponentType<any>
}>): React.LazyExoticComponent<React.ComponentType<any>>;
```

Remember to wrap the component with a suspense boundary when rendering it!

## Transcript
00:00 In this exercise, we're going to look at a component that does some sort of interesting function. It's a lazy load component. What that does is it takes in a loader, which allows it to import a sort of component from the outside,

00:14 and then basically stick that in a use memo, load it with react.lazy, and then go and render that component with a suspense boundary wrapping it. What this means is you get to kind of have your cake and eat it too. You don't need to declare a separate component outside this.

00:30 You can just inline lazy load this component. I
actually saw this in the Sentry code base, and it really kind of
inspired me to make this exercise. The idea of this is that the
component that we have here is a fake external component. Let's go have a
look at it. It takes in a [props.id](http://props.id) and then sort of returns div hello.

00:49 And what we're trying to do here is we then, based on what's loaded here, we then type the props that this receives. So this should receive id of 123, and this should error because id is missing, and this one should error because number is not assignable to type string. We're passing in a number, and id should be a string. So you'll need a few things.

01:09 You'll need to make sure that it's a generic component. You'll need to make sure that you use react.component props, as well as react.component type, which we've seen before. And I'll link to the previous exercise where we covered react.component type. And also, you might just want to take a look at the type definition for lazy, just to kind of understand what's going on there.

# Solution: Strongly Typing Lazy Loaded Components with Generics

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/08-advanced-patterns/63-lazy-load-component.solution.tsx

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/08-advanced-patterns/63-lazy-load-component.solution.tsx)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=7a78a4c5-481d-4468-9b64-a5c89c03fd9f&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0102-strongly-typed-lazy-loading-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=7a78a4c5-481d-4468-9b64-a5c89c03fd9f&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0102-strongly-typed-lazy-loading-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
When interacting with something that requires strong typing, it's important to understand the constraints from the third-party libraries that we're working with.

In this case, let's start by taking a look at `lazy`.

Navigating to the type definition for `lazy` by `CMD + click` in local VS Code, or in the [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) repo.

We can see the following definition:

```typescript
function lazy<T extends ComponentType<any>>(
	factory: () => Promise<{ default: T }>
): LazyExoticComponent<T>;
```

The `lazy` function takes in a `ComponentType<Any>`, which as we've seen is kind of a union type between a class component and a function component, each of which takes in the same props.

This tells us we need to capture the types for the props being passed in.

## Typing the `loader` Prop
Let's start by typing the `loader` prop that is passed into the `LazyLoad` component:

```typescript
function LazyLoad({ loader, ...props }: Props) {
   ...
```

Currently, the `loader` prop is typed as `unknown`, but we can see that it's actually a function that returns a Promise of a component.

```typescript
type Props = {
	loader: unknown;
};

<LazyLoad loader={() => import("fake-external-component")} id="123" />;
```

So we'll start by typing it as a function that takes in a Promise with a `ComponentType` of `any`:

```typescript
import { ComponentType, lazy, Suspense, useMemo } from "react";

type Props = {
	loader: () => Promise<ComponentType<any>>;
};
```

However, there's an issue: we're not actually importing a `ComponentType`. Instead, we're importing an entire module with something on a default export.

So, the type should be an object with a `default` property, and that's going to be the `ComponentType<any>`:

```typescript
type Props = {
	loader: () => Promise<{
		default: ComponentType<any>;
	}>;
};
```

With this change, the `LazyLoad` function is working correctly and the `loader` type issues have been resolved.

Now we need to move on to making the `LazyLoad` component generic, because we aren't capturing the props correctly.

## Making the `LazyLoad` Generic
We know that whatever component we pass in to `LazyLoad` is going to receive different props, so we need to make it generic.

In this case, the part that needs to be dynamic is the `ComponentType` that we're passing in.

To do this, we'll updated `Props` to take in a `C` for `ComponentType`, which will be the `default` type:

```typescript
type Props<C extends ComponentType<any>> = {
	loader: () => Promise<{
		default: C;
	}>;
};
```

Then we'll update `LazyLoad` to instantiate the `Props` type with the `C` type. We also will constrain it to be a `ComponentType` to ensure it is assignable to `FunctionComponent<any>`:

```typescript
function LazyLoad<C extends ComponentType<any>>({
  loader,
  ...props
}: Props<C>) {
  ...
```

Some errors have gone away, but we now have errors inside of `LazyLoad` that need fixed.

## Fixing Errors in `LazyLoad`
Inside of the return statement, `LazyComponent` has an error:

```typescript
// inside of LazyLoad
const LazyComponent = useMemo(() => lazy(loader), [loader]);

return (
  <Suspense fallback={<div>Loading...</div>}>
    <LazyComponent {...props} />
  </Suspense>
);


// Error on LazyComponent
Type {} is not assignable to type 'C extends MemoExoticComponent<infer U extends ComponentType<any>> | LazyExoticComponent<infer U extends ComponentType<any>>
```

We're getting this error because we aren't actually extracting the component props. We need to ensure that the `props` being spread also contain the component props.

We can do this by updating the `Props` type to be the intersection of the `Props` type and the `ComponentProps` type:

```typescript
type Props<C extends ComponentType<any>> = {
	loader: () => Promise<{
		default: C;
	}>;
} & ComponentProps<C>;
```

With this change, the errors have been resolved. We get autocomplete on props and TypeScript will yell at us if props are missing!

Hovering over `LazyLoad` we can can see that our entire `fake-external-component` is being captured:

```typescript
<LazyLoad loader={() => import("fake-external-component")} id="123" />

// Hovering over LazyLoad
function LazyLoad<(props: {
  id: string;
}) => JSX.Element>({ loader, ...props }: Props<(props: {
  id: string;
}) => JSX.Element>): JSX.Element
```

## Wrapping Up
In conclusion, we're using the `ComponentType` as a constraint to ensure that what we're capturing is the thing being returned from the `loader`, which is wrapped in a Promise. We've successfully extracted the `ComponentProps` of that `ComponentType` and passed them on.

## Transcript
00:00 Okay, when we're interacting with something that we want to strongly type, it's best to look at the constraints from the third-party libraries that we're trying to interact with. So let's take a look at Lazy here. Lazy takes in a component type, Any, which as we've seen is basically just a kind of a union type between a component class and a function component,

00:19 each of which takes the same props. And we're going to need to know about those props because we need to type our kind of lazy load component down the line with them. So we need to somehow kind of capture the thing that's being grabbed in. So loader, now what is loader going to be? What is this, I wonder?

00:37 Like if we hover over this loader, it's currently typed as unknown, but this is a function which returns a promise of a component. So let's start there. We know this is a function, takes in no arguments, don't need to pass any parameters or pass any arguments,

00:53 takes in a promise with a component type. Now that component type, let's just sort of mark it as Any for now. And I'll also just import that from React. Now what we've got, this is starting to work and we've got some odd stuff here. Okay, so this is not assignable to component type Any. In fact, you know what this is doing?

01:13 It's not actually importing a component type. It's actually importing an entire module with something on a default export, which has that. So actually, this isn't going to be an entire module, which is just one component type. It's going to be an object with defaults, and that's going to be the component type Any.

01:30 Now that has started to go away, and this is starting to look good. We've now got our lazy loader function working. And in fact, you can see if we go here, this factory is exactly what we want to be doing here. This default is the T, which is the component type Any. So how do we handle this?

01:47 Now we've got errors here, and that's because we're not capturing the props here. So what we're going to do is we need to make this a generic function, right? Because we know that whatever you pass in, it's going to receive different props. We can't just make it accept this fake external component, because what if we try to load some other components?

02:06 So what's actually generic here? What do we need to make kind of dynamic in this situation? Well, it's going to be this component type. It's going to be the thing that you're passing in. And so what I want to do is I actually want to put this on a, let's call it C, for instance. And component type extends component type Any.

02:25 And now this default is going to be C here. Now what we can do is we can just grab this into C, and we can instantiate it just here. And C is going to be like this here. Now C, what you can see is that C does not satisfy the constraint component type Any,

02:43 because it's not assignable to type function component Any. That's because we need to constrain our C just here. So we need to say extends component type Any. We've seen this before actually, right? And now then, what's left to do here?

02:58 The error here that we're getting is type is not assignable to C extends memo exotic component, lazy exotic component. And we're still getting these errors down here. That's because we're not actually extracting out the component props here. And what we want to do is we need to somehow say

03:18 these props also need to contain the props of this C here, the component type. And the best way to do this is to add an intersection here and to use component props. And we're going to pass in the C. Now look at this. Now what we've got is what we're doing is we're kind of like we've got our loader here

03:40 importing this fake external components. We've got our ID string. If we don't include that, it's going to yell at us. And it's going to say ID is missing in this function. Beautiful. So let's grab that. We get autocomplete on it. Pass it in. Working. Nice. A way that you can see this because the annoying thing is with these JSX components is you can't

04:01 see actually what they're inferring as, what the type argument is being captured as when you hover over them. It just shows kind of like, oh, in fact, we are seeing this here. That's actually surprising to me. If you hover over lazy load there, you should see this function where we're basically capturing the entire fake external component there.

04:20 If I add a new prop here, if I add a name, let's say it's optional string, and then I go back here. Now we can see that name is being grabbed here too. And now props is basically capturing that entire element too. So now I can also add name onto here. So that's really, really nice. And this is the solution here.

04:40 We're using component type as a constraint to make sure that the thing we're capturing is the thing being returned from the loader, which itself is wrapped in a promise. And then we've extracted out the component props of that component type. We can take a look in here. And this is a, we've seen this kind of look before.

04:57 It's basically checking to see if it's a JSX element constructor, which component type is. And then if it is, it infers the props and returns them. So there we go.

# 2. Render Props

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/08-advanced-patterns/64-render-props.problem.tsx

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/08-advanced-patterns/64-render-props.problem.tsx)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=3b0d6974-2222-45dc-bed9-ce823d1a24f4&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0201-render-props-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=3b0d6974-2222-45dc-bed9-ce823d1a24f4&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0201-render-props-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
Before hooks were introduced, the Render Props pattern was one of the few ways to package reusable functionality for use throughout an application.

Although Render Props are less common now, they are still present in many third-party libraries, and in certain situations they are the only correct solution.

Consider this `Modal`, which includes some reusable functionality including `isOpen` and `setIsOpen` states:

```typescript
interface ModalChildProps {
	isOpen: boolean;
	openModal: () => void;
	closeModal: () => void;
}

const Modal = ({ children }: any) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			{children({
				isOpen,
				openModal: () => setIsOpen(true),
				closeModal: () => setIsOpen(false),
			})}
			{createPortal(
				<div>
					<h1>Modal</h1>
				</div>,
				document.getElementById("modal-root")!
			)}
		</>
	);
};
```

Inside of this code, we manually call the `children` function and pass in `isOpen`, `openModal`, and `closeModal` as arguments. The rest of the component creates a portal for the modal. This is just a demonstration to show how reusable functionality can be passed.

When using the `Modal`, we pass a function as the child component, which receives the props as an argument.

We expect the props to be equal to the `ModalChildProps`, which are defined earlier, but currently they are not.

```typescript
<Modal>
	{(props) => {
		type test = Expect<Equal<typeof props, ModalChildProps>>;

		return (
			<>
				<button onClick={props.openModal}>Open Modal</button>
				<button onClick={props.closeModal}>Close Modal</button>
			</>
		);
	}}
</Modal>
```

## Challenge
Your task is to find a way to strongly type `children` so the test passes and the modal will work as expected.

Note that this example isn't the only way to use Render Props, but passing them as children is idiomatic. We'll look at alternative APIs later.

## Transcript
00:00 In this exercise, we're going to look at Render Props. Render Props are an extremely useful tool in React, and they used to be very, very, very common, especially before hooks came in, because they were kind of the only way that you could package reusable functionality and kind of use it all around your application. But they're still pretty useful now,

00:18 and they're often used by third-party libraries, and you'll sometimes find yourself in a situation where only Render Props are the correct solution. Here we have a modal, and this modal is basically like, it's kind of got some reusable functionality packaged inside it. It's got some isOpen and setIsOpen states inside it.

00:37 And what we're doing here is we're basically calling children manually, and then passing it isOpen, openModal, and closeModal. Then with the rest of the component, we're creating a portal to this modal. So kind of just packaging, like this is just a demonstration to show you what passing reusable functionality looks like. And this looks weird kind of like

00:57 internally inside the modal, but then you actually look at the usage, and the usage is as a child, we pass in something to the, passing a function to the children, and then that gets passed the props as an argument. And so what we're expecting here, and this isn't currently working,

01:17 is we're expecting the props to be equal to modal child props, which are defined up here. And your job is to work out a way that we can type children strongly so that it actually works for us, and we get this API. This isn't necessarily everything render props can be, but passing them as children is kind of quite idiomatic.

01:36 And I'll show you some kind of like alternative APIs as well when we get there.

# Solution: Typing the Children Prop for Render Props

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/08-advanced-patterns/64-render-props.solution.tsx

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/08-advanced-patterns/64-render-props.solution.tsx)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=2d930587-6b6c-4abf-8cd4-c1a22a02ee50&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0202-render-props-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=2d930587-6b6c-4abf-8cd4-c1a22a02ee50&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0202-render-props-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
The first step to solving this problem is to type the `children` prop in the `Modal` component.

Here's what we started with:

```typescript
const Modal = ({ children }: any) => {
  ...
```

We'll update it by declaring an inline object type for the `children` prop, which we will set as `unknown` for now:

```typescript
const Modal = ({ children }: { children: unknown }) => {
  ...
```

In order to type `children` correctly, we can look at the `Modal`'s implementation.

Notice that `children` is a function that takes `isOpen`, `openModal`, and `closeModal` properties.

We'll create a new `ModalChildProps` with each of these properties, then use it to type the `Modal` component:

```typescript
interface ModalChildProps {
	isOpen: boolean;
	openModal: () => void;
	closeModal: () => void;
}
```

When typing the `Modal` component, we need to know what we are returning. In this case we're returning some JSX but in order to make the component more flexible we can use `React.ReactNode` as the return type.

```typescript
const Modal = ({
  children
}: {
  children: (props: ModalChildProps) => React.ReactNode;
}) => {
  ...
```

With this change, the error has disappeared!

## An Even Simpler Approach
It might be a little mind-blowing at first sight to see `children` being typed as a function that can be called instead of as just `React.ReactNode`.

However, there's an even simpler way to type this.

Looking at what we currently have:

```typescript
children: (props: ModalChildProps) => React.ReactNode;
```

We can see that it has a signature that looks like `React.FC`, which already has support for props:

```typescript
type FC<P = {}> = FunctionComponent<P>;

interface FunctionComponent<P = {}> {
	(props: P, context?: any): ReactNode;
	propTypes?: WeakValidationMap<P> | undefined;
	contextTypes?: ValidationMap<any> | undefined;
	defaultProps?: Partial<P> | undefined;
	displayName?: string | undefined;
}
```

This means that we can update our Modal to type it as `React.FC` instead:

```typescript
const Modal = ({
  children
}: {
  children: React.FC<ModalChildProps>;
}) => {
  ...
```

## Using a `render` Prop Instead of the `children` Prop
It's also possible to solve this problem by literally using a `render` prop instead of the `children` prop.

To do this, we would replace all of the `children` in the `Modal` with `render`:

```typescript
const Modal = ({
  render
}: {
  render: React.FC<ModalChildProps>;
}) => {
  ...
```

Then when using the `Modal` component, we would pass in a `render` prop instead of a `children` prop:

```typescript
<Modal
	render={(props) => {
		type test = Expect<Equal<typeof props, ModalChildProps>>;

		return (
			<>
				<button onClick={props.openModal}>Open Modal</button>
				<button onClick={props.closeModal}>Close Modal</button>
			</>
		);
	}}
></Modal>
```

We could even take it further by renaming the prop to `renderButtons` then wrapping the `createPortal` functionality.

This Render Props approach provides a level of flexibility that cannot be achieved with hooks alone.

## Transcript
00:00 Okay. So the way to solve this is we're just going to declare inside here in an inline object type, we're going to type this children property. And this children property, let's just currently stick it as unknown. But let's look at what it looks like inside the component.

00:15 Inside the component, children is a function which takes in a bunch of properties and returns... Well, what is it supposed to return? Let's just type this out first. We actually know that these props are going to be modal props or modal child props, which are just up here. And then what is it supposed to return?

00:33 Well, let's just say it returns, I don't know, undefined for now. Well, down here, we know that the thing it's supposed to return is some JSX. And we know the proper type for that is going to be react.reactNode because we want it to be flexible enough that it can pass a number, a Boolean string or null or undefined or anything.

00:52 So this seems to be working. So this is kind of like a slightly mind-blowing idea when you first look at it, that you can actually type children something other than react.reactNode. It's a function that you can call. If we try to pass it something that doesn't work here, let's say we just pass it a div,

01:10 then it's going to yell at us because this isn't a kind of assignable to a function that returns react.reactNode. And in fact, there's an even simpler way to type this. What do we know that looks like this signature? Well, it's a react.fc. And react.fc has modal child props attached to it.

01:29 So this is, I think, the most succinct definition for this, which is you're basically just passing in the raw definition of a function component into them. And that's kind of interesting. There's another way that you can potentially sort of design this API as well,

01:44 which is instead of using a children prop here, you can use like a render prop. And we'll just rename all of these render. And now, of course, this doesn't work. We actually need to grab this and stick this in a render prop, which is where it actually gets its name here.

02:02 So now what we have, you can actually pass in multiple of these if you want to be really, really, like use a really dynamic structure for where you want to render all of these elements. So here what we're doing is we can actually, let's just rename this like renderButtons, for instance. And then inside the modal, we could potentially just renderModal.

02:20 So this gives you a really nice API for basically wrapping this piece of state and wrapping the createPortal functionality, and then everything else you can kind of just like provide to the consumer of your components. And this isn't something that you can necessarily do with just pure hooks alone. Very, very cool.

# 3. Records of Components with the Same Props

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/08-advanced-patterns/64.5-record-of-components-with-same-props.problem.tsx

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/08-advanced-patterns/64.5-record-of-components-with-same-props.problem.tsx)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=fbd87322-8e8c-4228-bdb3-12e644ccf8ca&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0301-records-of-components-with-the-same-props-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=fbd87322-8e8c-4228-bdb3-12e644ccf8ca&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0301-records-of-components-with-the-same-props-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
A common pattern in React involves having multiple components that all require the same set of props, which are usually defined by a parent component that wraps all the child components together.

Here's an example:

```typescript
type InputProps = React.ComponentProps<"input">;

const COMPONENTS = {
	text: (props) => {
		return <input {...props} type="text" />;
	},
	number: (props) => {
		return <input {...props} type="number" />;
	},
	password: (props) => {
		return <input {...props} type="password" />;
	},
};
```

In this example, we have three components: `text,` `number,` and `password` that all require the same input props that come from using `React.ComponentProps`.

However, there are currently errors on the `props` for each.

One way to fix this would be to add the `InputProps` type to each component:

```typescript
const COMPONENTS = {
  text: (props: InputProps) => {
    ...
```

But this would get tedious if we had to do this for every component.

We also have a variety of errors when trying to use the variations of the `Input` component.

## Challenge
Your challenge is to strongly type `COMPONENTS` so all of the tests clear.

Hint: Use [the](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type) [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type) [utility type](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type) and [the](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-9.html#the-satisfies-operator) [`satisfies`](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-9.html#the-satisfies-operator) [operator](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-9.html#the-satisfies-operator) to add a new annotation to the `COMPONENTS` object.

## Transcript
00:00 In this exercise, we're going to look at a pattern which is pretty common in React apps where you have a bunch of components that all take in the same props, and you want to specify them via a variant or something, by a parent component that wraps them all together. Here we have a set of components, like a record of components,

00:18 where we have text, number, and password, and they all take in the same props. They all take in input props that we're grabbing from React.ComponentProps here. So I could, if I wanted to, just say input props like this, and things would start working. Now, though, we have this input down here,

00:36 and this input is supposed to take in various different types down here, and these types correspond to the components that we want to render. So we have type number, type text, and type password, and we want one to be inferred from the other.

00:53 Now, I don't really want to have to type input props or props input props for each component, because that's going to get pretty annoying if we have 20 of these, and we need to keep them all in sync. So your job is to try to find a way that I can strongly type this, and strongly type this to satisfy all of this stuff down here, because I want to make sure

01:13 that my onChange is properly typed. I want to make sure that type text, type password, all receive the right stuff, and I want to make sure that it's erroring if I pass in the wrong type down there. And so you are going to find that record and satisfies is probably going to be pretty useful to you. And the main way is just to solve this unknown type

01:32 and to add a new annotation to this components type here. Good luck.

# Solution: Infer Shared Props for Multiple Components

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/08-advanced-patterns/64.5-record-of-components-with-same-props.solution.1.tsx

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/08-advanced-patterns/64.5-record-of-components-with-same-props.solution.1.tsx)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=ef681777-6973-446e-bd57-fc35ee48edd3&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0302-records-of-components-with-the-same-props-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=ef681777-6973-446e-bd57-fc35ee48edd3&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0302-records-of-components-with-the-same-props-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
Our goal is to have the `COMPONENTS` correspond to a certain type and have their props inferred without manually typing them.

Let's look at a couple of approaches to solving this problem.

The first thing we'll do is make `COMPONENTS` into a `Record` where the keys are `string` and the values are a `React.FC` that takes `InputProps` as the props:

```typescript
const COMPONENTS: Record<string, React.FC<InputProps>> = {
  ...
```

Now we need to go to the `Input` component and update its props type to be `keyof typeof COMPONENTS`, as well as the additional `InputProps`:

```typescript
export const Input = (
  props: {type: keyof typeof COMPONENTS } & InputProps) => {
  ...
```

At this point, errors have been resolved and things are looking good, but we're not getting as good of inference as we could.

When we go to create an `Input` component, the `type` is being inferred as a string instead of as its component type:

```typescript
<Input type="number">

// hovering over type shows:
(property) type: string
```

We have this issue because `COMPONENTS` is overriding the type and inferring `text`, `number`, and `password` as a Record of strings.

## Fixing the Issue with Input Type
To fix this, we can create a new type called `InputType` that includes the possible input types: `text`, `number`, and `password`.

```typescript
type InputType = 'text' | 'number' | 'password';
```

Now we can replace the previous type in `COMPONENTS` with `InputType`, and we'll get proper errors.

```typescript
const COMPONENTS: Record<InputType, React.FC<InputProps>> = {
  ...
```

That's it! Now we have a clean solution that infers props from components and provides correct errors for the individual elements.

However, there's some room for improvement.

## Improving the Solution
This first solution had a lot of duplicated code for `text`, `number`, and `password`.

Instead of using an `InputType` with `Record`, we can use `satisfies` to make sure that the component satisfies the criteria we've set out:

```typescript
const COMPONENTS = {
  text: (props) => {
    return <input type="text" {...props} />;
  },
  number: (props) => {
    return <input type="number" {...props} />;
  },
  password: (props) => {
    return <input type="password" {...props} />;
  },
} satisfies Record<string, React.FC<InputProps>>
```

Now the components no longer need to have their props typed explicitly, as TypeScript infers it as `InputProps`.

This is quite clever, and it implicitly turns it into an `any` type instead of a `string` from `keyof typeof COMPONENTS`.

Using a `Record` with `satisfies` is a great pattern when building slightly polymorphic components that consistently take the same props.

## Transcript
00:00 So there is a pretty simple way that we can get this working. We want to make sure that components is like it corresponds to a certain type. We want to make these props kind of inferred from something and not have to type them all manually. So the obvious type that comes to mind is to basically say we have a record here

00:19 where the record is string and all the keys are string and the values of that record is a function. So we can use actually react.fc in this position quite nicely. So react.fc with input props as the props and now props is all inferred beautifully.

00:36 Now let's go down to input down here and see if we can figure out this props type. Well these props we need to have a type here and probably we need to say okay type is going to be keyof typeof components which we've also seen as a pattern before.

00:54 So keyof typeof components and we also want to be able to pass in the rest of the props here. So these props are going to be and input props. Okay so this is all looking pretty good now. We've got our types all working except though that type is being inferred as string here

01:11 not the individual elements of our components here. Well why is that? Well it's because our record here is actually overriding the type. It's not inferring that text number and password are here. It's only seeing that this is a record of strings here. Now we can get this working.

01:28 We can say type input equals text or let's say number or password and then we can replace this with this. So I shouldn't use this. I should say input type let's say. So input type I stick that there and now we're getting proper errors.

01:46 So this type email here is erring and now we've got type number password text beautiful and that's going to render out the proper components because props.type is kind of like assignable or you can use it to index into there. But this isn't quite as satisfying as we want it to be satisfying.

02:06 And that was totally unintentional but very very useful for where we're going. This input type we've got a bit of duplicated stuff here. Text is duplicated, number is duplicated and password is duplicated. Wouldn't it be good if instead of just like having to assign this

02:21 we could make sure that the component stuff actually satisfies the criteria that we've set out and then just let it infer what it wants to infer. Well in the second solution here we can use satisfies using satisfies record string react.component type input props. I'll change this to react.fc just for clarity.

02:41 So this is great. Now components if we see we still don't need to type these props because TypeScript actually picks up that we want to infer it as input props here. Very very clever of it. And if we don't have this here then it has no clue what these props are supposed to be

02:58 and it's going to implicitly turn it into an any type. But we no longer need to have the thing that we had here before. So we no longer need to do input type. In fact let me just refactor this so it matches up. We say satisfies this. We can say satisfies record string. Now everything just works.

03:16 So key of type of components is no longer just string. It's actually number, text, and password. Beautiful. So this is a really really nice pattern if you want to kind of build these kind of slightly polymorphic components that always take the same props. Really nice.

# 4. The Problem With forwardRef

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/08-advanced-patterns/65-forward-ref-with-generics.explainer.3.tsx

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/08-advanced-patterns/65-forward-ref-with-generics.explainer.3.tsx)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=bf490f25-95ad-4320-8838-08ceff970d6b&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0401-the-problem-with-forwardref.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=bf490f25-95ad-4320-8838-08ceff970d6b&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0401-the-problem-with-forwardref.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Explainer
React's `forwardRef` has some properties that make it annoying when working with generic components.

Here we have a `Table` component which we then wrap with `forwardRef`:

```typescript
export const Table = <T>(
	props: Props<T>,
	ref: ForwardedRef<HTMLTableElement>
) => {
	return <table ref={ref} />;
};

const ForwardReffedTable = forwardRef(Table);
```

Then when using the `ForwardReffedTable`, we pass in a `ref` to the `tableRef` which is then used to access the `table` element.

```typescript
const Parent = () => {
  const tableRef = useRef<HTMLTableElement>(null);
  const wrongRef = useRef<HTMLDivElement>(null);
  return (
    <>
      <ForwardReffedTable
        ref={tableRef}
          ...
      >
  )
}
```

By using `forwardRef`, we have constructed a React component that takes in `props` and the `ref` as arguments.

Inside of the `Parent` component, the `tableRef` is working great– `HTMLTableElement` is being inferred properly.

If we switch the `ref` prop to be `wrongRef`, we'll get a type error about `RefObject<HTMLDivElement>` is not assignable to `RefObject<HTMLTableElement>` and there are a lot of missing properties.

The problem is that the inference inside the generic component no longer works.

## Demonstrating the Problem
Inside of `Props` we have a `data` array of `T`, along with a `renderRow` function that takes in an item and renders a `ReactNode`.

```typescript
type Props<T> = {
	data: T[];
	renderRow: (item: T) => React.ReactNode;
};
```

As seen in the test inside of `ForwardReffedTable`, we would expect the type of using `["123"]` as the data to be `string[]`, but instead it's `unknown[]`:

```typescript
// inside `Parent`
<ForwardReffedTable
	ref={tableRef}
	data={["123"]}
	renderRow={(row) => {
		type test = Expect<Equal<typeof row, string>>; // Error!
		return <div>123</div>;
	}}
/>
```

The reason this is happening is because of the way that `forwardRef` is typed.

## Fixing `forwardRef`'s Type
To jump ahead to the solution, uncommenting the following code from Stefan Baumgartner will globally override the value of `forwardRef`:

```typescript
declare module "react" {
	function forwardRef<T, P = {}>(
		render: (props: P, ref: React.Ref<T>) => React.ReactNode
	): (props: P & React.RefAttributes<T>) => React.ReactNode;
}
```

This is a good snippet to have on hand when using `forwardRef` in your TypeScript projects, but there are some tradeoffs, though.

With the above solution, when we go to use `ForwardReffedTable`, we no longer have access to `defaultProps` and some of React's other properties even though we do have proper inference for the generic component.

It's probably a worthwhile trade, but why does this happen?

## A Closer Look at the Problem
Now that we've seen the solution, let's take a closer look at the problem.

Here we have a `removeInference` function that accepts a function component `FC` as an argument.

The `FC` is like an object with a call signature, and when called, it takes in `props` and returns a `React.ReactNode`:

```typescript
type FC<Props> = {
	(arg: Props): React.ReactNode;
	// try uncommenting this - and it works!
	// someOtherThing?: string;
};

const removeInference = <Props>(component: FC<Props>) => {
	return component;
};
```

When we create a new `TableWithoutInference`, we'll get an error like we saw earlier where the `row` isn't inferred properly:

```typescript
const TableWithoutInference = removeInference(Table);
```

However, the `Table` itself still works as expected!

Why is this?

## The Problem with `FC`
This issue arises due to the `FC` type.

TypeScript sees that `FC` is more complex than a simple function, so it decides not to apply any higher-order function logic to it.

When we set the `component: FC<Props>` type in `removeInference`, we're telling TypeScript that we are passing in a generic function which it recognizes when the `someOtherThing?: string;` inside of `Props` is commented out:

```typescript
const removeInference = <Props,>(component: FC<Props)>) => {
  ...

const TableWithoutInference = removeInference(Table)

// hovering over TableWithoutInference shows:
const TableWithoutInference: <T>(arg: TableProps<T>) => React.ReactNode
```

However, when we uncomment `someOtherThing?: string;`, `Props` no longer takes in a type argument and we're left with an unknown:

```typescript
// hovering over TableWithoutInference shows:
const TableWithoutInference: FC<TableProps<unknown>>;
```

The reason it doesn't work in React as expected is because the `React.FC` type has extra things present:

## Looking at the `forwardRef` Definition
Let's take a look at the `ForwardRefRenderFunction` type definition:

```typescript
interface ForwardRefRenderFunction<T, P = {}> {
	(props: PropsWithChildren<P>, ref: ForwardedRef<T>): ReactElement | null;
	displayName?: string | undefined;
	/**
	 * defaultProps are not supported on render functions
	 */
	defaultProps?: never | undefined;
	/**
	 * propTypes are not supported on render functions
	 */
	propTypes?: never | undefined;
}
```

Because of the extra properties present, TypeScript doesn't infer the type too deeply or apply higher-order function logic to it.

As a result, getting better inference when working with `forwardRef` implementations can be challenging, especially when dealing with generic components.

It's possible that React may address this issue in the future, making it easier to work with `forwardRef` and generic components.

Until then, save this code Stefan Baumgartner to get the best inference you can:

```typescript
declare module "react" {
	function forwardRef<T, P = {}>(
		render: (props: P, ref: React.Ref<T>) => React.ReactNode
	): (props: P & React.RefAttributes<T>) => React.ReactNode;
}
```

## Transcript
00:00 Let's talk about ForwardRef and React. ForwardRef, as well as a couple of other functions, has a property where it can be very, very annoying to work with when you're working with generic components. So we have this table down here, and then we have a ForwardRef table, which is we're just wrapping this ForwardRef

00:19 or wrapping the table with ForwardRef. And now what's going on here is that the table basically takes in this ref and then passes it to the table element below it. And ForwardRef allows us to basically construct a React component here that takes in two arguments, first the props and then the ref.

00:37 So you would expect then that this table ref, first of all, the table ref is working great. Like this ref now that's required by ForwardRef table, it's exactly the ref that we specified above. So HTML table element is being inferred properly. And if I remove this tsExpectError, then we can see that passing in the wrong ref,

00:56 HTML div element into HTML table element is saying it's missing a bunch of properties like bgColor, borderCaption, cellPadding, etc. So the ref is working great. It's just the inference inside the generic component no longer works. So you can see here that basically we've got our data here,

01:16 which we're passing in an array of T, and then renderRow, we basically take in that row and then render a React node out. Except that we're passing in an array of strings, so you would expect renderRow here, this row to be type string, but it's not, it's type unknown. And if I just change this to a table,

01:35 well, we get rid of our ref here, but what we do get is this row is now typed as string. So, right. So the reason this is happening is rather complex, but I will explain it in a bit. But first, I'm going to show you the solution. You can actually globally override the value of ForwardRef here

01:52 by using DeclareModuleReact. And if I uncomment this, then it actually starts working. So this is possible in TypeScript, but it's like, as we can see now, ForwardRef, it just works. And if I change this to a number instead of a string, then this is going to start erroring because this row is supposed to be a number, not a string.

02:12 How cool is that? So this actually, you can just take and drop into your projects if you want to. And I think actually, in a lot of cases, it's going to work great. The only thing you don't get from this is now ForwardRefTable, for instance. ForwardRefTable, it doesn't have anything like default props on it, and it doesn't have things like, what was the other one, like context types

02:33 or things like that. And if I uncomment this or comment it back up rather, then it does. So default props is now on it, and display name as well as the other actually useful one. So you win some and you lose some basically. And the reason this is happening is because this version of ForwardRef, this was put together by Stephen Baumgartner,

02:52 who's another really great CS wizard. It basically sort of says, okay, we don't care about default props and we don't care about display name enough to basically ruin our inference in favor of them. And I'll show you why that happens in a second. This is really cool because it even works across module boundaries. So if I comment it out again

03:12 and actually just go to this second file I've got here, then if I comment it out, then in this file, it will start erroring. But if I uncomment it, wow, it now starts working. Really nice. So you can just drop this into your project and it will just start working. So let me dive deep into why it actually isn't working

03:34 for like to begin with. So we can imagine here, let's imagine that we have a remove inference function. And this function basically just accepts currently what we're describing as an FC, right? So a functional component. And this FC here, I've got,

03:53 basically it's like an object, but the object can be called. This object has a call signature. And when you call it, it takes in props and it returns React.ReactNode. But it's also got some other thing on it. And the crazy thing here is we're basically just saying table without inference, remove inference table.

04:11 This table is exactly the same as the one we had above or in the previous file. And the table without inference no longer works. So this row no longer works. Whereas this table, it does work. How crazy is that? The reason this is working is that

04:29 because of this type here, this FC type, if we comment this out, we comment out some other thing, it starts working. But because TypeScript is seeing, I don't know quite why this works this way, but TypeScript sees that, okay,

04:46 this type is slightly more complicated than a function. So I'm not going to apply any kind of higher order function logic to it. Because here, this component FC props, it could just say, okay, I understand that what you're passing in is a generic function. So I will preserve its generosity. And you can see that it does do that.

05:04 So here you can see that there's a T at the start of here indicating that this function, this table without inference function takes a type argument. But when we comment this out, or uncomment it rather, then it no longer takes in a type argument. And we've just got FC table props unknown.

05:22 So the reason then that it doesn't work in React like this is because the react.fc type has display name on it. So if we look at, let's say we've got props in here. So forward ref, let's take a look at the actual definition. Here, we've got T forward ref render function.

05:41 Yeah, here we go. We've got props P and here we go. It's the definition of this forward ref render function that has display name, default props and prop types. And I imagine actually, I'm just going to try this and just see if it works. There might be more complicated stuff going on. But if I comment this out

05:57 and I uncomment my kind of like better version, does that just start working? No, it doesn't. Oh no, it doesn't because there's other, I imagine there's other things going on. That was like a shot in the dark that didn't end up paying off. But essentially this is why it happens, right? It's because of these extra things on here

06:16 that mean that TypeScript doesn't infer it too deeply or rather doesn't like apply some higher order function logic to it. So a forward ref implementation is possible. And I actually do recommend that you take this one here and stick it in your projects

06:32 because like React may fix this at some point. And currently forward ref is really painful to work with, with kind of like generic components.

# 5. Fixing forwardRef Locally

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/08-advanced-patterns/66-forward-ref-as-local-function.problem.tsx

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/08-advanced-patterns/66-forward-ref-as-local-function.problem.tsx)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=d3826de1-fea8-44cf-be8a-98658102d922&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0501-fixing-forwardref-locally-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=d3826de1-fea8-44cf-be8a-98658102d922&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0501-fixing-forwardref-locally-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
Here's the `fixedForwardRef` function from the previous lesson:

```typescript
function fixedForwardRef(
	render: (props: any, ref: any) => any
): (props: any) => any {
	return forwardRef(render) as any;
}
```

Currently it uses the `forwardRef` provided globally by React, but we want to change it to use a local function instead.

We want to use a local function because overriding globals isn't a great idea in a library setting, as it could cause issues for your users downstream.

## Challenge
There are a couple different ways to change `forwardRef` to use a local function.

One way will look similar in structure to the `fixedForwardRef` function. Another way will do it all on the type level.

Hint: Follow the trick you saw in the previous explainer video about using `forwardRef` with generics. You can even just copy the code over!

## Transcript
00:00 Using the previous exercise as a guide, I want you to actually change forward ref instead of using the global definition, let's actually use this definition here. Let's actually make it a local function. And what I want you to do, you can approach this kind of creatively. There's one solution that uses this format,

00:19 but there's another solution that does it all on the type level. I kind of want you just to take this function and type it according to the trick that you saw in the previous exercise in the forward ref with generics explanation. Now you can just go and look at the code and copy that over. That's definitely the way to do it. I don't want you to necessarily have to find the solution yourself,

00:39 but hopefully by doing this, you will get a stronger sense for like how it works. But also this is probably the solution you should use if you're doing library stuff as well, because you probably don't want to be overriding the global in a library setting because then your downstream users might end up with that in their projects. So this I think is actually the solution

00:58 that I would use from those situations. But anyway, I've given you enough. Good luck.

# Solution: Override forwardRef's Behavior Locally

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/08-advanced-patterns/66-forward-ref-as-local-function.solution.1.tsx

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/08-advanced-patterns/66-forward-ref-as-local-function.solution.1.tsx)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=150a7e6d-dfe5-492f-af13-df0a497a9309&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0502-fixing-forwardref-locally-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=150a7e6d-dfe5-492f-af13-df0a497a9309&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0502-fixing-forwardref-locally-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
For the first solution, let's start by looking at the actual `forwardRef` type from the previous explainer code:

```typescript
declare module "react" {
	function forwardRef<T, P = {}>(
		render: (props: P, ref: React.Ref<T>) => React.ReactNode
	): (props: P & React.RefAttributes<T>) => React.ReactNode;
}
```

We can see that `forwardRef` takes in a `T` for the type and `P` for the props that we want to represent in the ref.

Now, let's copy the render function into the `fixedForwardRef` function:

```typescript
function fixedForwardRef<T, P = {}>(
	render: (props: P, ref: React.Ref<T>) => React.ReactNode
): (props: P & React.RefAttributes<T>) => React.ReactNode {
	return forwardRef(render) as any;
}
```

We have `props`, which represents `P`, and the `ref`, which is a `React.Ref` that captures the thing we're referencing. The render function takes in `P` and the `React.Ref` attributes and returns a `React.ReactNode`.

Now everything starts working beautifully and we've got a local declaration for our `forwardRef`, except we've added an extra function on top of it.

The cooler solution is doing a manual override.

## Overriding `forwardRef` Manually
Instead of having a `fixedForwardRef` function, this version uses a type:

```typescript
type FixedForwardRef = <T, P = {}>(
	render: (props: P, ref: React.Ref<T>) => React.ReactNode
) => (props: P & React.RefAttributes<T>) => React.ReactNode;
```

Then the key line is this:

```typescript
const fixedForwardRef = forwardRef as FixedForwardRef;
```

Now the `fixedForwardRef` does everything that our global scope function did, but it's local and contained within the code block.

This approach is recommended if you want to prevent logic from bleeding out into any code that consumes it.

## Transcript
00:00 Okay, this is a pretty simple exercise in copy-paste. Let's go and grab the actual type from here, and let's just copy this over. We know that this is going to take in a T and a P, which is basically representing the props here. And T is going to represent the actual type of the thing that's being passed in,

00:19 or the type that we want to represent in the ref. So now we can take that render function there and basically copy and paste this over. We have a props here, which is representing P, and the ref, which is a react.ref, capturing the thing we're reffing. Then we want to return a function,

00:38 which basically takes in P and the react.ref attributes and returns a react.react node. So let's copy that over, grab that there, and let's bung that in there. Now things start working. Beautiful, beautiful, beautiful. And we've got essentially just a local declaration for our forward ref.

00:55 But there's actually a cooler solution than this, because this is actually adding just an extra function on top here, which we don't necessarily need. What we can do instead is we can just actually override it manually. So we can say, let's say, just don't save that, that's fine. Now what we've got, we've got a fixed forward ref here,

01:15 and this is a type that's representing exactly the same thing as we saw in our previous setup here. So we've got a render function here. Let me just sort of pull that down below my face a little bit, there we go, which is basically just representing the type of our fixed forward ref here.

01:32 And what we're doing is we're now saying forward ref as fixed forward ref, which behaves in exactly the same way. Whoops, I forgot to import these use refs there, dammit. Now this fixed forward ref just does all of the thing that we had captured in our big, beautiful global scope function there, but it's just local.

01:51 And again, I think this is the way to go if you don't want this to bleed out into anything that consumes this code.

# 6. Typing Higher Order Components

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/08-advanced-patterns/67-hoc.problem.tsx

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/08-advanced-patterns/67-hoc.problem.tsx)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=5bec2aca-5bd9-403f-a73d-6b39c5315aeb&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0601-typing-higher-order-components-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=5bec2aca-5bd9-403f-a73d-6b39c5315aeb&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0601-typing-higher-order-components-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

Higher Order Components (HOCs) allow you to wrap a component and add additional functionality to it.

Here we have an `UnwrappedComponent` that takes in a `router` and an `id` string:

```typescript
const UnwrappedComponent = (props: { router: Router; id: string }) => {
  return null;
};
```

We then wrap it with a `withRouter` function which returns a new component:

```typescript
export const withRouter = (Component: any) => {
  const NewComponent = (props: any) => {
    const router = useRouter();
    return <Component {...props} router={router} />;
  };

  NewComponent.displayName = `withRouter(${Component.displayName})`;

  return NewComponent;
};

const WrappedComponent = withRouter(UnwrappedComponent);
```

Note that we could do this all at once, but we'll create the components separately for testing.

As seen in the tests, there are some issues with typing for both the wrapped and unwrapped components.

## Challenge
Your challenge is to properly type the `withRouter` function and the components so the tests pass.

The `withRouter` function should be made generic, and its props properly typed. For example, we'll no longer need the `router` prop.

Note that the `displayName` attribute is important, so make sure it isn't duplicated and is identifiable as the thing that's been wrapped.

Hint: Check out [TypeScript's Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html) for some helpers that might be useful.

## Transcript
00:00 In this exercise, we're going to look at HOCs, or higher order components. Higher order components let you take a component, like this unwrapped component, that takes in, let's say, a proper router, router, and ID string, and you wrap it with a function.

00:15 And then you return a new component based on this function here. So we could sort of inline this if we want to. We could say, like, with router, like this, but for this example, we're not doing that. We're just going to sort of work with it as it is,

00:32 so that we can test them separately, because the unwrapped component here, it should require a router, right? Property router is missing. And the wrapped component shouldn't need a router being passed in, but also it should do validation on its props, which it's currently not doing. It seems like wrapped component is just a function that takes props any JSX element.

00:51 So your job here is to work out how to type this properly. You're going to need to definitely need to make this a generic function of some sort. We're going to need to capture the props, I think. And we need to also make sure that we type these props correctly in the new component, because we're not going to need that router prop anymore.

01:09 The other thing, final thing to mention here is this display name attribute, which is really important for HOCs, because if you're using the React DevTools and you're looking at kind of like the tree of all the React components, you want to make sure that the display name isn't duplicated and is identifiable as the thing that's been wrapped.

01:26 So this is a kind of common pattern when we're sort of using HOCs. So you might need to pay attention to that in your solution as well. So I think with that, we've got everything we need. Good luck.

# Solution: Implementing a Generic Higher Order Component

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/08-advanced-patterns/67-hoc.solution.tsx

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/08-advanced-patterns/67-hoc.solution.tsx)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=ddca0c39-9731-4306-9412-b24207848155&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0602-typing-higher-order-components-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=ddca0c39-9731-4306-9412-b24207848155&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0602-typing-higher-order-components-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
The first thing we need to do is update `withRouter` to be generic.

## Making `withRouter` Generic
We'll start by capturing the props passed to `withRouter`` as` TProps\`:

```typescript
export const withRouter = <TProps,>(Component: any) => {
  ...
};
```

Next, we need to define the `Component` type. We can say that it's a function that accepts the `TProps` and returns a `React.ReactNode`:

```typescript
export const withRouter = <TProps,>(Component: (props: TProps) => React.ReactNode) => {
  const NewComponent = (props: any) => {
    ...
  };
};
```

Now when we hover over the call to `withRouter` we can see that the props are being properly captured:

```typescript
const WrappedComponent = withRouter(UnwrappedComponent);

// hovering over withRouter
const withRouter: <{
  router: Router;
  id: string;
  name: string;
}>(Component: (props: {
  router: Router;
  id: string;
  name: string;
}) => React.ReactNode) => {
  (props: any): JSX.Element;
  displayName: string;
}
```

However, when hovering over `WrappedComponent` we can see a `props.any`:

```typescript
// hovering over WrappedComponent
const WrappedComponent: {
  (props: any) => JSX.Element;
  displayName: string;
}
```

This is because the `withRouter` function still has `props: any` in the return type.

## Updating `props` in `withRouter`
Inside of the `NewComponent` being returned from `withRouter`, we need to update `props` to be `TProps`:

```typescript
export const withRouter = <TProps,>(
  Component: (props: TProps) => React.ReactNode,
) => {
  const NewComponent = (props: TProps) => {
    const router = useRouter();
    return <Component {...props} router={router} />;
  };

  ...
}
```

Now checking our tests, we shouldn't need to provide a `router` prop for the `WrappedComponent`:

```typescript
{/* Doesn't need a router passed in! */}
<WrappedComponent id="123" />
```

Because the `NewComponent` already returns a `router` prop, we need to omit `router` from the `TProps` that are passed in:

```typescript
// inside `withRouter`
const NewComponent = (props: Omit<TProps, "router">) => {
  const router = useRouter();
  return <Component {...props} router={router} />;
};
```

However, we now get a scary error on `Component`:

```typescript
Type 'Omit<TProps, "router"> & { router: any; }' is not assignable to type 'IntrinsicAttributes & TProps'.

Type 'Omit<TProps, "router"> & { router: any; }' is not assignable to type 'TProps'.

'TProps' could be instantiated with an arbitrary type which could be unrelated to 'Omit<TProps, "router"> & { router: any; }'
```

Because everything outside of the component is working, it may be tempting to use an `any` in this situation.

The solution I like here is to specify `props as TProps` to tell TypeScript that we know what we're doing:

```typescript
const NewComponent = (props: Omit<TProps, "router">) => {
  const router = useRouter();
  return <Component {...(props as TProps)} router={router} />;
};
```

Now there's one more error to fix with `displayName`.

## Fixing `displayName`
When we hover over `Component.displayName`, we get an error:

```typescript
NewComponent.displayName = `withRouter(${Component.displayName})`;

// hovering shows
Property 'displayName' does not exist on type '(props: TProps) => any'.
```

Looking at the error message, we can see the signature `(props: TProps) => any`.

This is the same signature as the `React.FC` type we've looked at several times!

This means we can update the `Component` type of `withRouter` to be `React.FC<TProps>`:

```typescript
export const withRouter = <TProps,>(Component: React.FC<TProps>) => {
  ...
```

However, `displayName` isn't only available for `React.FC` but for `React.ComponentType` as well, so we can use it:

```typescript
export const withRouter = <TProps,>(Component: React.ComponentType<TProps>) => {
  ...
```

We've successfully built a generic Higher Order Component that will omit a passed in `router` prop in favor of one from the `useRouter` hook:

```typescript
export const withRouter = <TProps,>(Component: React.ComponentType<TProps>) => {
  const NewComponent = (props: Omit<TProps, "router">) => {
    const router = useRouter();
    return <Component {...(props as TProps)} router={router} />;
  };

  NewComponent.displayName = `withRouter(${Component.displayName})`;

  return NewComponent;
};
```

## Transcript
00:00 OK, let's give this a go. So, with router, what's the thing that we need to capture here on the with router? We really need to capture the props, really. Because it's the props are the thing that are going to be dynamic. If we were to add another prop on here, like name, string or whatever, then we need to make sure that this is added to the wrapped component props type.

00:19 So let's add this on the outer function here. Of course, we're in a TSX file, so it's not going to work very well here. And let's just say tprops, I'm just going to add the comma for now. Now, components here, what type is the component going to be? Let's just hash this out for now.

00:36 Let's just say it's going to be a function which
returns react.reactNode. And these props are going to be tprops here. So
now then, this is all looking good. And let's just hover over this. So
we've got with router. You can see that the props are properly being
captured here, which is really, really nice. So now [router.id](http://router.id) and name.

00:54 And let me just remove name just so we're back with
the original example. So we've now got [router.id](http://router.id) being understood that
these are the props that are being passed in. But then, if we hover over
this, we can see props.any is still there. And that's because of this
any just up there. So let's take a look at this.

01:11 And what we know is that these are going to be related somehow to the tprops. And we can see then that this is working okay now. And in fact, our wrapped component is understanding a little bit about the thing that's being passed in.

01:27 If we add name to this and we go back down here, then name is going to be added onto here too. So name and router, this is all working pretty well. Except though that we actually want to omit a certain prop here. We actually want to omit the router prop.

01:42 So we can use that by using the omit type helper. Because omit, if we just say omit tprops router, now it understands that, okay, these props, they should never contain router on them. And now actually outside our components, it's actually working pretty nicely.

02:00 We still got some errors inside though. So what's this? Omit tprops router could be instantiated with an arbitrary type that could be related to omit t... Extremely terrifying.

02:12 And I'm tempted in these sort of situations, because everything is like working outside of the component, is to use an any in a certain situation. The thing that we want to get across here is that we are actually passing all of the props in. I wonder if I rearrange this in a certain way.

02:28 So if I say const new props equals props and then router. If I get and I actually type this as tprops, will this work? No. So this isn't assignable to it for exactly the same reason. So it could be instantiated with an arbitrary type.

02:46 And I'm most tempted actually, because I know that I'm passing in everything there, is I can basically say as tprops here. Now, though this has a bit more of an overhead, we've actually ended up changing the runtime code there, which I'm not very happy with. But I just want to check if this works. Of course, this doesn't work either. Type tprops is not assignable to intrinsic...

03:05 Oh, dear, oh, dear. So let me go back. I think the best solution here is basically to essentially do this, which is what I've got in the solution is say props as tprops and then router, router. This was the solution that I came up with. We would probably need if this was production code, we'd need a comment here.

03:22 But because we're inside extremely generic code, I really don't want to hit that error more than I need to. And actually, it's all seems to be working outside of the generic signature, which is really good. Now, let's take a look at display name here. So component.displayname does not exist on this function type.

03:39 Now, this function type, what does this look similar to? What do we know it like has exactly the signature that we've seen before? It's react.fc. And react.fc, it has the attribute of display name on it.

03:52 So if we look at tprops again, and I take a look at this function component, it's got our display name right there. And I think too, it's not only FCs that we want to be able to pass into here. It's also component type, right?

04:07 So component type, if we take a look, this is a function component or a component class, which also has a display name on it. This means that we can pass in this to our component too. So we're doing pretty well here. We've got our unwrapped components sort of working nicely.

04:25 And that's, you know, still needs a router here. We haven't changed anything there. And our wrapped component is now corresponding to the actual props that we want. And ID is like requiring the correct property too. So this, I think, is the best way to, this is, I think, the simplest solution to building a HOC with React and TypeScript.

# 7. Using Higher Order Components with Generic Components

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/08-advanced-patterns/67.5-hoc-for-generic-components.problem.tsx

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/08-advanced-patterns/67.5-hoc-for-generic-components.problem.tsx)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=4a3c3d9c-713e-4139-b19a-dd68c342405e&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0701-using-higher-order-components-with-generic-components-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=4a3c3d9c-713e-4139-b19a-dd68c342405e&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0701-using-higher-order-components-with-generic-components-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
We're starting here with the finished `withRouter` Higher Order Component from the previous exercise:

```typescript
export const withRouter = <TProps>(Component: React.ComponentType<TProps>) => {
	const NewComponent = (props: Omit<TProps, "router">) => {
		const router = useRouter();
		return <Component {...(props as TProps)} router={router} />;
	};

	NewComponent.displayName = `withRouter(${Component.displayName})`;

	return NewComponent;
};
```

This time we're testing `withRouter` with the generic `Table` component we've seen previously:

```typescript
type TableProps<T> = {
	data: T[];
	renderRow: (item: T) => React.ReactNode;
	router: Router;
};

export const Table = <T>(props: TableProps<T>) => {
	return <table />;
};

const WrappedTable = withRouter(Table);
```

But as seen in the tests, we're getting a variety of errors because the `withRouter` function is not ready for generic components.

## Challenge
Your challenge is to update `withRouter` to properly support generic components and resolve the type errors in the tests.

You'll need to change the `React.ComponentType` annotation, as well as add some new type annotations. The `displayName` and default props will also need some attention to retain their "generosity".

## Transcript
00:00 We're starting here with the finishing point from the previous exercise, which is we have our WithRooter function, except I'm testing it in a different way now, and it's falling apart. The way it's falling apart is with generic components. Our WithRooter function is not ready for generic components. We have our Table function here,

00:19 and this Table function is basically being wrapped with WithRooter here, and we've seen this Table component a bunch of times in this section actually. This wrapped Table then is not actually a generic component anymore. This one is, this Table was, but it's actually erroring because Rooter is required.

00:38 But this one, we're passing in 1, 2, 3, and the row is inferred as unknown instead of number. So this is happening for the same reason as we saw in ForwardRef. So your job is to try to work out how we can change the type of this in order to get it to work.

00:57 We will need to add some more annotations here. We will definitely need to change this React.ComponentType annotation. I don't think we need to add any more generics, but yeah, and we're going to have some stuff to figure out with this DisplayName too, because you remember the thing that was making it break before

01:14 was the fact that DisplayName and default props and things were included on the function, and it meant that it stripped away the generosity of it. I've kind of made that word up, but I quite like it. It sounds like generosity somehow. But yeah, that's your job, is to try to figure out the type signature of this to make it work with generic components. Good luck.

# Solution: Add Generic Component Support to a Higher Order Component

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/08-advanced-patterns/67.5-hoc-for-generic-components.solution.tsx

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/08-advanced-patterns/67.5-hoc-for-generic-components.solution.tsx)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=e8a0eb18-443f-4a69-863b-f4f8b6a40fa1&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0702-using-higher-order-components-with-generic-components-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=e8a0eb18-443f-4a69-863b-f4f8b6a40fa1&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0702-using-higher-order-components-with-generic-components-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
Before we start solving this problem, let's recap what we learned from working with `forwardRef`.

We know that the type definition for `ComponentType` has a couple of extra things on it:

```typescript
interface FunctionComponent<P = {}> {
  (props: P, context?: any): ReactNode;
  propTypes?: WeakValidationMap<P> | undefined;
  ...
```

The `props:P` is going to lose the "generosity" because of the `propTypes`.

So the first thing we'll do is update `withRouter` to take in `Component`, which is a function that takes in `TProps` and returns a `React.ReactNode`:

```typescript
export const withRouter = <TProps,>(Component: (props: TProps) => React.ReactNode) => {
  ...
```

This change does bring up some strange errors where `withRouter` doesn't understand what type is being inferred:

```typescript
const WrappedTable = withRouter(Table);

// hovering over withRouter
const withRouter: (Component: (props: unknown) => React.ReactNode) => {
  (props: Omit<unknown, "router">): JSX.Element;
  displayName: string;
}
```

Notice that the type we're returning still has a `displayName` on it, despite not taking in a component with a `displayName`.

Because we haven't annotated the return type of the function, TypeScript is attempting to infer the return type of the function itself.

If we comment out the line where we set `NewComponent.displayName`, we now just have a normal function and TypeScript will infer `TProps` as expected:

```typescript
// Commented out NewComponent.displayName = `withRouter(${Component.displayName})`;

// hovering over withRouter
const withRouter: <TProps>(Component: (props: TProps) =>
  React.ReactNode) => (props: Omit<TProps, "router">): JSX.Element
```

The tests will pass now, except we actually want the `displayName` property.

We can fix this by annotating the return type of `withRouter`.

## Annotating the Return Type of `withRouter`
We'll start by modifying the `withRouter` function to return the same signature as what it takes in, but with the `router` prop omitted:

```typescript
export const withRouter = <TProps,>(
  Component: (props: TProps) => React.ReactNode,
): ((props: Omit<TProps, "router">) => React.ReactNode) => {
  ...
```

This will make the tests pass, but similar to what we've seen previously, we've got a problem with the `displayName`:

```typescript
Property 'displayName' does not exist on type '(props: TProps) => React.ReactNode'.
```

We need to make sure that `displayName` is on the thing that gets passed in, but we don't always need to have it.

The solution is to use `Component as` when we're setting the `displayName`:

```typescript
NewComponent.displayName = `withRouter(${
  (
    Component as {
      displayName?: string;
    }
  ).displayName
})`;
```

This makes sure that the `displayName` is casted to a type that makes sense, while the specific return type `(props: Omit<TProps, "router">) => React.ReactNode` ensures that the `displayName` mutation doesn't leak out of the implementation and ruin the type inference.

## Transcript
00:00 Let's get started by using what we learned from forward ref, which is that we know that this component type has a couple of extra things on it, which is going to make it a little dodgy. This props p context t, it's going to lose the generosity because of this type here.

00:19 If we take this back to a bare metal type, then we can say react.reactNode here instead, and grab the props and stick it on tprops here. Now, I was solving this myself actually, in a previous take, actually, take me behind the curtain. What I noticed here was actually like you get

00:38 this really strange error here where with router doesn't seem to be able to understand the type that's being inferred here. That's because you notice that the type that we're returning has still got a display name on it. It's got props,

00:55 omit unknown router JSX element, and it's got this display name here. Now, why on earth would this be happening here? Because we're not taking in a component with display name, but display name seems to be being added here. Well, that's because actually, on the return type of our function here,

01:13 it's not actually like it's not annotated, so it's attempting to infer a return type. One amazing thing about TypeScript, and a slightly strange property of it, is that with functions, you can actually freely annotate or add properties to them in certain instances. Here, we're actually modifying

01:32 new component so that it's got a display name attribute. If we comment that out, the new component is just a bare function itself, and actually, this works now. This is extremely strange. This is so when we're working just with a normal function here,

01:50 you can see that there's no more objects syntax there. If I uncomment this and go back here, you can see that we go back to this funky little object syntax and display name is added. But if I comment it out, then it's no longer there, and we just return a bare function, and so TypeScript can perform

02:08 a higher order function operations on it. Actually, this is enough to make it pass, except we want this line of code in here. We need this line of code to happen at runtime. The way to get around this is to actually add in a type annotation with

02:27 router to basically make it work on the type level, because we don't want it to infer here, because actually it's inferring an unhelpful thing from our line of code, and we've still got an error here. Let's actually add a return type here. The return type we're going to add is we're actually going to

02:44 add it as just a bare function like this to make it match up. We have props returns React.ReactNode. We need to make sure that this annotation here has exactly the same signature as this one here. Because if we just add tprops,

03:02 then it's actually not going to be assignable here, because if we look down the bottom here, then actually this still expects a router to be passed in, whereas we actually want to omit the router from there. Let's say omit tprops router, and that will work nicely. Now, everything's passing here, even though our components inside

03:21 is still moaning a little bit. We need to finally figure out this little error here. Property displayName does not exist on the type that we're passing in here. This is by design, because if we add this here, if we say it's actually a function that has

03:40 this call signature and has displayName string here, then of course, all of our operations down the bottom are going to stop working. We lose the generosity of the function. We're stuck here. We need somehow to make sure the displayName is on the thing that gets passed in,

03:58 but we don't always need it. Well, I think the best thing to do here is just to add an as. This component is as displayName string, and this makes everything happy. If I just return this to the type that it was,

04:15 then we should have a working solution. This is my solution here, is to basically say, with router, still a generic function, add a specific return type so that this curious displayName mutation doesn't leak out into the implementation and ruin the inference. Then also inside here,

04:35 make sure that displayName is just casted to a type that makes sense, really. This is a proper way to get it all working, and it means that you can use with router and HOCs with generic components.

# 8. The `as` Prop in React

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/08-advanced-patterns/69-as-prop.problem.tsx

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/08-advanced-patterns/69-as-prop.problem.tsx)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=cb38965f-c35a-4ea4-b8dc-f88ea3c53dee&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0801-the-as-prop-in-react-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=cb38965f-c35a-4ea4-b8dc-f88ea3c53dee&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0801-the-as-prop-in-react-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
For the next few exercises, we are going to look at different ways of handling the `as` prop in React.

Here we have a `Wrapper` component that has an `as` prop on it:

```typescript
export const Wrapper = (props: any) => {
  const Comp = props.as;
  return <Comp {...(props as any)}></Comp>;
};
```

When using the `Wrapper` component, the `as` prop will always be required and should be able to autocomplete every possible element in React:

```typescript
<Wrapper
  as="button"  // autocomplete here should work
>
```

Once you choose an element, all of the other props that you pass to the component should be the same ones as the element you chose.

For example, the `button` element does not have a `doesNotExist` prop, but it does have an `onClick` prop that will be inferred as `React.MouseEvent<HTMLButtonElement>`.

## Challenge
Your challenge is to type the `Wrapper` component so that the `as` prop is properly typed.

There are two different ways to solve this problem.

One solution uses [an Immediately Indexed Mapped Type (IIMT)](https://www.totaltypescript.com/immediately-indexed-mapped-type) and doesn't make `Wrapper` into a generic function or use `any`.

The better solution uses a generic.

Both solutions will use:
*   `JSX.IntrinsicElements` for getting types
*   `keyof` for extracting keys
*   `as` assertions
*   Indexed Access Types

## Transcript
00:00 In this exercise and the next few exercises, we're going to be looking at the ASPROP. The ASPROP is probably the most complex TypeScript situation you can find yourself in in React. And so I want to prepare you, give you lots of different ways that you can tackle it, and also lots of different sort of difficulty levels as well.

00:17 Through the next few exercises, we're going to go from the kind of setting up of the problem all the way down to the most complicated and best setup for an ASPROP. So if you want to just like learn the best solution, then you can just click to the end. But there's plenty of good stuff sprinkled through here too. So what we have here is a wrapper component.

00:36 And this wrapper component has an ASPROP on it. And that ASPROP should be, first of all, auto-completing to everything that is a possible element in React. So div, span, a, all that stuff. And what it should do is when you specify that component, when you specify that AS thing, that's a required prop.

00:56 You've always got to pass it. What should happen is that the other props that you pass to that component should be the same props as the ones that you are supposed to pass to that component. So it does not exist, shouldn't exist, but an on-click pass to an as button should be inferred as a React mouse event HTML button element.

01:15 This is a tricky problem, but you do have all the tools that you need to solve it. We have jsx.intrinsicElements, which is a big global list of where you can basically get types for all of the elements that are supposed to be there. So div, span, a, all of those are on jsx.intrinsicElements.

01:34 We know about keyof, which is a way that you can extract the keys off that. We have as, which we will already be using down here. It's very confusing to refer to as here, but I mean assertions here. I'm pretty sure you're going to need this as any, but we'll see if you need it.

01:51 And then you have index access types too, which are a way of grabbing the type of that. I have found two solutions here. The first solution is based off an int, actually, and it doesn't use any, or doesn't turn this into a generic function.

02:06 I think this is the worst solution, but the second one uses a generic. So you can feel free to try to find both, but I will show you both afterwards. But I would, if you're just going to go for one of them, go for the generic type, because this is the kind of, I think the best one. And this turns wrapper into a generic function and does some manipulation there.

02:26 So good luck.

# Solution: Approaching the `as` Prop with IIMTs and Generics

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/08-advanced-patterns/69-as-prop.solution.1.tsx

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/08-advanced-patterns/69-as-prop.solution.1.tsx)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=b446cc49-7acf-4205-85e3-1d8271c53542&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0802-the-as-prop-in-react-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=b446cc49-7acf-4205-85e3-1d8271c53542&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0802-the-as-prop-in-react-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
Our goal is to be able to properly type the props we get from using `as` in this `Wrapper` component:

```typescript
export const Wrapper = (props: any) => {
  const Comp = props.as;
  return <Comp {...(props as any)}></Comp>;
};
```

As mentioned, there are two different ways to solve this problem.

## Solution 1: Using an Immediately Indexed Mapped Type
The first idea is to create a massive union of everything from `JSX.IntrinsicElements` in order to do what we want in terms of props.

But for now, let's just manually specify what the shape would look like using `input` and `button`:

```typescript
type WrapperShape =
| ({
  as: 'input'
} & ComponentProps<'input'>)
| ({
  as: 'button'
} & ComponentProps<'button'>);
```

Then we'll update `Wrapper` to use `WrapperShape` for its props:

```typescript
export const Wrapper = (props: WrapperShape) => {
  ...
```

Because we specified `button` in the `WrapperShape` union, the tests involving `button` shapes now pass.

Because we specified `button` in the `WrapperShape` union, the tests involving `button` shapes now pass.

Comment out the `WrapperShape` and create a new `WrapperProps`.

Inside `WrapperProps` we'll create a mapped type of every element in `JSX.IntrinsicElements` by using `keyof`, then set `as` to the `Element`:

```typescript
type WrapperProps = {
  [Element in keyof JSX.IntrinsicElements]: {
    as: Element;
  };
};
```

When hovering over `WrapperProps`, we can see the shape for all of the available elements:

```typescript
// hovering over WrapperProps
a: {
  as: "a";  
},
abbr: {
  as: "abbr";  
},
...
```

Now we need to be able to index into `WrapperProps`, so we'll add `[keyof JSX.IntrinsicElements]`:

```typescript
type WrapperProps = {
  [Element in keyof JSX.IntrinsicElements]: {
    as: Element;
  };
}[keyof JSX.IntrinsicElements];
```

Updating the `Wrapper` to take `WrapperProps`, we now are able to get autocomplete on the `as` prop.

Now we need to update the `WrapperProps` to get the `ComponentProps` like we did in the `WrapperShape` example:

```typescript
type WrapperProps = {
  [Element in keyof JSX.IntrinsicElements]: {
    as: Element;
  } & ComponentProps<Element>;
}[keyof JSX.IntrinsicElements];
```

This solution works, but it is extremely slow and inefficient because it is instantiating every single prop for every single element.

It would be much better if we could only instantiate the props for the element we are using.

## Solution 2: Make the Wrapper Generic
Instead of instantiating all possible props, we can make `Wrapper` generic.

Let's start by adding a type argument `TAs` that extends every key in `JSX.IntrinsicElements`:

```typescript
export const Wrapper = <TAs extends keyof JSX.IntrinsicElements>(props: any) => {
  ...
```

Then we can update `props` to include the `as` prop of `TAs` and `React.ComponentProps` of `TAs`:

```typescript
function Wrapper<TAs extends JSX.IntrinsicElements>(props: {
  as: TAs
} & React.ComponentProps<TAs>,
) => {
  const Comp = props.as;
  return <Comp {...(props as any)}></Comp>;
};
```

With this update we have inference working on the outside of the function, but we have an error on the `Comp` inside.

When hovering over `Comp`, the error message reads:

```typescript
JSX element type 'Comp' does not have any construct or call signatures.
```

This error essentially is TypeScript saying that the component is too complex for it to read.

Hovering over `Comp` shows us:

```typescript
const Comp = props.as

// hovering over Comp
const Comp: TAs | (TAs & (string | undefined))
```

In order to fix this, we'll add an `as string` assertion to `Comp`, since it will resolve to a string eventually.

```typescript
function Wrapper<TAs extends JSX.IntrinsicElements>(props: {
  as: TAs
} & React.ComponentProps<TAs>,
) => {
  const Comp = props.as as string;
  return <Comp {...(props as any)}></Comp>;
};
```

This solution is the most naive version of an `as` we can get, but it is starting to work!

## Transcript
00:00 Okay, let's give this a go. The first way I'm going to tackle this is by first of all, looking at jsx.intrinsicElements and seeing if I can basically create a massive union out of it to do what I want in terms of the props. Could you imagine this? I kind of want a prop shape that looks like this.

00:16 So like wrapper shape, let's say, and I want it to kind of be a discriminated union where we have as, let's say, input and then and component props input, right? And I want one of these

00:32 for basically every single one of jsx.intrinsicElements. So if I have another one like this and I just pull that in there, let's say, and I have a button instead, then I kind of want to just create a massive shape that will handle all of the cases for me. And so if I take props here

00:50 and I've just put it in for wrapper shape there, then it's going to do a little bit for me here. So I've got my as, I want div, don't I? So let's just try that. Yeah, and now it actually works, right? So this is actually like one shape, one way that you can kind of create like a budget version of an as prop actually, but we want to kind of transform it

01:09 from the source of truth, which is jsx.intrinsicElements. So let me just comment that out for now. And let me just say wrapper props here as well. Now this wrapper props, let's just sort of walk through this. So wrapper props, what we're going to be doing here is probably creating a discriminated union

01:30 based on jsx.intrinsicElements. So if I just say, let's just say key in jsx.intrinsicElements. And if we just as a little reminder, this is a type here that basically has all of the stuff here along with all of its props.

01:47 So these are the props that A takes in React, which is useful. So let me just pull that in. So I now have, this is the element in jsx.intrinsicElements. We're inside a mapped type here basically. And the weapon that I would like to use here

02:05 is an immediately indexed map type. What I can do here is I can say as elements like this. And what will happen is when I transform this, so in fact, I'm going to go element in key of jsx.intrinsicElements. Now, as you can see, we have A as A, abbreviation as abbreviation.

02:24 You can see we're starting to get somewhere 166 more. I can actually index into this with key of jsx.intrinsicElements. Stopped being able to speak there for a second. And now what we end up with is kind of pretty similar to what we have before this shape there,

02:43 where we have key of jsx.intrinsicElements. And we've got as A, as abbreviation, as address. And that is going right into the wrapper props and it's going as all of this. So we're now getting autocomplete here. We're just not getting the other elements in there. So let's just add those in. So we've got the elements, which is div, button, et cetera.

03:02 Now we can just say and component props elements. So here we go. And I can already feel my ID slowing down a bit. So this is now working. This wrapper props here, if we take a look at it, we've got as symbol and SVG props, this as object and this,

03:21 and it's instantiating about 166 different types all at once. It's a little bit much. Okay. So our wrapper now it's strongly typed. So I can like put in a, I don't know, article here, for instance, is this going to work? Or maybe audio is better.

03:41 And now I can add an onClick. I can feel my ID just being real, real slow. And now E is going to be a type of React.mouseEvent HTML audio element. It's working, but there's a better way. Okay. As you can probably tell from my reluctance to do this, I'm tempted even to comment this out

04:00 just so the rest of this actually runs. Like the reason this is so slow is because it's instantiating everything it could possibly need eagerly. So inside wrapper props is a massive union type. And it may be that we just don't need to instantiate all of those elements.

04:18 All we need to do is when we call wrapper, you know, when we pass it some props, we need to pass it an as prop. And that as prop is going to describe the one that we want. And then we just instantiate those props. We don't need to instantiate all 166 more. So let's try another solution here

04:35 by adding in a type argument to this wrapper. We'll say as, and we'll say this extends key of jsx.intrinsic elements. Now we can add that onto the props and we can say as is T as here. So this is starting to go pretty well. We've got now button working nicely

04:53 and we've got auto-complete here. And then what we do is we just say, okay, in addition to the T as, we can say react.component props and then pass in T as here. And this now works. At least it works on the outside of the function. We'll get to the inside in a second.

05:13 So now this button here, we basically like load up this and we say, okay, if this is an A, then this is going to be react.mouseEvent HTML A elements. Really, really nice. So we've got it working. That's really, really cool. But inside of the component, it's a little bit sketchier.

05:32 This one, it's got a kind of crazy error here where it's jsx element type comp does not have any construct or call signatures. Now this error is a little bit hard to read, but it's essentially saying, okay, this component here is a little bit too complex for me to read now,

05:49 now that it's got all of this K of jsx.intrinsic elements. So we're actually just going to slap another as on it and say as string here. Now what this does is it basically says, okay, this resolves down into a string eventually. And you can see that it's almost there, right?

06:05 It's like T as all this and string are undefined. It's very, very close to string, but it is actually like we'll get there eventually. So yeah, this looks pretty ugly in terms of like the internal function definition here. We're annotating these props as any, just checking if we can actually do that. I think we might be able to get away with not doing,

06:23 oh no, we can't, no way. So this wrapper then, we've got a generic type, which just sort of a type argument, which sits on the front and basically says, okay, we capture the type of as. Once we've captured that, and only then do we then go deeper and compute all of the props to do with that,

06:42 React.ComponentProps. So this is a much more performance way to handle it. Instead of instantiating everything upfront using the int that we had before, we now just say, okay, we've got the component props that we need for the as that we're specifying. And this, I would say, is the most naive version of an as that we can get.

07:02 But as you can see, it's starting to work, which is good.

# 9. The `as` Prop with Custom Components

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/08-advanced-patterns/70-as-prop-with-custom-components.problem.tsx

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/08-advanced-patterns/70-as-prop-with-custom-components.problem.tsx)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=1e2139f2-9820-43b7-8081-bb2f49e8cbaf&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0901-the-as-prop-with-custom-components-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=1e2139f2-9820-43b7-8081-bb2f49e8cbaf&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0901-the-as-prop-with-custom-components-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
Here's where we left off with the `Wrapper` component from the previous exercise:

```typescript
export const Wrapper = <TAs extends keyof JSX.IntrinsicElements>(
  props: {
    as: TAs;
  } & React.ComponentProps<TAs>,
) => {
  const Comp = props.as as string;

  return <Comp {...(props as any)}></Comp>;
};
```

But this time, we have an extra test where we pass in a custom component into `as` and expect it to inherit from the props that we pass in:

```typescript
const Custom = (props: { thisIsRequired: boolean }) => {
  return <a />;
};

const Example2 = () => {
  return (
    <>
      <Wrapper as={Custom} thisIsRequired />
      <Wrapper
        as={Custom}
        // @ts-expect-error incorrectProp should not be allowed
        incorrectProp
      />
      ...
```

A common requirement for `as` that you should be able to pass in anything you want, and it should inherit all the props. In the above test, when we pass in `as` custom, we expect `isRequired` to be required.

## Challenge
Your challenge is to update the `Wrapper` component so that the `as` prop is properly typed for our `Custom` component.

There's no need to change any of the existing generic work we've done.

Instead, you'll need to use the `ElementType` we've worked with before as well as one of these other helpers:

[

github.com

https://github.com/DefinitelyTyped/DefinitelyTyped/blob/7dc2072c9c982fdb21ca6e3d160b3be93c2a694b/types/react/v17/index.d.ts#L838

](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/7dc2072c9c982fdb21ca6e3d160b3be93c2a694b/types/react/v17/index.d.ts#L838)

[

github.com

https://github.com/DefinitelyTyped/DefinitelyTyped/blob/7dc2072c9c982fdb21ca6e3d160b3be93c2a694b/types/react/v17/index.d.ts#L834

](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/7dc2072c9c982fdb21ca6e3d160b3be93c2a694b/types/react/v17/index.d.ts#L834)

[

github.com

https://github.com/DefinitelyTyped/DefinitelyTyped/blob/7dc2072c9c982fdb21ca6e3d160b3be93c2a694b/types/react/v17/index.d.ts#L828

](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/7dc2072c9c982fdb21ca6e3d160b3be93c2a694b/types/react/v17/index.d.ts#L828)

Spend some time working through the React types, and see if you can find the right solution and understand why it works.

## Transcript
00:00 Let's try extending our as prop a little bit further. We've got the same setup as the previous exercise, but now we've got an extra test. And that extra test is this one here where we're passing in a custom component into as and expecting it to inherit from the props that we pass in.

00:19 This is a common requirement for as that you should be able to just pass in anything you want and it should just inherit all of these props. So when we pass in as custom, we're expecting this is required to be required. So this is a more complicated solution, but it really just uses the same building blocks

00:38 that we had before. We've already got our type argument from last time. And this solution kind of expands on that with a couple of different other elements here. So we've still got our generic stuff here. No need to change any of that. I want you to investigate element type, which we have introduced before. And I want you to take a look

00:58 at these three different helpers here. And this is where I got my solution for this problem from. It's not the easiest thing in the world to find because you'll start to notice that some of the tools here in React types fall down a little bit, but there's still certainly some that can be useful. Anyway, I think I've given you enough clues. This should be enough for you

01:17 to sort of muddy your way through to a solution and see if before you check out the solution, see if you can work out why it works as well as how it works. Good luck.

# Solution: Type Helpers for React Components

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/08-advanced-patterns/70-as-prop-with-custom-components.solution.tsx

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/08-advanced-patterns/70-as-prop-with-custom-components.solution.tsx)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=2101e0bc-f571-4dae-ba16-3f315b96d10b&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0902-the-as-prop-with-custom-components-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=2101e0bc-f571-4dae-ba16-3f315b96d10b&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0902-the-as-prop-with-custom-components-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
Let's start by taking a closer look at the type helpers mentioned in the exercise setup.

Inside [the type definitions](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/7dc2072c9c982fdb21ca6e3d160b3be93c2a694b/types/react/v17/index.d.ts#L828), there's a message above `ComponentProps`:

```typescript
/**
 * NOTE: prefer ComponentPropsWithRef, if the ref is forwarded,
 * or ComponentPropsWithoutRef when refs are not supported.
 */
```

In the case of our `Wrapper` component, we aren't using refs so we should start by trying `ComponentPropsWithoutRef`:

This helper accepts an `ElementType` which can be anything from `JSX.IntrinsicElements` or a `Component` type:

```typescript
type ComponentPropsWithoutRef<T extends ElementType> =
    PropsWithoutRef<ComponentProps<T>>;
```

This means that we can use `ComponentPropsWithoutRef` to type our `Wrapper` component props, and specify that `TAs` extends `ElementType`:

```typescript
export const Wrapper = <TAs extends ElementType>(
  props: {
    as: TAs;
  } & ComponentPropsWithoutRef<TAs>,
) => {
  const Comp = props.as as string;

  return <Comp {...(props as any)}></Comp>;
};
```

It's interesting to note that using just `ComponentProps`, the `Wrapper` no longer supports the intrinsic elements. This should be taken as a hint that in more complicated cases that specifying with or without refs may be necessary.

Using `ComponentPropsWithoutRef` also allows us to remove the `as string` casting for `Comp` because `TAs` is now representing any `ElementType`:

```typescript
// inside Wrapper
const Comp = props.as;
```

However, we still need to use the `props as any` in the return, because without it we get an extremely terrifying error:

```typescript
Type<{ as: TAs; } & PropsWithoutRef<ComponentProps<TAs>>'> is not 
assignable to type 'IntrinsicAttributes & LibraryManagedAttributes<TAs, any>'.
```

This is an example of when using `any` to proactively disable type checking in certain spots is necessary. The less type checking you do on code you know is good, the faster it will run.

The important thing is that our `Wrapper` component is starting to come together!

## Transcript
00:00 Okay, I asked you to take a look at a few different type helpers here, especially React or Component Props, Component Props with Ref, and Component Props without Ref. These are extremely complicated type helpers. But as you can see, they have a few different interesting things about them.

00:16 Notice that Component Props here, it actually says prefer Component Props with Ref or Component Props without Ref. So there's actually a little note on here saying that you should probably prefer these two when you're being descriptive. If you think about this, what situation are we in? Are we forwarding any refs? No, not currently, we'll get to that later.

00:37 But we're actually not forwarding any refs. So we should use Component Props without Ref probably. Let's just try adding that in first, Component Props without Ref. Okay, so we're no closer though. But what I want to investigate is actually looking at this and looking at its constraint.

00:56 Because if we look at Component Props without Ref, it actually takes an element type here. And an element type can represent, basically, if we look at it here, it's either one of these JSX intrinsic elements and look at it, it's actually like all of them there, or it's a component type. So Component Class, Function, Component.

01:15 We've had a look at this before, we sort of know what it does. And what I'd like to do is just what I found was worked really nicely for me is I can just stick in Element Type inside here. I'll just grab that from React. And now everything suddenly starts working.

01:32 So what we've got here then is we've got T as it's an element type, which is basically either button A or any of these, or you can pass in something custom, which is just glorious. And it just works out of the box. And because we're using Component Props without Ref, it just flows nicely.

01:51 So if we use Component Props, oddly enough, I couldn't get this working with this button or A or anything like this. We still get the same, in fact, the constraint breaks down as well, which is no fun. But everything sort of stops working when we use Component Props. And I think this is maybe a hint that when you have a complicated case like this,

02:11 you should be using Component Props without Ref or Component Props with Ref. So it's starting to come together, which is nice. I think the question is now, can we remove any of these casts inside here? So can I remove the as string? It turns out I can remove the as string, because T as now just represents any element type. Can I remove the props? Should I be so lucky?

02:21 I probably can't. Let's take a look. We've got expecting a type matching. No, it's extremely terrifying. Let's just slap the as any on there because we're now pushing up against TypeScript limits in terms of how fast its type checker can run.

02:46 So we probably want to, like, this is where you want to start using any relatively proactively to actually disable type checking in certain spots. Because actually, the less type checking we can get TypeScript to do on stuff that we know is OK, the faster it's going to run. Interesting area that we're now in.

03:06 This is some pretty scary stuff. But the fact that we've now got Component Props without Ref working for us, ElementType doing the constraint stuff for us, and everything else just playing along, it's starting to come together.

# 10. The `as` Prop with Defaults

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/08-advanced-patterns/71-as-prop-with-default.problem.tsx

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/08-advanced-patterns/71-as-prop-with-default.problem.tsx)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=506a14c9-8287-4a4c-84f9-ff8190bfcbc4&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="1001-the-as-prop-with-defaults-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=506a14c9-8287-4a4c-84f9-ff8190bfcbc4&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="1001-the-as-prop-with-defaults-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
Here we start with the a similar setup to what we had at the end of the last exercise.

This time instead of a `Wrapper` we have a `Link` component with some different behavior.

If you don't pass in an `as` prop, the component will default to an `a`:

```typescript
export const Link = <TAs extends ElementType>(
  props: {
    as: TAs;
  } & React.ComponentPropsWithoutRef<TAs>,
) => {
  const { as: Comp = "a", ...rest } = props;
  return <Comp {...rest}></Comp>;
};
```

Like before, it's expected that you shouldn't be able to pass in things that don't exist.

It's also expected that the `e` event should be inferred as a `React.MouseEvent<HTMLAnchorElement>`.

## Challenge
Your challenge is to update the `Link` component typing so the tests pass.

There are a couple of ways to do this.

One way is relatively simple. If you find it, make sure to check if the `As` prop is still auto-completing for you. There's also a more complex solution we will look at.

Either way you decide to go, you'll want to look at default type arguments in generics and conditional types.

## Transcript
00:00 We're starting with the setup that we had at the end of the last video, except that we changed the name of the component from Wrapper to Link. Why have we done that? Well, we've introduced a bit of a change into the behavior of the component. If you don't pass an Asprop there, it's going to default to A.

00:19 And this is expected on the outside too. So it's expected that you shouldn't be able to pass things that don't exist to Link here. And also, this E should be inferred as a React.mouseEvent.html anchor element. So it's expecting that the props here, if you don't pass an As, are supposed to be an A there.

00:39 Now, there is a relatively simple way to get this working. And if you find that relatively simple way, I want you to check if this is still autocompleting for you. So if the Asprop is still working there. I will show you the simple solution,

00:57 and there is a more complicated solution to get it working even despite that. Quite a complex solution, actually. So for this, you will need to make use of, or it will be useful to know about, definitely default generics, or default type arguments in these generics. Conditional types as well.

01:17 And if you don't find this, don't feel too bad. I kind of just want to walk you through what I found that works here. So anyway, with that, good luck. I think you can do it. See you on the other side.

# Solution: Two Approaches to Defaults for the `as` Prop

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/08-advanced-patterns/71-as-prop-with-default.solution.1.tsx

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/08-advanced-patterns/71-as-prop-with-default.solution.1.tsx)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=245dd720-99bf-40aa-b7ed-ad0f5e2c3dec&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="1002-the-as-prop-with-defaults-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=245dd720-99bf-40aa-b7ed-ad0f5e2c3dec&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="1002-the-as-prop-with-defaults-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
Let's start by looking at an approach that nearly works.

Here's the `Link` component we started with:

```typescript
export const Link = <TAs extends ElementType>(
  props: {
    as: TAs;
  } & React.ComponentPropsWithoutRef<TAs>,
) => {
  const { as: Comp = "a", ...rest } = props;
  return <Comp {...rest}></Comp>;
};
```

If we were to try calling `Link` as a function with an empty object, we'd see that it's being inferred as an `ElementType`. This is because we're not passing in `as`:

```typescript
Link({})

// hovering over Link shows
const Link: <ElementType>(props: {
  as: ElementType;
} & Omit<any, "ref">) => JSX.Element
```

If we pass in `as: "a"`, we see that it's being inferred as an `HTMLAnchorElement`:

```typescript
const Link: <"a">(props: {
  as: "a";
} & Omit<React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>,
HTMLAnchorElement>, "ref">) => React.JSX.Element
```

We can update the `Link` component's default type argument to be `a` in order to infer the component as an `HTMLAnchorElement` if `as` is not passed in:

```typescript
export const Link = <TAs extends ElementType = "a">(
  props: {
    as: TAs;
  } & React.ComponentPropsWithoutRef<TAs>,
) => {
  ...
```

This fixes our test errors, and the `e` is inferred as a `React.MouseEvent<HTMLAnchorElement>` as expected.

However, we have lost autocomplete on the `as` prop for everything except the `a`.

This might be fixed in a future version of TypeScript, but it's what we have for now.

## A Better Solution
There's a way around the loss of autocompletion, but it's a bit more complex.

First, we can't use a default type argument. This means that we're back to the `Link` component being inferred as `ElementType` and any props are allowed to be passed.

We're back to the `Link` component we started with:

```typescript
export const Link = <TAs extends ElementType>(
  props: {
    as: TAs;
  } & React.ComponentPropsWithoutRef<TAs>,
) => {
  ...
```

The change comes with what we pass to `ComponentPropsWithoutRef`.

We need a conditional type that basically says:
*   If `TAs` is the default, pass it `a` instead.
*   Otherwise, if `TAs` has a value that isn't the default, pass it that value.

### First Conditional Attempt
For a first attempt at the conditional, we'll try using `string extends string`:

```typescript
export const Link = <TAs extends ElementType>(
  props: {
    as: TAs;
  } & React.ComponentPropsWithoutRef<string extends string ? 'a' : TAs>,
) => {
  ...
```

This says "If you can pass string to string, then pass `ComponentPropsWithoutRef` `a`. Otherwise, pass it `TAs`."

With this change the invalid prop test passes, but not the `e` event type test.

### Second Conditional Attempt
Instead of `string extends string`, we can check `TAs extends ElementType`.

Let's see how calling the `Link` component with an empty object is inferred now:

```typescript
Link({})

// hovering over Link shows
const Link: <ElementType>(props: {
  ...
```

The problem now is that `Link` is being inferred as `ElementType`. When we say `TAs extends ElementType`, we're actually checking if `TAs` is assignable to `ElementType`.

### Third Time's a Charm
We need to reverse the previous conditional to be `ElementType extends TAs`, which will check if the specific element can be passed to `TAs`.

Here's what the finished solution looks like in the `Link` component:

```typescript
export const Link = <TAs extends ElementType>(
  props: {
    as?: TAs;
  } & ComponentPropsWithoutRef<ElementType extends TAs ? "a" : TAs>,
) => {
  const { as: Comp = "a", ...rest } = props;
  return <Comp {...rest}></Comp>;
};
```

We now have all of our tests passing, and the `Link` component behaves as we'd expect even if we're using defaults. We also have autocompletion on the `as` prop for all of the elements!

## Transcript
00:00 Okay, let's look first at the approach that nearly works. The thing that you might think here that should work is you should be able to specify T as if you don't pass a T as, like let's actually just instantiate this as like, just call it right with a link. Now, you might think that this link here,

00:18 currently it's being inferred as element type, right? In the little slot there. So, because that, because we're not passing an as, that's what's going to be inferred as the default because that's kind of what it's constrained to. So, if we say as, let's say as a, for instance here, now it's being inferred as a, just there.

00:37 So, if we don't pass an as, it makes sense that we should default it to a here. And now this link, here we go, it's now being defaulted to a, which is nice. And we no longer need to pass the as by default. So, let's see if this works now. It seems that everything is passing,

00:56 which is really, really nice. So, actually all of our errors disappear here. Link is being inferred as a, we've got our a there, and now we should, yet we get all of the props to do with that a there. Sorry, I keep saying the word a and it's freaking me out. So, we've got this e now, and this e is typed as HTML anchor elements,

01:15 mouse event, which is beautiful. Except we lose something. And the something that we lose is we lose this autocomplete here. For some reason, TypeScript seems to think that a now is the only possibility. This might change in a future version of TypeScript, but given that this is the one we're working with,

01:34 it's kind of annoying, and it means that we have to be a bit more creative about our solution. Now, the solution that I found to this problem is that you can use t as here. We cannot use a default type here. Can't use a default type. And if we can't use a default type, then we're in a little bit of trouble.

01:53 Because when we call this link here, this is going to be inferred as basically element type. And this means that you can basically pass any props to it, or it certainly won't resolve properly. So on click, for instance, e any void, it's just freaking out on us here. No good. So, the solution I found is that essentially

02:13 we want to be thinking about this thing here. The thing that we pass to component props without ref. Because if we pass this just t as, it's not really going to work too well. But actually, if we do something like this, where we use a conditional type, inside here, what we want to do is we want to basically say,

02:32 if t as is the default, don't basically pass it a instead. But if t as has a value that isn't the default, we want to just pass it that. So we basically want to check if this is being inferred

02:53 as its base type, as element type. And the way that you can do that in TypeScript is with a conditional type. So we can say, first of all, we want to check if t as is the default. So let's just say string extends string. Let's just say a or t as, because those are the things that we kind of care about here.

03:13 So if we have this now, we now have a conditional here that's checking if string extends string. If you can pass string to string, then pass it a. So this is actually working for this one here. Now, e is inferred properly as an a there, except all of this stuff isn't working because it's no longer letting you specify like any other type there.

03:34 So we need to figure out this. We could check if t as is assignable to element type here. And this, you might think this will work, but actually it doesn't, because what we're trying to do is we're trying to check basically if t as here, if this slot is being inferred exactly as element type.

03:55 And even though this looks like that check, it isn't. It's actually checking if t as is assignable to element type. So actually what we need to do is reverse these. When we reverse these, what we're saying is element type, we're checking if element type can be passed to,

04:13 like the specific type of element type can be passed to t as, because if t as is more narrow than element type, then it's actually going to fail. And this means now that if we have exactly element type in this slot there, then we will pass it a instead.

04:33 Whoa, and this actually works. This works, and we still get autocomplete on the as here. So now we're getting full autocomplete. It's behaving properly when you don't pass it an as, so link here is actually being inferred. It's still being inferred as element type. That's the crazy thing, but actually inside here,

04:52 inside the bit that actually matters, we're saying, can you pass element type to t as? Yes, you can. Fantastic. We got a instead, and it's using that as the default. So this is the solution that I found, and I think this works the best. It seems to run pretty quickly as well, which is quite appealing.

05:12 And it means that this link will behave as we expect, even if we're using defaults. And of course, you can still pass custom things to this as well. This behavior hasn't broken at all. So looking good.

# 11. The `as` Prop with `forwardRef`

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/08-advanced-patterns/72-as-prop-with-forward-ref.problem.tsx

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/08-advanced-patterns/72-as-prop-with-forward-ref.problem.tsx)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=e6b64136-da0a-4370-a77e-352f70fd27b4&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="1101-the-as-prop-with-forwardref-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=e6b64136-da0a-4370-a77e-352f70fd27b4&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="1101-the-as-prop-with-forwardref-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
Here we have an `UnwrappedLink` component that uses our trick to make the default prop work. It also makes use of the `ForwardedRef` component we worked on earlier:

```typescript
export const UnwrappedLink = <TAs extends ElementType>(
  props: {
    as?: TAs;
  } & ComponentPropsWithoutRef<ElementType extends TAs ? "a" : TAs>,
  ref: ForwardedRef<any>,
) => {
  const { as: Comp = "a", ...rest } = props;
  return <Comp {...rest} ref={ref}></Comp>;
};
```

With this current implementation, there are several errors.

For example, we are able to use a `wrongRef` when creating a `Link`. We may have this behavior because we're using `ComponentPropsWithoutRef`.

## Challenge
The challenge is to fix the types for `UnwrappedLink` so that all of the errors resolve.

This `DistributiveOmit` type will come in handy:

```typescript
type DistributiveOmit<T, TOmitted extends PropertyKey> = T extends any 
  ? Omit<T, TOmitted>
  : never;
```

You should revisit the previous lessons, and explore the React types.

This is an extremely difficult challenge, and the solution took me a whole day of work and the help of several TS experts in the community.

Don't feel bad if you can't solve this one!

## Transcript
00:00 Okay, folks, we are at the finale of the ASPROP. This is the final boss. This is an unwrapped link component which is using our trick to make the default prop work, to make ASPROP work, and it's now being combined with forward ref too.

00:17 So we have a ref which is a forwarded ref, any, here, and we're now wrapping it with forward ref and we end up with a link component. Now, this one is way too hard for you to find. Way too hard. It involves forward ref, like the fixed version of forward ref that we've

00:36 had from a previous exercise. It involves a distributed omit as well, because for various reasons the omit didn't work, which I'll show you in a second. So please do not feel bad if you do not find this at all, because, I mean, there's just so much here. Like, part of the problem here

00:56 is that we need to basically say, okay, we have ref here, which we need to basically be able to pass it the correct ref, because currently ref is being inferred as unknown, okay? And I think that's mainly because we're using this component props without ref here. So again, we might need

01:10 to fiddle with this because we also need to get the kind of refs working too. There's just so much here that was really hard for me to get right. I had to ask for a lot of help, but I think I found a solution that really does work for all of these different use cases. And of course we

01:28 need to make it work with forward ref. Oh god, it's just so stressful. Anyway, I think that's all the information I'm going to give you. Good luck if you want to have a go at this yourself, but feel free to skip to the solution and save yourself the pain that I went through.

# Solution: Distributive Omit with the `as` Prop

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/08-advanced-patterns/72-as-prop-with-forward-ref.solution.tsx

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/08-advanced-patterns/72-as-prop-with-forward-ref.solution.tsx)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=d5639a7c-0da4-40b0-9cf7-a20c0b293578&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="1102-the-as-prop-with-forwardref-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=d5639a7c-0da4-40b0-9cf7-a20c0b293578&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="1102-the-as-prop-with-forwardref-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
Here's how I got everything working.

The first thing I did was pulled in the `FixedForwardRef` from the previous exercise that preserved the generosity of what was passed in.

```typescript
type FixedForwardRef = <T, P = {}>(
  render: (props: P, ref: React.Ref<T>) => React.ReactNode,
) => (props: P & React.RefAttributes<T>) => React.ReactNode;

const fixedForwardRef = forwardRef as FixedForwardRef;
```

## Switching to `ComponentPropsWithRef`
The first thing I noticed was that `ComponentPropsWithoutRef` didn't seem to infer the `ref` properly.

So it made sense to try it with `ComponentPropsWithRef` instead, which takes in the `ElementType` and uses the conditional type to map over the `a`:

```typescript
export const UnwrappedLink = <TAs extends ElementType>(
  props: {
    as?: TAs;
  } & ComponentPropsWithRef<ElementType extends TAs ? "a" : TAs>,
  ref: ForwardedRef<any>,
) => {
  const { as: Comp = "a", ...rest } = props;
  return <Comp {...rest} ref={ref}></Comp>;
};
```

This works for most cases.

For example, the resulting `Link` `ref` is properly typed as `instance HTMLAnchorElement`:

```typescript
<Link ref={ref}>

// hovering over ref
(property) ref?: ((((instance: HTMLAnchorElement...
```

However, when using the `as` prop to specify a `button`, the `ref` has an error telling us that `RefObject<HTMLButtonElement>` is not assignable to `instance: HTMLAnchorElement`.

## Omitting the `as` Prop
The issue seems to happen when an `as` prop is passed in, so I decided to wrap the conditional with `Omit` to remove the passed in `as` prop so there's only one source of truth:

```typescript
export const UnwrappedLink = <TAs extends ElementType>(
  props: {
    as?: TAs;
  } & Omit<ComponentPropsWithoutRef<ElementType extends TAs ? "a" : TAs>, 'as'>,
  ref: ForwardedRef<any>,
) => {
```

This update allowed the `ElementType` to be correctly inferred as a button.

However, the `e` inside of the `onClick` is still being inferred as an implicit `any` rather than the `React.MouseEvent<HTMLButtonElement>` that we would expect.

## The Problem with `Omit`
When TypeScript reads the `UnwrappedLink` code, it sees that the `ElementType` could be a bunch of different things depending on what's passed in. Then it's trying to resolve all of those different props.

I suspect that using `Omit` is breaking something there.

Here's an example of how `Omit` works on this example `Union` type:

```typescript
type Union =
| {
  a: "a";
  user?: string;
  }
| {
  b: "b";
  user?: string;
  };
```

If we use `Omit` to remove the `user`, you might think it is going to return the same structure without the `user`. But what really happens is that it returns an empty object:

```typescript
type WithoutUser = Omit<Union, "user">;

// hovering shows
type WithoutUser = {}
```

This happens because `Omit` is not distributive, meaning the omission doesn't happen over each member of the union.

This is where `DistributiveOmit` comes in.

## The `DistributiveOmit` Type
Here's the code for the `DistributiveOmit` type:

```typescript
type DistributiveOmit<T, TOmitted extends PropertyKey> = T extends any 
  ? Omit<T, TOmitted>
  : never;
```

Essentially, this code goes through each branch of whatever `T` is passed in, and calls `Omit` on each level to remove `TOmitted`.

By adding the `DistributionOmit` to the `UnwrappedLink` component, it seems to resolve all of the remaining errors!

```typescript
// inside UnwrappedLink
...
& DistributiveOmit<ComponentPropsWithoutRef<ElementType extends TAs ? "a" : TAs>, 'as'>,
```

It was kind of a Hail Mary, but it worked!

## Recap
Here's what we started with:

```typescript
export const UnwrappedLink = <TAs extends ElementType>(
  props: {
    as?: TAs;
  } & ComponentPropsWithoutRef<ElementType extends TAs ? "a" : TAs>,
  ref: ForwardedRef<any>,
) => {
  const { as: Comp = "a", ...rest } = props;
  return <Comp {...rest} ref={ref}></Comp>;
};
```

And here's where we ended up:

```typescript
export const UnwrappedLink = <TAs extends ElementType>(
  props: {
    as?: TAs;
  } & DistributiveOmit<ComponentPropsWithRef<ElementType extends TAs ? "a" : TAs>, "as'">,
  ref: ForwardedRef<any>,
) => {
  const { as: Comp = "a", ...rest } = props;
  return <Comp {...rest} ref={ref}></Comp>;
};
```

We're using the same default trick as the previous version of `UnwrappedLink`, but we made plenty of other changes. It now uses `ComponentPropsWithRef` and a `DistributiveOmit` type to keep only one `as` source of truth, allowing us to pass in custom components or HTML elements and have inference working as expected.

If you find yourself in a situation where you want to use `forwardRef` with a generic component, and you want to use the `as` prop, this is a solution you can copy and paste into your own projects.

## Transcript
00:00 So, this is a story all about how I tried to get this working. I knew when it's a fresh Prince of Bel-Air there. And I got this working finally by doing a few things. So, the first thing I did was pulled in the fixed forward ref from the previous exercise that we had

00:16 that preserves the generosity of passing components. This is important. I also pulled in this distributive omit type, which I will explain in a minute. And the first way I thought about this is I thought, okay, we need to get this ref type working. The component props without ref doesn't

00:35 seem to be doing the job. And the reason this isn't doing the job is because, like, it's not inferring the ref properly. So, this is typed as react.ref any here, which is no good. And it makes sense that we want to actually, like, pull this in here. So, we need to somehow

00:52 infer the component props with ref in this situation. So, now we've got component props with ref. And this is what it's useful for, right? It's taking in the element type that we've got by using this sort of conditional type to map over the A there. And so, this should work. And it works actually in most cases. So, we're seeing here that ref is now

01:11 typed as, if I pull this open, it should be, yeah, it's got instance HTML anchor element. So, all good. Though, we're still getting some strange errors. And I'm going to ignore this error for now. And I'll show you why it's happening, because it's a crazy error.

01:28 Now, this one here is a ref. And this ref is still not quite working. So, it seems to be when we pass in, let's say, span or something like this or button, then this version is not quite, like, working yet. HTML button element is missing the type from HTML anchor

01:45 element. So, it seems to be that this ref is still thinking that it's an anchor element, not a button element, at least in the ref. So, the way that I got this working, because I'm still not sure why that particular error is happening, but what I figured was happening

02:02 is that it wasn't picking up on the as properly. So, if we just have a look at link actually and pull this down here, then if we don't pass in anything, then you should see that it's inferred as element type as before, right? So, for God's sake, my thing's not working.

02:18 Okay, my hover doesn't seem to be working. But if I say as button like this, then if we take another look here, then it's still being inferred as element type. So, it hasn't actually picked up from the button. So, something's happening now that we're using component props

02:33 with ref to sort of obscure the inference of the as, which is troubling. So, what I did to get that working was I wrapped this in an omit so that this section here, this whole tamale, this thing there is basically just being wrapped in like don't ever have

02:52 as in here, because I wanted to say, okay, don't, I want to make sure there's no conflict between this and this. And basically, this is the only source of truth. And now that actually ended up working. So, if we look at link now, link, if we take a look at as

03:13 will basically now follow what's in here. And if we hover over it, it's now being inferred as button. Yes, first victory. But what happened then was I got this error continues to happen. This is a really, really, really strange error. And I'm going to go into detail on it. This

03:31 on click here is a react dot mouse event handler HTML anchor element or undefined. And like, if you hover over this section, it's working great. But if you hover over this section, it says it implicitly has an any type. And it seems to me that TypeScript is the same

03:49 things happening on this button as well, by the way. So, we've got an on click HTML button element. Something is happening here, which I do not understand, or rather, I think it might be a small bug in TypeScript that we uncovered during this. And when you have situations

04:05 like this, where, because if you look at this, TypeScript is trying to make sense of this props type here. And it's looking at, let's say, this as and this omit. And it's seeing that, okay, element type could be a bunch of different things depending on what

04:21 they pass in. And it's trying to resolve all of those different props in there. And I think our omit is breaking something. You should know that omit, if we look at type, let's say we've got a union, let's say it's got an A property on it, which has an A, or it's

04:41 got a B property on it, which has a B. Now, if we take a look at this union, and we might think that, okay, we can, let's say we have, I'm not sure, like a user string, for instance,

04:53 and then a user string. If we say type without user, and we try to use omit union user, you might think that this is just going to return us like the same structure, but just without the user, right? But if we hover over it, we can see that it actually returns an empty

05:11 object. That's because omit is not distributive. And distributive basically means that it doesn't distribute over each member of this union. Whereas if we were to use something like a

05:26 distributive omit, it would actually go through each branch here and return the proper value. So if we say distributive omit, just there, so on the without user, we've now you can see that it's calling omit on each level here. So omit this and omit this. And I will link

05:44 below why this works and basically link to the section of the TypeScript docs on distributive types, because what's happening here is we're basically when you use a conditional type, it will make it distribute over the entire union that's passed in. So we're passing in

06:03 T here. And we're also passing in T omitted, which is the thing that we want to omit from the thing. So now what it's doing is it's saying, okay, T extends any, forcing it into a conditional making it distribute over the whole thing. And then we call omit on that

06:19 thing. It's a confusing property of TypeScript. And I tried it basically as a Hail Mary here. And it worked. So distributive omits called on this, it seems to somehow resolve all of the issues that we've been having. And when it catches up, it now works. And now E is

06:39 inferred properly as HTML anchor element. So to go back through, we're using the same default trick as we had before. We're now using component props with ref instead of component props without ref, we need to some for some reason, remove the as here in order to kind

06:57 of make sure that this is the only inference sites for where T as can be picked up. And we need to use a distributive omit, not a normal omit to get it working. God, it was such a relief to get this working, I have to say. But this is now something that you

07:16 can copy and paste into your projects that you know, will work in all situations for generic components for, for the as prop, it will work with forwarded refs, the refs will be properly inferred. And this I think is forwards compatible and possibly backwards compatible too. I don't see anything here that wouldn't work on previous TS versions.

07:36 So there we go.

# (f) Working with External Libraries



# 1. React Hook Form's Types

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/09-external-libraries/73-react-hook-form.problem.tsx

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/09-external-libraries/73-react-hook-form.problem.tsx)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=94c634c7-9d4b-4722-afb5-972b6cdad3ac&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0101-react-hook-forms-types-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=94c634c7-9d4b-4722-afb5-972b6cdad3ac&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0101-react-hook-forms-types-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
Let's look at a few examples that use [React Hook Form](https://github.com/react-hook-form/react-hook-form), a popular library for client-side form handling in TypeScript and React projects.

## Example 1
In the first example, we have a `useForm` function extracted from React Hook Form. This function creates a form and can be passed some default values, although it doesn't require any values to be passed to it.

The default values we pass to the `useForm` function get inferred and used throughout the form's lifecycle.

```typescript
import { FieldValues, useForm } from "react-hook-form";
import { Equal, Expect } from "../helpers/type-utils";

const Example1 = () => {
	const form = useForm({
		defaultValues: {
			firstName: "",
			lastName: "",
		},
	});

	return (
		<form
			onSubmit={form.handleSubmit((values) => {
				type test = Expect<
					Equal<typeof values, { firstName: string; lastName: string }>
				>;
			})}
		>
			<input {...form.register("firstName")} />
			<input {...form.register("lastName")} />
		</form>
	);
};
```

The form has a `handleSubmit` method that receives a function typed with the values we passed to the `defaultValues`.

We also have type-safe `register` functions that pass several props to the input elements.

## Challenge 1
Your first task is to investigate how these types are being inferred. Jump into the type definitions in VS Code by using `CMD+click`, or [check them out on GitHub](https://github.com/react-hook-form/react-hook-form/blob/5f3df1227c381a9127ab27f7d1d98a9cefee33d5/reports/api-extractor.md?plain=1#L631).

## Example 2
In the second example, we don't pass in any `defaultValues` and we lose inference:

```typescript
const Example2 = () => {
  const form = useForm();
  ...

// Hovering over form
const form: UseFormReturn<FieldValues, any, undefined>
```

## Challenge 2
Your second challenge is to determine why the return type of `getValues` is inferred as `FieldValues` when we don't pass a default value, and what type `FieldValues` is.

## Example 3
For the third example, we try to add a `middleName` to the form that doesn't exist in the `FormValues` type:

```typescript
// inside the rendered form

{
	/* @ts-expect-error */
}
<input {...form.register("middleName")} />;
```

## Challenge 3
Your third challenge is to figure out how to have `useForm` understand the type of the `FormValues` so the `@ts-expect-error` error goes away and the form understands what type the fields are.

## Transcript
00:00 In this section, we're going to start looking at external libraries with React and TypeScript, and we're going to start with React Hook Form. Now, what we're looking at here is a form library that is immensely popular in TypeScript and React, and it's really popular for client-side form handling especially.

00:18 So in this form here, we've got a useForm function which is being extracted from React Hook Form, and then this creates a form, and we pass it some default values. We don't have to pass it anything, actually. It doesn't require anything to be passed to it.

00:33 But the default values that we do pass to it, they get inferred in a little slot just up here, and then they get then used throughout the rest of this form's lifecycle. So this form, we can see that it has a handleSubmit method on it, and that then receives a function which is typed with the values

00:52 that we just passed into the default values up here. So if we add like a middle name up here, then this gets added to the values here because it's assumed that when this form is submitted, this default value will be on that type. Down here, we've got register functions, which basically pass in a bunch of props that you can spread to this input here.

01:13 And so we've got form.registerFirstName, form.registerLastName, and these are type-safe too. Very, very, very nice stuff. Your job here, the first job, is to try to figure out why that's happening, how this gets inferred here by doing some finding definition stuff and going through there.

01:29 The next step is I want you to look at what happens when you don't pass anything. Then form, instead of being inferred as this nice type here, useFormReturnWithFirstNameLastName, it's actually just useFormReturnWithFieldValues. So your second job is to work out what type FieldValues is.

01:47 And you notice too that we don't get any kind of inference on FirstNameLastName here, which is a bit sort of sad, really. So your third exercise after that is once you've understood this, then we need to understand how we can possibly change this line of code here

02:05 in order to make sure that it understands that values are not FieldValues, but our actual form values that we put up here, so FirstName and LastName. So form values is literally just this type down here. And we need to make sure that the things that we're registering here are actually part of FirstName and LastName, and don't, for instance, have MiddleName on them.

02:25 So that's your job, is to first work out how this is actually working, how this inference even works, how this understands that it's a useFormReturnWithFirstNameLastName in. Second is to understand what happens when you don't pass the default values in. And third is to understand how to actually force it

02:43 to understand that your default values are what you think they are. Good luck.

# Solution: Understanding useForm Type Declarations in React Hook Form

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/09-external-libraries/73-react-hook-form.solution.tsx

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/09-external-libraries/73-react-hook-form.solution.tsx)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=b2e27d62-3bd1-4220-a4ef-2a094a2af3e5&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0102-react-hook-forms-types-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=b2e27d62-3bd1-4220-a4ef-2a094a2af3e5&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0102-react-hook-forms-types-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
Let's start by looking at `useForm`'s [type definition](https://github.com/react-hook-form/react-hook-form/blob/5f3df1227c381a9127ab27f7d1d98a9cefee33d5/reports/api-extractor.md?plain=1#L631):

```typescript
export function useForm<
	TFieldValues extends FieldValues = FieldValues,
	TContext = any,
	TTransformedValues extends FieldValues | undefined = undefined
>(
	props?: UseFormProps<TFieldValues, TContext>
): UseFormReturn<TFieldValues, TContext, TTransformedValues>;
```

In the `useForm` function, we can see three type arguments:
*   `TFieldValues`
*   `TContext`
*   `TTransformedValues`

Out of these, only the first one, `TFieldValues`, is being used when we call the function in our code. The other arguments, `TContext` and `TTransformedValues`, are typed as `any` and `undefined`, respectively.

```typescript
// inside challenge code
// hovering over useForm

useForm<{
  firstName: string;
  lastName: string;
}, any, undefined>(props? Partial<{
  ...
```

Moving on to the second challenge, we'll focus on `TFieldValues`.

From the type definition, we can see that when `TFieldValues` cannot infer anything, it defaults to `FieldValues`.

Examining the `FieldValues` type, we can see it's pretty loose:

```typescript
type FieldValues = Record<string, any>;
```

This is a sensible decision made by the React Hook Form developers.

But how is it inferring the `firstName` and `lastName` types in our code?

In the type definition for `useForm`, the `props` being passed in are optional. The `UseFormProps` takes in `TFieldValues` as a type argument, which gets passed to the generic type:

```typescript
export function useForm<
	TFieldValues extends FieldValues = FieldValues,
	TContext = any,
	TTransformedValues extends FieldValues | undefined = undefined
>(
	props?: UseFormProps<TFieldValues, TContext>
): UseFormReturn<TFieldValues, TContext, TTransformedValues>;
```

Jumping into [the](https://github.com/react-hook-form/react-hook-form/blob/5f3df1227c381a9127ab27f7d1d98a9cefee33d5/reports/api-extractor.md?plain=1#L658C1-L672C4) [`UseFormProps`](https://github.com/react-hook-form/react-hook-form/blob/5f3df1227c381a9127ab27f7d1d98a9cefee33d5/reports/api-extractor.md?plain=1#L658C1-L672C4) [definition](https://github.com/react-hook-form/react-hook-form/blob/5f3df1227c381a9127ab27f7d1d98a9cefee33d5/reports/api-extractor.md?plain=1#L658C1-L672C4), we find an big object of all of the things that can be passed in:

```typescript
export type UseFormProps<
	TFieldValues extends FieldValues = FieldValues,
	TContext = any
> = Partial<{
	mode: Mode;
	reValidateMode: Exclude<Mode, "onTouched" | "all">;
	defaultValues: DefaultValues<TFieldValues> | AsyncDefaultValues<TFieldValues>;
	values: TFieldValues;
	resetOptions: Parameters<UseFormReset<TFieldValues>>[1];
	resolver: Resolver<TFieldValues, TContext>;
	context: TContext;
	shouldFocusError: boolean;
	shouldUnregister: boolean;
	shouldUseNativeValidation: boolean;
	progressive: boolean;
	criteriaMode: CriteriaMode;
	delayError: number;
}>;
```

Anything passed to `defaultValues` will be inferred as `TFieldValues`, which gets passed all the way up to the `props` of `useForm`.

By specifying `defaultValues`, TypeScript understands that's what it's supposed to infer.

Often in external libraries you're going to be diving deep into the type definitions to work out where something is being inferred from.

For the third solution, in order to get proper inference from `useForm` we need to pass it a type argument of the thing we want it to infer:

```typescript
const form = useForm<FormValues>();
```

Without the type argument, `useForm` infers `FieldValues`, which as we saw is a really big, wide-open type.

When using a type argument, we can either let it infer from its inference sites, or we can pass it something.

Since we're specifying `FormValues` as the type argument, TypeScript will infer that as the type of `defaultValues` in the `UseFormProps` type:

```typescript
type FormValues = {
  firstName: string;
  lastName: string;
}

// hovering over useForm
const form = useForm<FormValues>();

// shows
(alias) useForm<FormValues, any, undefined>(props?: Partial<{
  ...
  defaultValues: {
    firstName?: string | undefined;
    lastName?: string | undefined;
  } | AsyncDefaultValues<...>
  ...
```

The inference can be done directly from the type argument.

The techniques we used here will be useful in the upcoming exercises, as well as your future work with third-party libraries!

## Transcript
00:00 Let's take this step-by-step. UseForm here, we're going to command click on it, and this is going to be pretty scary to start with. What we end up with here is a big old, huge, great big declaration file. We're in useform.d.ts, which it looks like is part of types or part of actually

00:19 the type declarations which ship with React hook form. I'm going to actually unwrap this, so un-word wrap it so we can see everything. We have here three type arguments which go into useform. We've got tFieldValues, tContext, and tTransformedValues. If we take another look at our useform here,

00:37 we can see that actually only the first one actually is being used when we call it like this. We have firstName and lastName. The other one is typed as any, the other one is typed as undefined. If we look at that here, we can see that tContext has a default of any and a default of undefined for tTransformedValues.

00:56 You can essentially ignore these ones just for our purposes here. tFieldValues is the only one we care about. It looks like it defaults to field values if it can't infer anything. We take a look at useform, and actually we look at the second one here.

01:11 This is why when it's not inferring anything, or when it can't infer anything, the default thing that it infers is field values. Let's take a quick look at the field values type then. Field values type is a record string any,

01:30 which is extremely loose here. This, I think, is a sensible decision for them to make. Because if you don't know what type something is, then actually having field values as the default type, this form could technically be called with anything. It could be like, we could actually make this stricter if we wanted to.

01:48 We could say, if I were the designer of React hook form, for instance, I would say, unless you actually specify what type this is, make sure it's like an empty object or something. But that wasn't the decision they made. They've created quite an open type here. That's what field values means, and that's what happens when you

02:08 don't pass any default values to it. But how is this even working, this inference of first name and last name being inferred in that slot? Let's dive into that. tFieldValues, where is that coming from? What slot is that being inferred from? Well, we've got these props here, and the props are what you pass into useForm.

02:27 You notice that you don't actually have to pass it anything. These useForm props here, it takes in tFieldValues. The type that's being inferred here or this type argument gets passed to this generic type too. Let's take a look here then. Dive into useForm props. Hello, big old file.

02:45 We've got now, this is a partial wrapping this object here, and this object is all of the things that you can pass to useForm props. Partial default values, and default values, it looks like it's taking in tFieldValues here,

03:01 so either async default values or default values, and passing in tFieldValues. If we look at default values here, it's a deep partial of tFieldValues. We're now at the point where we understand, okay, what's tFieldValues? It's now, okay, it's got some utils here,

03:19 and deep partial is basically making a deep copy of that thing, but making each member of it, each member of the object optional. We've got then, deep partial of tFieldValues is default values here, and we go back to where we were, that's on the default values property.

03:39 Anything passed to default values, that will be inferred as tFieldValues, and then we pass it all the way up here, and that's on the props of useForm. That's how it works. By specifying default values, TypeScript understands that that is what it's supposed to infer in this particular slot.

03:58 Amazing. Very, very cool. This is how it often works with external libraries. You're going to be diving deep into something to actually work out the inference site of where something is inferred from. Now, how do we actually get it to play nice with our stuff here?

04:16 The solution is to pass it a type argument of the thing that we want it to infer. If we don't pass this, useForm just sits like this. We know that when we have a type argument in a function, we can either just let it infer from its inference sites like it's doing above,

04:36 or we can pass it something. That's something we're passing is our form values. This is what React Hook form recommends in its docs too. Now, what we get is even though we haven't passed in anything here because this thing is a partial, this props thing here, so you don't actually have to pass in anything here,

04:53 and it's even got an optional parameter here too. You actually can just do the inference from there. Register now works properly. We've got firstName and lastName here, and this values is typed as these form values. To sum up, useForm takes in T field values, which is the type that's being inferred there.

05:13 If you don't pass in the default values here, then it's going to just infer field values, which is a really big wide open type, just record string any. The way that you can get it to infer properly in this situation is by passing it a type.

05:28 Now, this information is going to stand us in good stead for the next exercise, and also hopefully the techniques that we've learned about diving in and understanding where all the inference sites are, they will also help us whenever we're looking at some third-party libraries in the future.

# 2. Wrapping the useForm Hook from React Hook Form

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/09-external-libraries/74-react-hook-form-wrapper.problem.tsx

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/09-external-libraries/74-react-hook-form-wrapper.problem.tsx)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=4c5b36fb-7656-4dce-a06a-17d91d804217&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0201-wrapping-the-useform-hook-from-react-hook-form-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=4c5b36fb-7656-4dce-a06a-17d91d804217&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0201-wrapping-the-useform-hook-from-react-hook-form-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
Now that we understand the basics of `useForm`, let's create a wrapper around it.

The idea is to create a function that takes in some default values, then passes those into the form.

The `defaultValues` object should be required, and work when we use the `handleSubmit` function.

Here's the starting point:

```typescript
const useCustomForm = (defaultValues: any) => {
  const form = useForm({
    defaultValues: defaultValues,
  });

  return {
    register: form.register,
    handleSubmit: form.handleSubmit,
    getValues: form.getValues,
  };
};
```

There are several `any` types and tests that currently are not passing.

## Challenge
Your challenge is to update the `useCustomForm` function so everything works as expected.

As a hint, you'll need this line of code:

```typescript
defaultValues as DefaultValues<TValues>;
```

## Transcript
00:00 In this exercise, we're going to create a wrapper around useFormHook from react-hook-form. We understand the basics about this work, so now we're going to put it into practice. In this setup, what we're going to do is we're going to basically take or create a function which just takes in some default values and then passes those into this form here.

00:19 We're expecting the default values to be required, we're expecting them to be an object, and we're also kind of expecting it to work when we use this handleSubmit function. So this custom form thing, it should really have useFormRegister, handleSubmit, and getValues. This is quite a common pattern actually when you don't want to

00:38 expose all of the functions of a third-party library, you just want to expose some of them and so you can swap them out later if needed, because this sort of register function, handleSubmit, and getValues, they could be conceivably built by someone else, let's say, or by your own team.

00:53 So we're expecting then that kiov custom form, it's only exporting those functions, we're expecting that handleSubmit works this way, and we should hopefully get everything working nicely. There will be, and I did this exercise myself to try it out,

01:09 there is a horrible little paper cut here where you will need to use this little line of code somewhere in there. You will need to do an as, and we'll explore why in the solution, but yeah, the solution does contain this slightly horrible looking piece of code, but I think you've got all the information you need. Good luck.

# Solution: Creating a Generic Wrapper for useForm

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/09-external-libraries/74-react-hook-form-wrapper.solution.1.tsx

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/09-external-libraries/74-react-hook-form-wrapper.solution.1.tsx)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=828f5a98-e540-46b3-8a0a-c8dfba4e8ebb&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0202-wrapping-the-useform-hook-from-react-hook-form-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=828f5a98-e540-46b3-8a0a-c8dfba4e8ebb&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0202-wrapping-the-useform-hook-from-react-hook-form-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
Currently, we don'y have any inference for our form:

```typescript
const customForm = useCustomForm({
  firstName: "",
  lastName: "",
});

// hovering over customForm
const customForm: {
    register: UseFormRegister<any>;
    handleSubmit: UseFormHandleSubmit<any, undefined>;
    getValues: UseFormGetValues<any>;
}
```

We need to capture those values, so we'll put them in a type argument called `TValues` that for now will extend `any`:

```typescript
const useCustomForm = <TValues extends any>(defaultValues: TValues) => {
  const form = useForm({
    defaultValues: defaultValues, // error!
  });
  ...
```

With this change, we now have an error on `defaultValues` inside the call to `useForm` because it has to be in the shape of `FieldValues`.

Checking the type definition for `FieldValues` will show us the shape:

```typescript
type FieldValues = {
  [x: string]: any;
}
```

We can use this type to our advantage. Instead of extending `any`, we'll extend `FieldValues` and import it from `react-hook-form`:

```typescript
import { FieldValues, useForm} from 'react-hook-form';

const useCustomForm = <TValues extends FieldValues>(defaultValues: TValues) => {
  ...
```

Now our `customForm` is correctly understanding everything, and it's automatically working with the `useForm` hook which also takes in `TValues`:

```typescript
// hovering over customForm
const customForm: {
  register: UseFormRegister<{
    firstName: string;
    lastName: string;
  }>;
  handleSubmit: UseFormHandleSubmit<{
    firstName: string;
    lastName: string;
  }, undefined>;
  getValues: UseFormGetValues<...>;
}
```

Some of the tests are fixed now, but we still have an error on `defaultValues` inside the `useForm` call:

```typescript
Type 'TValues' is not assignable to type 'DeepPartial<TValues> | AsyncDefaultValues<TValues> | undefined'.
```

This should work, because in the `useCustomForm` function `TValues` is constrained to `FieldValues`:

```typescript
const useCustomForm = <TValues extends FieldValues>(defaultValues: TValues) => {
  const form = useForm({
    ...

// hovering over `useForm`
useForm<TValues, any, undefined>(props?: Partial<{
    mode: keyof ValidationMode;
    reValidateMode: "onBlur" | "onChange" | "onSubmit";
    defaultValues: DeepPartial<TValues> | AsyncDefaultValues<...>;
    ...
}>
```

In order to fix this, we can specify that `defaultValues` is of type `DefaultValues<TValues>`:

```typescript
// inside useCustomForm
const form = useForm({
  defaultValues: defaultValues as DefaultValues<TValues>,
});
```

I think that this fix stems from a problem in the actual library, so there's a chance it will be fixed if you go to use this in production.

The point to take away is to not be afraid to use `as` on these integration points to get things working as you need them to.

However, be cautious with using `as any`, as it can break the code by returning `any` on all the things related to `useCustomForm`.

## Adding More Specific Types
Everything is working well now, but you could add more specific return types if you wanted to. Each of the functions returned will take `TValues` and need to be imported from the library:

```typescript
import {
  DefaultValues,
  FieldValues,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormRegister,
  useForm
} from 'react-hook-form';

const useCustomForm = <TValues extends FieldValues>(
  defaultValues: TValues,
): {
  register: UseFormRegister<TValues>;
  handleSubmit: UseFormHandleSubmit<TValues>;
  getValues: UseFormGetValues<TValues>;
} => {
  const form = useForm({
    defaultValues: defaultValues as DefaultValues<TValues>,
  });

  return {
    register: form.register,
    handleSubmit: form.handleSubmit,
    getValues: form.getValues,
  };
}
```

It's nice that React Hook Form provides these types for us, making it easier to work with TypeScript.

## Wrapping Up
Sometimes when working with external libraries, you might find that certain functionalities are not readily available through a simple export. In such cases, you'll need to perform some sort of transformation to access them. However, once you've managed to integrate these external libraries properly, your project should run smoothly.

## Transcript
00:00 Okay, let's put our generic function hat on. We know that we are going to need to capture these values somewhere in a type argument because currently the things down here, they aren't working because custom form is just being inferred as any. There's no inference going on. So we need to capture those.

00:15 So let's put them in a type argument called tValues. And tValues, that is going to extend something. So I'm just going to make it extend any for now. And then we're going to capture those in tValues. Now, let's take a look down here and see if we can get these first tests working.

00:34 We've got default values must be an object. Hmm, okie dokie. Now, that's interesting because like use form up here, if we take a look at this, it requires something in the shape of field values. Let's take a look. It must extend field values. So you can't pass in default values as like a number or something.

00:53 Now, we can actually use this type to our advantage. Why not? It's just sitting there, right? So why don't we just say instead of any extends field values and grab those from React hook form. So now then, if we look, it's actually working really nicely already.

01:09 We've got our custom form here and it's actually understanding everything. So we've got use form register, first name, last name, use form handle, submit first name, last name. And that's because this is actually automatically working. This use form hook actually takes in tValues. So whatever we pass in here just gets put into use form.

01:29 And now form.register, it's got tValues in there already. So we don't even need to annotate the return type of this. It can just work as it is. We will do in a second, but we don't need to, which is beautiful. So this default values now, type default values is not assignable to type deep partial or async default values tValues undefined.

01:49 There's something really strange going on. And the only way I could get it to work, because we know that this should work, because use form itself, it's constrained to field values. This tValues is constrained to field values. So we know it should work. So what I ended up doing is I ended up doing as default values,

02:11 let me see, tValues. And this, what it does is it just fixes this little strange paper cut because it seems to be that when you use default values here, like use form just isn't quite working here. And I think this is slightly probably on the fault of the maintainers

02:31 or on the builders of this library. And when you actually go to use this in your production apps, like this may actually just be fixed here, which is kind of interesting. So like what I think the lesson here is, is don't be afraid to use as on these integration points.

02:47 Because what we're really doing here is we're just sort of fixing an error here in line. We could have also said that as any, but actually if we do as any here, it actually breaks. Because now all of the stuff from use custom form here, it actually just like returns any on all of the things here. So use form handle submit. So we really do want to be pretty precise here.

03:07 And the other way I debated about fixing this is by using the other technique, is by saying tValues. But oddly enough, it doesn't work as well. So we still have to do as default values here. This has a similar effect, right? It's in fact exactly the same as just sort of passing in the inference here, except for it's just a few lines of code extra wasted.

03:26 So we don't even need to use it because it understands that tValues is being passed to it no matter what we do. So yeah, this little paper cut here, I think the lesson is don't be afraid to use as in these integration points to get things working as you need them to. And let's just quickly type the return types here. Now, I think this is a slightly futile exercise

03:46 because we don't really need to type them. They're pretty well typed already. But if we wanted to, we could say, so we've got useFormRegister tValues. So let's put that in here. So register is useFormRegister and then tValues. Nice. And we'll just grab that from React Hook Form.

04:06 Next one is handleSubmit, which I assume is useFormHandleSubmit tValues. And then the last one is getValues, which I assume again, form.getValues, useForm.getValues tValues. And it's nice that you can just sort of hover over these. And it's also nice that React Hook Form actually grabs this stuff for you, which is really good.

04:27 Use, what was it? useForm.getValues and then pass it tValues. Sometimes you'll find in external libraries, these won't be available on like an export like this. And you'll need to do some sort of transformation to get them. But this all seems pretty good. And all of our tests are passing. So hopefully this gives you an idea of how you can,

04:47 like techniques you can use to fit together different external libraries in order to get them to play nicely.

# 3. React-Select's Generics

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/09-external-libraries/75-react-select.problem.tsx

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/09-external-libraries/75-react-select.problem.tsx)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=f9b3da5d-3c36-4d34-8a79-1a48d8d6786e&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0301-React-Select's Generics-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=f9b3da5d-3c36-4d34-8a79-1a48d8d6786e&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0301-React-Select's Generics-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
React Select is a popular library for building select components, but many developers face difficulties in creating their own abstraction from it.

Consider this `Select` component and array of guitarists:

```typescript
export const Select = (props) => {
	return <ReactSelect {...props} />;
};

interface Option {
	id: number;
	label: string;
}

const guitarists: Option[] = [
	{
		id: 1,
		label: "Jimi Hendrix",
	},
	{
		id: 2,
		label: "Stevie Ray Vaughan",
	},
];
```

Our goal is to create a `Select` component with the guitarist options, but there are currently several errors.

The `ReactSelect` component would normally handle this on its own, but it's not working with our custom `Select` component wrapper.

## Challenge
Your task is to dive into the `ReactSelect` types in order to properly type the custom `Select`.

Hint: This is a tough challenge, but looking at [the](https://unpkg.com/browse/react-select@5.7.4/dist/declarations/src/Select.d.ts) [`Props`](https://unpkg.com/browse/react-select@5.7.4/dist/declarations/src/Select.d.ts) [type](https://unpkg.com/browse/react-select@5.7.4/dist/declarations/src/Select.d.ts) is a great start!

## Transcript
00:00 In this exercise, we're going to look at a classic integration problem between React and TypeScript, which is React Select. React Select is a really popular library for building select components. And I've noticed actually in a couple of production code bases I've looked at, they use this and they have a real problem wrapping it and creating their own abstraction from it.

00:19 So what we're going to look at here is we're trying to create a select component and we're returning React Select. And we're just basically trying to figure out the type for this props type. Because React Select itself, what we'll see is that it actually contains a few generics here.

00:36 And in order to get it working, we want to really mimic those generics on our select component. Now, what it's supposed to be doing is we're taking in some guitarists here. And these guitarists, we've got an ID and a label on them, Jimmy and Stevie Ray. And if we take a look at this select here,

00:55 we should see that on change, this option is supposed to be typed as option or null here. Because technically, you can select no guitarists or you can select one guitarist. But if we choose the isMulti option,

01:11 then this instead of being just like whenever you change it has a single option, this should instead be an array of options because you can select multiple guitarists. So this is a bit of a problem. And select or React Select itself handles this if you just use the component itself.

01:29 Because if we were to just change this to React Select, then it actually just starts working. We've got like a single value option or we've got a multi-value option. And your job is to try to get that same inference working on our little select component. So you should dive into React Select itself.

01:48 You should also take a look at a type called props, which React Select exports. And I think you have all the information you need. Good luck. This is a tough one.

# Solution: Capture and Extend React Select's Type Definitions

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/09-external-libraries/75-react-select.solution.tsx

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/09-external-libraries/75-react-select.solution.tsx)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=98319f39-4f23-4af3-81b0-d14e0949e74a&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0302-React-Select's Generics-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=98319f39-4f23-4af3-81b0-d14e0949e74a&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0302-React-Select's Generics-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
Indirection with the way that props are declared can be a problem.

When navigating into `ReactSelect`'s types, we end up at `StateManagedSelect` which has a large function definition:

```typescript
// https://unpkg.com/browse/react-select@5.7.4/dist/declarations/src/stateManager.d.ts

declare type StateManagedSelect = <Option = unknown, IsMulti extends boolean = false, Group extends GroupBase<Option> = GroupBase<Option>>(props: StateManagerProps<Option, IsMulti, Group> & RefAttributes<Select<Option, IsMulti, Group>>) => ReactElement;
```

There are three type arguments: `Option`, `IsMulti`, and `Group`, each with constraints. Since the return is a `ReactElement`, we know from previous exercises that it's a component.

We also have a `StateManagerProps`, which we can look at the type definition for:

```typescript
// https://unpkg.com/browse/react-select@5.7.4/dist/declarations/src/useStateManager.d.ts

export declare type StateManagerProps<Option = unknown, IsMulti extends boolean = boolean, Group extends GroupBase<Option> = GroupBase<Option>> = SelectPropsWithOptionalStateManagedProps<Option, IsMulti, Group> & StateManagerAdditionalProps<Option>;
```

We can see that `Option`, `IsMulti`, and `Group` are also present in `StateManagerProps`.

There's another important definition in this file is the default `UseStateManager` export:

```typescript
export default function useStateManager<Option, IsMulti extends boolean, Group extends GroupBase<Option>, AdditionalProps>({ defaultInputValue, defaultMenuIsOpen, defaultValue, inputValue: propsInputValue, menuIsOpen: propsMenuIsOpen, onChange: propsOnChange, onInputChange: propsOnInputChange, onMenuClose: propsOnMenuClose, onMenuOpen: propsOnMenuOpen, value: propsValue, ...restSelectProps }: StateManagerProps<Option, IsMulti, Group> & AdditionalProps): PublicBaseSelectProps<Option, IsMulti, Group> & Omit<AdditionalProps, keyof StateManagerAdditionalProps<Option> | StateManagedPropKeys>;
```

The thing to notice here is that the `Props` type leads us to other types with different names.

Instead of trying to understand how all the pieces fit together, we can work on replicating the `ReactSelect` function.

## Replicating the `ReactSelect` Function
Back in our exercise file, when we hover over `ReactSelect` we can see it's an alias for `StateManagedSelect`:

```typescript
// hovering over ReactSelect
return <ReactSelect {...props} />;

// shows
(alias) const ReactSelect: StateManagedSelect;
```

If we set the return type of our `Select` component to `StateManagedSelect`, we can see that it works:

```typescript
export const Select: StateManagedSelect = (props) => {
  return <ReactSelect {...props} />;
};t=
```

The problem though is that it's hard to figure out how to add additional props because of the function type used.

We need to find a suitable type for this, and the `props` type immediately comes to mind.

## Using the `Props` Type
As we saw in the type definition, the `Props` type has a bunch of defaults so we can just use it:

```typescript
export const Select = (props: Props) => {
  return <ReactSelect {...props} />;
};
```

It's a common practice for libraries to set default values for all the options to provide more flexibility to its users.

Looking back at the `ReactSelect`, or rather the `StateManagedSelect` types, there are several type arguments.

We can copy the defaults for `Option`, `IsMulti`, and `Group` from the type definitions and place them before our function, then pass them into `Props`:

```typescript
export const Select = <
  Option = unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  props: Props<Option, IsMulti, Group>
) => {
  return <ReactSelect {...props} />;
};
```

We also need to import `GroupBase` from React Select:

```typescript
import { GroupBase } from 'react-select';
```

After saving the changes, everything starts to work and the types are correctly inferred:

```typescript
// hovering over options
<Select
  options={guitarists}
  ...

// shows:
(property) options?: OptionsOrGroups<Option, GroupBase<Option>> | undefined
```

## Adding Additional Attributes
We can add additional props to our `Select` component abstraction.

For example, could add a `doSomething` boolean:

```typescript
export const Select = <
  Option = unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  props: Props<Option, IsMulti, Group> & {
    doSomething: boolean;
  }
) => {
  return <ReactSelect {...props} />;
};
```

By copying the API of a library's type arguments, we are able to make our own abstractions more extendable.

## Transcript
00:00 Okay, let's take a look at this. Now, React Select here, there are a few kind of like problems with the way that the types are declared, especially when it comes to indirection. If we take a look at React Select here, I'm just command click on it, this is kind of like our entry point here, command click on it, we end up in State Managed Select, and State Managed Select is State Managed Select,

00:19 State Manager, State Manager Props. Okay, there's a lot going on here, and this huge, great big file kind of like jumps out at us. But we can see that State Managed Select is kind of like leading us in quite a nice way, actually, because we've got a big old function definition, but that function definition, it just returns a React element. And we know what React element is,

00:39 we've used it before in these exercises. So we know that this is a component, and we can see that this component has three type arguments. We have Option, we have IsMulti, and we have Group. And all of these have kind of some constraints on them.

00:56 So we have Option, Unknown, IsMulti here, and we've got State Manager Props available to us. State Manager Props still has Option, IsMulti, and Group here. And we have, again, this massive, great big file with these huge definitions. We have UseStateManager inside here.

01:14 And what we can start to see is like, sure, we've got a Props attribute or Props type coming from React Select. But if we command click on it, it goes to another type which is named something different, State Manager Props. And we could try to understand all of these different pieces here,

01:31 or we could just try to really replicate the function that we know works. And the one that we know works is this React Select. So we have a State Managed Select here. So what I guess we could do is we could try doing this, State Managed Select. And let's just see if that works. Wow, it works. Okay, fantastic.

01:50 So now we have just at stroke fixed all of our problems, it seems to be. So we have Select, React Select, OnChange, Option, that all seems to be working. But there's an issue with this, or at least I can see an issue with it, which is if we type this function here, what happens if we want to add some more props to this?

02:10 Because we're using this function type here, it's actually quite hard to figure out a way to add additional props onto this. Because, I mean, look at some of these types here. We have emit, public, blah, blah, blah. How do we actually figure out what type these props are supposed to be? So I don't see this as a perfect solution here. I think the best solution would be

02:29 to somehow find a type for this. And the type that immediately springs to mind is this props type. So let's take a look at this. We have props. And we can just type it as props because all of these options actually have defaults here. So Option has a default, IsMulti has a default, and Group has a default.

02:49 This is very common in libraries, actually, in order to let users kind of use these in the way they want to. They'll often provide defaults for all of them. And if we take a look back at our React select components here, we can see that this function has a bunch of type arguments. In these situations, we could dive deep into props like we did with React hook form

03:09 and figure out exactly how those are working. But one way that we can actually sidestep that is we can just take these type arguments all the way through here, copy them, and just paste them before our function here. So we have Option equals unknown. We need to import GroupBase from React select. Good, it's nice that it exposes that.

03:29 And now we can pass those into our props that we get from React select because this takes in exactly the same type arguments. We've got Option, IsMulti, and Group. So let's take a look at that. We can pass in Option, IsMulti, Group. Then we save that.

03:47 And now everything starts to work again. So we're now in a position where, if we take a look at this select, we can see here that guitarist is being inferred here. So we've now got this type is single value option. Beautiful. Now, we can take a little look at these

04:05 just to figure out kind of like how they're working. Option, it seems to me, at least like based on the name and based on the way it occurs in the props. Let's take a look here, state manager additional props. Oh gosh, oh gosh, here we go. So we've got props with optional state props. I mean, public base select props.

04:25 Take a look inside here. You can see how much indirection there is going on here. Library manage attributes, state. Okay, we seem to be on a type of default props here. You can just, is it options for type here? Options, never. I mean, you can see how much indirection there is built into here. IsMulti seems to be pretty clear,

04:45 which is like basically if you specify multi, false or true, and it defaults to false, because if it doesn't default to false, if it defaults to Boolean, let's say, then it can't actually resolve whether it's a single value or a multi value. So we can pause that there. And this group, I actually genuinely don't know how it works,

05:02 but by copying the part of the react select function here, we know that at least these props will be inferred correctly. We can now add new attributes to them. So we can say class name string, for instance, if I'm probably sure it took one already, but like do something as a Boolean.

05:21 And it means that this is now properly extendable, and it means we've built an abstraction that we can let others extend here. So a big lesson here in that you don't necessarily always need to know how the library's types operate in a deeper level. You can just take a little look and understand the type arguments and make sure the type arguments

05:40 are being constrained correctly. Because if we remove the constraints on, let's say group base, for instance, then this is going to just sort of fall apart a little bit. So equals group base option. So if we do that, then it's not going to work. If we say that isMulti doesn't extend a Boolean, then it stops working in various ways.

05:58 So just by copying the API of its type arguments, you can actually get pretty far and build something that works at a really, really decent level.

# 4. Understanding React Query's Overloads

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/09-external-libraries/76-react-query.problem.ts

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/09-external-libraries/76-react-query.problem.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=c74a1714-aa76-447c-8d9c-6504e7063bd1&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0401-understanding-react-querys-overloads-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=c74a1714-aa76-447c-8d9c-6504e7063bd1&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0401-understanding-react-querys-overloads-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## TanStack React Query: An Overview
One of the most famous and widely-used React fetching libraries is TanStack React Query. It's an incredibly powerful tool for primarily used for handling client-side and server-side data fetching.

Here we have a simple `getUser` function which will be used to pass into our `useQuery` hook:

```typescript
import { useQuery } from "@tanstack/react-query";

interface User {
	fullName: string;
	job: string;
}

const getUser = async (): Promise<User> => {
	return Promise.resolve({
		fullName: "Matt Pocock",
		job: "Developer",
	});
};
```

When we pass the `getUser` function into our `useQuery` hook, [`query1.data`](http://query1.data) gets inferred as the result of `getUser`.

This means we can access the full name with `query1.data.fullName`, using optional chaining to handle cases where the data is undefined. We can then display the full name on the front-end once it's fetched.

```typescript
const query1 = useQuery({
	queryFn: getUser,
});

query1.data?.fullName;
```

Now, let's take a look at how we can use `useQuery` with initial data.

We can pass in the `getUser` function as the query function and provide some initial data:

```typescript
const query2 = useQuery({
	queryFn: getUser,
	initialData: {
		fullName: "",
		job: "",
	},
});
```

When passing initial data into `useQuery`, we don't need to check for undefined values because it knows that the initial data is always there.

```typescript
// hovering over query2's useQuery

useQuery<{
    fullName: string;
    job: string;
}, unknown, {
    fullName: string;
    job: string;
}, QueryKey>(options: Omit<UseQueryOptions<{
    fullName: string;
    job: string;
}, unknown, {
    fullName: string;
    job: string;
  ...
```

## Challenge
Open the type definitions for `useQuery` in local VS Code with `CMD + click`, or [view them on unpkg.com](https://unpkg.com/browse/@tanstack/react-query@4.33.0/build/lib/useQuery.d.ts).

There are a lot of overloads in the type definitions for `useQuery`.

Your first task is to look at the first three overloads and determine how they are different from the other six. (Note that some of these overloads are going away as the library progresses, but for now they are several!)

Next, you need to determine why the return type of [`query.data`](http://query.data) is inferred as the return type of `queryFrn`.

Finally, you'll need to figure out why the [`query.data`](http://query.data) type no longer contains `undefined` when you provide initial data to `useQuery`.

## Transcript
00:00 In this exercise, we're going to be looking at one of the most famous, biggest React fetching libraries that's out there, which is TanStack React Query. You've probably used this before, but if you haven't, it's a really powerful library for doing client-side and server-side fetching of data.

00:17 And it can be used for other things, but that's what it's mainly used for, is data fetching. We've got a getUser function here, and of course, this has nothing to do with TanStack, but it provides us a framework for, let's say, calling this on the front-end and getting back some data from a third-party API.

00:33 Now, this getUser function here just returns a full
name, a job, and a promise, and we can use this in our useQuery hook,
passing in our query function. Now, query function here, and query1, we
can see that [query1.data](http://query1.data) actually gets inferred then as our thing down
here, so getUser.

00:53 This means that we can go query1.data.fullName, and with a little optional chaining here because this one is all undefined, and we can then use that in our front-end to display the full name once it's fetched. Very, very cool.

01:07 Now here, we have our useQuery with a query
function, getUser, and we can pass in some initial data here. And the
initial data actually means, which is really, really cool here, we don't
need to, so [query2.data](http://query2.data),

01:22 it doesn't actually require us to check for undefined because it knows that the initial data is always there. If we pass something incorrect here, then it starts to break apart. So query function, object that are all like, query function does not exist, so I'm actually not sure why that's happening.

01:38 We can see, though, that useQuery here is actually like inferring full name and job in there really nicely. So this is really cool behavior. UseQuery, it changes depending on whether you pass in an initial data or not.

01:54 And we can see that on useQuery itself, it's inferring these slots in various areas. So we've got full name, job, and we've got this one here. Now, how is this different to any of the other problems that we've looked at? Well, useQuery has a lot of overloads. It's up to nine.

02:12 I think a lot of them are disappearing, but the main subject of this exercise is to work out what these overloads are doing and how they're different from each other. And specifically, I want you to look at the first three overloads and tell me what's different about them to the other six.

02:31 The first three are doing something interesting that the other six aren't doing. Now, a lot of these overloads are to support different types of APIs that useQuery has supported over the years. And I think in a major version or something, they're going to consolidate them into a single API.

02:48 But I think that one will still have a couple of overloads. So that's your job is to try to work out what the overloads are doing. And as you'll see, they're pretty hairy. There's a lot going on here. So you're going to try and corporate once you define the difference between these overloads. Good luck.

# Solution: Targeting Overloads with useQuery

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/09-external-libraries/76-react-query.solution.ts

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/09-external-libraries/76-react-query.solution.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=009dbeda-2552-441f-9110-9a23640c2597&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0402-understanding-react-querys-overloads-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=009dbeda-2552-441f-9110-9a23640c2597&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0402-understanding-react-querys-overloads-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
Let's start by looking at the [nine overloads for the](https://unpkg.com/browse/@tanstack/react-query@4.33.0/build/lib/useQuery.d.ts) [`useQuery`](https://unpkg.com/browse/@tanstack/react-query@4.33.0/build/lib/useQuery.d.ts) [function](https://unpkg.com/browse/@tanstack/react-query@4.33.0/build/lib/useQuery.d.ts).

Each overload has very similar type arguments: `TQueryFnData`, `TError`, `TData`, and `TQueryKey`:

```typescript
export declare function useQuery<TQueryFnData = unknown, TError = unknown, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey> ...
```

However, calling `useQuery` is going to be slightly different depending on which overload you're using.

The first three overloads take in `queryKey` and `queryFn` and omit them from the options.

The second three are called with `queryKey` then are passed the `queryFn` in the options.

Now that we've looked at the overloads, let's see them in action.

## Targeting Overloads with `useQuery`
The first three overloads are all about passing in a query function which will be our `getUser`:

```typescript
useQuery({
  queryFn: getUser,
})
```

When we add a `queryKey` which will be an array of `user`, we will hit the second overload:

```typescript
useQuery({
  queryKey: ['user'],
  queryFn: getUser,
})
```

Here's a third example that would hit the overloads that are going away:

```typescript
useQuery(["user"], getUser, {})
```

Now let's move on to the initial data aspect.

## Providing Initial Data with `useQuery`
For the first three overloads, we're omitting `initialData` from the `useQueryOptions`.

Here's what it would look like if `initialData` was a function that returns `undefined`:

```typescript
const result = useQuery({
  queryFn: getUser,
  initialData: () => undefined,
});
```

When we pass `initialData` as a function that returns `undefined`, we hit the first overload. The return value of this overload is a `UseQueryResult` with `TData` and `TError`.

This means that [`result.data`](http://result.data) is going to either be `User` or `undefined`.

However, if we pass in the initial data directly, we hit the second overload:

```typescript
const result = useQuery({
  initialData: {
    fullName: '123',
    job: 'developer',
  },
});
```

The return value of this second overload is a `DefinedUseQueryResult`. This result behaves differently from the first overload: Instead of a `User` we have the `TData` which matches the shape of the `initialData`.

## Wrapping Up
When you have multiple polymorphic ways to call your API, you end up with an explosion of function overloads.

We've seen three ways to call `useQuery` that are then multiplied by three different situations for initial data.

The data could be parsed, which would result in a `DefinedUseQueryResult`, or it could be not parsed. In this case, it would be a loading sate.

While the inner workings of `useQuery` are quite complicated, it's not necessary to know how all of it works in order to use it effectively.

However, understanding the underlying mechanics can be helpful if you want to build an abstraction on top of it.

## Transcript
00:00 Okay, let's dive in, see what these overloads are up to. So we can come on click here to see them. And we've got many, many, many of them. Good old nine overloads here. So I'm going to word wrap just to see everything. Now, we start here with a useQuery function. And we can see that all of these overloads, it seems to me, have a very, very similar type arguments on them.

00:19 So if we look here, we can see that there are nine examples of this tQuery function data, tError, tData, and tQueryKey. So all of these have the same type arguments on them. That's a good start because it means that they're consistent. It means that however you call them, they're going to be slightly different. We can see the ones at the bottom

00:38 taking two runtime arguments, or it looks like three. Yeah, three. So this first API that we're seeing here has queryKey, queryFunction, and then options. And the options takes in omit useQueryOptions. Oh, blimey, useQueryOptions.

00:57 And we're passing in all of our type arguments here and we're omitting two things. We're omitting a queryKey. Sorry, I just bumped that down. QueryFunction and initialData. Now, all of those three arguments at the bottom, apart from... Yeah, all of those three overloads at the bottom,

01:16 both taking queryKey and queryFunction and omit them from the options here. And we'll take a look at what initialData is doing in a second. So those are the bottom three. Then these ones here, it takes in queryKey and options omits the options queryKey. So what's the difference here?

01:34 Well, the difference here is that this one in these three overloads, the second three up here, they take in the queryFunction in these options here. So this means you can call it by passing in the queryKey and then passing in the queryFunction in the options. And then this first one up here,

01:51 it just takes in a single argument of the options. So let's just take a look at those just to figure them out. So we have useQuery. The first three overloads are all about just passing in like useQueryFunction and then getUser. And then you can pass in the queryKey here too.

02:09 So the queryKey, I think, is like an array like this, so user. That's the first overload. The second overload... Well, let me just check actually what the course of these overloads are. So the second group of overloads, you can take in the... Where's my word wrap? Yeah, you pass in the queryKey first.

02:28 So we can take this queryKey. And now we are hitting the second overload when we do this. So this is a valid call as well. And the third overload is when we don't do any of those and we instead pass in the queryKey and then the queryFunction and then the options. And so if I pass in the queryFunction here,

02:47 which is getUser, we can then pass in... We then can't pass in queryFunction or queryKey here. So those are the overloads that are going away, as far as I know, is the ones at the end here. But now we need to look at the initial data here.

03:05 And this is a really, really interesting setup because the initial data, as we can see, actually has kind of like three states depending on which overload setup you're in. So in this first three, we can see that we're omitting initial data from these useQueryOptions.

03:23 And we then pass it in as a function which returns undefined. So let's try and hit this overload. Let's see what's going on. So let's go passing in our queryFunction, which is getUser. And we're going to say const result equals this.

03:41 And this result is going to be... Let's pass in initial data, which is a function which returns undefined. Now, if we command click on here, we're going to go to the overload that we're on. And we've managed to hit this overload. And what we can see is that the return value of this is a useQuery result with tdata and tarray.

04:01 Okay, cool. What does that mean? That means that
[result.data](http://result.data) is going to be this or undefined, user or undefined. But
now, if we were to pass in the initial data here, we would hit a
different overload. So we're actually going to hit this overload
instead. And I'll show you.

04:18 So we can actually stick in here a full name and job developer. Now, when we command click on useQuery, we see we don't go to the top overload. We go to the second overload. And we're now hitting this initial data.

04:35 And now, instead of a useQuery result, we hit a defined useQuery result. Let's take a look at them. Defined useQuery result is... Ooh, where'd it go? Defined useBaseQuery results... Ooh, blimey. Defined queryObserverResult.

04:52 QueryObserverSuccessResult is, I think, where we want to look. And you can see that data here is tdata. Whereas if we go back to the useQuery result, we go into useBaseQuery results, we go into queryObserverResult, and we look at tdata here.

05:12 Oh, no, it's down here. We have a loading result here. And the loading result is undefined. So you can see here that if we check for isLoading true, then we're going to see that our data is undefined. But if we look at the defined version, so the defined queryObserverResult,

05:30 actually, we're never in a loading state. We're just in a refetch error or in a success result, which is really cool. So this, we can see, this is absolutely amazing setup, actually. I really love the way they've done this. As we can see, all of the states that are in a normal queryObserverResult, so where you don't have initial data,

05:49 and all of the states where you have data all of the time. So these are the first two overloads here, and it looks like the third overload, if we take a look here, where's the third overload? Yeah, it doesn't omit anything, just lets you parse in all of the useQuery options, and then we get a useQuery result. So we've got then three possible states we're in,

06:08 which is we have initial data, which is defined as something which returns undefined or actually parsed as undefined because we've got an optional thing here, or we've got optional data being parsed either as the query function data or as a function that returns that data.

06:26 And then we've got a mishmash of both because we need kind of this in order to resolve any situations where they could be one or the other. And so it's safe to have a third overload here. Then you can see that all of the other overloads, they just copy that behavior. So the first one of the situation where we're parsing in the query key, it has the same behavior.

06:45 So we've got initial data here and initial data there, and we've got no initial data being omitted from here. And the same situation on this one too, we've got initial data there and initial data on the eighth overload where it's parsing in and inferring tQuery function data.

07:05 So that's so cool, but it does show you kind of how, if you have multiple polymorphic ways to call your API, you get this explosion in function overloads because here we're basically taking three ways to call useQuery. And then we're also timesing that

07:24 by three different situations that initial data could be. It could either be parsed, in which case you get a defined useQuery result, or it could be not parsed. In other words, you get a loading state or it could be kind of like one or the other. In other words, you need a third overload

07:42 just to capture that possibility. So useQuery is extremely complicated as we can see, and knowing how all of this stuff works is not necessary to use it. You can just use it in a normal way, but it might be useful to understand how that works if you want to build an abstraction on top of it.

# 5. Wrapping useQuery

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/09-external-libraries/77-react-query-wrapper.problem.ts

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/09-external-libraries/77-react-query-wrapper.problem.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=3fbd899b-8edc-4813-a2ed-51b6508c58e7&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0501-wrapping-usequery-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=3fbd899b-8edc-4813-a2ed-51b6508c58e7&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0501-wrapping-usequery-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
In this exercise, we will be creating a wrapper around `useQuery`:

```typescript
const useApi = (
	queryKey: any[],
	queryFn: (key: any, token: string) => Promise<any>
) => {
	const token = useAuthToken();

	return useQuery({
		queryFn: (ctx) => queryFn(ctx, token),
		queryKey,
	});
};
```

We are using the object API and wrapping it in a `useApi` function. The `useApi` function will take a token from `useAuthToken`. Then the `queryFn` will take in the key, and it will then pass in the token so that you can use it in your query function.

Here's an example of how we would call it:

```typescript
const query = useApi(["users"], async (ctx, token) => {
	type tests = [
		Expect<Equal<typeof ctx.queryKey, string[]>>,
		Expect<Equal<typeof token, string>>
	];

	return Promise.resolve([
		{
			id: 1,
			name: "Matt Pocock",
		},
	]);
});
```

If you pass in an array of strings to `queryFn`, the type of `ctx.queryKey` should be `string[]`.

## Challenge
Your challenge is to update the type definitions of `useApi` to fix the errors.

To do this, you should use the types and constraints from React Query's type definitions to describe the types of the parameters.

This task is tricky because we need to dive into React Query types again to figure out what type various things should be.

Fortunately, this API is a lot more simple than `useQuery`, since there's no initial data to deal with.

## Transcript
00:00 Let's take a look at one more exercise, which is we're creating a wrapper around useQuery. Now useQuery, what we're doing here is we're using the object API and we're wrapping it in a useAPI function. That useAPI function is going to take a token from useAuthToken,

00:17 and the query function is going to take in the key, and it's going to then pass in the token so that you can then use it in your query function. If we look at here, we should be able to call it with this query key, and then pass in our query function,

00:33 which should have the context and the token here. This is tricky because we're going to need to dive into React Query types again to figure out what type various things should be. Because the API is not exactly the same as useQuery, it's a lot simpler. In fact, we're not having to do any of

00:52 the initial data stuff that we saw in the previous exercise. But we are trying to make sure that if we pass in an array of strings for the query key, then it's going to be typed to string and make sure that the token is typed correctly, and also make sure that the data is typed correctly too. If we're returning promise.resolve ID1 name MapOC,

01:11 then that should be the type that comes back too. Your job is to type this useAPI function, figuring out exactly what types you should use, what constraints you should use from React Query, if any, and make sure that all of our tests pass. Good luck.

# Solution: Handling Type Arguments in a Custom Query Hook

[

github.com

https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/09-external-libraries/77-react-query-wrapper.solution.ts

](https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/09-external-libraries/77-react-query-wrapper.solution.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=81c1d2a4-fa5e-4282-93c2-30e24500f259&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0502-wrapping-usequery-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=81c1d2a4-fa5e-4282-93c2-30e24500f259&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0502-wrapping-usequery-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
Here's our starting point:

```typescript
const useApi = (
  queryKey: any[],
  queryFn: (key: any, token: string) => Promise<any>,
) => {
  const token = useAuthToken();

  return useQuery({
    queryFn: (ctx) => queryFn(ctx, token),
    queryKey,
  });
};
```

The first thing we need to do is determine how many type arguments we need to use in order to make sure that the data from `useQuery` is being inferred correctly.

## Referencing the `useQuery` Overloads
Looking back at [the](https://unpkg.com/browse/@tanstack/react-query@4.33.0/build/lib/useQuery.d.ts) [`useQuery`](https://unpkg.com/browse/@tanstack/react-query@4.33.0/build/lib/useQuery.d.ts) [type definitions](https://unpkg.com/browse/@tanstack/react-query@4.33.0/build/lib/useQuery.d.ts), we can see `TQueryFnData` could be anything since it is typed as `unknown`. We also have `TQueryKey`, which appears to represent the key that you pass in, so we know we want to infer that.

```typescript
export declare function useQuery<TQueryFnData = unknown, TError = unknown, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey>(options: Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'initialData'> & {
...
```

## Updating `useApi`
When adding the type arguments to `useApi`, we don't need to replicate the same order as they appear in the `useQuery` definitions.

Instead, we'll add them in the order they appear in our runtime arguments.

```typescript
const useApi = <TQueryKey, TQueryFnData>(
  queryKey: any[],
  queryFn: (key: any, token: string) => Promise<any>,
) => {
  ...
```

The `queryFn` takes in a key and a token, and returns a `Promise<any>`, which is probably going to return our `TQueryFnData`. We'll also update the `queryKey` will be `TQueryKey`:

```typescript
const useApi = <TQueryKey, TQueryFnData>(
  queryKey: TQueryKey,
  queryFn: (key: any, token: string) => Promise<TQueryFnData>,
) => {
  const token = useAuthToken();

  return useQuery({
    queryFn: (ctx) => queryFn(ctx, token), // error!
    queryKey,
  });
};
```

However, we immediately encounter an error because `queryKey` is supposed to be typed in a certain way, and our inference gets ruined:

```typescript
// hovering over useQuery

useQuery<unknown, unknown, unknown, QueryKey>(
  options: Omit<
    UseQueryOptions<unknown, unknown, unknown, QueryKey>,
    "initialData"
  > & { initialData?: (() => undefined) | undefined }
): UseQueryResult<unknown, unknown> (+8 overloads)
```

We need to constrain the type of the `queryKey` to be an array of strings or an array of numbers.

Luckily, `useQuery` has a type called `QueryKey` that we'll use to constrain the type of `queryKey`:

```typescript
const useApi = <TQueryKey extends QueryKey, TQueryFnData>(...
```

Now we can see that some of the inference issues are resolved, and the errors have disappeared:

```typescript
// hovering over useQuery

useQuery<TQueryFnData, unknown, TQueryFnData, QueryKey>(...
```

## Replacing the `any`
We've still got an issue where the `key` inside of the `queryFn` is typed as `any`, so we'll need to fix that next.

Digging into the `UseQueryOptions` type definition, we can see it extends `UseBaseQueryOptions`, which in turn extends multiple other types including `QueryObserverOptions`. We're interested in its `queryFn` type, which is defined as follows:

```typescript
// inside QueryObserverOptions type definition
queryFn?: QueryFunction<TQueryFnData, TQueryKey>;
```

Then looking at the type definition of `QueryFunction`, we can see it has a `context` of `QueryFunctionContext<TQueryKey>`:

```typescript
export type QueryFunction<
  T = unknown,
  TQueryKey extends QueryKey = QueryKey
> = (context: QueryFunctionContext<TQueryKey>) => T | Promise<T>;
```

Now that we know the correct type for the `key` parameter, we can update our `queryFn` to use the `QueryFunctionContext<TQueryKey>` type and rename the `key` parameter to `ctx` for clarity:

```typescript
const useApi = <TQueryKey extends QueryKey, TQueryFnData>(
  queryKey: TQueryKey,
  queryFn: (
    ctx: QueryFunctionContext<TQueryKey>,
    token: string,
  ) => Promise<TQueryFnData>,
) => {
  const token = useAuthToken();

  return useQuery({
    queryFn: (ctx) => queryFn(ctx, token),
    queryKey,
  });
};
```

Now we've successfully improved our query function to use the correct type for the query key, and resolved all of the errors!

## Wrapping Up
We've updated our `useApi` wrapper to take some of the type arguments from the underlying `useQuery` type definitions. We didn't need to take all of them, just the ones that we needed to make sure that the data from `useQuery` was being inferred correctly.

By constraining the type of `queryKey`, we can avoid strange overloads and typing errors, making our code work as expected.

## Transcript
00:00 Okay, let's give this a go. Now, the question here is how many type arguments do we want to use here? This isn't exactly the same as React Select where we wanted to exactly copy the API. It's got a very, very small API, really, and we just need to make sure that useQuery, the data here, is being inferred correctly.

00:18 So if we take a look at useQuery, these horrible overloads again, we've got tQuery function data, tError, tData, and tQueryKey. There's some useful stuff that we can look at here immediately. We have tQuery function data, which could be anything, and so it's typed as equals unknown.

00:36 And we've got this tQueryKey here, which appears to represent the key that you pass in. So we know that query key is definitely something we need to infer, and probably the query function data is going to be something we need to grab too. So that makes a good argument, therefore, including those as our type arguments.

00:54 We don't need to replicate the same order that they're in or anything like that. In fact, it's probably better if we do them in the order that they appear in our runtime arguments. So let's say we have tQueryKey and then tQuery function data.

01:12 That's going to give us a nice little sort of setup there. Now, query function, it takes in a key and then it takes in a token and returns promise any. And let's take a look here. So this promise any, that's probably going to be returning our tQuery function data there.

01:31 Now, that's nice because it means that this use query then, we're calling our query function and that tQuery function data is going to be put into use query. So that's good already. Now, tQueryKey, where's that going to be inferred? Well, it's going to be put here. Now, query key, we can put that as tQueryKey.

01:49 Now, immediately, we have some issues here because query key, it's supposed to be typed in a certain way. And you can see our inference actually get ruined immediately. Unknown, unknown, unknown query key. That's terrifying. And really, we're expecting this sort of thing that we pass in here to be constrained to a certain level.

02:09 And we know that we want it to be probably an array of strings or an array of numbers. But we also know that use query has got a type that can help us out. We've got up here, where is it? Query key and query key is probably going to be the type that we need to use. So let's grab query key from here and let's say that extends query key.

02:30 OK, now things are looking a little bit tidier. Now we're getting our inference back. When we didn't constrain this, it looked like it was hitting some sort of strange overload that wasn't really working here. Or at least it wasn't making sense of the overload that we're trying to call. And so we got these strange errors. Query function does not exist on that type.

02:48 But now that we're passing query key in there, it seems to be feeling better. It's hitting the overload that it understands and it's starting to work. So now then, everything seems pretty fine here, except we've got query function, like this key any token string. And this key any is not quite right.

03:08 How do we know what this is supposed to take here? Like, I think what this is supposed to take, let's take a look here. This function, where are we even? Yeah, this context here is currently typed as any, but we're actually expecting something specific on here.

03:24 We're expecting that the exact type of this query key should be passed in here as a query key. And if we look at UseQuery itself, and let's actually dive into like, actually, no, not UseQuery result. We want to use UseQuery options.

03:41 And, oh, blimey, extends UseBaseQuery options, which extends a bunch of different things. Context options, QueryObserverOptions, TQueryFunctionData. Let's say QueryObserverOptions. This looks right. We want to find QueryFunction. And here we go. Now we have a QueryFunction, TQueryKey.

04:00 And we come to the correct point here, which is we have context, QueryFunctionContext, TQueryKey. And this QueryFunctionContext, it takes in a couple of different things. We've got a query key, we've got a signal, which might be passed or not, a page param and some meta here too.

04:19 So what we should do is we should actually pass in QueryKey, TQueryKey into there. This means then this key actually isn't correct. It should be CTX. And this CTX should be, what was it? QueryFunctionContext, and we can pass in TQueryKey. Beautiful.

04:40 So now then everything starts working. We've got our context typed correctly, which is the thing that we're supposed to be kind of like passing to this. So CTX is typed correctly. All of our tests are now passing because CTX, we can look at context.queryKey and it's an array of strings.

04:55 So if I pass in like a number here, then this is
actually going to be string or number here, which is really nice. So
we're getting all the inference working. And the thing that we're
getting back from this [Query.data](http://Query.data), we look at that [Query.data](http://Query.data) is the
thing that we expect.

05:11 So [Query.data](http://Query.data) is, let's just look at the first
member of it, and it's ID and name there. Beautiful. So this is a really
nice way that you can create a wrapper around React Query. Notice that
we didn't have to go in and take in all of the type arguments.

05:27 We just selected the ones that we needed, and we found the right types, like inside the library, for like we didn't need to define another version of context or anything like that. We just use the types that were already there, and it seems to work really nicely. Well done.