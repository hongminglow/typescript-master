# Module 3: TypeScript Generics



# (a) Intro to Generics



# 1. TypeScript Generics Workshop Welcome

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=d332c44b-318d-434e-960c-4ec7d0ed0b6b&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="01-typescript-generic-workshop-welcome.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=d332c44b-318d-434e-960c-4ec7d0ed0b6b&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="01-typescript-generic-workshop-welcome.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Explainer
Welcome to the Type Transformations workshop!

This workshop is all about transforming types to other types.

Many problems in TypeScript come down to how to transform one type into another. If you can

figure that out, then a lot of the really advanced TypeScript stuff gets a little bit simpler!

To help you understand, I will present you with a problem and you will try to find the solution.

Then, I'll show you my solution and explain all the steps I took to get there, along with the

concepts you need to understand.

This approach is like working in reverse, where you solve a problem first and then learn the

solution, making it more applicable and easier to understand.

Real-world problems are provided, allowing you to learn the solutions yourself./

Each exercise comes with an embedded editor that you can use on the site or clone the repository

and run the scripts yourself.

You can find the code for the Type Transformations Workshop [on GitHub](https://github.com/total-typescript/type-transformations-workshop).

Thanks for joining, and enjoy!

## Transcript
0:00 What's up, wizards, and welcome to the "Type Transformations Workshop." This workshop is all about transforming types to other types. This is really crucial information because most problems in TypeScript come down to how do I get this type to become this type. If you can figure that out, then a lot of the really advanced TypeScript stuff gets a little bit simpler.

0:23 The way it works, I'll give you a problem, then you try and find the solution, and then I'll show you what my solution was and explain all the steps I take to get there and all the concepts you need to understand.

0:33 It's like it works in reverse. Instead of me just teaching you and you just sitting there, I'm going to try to get you to solve a problem first, and then when I teach it to you, you'll understand exactly how it's applicable.

0:44 This is a crucial part of learning and understanding something, and I've tried to provide you a framework of giving you real-world problems so that you can go and learn the solutions yourself. Each exercise comes with an embedded editor which you can use on the site or you can clone the repo down and run the scripts yourself.

1:00 There'll be a link to the repository in the text below. You've got all the information you need to get started, so thank you for joining along, and enjoy.

# 2. Typing Functions with Generics

[

github.com

https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/01-generics-intro/01-return-what-i-pass-in.problem.ts

](https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/01-generics-intro/01-return-what-i-pass-in.problem.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=53913996-837a-4ef7-9ef0-3b8096dcefb5&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0201-typing-functions-with-generics-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=53913996-837a-4ef7-9ef0-3b8096dcefb5&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0201-typing-functions-with-generics-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
In this exercise, we have a function called `returnWhatIPassIn` which takes a parameter `t` of type `unknown`:

```typescript
const returnWhatIPassIn = (t: unknown) => {
  return t;
};
```

Currently, this is typed as `unknown`, so if you hover over this, it's going to return `unknown` as well.

Because this is typed as `unknown`, anything we pass in will be typed as `unknown` as well:

```typescript
const one = returnWhatIPassIn(1);
const matt = returnWhatIPassIn("matt");
```

This isn't correct - we want it to return `1` if we pass in `1` and `"matt"` if we pass in `"matt"`.

## Challenge

Your challenge is to find a syntax that we can type the function with that will let us return whatever we want.

Check out the [Generics section of the TypeScript docs](https://www.typescriptlang.org/docs/handbook/2/generics.html#handbook-content) for help.

## Transcript
0:00 In this exercise, we have a function called returnWhatIPassIn. What we need to do is anything that we pass this function, we're just going to return it. Currently, this is typed as unknown. If you hover over this, then it's going to return unknown as well.

0:15 This isn't correct. We want it to return 1 if we pass in 1 and return matt if we pass in matt. These two types here are currently being inferred as unknown. Your job is to try to find a syntax that we can type this function with that will let us return whatever we want or rather, return what gets passed in.

0:37 You'll need to look in the generics section in terms of typing a function with a generic type. Good luck.

# Solution: Replace the unknown Type with a Generic

[

github.com

https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/01-generics-intro/01-return-what-i-pass-in.solution.ts

](https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/01-generics-intro/01-return-what-i-pass-in.solution.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=1437a5dc-0366-443a-8180-d71392992ac3&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0202-typing-functions-with-generics-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=1437a5dc-0366-443a-8180-d71392992ac3&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0202-typing-functions-with-generics-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
The solution here is to use a generic type on the `returnWhatIPassIn` function.

To do this, add a `<T>` before the parentheses, then the `t` that is returned will be the same type as `T`:

```typescript
const returnWhatIPassIn = <T>(t: T) => {
  return t;
};
```

To make this more clear we can replace the `t` with `param`:

```typescript
const returnWhatIPassIn = <T>(param: T) => {
  return param;
};
```

Now when we call `returnWhatIPassIn` and pass it `"matt"`, we can see how it is instantiated:

```typescript
// on hover:
const returnWhatIPassIn: <"matt">(param: "matt") => "matt"
```

Note that we don't have to annotate the return type of the function. This is because TypeScript understands that `param` is `T`, and we're returning `param`, so we must be returning `T` from the function.

```typescript
// we don't need the ": T" return type annotation
const returnWhatIPassIn = <T>(param: T): T => {
```

Think of this function as a type helper where you can pass in a type and return a type from it.

## Transcript
0:00 The solution here is to use a generic type on this function here. What you can do is you can add a T into this section of the function just before the arrow parentheses here. We can pass in T as the thing that we're passing in. Then that's going to return T. If we hover over this, we've got a bunch of Ts hanging out here.

0:22 If we make this the param that we've passed in, what we end up with is T. Then param is T. It's returning T, too. The way you can think about this is, "Return what I pass in." We have our T here. Then we return to you. This means that if we have type one, if we say, "Return what I pass in one," then that's going to be typed as one here.

0:47 This is exactly the same thing except we're creating a type helper out of this function. When we call it with different arguments with the one here, or with the return what I pass in mat, you notice that if you hover over them, they get instantiated here, too.

1:05 You can see, "Return what I pass in." We can actually see the thing that's being passed in, param is mat. It returns mat. You notice that I don't actually have to annotate the return type here. I can annotate it like this. I can say, "T gets returned here." I don't need to because TypeScript understands that param is T.

1:24 We're returning param, so we must be returning T from the function. This means that one gets typed as one, mat gets typed as mat. This way of thinking about it is totally correct. You can think of it as a type helper. In other words, it's just making sure that the outer layer of the function, the way that...its public API is basically a type helper now. You can pass in a type and return a type from it.

# 3. Restricting Generic Argument Types

[

github.com

https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/01-generics-intro/02-generic-constraints.problem.ts

](https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/01-generics-intro/02-generic-constraints.problem.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=648b8967-3803-403b-8879-9824c9f93e6d&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0301-restricting-generics-argument-types-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=648b8967-3803-403b-8879-9824c9f93e6d&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0301-restricting-generics-argument-types-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
In this exercise, we start with the `returnWhatIPassIn` function from the previous exercise. It has the `T` and it's basically returning whatever we pass in:

```typescript
const returnWhatIPassIn = <T>(t: T) => {
  return t;
};
```

But now our test is saying it should **only allow strings** to be passed in.

This means that we want to actually constrain the type of `T` to make sure it's only a string.

You could type `t` as a string, but this isn't a solution because in the test the `typeof a` would no longer be the exact type that was being passed in:

```typescript
// Not the solution!

const returnWhatIPassIn = <T>(t: string) => t;
```

## Challenge
Your challenge is to update the function so that the thing that we pass in **must be a string**, but still gets inferred as its literal type.

## Transcript
0:00 In this exercise, we have our returnWhatIPassIn function from the previous exercise. We have our T, and it's basically returning what if we pass in, which is really nice.

0:09 Now our test is saying it should only allow strings to be passed in. This means that we want to actually constrain the type of T to make sure it's only a string.

0:19 We could of course do this, where we could say, "OK, you can pass in a string here," but actually, you end up with a being a string instead of the exact thing that you're passing in.

0:28 Your job is to find a way and find a method of doing this syntax so that the thing that we pass in must be a string but still gets inferred as its literal type.

# Solution: Add Constraints to a Generic

[

github.com

https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/01-generics-intro/02-generic-constraints.solution.ts

](https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/01-generics-intro/02-generic-constraints.solution.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=345ff4ac-1d35-408a-a739-d549efef10ec&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0302-restricting-generics-argument-types-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=345ff4ac-1d35-408a-a739-d549efef10ec&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0302-restricting-generics-argument-types-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
Before we get to the solution, let's refresh our memory on how to specify constraints.

In the type world, the way to add constraints is with the `extends` keyword.

So for a test, we could create a `ReturnWhatIPassIn` type where `T` `extends` string. If we then create an additional `Example` type and give it `123`, we'll see an error:

```typescript
type ReturnWhatIPassIn<T extends string> = T;

// error
type Example = ReturnWhatIPassIn<123>
```

The `returnWhatIPassIn` function from the challenge can use `extends` the same way!

To solve this challenge, add `extends string` to the function's slot:

```typescript
export const returnWhatIPassIn = <T extends string>(t: T) => t;
```

This is something you'll see a lot of in the type world (and we'll continue to hammer this home over the next few exercises!)

## Transcript
0:00 Just like in the previous solution, the right way to think about this is as a ReturnWhatIPassIn type output, where we have a T, and it's a T over here. Now we can say type Example = ReturnWhatIPassIn.

0:15 Let's say we pass in a number, but we don't want to allow numbers to be passed in. Well, the syntax for this in the type world is to say T extends string is to add a constraint on here.

0:27 This means now that we get an error when this is passed in. "Type number does not satisfy the constraint." This is the constraint string. We can do the exact same thing here. We can say T extends string, pass it on there, and now we get all the errors keyed in properly.

0:42 You notice that this slot here is just like something that you would see in the type world. You can do anything that you want to here, and we're going to still keep on hammering this home over the next few exercises.

# 4. Typing Independent Parameters

[

github.com

https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/01-generics-intro/03-multiple-generics.problem.ts

](https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/01-generics-intro/03-multiple-generics.problem.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=6019c42c-fabb-4a8e-a8cb-fa62d386c884&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0401-typing-independent-parameters-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=6019c42c-fabb-4a8e-a8cb-fa62d386c884&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0401-typing-independent-parameters-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
This exercise begins with a `returnBothOfWhatIPassIn` function:

```typescript
const returnBothOfWhatIPassIn = (a: unknown, b: unknown) => {
  return {
    a,
    b,
  };
};
```

It takes two arguments `a` and `b` that are currently typed as `unknown` and returned inside of an object.

## Challenge
Your challenge is to apply the syntax we've used so far to get the two independent parameters typed inside of the of object that is returned.

## Transcript
0:00 In this exercise, we have a returnBothOfWhatIPassIn function. What this does is it takes two arguments here, and we have an a here and 1. This should be typed as a is a and b is 1 here because that's the slots that are coming through here.

0:17 Currently, it's just typed as an object with two unknowns in. Your job is to try and figure out how we can manipulate the syntax we already know to try and get these two independent things in third in the object that's returned.

# Solution: Use Multiple Generics with a Function

[

github.com

https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/01-generics-intro/03-multiple-generics.solution.ts

](https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/01-generics-intro/03-multiple-generics.solution.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=219c1f37-b049-4461-a25f-7de5d0c02df0&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0402-typing-independent-parameters-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=219c1f37-b049-4461-a25f-7de5d0c02df0&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0402-typing-independent-parameters-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
The solution to this challenge is to use multiple generics at once.

In this case, I'll use `A` and `B`.

Here's what `returnBothOfWhatIPassIn` looks like now:

```typescript
const returnBothOfWhatIPassIn = <A, B>(a: A, b: B) => {
  return {
    a,
    b,
  };
};
```

With this change in place, the `result` from the tests that passes in a string and number is typed properly:

```typescript
const result = returnBothOfWhatIPassIn("a", 1)

// on hover:
const result: {
  a: string;
  b: number;
}
```

As seen previously, we could also add `extends` to put constraints on both of the types:

```typescript
const returnBothOfWhatIPassIn = <A extends string, B>(a: A, b: B) => {
```

The big takeaway here is that you can do exactly the same type of things as you can do in a generic function, as you can do in a type helper.

## Transcript
0:00 The solution for this exercise is to basically use multiple generics at once. We can add multiple, just like we did when we were doing a type helper, by adding an A and a B here. We can name these, of course, whatever we want to. Let's say First and Second, for instance. For clarity, let's just say A and B. Then we can assign them to a and b here.

0:23 What happens is that we end up with string and number being inferred here. This is interesting. You would expect this actually to be a and 1 here. When you start using multiple generics and multiple arguments, TypeScript gets more cautious about the way that it infers this stuff.

0:39 If we want it to really infer deeply what's being passed, then we pass in a stronger constraint here. We would say A extends a string. Now it's going to give us a tighter literal sense there. Actually, if you look down here, it's only asking for a string and number, so we're already doing pretty good.

0:58 This is exactly the same, of course. We type ReturnBoth of what I pass in. Let's just say A and B here. Then we say a is A and b is B. This syntax maps on really well. You can do exactly the same type of things as you can do in a generic function as you can do in a type helper.

# 5. Approaches for Typing Object Parameters

[

github.com

https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/01-generics-intro/04-multiple-generics-per-object.problem.ts

](https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/01-generics-intro/04-multiple-generics-per-object.problem.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=026678b0-6a8a-4954-a863-17f3c3860155&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0501-approaches-for-typing-object-parameters-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=026678b0-6a8a-4954-a863-17f3c3860155&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0501-approaches-for-typing-object-parameters-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
Consider this implementation of `returnBothOfWhatIPassIn`:

```typescript
const returnBothOfWhatIPassIn = (params: { a: unknown; b: unknown }) => {
  return {
    first: params.a,
    second: params.b,
  };
};
```

This time the function takes in a `params` object that includes `a` and `b`.

## Challenge
Similar to before, your challenge is to use generic syntax so that `a` is typed as a string and `b` is typed as a number.

## Transcript
0:00 We have another function here called returnBothOfWhatIPassIn, where we're taking this time as a params object, where you need to pass in an object where A is A and B is B. It's expecting to infer just exactly the same as the previous exercise where you have first as string and second as number.

0:19 A is being passed to first and B is being passed to second. Your job is to work out how to type this using generic syntax.

# Solution: Approaches for Typing Object Parameters

[

github.com

https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/01-generics-intro/04-multiple-generics-per-object.solution.1.ts

](https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/01-generics-intro/04-multiple-generics-per-object.solution.1.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=4e10ec11-e958-4834-8fb9-5786e115b606&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0502-approaches-for-typing-object-parameters-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=4e10ec11-e958-4834-8fb9-5786e115b606&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0502-approaches-for-typing-object-parameters-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
There are multiple solutions to this challenge.

## Solution 1
The first solution is to add two generic parameters and replace the `unknown`s inside of the object:

```typescript
const returnBothOfWhatIPassIn = <T1, T2>(params: { a: T1; b: T2 }) => {
  return {
    first: params.a,
    second: params.b,
  };
};
```

This approach also allows us to go deeper into the arguments and use `extends` and supply an object:

```typescript
const returnBothOfWhatIPassIn = <T1 extends { a: string, b: number }, T2>(params: { a: T1; b: T2 }) => {
  ...
```

We'll discuss this more later on.

## Solution 2
The technique in the first solution works really well when combined with type helpers.

For example, we could create an interface for `Params` that declares its own type arguments. From there, the generic syntax will infer `A` and `B`:

```typescript
interface Params<T1, T2> {
  a: T1;
  b: T2;
}

const returnBothOfWhatIPassIn = <T1, T2>(params: Params<T1, T2>) => {
  return {
    first: params.a,
    second: params.b,
  };
};
```

## Solution 3
The third solution is similar to the above, except this time uses a type for `Params` instead of an interface:

```typescript
type Params<T1, T2> = {
  a: T1;
  b: T2;
};
```

You can use type helpers like this across your entire application, and the generic syntax will infer all of their positions.

## Transcript
0:00 There are multiple solutions to this problem, but here is the first. We first of all select two generic parameters because we've got two things being passed in.

0:09 You notice we don't have to say, "OK, this params is the thing we're passing in here." We can actually go deeper into that argument and say, "This piece of it is what I want you to infer."

0:22 We could do this if we want to. We could say T1, for instance. Then this has to extend a string, or a any, b any, like this, and this all seems to work. We will get onto this approach later as an alternative way of doing it.

0:39 This one I wanted to show because it shows how flexible you can be with these declarations. You specify all of the things you want to infer here. Then you go deeper into the object and say, "These are the slots that I want these inferences to appear in."

0:58 This is really great because when you hover over this, you can see what they're being inferred as. We have a string, number, and that maps onto a being a string and b being the number. If I change this to a Boolean, then this will be inferred there, too, boolean, number. That's really, really cool.

1:16 This gets even nicer when you combine this with type helpers. Here we have T1, T2. These are the things that you can infer. We can actually specify Params here as an interface that lives somewhere else, that declares its own type helpers here, its own type arguments, and then it will infer the positions of a based on this.

1:37 This works for types, too, and means that you can create these type helpers that span your entire application, and the generic syntax will infer all the positions of them. So cool.

# 6. Generic Functions in Excalidraw

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=07dab137-a976-4e45-9284-45b242db1b46&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0601-generic-functions-in-excalidraw.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=07dab137-a976-4e45-9284-45b242db1b46&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0601-generic-functions-in-excalidraw.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Explainer
Inside of [`gestures.ts`](https://github.com/excalidraw/excalidraw/blob/master/src/gesture.ts#L14)[, in the Excalidraw codebase](https://github.com/excalidraw/excalidraw/blob/master/src/gesture.ts#L14) is a beautiful example of of the concepts we've explored so far.

The `sum` function takes in an array and a `mapper` function as arguments. Inside of the function, the array is reduced over and turned into a number by calling the `mapper` function:

```typescript
const sum = <T>(array: readonly T[], mapper: (item: T) => number): number =>
  array.reduce((acc, item) => acc + mapper(item), 0);
```

To test it out, let's create an array of strings of `'1'`, `'2'`, and `'5'`:

```typescript
const arr = ['1', '2', '5'];
```

We can then create a `result` variable that will be the result of calling `sum` with our `arr` array and a mapper function that calls `parseInt` on each item:

```typescript
const result = sum(arr, (item) => {
  return parseInt(item);
})
```

The `sum` function will reduce through everything and give us a `result` of 8 as a number.

Note that `sum` doesn't know the literal types that we pass in, but it does know that it returns a number.

To show this in action, we could add an object to our `arr`:

```typescript
const arr = ['1', '2', '5', {
  wow: 14123123123
}];
```

Now when hovering over `arr` we would see that it's typed as either an array of strings or an object with a key of `wow` whose value is a number:

```typescript
// on hover
const arr: (string | {
  wow: number;
})[]
```

In order for this to work, we'd have to update the mapper function inside of our `result` to return [`item.wow`](http://item.wow) if the key is present on the `item`:

```typescript
const result = sum(arr, (item) => {
  if (typeof item === 'object' && 'wow' in item) {
    return item.wow
  }

  return parseInt(item);
})
```

This example should give you a strong sense of what's possible with generic functions.

There are tons of examples like these throughout the Excalidraw repo as well as many others.

Understanding this syntax and the functionality it enables is a critical part to understanding application code.

## Transcript
0:00 We're inside the Excalidraw project here. I found this beautiful function called sum, which really shows a lot of the basics with generics and how they can be used really effectively. What sum does is it takes in an array and also a mapper function for the array.

0:17 What it does is it basically reduces the array by turning it into a number. It sums up all of the members of the array while you can also provide a custom function to basically get the number out of that. What we can do is we can say -- let's imagine that we have an array here -- "Constant R equals..."

0:37 Let's say we have an array of numbers here. We could say one, two, three, five. Now we could say, "Constant result equals sum, R." Let's say our mapper is to take the item...and this item is inferred as a string here because all of these things are strings. We can say, "Return pass int item."

0:59 What that's going to do is it's going to iterate through all of the pieces here, and reduce them altogether. We're going to get, basically, eight as a number. It doesn't, of course, know that exactly on the literal types. It knows that it returns a number because we can see there that it's returning a number.

1:16 If I were to change this, if I were to add a
different member to this array, we would say...let's say we have an
object in here which is wow where we have this, then suddenly inside
this slot instead of just being string, it would say string or wow
number. We could say, let's say, "Wow in item." Then we would say,
"Return [item.wow](http://item.wow)."

1:41 Otherwise, we're going to pass the end there. "Must not be a primitive." That's fun. What we would do is we would say, "If type of item equals object and wow in item, then we're good to go." This gives you a really, really strong sense of what's possible with these generic functions.

2:03 There were just tons and tons all throughout this repo and others that I looked at, too. It's a critical part of understanding application code and being able to imagine having this just beautiful function that you can just take to any complicated array and just grab all of the sum of it. Really, really nice.

# 7. Generics in Classes

[

github.com

https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/01-generics-intro/05-generics-in-classes.problem.ts

](https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/01-generics-intro/05-generics-in-classes.problem.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=b6d31f0e-9d65-44df-8e1f-d6651fa01d72&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0701-generics-in-classes-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=b6d31f0e-9d65-44df-8e1f-d6651fa01d72&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0701-generics-in-classes-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
Now let's take a look at classes.

This class component has a `props` attribute, which is currently being typed as `unknown`.

Inside the constructor, you have to pass it `props` which are then assigned to `this.props`. There is a `getProps` function that will return the props.

For now, the `props` are being typed as `unknown`:

```typescript
export class Component {
  private props: unknown;

  constructor(props: unknown) {
    this.props = props;
  }

  getProps = () => this.props;
}
```

Inside of our test we have a new `Component` that is being passed in props of `{ a: 1, b: 2, c: 3 }`:

```typescript
const component = new Component({ a: 1, b: 2, c: 3 });
```

The test expects that the `result` of calling `component.getProps()` should be an object where `a`, `b`, and `c` are all `number`.

## Challenge

Your challenge is to update the `Component` class so that we are able to pass in `props` with any shape.

## Transcript
0:00 Let's look at classes next. We have a Component class here that has a props attribute which is currently being typed as unknown. Inside the constructor, you have to pass it props. It then assigns props that you pass in, and it has a function that returns getProps.

0:17 Currently, we have a component that we're passing in a 1, b 2, c 3. We're getting this Component, and it's a class, basically. That result, though, is typed as unknown, and we're expecting the result to equal the type of a number, b number, and c number.

0:33 Your job is to figure out when we call this component, we want to technically be able to pass any shape of props, which sounds like a generic, and your job is to try and work out how to make props generic.

# Add Types to a Class

[

github.com

https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/01-generics-intro/05-generics-in-classes.solution.ts

](https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/01-generics-intro/05-generics-in-classes.solution.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=a9e9339e-0097-4925-995c-13035afb7f1c&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0702-generics-in-classes-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=a9e9339e-0097-4925-995c-13035afb7f1c&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0702-generics-in-classes-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
The solution here is to open up a generic slot just after the `Component`. In this case I'll call it `TProps`. This type argument lets us infer what's being passed into the constructor, so we can update the `unknown` `props` type to be `TProps`. We'll do the same in the constructor as well:

```typescript
export class Component<TProps> {
  private props: TProps;

  constructor(props: TProps) {
    this.props = props;
  }

  getProps = () => this.props;
}
```

The way the chain works in classes is first the types get inferred from the constructor, then the private properties.

So it might make more sense to reorder the class above so it more closely resembles the order:

```typescript
export class Component<TProps> {
  constructor(props: TProps) {
    this.props = props;
  }
  
  private props: TProps;

  getProps = () => this.props;
}
```

Now if we change the types in our test so that `a` is a string, everything will be typed as expected:

```typescript
const component = new Component({ a: '1234', b: 2, c: 3 });

const result = component.getProps();

type tests = [
  Expect<Equal<typeof result, { a: string; b: number; c: number }>>,
];
```

This is a really nice way to use generic types when working with classes. They're also quite stable because they really just infer once when you first instantiate the class.

You'll see this pattern often in open source libraries, but it also shows up in application code as well.

## Transcript
0:00 The solution here is to open up a generic slot just here. This Type argument let us infer what's being past into the constructor. We can say TProps is here. Now when we call component, you notice that this is being inferred in the right slot.

0:17 Currently, result is still unknown because this.props is still typed as unknown. What we can do is we can say TProps is also the same type as this. The way that this chain works is it gets inferred from the constructor, so when you call it. Then the thing that it returns has these properties.

0:38 It's slightly strange to work out the flow here, but that's the flow. Constructor first. Then that gets inferred as those private properties. We can change this of course. We can say A blah, blah, blah. A is a string. Then this will be typed as A string, B number, C number.

0:54 This is really cool. These are often a really nice place to put your generic types. Because they infer just once really when you instantiate the class, it makes them quite stable. This is a pattern that you'll see often in open source libraries but also in application code too.

# 8. Generic Mapper Function

[

github.com

https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/01-generics-intro/06-generic-mapper.problem.ts

](https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/01-generics-intro/06-generic-mapper.problem.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=501f2f84-b4ac-4551-ac81-627b1f2cbb77&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0801-generic-mapper-function-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=501f2f84-b4ac-4551-ac81-627b1f2cbb77&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0801-generic-mapper-function-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
In this exercise, we're going to look at a practical use case for generics.

Consider this `concatenateFirstNameAndLastName` function. It spreads in the `user` and then returns `fullName` as `user.firstName` and `user.lastName`:

```typescript
export const concatenateFirstNameAndLastName = (user: unknown) => {
  return {
    ...user,
    fullName: `${user.firstName} ${user.lastName}`,
  };
};
```

When we map over a set of users and call the function, we want the new user to equal the `firstName` and `lastName` and also the `fullName` here too while retaining the other properties that have been passed in here.

For example, one of the tests includes an `id` along with the name properties:

```typescript
const users = [
  {
    id: 1,
    firstName: "Matt",
    lastName: "Pocock",
  },
];
```

## Challenge
Your challenge is to update the `concatenateFirstNameAndLastName` so that it makes sure the `user` we pass in has a `firstName` and `lastName` that are properly typed as strings while allowing other properties to retain their types.

## Transcript
0:00 In this exercise, we're going to look at practical use case for these generics. We have a mapping function here called concatenate first and last name where we're basically spreading in the user. Then we're returning full name as user.firstName and user.lastName.

0:15 Now, what this means is that when we map over a set of users, we want to basically say, "The new user should equal the first name and last name and also the full name here, too." It should also retain other properties that have been passed in here. It shouldn't delete anything, right?

0:34 We can see from actual our runtime inputs here that it's not going to delete anything. It's just going to spread the thing in and add the full name. The types don't know that. We also need to make sure that the thing that we pass in, it has a first name and a last name on it.

0:52 That's your job is to make this. We're definitely going to need a generic on here. We're probably going to need a constraint, too, to make sure that it's first name and last name. That's your job. Good luck.

# Solution: Add Object Property Constraints to a Generic

[

github.com

https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/01-generics-intro/06-generic-mapper.solution.ts

](https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/01-generics-intro/06-generic-mapper.solution.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=a52d1d83-2348-480d-b75a-304ec1835fbc&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0802-generic-mapper-function-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=a52d1d83-2348-480d-b75a-304ec1835fbc&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0802-generic-mapper-function-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
Let's take this solution step-by-step.

## Add the Generic
The first thing to do is add the generic, which in this case will be `TUser`:

```typescript
export const concatenateFirstNameAndLastName<TUser>(user: TUser) => {
  return {
    ...user,
    fullName: `${user.firstName} ${user.lastName}`,
  }
```

With this change in place, we can hover and see that our test `user` with the `id` shows the types we would expect:

```typescript
const newUsers: ({
  id: number;
  firstName: string;
  lastName: string;
} & {
  fullName: string;
})[]
```

However, we're getting errors inside of the `concatenateFirstNameAndLastName` function that `firstName` and `lastName` properties do not exist on `TUser`.

This error makes sense, because just like when using type helpers it defaults to `unknown`.

## Add Constraints
We need to say that whatever `TUser` is, it is an object that contains `firstName` and `lastName` properties that are both strings.

To do this, we'll use the trusty `extends` keyword:

```typescript
export const concatenateFirstNameAndLastName = <
  TUser extends { firstName: string; lastName: string },
>(
  user: TUser,
) => {
  return {
    ...user,
    fullName: `${user.firstName} ${user.lastName}`,
  };
};
```

With this change in place, TypeScript will yell at us if we don't include the required properties. This becomes a quick fix though thanks to VS Code now being able to autocomplete the property names.

## Optionally Declaring the Return Type
Note that with code above that we have successfully solved the challenge without having to explicitly declare the return type.

If you wanted to, you could say that we're returning `TUser` and adding a property to it that is a `fullName` string:

```typescript
export const concatenateFirstNameAndLastName = <
  TUser extends { firstName: string; lastName: string },
>(
  user: TUser,
): TUser & {
  fullName: string;
} => {
```

However, if you hover over `concatenateFirstNameAndLastName` you'll find that the same thing is displayed whether we declare the return type or not.

TypeScript is clever enough to infer it itself!

## Transcript
0:00 The solution to start with for any generic function is to add the generic. I'm going to call this T user. Now, we're going to pass in T user to here. This starts to make a bit of sense. We start getting some good stuff here. We can see the new users now, our ID number, first name, last name, and full name here.

0:22 This means that if we grab this new user, constant new user equals new users, the first one, then what we're going to see here is we have our fully decked-out object. All of the right properties are being put in. Except we're getting an error here because property first name does not exist on type T user.

0:43 Just like when you use a type helper, this is going to default to unknown. In other words, it doesn't actually know what type this is going to be. We need to constrain it to say that it has to extend first name string and last name string.

1:02 Whatever T user is, it is an object that has these properties with this and this. This means that we can basically autocomplete our way there to inside the function, which is really nice. Also, it means that if we try to pass in anything that doesn't have all the right stuff, then it's going to yell at us because last name is missing in "Type first name" here.

1:22 Whatever T user is, it is an object that has these properties with this and this. This means that we can basically autocomplete our way there to inside the function, which is really nice. Also, it means that if we try to pass in anything that doesn't have all the right stuff, then it's going to yell at us because last name is missing in "Type first name" here.

1:39 We could do if we want to. We could say we're returning T user. We're adding a property to it. We're adding full name string here, which is really, really nice. You might also want to say we're emitting full name from the user, which is a thing that we're doing. It's not declared in the types by default.

2:03 What you get then is you don't actually need to declare this. We hover over this. We look at it, T user and full name string. If we remove this...and TypeScript actually infers this itself, really, really clever.

# 9. The Importance of Generics in TypeScript

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=c585ab72-a688-4877-b3c4-2b063bc3600f&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0901-the-importance-of-generics-in-typescript.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=c585ab72-a688-4877-b3c4-2b063bc3600f&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0901-the-importance-of-generics-in-typescript.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Explainer
Orta Therox, an ex-TypeScript team contributor, answers a question about what TypeScript would be like without generics.

He explains that TypeScript's complex structural type system needs the ability to reuse fields provided by generics. Without them, types would be longer and more repetitive.

He also compares his experience using Objective-C, which relies on a different type system called nominal types.

## Resources

[

github.com

https://github.com/microsoft/TypeScript

](https://github.com/microsoft/TypeScript)

[

www.typescriptlang.org

https://www.typescriptlang.org/docs/handbook/intro.html

](https://www.typescriptlang.org/docs/handbook/intro.html)

[

twitter.com

https://twitter.com/orta

](https://twitter.com/orta)

## Transcript
0:00 As part of the interviews for Total TypeScript, I interviewed Orta Therox, who's an ex-TypeScript team contributor and helped to write a lot of the handbook, and I asked him a really interesting question. I asked him what would Typescript look like without generics?

0:15 Oof! You can't make a type system that is as complicated and feature-rich as TypeScript without generics. It's just like, as a structural type system, which means the type system that checks every single field to see if they match the other thing that it's been compared against, you just come to a point where you need the ability to reuse fields in some way.

0:44 If you didn't have that, your types would be incredibly long and incredibly large amounts of overlapping code between each of them. So generics gives you that reusability that is kind of essential to build any sort of complicated type system.

1:01 I mean, I say that, but I used Objective-C for about ten years and it does not have generics. It has a thing called lightweight generics. We got by, but you needed a type system in that case that's nominal, wherein every single class has a unique type that, if you compare a type of an animal to the type of a dog, those two are always different.

1:23 Whereas in TypeScript they could be the exact same and they could be treated the exact same in different cases...

# Resources

[

www.typescriptlang.org

https://www.typescriptlang.org/docs/handbook/2/generics.html#handbook-content

](https://www.typescriptlang.org/docs/handbook/2/generics.html#handbook-content)

[

www.typescriptlang.org

https://www.typescriptlang.org/docs/handbook/2/functions.html#unknown

](https://www.typescriptlang.org/docs/handbook/2/functions.html#unknown)

[

www.typescriptlang.org

https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-constraints

](https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-constraints)

[

www.typescriptlang.org

https://www.typescriptlang.org/docs/handbook/2/classes.html

](https://www.typescriptlang.org/docs/handbook/2/classes.html)

[

github.com

https://github.com/excalidraw/excalidraw/blob/master/src/gesture.ts

](https://github.com/excalidraw/excalidraw/blob/master/src/gesture.ts)

[

www.totaltypescript.com

https://www.totaltypescript.com/workshops/type-transformations/type-helpers/functions-as-constraints-for-type-helpers/solution

](https://www.totaltypescript.com/workshops/type-transformations/type-helpers/functions-as-constraints-for-type-helpers/solution)

# (b) Passing Type Arguments



# 1. Add Type Parameters to a Function

[

github.com

https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/02-passing-type-arguments/07-create-new-set.problem.ts

](https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/02-passing-type-arguments/07-create-new-set.problem.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=e1bf3119-352b-454c-8a4a-1e2e202ec504&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0101-add-type-parameters-to-a-function-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=e1bf3119-352b-454c-8a4a-1e2e202ec504&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0101-add-type-parameters-to-a-function-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
In this exercise, we have a function called `createSet` which returns a `Set` which can only contain unique values:

```typescript
export const createSet = () => { return new Set(); };
```

We also have a `stringSet`, a `numberSet`, and an `unknownSet` that each pass in a type argument to `createSet`:

```typescript
const stringSet = createSet<string>();
const numberSet = createSet<number>();
const unknownSet = createSet();
```

## Challenge
As of right now, the tests we have don't pass. This `stringSet` is supposed to be `Set<string>` and the `numberSet` is supposed to be `Set<number>`, but both are `Set<unknown>`. But hey, at least `unknownSet` is happy with being `Set<unknown>`!

Your challenge is to figure out how to update the `createSet` function so that everything behaves as expected.

## Transcript

0:00 In this exercise, we have a function called createSet, and createSet just returns a Set. If you don't know what a Set is, it's just a part of JavaScript. It's like a unique set of values. We have a stringSet here, a numberSet and an unknownSet, and we're passing in a type argument here to createSet. OK, that's interesting.

0:22 This stringSet we can see here it's supposed to be Set<string> but actually it's Set<unknown>. This one is supposed to be Set, but it's Set. This one, we're happy with it, being Set. Your job is to figure out what this syntax is all about and how we can change this function to make this syntax behave as expected.

# Solution: Pass Type Arguments to a Function

[

github.com

https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/02-passing-type-arguments/07-create-new-set.solution.ts

](https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/02-passing-type-arguments/07-create-new-set.solution.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=42f51763-270b-4fbb-a97a-7056b7266550&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0102-add-type-parameters-to-a-function-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=42f51763-270b-4fbb-a97a-7056b7266550&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0102-add-type-parameters-to-a-function-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
Before we start the solution, let's look at the errors we get from `stringSet` and `numberSet`:

```typescript
const stringSet = createSet<string>();
const numberSet = createSet<number>();
```

Hovering over each of these, we see the following error message:

```typescript
Expected 0 type arguments, but got 1.
```

This error message tells us that the `createSet` function doesn't accept type arguments.

We can fix this by adding a `<T>` to the function:

```typescript
export const createSet = <T>() => {
  return new Set();
};
```

Now that first error is fixed, but there are still errors in our actual tests.

These can be satisfied by making sure that the `Set` that is being returned is of the right type, which we can do by adding the `<T>` to it:

```typescript
export const createSet = <T>() => {
  return new Set<T>();
};
```

Our tests now pass!

## A closer Look at Set
In VS Code you can hold `CMD` on Mac or `CTRL` on Windows and click `Set` to go to its definition.

What we find is that `Set` is an interface that has a `<T>` on it:

```typescript
interface Set<T> { 
  ...
```

It is like a type helper that has been implemented globally as a class.

Back in the code editor, let's do an experiment.

Create a new set with a specified type of string:

```typescript
const set = new Set<string>();
```

Now if you call `set.add()` and pass it in a number, you'll see an error that type number is not assignable to paramater of type string:

```typescript
// error
set.add(123123)
```

However, if you change the declaration of the new Set to not have a type, it will default to `unknown` and the error will go away.

```typescript
const set = new Set(); 

// essentially the same as
// const set = new Set<unknown>();
```

Think of `unknown` as the default argument type for all of TypeScript.

In the case of our Set example, we can pass anything into `set.add()`, which is probably not desirable.

But this is a really interesting problem because we have a generic slot that's not actually inside the arguments.

## An Alternative Approach to Type Arguments
Back up in the `createSet` function, we could update it to add an optional `initialValue` of `T`.

```typescript
export const createSet = <T>(initialValue?: T) => {
  return new Set<T>();
}
```

With this change in place, the `stringSet` and `numberSet` don't have to have their type arguments specified:

```typescript
// before
const stringSet = createSet<string>();
const numberSet = createSet<number>();

// after
const stringSet = createSet('123');
const numberSet = createSet(456);
```

This technique is great for adding type safety to built-in types like `Set` or `Map` that don't specifically tell you that they require you to pass in a type argument.

## Transcript
0:00 The solution here is to first of all, add a generic onto createSet. The error that we're getting here is "Expected type arguments, but got 1." This here is a type argument that's being passed to a function. We can grab the T here.

0:16 This satisfies this area here. We now know that createSet will manually pass in the type argument there of string to it. What we need to do is make sure that the Set that's being returned, is of the right type. What we can do is we can actually pass in the type into the Set here.

0:35 This Set that we Command-click on to it. Then it's actually an interface that's implemented globally and you can see that it has a T on it. It has a type argument that you can pass it. This is a type helper basically, but it's also being implemented in the global scope as a class.

0:52 We have various things like add and delete, etc., that all come from this T inference here. Usually, when you create a new set, let's say we have set = new Set, then we will be able to pass it like a string. Then you'll be able to say set.add(124123).

1:11 Then this would be an error and it certainly will be when my TS server catches up to me. You can see "Argument of type 'number' is not assignable to parameter of type 'string'." Whereas if we change this to number, then it's going to work. What if we don't pass it anything?

1:24 Well, TypeScript will try to infer what's happening here. If it can't infer it, then what it's going to do is it's basically just going to say Set<unknown>. Unknown is like the default argument type for all of this TypeScript stuff.

1:41 We have set.add. This means that we can pass anything into here, right? Which is probably not desirable, but this is a really interesting problem because we have a generic slot here that's not actually inside the arguments.

1:55 If we added initialValue, for instance, and this had to be T, then we wouldn't need to pass in a type argument here because we could just go like blah, blah, blah. Then this would be blah, blah, blah. Then we would have our number inferred and also our string inferred too.

2:15 This use case when you don't have an initial value or maybe the initial value is not required, then this means that you end up with a cool way of adding these type arguments in yourself, which is this syntax here.

2:31 You'll find this come up with a lot of different use cases that you might want to implement, but also in like the built-in types with Set and Map and all of these different things. They often require you to pass in a type argument, even if they don't say that they require you to in order to make them type save.

# 2. Defaults in Type Parameters

[

github.com

https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/02-passing-type-arguments/08-default-generics.problem.ts

](https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/02-passing-type-arguments/08-default-generics.problem.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=53a3529a-c604-440b-84d8-e14f86c6c599&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0201-defaults-in-type-parameters-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=53a3529a-c604-440b-84d8-e14f86c6c599&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0201-defaults-in-type-parameters-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
Let's continue from where the previous exercise left off.

We have the `createSet` function that passes the generic `T` into a Set:

```typescript
export const createSet = <T>() => {
  return new Set<T>();
};
```

Like before, the `numberSet` and `stringSet` work as expected:

```typescript
const numberSet = createSet<number>();
const stringSet = createSet<string>();
```

This time, instead of `otherStringSet` being `unknown` our test expects it to be typed as `string`:

```typescript
// hovering shows `const otherStringSet: Set<unknown>`
const otherStringSet = createSet();


// inside of tests:
Expect<Equal<typeof otherStringSet, Set<string>>>
```

## Challenge
Your challenge is to work out how to specify a default value. When a type argument isn't passed in, it should be resolved as `string`.

## Transcript
0:00 This exercise starts where the previous exercise ended, where we have a createSet function, which is passing our generic into our Set here, and this works for number and for string. Now, instead of expecting this one to be unknown -- Set<unknown>, rather -- we're actually expecting it to be Set<string>.

0:21 Your job is to try and work out what the default or how to specify a default in this whole setup so that when we don't pass the type argument here, it gets resolved as string.

# Solution: Specify a Default Value

[

github.com

https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/02-passing-type-arguments/08-default-generics.solution.ts

](https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/02-passing-type-arguments/08-default-generics.solution.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=a42b0e8c-a930-4f4a-8a0e-543a9dbc933e&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0202-defaults-in-type-parameters-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=a42b0e8c-a930-4f4a-8a0e-543a9dbc933e&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0202-defaults-in-type-parameters-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
The solution here is to use a default generic.

Recall how setting a default worked with a type:

```typescript
type CreateSet<T = string> = Set<T>;
```

With the syntax above, if we were to create a new `Result` type from `CreateSet` without passing in a type argument, `Result` would end up as a string:

```typescript
// hovering shows `type Result Set<string>`
type Result = CreateSet;
```

Setting a default for a generic works in a similar way:

```typescript
export const createSet = <T = string>() => {
  return new Set<T>();
};
```

Now when `createSet` is called without a type argument, it will resolve as a string.

## Transcript
0:00 The solution here is to use a default generic. Just like if we had a type CreateSet type helper, where we would say Set and we'd say it's a T here. Then we would say type Result = CreateSet<number>. We can actually just not pass anything into here and default this to string. Result would be set to string.

0:25 We can use this syntax and just stick it up here and now this is going to work because it knows that if you don't pass a type argument, then its default value should be string. Otherwise, it's going to default to unknown. This works exactly the same way in this context, as it does in a type helper context.

# 3. Infer Types from Type Arguments

[

github.com

https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/02-passing-type-arguments/09-generics-in-type-arguments-in-arguments.problem.ts

](https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/02-passing-type-arguments/09-generics-in-type-arguments-in-arguments.problem.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=eb79e74a-317e-45d7-9905-662539ab46ae&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0301-infer-types-from-type-arguments-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=eb79e74a-317e-45d7-9905-662539ab46ae&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0301-infer-types-from-type-arguments-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
Here we have a `Component` class that can be passed in `TProps`.

Inside of the constructor it assigns `props` to `this`, and provides a `getProps` method that can be called that will extract those `props` out:

```typescript
export class Component<TProps> {
  private props: TProps;

  constructor(props: TProps) {
    this.props = props;
  }

  getProps = () => this.props;
}
```

This generic class works as expected.

The problem comes when we try to clone the component using the `cloneComponent` function:

```typescript
const cloneComponent = (component: unknown) => {
  return new Component(component.getProps());
};
```

When creating a `clonedComponent` by passing a `Component` instance, the type is being returned as an `any` type:

```typescript
const component = new Component({ a: 1, b: 2, c: 3 });

// hovering shows `const: clonedComponent: Component<any>
const clonedComponent = cloneComponent(component);
```

Notice also that there is an error inside of `cloneComponent` that "Object is of type 'unknown'".

## Challenge
Your challenge is to make it so when we get the `props` from the cloned component, they are exactly the same as the original. In this case, we should get `a: number, b: number, and c: number`.

Hints: You shouldn't edit the `Component` class, but instead make the `cloneComponent` function generic. The function should be given a way of understanding the props for the `Component` being cloned, and have a way of returning them.

## Transcript
0:00 In this exercise, we have a Component class, which is generic, where you're able to pass in TProps whenever you build a constructor here. What it does is it assigns props to here and it means that you can call getProps to just extract those props out.

0:17 This is all working. This seems fine. This means that our component is generic. Whatever we pass in here gets put into the type here, but when we clone the component, it's being returned as Component<any>. Whereas it should actually be the component type that's here. That's because our component that we're passing in is unknown and we're getting a sort of funky error here too.

0:38 We should also be able to grab the props from that clonedComponent, and they should be exactly the same type as this, { a: 1, b: 2, c: 3 } or rather { a: number; b: number; c: number } here.

0:52 That's your job, is to work out how to type this function in order...It's probably going to need to be a generic function, but we need to somehow understand what the props are of the component that we're passing in and then be able to return those when we grab the props there.

# Solution: Infer from the Type Arguments of a Class

[

github.com

https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/02-passing-type-arguments/09-generics-in-type-arguments-in-arguments.solution.ts

](https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/02-passing-type-arguments/09-generics-in-type-arguments-in-arguments.solution.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=fb92bf34-5053-4345-bbcd-64402b3f9066&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0302-infer-types-from-type-arguments-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=fb92bf34-5053-4345-bbcd-64402b3f9066&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0302-infer-types-from-type-arguments-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
The solution here is interesting, so we'll take it step by step.

We know that `cloneComponent` probably needs to be a generic function because we when we pass in `Component<any>`, the thing that gets returned is also `Component<any>`. It follows then that the `result` of calling `cloneComponent` is also going to be typed as `any`.

```typescript
// hovering shows `const cloneComponent: (component Component<any>) => Component<any>
const cloneComponent = (component: Component<any>) => {
  return new Component(component.getProps());
};

const clonedComponent = cloneComponent(component);

// hovering shows `const result: any`
const result = clonedComponent.getProps();
```

The thing that is generic here is the `props` that are inside of the `Component`. The `props` are the dynamic part of this situation.

Knowing this, we can add a `<TProps>` to the `cloneComponent` function:

```typescript
const cloneComponent = <TProps>(component: Component<any>) => {
  return new Component(component.getProps());
};
```

With this change in place, let's do an experiment where we manually assign the props for our `clonedComponent`.

```typescript
// Before
const clonedComponent = cloneComponent(component);

// After
const clonedComponent = cloneComponent<{
  a: number;
  b: number;
  c: number;
}>(component);
```

With these props being manually supplied, we can update the `cloneComponent` function to specify the return type of `Component<TProps>` and the test will pass:

```typescript
const cloneComponent = <TProps>(component: Component<any>): Component<TProps> => {
  return new Component(component.getProps());
};
```

## Infer the `props` from the Passed-in Component
Now that we've seen how this works manually, we can make some adjustments to be able to infer the `props` from the component we pass in.

We do this by changing the `any` to `TProps` inside of the `cloneComponent` function:

```typescript
const cloneComponent = <TProps>(component: Component<TProps>): Component<TProps> => {
  return new Component(component.getProps());
};
```

Removing the manual prop specification we added when creating `clonedComponent`, we can hover and see that our types are all being inferred from the component we passed in:

```typescript
// hovering over `clonedComponent = cloneComponent(component);`

const cloneComponent: <{
  a: number;
  b: number;
  c: number;
}>(component Component<{
  a: number;
  b: number;
  c: number;
}>) => Component<{
  a: number;
  b: number;
  c: number;
}>
```

As we've seen before, we can now remove the return type from `cloneComponent` because TypeScript understands that since `getProps` is returning `TProps`, the `Component` that's being created is going to be a `Component<TProps>`. Therefore, the function returns `Component<TProps>`.

Here's the generic `cloneComponent` function without the return type that solves this challenge:

```typescript
const cloneComponent = <TProps>(component: Component<TProps>) => {
  return new Component(component.getProps());
};
```

The big takeaway here is that generic slots can be used inside the type argument of classes as well as type helpers.

## Transcript
0:00 The solution here is really interesting. We have a cloneComponent function, and we know that this is probably going to be a generic function because when we pass in our components here, we can pass in Component<any>, but that means that the thing that gets returned is a Component<any>, meaning that the results here is typed as any.

0:20 We need to know that the thing that's generic here is the props that are inside that Component. That's the thing that's dynamic about this situation. Knowing that, we know that we probably need a generic slot of some kind, so TProps here.

0:37 What we can do, we know that T component then it's like, we could manually assign this now if we wanted to. We could say, a: number, b: number, and c: number.

0:47 That means that what you end up with is probably going to be if we had a return type here, Component<TProps>. This makes everything pass here. Except, wouldn't it be great if we can just say, the component that you pass in, I want to infer the props that that component has.

1:06 Well, you can. You can say, TProps inside there. Let's keep that return type for now. We can remove this type argument that we're passing and it will now infer that from the thing that's being passed in. If we add a d, which is a number or blah, blah, blah, then you look in the cloneComponent, then it's extracting that as well, and result also has a d on it too.

1:34 This also means that we can remove this cleverly enough because it understands that getProps is returning TProps. The component that's being created is going to be a Component<TProps>, and so the function returns Component<TProps>. Isn't TypeScript clever?

1:50 The cool thing and the thing I want you to take away from this solution is that we're able to put this generic slot inside the type argument of a class or a type helper. This is really cool. We could add this to a promise or something and extract out the results of the promise. It shows you just how flexible these slots really are.

# 4. Strongly Type a Reduce Function

[

github.com

https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/02-passing-type-arguments/10-reduce.problem.ts

](https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/02-passing-type-arguments/10-reduce.problem.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=75547926-8fd8-465e-851b-71cceffd0eae&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0401-strongly-type-a-reduce-function-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=75547926-8fd8-465e-851b-71cceffd0eae&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0401-strongly-type-a-reduce-function-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
Let's look at a practical example of passing type arguments.

Here we have an `array.reduce` which is being called on an array of objects with `name` keys.

This array is being changed into a new object where the keys are the names, then the item that's in the array is stuck onto that key.

Here's what the code looks like:

```typescript
const array = [
  {
    name: "John",
  },
  {
    name: "Steve",
  },
];

const obj = array.reduce((accum, item) => {
  accum[item.name] = item;
  return accum;
}, {});
```

As seen in the test, the output looks like this:

```typescript
{
    John: {
      name: "John",
    },
    Steve: {
      name: "Steve",
    },
}
```

If you imagine that the starting array of data is coming from an API, we don't know the members ahead of time at the type level.

So what we kind of want it to look like is a `Record` with keys of type string whose values are an object containing a `name` of type string.

This is reflected in the test:

```typescript
type tests = [Expect<Equal<typeof obj, Record<string, { name: string }>>>];
```

## Challenge
Your challenge is to update the `array.reduce` so that it no longer uses an empty object as the accumulator. Instead, it should create its output so that our `Record` test passes as expected.

Check out the [Record type from the TypeScript docs](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type) and [the ,](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)[`.reduce()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)[, docs from MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) if you need a refresher.

You can go deeper by checking out TypeScript's `reduce` type signature in VS Code.

## Transcript
0:00 Let's look at a practical example of passing type arguments now. Here we have array.reduce and array.reduce is basically calling this array and it's turning it into an object which looks like this where the keys are the names and it's grabbing the item that's in the array and sticking it on that key.

0:19 What we're trying to achieve here is we're trying to achieve...Sure, we don't actually know the types or the names of the members up front. We're not expecting a really, really tight type here. We could do that and guess if we were using ask const, but for this exercise, we're not going to do that.

0:34 Let's imagine this data is coming from an API or something and we don't know the members ahead of time at the type level.

0:40 What we kind of want it to look like is a Record<string, {name.string}>

0:44 but array.reduce currently what it's doing is this accumulator is just typed as an empty object. When we assign something to it, then it's saying, "No index signature with a parameter of type 'string' was found on type 'blah'."

0:59 We somehow need to tell this reduce more information on the type level about the thing that we're trying to create in this accumulator.

# Solution: Pass Type Arguments to a Reduce Function

[

github.com

https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/02-passing-type-arguments/10-reduce.solution.ts

](https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/02-passing-type-arguments/10-reduce.solution.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=9c8b8a97-9340-4b00-9491-725712ad7c58&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0402-strongly-type-a-reduce-function-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=9c8b8a97-9340-4b00-9491-725712ad7c58&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0402-strongly-type-a-reduce-function-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## The Type Signature for `reduce`
Before we jump into the solution, let's look at the type signature for `reduce`.

There are three definitions, which are called function overloads (which we'll explore more another time).

The first definition of `reduce` only covers the case where we don't pass a second argument:

```typescript
reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: readonly T[]) => T): T;
```

The second one covers the case where we're inside the array type. Here `T` is the things that are the members of the array and the same shape is present.

```typescript
reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: readonly T[]) => T, initialValue: T): T;
```

Because we want to create a different object out of the members of our original array, TypeScript will end up using the third definition of `reduce`:

```typescript
reduce<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: readonly T[]) => U, initialValue: U): U;
```

Here the `U` type is being inferred from the initial value, which we can see when hovering over the `.reduce()` in our starting point code:

```typescript
// hovering over reduce in `const obj = array.reduce((accum, item)`
Array<{ name: string }>.reduce<{}>
```

Generics are captured at different levels based on where they're called.

We can see from hovering that the `U` is being captured as an empty object because that's what is being used as the initial accumulator.

Remember, whatever you pass into the initial value, that's the type that the reduce is going to think you're returning.

## Updating the Type Argument
From the test in our challenge, we want this to be a `Record` where the key is a string and the value is an object with a `name` that's a string.

To do this, we can assign the `Record` to the type argument, which will change the `reduce` to use the type we want:

```typescript
const obj = array.reduce<Record<string, { name: string }>>((accum, item) => {
  accum[item.name] = item;
  return accum;
}, {});
```

## Alternative Solutions
We could force TypeScript to infer the type by updating the accumulator using `as Record`:

```typescript
const obj = array.reduce((accum, item) => {
  accum[item.name] = item;
  return accum;
}, {} as Record<string, { name: string }>);
```

Another option is to assign it to the accumulator:

```typescript
const obj = array.reduce((accum: Record<string, { name: string }>, item) => {
  accum[item.name] = item;
  return accum;
}, {})
```

In this case since this is a more specific type annotation, TypeScript will pay more attention to than its own inferences because it's trying to be helpful. In this case it understands that it's supposed to be returning a `Record`.

Of the three options, I would probably choose the type argument as it's the cleanest, although assigning it to the accumulator is also pretty good.

## Transcript
0:00 To solve this problem, we're going to have to look quite closely at the reduce type signature. I've done a finding definition and let's look at it now. This is pretty intimidating to look at.+

0:10 There are three definitions, and these are what's called function overloads, which we will cover at some point. These reduce functions, you'll notice that this first one only covers the case where you don't pass a second argument.

0:24 This second one covers one where we're inside the array type here, all the way at the top. This T is the things that are the members of the array. Heading back down to reduce, this is like a version where you pass in the initial value that's exactly the same shape as the members of the array.

0:44 We want to create a different object out of those members of the array. We have to infer a U here. This U, it gets inferred from the initialValue. This means then, if I pass in the initialValue, I can see that array.reduce, array is capturing this object here, name: string, and reduce, it's capturing this little empty object there.

1:13 You can see that generics are captured at different levels based on where they're called. Why is this being captured as an empty object? Well, that's what I'm passing into here. The thing that I'm supposed to be returning here, the accumulator, is this record string here.

1:33 Objects, currently, is typed as an empty array because that's what the reduced signature returns. It returns the U. Whatever you pass into the initialValue, that's the type that the reduce is going to think that you're returning.

1:47 We need to somehow tell this reduce function that we don't want this, we want Record<string, { name: string }>. Let's grab this here. The obvious way to do it is just to stick it in here. What this does is it turns the accumulator into this type here, record, blah, blah, blah.

2.09 The accumulator now, because it's a record, we can freely assign to it, and that's the type that we end up with at the end of the function. That's the U in this situation.

2:19 We can do this in a few other ways as well. We can force it to infer that this is the type that we want. We can do this. Empty object as record blah, blah, blah. Or we can assign it to the accumulator too.

2:35 Again, because this is like a more specific type signature, TypeScript tends to pay attention to your annotations more than its own inferences because it's trying to be helpful like that. It's trying to listen.

2:48 It manages to understand that what it's supposed to be returning is this record here. This is really interesting. Of the three, I would probably choose the type argument just because it's cleanest. Although, probably assigning it to the accumulator is also pretty good too.

# 5. Avoid any Types with Generics

[

github.com

https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/02-passing-type-arguments/11-data-fetcher.problem.ts

](https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/02-passing-type-arguments/11-data-fetcher.problem.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=f404c8df-6cc4-4c39-9ebb-bbcf14db5ebc&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0501-avoid-any-types-with-generics-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=f404c8df-6cc4-4c39-9ebb-bbcf14db5ebc&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0501-avoid-any-types-with-generics-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
Let's look at another practical example that you've probably written hundreds of times:

```typescript
const fetchData = async (url: string) => {
  const data = await fetch(url).then((response) => response.json());
  return data;
};
```

This `fetchData` function takes a `url` string, fetches the data, and returns it as JSON.

Inside of our test, we're calling `fetchData` with a type argument of `{ name: string }` and passing in the url:

```typescript
const data = await fetchData<{ name: string }>(
    "https://swapi.dev/api/people/1",
  );
  expect(data.name).toEqual("Luke Skywalker");
  
  type tests = [Expect<Equal<typeof data, { name: string }>>];
```

We're expecting [`data.name`](http://data.name) to equal "Luke Skywalker", but the data is being returned as `any` instead of a string.

## Challenge
Your challenge is to make `fetchData` generic enough that it can accept a type argument that will also be assigned to whatever gets returned.

## Transcript
0:00 Let's look at another practical example. We have a fetchData function where we have a url.

0:05 string and we fetch that data, and we return it as JSON. You may have written this code hundreds of times. I know that I have.

0:11 Here what we're trying to do is say fetchData<{ name.string }>

0:15 and passing in the URL here. We're expecting
[data.name](http://data.name) toEqual("Luke Skywalker"). Except the data is being returned
as any. Your job is to try and figure out how to make fetchData generic
enough that it can accept a type argument and also to assign that type
argument to whatever gets returned.

# Solution: Use Generics to Type a Fetch Request

[

github.com

https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/02-passing-type-arguments/11-data-fetcher.solution.ts

](https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/02-passing-type-arguments/11-data-fetcher.solution.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=18dbaaf6-3b8a-4964-ba45-a66398aa6924&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0502-avoid-any-types-with-generics-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=18dbaaf6-3b8a-4964-ba45-a66398aa6924&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0502-avoid-any-types-with-generics-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
The first step, of course, is to add a `<TData>` generic to the `fetchData` function:

```typescript
const fetchData = async <TData>(url: string) => {
```

However, this creates an issue because `fetch` doesn't have a type argument slot as seen in TypeScript's definitions inside of `lib.dom.d.ts`:

```typescript
declare function fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
```

## The Problem with `fetch`
It would be great if we could parse `TData` inside there, but unfortunately it's not possible. This is a frustrating problem you'll come across in lots of library code, especially if it wasn't written in TypeScript from the start.

In this case, we need to work with what `fetch` has to offer.

What `fetch` returns is a Promise with a `Response`, which is an interface that extends `Body`, which includes a `json` function that returns a Promise:

```typescript
interface Body {
    readonly body: ReadableStream<Uint8Array> | null;
    readonly bodyUsed: boolean;
    arrayBuffer(): Promise<ArrayBuffer>;
    blob(): Promise<Blob>;
    formData(): Promise<FormData>;
    json(): Promise<any>;
    text(): Promise<string>;
}
```

Because `json()` doesn't have a type argument, we will have an `any` inside our codebase. This means that any access we do on it is not going to be type checked.

Yuck.

We need to find some way of reducing the scope of that `any` so it doesn't bleed into the rest of our program.

## Potential Solutions
Now, there are several solutions here.

### Specify the Return Type
We could assign `Promise<TData>` to the return type:

```typescript
const fetchData = async <TData>(url: string): Promise<TData> => {
```

With this change our `data` still ends up as an `any` but it doesn't escape the scope of our function.

However, even within the function the `any` can casue some harm.

For example, if we did `data = null` using `let`, it destroys the entire function. The test won't pass, and TypeScript won't yell at us to say there's a problem:

```typescript
// this function is broken!
const fetchData = async <TData>(url: string) => {
  let data = await fetch(url).then((response) => response.json());

  data = null

  return data;
};
```

### Return `data as TData`
Instead of specifying the return type, we could return `data as TData`:

```typescript
const fetchData = async <TData>(url: string) => {
  let data = await fetch(url).then((response) => response.json());

  return data as TData;
};
```

This is similar to what we've seen before, but infers `Promise<TData>` in a different way:

```typescript
// hovering over fetchData
const fetchData: <TData>(url: string) => Promise<TData>
```

### Stop the `any` at the Source
My recommended solution is to specify `data` as `TData` when the fetch call is first made:

```typescript
const fetchData = async <TData>(url: string) => {
  let data: TData = await fetch(url).then((response) => response.json());

  return data;
};
```

This change will still have `fetchData` infer the `Promise<TData>` as seen before, and ends up with an `any` only being present inside the function inside of the `then`.

### A Different Way to Stop the `any`

We also have the option of adding `Promise<TData>` inside of the `then`:

```typescript
const fetchData = async <TData>(url: string) => {
  let data = await fetch(url).then((response): Promise<TData> => response.json());

  return data;
};
```

In this approach, the `data` is now inferred as `Awaited<TData>`. You can read more about the `Awaited` utility type [in the TypeScript docs](https://www.typescriptlang.org/docs/handbook/utility-types.html#awaitedtype).

The big takeaway here is that by using generics with the appropriate syntax in the right places, you won't end up with `any`s infecting your codebase!

## Transcript
0:00 The solution here is to, of course, add a generic onto here. Let's say TData. Now there's an issue because we have data that's coming down here from this fetch. The interesting thing about fetch is that you can't really pass it any generics.

0:18 It doesn't have a type arguments slot. This is really frustrating and really, I would love for it if we could just pass it TData inside here and then it would understand and work better, but it doesn't.

0:32 This is going to be a problem that you come up against in lots and lots of, especially library code. Sometimes, especially if the library wasn't written in TypeScript to start with, they wouldn't think, we need to add a type argument here.

0:47 What fetch does return is, it returns a Promise with a Response and that Response, it has a JSON function on it somewhere. What that JSON function does is it returns Promise<any>. Here, what we can do, does JSON have a...nope. That doesn't have a type argument on it either.

1:07 This means that we will have an any inside our code base. Yuck. We do not want that, anys inside here. If you don't know the perils of any, it means that any access we do on it is not going to be type checked.

1:22 We need to find some way of reducing the scope of that any so it doesn't bleed into the rest of our program. What we can do...There's several solutions here. We can, of course, assign Promise<TData> like this.

1:37 Then what we'll end up doing is we have an any here, but it doesn't escape the scope of our function. If we don't return this, of course, then our any gets out into the world and starts causing havoc. Whatever we should do, we should trap that any inside our function.

1:55 Even when it's inside our function, it's causing a little bit of harm because we could do like data = null, for instance. Imagine if we had this is as a let instead. This just destroys the entire function, stops the test from working, but TypeScript won't yell at us.

2:10 We need to find a different way to do this that isn't using Promise<TData>. The best way I think to do is we could do it here. We could say data as TData. This means that the data does get inferred properly, but it's pretty similar to what we had before.

2:28 It just means that this is inferred as Promise<TData> in a different way. My recommended solution is to say data: TData here. This stops the any at source and we can say, sure, TData. Now there's no anys inside our code base, except in this tiny little function here.

2:49 We could even do this, where we could say, it returns Promise<TData>. Then there's not even any coming out of the JSON here. This is also inferred as Awaited<TData>, which is really nice too. This is a lesson about how you can use generics to really stamp down on those anys and stop them from even infecting a line of your code base.

3:14 Now, if we try to assign this to null, for instance, data = null, then this is going to yell at us because 'TData' could be instantiated with an arbitrary type which could be unrelated to 'null', unhelpful error message. What it's saying is, TData could be anything, why are you trying to force it to be null?

3:31 That's my solution to this very, very common problem. Make sure that you're really stamping out the anys at source, and replacing them using this syntax to make sure that there's not even a line of code that can use an any.

# 6. Passing Type Arguments in cal.com

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=a36bfeb4-9bc4-44f1-bfec-07b5fe9b5550&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0601-passing-type-arguments-in-cal-com.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=a36bfeb4-9bc4-44f1-bfec-07b5fe9b5550&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0601-passing-type-arguments-in-cal-com.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Explainer
The [repo for cal.com](https://github.com/calcom/cal.com/blob/main/packages/lib/Sendgrid.ts) has lots of great examples of how passing type arguments allows for overriding the weaknesses of external libraries.

For this example, we'll be looking at `Sendgrid.ts`.

While the `Sendgrid` class isn't generic itself, but it does have a couple generic functions.

Here's `sendgridRequest`:

```typescript
public async sendgridRequest<R = ClientResponse>(data: ClientRequest): Promise<R> {
  this.log.debug("sendgridRequest:request", data);
  const results = await client.request(data);
  this.log.debug("sendgridRequest:results", results);
  if (results[1].errors) throw Error(`Sendgrid request error: ${results[1].errors}`);
  return results[1];
}
```

Using VS Code to search for references in the codebase to the `sendgridRequest` function will show us [the ,](https://github.com/calcom/cal.com/blob/main/packages/app-store/sendgrid/lib/CalendarService.ts)[`CalendarService.ts`](https://github.com/calcom/cal.com/blob/main/packages/app-store/sendgrid/lib/CalendarService.ts)[, file](https://github.com/calcom/cal.com/blob/main/packages/app-store/sendgrid/lib/CalendarService.ts).

Here's an excerpt of the `createEvent` function inside of `CalendarService.ts`. Notice that the `result` is typed as `SendgridNewContact`:

```typescript
async createEvent(event: CalendarEvent): Promise<NewCalendarEventType> {
  ...
  const result = await this.sendgrid.sendgridRequest<SendgridNewContact>({
    url: `/v3/marketing/contacts`,
    method: "PUT",
    body: {
      contacts: contactsData,
    },
  });
  ...
```

But back inside of `Sendgrid.ts`, the `SendgridNewContact` isn't actually used anywhere:

```typescript
public async sendgridRequest<R = ClientResponse>(data: ClientRequest): Promise<R> {
  // removed debug log
  const results = await client.request(data);
```

The `client.request` is basically typed as `any`.

This is an interesting use case where the developers have seen that using the API as it is will lead to having `any`s in the code base.

So they decided to wrap it in something with the added bonus of doing error handling on the side:

```typescript
// inside of sendgridRequest:
if (results[1].errors) throw Error(`Sendgrid request error: ${results[1].errors}`);
```

This gives an element of documentable type safety because we know what it's supposed to return. If it doesn't, then there's something wrong and we can introduce a library like Zod at that point.

When searching through `Sendgrid.ts` you'll find that `this.sendgridRequest` is built out in a few different ways, each one providing a different type definition which can be passed in.

This is an interesting approach for working around something that is supposed to be there but isn't supported.

## Transcript
0:00 Here's an example of how the pattern of being able
to pass type arguments to something is overriding the weaknesses of an
external library. We're inside [Cal.com](http://Cal.com), which again is a really amazing
open-source application to look at if you want to look at some of these
patterns.

0:16 We're inside a class called SendGrid. SendGrid itself is not generic, but it has a couple of generic functions inside here. The main one I'm looking at is SendGrid request. Now, if we look at some of the references here, what's going on is if we look in calendar service up here, what's going on is it's saying, "This .SendGrid.SendGrid request..."

0:40 Then it's passing in a type of argument that it's expecting to get back. This looks like just a new contact, a job ID. This result then is typed as SendGrid new contact. If we look inside here, this isn't actually used anywhere. It's just basically saying, "Promise are here," because we have client requests.

1:02 It looks like results here is basically typed as any. This is a really, really interesting use case where they've seen, "If we use this API as it is, we're going to get anys in our code base. Let's actually wrap it in something that does a little bit of error handling on the side, but also just make sure that the type we're getting back from the thing is what we expect it to be."

1:25 It basically makes the whole thing. It's not using Zod or something like this, which would actually make it run-time type-safe. It is giving an element of type safety and certainly documentable type safety. We know what it's supposed to return.

1:38 If it doesn't return, or something like that, or it returns something different, then there's something wrong and maybe we can introduce Zod at that point. This is a really, really interesting approach for working around something that's supposed to be there.

1:51 As you can see, this .SendGrid request is built out here in a few different ways and each one provides a different type definition which can be passed in.

# 7. Improving Code Maintainability

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=e2c2a11f-a026-48a6-b6d5-ce08df172d79&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0701-improving-code-maintainability.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=e2c2a11f-a026-48a6-b6d5-ce08df172d79&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0701-improving-code-maintainability.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Explainer
Redux maintainer Mark Erikson discusses his experience working on an internal project involving a metrics and statistics database in an Angular app a few years ago.

Mark talks about how he improved the code by defining a data type that would flow through the system and be used in processing functions, thus reducing duplication and increasing maintainability.

## Resources

[

redux.js.org

https://redux.js.org/introduction/getting-started

](https://redux.js.org/introduction/getting-started)

[

twitter.com

https://twitter.com/acemarke

](https://twitter.com/acemarke)

## Transcript
Instructor: 0:00 I spoke to Mark Erikson, the maintainer of Redux, and he told me about a time when he was working in an application and he designed an API that used these type arguments, like the passing of types to functions, to really smooth over a lot of really difficult to write code.

Mark Erikson: 0:16 Actually, I can think of a specific example from the Angular app that I worked on a couple years ago. Very, very short background. It was like an internal project metrics and statistics database.

0:27 Projects across the company had a mandate that they had to upload stats about their project every month. Our backend would take these uploaded Excel files, extract a bunch of info, and do some post processing to spit out red, yellow, green statuses in various categories.

0:45 The app had about 30 different metrics that it knew how to extract and process, each of which required storing several different pieces of data. It had a similar logic to do post processing, but unique to each of those metrics.

1:02 The previous developer that I took over from had defined a fairly consistent pattern for doing this work, but again, it was all plain JavaScript. When I took over, it took me months to try to understand what all that code was doing, both conceptually and the data types.

1:24 There was one particular chunk of that. I really wanted to be able to define, again, a couple of those key data types that were going to flow through the system where there's going to be a report type.

1:36 Which always is going to have a certain, it's got the date, and the name, and then a contents field that is going to be unique to that report type for that metric.

1:50 I wanted to be able to make that content field generic and then declare the processing logic and just say, here's what the contents field type is going to be and have that ripple through all the processing functions so I didn't have to keep redeclaring it and just have the rest of that inferred.

2:09 Writing that processing logic and its types probably took me a week or two to try to get all the inference set up correctly. Once I did, it was beautiful.

2:21 You just go to the file, you declare the interface or the fields for the content type and say, report angle brackets, my content type, apply that to the processing structure definition. Later on, you define the handler callback and it knows all the types. It just flowed all the way right through.

2:42 That was basically internal library style code in the application code base. A mindset for writing that code was very different than going off and writing yet another component.

Instructor: 2:55 That's fascinating, because that I imagine, that reduced a lot of duplication I can imagine.

Mark: 3:01 Oh, yeah.

Instructor: 3:03 Did that feel easier to maintain going forward as well?

Mark: 3:06 Absolutely so. It gave us a lot of confidence knowing that, as we did have to start adding a new metric definition, we had a very consistent boilerplatey, but intentionally so kind of pattern.

3:22 Of course, we always usually started it by copy pasting an existing file, but you knew you just defined the content field, declared a report type, pass in the generic, declare the data, declare the processing structure, pass in that generic, and all the rest of it's going to be typed correctly.

# Resources

[

developer.mozilla.org

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global\_Objects/Set

](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)

[

www.typescriptlang.org

https://www.typescriptlang.org/docs/handbook/2/classes.html

](https://www.typescriptlang.org/docs/handbook/2/classes.html)

[

www.typescriptlang.org

https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type

](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)

[

github.com

https://github.com/microsoft/TypeScript/blob/main/lib/lib.es5.d.ts#L1264-L1275

](https://github.com/microsoft/TypeScript/blob/main/lib/lib.es5.d.ts#L1264-L1275)

[

github.com

https://github.com/microsoft/TypeScript/blob/e60c210c572a12de38551ac1d1e8716587dbcc33/lib/lib.dom.d.ts#L11771

](https://github.com/microsoft/TypeScript/blob/e60c210c572a12de38551ac1d1e8716587dbcc33/lib/lib.dom.d.ts#L11771)

[

www.typescriptlang.org

https://www.typescriptlang.org/docs/handbook/utility-types.html#awaitedtype

](https://www.typescriptlang.org/docs/handbook/utility-types.html#awaitedtype)

[

github.com

https://github.com/calcom/cal.com/blob/main/packages/lib/Sendgrid.ts

](https://github.com/calcom/cal.com/blob/main/packages/lib/Sendgrid.ts)

# (c) The Art of Type Arguments



# 1. Generics at Different Levels

[

github.com

https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/03-art-of-type-arguments/12-generics-at-different-levels.problem.ts

](https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/03-art-of-type-arguments/12-generics-at-different-levels.problem.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=8c48a5cb-0032-499e-9854-0651fb6b6d52&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0101-generics-at-different-levels-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=8c48a5cb-0032-499e-9854-0651fb6b6d52&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0101-generics-at-different-levels-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
In this exercise, we have a function called `getHomePageFeatureFlags` that takes in a `config` object that is currently typed as `unknown`:

```typescript
export const getHomePageFeatureFlags = (
  config: unknown,
  override: (flags: unknown) => unknown
) => {
  return override(config.rawConfig.featureFlags.homePage);
};
```

Notice in the return that the attribute `config.rawConfig.featureFlags.homePage` must be present.

As seen in the tests, the `override` function allows us to return different flags for the `config` object, such as `showBanner: true` and `showLogOut: false`.

## Challenge
Your challenge is to make the function generic so that it can accept any config object that contains the `config.rawConfig.featureFlags.homePage` attribute.

Note that there is more than one way to achieve this!

As you work through this challenge, think about the different approaches to using generics.

## Transcript
0:00 In this exercise, we have a function called gethome pageFeatureFlags. What this does is it takes in a config object, which is currently typed as unknown, and what we have here is a function called override to override some of its flags.

0:14 This config object, it doesn't actually matter what we pass in, except that it has to have a config.rawConfig.featureFlags.home page. In other words, it has to have those deeply nested attributes. It can have other stuff, but this is really all we care about, this single deeply nested attribute in this config.

0:32 We have an example config here which matches up, so we have EXAMPLE\_CONFIG rawConfig.featureFlags.home page. That's what we're doing our tests with, but you have to find a way to make this function generic.

0:46 What you can do from override is you can actually return different stuff. You should be able to call gethome pageFeatureFlags with this example config where we have the defaultFlags, which are going to be showBanner true, showLogOut.

0:58 We should be able to return a different version of that and show something different in there, showBanner instead. That's your job, is to try to find a way to express this with generics.

1:11 I'll give you a clue here. There is more than one right answer here. There is a little bit of art to this. The topic of this exercise is all about generics at different levels, so I want you thinking about that when you choose your approach.

# Solution: Represent Generics at the Lowest Level

[

github.com

https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/03-art-of-type-arguments/12-generics-at-different-levels.solution.1.ts

](https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/03-art-of-type-arguments/12-generics-at-different-levels.solution.1.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=8c756e74-3b0e-473e-b3bd-12ac92596054&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0102-generics-at-different-levels-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=8c756e74-3b0e-473e-b3bd-12ac92596054&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0102-generics-at-different-levels-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
There are two solutions to this challenge, both with different ways of representing the generic.

## Solution 1
The first option is using `TConfig` which extends `rawConfig` and includes `featureFlags`, `homePage`, and `any`:

```typescript
export const getHomePageFeatureFlags = <
  TConfig extends {
    rawConfig: {
      featureFlags: {
        homePage: any;
      };
    };
  }
>(
  ...
```

Hovering over `getHomePageFeatureFlags` in the tests will show the the entire object is being captured in the generic slot when using `TConfig` as the type argument.

This means that we can index into `TConfig` to find the type that the flag should be:

```typescript
export const getHomePageFeatureFlags = <
  TConfig extends {
    rawConfig: {
      featureFlags: {
        homePage: any;
      };
    };
  }
>(
  config: TConfig,
  override: (
    flags: TConfig["rawConfig"]["featureFlags"]["homePage"]
  ) => TConfig["rawConfig"]["featureFlags"]["homePage"]
) => {
  return override(config.rawConfig.featureFlags.homePage);
};
```

As you can see, this approach of capturing the generic on a higher level can be quite messy and captures a lot of unnecessary code.

## Solution 2
Using `HomePageFlags` directly as the generic makes for a more elegant solution since it is the argument for the `override` function.

We can now drill down to `config.rawConfig.featureFlags.homePage` inside of the argument:

```typescript
export const getHomePageFeatureFlags = <HomePageFlags>(
  config: {
    rawConfig: {
      featureFlags: {
        homePage: HomePageFlags;
      };
    };
  },
  override: (flags: HomePageFlags) => HomePageFlags
) => {
  return override(config.rawConfig.featureFlags.homePage);
};
```

With this solution, hovering over `getHomePageFeatureFlags` in the test will only show us the stuff we care about inside of `homePage` instead of the entire object.

```typescript
// hovering over getHomePageFeatureFlags
const getHomePageFeatureFlags: <{
  showBanner: boolean;
  showLogOut: boolean;
}>...
```

Being able to access only the specific properties we want instead of drilling down twice makes the code much more readable.

A general rule of thumb for working with generics is to always represent them with a low-level type. As seen in the second solution, it's more efficient to drill down to find the specific type argument.

## Transcript
0:00 There are two solutions here, and this is all about how you represent the generic that's in the type parameter here.

0:09 The first option is we have TConfig extends { rawConfig: { featureFlags: { home page: any; } } } and it then depends on how you want to handle the override function.

0:20 This means that when you pass in TConfig here, if we go to one of the call sites, we can see that the thing that's being captured in the generic slot is the entire object that's being passed in, this example config.

0:32 What that means is that TConfig, then, we can index into it to find the type that the flag should be. We should be able to rawConfig in there, featureFlags, and then home page there.

0:44 This is a little bit messy, actually. It's got quite a lot of code. We're representing the generic on quite a high level, so quite a lot is being captured inside this argument here or this type parameter.

0:58 The second solution, I think, is a little bit more elegant, which is we have our home pageFlags here. This is exactly the thing that we want to capture here because it's the argument inside the override function.

1:10 We have our override function, which is home pageFlags. Now, inside the argument of the function itself, we do the drilling there.

1:18 Instead of drilling twice in this one, where we represented the entire thing at the top level and then drilled down twice to get the actual config, what we do is we represent it at the low level in the generic slot and then just do the drilling inside this argument here.

1:37 This means that at the call site it's then only accessing these two things, the things it cares about, which is the things inside home page, showBanner 1, showLogOut false. It means that less gets captured in here, which is pretty nice, actually. It means this is a little bit more readable when you hover over it.

1:55 We can add something else to here and say showMatt: "always". Then inside there what we'll get is showMatt: string. Very, very cool.

2:06 This in general is quite a nice rule of thumb for when you're working with generics, is you should always try to make this generic type argument represent a low-level thing. This is going to come back a few times to us.

2:22 If you have an option between choosing a high-level representation representing the whole thing, lots of stuff you maybe don't need, then in general it's best to drill down and find exactly what you want the type argument to represent because, in this previous example, we would have to do a lot of drilling ourselves.

2:39 There is a slight way that you can change this if you want to, which is to say Thome pageFlags equals this, and extract it out into a default generic like this.

2:53 We will look at this in more detail a little bit later, but this is a little bit of a hack around the issue, and I feel like the second method is more elegant.

# 2. Typed Object Keys

[

github.com

https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/03-art-of-type-arguments/13-typed-object-keys.problem.ts

](https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/03-art-of-type-arguments/13-typed-object-keys.problem.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=dc4fa8a1-8106-42d6-9eb6-e6f703c50559&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0201-typed-object-keys-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=dc4fa8a1-8106-42d6-9eb6-e6f703c50559&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0201-typed-object-keys-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
Here we have a function called `typedObjectKeys`.

The function takes in an object, and grabs the keys from it, then returns them:

```typescript
const typedObjectKeys = (obj: unknown) => {
  return Object.keys(obj);
};
```

## Challenge
By default `Object.keys` returns an array of strings.

Your challenge is to update `typedObjectKeys` so that the result of passing in `{a: 1, b:2}` is equal to `Array<"a" | "b">`.

Think about where you want to put the generic, and what you represent in the generic slot.

Remember the rule of thumb: keep generics to the lowest level possible.

There are two possible solutions-- see if you can get them both!

## Transcript
0:00 In this exercise, we have a function called typedObjectKeys where we receive an object, and we want to grab the keys from it and return them. Object.keys by default it returns string here or rather an array of strings. There's a very good reason for that which we can touch on and explain it. I might cover in an article too actually.

0:20 What we want to do is we want to return the object keys and we want result1 here instead of string array, we want it to equal array "a" or "b". Just like the previous exercise, you should probably be thinking about where you want to put the generic here. There may be options in terms of what you can represent in the generic slot, and remember, lower is better.

0:45 Good Luck

# Solution: Two Approaches for Typing Object Keys

[

github.com

https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/03-art-of-type-arguments/13-typed-object-keys.solution.1.ts

](https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/03-art-of-type-arguments/13-typed-object-keys.solution.1.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=d9c6792f-b3a6-4e41-898f-e6335673fd66&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0202-typed-object-keys-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=d9c6792f-b3a6-4e41-898f-e6335673fd66&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0202-typed-object-keys-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
As mentioned, there are two solutions to this challenge.

## Solution 1
The first solution is to represent the generic as the entire object in the generic slot.

`TObject` extends `object`, and it returns `Object.keys(obj)` as `Array<keyof TObject>`:

```typescript
const typedObjectKeys = <TObject extends object>(obj: TObject) => {
  return Object.keys(obj) as Array<keyof TObject>;
};
```

Without `as Array<keyof TObject>`, `Object.keys` still returns an array of strings.

Using `as` forces it to be typed as an array of the keys inside of `TObject`.

### A Closer Look at Object.keys()
Let's look at the reasoning behind using `<TObject extends object>` in the first solution, and what it shows us about integrating with external libraries.

In VS Code, CMD+clicking on `Object.keys()` takes us to its definition:

```typescript
// inside of the `Object` definition 
/**
 * Returns the names of the enumerable string properties and methods of an object.
 * @param o Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object.
 */
keys(o: object): string[];
```

This tells us that what we pass to `Object.keys` has to be a `object` of some kind.

If we try to only use `TObject`, we'll get an error that "Argument of type `TObject` is not assignable to parameter of type `object`".

So we have to say `TObject extends object` just to make it happy, but now we can pass in anything `Object.keys()` would usually provide.

## Solution 2
The second solution is to have the generic only represent the keys.

We can use `TKey` for the type, but it will now extend `string` instead of `object` since we're only interested in the keys.

Then `Record<TKey, any>` can be used because we don't need to care about the type of the value of the object.

```typescript
const typedObjectKeys = <TKey extends string>(obj: Record<TKey, any>) => {
  return Object.keys(obj) as Array<TKey>;
};
```

Hovering over the `any` shows us that the generic slot contains the `"a"` or `"b"` that our test expects:

```typescript
// hovering over `any`
const typedObjectKeys: <"a" | "b">(obj: Record<"a" | "b", any>) => ("a" | "b")[]
```

It's really nice just to capture very precisely only the thing you care about in the type arguments!

## The Art of Generics
This section of the workshop is all about figuring out how best to represent these generics in terms of the things that are being passed into functions.

Even a simple example like this with an object with two keys demonstrates how different implementation decisions change how functions are interacted with.

So it doesn't really matter which one of these you end up choosing, but you should feel confident in your choice and you should understand why you've made that choice.

The first solution provides a more one-to-one mapping between the object being passed in and the object passed to `Object.keys()`, whereas the second solution has only the strings being put in to the generic slots.

## Transcript
0:00 We have our function typedObjectKeys. This is the first solution. There are two. Inside here, we're representing the generic as the entire object. You pass in the obj and you say TObject here, and it returns Object.keys (obj) as Array keyof Object. Why is it using as? Let's check this out.

0:20 We could put this on the return type here, but then we get an error because Object.keys' actually still returning an array of strings. We need to tell TypeScript to say, "Could you just force this to be Array keyof TObject?" An Array keyof TObject is basically what we're trying to access here.

0:39 If we add something else in here, if we add c, then this is going to be Array keyof TObject, which resolves to a or b or c in an array. That's the first option.

0:50 What we can see here is that we get the entire object put into the generic slots, which is fine, really, because it's quite idiomatic. It makes sense. We're passing in an argument here. Why wouldn't that be represented in the generic slots?

1:04 Inside here, though, we are representing just the keys. This is quite a subtle distinction. We have Object extends object here. We'll talk about this in a minute. This is representing the entire object, whereas this is just representing the keys, so our argument needs to slightly change here.

1:24 Instead of it being the entire object inside here, it's now a Record with TKey and any. We actually do not care about what they put as the values of their objects because we only care about the keys. This is a typedObjectKeys. If it were a typedObjectValues, then that would be a different story.

1:42 Here, then, we can see that a or b is put into the generic slot here. This is really nice and maybe even a little bit nicer. It's really nice to capture, very precisely, only the thing you care about in the type argument.

1:57 What you get is result1, a or b, same result as before. We can add a third slot here if we want to, and boom, boom, boom.

2:05 One thing to note here is I've used TObject extends object here. Why didn't I do something like this, or why did I bother with this at all? Well, this is an interesting little tidbit on how to integrate with external libraries.

2:21 What I did was I Command-clicked on Object.keys. I saw that it takes an object here. I thought, "This is actually relatively unusual. I don't often see this. I don't often use this myself," and so I went, "OK, so object has to be a object of some kind."

2:38 Argument of type TObject is not assignable to parameter of type object, so we'll say TObject extends object here just to make it happy. This means you can't pass in anything Object.keys would usually provide, whereas this, I guess it's slightly tighter, maybe. I don't know.

2:59 I really wanted to call this module the art of generics because this is the art. You're trying to figure out how best to represent these generics in terms of the things that you're calling, in terms of the things that people are passing in.

3:12 I think this is a really nice example of it. Even a simple example like this can have little decisions which demand your attention. It doesn't really matter which one of these you end up choosing, but you should feel confident in your choice, and you should understand why you've made that choice.

3:28 With typedObjectKeys, only the strings get put into the generic slots, which is nice. Whereas here, you maybe got a cleaner one-to-one mapping between the object that you're passing in and the object that you're passing to Object.keys.

# 3. Make a Generic Wrapper for a Function

[

github.com

https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/03-art-of-type-arguments/14-safe-function.problem.ts

](https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/03-art-of-type-arguments/14-safe-function.problem.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=3adb1a2a-072b-4088-b958-f436b4c30e98&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0301-make-a-generic-wrapper-for-a-function-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=3adb1a2a-072b-4088-b958-f436b4c30e98&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0301-make-a-generic-wrapper-for-a-function-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
Consider this `makeSafe` function. It takes in a function, then it returns a wrapped version of that function that can either return `type: 'success'` with a dynamic result or `type: 'failure'` with an error that gets thrown.

```typescript
const makeSafe =
  (func: unknown) =>
  (
    ...args: unknown
  ):
    | {
        type: "success";
        result: unknown;
      }
    | {
        type: "failure";
        error: Error;
      } => {
    try {
      const result = func(...args);

      return {
        type: "success",
        result,
      };
    } catch (e) {
      return {
        type: "failure",
        error: e as Error,
      };
    }
  };
```

What we can see here is that we should be able to return the result with a `{ type: 'success' }` on a successful call.

In the case of our first test, `result` should be type of `result: number`– or rather, it's fine for it to be this discriminated union type).

It shouldn't know whether it's gonna succeed or fail, but it should have `number` in this slot.

When there's an error, it should return the error on a thrown call. In this case, `result` should be typed as a `string`.

## Challenge
Your challenge is to use generics to replace the `unknown` types to properly match the function's arguments.

For example, if you were to call `makeSafe` with `(a: number, b: string)` you should get them back:

```typescript
const func = makeSafe((a: number, b: string) => {
  return `${a} ${b}`;
});
```

Because the `args` to `makeSafe` are currently `unknown`, you can pass any arguments.

As seen in the tests, calling `func()` or `func(1, 1)` should result in errors:

```typescript
// @ts-expect-error
func();

// @ts-expect-error
func(1, 1);
```

You need to figure out how to represent a generic that represents the function.

Think about what level you want to represent at, while making sure everything ends up in the right places and is properly typed.

## Transcript
0:00 In this exercise, we have a function called makeSafe. MakeSafe, what it does is it takes in a function and then it returns a wrapped version of that function that can either return type success with a dynamic result or type failure with an Error, which is the error that gets thrown.

0:22 What we can see here is we should be able to return the result with a type success on a successful call.

0:28 MakeSafe, this is not going to error, and so results here should be type of result number, or rather, it's fine for it to be this discriminated union type. It shouldn't know whether it's going to succeed or fail, but it should have number in this slot.

0:44 We should also return the error on a thrown call, so this result type failure Error, this is probably going to work, except that result here should be typed as a string. Currently it's typed as unknown here, so there's a little bit of basic generics work for you there.

1:04 Also, it should properly match the function's arguments, too. Currently, makeSafe in here, we can pass it a, number, b, string, and it just returns them like this because currently the args here are unknown, you can pass any arguments here, so this one should error and this one should error.

1:24 You've got quite a bit of a job to do here because you need to somehow represent a generic that represents the function. Again, we're inside the art of generics, so you might be thinking, "OK, at what level do I want to be representing this at?"

1:40 You've also got to capture that and then stick it in all of the right places, make sure the result is properly typed to make sure that the arguments are properly typed. Good luck.

# Solution: Constrain a Type Argument to a Function

[

github.com

https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/03-art-of-type-arguments/14-safe-function.solution.1.ts

](https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/03-art-of-type-arguments/14-safe-function.solution.1.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=66a88559-9c1c-4092-bc68-41564fd98137&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0302-make-a-generic-wrapper-for-a-function-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=66a88559-9c1c-4092-bc68-41564fd98137&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0302-make-a-generic-wrapper-for-a-function-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution 1
For the first solution, the type arguments contains `TParams` and `TReturn`.

With `TParams` extending an `any` array, any amount of arguments can correspond to it, and `TReturn` will be the return:

```typescript
const makeSafe =
  <TParams extends any[], TReturn>(func: (...args: TParams) => TReturn) =>
  (
    ...args: TParams
  ):
    | {
        type: "success";
        result: TReturn;
      }
    | {
        type: "failure";
        error: Error;
      } => {
    try {
      const result = func(...args);

      return {
        type: "success",
        result,
      };
    } catch (e) {
      return {
        type: "failure",
        error: e as Error,
      };
    }
  };
```

Note that using `Array<any>` would work in place of `any[]`.

We can see how it works by doing some hovering inside of our test code.

Hovering over `makeSafe` in the "Should return the result on a successful call" test, we can see an empty tuple representing no parameters, and a number for the return type:

```typescript
it("Should return the result on a successful call", () => {
  const func = makeSafe(() => 1);

// on hover
const makeSafe: <[], number>(func: () => number) => () => {
  ...
```

In the "Should properly match the function's arguments" test, hovering will show us a named tuple of `a` of number and `b` of `string`, with a return type of `string`.

```typescript
it("Should properly match the function's arguments", () => {
  const func = makeSafe((a: number, b: string) => {
    return `${a} ${b}`;
  });

// on hover
const makeSafe: <[a: number, b: string], string>(func: (a: number, b: string) => string => (a: number, b: string) => {
  ...
```

Named tuples are an unusual part of TypeScript. They basically capture the name of the argument we give, so changing the `b` to `c` would show the update and everything would still work.

## Solution 2
The second solution has a similar idea to the first, but is done in a slightly different way.

```typescript
const makeSafe =
  <TFunc extends (...args: any[]) => any>(func: TFunc) =>
  (
    ...args: Parameters<TFunc>
  ):
    | {
        type: "success";
        result: ReturnType<TFunc>;
      }
    | {
        type: "failure";
        error: Error;
      } => {
    try {
      const result = func(...args);

      return {
        type: "success",
        result,
      };
    } catch (e) {
      return {
        type: "failure",
        error: e as Error,
      };
    }
  };
```

Here we have `TFunc` that extends `(...args: any[])`.

Instead of it being represented in two generic slots like in the first example, here it's represented in just one.

The `args` are typed to be the same as the parameters of `TFunc`, and the `result` is now typed to be the same as what `func` returns thanks to [TypeScript's ,](https://www.typescriptlang.org/docs/handbook/utility-types.html#returntypetype)[`ReturnType`](https://www.typescriptlang.org/docs/handbook/utility-types.html#returntypetype)[, utility type](https://www.typescriptlang.org/docs/handbook/utility-types.html#returntypetype).

Looking at the call site for `makeSafe` in the first test, we can see that we will be returned `number`:

```typescript
it("Should return the result on a successful call", () => {
  const func = makeSafe(() => 1);

// on hover
const makeSafe: <() => number>(func: () => number) => () => {
  ...
```

For the next test, we can see `a` is a `number` and `b` is a `string` as expected:

```typescript
it("Should properly match the function's arguments", () => {
  const func = makeSafe((a: number, b: string) => {
    return `${a} ${b}`;
  });

// on hover
const makeSafe: <(a: number, b:string) => string>(func: (a: number, b: string) => string => (a: number, b: string) => {
  ...
```

## Which to Choose ?
Either one of these are good solutions.

I like seeing all of the pieces in the second solution, and find it a bit more clear when comparing to what we see from hovering over the call site in the first solution.

The main takeaway here is to make sure you an array type when you represent the parameters of a function, and spreading the params back in is the only way to really constrain your function.

## Transcript
0:00 This is the first of, of course, two solutions. We have our makeSafe() function where we have two things inside the type arguments, TParams and TReturn. The function that we're representing here, we can put in any amount of arguments which corresponds to TParams. Then, we can return anything here. We put inside the result in TReturn. The args are TParams here.

0:27 Let's see this working. We can see that makeSafe here, the two slots, we have an empty tuple, which represents no parameters, and then number here. We have makeSafe empty, arguments, and number. This means that when we call it, we can't pass anything here because the arguments this function takes are in fact nothing. We can't put anything in there.

0:52 Whereas down here, we have our makeSafe. It has a: number and b: string. This is what's called a named tuple. It's quite an unusual part of TypeScript. It's basically capturing the name of the argument that we give the function here. You can see that I changed it to a c and now it's represented as a c here.

1:13 What we get is this function. We have a: number and c: string here, really, really cool. This means that we get errors when we call it with the wrong stuff. That's what we're doing. We're saving those two things in our generic slots. Our TReturn is unconstrained because this could return anything. It could return void if we wanted it to.

1:37 On makeSafe, let's just say it just returns this. Now, func is going to be type: "success"; result: void as well. It can be literally anything that they return. It can be a promise. It can be whatever we want to, although maybe a promise is a little bit tricky. That might be an interesting extension, some way to add on to this exercise if you wanted to restrict promises.

2:02 Why did I choose then extends any array for TParams? If I don't have this, then TParams is going to yell at me because a rest parameter must be of an array type. I can choose extends unknown array here. I think this will actually work. This behaves exactly the same as the other thing.

2:22 If I pass in this, then it's a: number, b: string. Any array or unknown array is the same here, but it's basically representing any array that you could pass in. Of course, we could represent this as Array<any>, like this.

2:38 The second solution then is I've done this in a slightly different way. Here, we're saying TFunc extends (...args:any \[ ) and then any here. Instead of representing it in two generic slots, we're representing it in just one.

2:58 It's very similar, apart from we're extracting it in a slightly different way so func is now TFunc. The args are Parameters<TFunc>. The result is ReturnType<TFunc>.

3:08 If we look and compare it to the previous one, it's where you do the extraction. You either do the extraction inside here and here, or you do the extraction further down where you need it.

3:22 If there were another one of these union types, type: "whatever", and then everything is, I don't know, returnType: ReturnType<TFunc>, parameters: Parameters<TFunc>, then it would start to get a bit silly. We would start to look at maybe we want to represent it like this instead. If there's only one call site, it seems fine to do it like this.

3:48 If we look at the call site, then you can see we get this to number here, func, blah, blah, blah, blah. If we look here, we see a: number, b: string. Everything is being represented in the generic slot.

4:02 This is entirely up to you. Again, this is the same argument as we had in the previous couple of exercises. I like seeing all of the pieces here. Whereas if we look at the call sites over here, it's a little bit less obvious what this represents. They take up the same amount of space.

4:25 This is kind of dealer's choice as to which one you choose. I did want to lay out both of the options. The main lessons to take from this is to make sure that when you are representing the parameters of a function is to use an array type. Also, understand that spreading these back in makes sense and is the only way to constrain your function.

# 4. Understand Literal Inference in Generics

[

github.com

https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/03-art-of-type-arguments/14.5-literal-inference.explainer.ts

](https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/03-art-of-type-arguments/14.5-literal-inference.explainer.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=adbab83e-7b5f-47d3-bc60-1407e7508d46&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0401-understand-literal-inference-in-generics.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=adbab83e-7b5f-47d3-bc60-1407e7508d46&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0401-understand-literal-inference-in-generics.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Explainer
TypeScript infers types in function arguments differently depending on what you pass in. Let's look at several examples to understand the nuances.

We'll start with a simple identity function that returns the value that is passed in:

```typescript
const returnsValueOnly = <T>(t: T) => {
  return t;
};

const result = returnsValueOnly("a");

// hovering over 'result' shows:
// const result: "a"
```

As you can see, TypeScript infers the type of 'result' to be the literal string "a". This behavior makes sense because we are directly returning the input value.

However, things get interesting when we return the value within an object:

```typescript
const returnsValueInAnObject = <T1>(t: T1) => {
  return {
    t,
  };
};

const result2 = returnsValueInAnObject("abc");
// hovering over 'result2' shows:
// const result2: { t: string }
```

Even though we are passing the string literal "abc", TypeScript infers the type of 'result2' as `{ t: string }`, not `{ t: 'abc' }`. This happens because TypeScript doesn't apply literal type inference when the value is wrapped inside an object or an array. It seems to assume we might want to modify the object later.

When we add a constraint to the type parameter, TypeScript infers the literal type. In this case, we'll add a constraint that `T1` must extend `string`:

```typescript
const returnsValueInAnObjectWithConstraint = <T1 extends string>(t: T1) => {
  return {
    t,
  };
};

const result3 = returnsValueInAnObjectWithConstraint("abc");
// hovering over 'result3' shows:
// const result3: { t: "abc" }
```

Now, TypeScript infers `result3` as `{ t: 'abc' }`, giving us the literal type.

When returning a value inside of an array, TypeScript infers the type as an array of the type passed in:

```typescript
const returnsValueInAnArray = <T2>(t: T2) => {
  return [t];
};

const result4 = returnsValueInAnArray("abc");

// hovering over 'result4' shows:
// const result4: string[]
```

This difference in behavior might seem inconsistent, but it highlights how TypeScript tries to be helpful.

When directly returning a value, it infers the literal type. When returning an object or array, it defaults to the broader type, allowing for potential modification. However, we can use constraints to guide TypeScript towards the desired literal type inference.

Keep these nuances in mind as you work with more complex types and functions!

## Transcript
0:00 It's time to start talking about how TypeScript infers different things in type arguments from things you pass to functions because there's quite a lot here that's nasty and a little bit interesting.

0:12 I've done this in an explainer format because problem solution here is a little bit cruel. Here we've got a function that returns the value only. It just returns whatever you pass in. We've seen this type of function before, and you can see that the result here is actually inferred as A.

0:29 When we return the value inside an object, like we've got T1, T here, then result is actually typed as string. You can see that it's basically exactly the same thing that's going on here. We're just returning T, but here we wrap it in an object, whereas here we just return it. Here it gets typed as string, whereas up here it gets typed as its literal value.

0:56 Inside here we returnsValueInAnObjectWithConstraint. We've added extends string inside here, and now result3 gets typed as its literal value again. What? What? That's mad, right? The reason I think this happens is this seems relatively inconsistent to me. It feels like in the compiler, you have a special case where it sees, OK, if you're just returning that thing, then you should infer it as its literal type.

1:30 This means that if we get like 1 here, it's going to infer it as 1. Whereas if you put it inside an object that's potentially could be mutated afterwards, result2.t equals blah, blah, blah, blah, blah, then this it feels like it should work.

1:50 Whereas it feels like here we're hitting maybe another special case where if you infer it to be a specific string, you can't pass numbers into here for instance, then it's going to yell at you. All of these options, so result3, we can't really reassign it. We can assign it to abc, but we can't assign it to another random string.

2:14 Each of these solutions here, it feels like TypeScript is trying to be as helpful as possible, but he fact that they're inconsistent from each other will throw you off. There are some levers you can pull. If you're just doing a basic identity function, then TypeScript will pretty much always refer, infer the thing that you pass in, although it won't do it deeply, which we'll see in a later explainer.

2:40 If you're returning the value in an object then, or like an array for instance too, so I can actually put T inside here, then it makes sense that this is a string array, as opposed to if I add a constraint to this, T1 extends string, then this will actually put it inside abc here. Now inside result2, I can't push anything that isn't abc. I can't push a random string to it.

3:05 Or maybe I can restart the TS server. This will yell at me, yeah. It's not assignable to parameter or type abc. You can use these constraints to basically tighten TypeScript, and make sure it's inferring the literal inside there. Sometimes the literal is exactly what you want.

3:25 Sometimes you're going to get this more basic inference, where you can basically get something like this, return the value inside an object, and sometimes this will be what you want as well. This should give you a sense that TypeScript is giving you...is trying to be as helpful as it can and you can tweak the constraints or tweak the return values as to what it's typed in, to make it make more sense.

# 5. Understand Generic Inference When Using Objects as Arguments

[

github.com

https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/03-art-of-type-arguments/14.6-literal-inference-on-arguments.explainer.ts

](https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/03-art-of-type-arguments/14.6-literal-inference-on-arguments.explainer.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=853d320c-7a6c-4b2e-8a6e-ef858a12357b&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0501-understand-generic-inference-when-using-objects-as-arguments.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=853d320c-7a6c-4b2e-8a6e-ef858a12357b&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0501-understand-generic-inference-when-using-objects-as-arguments.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Explainer
Let's talk about about inference in generics some more.

Here we have the `acceptsValueOnly` function that we saw earlier. It returns the exact result of what you pass in as well as the literal result:

```typescript
const acceptsValueOnly = <T>(t: T) => {
  return t
}

// const result: "a"
const result = acceptsValueOnly("a")
```

When passing the string wrapped in an object, TypeScript will actually infer it as `string` instead of a literal:

```typescript
const acceptsValueInAnObject = <T1>(obj: { input: T }) => {
  return obj.input
}

// const result2: string
const result2 = acceptsValueInAnObject({ input: "abc" })
```

But if we add `as const` in the function call argument, then TypeScript is going to return the literal `"abc"` instead:

```typescript
// const result2WithAsConst: "abc"
const result2WithAsConst = acceptsValueInAnObject({ input: "abc" } as const)
```

To see what's going on, we can extract the input into a constant called `asConstObj` and then hover over that:

```typescript
// On Hover: const asConstObj: { readonly input: "abc" }
const asConstObj = { input: "abc" } as const

const result2WithAsConst = acceptsValueInAnObject(asConstObj)
```

We see that TypeScript is actually inferring the argument as the literal `"abc"` and it's marked as `readonly` too.

It's interesting that TypeScript doesn't do this by default. You do you, TypeScript!

## Constraints
Moving on to the next function, we can see that we are constraining a type similar to what we saw in the previous explainer:

```typescript
const acceptsValueInAnObjectFieldWithConstraint = <T extends string>(obj: {
  input: T
}) => {
  return obj.input
}

// const result3: "abc"
const result3 = acceptsValueInAnObjectFieldWithConstraint({ input: "abc" })
```

And like the previous function with `as const`, we are getting a result of the literal `"abc"` despite extending the input type to be a string.

This constraint is helping us refine what is being passed in and helping TypeScript infer it as its literal value.

With the `acceptsValueWithObjectConstraint` function, `T` is now representing the entire object instead of the input field:

```typescript
const acceptsValueWithObjectConstraint = <
  T extends {
    input: string
  }
>(
  obj: T
) => {
  return obj.input
}

const result4 = acceptsValueWithObjectConstraint({ input: "abc" })
```

This is really interesting difference.

If we hover over the function call in `result4`, we can see that we are getting the constraint:

```typescript
// hovering over `result4`:
const acceptsValueWithObjectConstraint = <{
  input: string
}>(obj: {
  input: string
}) => string
```

Since the constraint is not on the input itself, and is instead on the entire object, TypeScript doesn't actually infer the input.

This means that `input` is inferred to be a string instead of a literal.

Using `as const` doesn't help us infer a literal here either:

```typescript
const result4WithAsConst = acceptsValueWithObjectConstraint({
  input: "abc",
} as const)
```

When we hover over `result4WithAsConst`, we see that the function is still returning a string despite the `as const` setting the `input` property to be a read-only literal:

```typescript
// On Hover:
const acceptsValueWithObjectConstraint: <{
    readonly input: "abc";
}>(obj: {
    readonly input: "abc";
}) => string
```

Where you put the type argument matters to how it's going to be inferred.

If the entire object is in that slot, then it's not going to be inferred "as well" as as it would be if you had just inferred the literal value.

The further you get away from the thing that you're actually trying to infer, the worse the inference is going to be.

There are some exceptions to that rule, which we'll look at in the future.

It's really key you understand that the choices of what you represent in your type arguments matter for TypeScript's inference.

## Transcript
0:00 You can never talk enough about generic inference. Let's talk a bit more. We've got this acceptsValueOnly function, which we saw in another explainer, which returns the exact result of what you pass in and the literal result too.

0:13 If you pass that wrapped in an object inside here, then it's going to actually...so inside here acceptsValueInAnObject. We've got our T, we've got our object input, and the input is where we're doing the generic inference, then it's typed as string instead.

0:31 If we do this in an as const, so same function as we can see, acceptsValueInAnObject, but we actually make this as const, then this is going to actually infer it as abc instead. That's because if we extract this out here, so const, asConstObj equals this, if we pass that in, then we can see that this is actually inferred as abc here. It's read-only too.

0:59 It makes sense that inside here, then it captures this in the slot, whereas it's interesting that it doesn't do it by default there. Fine, TypeScript. You do you. acceptsValueInAnObjectFieldWithConstraints. Similar to the previous explainer, we're now constraining this type here.

1:21 We're saying input extends string. You can't pass numbers into here, then again, result3 is now typed as abc. Again, this constraint is helping us refine the thing that's being passed in and helping TypeScript infer it as its literal value. That's pretty nice. This one acceptsValueWithObjectConstraint.

1:42 This time, the T is actually like...it's not representing the actual input that's being passed in, it's representing the entire object. This is really interesting difference. Instead now, when we call this previous one, like this call, we can see that this is being grabbed in the type argument, which is the actual string itself, so abc is being grabbed.

2:06 Whereas when we call this one with the same input, then the entire object is being grabbed there. You can see that we do actually have a constraint on here. We can say T extends input string. Because the constraint is not actually on the input itself, it's on the entire object, then TypeScript doesn't actually infer the input there.

2:28 It doesn't infer the literal. This doesn't work with as const either. This is really weird. It's like where you put the generic inference actually matters for what gets inferred, and whether it gets inferred as a literal or not. In other words, if the entire object is in that slot, then it's not going to be inferred as well as if you just infer the literal value on there. That's the difference.

2:55 You have this input T where T extends string, or T if I make this like TObject instead, because it doesn't really matter the name of it, TObject extends input string where the entire object is the thing that's in the type argument.

3:12 The further you get away from the thing that you're actually trying to infer, the more you try to infer in those slots, the worse the inference is going to be. There are some exceptions to that, which we'll look at in the future, but this is really key to understand, that the choices of what you represent in these type arguments do matter for TypeScript's inference.

# 6. Inferring Literal Types from any Basic Type

[

github.com

https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/03-art-of-type-arguments/14.7-string-number-union.problem.ts

](https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/03-art-of-type-arguments/14.7-string-number-union.problem.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=5df3e73f-967a-4b61-8889-66cb19aac255&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0601-inferring-literal-types-from-any-basic-type-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=5df3e73f-967a-4b61-8889-66cb19aac255&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0601-inferring-literal-types-from-any-basic-type-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
Here we have a function called `inferItemLiteral` which takes in a type parameter of `t` and returns that `t` on an object:

```typescript
export const inferItemLiteral = <T>(t: T) => {
  return {
    output: t,
  }
}
```

Now, because it's returning an object, we know from the previous explainers that we're going to have some issues with inference here.

It's not going to be inferring the `"a"` that we pass in, and it's also not going to be inferring the `123` we pass in:

```typescript
// type of result1 is { output: string }
const result1 = inferItemLiteral("a")

// type of result2 is { output: number }
const result2 = inferItemLiteral(123)
```

It's instead going to be just inferring them as their basic types - `string` and `number`.

## Challenge
Your challenge is to make changes so that `t` is inferred as a literal of `"a"` and `123`, instead of the basic types as seen in the tests:

```typescript
type tests = [
  Expect<Equal<typeof result1, { output: "a" }>>,
  Expect<Equal<typeof result2, { output: 123 }>>
]
```

You should also restrict anything else from being passed in. The function should only allow `strings` and `numbers`.

If you feel stuck, reference the previous explainers!

## Transcript
0:00 In this exercise, we have a function called inferItemLiteral. This item literal basically takes in a type parameter of T and returns that T on an object. Now, because it's returning an object, we know that, from the previous explainers, that we're going to have some issues with inference here.

0:18 It's not going to be inferring the A that we pass in, and it's not going to be inferring the 1, 2, 3 we pass in. It's instead going to be just inferring them as they're vague basic types, so string here and number here.

0:31 Now what we want to do is we want to make sure that results here, instead of being output string, is inferred as output A, and here, is inferred as output 1, 2, 3 instead. We also want to restrict anything else from being passed in. We only want to allow strings and numbers here.

0:47 With that information and knowing what we know from the previous explainers, see if you can solve this exercise. Good luck.

# Solution: Accepting Multiple Literal Types

[

github.com

https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/03-art-of-type-arguments/14.7-string-number-union.solution.ts

](https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/03-art-of-type-arguments/14.7-string-number-union.solution.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=b12af3ae-05f9-4c43-884d-efc447f86b59&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0602-inferring-literal-types-from-any-basic-type-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=b12af3ae-05f9-4c43-884d-efc447f86b59&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0602-inferring-literal-types-from-any-basic-type-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
Adding `T extends string`, will stop anything else from being passed in, while getting us inference on the strings that are passed in:

```typescript
export const inferItemLiteral = <T extends string>(t: T) => {
  return {
    output: t,
  }
}
```

Now `result1` is going to be inferred as `"a"` instead of `string`:

```typescript
// Type of result1 is { output: "a" }
const result1 = inferItemLiteral("a")
```

But now we can't pass in numbers.

If we change `inferItemLiteral` to `T extends number`, then we can pass in numbers, but we can't pass in strings:

```typescript
export const inferItemLiteral = <T extends number>(t: T) => {
  return {
    output: t,
  }
}
```

The solution then is to use a union type by passing in `T extends string | number`:

```typescript
export const inferItemLiteral = <T extends string | number>(t: T) => {
  return {
    output: t,
  }
}
```

Now the `"a"` and `123` get inferred, and nothing else can be passed in:

```typescript
// Type of result1 is { output: "a" }
const result1 = inferItemLiteral("a")

// Type of result2 is { output: 123 }
const result2 = inferItemLiteral(123)
```

This passes all of our tests!

This is a neat little trick that you can use when you want to accept multiple things into an identity function or into a generic slot, and you want them to be inferred to their literals.

## Transcript
0:00 The solution here relies on the knowledge that you picked up from the explainers. We know that we can say T extend string. What that will do is it will stop anything else from being passed in, but we will get inference on the strings that we do get passed in. This is being inferred as A.

0:15 We can do the same for a number too, so inferItemLiteral this number, it now gets inferred as a number, but we now can't pass strings in. It seems like we've got the same problem but going two different directions. What if we did T extends string or number? Now, the A gets inferred, and the 1, 2, 3 gets inferred, and you can't pass anything else in. This passes all of our tests.

0:40 This is a neat little trick that you can pick up when you want to accept multiple things into an identity function, or into a generic slot and you want them to be inferred to their literals. It hopefully should fit with your mental model that you've picked up so far with how TypeScript infers these literals.

# 7. Infer the Type of an Array Member

[

github.com

https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/03-art-of-type-arguments/15-array-or-array-member-in-generics.problem.ts

](https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/03-art-of-type-arguments/15-array-or-array-member-in-generics.problem.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=52857a10-be2a-4adf-bd7d-781b2ae20fca&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0701-infer-the-type-of-an-array-member-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=52857a10-be2a-4adf-bd7d-781b2ae20fca&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0701-infer-the-type-of-an-array-member-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
This exercise begins with a `makeStatus` function that takes in an array of `TStatuses` that extends an array of strings. The statuses are then returned, kind of like an identity function:

```typescript
const makeStatus = <TStatuses extends string[]>(statuses: TStatuses) => {
  return statuses;
};
```

Looking at the tests, we can see that we're expecting `statuses` to be an array of `INFO` or `DEBUG` or `ERROR` or `WARNING`, all of the things that we pass in here.

```typescript
const statuses = makeStatus(["INFO", "DEBUG", "ERROR", "WARNING"]);

type tests = [
  Expect<Equal<typeof statuses, Array<"INFO" | "DEBUG" | "ERROR" | "WARNING">>>,
];
```

However that's not what we're getting-- instead, we just get an array of strings.

## Challenge
Your job here is to figure out why we're not getting the expected output, and what needs to be done to fix it.

This is a tricky challenge, with a surprisingly small fix in the form of switching some things around in a couple places.

You don't need to reach for any external libraries or type helpers for this!

## Transcript
0:00 This exercise is kind of a nasty one, so sorry about this. We have a makeStatus function where we're taking in TStatuses, and it's extending an array of strings here. Our statuses are representing as TStatuses, and we just return them. It's kind of like an identity function but just for a list of statuses basically.

0:23 We're expecting statuses here to be an array of "INFO" or "DEBUG" or "ERROR" or "WARNING", all of the things that we pass in here, but it's not. It's just an array of strings.

0:34 Your job here is to figure out why that's happening, and what you can do here to change it. It's surprisingly small what you need to do. Don't spend too long on this. You don't need any external libraries, don't need any helpers or anything like that. It's just a slight switch around of a couple of pieces.

0:55 Good luck.

# Solution: Constrain to the Array Member, Not the Array

[

github.com

https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/03-art-of-type-arguments/15-array-or-array-member-in-generics.solution.ts

](https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/03-art-of-type-arguments/15-array-or-array-member-in-generics.solution.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=c2c8b61b-28c5-4b93-b7b6-dbe594c52fef&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0702-infer-the-type-of-an-array-member-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=c2c8b61b-28c5-4b93-b7b6-dbe594c52fef&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0702-infer-the-type-of-an-array-member-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
The solution is kind of tricky to find, so let's take it step-by-step.

Here's what the starting point was:

```typescript
const makeStatus = <TStatuses extends string[]>(statuses: TStatuses) => {
  return statuses;
};
```

Inside of the generic slot, `makeStatus` is being passed in an array of strings.

It looks like it should be inferred deeper, but we're actually not inferring the members of the array that gets passed in.

In TypeScript, the members of an object (including arrays) aren't going to be inferred unless you really point its focus there.

## Updating makeStatus
Remember our generics rule of thumb to always go with the lower level.

With this in mind, we can first update the `statuses` to be a `TStatus` array instead of just `TStatus`:

```typescript
const makeStatus = <TStatuses extends string[]>(statuses: TStatuses) => {

// after:
const makeStatus = <TStatuses extends string>(statuses: TStatuses[]) => {
```

With this change we end up with the potential specific statuses of `"INFO" | "DEBUG" | "ERROR" | "WARNING"` instead of just `string`.

I'm honestly not completely sure how this works, but it looks like the compiler takes the combination of `extends string` and `statuses: TStatuses[]` as a sign it needs to infer the members literally.

If we remove the `extends string`, TypeScript will show the return type as just `string` instead of the specific options we want.

This is proof that going with the lowest-level and tightest representation in your generics will lead you to good results. It's even better when combined with constraints that lead us to good inference.

## Transcript
0:00 We've got this set up so that, TStatuses extends string array, we've still got our issue. The solution here is a tricky one to find. What's going on here is that, inside the generic slot, the thing that's being passed into makeStatus is an array of strings.

0:20 Even though it looks like it should be inferred deeper, it's not being inferred deeper. We're not inferring the members of that array. When you have an object like this, because an array is an object, basically, then TypeScript is not going to infer its members unless you point its focus there.

0:43 We know that the principle that we've had before is that it's often better to go lower. If you have a choice between representing the higher object or the members of that object, you should probably represent the members of that object, if that's all you care about. In this case, that is all we care about.

0:58 What happens if, instead of TStatuses, we represent it as TStatus? Now, what's happening is that the thing that's being inferred is the thing inside the generic slots, so we end up with info or debug or error or warning instead of just string.

1:17 I don't know why this works. There's probably some bit in the compiler that's saying, "OK. If it's representing this, then go deeper in." We can even just remove this, I think. If we remove this, then it just goes into string here. There's something in the compiler that is telling it to, "When you have an extend string here and when it's in a member of an array, then infer those members literally."

1:46 There is some stuff coming in 5. that will make this easier, but I will cover that in a different section. What this proves is that the rule of thumb of, "When you have a choice, go lower. Don't choose the high representation. Choose the lowest, tightest representation," in general leads you to some good results.

2:05 Also, constraining this to be only the things that we care about is also important for getting this good inference.

# 8. Generics in a Class Names Creator

[

github.com

https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/03-art-of-type-arguments/16-class-names-creator.problem.ts

](https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/03-art-of-type-arguments/16-class-names-creator.problem.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=7328ce8e-b877-4a86-a9cc-93aa3378857d&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0801-generics-in-a-class-names-creator-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=7328ce8e-b877-4a86-a9cc-93aa3378857d&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0801-generics-in-a-class-names-creator-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
Consider this `createClassNamesFactory` function that's similar to one I built for getting Tailwind class names that could then be passed into a React component:

```typescript
const createClassNamesFactory =
  (classes: unknown) =>
  (type: unknown, ...otherClasses: unknown[]) => {
    const classList = [classes[type], ...otherClasses];
    return classList.join(" ");
  };
```

For example, after creating a `getBg` factory, calling `getBg('primary')` will return `'bg-blue-500'`.

This pattern is common in instances where you have a lot of class names you want to be able to stack in various configurations.

## Challenge
The goal with the `createClassNamesFactory` function is to be able to pass in different variants and have them be type safe.

As seen in the tests, you shouldn't be able to pass in invalid inputs, however excess classes that are passed in should be concatenated and returned.

Your challenge is to figure out what shape the generics should be, and where they should live.

Like before, there are two solutions here. See if you can find them both!

## Transcript
0:00 In this exercise, we have a createClassNamesFactory function. This is taken from an example of when I was using Tailwind. I love Tailwind, by the way. It's a brilliant, brilliant library.

0:12 What I wanted to do was create a function which let me basically get some class names by a variant. What I wanted to do was be able to call getBg primary and then return me some class names which I could pass into my React component.

0:29 This is a very, very common thing if you're working with a library that uses a lot of class names and you want to stack them in various configurations.

0:38 What we want to do is be able to pass in a record of strings into our classNames factory. From that, we want to infer the type here so that we can be able to pass in different variants and have that be type-safe.

0:52 We shouldn't be able to pass in stuff that isn't in our object here. We shouldn't be able to pass invalid stuff to classNames factory that it can't work out.

1:04 One final thing, too, is that you should be able to pass excess classes to this, so otherClasses unknown. Where are they. For instance, getBg, you should be able to pass text-white, rounded, p-4, as many of those as you want to as well, and it should concatenate them together.

1:23 All of the implementation is working. There's a couple of errors here, but your job is to figure out what shape the generics should be and where they should live. Good luck.

# Solution: Two Approaches to Working with Class Names

[

github.com

https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/03-art-of-type-arguments/16-class-names-creator.solution.1.ts

](https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/03-art-of-type-arguments/16-class-names-creator.solution.1.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=e61d94cd-115b-4785-b915-771780d3daa5&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0802-generics-in-a-class-names-creator-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=e61d94cd-115b-4785-b915-771780d3daa5&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0802-generics-in-a-class-names-creator-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution 1
The first solution is to add `TVariant` which extends `string`. From there, we'll take the `Record` from there where `TVariant` will be the key along with the `string` value:

```typescript
const createClassNamesFactory =
  <TVariant extends string>(classes: Record<TVariant, string>) =>
  (type: TVariant, ...otherClasses: string[]) => {
    const classList = [classes[type], ...otherClasses];
    return classList.join(" ");
  };
```

In this solution we only need the `TVariant` key because we don't care about the returned value or need to infer the literal of it. We just need to create a class names factory.

## Solution 2
The other way of doing it is by representing `TClasses` as a `Record` of `string` for the key and value.:

```typescript
const createClassNamesFactory =
  <TClasses extends Record<string, string>>(classes: TClasses) =>
  (type: keyof TClasses, ...otherClasses: string[]) => {
    const classList = [classes[type], ...otherClasses];
    return classList.join(" ");
  };
```

This approach allows us to easily identify if we got something wrong. For example, if we tried to pass in a string and a number, TypeScript it will yell at us for not being assignable to type number.

In the return, we use `keyof TClasses` instead of the `TVariant`s we used in the first solution.

This exercise is similar to what we've done before.

You don't always have to work too hard to get the generic inference working, and both of these solutions work beautifully.

## Transcript
0:00 We have two solutions here. The first solution is to take TVariant, which is going to be a string, and then do this thing where we say, "OK, we want the record of that." That TVariant is going to be the key, and then we're going to extract the strings from there.

0:18 That's the only generic we need, actually, because we don't really care about the thing that gets returned or infer in the literal of it. All we need to do is say createClassNamesFactory, we end up with primary or secondary in the type argument, and we get getBg, which is then primary or secondary.

0:36 That means we get this lovely bit of auto-complete here, which is what we wanted anyway. Then the otherClasses is represented as an array of strings, which gets appended onto the end. This is one way of constructing it.

0:50 The other way of doing it is by representing TClasses as a Record of string, string.

0:55 Here, if we got this wrong, for instance, and it was string and number, let's say, then all of these would yell at us for not being assignable to type number, but then TClasses gets to represent just that thing. That whole box gets put into the type argument, which is nice too.

1:15 Again, instead of representing TVariant here, then what we get is keyof TClasses. This is a very similar exercise to what we've done before, and you notice that we don't have to work too hard to get all of this beautiful generic inference working.

1:33 Again, it's giving us complaints here because we can't pass in something that isn't an object, so it's all working beautifully. Well done.

# 9. Generics in React Query

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=6cad785f-f1f8-46b8-afec-ff18befca551&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0901-generics-in-react-query.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=6cad785f-f1f8-46b8-afec-ff18befca551&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0901-generics-in-react-query.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Explainer
React Query author Tanner Linsley explains how generics flow through functions in an app that uses the library.

Instead of using generic names like T, U, V, Tanner suggests being more descriptive.

He emphasizes the importance of passing generics in the right slots and hovering over the options object to see their signature and order.

Tanner also describes how you specify generics from the top down, but they infer from the bottom up. This lets you be very expressive with where the inference sites.

## Resources

[

github.com

https://github.com/TanStack/query

](https://github.com/TanStack/query)

[

react-query-v3.tanstack.com

https://react-query-v3.tanstack.com/overview

](https://react-query-v3.tanstack.com/overview)

[

twitter.com

https://twitter.com/tannerlinsley

](https://twitter.com/tannerlinsley)

## Transcript
0:00 I chatted to Tanner Linsley, the author of React Query about generic inference. Here's what he had to say.

0:05 Something that took me a while to realize with TypeScript is that generics flow through your app in all the different functions, just based on how you pass generics around.

0:17 You're going to see TData and TQueryFnData and TQueryData. You're going to see that everywhere. Something to understand is that we didn't register this TQueryFnData generic somewhere global to our system.

0:32 This is just a name that we chose. I will fight anybody who says, "You need to name your generics as just T or U or V or whatever." Give them names, like that's ridiculous, but we just consistently named everything.

0:45 You have to make sure that you're passing those generics in the right slots. You'll see with this QueryObserverFunction or Options, like all the options objects, you have to pass TQueryFnData as the first one to those options objects.

1:01 If you hover over one of those options objects, it will show you the signature and what it expects the order of those generics. These generics just represent some type that your users have given you. Either that they've supplied directly or that something a function they've given you is returning or whatever.

1:22 The weird thing about generics is they feel it like you can specify them from the top down of your architecture, but they can fill in from the bottom up. That's something that took a really long time to understand, when I was learning about generics.

1:41 You can see that we're not really inferring anything in these higher types, these higher functions. We're just shuttling generics down into things that we extend or options objects or whatever.

1:56 Let's dive into QueryOptions here. See, now I have QueryOptions and this one's not shuttling a ton, but try and find this TQueryFnData in here. We're passing this generic down to a QueryFunction type, and this is the QueryFunction that users are passing in.

2:15 Let's open that up. It says, "This is a function that gives you the context that has a QueryKey and then returns either a promise or directly the TQueryFnData." All the way down here in this QueryFunction type, users pass in their QueryFunction that returns a list of blog posts. That type, that list of blog posts now is going to work its way up.

2:45 Let's pause the interview there briefly to look at the useQuery hook and explain exactly how these generics flow through. We've got this useQuery hook, which is how you consume React Query most of the time. We've got TQueryFnData, which is what Tanner was talking about.

3:00 Inside here, we have options, which is useQueryOptions, where we're passing TQueryFnData. Let's command click, look at that. Here we have useQueryOptions. TQueryFnData is a kind of empty interface here, which is extending UseBaseQueryOptions. Again, we're sticking everything in here too.

3:21 UseBaseQueryOptions, this extends ContextOptions, QueryObserverOptions. Let's take a look at ContextOptions. Oh yeah, it's a little bit of stuff here. How about QueryObserverOptions? QueryObserverOptions, we're now inside packages/query-core as well.

3:37 TQueryFnData extends QueryOptions and now we're back where we were. Inside QueryOptions with TQueryFnData and the QueryFunction gets put inside here.

3:48 This means that when we try this out and when we call useQuery, let's say, const = useQuery. Now, when we pass in queryFn, let's say, we're returning an array of numbers, one, two, three. This is going to get locked in inside there and we have that inside our TQueryFnData.

4:09 All of those generics just feed in all the way around the entire library and they build out all of this inference. When Tanner was saying, this gets inferred from the bottom, up all the way through here, if we just roll through that again.

4:23 UseQueryOptions, UseBaseQueryOptions, to QueryObserverOptions, to QueryOptions, to QueryFunction, QueryFunction, finally there, we have a function that returns either T or Promise T.

4:38 That fills in from the bottom up and then the rest of the function or the rest of the types within the scope of the function, if that makes sense, can then use the inferred type.

# Resources

[

www.typescriptlang.org

https://www.typescriptlang.org/docs/handbook/2/keyof-types.html

](https://www.typescriptlang.org/docs/handbook/2/keyof-types.html)

[

www.typescriptlang.org

https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-assertions

](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-assertions)

[

www.typescriptlang.org

https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type

](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)

[

github.com

https://github.com/microsoft/TypeScript/blob/9a79aeb65058b54bc28df04cd32feccfc9066c8d/lib/lib.es5.d.ts#L259-L264

](https://github.com/microsoft/TypeScript/blob/9a79aeb65058b54bc28df04cd32feccfc9066c8d/lib/lib.es5.d.ts#L259-L264)

[

www.typescriptlang.org

https://www.typescriptlang.org/docs/handbook/2/objects.html#tuple-types

](https://www.typescriptlang.org/docs/handbook/2/objects.html#tuple-types)

[

www.typescriptlang.org

https://www.typescriptlang.org/docs/handbook/utility-types.html#parameterstype

](https://www.typescriptlang.org/docs/handbook/utility-types.html#parameterstype)

[

www.typescriptlang.org

https://www.typescriptlang.org/docs/handbook/utility-types.html#returntypetype

](https://www.typescriptlang.org/docs/handbook/utility-types.html#returntypetype)

# (d) Advanced Generics



# 1. Generics with Conditional Types

[

github.com

https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/04-generics-advanced/17-you-say-goodbye-i-say-hello.problem.ts

](https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/04-generics-advanced/17-you-say-goodbye-i-say-hello.problem.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=67e9e5d2-eacc-4d08-a808-822f1cc66bc0&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0101-generics-with-conditional-types-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=67e9e5d2-eacc-4d08-a808-822f1cc66bc0&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0101-generics-with-conditional-types-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
For this exercise, we have a function called `youSayGoodbyeISayHello` where you pass in a `greeting`.

If the `greeting` is `"goodbye"`, we return `"hello"`, otherwise we return `"goodbye"`:

```typescript
function youSayGoodbyeISayHello(greeting: unknown) {
  return greeting === "goodbye" ? "hello" : "goodbye";
}
```

This all appears to work on the runtime level, but actually it's not working on the type level.

In the tests, we can see that there are errors.

For example, here we are expecting `result` to be `"goodbye"` because we're passing in `"hello"`, but actually we're getting a union type of `"goodbye"` or `"hello"`:

```typescript
const result = youSayGoodbyeISayHello("hello");

// ERROR
type test = [Expect<Equal<typeof result, "goodbye">>];

// hovering shows:
const result: "goodbye" | "hello"
```

The opposite test also errors.

## Challenge
Your challenge is to add a type argument and conditional type to `youSayGoodbyeISayHello` so that it works on both the type and runtime levels.

Hint: The solution uses something unexpected that might seem hacky!

## Transcript
0:00 For this exercise, we have a function called youSayGoodbye and ISayHello. We're passing in a greeting here. If the greeting is goodbye, we return hello. Otherwise, we return goodbye.

0:10 This all appears to work on the runtime level, but actually, it's not working on the type level. We're expecting result here to be goodbye because we're passing in hello, but we're getting a union type of goodbye or hello. That's interesting. Same is true in the reverse, of course.

0:27 We probably know that we're going to need to add a type argument to this function. We're probably also going to need to use a conditional type as well.

0:36 I'll give you a clue to the solution here, which is the solution uses something unexpected and something that you may feel is a little bit illegal or a little bit troublesome or, "Maybe I shouldn't be using this in the solution." The solution will feel hacky. That's the way of saying it.

0:54 Good luck. Your job here is to try to get this working on the type level as well as the runtime level.

# Solution : Ensure Runtime Level & Type Level Safety with Conditional Types

[

github.com

https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/04-generics-advanced/17-you-say-goodbye-i-say-hello.solution.1.ts

](https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/04-generics-advanced/17-you-say-goodbye-i-say-hello.solution.1.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=7cace94d-9461-4106-89c2-d049b137bce6&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0102-generics-with-conditional-types-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=7cace94d-9461-4106-89c2-d049b137bce6&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0102-generics-with-conditional-types-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
Let's build this solution together from our starting point:

```typescript
function youSayGoodbyeISayHello(greeting: unknown) {
  return greeting === "goodbye" ? "hello" : "goodbye";
}
```

## Adding a Type Argument
We need to capture a type argument for `greeting` which we can call `TGreeting`, then replace the `unknown` type.

In order to make sure it's inferred properly we could have it `extend string`, but since we know we're only dealing with "hello" or "goodbye" we can be more specific:

```typescript
function youSayGoodbyeISayHello<TGreeting extends "hello" | "goodbye">(greeting: TGreeting) {
    ...
```

This prevents random strings from being passed in, which should be included in the texts.

This change also means that we have `TGreeting` being inferred properly, but we still are getting a union type back.

## Adding a Conditional Type
To fix the inference, we'll use a conditional type to check if `TGreeting extends "goodbye"`.

If it does, we'll return `"hello"`, otherwise we'll return `"goodbye"`. Notice that we have autocomplete working in VS Code at this point:

```typescript
function youSayGoodbyeISayHello<TGreeting extends "hello" | "goodbye">(
  greeting: TGreeting,
): TGreeting extends "hello" ? "goodbye" : "hello" {
  return (greeting === "goodbye" ? "hello" : "goodbye");
}
```

However, there's still an error:

```typescript
Type '"hello" | "goodbye"' is not assignable to type 'TGreeting extends "hello" ? "goodbye" : "hello"'.
```

This is a common error people see when using conditional types in return types, because TypeScript isn't smart enough to match the runtime code to the type level code.

To fix it, we need to add an `as any` to the return. It might look strange, but it's the only way we can tell TypeScript that we know better in this situation.

```typescript
function youSayGoodbyeISayHello<TGreeting extends "hello" | "goodbye">(
  greeting: TGreeting,
): TGreeting extends "hello" ? "goodbye" : "hello" {
  return (greeting === "goodbye" ? "hello" : "goodbye"); as any
}
```

## Adding a Type Helper
The above will solve the challenge, but it's also possible to use a type helper in order to clean up the code a bit.

The `TGreet` `ing extends` check can be extracted into a `GreetingResult`:

```typescript
type GreetingResult<TGreeting> = TGreeting extends "hello"
  ? "goodbye"
  : "hello";
```

Then the `GreetingResult` replaces the `return`:

```typescript
function youSayGoodbyeISayHello<TGreeting extends "hello" | "goodbye">(
  greeting: TGreeting,
) {
  return (
    greeting === "goodbye" ? "hello" : "goodbye"
  ) as GreetingResult<TGreeting>;
}
```

## The Takeaway
Both solutions work.

The major difference is that when using a type helper, the typing is done in the return type where in the first solution it was being done in the "`as`".

The big takeaway here is that TypeScript isn't clever enough on its own to map a conditional type in the return of a function.

In these situations, adapt one of the solutions from above!

## Transcript
0:00 Let's build this one up from scratch and see where we get to. We know that this greeting here, which is currently typed as unknown, we're going to have to capture that in a type argument. We need to know whether it's hello or goodbye that they're passing in so that we can pass the opposite back.

00:16 What we're going to do is we can put in TGreeting here. We'll just capture it in TGreeting. Whenever you do that and you have some function call examples, you should check whether it's inferring properly. Actually, it's not. It's being inferred as string here.

0:32 We can help this along if we want to. We can say, "extends string." Really, we know that this is either going to be hello or goodbye here. What this does, it means you can't pass in something random like blah, blah, blah, blah, blah, which isn't part of the test but is probably something we should include here.

0:50 We've got our greeting TGreeting that's being inferred properly, but we're still getting the union type back. What we should do is type the return type. We're going to do this with a conditional type. TGreeting, we're going to check if it extends goodbye. If it does, then we'll return hello. Otherwise, we'll return goodbye.

1:13 Now, all of our tests are passing, actually. We have this result being typed as goodbye when we pass in hello. We've got hello being passed in there. Because of our constraint, we even get autocomplete here too, which is really nice. Now, if I pass in goodbye, I'm going to get hello. It's very, very pleasing, lovely, but there's an issue.

1:32 Blah, blah, blah, blah, blah is not assignable to type TGreeting extends good...There's a long type error here. There's a real issue here. A lot of people run into this when they first start doing conditional types in return types, which is that really this function...

1:53 TypeScript isn't smart enough to match this runtime stuff, all of these little nodes here, the flow of this code, onto your type. It can't tell that those things match. You need to do an as inside here.

2:09 The cleanest way to do it would be to wrap these in parentheses and say, "as any" here. This may look completely bonkers to you, but it's one of the only ways to actually tell TypeScript that this is what you were trying to do, that you know better than TypeScript in this situation.

2:25 If we look at the second solution here, then this just takes it and wraps it in a type helper there. What we get is you can actually just as that whole thing as the GreetingResult TGreeting. This actually replaces the return type

2:44 If we look at the other one again, actually pull this on the other side here, then what we can see is -- I'll zoom out just a touch -- on this side, we're doing the typing in the return type. On this side, we're doing the typing in the as. I can actually just swap this out if I want to. It still will work there. You get result being goodbye, result being blah, blah, blah.

3:09 The idea is that this raw statement here, TypeScript isn't clever enough to actually map a conditional type on it. If you're using a conditional type in the return type of a function, you're probably going to need to use as somewhere.

# 2. Fixing Errors in Generic Functions

[

github.com

https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/04-generics-advanced/17.5-inference-inside-generic-functions.problem.ts

](https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/04-generics-advanced/17.5-inference-inside-generic-functions.problem.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=9a367567-091f-498b-82b8-5c2877f351cd&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0201-fixing-errors-in-generic-functions-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=9a367567-091f-498b-82b8-5c2877f351cd&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0201-fixing-errors-in-generic-functions-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
Here is a function `remapPerson` that takes in a `key` and a `value` for that key:

```typescript
export function remapPerson<Key extends keyof Person>(
  key: Key,
  value: Person[Key],
): Person[Key] {
  if (key === "birthdate") {
    return new Date();
  }

  return value;
}
```

This problem has a dynamic `key` inside that is checked, and then the appropriate value returned.

For example, we could call `remapPerson` with `'age'` and a `value` of 123123 and it would be typed as a `number`:

```typescript
remapPerson("age", 123123);
// hovering would show remapPerson(key: "age", value: number): number
```

If we call it with `'birthdate'` then it would be typed as a `Date`:

```typescript
remapPerson("birthdate", 123123);
// hovering would show remapPerson(key: "birthdate", value: Date): Date
```

While the above works, we have an error to fix:

```typescript
Type 'Date' is not assignable to type 'Person[Key]'.
Type 'Date' is not assignable to type 'never'.
```

## Challenge
Your challenge is to fix this error by making changes only at the type level. You will not be adding any runtime code.

Hint: It might feel like a hack, but it's not!

## Transcript
0:00 In this problem, we have most of a function handled for us. We've got a remapPerson thing. What we're doing here is we're saying, "Key extends keyof Person." We're taking in the key and then we're taking in the value of that key.

0:17 We can say, remapPerson, let's say, age and let's say, value 123123. This is then typed as a number there, which is pretty clever in itself. If we get birthdate here, then this is going to be a value: Date. But we're not interested in the usage of this. All we're interested in is solving this error, "Type 'Date' is not assignable to type 'Person\[Key'. Type 'Date' is not assignable to type 'never'."

0:45 I'm intrigued by what you think of this. This isn't a real function, necessarily. It's not one that I would find in my app, but this problem of you have a dynamic key inside here. You're checking if the key is a certain value and then you return a certain value based on that. What it's saying is, "If key is birthdate, then ignore the value that the user passes in."

1:09 I want you to try to find a solution to this error using purely only type level stuff. You're not going to be adding any runtime stuff here. Again, this is going to feel like a hack.

1:21 Good luck.

# Solution: Fixing the "Not Assignable" Error

[

github.com

https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/04-generics-advanced/17.5-inference-inside-generic-functions.solution.ts

](https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/04-generics-advanced/17.5-inference-inside-generic-functions.solution.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=4b48093b-9b64-4d2e-ba34-24f9befdf6dc&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0202-fixing-errors-in-generic-functions-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=4b48093b-9b64-4d2e-ba34-24f9befdf6dc&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0202-fixing-errors-in-generic-functions-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
The solution here highlights a limitation of TypeScript that you need to build into your mental model.

Here's the `remapPerson` function we started with:

```typescript
export function remapPerson<Key extends keyof Person>(
  key: Key,
  value: Person[Key],
): Person[Key] {
  if (key === "date") {
    return new Date();
  }

  return value;
}
```

Having a return type of `Person[Key]` tells us the function that it can be called with any key, or a union of some of the keys.

For example, means that we can pass either `number` or `Date` into `remapPerson`, but TypeScript can't narrow the return type inside of a generic function. The return types will be resolved as `never`.

To get around these strange errors when narrowing inside of generic functions, you need to put an `as` on the return type.

In this case, the return type should be matched to `Person[Key]`:

```typescript
export function remapPerson<Key extends keyof Person>(
  key: Key,
  value: Person[Key],
): Person[Key] {
  if (key === "birthdate") {
    return new Date() as Person[Key];
  }

  return value;
}
```

It might seem annoying to use `as`, but it's often the right choice!

## Transcript
0:00 The solution here is a little bit annoying and shows a limitation of TypeScript's that you need to build into your mental model. When we have a remapPerson function like this and the return type is Person \[Key , we're basically saying, "OK, this can be called with any key."

0:19 Weirdly, it can also be called with a union type of some of the keys to. I could say remapPerson. If I wanted to, I could manually pass in "age" | "birthdate", something like this. What this means then is I can pass either number or dates into here, so I can pass new Date().

0:42 Because of this wrinkle, TypeScript can't trust any narrowing inside a generic function. What we've got here is we've got this, if key is birthdate, then return a new Date.

1:00 What I should be able to say inside here is it should give me a proper error, if I tried to return a number for the user's birthdate, because it doesn't meet the contract in my person up here, but it's not telling me that. It basically resolves any return types inside these narrowing's as never, because it can't trust that key breaks down at this level.

1:26 What this means, if you start getting these strange errors when you're doing this narrowing inside generic functions is you need to put an as on it. If you like it, then you should have put an as on it. What we've got here is return new Date() as any.

1:41 What's the actual proper type that we should be returning there, because as any feels a little bit gross? Well, we can slap on as Person \[Key . We can match the return type there, because here you can see that value is typed as Person \[Key\]. If I remove this now, this is still typed as Person \[Key\], because that's what the value is literally typed as there.

2:04 This can be a frustrating thing when you start to look at generics, especially the inside of generic functions and start to feel, "Oh dear, I'm starting to reach the levels of what TypeScript can do here.

2:17 Trust yourself, trust that when you're in these situations and as is usually fine and usually exactly what you want. These situations can be annoying, but just knowing that should make it feel a little bit easier.

# 3. Generic Function Currying

[

github.com

https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/04-generics-advanced/18-generic-currying.problem.ts

](https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/04-generics-advanced/18-generic-currying.problem.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=d766437c-1ac1-4f5b-ad01-f84c78cda3dc&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0301-generic-function-currying-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=d766437c-1ac1-4f5b-ad01-f84c78cda3dc&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0301-generic-function-currying-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
This `curryFunction` function takes a value and returns a function that returns another function, eventually resulting in an object:

```typescript
export const curryFunction =
  <T, U, V>(t: T) =>
  (u: U) =>
  (v: V) => {
    return {
      t,
      u,
      v,
    };
  };
```

The function currently only infers the type of the first function being passed:

```typescript
const result = curryFunction(1)(2)(3)

// hovering shows:
const result: {
  t: number;
  u: unknown;
  v: unknown;
}
```

## Challenge
Your challenge is to update `curryFunction` so that inference works for every argument passed in.

## Transcript
0:00 In this problem, we have a function called curryFunction. What this does is it basically takes...You pass in the first value, which returns a function, which returns another function, which returns another function, and you eventually end up with a result that looks like this object.

0:19 You basically call this first function, which returns another function which you call, which then returns another function which you call. This is classic function currying.

0:28 What we've got here is we have a result where it looks like only the first one of this is being inferred. If I change this to a string, for instance, then here, yeah, it's only inferring string but it's not inferring number for any of the others there.

0:46 If we look at this structure here, we can see that we have this T, U, V, and all of these type arguments are on the first function here. Your job is to try to get the inference working so that we have this number being inferred here, number being inferred there, and number being inferred there.

1:05 Good luck.

# Solution: Fix Type Inference in Curried Functions

[

github.com

https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/04-generics-advanced/18-generic-currying.solution.ts

](https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/04-generics-advanced/18-generic-currying.solution.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=13dc448e-d817-4169-88fd-6afe1ef9a50a&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0302-generic-function-currying-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=13dc448e-d817-4169-88fd-6afe1ef9a50a&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0302-generic-function-currying-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
The starting point of `curryFunction` had all of the type arguments attached to the first function.

This means that they can't be inferred because they are always attached to the first function call.

In order to fix this, we have to spread out each type argument across different function calls:

Before:

```typescript
export const curryFunction =
  <T, U, V>(t: T) =>
  (u: U) =>
  (v: V) => {
    return {
      t,
      u,
      v,
    };
  };
```

After:

```typescript
export const curryFunction =
  <T>(t: T) =>
  <U>(u: U) =>
  <V>(v: V) => {
    return {
      t,
      u,
      v,
    };
  };
```

So instead of calling `curryFunction` like this:

```typescript
const result = curryFunction<number, number, number>(1)(2)(3)
```

We call it like this:

```typescript
const result = curryFunction<number>(1)<number>(2)<number>(3)
```

Taking advantage of inference, we can remove the type arguments so our call of `curryFunction(1)(2)(3)` will work.

Here's how it breaks down:

```typescript
const secondFunc = curryFunction(1)
const thirdFunc = secondFunc(2)
const result = thirdFunc(3)
```

Hovering over result would show us that `t`, `u`, and `v` are all numbers. Changing the call to `thirdFunc` to be a string would work as expected as well.

## Functions Can Capture Their Own Generic Arguments

The fact that functions can capture their own generic arguments is one of the critical ideas to understand.

Sometimes you might be getting bad inference because your generics are in the wrong slots.

This bit of knowledge is key to understanding the best way to structure chained arguments and other complicated types.

## Transcript
0:00 Okay, the solution here is really interesting. We've got a curry function and Essentially what's going on here is if you hover over curry function itself you end up by seeing number unknown unknown in the type argument slots.

0:15 That's because all of the type arguments are actually attached to the first function here and what that means is that you basically can't be inferred from anything nor can V be inferred from anything because type arguments are always attached to a function call.

0:34 So what this means is that the fix is actually to move these on to in fact let me show you one more thing before I do that I can actually like make this work by passing in number number number.

0:47 Into here and so what you end up with is T UV number number number and so if I try and like put anything that isn't a number in here then it's going to yell at me because I'm filling up each of these slots on the first function, but this is the issue.

1:01 The way to fix this is actually move them so that they're on each function call here so instead of basically having number number number I then have number number and number here.

1:16 So the way that this then works is I'm basically passing in type arguments for each of these curried functions and of course I can actually remove these so what we get now is we get curry function

1:29 Which is inferring T that's the number that's being passed in which then returns a generic function which then grabs the you there. Which is being sort of like done there. I can't hover over anything there. Actually if I try to say first funk or yeah, this is actually the second funk because it's calling that one there then third funk is

1:51 Second funk calling it with a two and then const fourth funk is I really didn't think this through. Let's see three in fact, this isn't the fourth funk. This is actually the result. There you go. That does make sense so what's going on then second funk?

2:08 This is then a you which is then being like captured in there and then V is being captured inside V is being captured inside here. If I change this to a string for instance, then this result is going to be Tu number and V as a string so this is a critical idea when it comes to like generic inference is that each function can actually capture its own generic arguments

2:36 Sometimes you can be getting really bad inference because your generics are in the wrong slots so if this one is up here if you imagine that like this was just like a string then when this function is called you has nothing to hang its hat on and even when this is you then

2:53 This still doesn't have anything to infer from you can pass a type argument there as we saw but the proper way to do it is to have T on T U on U and V on V like this and this bit of knowledge is really key to understanding the way to structure, especially kind of chained arguments and really really complicated types. It's super cool

# 4. Generic Interfaces with Functions

[

github.com

https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/04-generics-advanced/19-generic-interfaces-with-functions.problem.ts

](https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/04-generics-advanced/19-generic-interfaces-with-functions.problem.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=fe3efdbb-2923-4070-be2f-65d1da108e67&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0401-generic-interfaces-with-functions-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=fe3efdbb-2923-4070-be2f-65d1da108e67&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0401-generic-interfaces-with-functions-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
In this exercise we have a large file, so we'll start with a tour.

There's a `Cache` interface that takes in a `T` and includes a getter and setter that we're interested in.

```typescript
export interface Cache<T> {
  get: (key: string) => T | undefined;
  set: (key: string, value: T) => void
  
  clone: (transform: (elem: unknown) => unknown) => Cache<unknown>;
}
```

We can create a `Cache` with the `createCache` function:

```typescript
const createCache = <T>(initialCache?: Record<string, T>): Cache<T> => {
  const cache: Record<string, T> = initialCache || {};

  return {
    get: (key) => cache[key],
    set: (key, value) => {
      cache[key] = value;
    },
    clone: (transform) => {
      const newCache: Record<string, any> = {};

      for (const key in cache) {
        newCache[key] = transform(cache[key]);
      }
      return createCache(newCache);
    },
  };
};
```

The function takes in `T` which is an initial cache that consists of a `Record` of strings.

In the tests are examples of creating a cache:

```typescript
const cache = createCache<number>();

cache.set("a", 1);
cache.set("b", 2);
```

However, there is an error when using `numberCache.clone()`.

We should end up with a string cache, but instead `a` is typed as `unknown`.

```typescript
const stringCache = numberCache.clone((elem) => {
  return String(elem);
});

const a = stringCache.get("a");

expect(a).toEqual("1");

// There's an error here: (`a` is `unknown`)
type tests = [Expect<Equal<typeof a, string | undefined>>];
```

## Challenge
Your challenge is to update the `clone` line inside of `Cache` so that the cloned `Cache` is properly typed:

```typescript
export interface Cache<T> {
  get: (key: string) => T | undefined;
  set: (key: string, value: T) => void;
  // You can fix this by only changing the line below!
  clone: (transform: (elem: unknown) => unknown) => Cache<unknown>;
}
```

If you get stuck, review previous lessons on how generics work at different levels of functions.

## Transcript
0:00 This exercise is pretty big file here, but we're only interested in a small part of it. Let me explain the big file first. We have a Cache interface here, which takes in a T and it's like a getter and setter here. This is the piece that we're interested in but let me carry on to the implementation.

0:19 This createCache here, we can get it, we can set it. You can see here that this T, the actual cache itself is a record of strings with T in it, which you can pass in initialCache and then it returns the Cache.

0:37 Down here, you create the cache with number, you can cache.set("a"), but you can't pass in anything that's not in the type that's in the cache there. I can set('c') and set it to string. That's going to yell at me, because it should be a number. It will yell at me when I restart my TS Server. I'm sure. Give it three, two, yeah, there it is.

1:00 After this, there's a function that we've added here called clone. The entire fix for this is on this one line here. What clone is supposed to do is it takes in a cache, and it takes in a transform function for that cache.

1:20 We have our numberCache set up here. What this is supposed to do is it supposed to take that cache and clone it, and for each member of the cache, run this function. In this function, what it's going to do is take the element, which is supposed to be a number in this particular cache, and then stringify it.

1:40 What we should end up with is a stringCache here. The stringCache currently, a is equal to unknown here, but it should be string or undefined. The stringCache should be Cache<string>, not Cache<unknown>.

1:54 You can take a look here. There's an any in here, which you don't need to mess with, you don't need to remove. This is saying...I mean, this is interesting. Maybe you can fiddle around with this. I might fiddle around with it in the solution, but this line is the interesting piece here.

2:10 The things you'll need to solve these are an understanding of how generics work on different function levels, which we have done in the previous exercise, and also, to be able to type these functions properly, and understand how this T flows through the types here.

2:26 Good luck.

# Solution: Understanding Generics at Different Levels of Functions

[

github.com

https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/04-generics-advanced/19-generic-interfaces-with-functions.solution.ts

](https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/04-generics-advanced/19-generic-interfaces-with-functions.solution.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=7bf5a0e6-9e92-4794-8292-7c23aeae32d7&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0402-generic-interfaces-with-functions-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=7bf5a0e6-9e92-4794-8292-7c23aeae32d7&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0402-generic-interfaces-with-functions-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
This challenge can be solved by only changing the `clone` line, so let's start by really understanding what's happening there.

Here's what our starting point looked like:

```typescript
export interface Cache<T> {
  get: (key: string) => T | undefined;
  set: (key: string, value: T) => void;
  // You can fix this by only changing the line below!
  clone: (transform: (elem: unknown) => unknown) => Cache<unknown>;
}
```

The line is declaring a type definition for the `clone` function, which has a return type of `Cache<unknown>`.

The `transform` function takes an element through the process of transformation and its input is the thing inside of `Cache<T>`. The thing it returns is going to be the thing that's in the new cache because it's run on each `Cache` member.

It needs to match up with the stuff inside of `clone` inside of the `createCache` function:

```typescript
// inside of createCache
    clone: (transform) => {
      const newCache: Record<string, any> = {};

      for (const key in cache) {
        newCache[key] = transform(cache[key]);
      }
      return createCache(newCache);
    },
```

The problem is that `U` hasn't been defined anywhere.

## The Wrong Place for `U`
It might seem like adding `U` to the `Cache` interface is a good idea:

```typescript
export interface Cache<T, U> {
  ...
```

However, this isn't the place to do it. We would then have to define it when we _create_ the cache instead of when we clone it.

## The Better Place for `U`
A better place to define `U` is directly on the `clone` function, and updating the `unknown`s:

```typescript
export interface Cache<T> {
  get: (key: string) => T | undefined;
  set: (key: string, value: T) => void;
  // You can fix this by only changing the line below!
  clone: <U>(transform: (elem: T) => U) => Cache<U>;
}
```

Now later in the file when calling `clone` on a created `Cache` we can see that the type is being locked in:

```typescript
  const stringCache = numberCache.clone((elem) => {
    return String(elem);
  });

// hovering over `clone` shows:
(property) Cache<number>.clone: <string>(transform: (elem: number)
=> string) => Cache<string>
```

## The Big Takeaway
When you're inside of an interface or type, you can add a function that has a generic on it.

This is a useful pattern for doing any sort of transformation.

It also forms the basis for the Builder Pattern that we will see in future exercises.

## Transcript
0:00 This is an interesting solution. We can fix it by only changing the line below, but we need to know really what is the line below doing. It's declaring a type definition for the clone function, which lives down here.

0:15 These createCache here, it has a return type of Cache. The thing that's down here, it basically needs to match up to this Cache thing here. Basically, all the type definitions are happening really up here. Well, sorry. Except for the ones that declare this as a generic function and then return the Cache there.

0:35 We've got our clone here. This transform function, it's basically going to take an element through the process of transformation. Its input is going to be the thing that's in the Cache because it's run on each Cache member.

0:51 We're now getting elem defined as a number because this is the initialCache setting that we've got there. We've got our transform. Then we need to change it to something. The thing that this function returns is going to be the thing that's in the new Cache. Whatever this is, it's going to be both here and in the Cache.

1:13 What we could do is define U up here, but then we've got some issues actually. We've got some issues all over the place. Because U then, it would actually need to be defined the first. It just feels like the wrong moment to make that definition. When we first return the Cache, we also then need to say what the Cache is going to transform into? No. That doesn't seem right.

1:36 There must be another place that we can put that U. Turns out there is. We can put it right here, on the clone function. Suddenly, everything goes away, which is cool. We've got our U here. It's being inferred when clone is actually called. When we call this clone here, you can see that string is being locked in there.

1:59 If I were to change this to something else, like elem > 2, like a boolean or 1/. In fact, I can just say, "elem > 2." What we end up with then is a boolean Cache instead of a number Cache. If you hover over this, this function then is returning a boolean. Let's return it to its former stringified glory.

2:25 This function down here, this clone, this is cool too. We can see here that if you hover over it on the clone, then you're getting this U even though we're not actually declaring it here. We can actually pull out U if we want to.

2:40 You can see here that transform implicitly has an any type. Because we've started giving it type definitions, we need to really finish. This isn't necessarily what I would recommend doing, but it is useful to see what this is doing here.

2:57 We've got our U there. We've got transform elem T into U. Now we can actually replace that any with a U there because that is what's happening there. You can see the transform is taking our elem from T, which is cache key, into U, which is pretty nice.

3:15 To be honest, I would probably just keep this as any, keep this as the base transform thing here, and then just take that and move it out. It's pretty nice just having all of this stuff available in this Cache thing here.

3:30 The key lesson is that even if you're inside an interface or even if you're inside a type, let's say, then you could actually add a function which has a generic on it right there, super-duper useful and especially useful -- this pattern is so, so common -- when you pass in a function to transform something to something else.

3:51 You can even clone it again if you want to. You can even say, "elem," let's say. Let's say, "return elem" and have blah, blah, blah, blah, blah, blah at the end. Then it's still could be a string Cache. If we return it back to a number, if you want to, like parseFloat elem, let's say, then we're going to get a number Cache at the end.

4:12 This pattern, every time we're calling clone now, we're basically adding a new generic into the pile, just based on what's being passed here and, again, with no type annotations whatsoever. So, so cool. This is the basis of the builder pattern of chaining methods that we'll see in future exercises.

# 5. Spotting Useless Generics

[

github.com

https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/04-generics-advanced/20-spotting-useless-generics.problem.ts

](https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/04-generics-advanced/20-spotting-useless-generics.problem.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=9d00ebc2-a68e-4112-ac5e-101b8fbeb11a&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0501-spotting-useless-generics-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=9d00ebc2-a68e-4112-ac5e-101b8fbeb11a&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0501-spotting-useless-generics-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
Here we have a function called `returnBothOfWhatIPassIn` with type arguments `T1` and `T2`. It takes in a params of `a: T1` and `b: T2` that is then returned as a tuple:

```typescript
 const returnBothOfWhatIPassIn = <T1, T2>(params: {
  a: T1;
  b: T2;
}): [T1, T2] => {
  return [params.a, params.b];
};
```

As seen in the test, when calling `returnBothOfWhatIPassIn` with `{a: "a", b: 1}`, we should get back `string` and `number`:

```typescript
it("Should return a tuple of the properties a and b", () => {
  const result = returnBothOfWhatIPassIn({
    a: "a",
    b: 1,
  });

  expect(result).toEqual(["a", 1]);

  type test1 = Expect<Equal<typeof result, [string, number]>>;
});
```

And you'll notice there's no errors in this file, and the tests are all passing.

However, there's a way that we can remove one of the generic parameters from the function.

## Challenge
Your challenge is to try to find a way to refactor this file so that one of these generic parameters is removed but the tests will still pass.

## Transcipt
0:00 In this exercise, we have a function called returnBothOfWhatIPassIn. What we've got here is T1 and T2, the params: { a: T1; b: T2 }, and we're returning them in a tuple, basically.

0:13 What we've got here is they're being inferred as string and number, and we're getting back string and number in this tuple slot. We don't care about being too strict here. We're not looking for the literal "a" or the literal 1 here. We just want string and number.

0:29 You notice there's no errors in this file. The tests are all passing. Everything's great, but we can remove one of the generic parameters here. It seems a little bit clumsy the way that we've done it, and one of these generics is a little bit useless and we can condense them down.

0:49 That's your challenge, is to try to find a way to refactor this file so that we don't have one of these generic parameters.

# Solution: Refactoring Functions with Unnecessary Type Arguments

[

github.com

https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/04-generics-advanced/20-spotting-useless-generics.solution.ts

](https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/04-generics-advanced/20-spotting-useless-generics.solution.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=21657965-cf73-4ede-a0f8-c629be79e756&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0502-spotting-useless-generics-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=21657965-cf73-4ede-a0f8-c629be79e756&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0502-spotting-useless-generics-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
The solution here is to reduce it into one generic parameter `TParams` that represents the entire object of params being passed in. Then in the tuple is `TParams["a"]` and `TParams["b"]`:

```typescript
const returnBothOfWhatIPassIn = <
  TParams extends {
    a: unknown;
    b: unknown;
  },
>(
  params: TParams,
): [TParams["a"], TParams["b"]] => {
  return [params.a, params.b];
};
```

For comparison, here's what the starting point was:

```typescript
const returnBothOfWhatIPassIn = <T1, T2>(params: {
  a: T1;
  b: T2;
}): [T1, T2] => {
  return [params.a, params.b];
};
```

It is debatable which one is better– the original looks a bit cleaner, but the refactored solution has more constraints.

## The Big Takeaway
The big idea here is that you should be on the hunt for useless generics in your projects and functions.

In the original, we don't need to use both `T1` and `T2`. When hovering over them it's nice to see that `a` is a string and `b` is a number, but we don't get to see the entire parameters being passed in.

Here's what we see hovering over the original `returnBothOfWhatIPassIn`:

```typescript
const returnBothOfWhatIPassIn: <string, number>(params: {
  a: string;
  b: number;
}) => [string, number]
```

Compared to seeing the entire params when we hover in the refactored version:

```typescript
const returnBothOfWhatIPassIn: <{
  a: string;
  b: number;
}>(params: {
  a: string;
  b: number;
}) => [string, number]
```

Ultimately it's up to you which one you use, but experience has taught me that you should try to reduce the number of generic functions and type arguments as much as possible.

This will make it easier to refactor and you're less likely to end up with useless generics cluttering up your functions.

## Transcript
0:00 The solution here is to basically reduce it into one generic parameter, where you have TParams here. That represents the entire object of params that are being passed in. Then, in the tuple here, you have TParams a and TParams b.

0:15 It's actually debatable which one is better here. This one here is maybe actually a little less cleaner. You're having to do a little bit less mapping here. Whereas this one, it's like there's a bit more constraint going on. You're having to index into it both times.

0:32 I want to put into your mind the idea that you should be on the hunt for useless generics in your projects, in your functions. Really, you don't need to use both of these. When you hover over them here, you're going to see them as string and number being locked in, which is pretty nice.

0:54 When you're in this function, what you see when you hover over is actually the entire parameters that are being passed. This is basically dealer's choice. It's up to you which one you use. Experience has taught me that you should try to reduce the number of type arguments that you possibly can.

1:14 In general, fewer, it's going to be easier to refactor. You're less likely to end up with useless ones cluttering up your functions. This is something you should be aware of whenever you're writing generic functions, is that you sometimes end up with a little bit of cruft, a little bit of crap that you need to get rid of.

# 6. Spotting Missing Generics

[

github.com

https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/04-generics-advanced/20.5-spotting-missing-generics.problem.ts

](https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/04-generics-advanced/20.5-spotting-missing-generics.problem.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=2912b8f5-86f0-4476-9b23-d54db7bbfd3e&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0601-spotting-missing-generics-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=2912b8f5-86f0-4476-9b23-d54db7bbfd3e&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0601-spotting-missing-generics-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
In this exercise, we have a function called `getValue` which is mimicking a property access in TypeScript.

An object called `obj` is passed as the first argument and the `key` is `keyof obj`.

We should be getting back a `number` if we pass in `a`, a `string` if we pass in `b`, and a `boolean` if we pass in `c`:

```typescript
const getValue = <TObj>(obj: TObj, key: keyof TObj) => {
  return obj[key];
};

const obj = {
  a: 1,
  b: "some-string",
  c: true,
};
```

However, each of these is actually a union of `number`, `string`, or `boolean` which is troublesome:

```typescript
const numberResult = getValue(obj, "a");

// hovering over `numberResult` shows:
const numberResult: string | number | boolean
```

If we were to add a `Date` to `obj`, it gets added to the union as well.

## Challenge
Your job is to fix the function so that it returns the specific value of what was passed in rather than the union of possible values.

## Transcript
0:00 In this exercise, we have a function called getValue. What this is doing is basically mimicking a property access in TypeScript, where you basically have TObj, which is going to be the thing that's being passed in the first argument. Then the key is going to be keyof TObj there.

0:16 obj here, we've got a 1, b some-string, c 1. When we call getValue on it here, you can see it's being locked in here. What we should be getting back is if we pass in a, then we should be getting back a number. If we pass in b, should be getting back a string.

0:33 We're getting some really nice autocomplete, which indicates that this should be what's happening. Each of these, instead of being number, string, and boolean, are actually a union of number or string or boolean here, which is a little bit troublesome.

0:48 If I add something to this, if I add d is new Date here, then I do get d being offered to me in the autocomplete, but Date actually gets added to that union. It's almost like whatever we're getting back is a union of all of the values that are in the object.

1:06 Your job here is to try to fix this error, to try to improve this function so that it actually returns the specific value that we're getting instead of the general value or a union of all of the values. There's not going to be anything specific in here. Use your brain. Make sure you're thinking about how index access types work with unions and how keyof works. Good luck.

# Solution: Improving Type Inference with Additional Generics

[

github.com

https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/04-generics-advanced/20.5-spotting-missing-generics.solution.ts

](https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/04-generics-advanced/20.5-spotting-missing-generics.solution.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=c9bf0024-afd4-4251-9be6-9e9776e914c0&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0602-spotting-missing-generics-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=c9bf0024-afd4-4251-9be6-9e9776e914c0&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0602-spotting-missing-generics-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

Before we get to the solution, let's recap where we started.

In the starting point code, if we hover over `getValue` we can see the object being inferred:

```typescript
// Starting Point
const getValue = <TObj>(obj: TObj, key: keyof TObj) => {
  return obj[key];
};

// hovering shows:
const getValue: <{
  a: number;
  b: string;
  c: boolean;
}>(obj: {
  a: number;
  b: string;
  c: boolean;  
}, key: "a" | "b" | "c") => string | number| boolean
```

As an experiment, let's create a new `Result` that is `typeof obj` and we're going to index into it with `a`, `b` or `c`:

```typescript
type Result = typeof obj['a' | 'b' | 'c']
```

We know how this works– hovering is going to show us `number`, `string` or `boolean`.

```typescript
// hovering over Result
type Result = string | number | boolean
```

What this shows us is that inside of `getValue` when we index in using `object.key`, it doesn't actually represent a specific key. It represents a union of all of the possible keys.

## Adding a Second Generic
In order to be able to infer a specific key, we need a second generic which will be called `TKey`.

From there the value of `key` can be changed to `TKey` instead of `keyof TObj`:

```typescript
const getValue = <TObj, TKey>(obj: TObj, key: TKey) => {
  ...
```

The problem now is that `return obj[key];` won't work because `TKey` can't be used to index `TObj`.

## Constraining `TKey`
To fix this we need to constain `TKey` by using `extends` and telling it to take the keys from `keyof TObject`:

```typescript
const getValue = <TObj, TKey extends keyof TObj>(obj: TObj, key: TKey) => {
  return obj[key];
};
```

With this change our autocomplete works and hovering over each of the tests will return the exact type instead of the union:

```typescript
const obj = {
  a: 1,
  b: "some-string",
  c: true,
};

const numberResult = getValue(obj, "a");  // number
const stringResult = getValue(obj, "b"); // string
const booleanResult = getValue(obj, "c"); // boolean
```

This works because inside of `getValue` we're indexing the object with the thing we capture in the type argument.

We make doubly sure that `getValue` will work by capturing the passed in object as the first type argument and the key used to index as the second type argument.

## The Big Takeaway
Make sure that the types you use can do what they're supposed to do and have all of the information they need to operate correctly.

If you're not getting the inference you want, check to see if you have any missing generics.

This is important to ensure you get the correct return types, even if they are implicit.

## Transcript
0:00 The reason this is happening is because, if we hover over getValue, you can see that this object here is being inferred. The key here is actually being inferred as a or b or c. If we look at the result here...Let's say we have Result. We say, "typeof obj." We're going to index into it with a or b or c.

0:27 We've seen this before. We know how this works, typeof a or b or c. It's going to be string or number or boolean. If I add d is new Date, then what we get is d is going to be string or number or boolean or Dates. We can see here then that this key, when we index into it using obj.key, then this doesn't actually represent a specific key. It represents a union of all of the possible keys.

0:58 How do we fix that? We need to infer a specific key at this point, which means we need a second generic. That second generic is going to live just here. It's going to be TKey. We can say TKey is right there.

1:15 Now, TKey cannot be used to index type TObj. Of course, because we could actually now pass in anything here. We've lost our beautiful autocomplete. We need to constrain this type. The way you constrain a generic type is with a constraint.

1:30 We say, "TKey extends keyof TObj." Now, we get our beautiful autocomplete back. numberResult,results in number. stringResult results in string. booleanResult results in boolean. That's because what we're doing is we're indexing it with the thing that we capture in this type argument.

1:49 What we've got here, is we're now capturing to type arguments, the object that's passed in and the thing that's used to index it. We know that when we get to here, then this is actually like indexing with the specific key. We can make this doubly sure by saying, "TObj TKey" here.

2:09 Now, it makes sense. We're actually accessing the specific object with the specific key that we infer from that generic type.

2:21 The lesson here is to make sure that if you're not getting the inference you want, make sure that you haven't got any missing generics.

2:30 You need to make sure that the right things are being inferred at the right times and that you've got the thing that you want to infer there so that you can then, in your return type or even, as we have here, an implicit return type, make sure that the types can do what they're supposed to do and they have all the information that they need to operate and give you the correct type back.

# 7. How tRPC Handles Inheritable Generics

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=5c7de8d5-5a7c-4fc2-8890-c8d540d4f5b3&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0701-how-trpc-handles-inheritable-generics.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=5c7de8d5-5a7c-4fc2-8890-c8d540d4f5b3&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0701-how-trpc-handles-inheritable-generics.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Explainer
Alex, the creator of the tRPC library, discusses how TRPC handles request context without using global variables.

The library uses an `initTRPC` object that can be injected with different generics and inherited by everything built on top of it. The "root config" has properties like context and meta that allow for proper inference.

Using the builder pattern helps to avoid using global variables, which can be messy in larger projects.

## Resources

[

trpc.io

https://trpc.io/

](https://trpc.io/)

[

twitter.com

https://twitter.com/alexdotjs

](https://twitter.com/alexdotjs)

## Transcript
0:00 I was wondering about how libraries handle things which feel like globals, and I noticed that TRPC has this really cool setup for how it does it. I asked Alex how it works.

0:11 What happens when a request reaches your server, you often want to have a request context. That is where the session lives, or the user, the calling user lives. You want that to be accessed everywhere.

0:25 In order to make sure that the inference just works, you need to have some way of referencing that. You don't want that to be global. The way we do it is that we have an inner TRPC object that we can then inject different generics within that are then inherited by everything that builds on top of that.

0:49 You have inner TRPC, I mean you can hover over that T and you see some crazy stuff. Here you see that we have something called underscore config. That is the root, you see it's called root config. In your root config, you can have a few different properties.

1:07 You have context, meta, errorShape, transformer, etc. We can try now to change the inner TRPC. This is using something called a builder pattern.

1:15 I believe you covered that in your course, but if you call initTRPC.ctx, it's actually a context. It's not called with any actual argument, but you pass in a generic there. You need to pass in an object there. Now if you hover that T variable again, I hope that's going to be different.

1:34 Wow, look at that.

1:37 That's how we build out this root configuration. Then thanks to that now living in that root T object, we can then use that T object to build a procedure from that will know that the context has a user on it. In your greeting query there, you actually use context.

1:57 If I remove some of this stuff and I actually just
return the thing, then what I can do is with this, I can say console.log
and then [ctx.user.id](http://ctx.user.id). Whereas, if we remove this and just comment it
out, then that will actually be an error because context is just like an
object.

2:16 I asked him why he used this approach instead of using a global here.

2:20 I mean, easy answer is that it was the only way I could figure out to make it work, because I didn't want to have globals. One alternative is to have, you can declare interfaces and an interface can override a global interface.

2:37 I could do something like this where you have a TRPC context and we declare that our context is something, exactly what you're declaring here. Then we can have that just work through that as well. Then you couldn't do things like having multiple TRPC servers.

2:54 It feels like an anti-pattern to use a global like this. Instead, we're using the builder pattern and create this concept of a root object.

3:04 There you go. By taking the generic one level higher and using a initTRPC function to create the T that you then build everything out of, you get all the benefits of global inference by letting you pass in your own inference with .context.

3:20 You don't need to use an actual global there, which especially if you're using a mono repo or you want multiple versions of the same library like TRPC, can really pollute everything quickly. A really, really smart solution.

# 8. Refactoring Generics for a Cleaner API

[

github.com

https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/04-generics-advanced/20.6-reusable-context.problem.ts

](https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/04-generics-advanced/20.6-reusable-context.problem.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=43457ab8-b00b-49dc-ac92-c1f1fb65f566&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0801-refactoring-generics-for-a-cleaner-api-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=43457ab8-b00b-49dc-ac92-c1f1fb65f566&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0801-refactoring-generics-for-a-cleaner-api-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
In this exercise we're going to refactor some generics to make the API cleaner.

We have a `useStyled` function which takes in a `TTheme` that defaults to an empty object, as well as a function which takes in the `theme` and then returns `CSSProperties`:

```dart
const useStyled = <TTheme = {}>(func: (theme: TTheme) => CSSProperties) => {
  // Imagine that this function hooks into a global theme
  // and returns the CSSProperties
  return {} as CSSProperties
}
```

This function would be used to allow the user to pass in their own theme.

The `MyTheme` interface includes some CSS properties, which should be able to be applied when passing into `useStyled` as seen here:

```typescript
interface MyTheme {
  color: {
    primary: string
  }
  fontSize: {
    small: string
  }
}

const buttonStyle = useStyled<MyTheme>((theme) => ({
  color: theme.color.primary,
  fontSize: theme.fontSize.small,
}))

const divStyle = useStyled<MyTheme>((theme) => ({
  backgroundColor: theme.color.primary,
}))
```

The issue is that we're having to pass in that `MyTheme` interface into `useStyled` every time we use it.

## Challenge
Your job is to refactor `useStyled` into a factory function called `makeUseStyled` which returns a `useStyled` function, typed with the theme.

The API should look something like this:

```plain
const useStyled = makeUseStyled<MyTheme>()

// Now you don't have to pass in the theme every time
const buttonStyle = useStyled((theme) => ({
  color: theme.color.primary,
  fontSize: theme.fontSize.small,
}))
```

## Transcript
0:00 In this exercise, we're going to be refactoring some generics to make the API a little bit cleaner.

0:07 We have a useStyled function, which basically takes in a TTheme which is defaulting to an empty object and takes in a function which takes in the theme and then returns some CSSProperties, and then returns some CSSProperties like hooks into a global theme, and you get the idea.

0:24 This is basically used for when you want to white label an API and let's say you want to use CSSProperties like this for instance. I've used something like this in a React Native app before. We have an interface MyTheme, but the issue here is that we're having to pass in MyTheme into useStyled every time we use it.

0:43 If you just remove that, then actually theme gets typed as nothing here or an empty object, which is not particularly great. It would be so good since useStyled is hooking into a global theme really if we could have an API where we didn't have to pass in this type argument every time.

1:02 The desired API looks something like this. We're going to say const useStyled equals makeUseStyled, and when we call makeUseStyled, we're going to pass in MyTheme just there. This is a refactor. See if you can get this working.

1:18 You should be getting errors down here when you make the refactor, and you should be able to basically have it like this and just be able to call useStyled and have the theme inferred from where you've basically made the useStyled here. We're turning this into a factory. Good luck.

# Solution: Create a Factory Function to Apply Type Arguments to All Child Functions

[

github.com

https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/04-generics-advanced/20.6-reusable-context.solution.ts

](https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/04-generics-advanced/20.6-reusable-context.solution.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=e5139dc2-4f7f-49fc-ac40-174f9c179a0c&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0802-refactoring-generics-for-a-cleaner-api-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=e5139dc2-4f7f-49fc-ac40-174f9c179a0c&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0802-refactoring-generics-for-a-cleaner-api-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

The first thing we'll do is create a new `makeUseStyled` function, and move the existing `useStyled` function into it to be returned:

```typescript
const makeUseStyled = () => {
  const useStyled = <TTheme = {}>(func: (theme: TTheme) => CSSProperties) => {
    return {} as CSSProperties
  }

  return useStyled
}
```

With this change `useStyled` is going to break where it it's being called in the file, so we can create a new `useStyled` variable at the top level, and have it call our new `makeUseStyled` function:

```typescript
const useStyled = makeUseStyled()
```

Now we need to refactor the type argument. Let's move `<TTheme = {}>` from `useStyled` to its parent `makeUseStyled`:

```typescript
const makeUseStyled = <TTheme = {}>() => {
  const useStyled = (func: (theme: TTheme) => CSSProperties) => {
    return {} as CSSProperties
  }

  return useStyled
}
```

Then to avoid the new errors, we need to move `<MyTheme>` from where we are calling `useStyled` to our top level `useStyled` function:

```typescript
const useStyled = makeUseStyled<MyTheme>()

const buttonStyle = useStyled((theme) => ({
  color: theme.color.primary,
  fontSize: theme.fontSize.small,
}))

const divStyle = useStyled((theme) => ({
  backgroundColor: theme.color.primary,
}))
```

With that little refactor we now have a fully typed version of `useStyled` that is ready to be consumed!

## Why We Did It This Way
With this setup, `useStyled` and `MyTheme` can sit in one module together and export `useStyled`.

Then, `buttonStyle` and `divStyle` can just consume from `useStyled` without needing to pass in a type argument. This is because we have reusable type argument at the top level which filters all the way down.

Because generics are tied to function calls, we have to make a function call at the top level which doesn't actually do anything. It's unfortunate that the only way to do this is by wrapping it in a factory function.

With that said, this solution is really useful and it would be excellent if more libraries used it!

## Transcript
0:00 Let's solve this together. We want a function called const makeUseStyled, and what that's going to do is it's just going to return useStyled.

0:11 Now, useStyled down here is going to break, so let's say const useStyled equals makeUseStyled. Now, what we need to do here, useStyled still currently accepts a type argument, so we need to remove the type argument from useStyled and put it on the top level. This is fairly simple.

0:31 We just take this and we just stick it up there, so TTheme. Now what we're getting is we're expected zero type arguments but got one. I can actually remove both of these and I'll put it just here. Whoops, copied the wrong section. Now, TTheme doesn't make sense, so we need to pass in MyTheme into makeUseStyled.

0:53 Now, just with that little refactor moving this from there to here, we can now get a fully typed version of useStyled that we can just consume. You can imagine now that useStyled and MyTheme can sit in one module together, and they can export useStyled, and then buttonStyle and divStyle can just consume from useStyled here without needing to pass in a type argument.

1:19 This solution is really, really useful, and I wish more libraries did it. It lets you pass in type arguments at the top level, that are then inferred everywhere, almost like a global, except it's not global because it's just scoped to this one function here. Extremely useful pattern, and what it does is it lets you have a reusable type argument at the top level which just filters all the way down.

1:47 Unfortunately, the only way to do this is by wrapping it in a factory function, because we know that in TypeScript, generics are tied to function calls. Making another function call at the top level which doesn't do anything, it's just literally an identity function where you pass in a type argument, just by doing that little step there, you get really beautiful inference in the rest of your app.

# 9. The Partial Inference Problem

[

github.com

https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/04-generics-advanced/20.7-working-around-partial-inference.problem.ts

](https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/04-generics-advanced/20.7-working-around-partial-inference.problem.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=e8bddff2-2510-4055-bd5c-d5b31142a952&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0901-the-partial-inference-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=e8bddff2-2510-4055-bd5c-d5b31142a952&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0901-the-partial-inference-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
There are some really annoying aspects of how TypeScript infers type arguments when they are passed into functions.

Here is a `makeSelectors` function that takes in a `TSource` type argument and then a `TSelectors` type argument:

```typescript
export const makeSelectors = <
  TSource,
  TSelectors extends Record<string, (source: TSource) => any> = {}
>(
  selectors: TSelectors
) => {
  return selectors
}
```

When we call `makeSelectors`, we pass it the type argument `Source`:

```typescript
interface Source {
  firstName: string
  middleName: string
  lastName: string
}

const selectors = makeSelectors<Source>({
  getFullName: (source) =>
    `${source.firstName} ${source.middleName} ${source.lastName}`,
  getFirstAndLastName: (source) => `${source.firstName} ${source.lastName}`,
  getFirstNameLength: (source) => source.firstName.length,
})
```

But right now, we are aren't getting the type inferred as the `TSelectors` like we want. We should be receiving an object with `getFullName`, `getFirstAndLastName`, and `getFirstNameLength`, each of which take `Source` as an argument.

If we remove the `Source` argument we get a slightly more correct type inferred:

```typescript
// ON HOVER

const makeSelectors: <unknown, {
    getFullName: (source: any) => string;
    getFirstAndLastName: (source: any) => string;
    getFirstNameLength: (source: any) => any;
}>(selectors: {
    getFullName: (source: any) => string;
    getFirstAndLastName: (source: any) => string;
    getFirstNameLength: (source: any) => any;
}) => {
    getFullName: (source: any) => string;
    getFirstAndLastName: (source: any) => string;
    getFirstNameLength: (source: any) => any;
}
```

But now, `Source` is typed as `unknown` - and the argument for each function is typed as `any`!

We're in a bind. As soon as we pass in one type argument, the second type argument doesn't get inferred!

This is annoying because it means you can't pass in type arguments and infer the actual arguments in the same function call.

## Challenge
We're going to have to slightly compromise our API in order to get the inference that we want.

Your challenge is to add in a function call to `makeSelectors`, passing in the type argument of `Source` that will immediately be called again with the `selectors`:

```typescript
// Desired API
makeSelectors<Source>()({ ...selectorsGoHere })
```

Your challenge is to refactor `makeSelectors` to be a "higher-order function".

You'll know it works when these tests pass:

```typescript
type tests = [
  Expect<Equal<typeof selectors["getFullName"], (source: Source) => string>>,
  Expect<
    Equal<typeof selectors["getFirstAndLastName"], (source: Source) => string>
  >,
  Expect<
    Equal<typeof selectors["getFirstNameLength"], (source: Source) => number>
  >
]
```

This is a kind of a tough problem, but I believe you have all the pieces necessary to understand the solution!

## Transcript
0:00 In this exercise, we're covering a really annoying aspect of how TypeScript infers type arguments when you pass them to functions.

0:07 We have a makeSelectors function, and this takes in a TSource type argument, and then a TSelectors type argument. Now, the best way to look at this is through usage. We have a makeSelectors function here where we're passing it a type argument, except that it looks like the second type argument.

0:27 Instead of being inferred as the selectors, which is a record of string, and then a function which returns source, TSource, any, then we're not getting that inferred there. If we remove the source, then we're going to get that inferred. So getFullName, source any string, getFirstNameLength, source any, any.

0:47 This is tough because it looks like as soon as we pass in one type argument, the second type argument doesn't get inferred. This is correct. This is how TypeScript works, and it's so annoying. It's annoying because you can't pass in type arguments and infer the actual arguments in the same function call.

1:10 We're going to have to make a compromise here. We're going to slightly compromise our API in order to get the inference that we want. We're going to add in a function call here. We're going to say makeSelectors, passing in the type argument of source. We're going to call that function and then call it again with the selectors.

1:30 You can see that the tests here are currently just not working because we're expecting selectors to have an attribute of getFullName, which is going to be source, Source String, getFirstAndLastName, source string, getFirstNameLength, source number. This is a tough problem. You have all the pieces that you need to understand the solution. Good luck.

# Solution: A Workaround for The Lack of Partial Inference

[

github.com

https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/04-generics-advanced/20.7-working-around-partial-inference.solution.ts

](https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/04-generics-advanced/20.7-working-around-partial-inference.solution.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=3be84012-1c9a-4dce-a670-6a0fb4a54ed1&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0902-the-partial-inference-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=3be84012-1c9a-4dce-a670-6a0fb4a54ed1&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0902-the-partial-inference-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
Here's the starting point for the `makeSelectors` function:

```typescript
export const makeSelectors = <
  TSource,
  TSelectors extends Record<string, (source: TSource) => any> = {}
>(
  selectors: TSelectors
) => {
  return selectors
}
```

Currently, it's defined with two type parameters, `TSource` and `TSelectors`. But, there is only a single function parameter, `selectors`.

The problem is when we try to use this function, we aren't getting the type inferred as `TSelectors` when we pass a single type argument despite the fact that we are setting `selectors` to be the `TSelectors` type.

## How to Fix It
We want to take `makeSelectors` and split its type arguments over two function calls.

The first function call takes the type parameter, `TSource`, and the second takes the type parameter, `TSelectors`:

```typescript
export const makeSelectors =
  <TSource>() =>
  <TSelectors extends Record<string, (source: TSource) => any>>(
    selectors: TSelectors
  ) => {
    return selectors
  }
```

Now we can call `makeSelectors` with the `Source` type argument and no function arguments, and then make another call where we pass in the `selectors` object:

```typescript
const selectors = makeSelectors<Source>()({
  getFullName: (source) =>
    `${source.firstName} ${source.middleName} ${source.lastName}`,
  getFirstAndLastName: (source) => `${source.firstName} ${source.lastName}`,
  getFirstNameLength: (source) => source.firstName.length,
}))
```

Splitting this out into a separate `firstFunc` function will make it easier to read:

```typescript
const firstFunc = makeSelectors<Source>()

const selectors = firstFunc({
  ...
```

Then, when we hover over the definition of `firstFunc` we'll see the following:

```typescript
// hovering over firstFunc definition

const firstFunc: <TSelectors extends Record<string, (source: Source) => any>>(
  selectors: TSelectors
) => TSelectors
```

This basically tells us that this is the spot where the `Source` type argument is injected, but we haven't inferred the type of the `selectors` argument yet.

Then hovering over the call to `firstFunc`, we can see it is inferring the type of the argument that's being passed in:

```typescript
// hovering over the call to firstFunc

const firstFunc: <{
    getFullName: (source: Source) => string;
    getFirstAndLastName: (source: Source) => string;
    getFirstNameLength: (source: Source) => number;
}>(selectors: {
    getFullName: (source: Source) => string;
    getFirstAndLastName: (source: Source) => string;
    getFirstNameLength: (source: Source) => number;
}) => {
    getFullName: (source: Source) => string;
    getFirstAndLastName: (source: Source) => string;
    getFirstNameLength: (source: Source) => number;
}
```

With these changes, one function is handling the type argument, and the next is handling the real argument!

When we hover over the `selectors` object, you can see we end up with fully strong typed versions of the selectors:

```typescript
// hovering over selectors object

const selectors: {
  getFullName: (source: Source) => string
  getFirstAndLastName: (source: Source) => string
  getFirstNameLength: (source: Source) => number
}
```

Now if we try something like replacing the `Source` with an `id` of type `string`, then the `source` argument is going to change too:

```typescript
// hovering over source argument in getFullName selector

(parameter) source: {
    id: string;
}
```

One last update we can do is to give the API a default value that tells the user that `makeSelectors` expects to be passed a type argument:

```typescript
export const makeSelectors =
  <TSource = "makeSelectors expects to be passed a type argument">() =>
  <TSelectors extends Record<string, (source: TSource) => any>>(
    selectors: TSelectors
  ) => {
    return selectors
  }
```

Now when a source is not passed in, hovering over the red squiggly line error will show the message we set as the default value of `TSource`!

This isn't the most visually appealing solution, but it does get around the fact that TypeScript doesn't currently support partial inference.

## Transcript
0:00 Let's start the refactor. We know that we are going to want to call this with our desired API, so it's a good place to start here. This will give you some proper errors here. This expression is not callable. Ooh. Terrifying.

0:15 We know that we're going to need to add in another function here. Now, makeSelectors, it's basically like we're passing in the source here. We've got two type arguments on the first function and no type arguments on the second function. This isn't right. We actually want to split them out over our two function calls.

0:36 We're going to say TSelectors, this one, actually belongs on this second function call. It belongs there. Have I got some syntax wrong? Yes, I have. I had a Record string string, and I wasn't doing the closing brackets there.

0:54 I can save that. Now things seem to be working. That's pretty amazing. We've got makeSelectors here. Now the first function call, if I split this out...Let's say, "firstFunc." Then we can call const selectors equals firstFunc.

1:10 makeSelectors, what it's doing, is it's just basically saying this is the spot where you inject the source type argument. We've got TSelectors extends Record string. We're yet to infer the argument of this, basically the selectors.

1:28 Next, we have this firstFunc. Then this one is inferring the type of the argument that's being passed in. We've got the type argument there. We've got the real argument there. Super-nice. The selectors, we end up with fully, strongly typed versions of this.

1:44 If we change the source, for instance, if we change this to id string or something, then this source is going to change too. This basically types the arguments of all of these sources here.

1:57 What happens if we don't have this? Source is going to get inferred as unknown. For people using this API, they're going to go, "Why would this happen? Why is this going to be unknown?" I'll show you a little trick here.

2:11 What we can do is, because this TSource can be anything -- it can be basically anything we want -- we can give it a default value. We can say TSource is "makeSelectors expects to be passed a type argument," which is mad.

2:29 Now, if you hover over this, you see source is "makeSelectors expects to be passed a type argument." We're getting a thrown error here, almost. Now we can say pass in the Source. Now that message goes away because we're overriding the default there.

2:48 If I bring this back here, then we can see "makeSelectors expects to be passed a type argument." We can grab that there too. It's super-nice. It's almost like you're able to throw an error just in the middle of this.

3:00 Then if we collapse this firstFunc, let's...Whoops, whoops, whoops, whoops, whoops. I'll say, "const selectors = makeSelectors Source" and then call it with this function. Now we've got the API that our heart dreamed of.

3:18 It's still a little bit ugly. It's still a little bit ugly, but you should be able to see why we're having to do it this way. We have to split out the type arguments over two separate function calls because we're passing one and then inferring the other.

3:33 If TypeScript supported partial inference, then maybe I can come back and delete this entire exercise or rather just show you that it works because yeah. I'm not going to say complain to the TypeScript team about it because I'm sure there's a reason why they haven't added it. My God, it would be very, very useful for these types of cases where you want to both pass and infer type arguments.

# (e) Function Overloads



# 1. What is a Function Overload?

[

github.com

https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/05-function-overloads/21-what-is-a-function-overload.problem.ts

](https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/05-function-overloads/21-what-is-a-function-overload.problem.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=af08be7f-ee98-4a11-96fa-23eb402c4bcb&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0101-what-is-function-overload-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=af08be7f-ee98-4a11-96fa-23eb402c4bcb&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0101-what-is-function-overload-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
For this exercise we have a function called `returnWhatIPassIn`:

```typescript
const returnWhatIPassIn = (t: unknown) => { return t; };
```

The function should return the type of the thing that we are passing in.

As seen in the tests, we want to get back `number` when passing in `1` and `string` when passing in `matt`:

```typescript
const one = returnWhatIPassIn(1); const matt = returnWhatIPassIn('matt');
```

However, the current implementation of the `returnWhatIPassIn` function has `t` typed as `unknown`.

## Challenge
Your challenge is to update the function so the correct types are returned.

We have already done this with generics, so this time you need to use function overloads.

Note that using generics for this challenge provides a more complete solution, but in this case you can use function overloads just for the two test cases.

Check out [the Function Overloads section of the TypeScript docs](https://www.typescriptlang.org/docs/handbook/2/functions.html#function-overloads) for more information.

## Transcript
0:00 For this exercise, we have a function called returnWhatIPassIn. All we need to do is return the type of the thing that we're passing in here. Currently, one is typed as unknown and matt is also typed as unknown because t here is typed as unknown. We've done this before, but with generics. This time, I want you to do with function overloads.

0:20 You are going to see that the resulting function is not as good, not as complete a solution as the generic one. All I need you to care about is these two cases. Don't have to care about the general case or handling every single case like twos, Pococks, or whatever. Just these two cases. You'll see that function overloads provides quite a nice API for it. Good luck.

# Solution: Understanding Function Overloads

[

github.com

https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/05-function-overloads/21-what-is-a-function-overload.solution.ts

](https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/05-function-overloads/21-what-is-a-function-overload.solution.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=e75736ef-ad87-449b-945d-722630264096&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0102-what-is-function-overload-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=e75736ef-ad87-449b-945d-722630264096&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0102-what-is-function-overload-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
Obviously, the solution here is to use function overloads.

Function overloads allow us to overload a function with different call signatures and different return types based on what is passed in.

Overloads require you to use the `function` keyword, but you do not have to include an implementation signature.

The overloads need to match the original function, so I'll add one version that takes in a `t` of `"matt"` and returns `"matt"` as well as one that takes and returns `1`.

Here's what the solution looks like:

```typescript
function returnWhatIPassIn(t: 1): 1; function returnWhatIPassIn(t: "matt"): "matt"; function returnWhatIPassIn(t: unknown) { return t; }
```

We'll be covering function overloads in more depth as we work through this section.

## Transcript
0:00 The solution here is obviously to use function overloads. Function overloads allow you to overload a function with different call signatures. Those call signatures can have different return types based on what's passed in. You need to use the function keyword for this. That's what we'll do. We'll say function returnWhatIPassIn and refactor this here.

0:22 What we can do is add different function overloads on top of this. We can say function returnWhatIPassIn, same thing again. Let's say we handle the case where t is 1, and we're going to return 1. You notice, I don't need to provide an implementation signature here. We've got duplicate function implementation. All I need to do is just give it an extra little function signature on top.

0:46 When we pass in 1, then that's going to return 1. If I do the same thing for matt here, then it's going to return matt there. Both of our cases now pass. We're going to be covering function overloads and all their depth in this section. I'm sure you have questions, but promise you, I will answer them further down in the next exercise.

# 2. Function Overloads vs. Conditional Types

[

github.com

https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/05-function-overloads/22-function-overloads-vs-conditional-types.problem.ts

](https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/05-function-overloads/22-function-overloads-vs-conditional-types.problem.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=ed94f133-f2b7-4cf3-a0ab-b858a76a104c&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0201-function-overloads-vs-conditional-types-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=ed94f133-f2b7-4cf3-a0ab-b858a76a104c&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0201-function-overloads-vs-conditional-types-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
Let's look at the `youSayGoodbyeISayHello` problem that we've seen before:

```typescript
export const youSayGoodbyeISayHello = (greeting: "goodbye" | "hello") => {
  return greeting === "goodbye" ? "hello" : "goodbye";
};
```

The function takes in a greeting of `"goodbye"` or `"hello"`, then returns the correct greeting based on what's passed in.

For example, if we pass in `"hello"`, the result should be `"goodbye"`, but instead we get `"hello"` or `"goodbye"`.

## Challenge
Your challenge is to figure out how to solve this problem using function overloads instead of with conditional types.

## Transcript
0:00 Let's now look at this problem, which we've also seen before, the youSayGoodbye and ISayHello function. We're taking in a greeting of goodbye or hello, and then we're returning the correct greeting based on what's passed in.

0:12 You can see here that result youSayGoodbyeISayHello should be goodbye because we're passing in hello, but, in fact, it's goodbye or hello. The same thing is 1 down here.

0:23 Your job is to figure out how we can solve this one, which we previously solved with conditional types with function overloads.

# Solution: Match Return Types with Function Overloads

[

github.com

https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/05-function-overloads/22-function-overloads-vs-conditional-types.solution.ts

](https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/05-function-overloads/22-function-overloads-vs-conditional-types.solution.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=fe311763-d8e7-41aa-ab15-ef5a92b59251&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0202-match-return-types-with-function-overloads-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=fe311763-d8e7-41aa-ab15-ef5a92b59251&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0202-match-return-types-with-function-overloads-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
The first step in the solution is to convert `youSayGoodbyeISayHello` to use the `function` keyword.

Then we'll add a function overload for when `hello` is passed in and `goodbye` should be returned:

```typescript
function youSayGoodbyeISayHello(greeting: "hello"): "goodbye";
function youSayGoodbyeISayHello(greeting: "goodbye" | "hello") {
  return greeting === "goodbye" ? "hello" : "goodbye";
}
```

At this point, there's an error in the test where we pass in `goodbye`.

```typescript
// error under `goodbye`
const result = youSayGoodbyeISayHello("goodbye");
```

TypeScript tells us it was expecting `hello` bute we've passed in `goodbye`.

Doesn't it seem like the original function would have taken care of that?

## Implementation Signatures Are Not Exposed to Overloads
One of the most important things to know about function overloads is that the implementation signatures of functions are not exposed outside of the function.

As soon as we added an overload, the `greeting: "goodbye" | "hello"` of the original function became an internal signature.

When we add the second overload, the error goes away:

```typescript
function youSayGoodbyeISayHello(greeting: "goodbye"): "hello";
function youSayGoodbyeISayHello(greeting: "hello"): "goodbye";
function youSayGoodbyeISayHello(greeting: "goodbye" | "hello") {
  return greeting === "goodbye" ? "hello" : "goodbye";
}
```

## Comparing Function Overloads to Conditional Types

Here's what the solution to the conditional type version of this exercise looked like:

```typescript
type YouSayGoodbyeAndISayHello<T> = T extends "hello" ? "goodbye" : "hello";
```

I find the function overload version more declarative and simple to read. You can get a good idea what a function does with a quick look.

However, function overload implementations aren't as type safe as other techniques.

If we change the original function to return a number, we will get an error on our overload signature is not compatible:

```typescript
// error on first overload
function youSayGoodbyeISayHello(greeting: "goodbye"): "hello";
function youSayGoodbyeISayHello(greeting: "hello"): "goodbye";
function youSayGoodbyeISayHello(greeting: "goodbye" | "hello") {
  return 123;
}
```

However, if the return is a different string there won't be an error:

```typescript
function youSayGoodbyeISayHello(greeting: "goodbye"): "hello";
function youSayGoodbyeISayHello(greeting: "hello"): "goodbye";
function youSayGoodbyeISayHello(greeting: "goodbye" | "hello") {
  return "asdf";
}
```

## Making Function Overloads More Type Safe
A good way to increase type safety when using function overloads is to add the return types to the original function and make sure the types line up with your overloads:

```typescript
function youSayGoodbyeISayHello(greeting: "goodbye"): "hello";
function youSayGoodbyeISayHello(greeting: "hello"): "goodbye";
function youSayGoodbyeISayHello(
  greeting: "goodbye" | "hello"
): "goodbye" | "hello" {
  return greeting === "goodbye" ? "hello" : "goodbye";
}
```

## Transcript
0:00 The solution here is, obviously, we're going to need a function here instead of a const. Let's fix that. We're going to need to add overloads for each specific case. For this case, we're going to need to add an overload. For the next case, we need to add one. Let's go with that one first. Let's go with function youSayGoodbyeISayHello. Greeting when it's hello will return goodbye.

0:24 This is good, because now the first case is being handled, but there's a strange error here. Now we have youSayGoodbyeISayHello, this one, it's saying, "I was expecting hello, but you passed goodbye." That's really strange because, surely, it should be catching this one here.

0:44 This is a really confusing but important part of function overloads, which is when you have an overloaded function like this, the implementation signature is not exposed outside of the function. This then becomes an internal signature.

1:01 This is still important because if you have, let's say, this was a number instead here, then you would get an error here because this overload signature is not compatible with the implementation signature. In other words, hello has to be assignable to greeting. You can have this as string, for instance, if you want, but hello/goodbye makes a lot of sense.

1:20 We know now what we need to do because this is currently the only one being exposed to the real world. Now let's just swap these over, add another implementation signature there, or another signature there rather, and it starts working.

1:35 This is pretty cool, because before we solve this with conditional types, and it was pretty messy code-wise, this is actually pretty simple to read. It's quite declarative. You have a hello and that returns goodbye. Have goodbye and that returns hello.

1:51 Then the implementation signature is left a little bit to not worry too much about what it returns, because technically inside here, and I wonder how far we could push the limits here, if we return a number here, then this one is going to say, "This overload signature is not compatible." If we return just like a blah, blah, blah, blah, blah, then it's actually not quite type-safe, as you can see.

2:15 We can make it a little bit more type-safe, but we have to be pretty strict with ourselves. We can add this return type signature. You notice that function overloads are not a particularly type-safe form of TypeScript, or rather, it means that the implementation part of the function overload is not really held to a very high standard in terms of being super-duper type-safe.

2:41 What I would probably recommend whenever you're doing a function overload is in the implementation signature, type the return type and make sure manually that the return type matches up to this other stuff here. If we put something random in here, then this is going to yell at us. It's going to say, "This overload signature is not compatible with its implementation signature."

3:04 I really do like this code because these overloads are much easier to read. They give you a really good sense just by looking at the function, what it does. For someone who's not au fait with really advanced TypeScript, this is going to be a pretty nice way of handling things for someone just stumbling on this code. Function overloads, they're pretty good. They can pull their weight.

# 3. Debugging Overloaded Functions

[

github.com

https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/05-function-overloads/23-function-overload-implementation.problem.ts

](https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/05-function-overloads/23-function-overload-implementation.problem.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=3c83aef6-46a0-476a-8736-08958d1f9c5d&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0301-debugging-overloaded-functions-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=3c83aef6-46a0-476a-8736-08958d1f9c5d&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0301-debugging-overloaded-functions-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
This exercise has quite a lot of code, so we'll do a little tour.

We have a `getRolePrivileges` function, which takes in a `role`, which has overloads so it can either be `admin`, `user`, or just a `string`.

The `admin` and `user` roles have additional privileges like deleting and editing.

It looks like the function overloads here should all trigger:

```typescript
function getRolePrivileges(role: "admin"): AdminPrivileges;
function getRolePrivileges(role: "user"): UserPrivileges;
function getRolePrivileges(role: string): AnonymousPrivileges {
  switch (role) {
    case "admin":
      return {
        sitesCanDelete: [],
        sitesCanEdit: [],
        sitesCanVisit: [],
      };
    case "user":
      return {
        sitesCanEdit: [],
        sitesCanVisit: [],
      };
    default:
      return {
        sitesCanVisit: [],
      };
  }
}
```

However, down in the tests there are some errors.

It seems like we can't pass in anything that isn't `admin` or `user`. Also `"anonymous"` privileges are being assigned to `admin` and `user`.

## Challenge
Your challenge is to work out these issues, making any adjustments to the function overloads and implementation signatures.

## Transcript
0:00 In this exercise, we have quite a lot of code, so let's dive into it. We have a getRolePrivileges function, which takes in a role which can either be admin, user, or just a string. 0:11 Admin here, we've basically got AdminPrivileges that's being returned when you pass in this role here. AdminPrivileges, you can see that on adminPrivileges I get access to sites that the user can delete.

0:23 On userPrivileges, I get access to some other stuff too. We have userPrivileges.sites that the user can edit. AnonymousPrivileges, I just get a list of sites that the user can visit.

0:36 In theory, then, each overload should be being triggered. We've got an admin one here returning the AdminPrivileges, role here returning the UserPrivileges, and role string, so every other role gets the AnonymousPrivileges.

0:50 There are some errors here. We're getting some strange errors in here. We're getting some errors here, too, where you seemingly can't pass in anything that isn't admin or user, and anonymousPrivileges are being assigned to Admin and UserPrivileges.

1:07 Your job here is to work out what's happening, knowing what you know about function overloads and especially the implementation signatures, and let's see how far you can get. Good luck.

# Solution: Specifying Types for an Overloaded Function

[

github.com

https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/05-function-overloads/23-function-overload-implementation.solution.ts

](https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/05-function-overloads/23-function-overload-implementation.solution.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=0cbcc63b-a95e-4e15-bd2f-7930781dc108&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0302-debugging-overloaded-functions-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=0cbcc63b-a95e-4e15-bd2f-7930781dc108&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0302-debugging-overloaded-functions-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
The solution to this exercise relies on remembering that the implementation signature does not get exposed outside of the function.

```typescript
// This is the implementation signature that is not exposed
function getRolePrivileges(role: string): AnonymousPrivileges {
  ...
```

When using function overloads, the implementation signature becomes just an amalgamation of all of the function overloads that come before it.

## Fixing the `AnonymousPrivileges` Error
The error messages we see when hovering over `getRolePrivileges("anonymous")` in the tests should give you a clue.

```typescript
// Hovering over "anyonymous" in the tests
getRolePrivileges("anonymous")

// shows:
function getRolePrivileges(role: "admin"): AdminPrivileges (+1 overload)
```

```typescript
// Hovering in the tests
Expect<Equal<typeof anonymousPrivileges, AnonymousPrivileges>>

// Error:
Argument of type "anonymous" is not assignable to parameter of type "admin".
```

What these messages tell us is that we can't pass in `anonymous`.

In fact, the only things we can pass are `"admin"` and `"user"`.

So we know that we're going to need to add a new function overload above the implementation signature:

```typescript
function getRolePrivileges(role: "admin"): AdminPrivileges;
function getRolePrivileges(role: "user"): UserPrivileges;
function getRolePrivileges(role: string): AnonymousPrivileges;
function getRolePrivileges(
  role: string,
) {
  ...
}
```

With this change in place, we still have overloads here for `admin` and `user`, but now we can pass in other things too.

But now we have some issues inside of the function.

## Typing the Function Return

Now we have some issues inside our function with the return values in each of the cases.

Since the implementation signature has to be something that amalgamates all of the overloads, that's where we need to set up our return types.

### Using `any` is the Wrong Choice!
Technically we could update the implementation signature to have `role: any` and a return type of `any`:

```typescript
function getRolePrivileges(role: any): any {
  ...
```

The tests pass, but it's a dirty solution that shouldn't be allowed.

### Updating the `role`
It might be tempting to set `role: "admin" | "user" | string`.

The thing with this solution is that `"admin"` and `"user"` get collapsed into `string` anyways, so we might as well go with just `string`.

```typescript
// this:
(role: "admin" | "user" | string)

// behaves the same as this:
function getRolePrivileges(role: string): any {
```

Now what should we do with the leftover `any`?

### Replacing the `any`
Looking at the interfaces for `AdminPrivileges`, `AnonymousPrivileges`, and `UserPrivileges` are all related:

```typescript
interface AnonymousPrivileges {
  sitesCanVisit: string[];
}

interface UserPrivileges extends AnonymousPrivileges {
  sitesCanEdit: string[];
}

interface AdminPrivileges extends UserPrivileges {
  sitesCanDelete: string[];
}
```

The `UserPrivileges` interface extends `AnonymousPrivileges`, and then `AdminPrivileges` extends from `UserPrivileges`.

This relationship tells us that the safest thing to do is to replace the `any` and make the return type an amalgam of these three things.

Now the implementation signature looks like this:

```typescript
function getRolePrivileges(
  role: string,
): AnonymousPrivileges | AdminPrivileges | UserPrivileges {
```

With this change everything is working and we have our `AnonymousPrivileges`, `UserPrivileges`, and `AdminPrivileges`.

Here's the complete solution with updated overloads and implementation signature:

```typescript
function getRolePrivileges(role: "admin"): AdminPrivileges;
function getRolePrivileges(role: "user"): UserPrivileges;
function getRolePrivileges(role: string): AnonymousPrivileges;
function getRolePrivileges(
  role: string,
): AnonymousPrivileges | AdminPrivileges | UserPrivileges {
  switch (role) {
    case "admin":
      return {
        sitesCanDelete: [],
        sitesCanEdit: [],
        sitesCanVisit: [],
      };
    case "user":
      return {
        sitesCanEdit: [],
        sitesCanVisit: [],
      };
    default:
      return {
        sitesCanVisit: [],
      };
  }
}
```

It's difficult to be type safe with a function overload, so we should do our best to ensure that the user is getting what they expect, but pros and cons aside, this looks pretty nice.

This solution provides a convenient auto-complete feature for the user, and is easy to understand for someone who stumbles upon it.

## Transcript
0:00 The solution to this exercise relies on knowing that this implementation signature does not get exposed outside of the function. We covered this in a previous solution, but this exercise really drives it home. It brings into focus the idea that this one here is just an amalgamation of all of the function overloads that come before it.

0:22 What we've got here is getRolePrivileges("anonymous") is erroring. This should give you a clue. This is telling us that we can't pass this. In fact, the only things we can pass are admin and user. We know that we're going to need to make this into a new function overload up here.

0:42 Let's take a look now. This appears to be working. We do get overloads here for admin and user, which is really nice. We can pass in other things, too, which is super cool just by itself. That's something that you can take from function overloads, is that you can use them to get autocomplete on string literals that can accept other things. There are other techniques for that, but it's pretty cool.

1:08 Now we've got some issues inside our function here. What do we do inside here? How do we type this? The implementation signature has to be something that amalgamates all of the others here. One thing we could do is we could have role, any and return any. This is dirty. We shouldn't be allowed to do this.

1:32 One thing we can do is we can call role string here, admin, user, or string, which is interesting. If I leave off string, of course, then this is not compatible, because you can't pass strings to something that could accept admin or user. Admin, user, or string is the same as string. TypeScript is not going to give us anything else there.

1:55 Admin and user get collapsed into string, so it might as well just be string. Now what do we put for this any here? AdminPrivileges and AnonymousPrivileges, they're all related. They all extend from AnonymousPrivileges here, and then admin extends from user.

2:15 The safest thing to do is to do AnonymousPrivileges, UserPrivileges, or AdminPrivileges here, making this return type an amalgam of these three things. Of course, we could delete this as well, but then we start getting some issues here because getRolePrivileges here, AdminPrivileges, it's saying that it's not compatible when we do know that it is.

2:40 This is the safest thing to do, is to make your implementation signature return a union of all of the possible things that are in there. It's possible to get smarter than that, but this is about as smart as you want to be. You don't want to get too clever here.

2:55 Now everything's working. We've got our AnonymousPrivileges coming through, got our UserPrivileges, got our AdminPrivileges. I want to test. It is possible to return the wrong things from this, too. You can return sitesCanDelete.

3:07 It's pretty hard to be super type-safe with a implementation function of a function overload. You have to try and do the best that you can and make sure that at least the user that's using your function is getting what they expect. Similar to generic functions, there are limitations with how type-safe you can be inside the generic function or function overload that you're creating here.

3:38 Again, pros and cons, but this looks pretty nice. It gives you some really nice autocomplete as the person using this. It's a pretty easy thing to look at for someone stumbling on this.

# 4. Function Overloads vs. Union Types

[

github.com

https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/05-function-overloads/24-function-overloads-vs-union-types.problem.ts

](https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/05-function-overloads/24-function-overloads-vs-union-types.problem.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=1795470f-1788-43ac-943a-3fd6704102c5&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0401-function-overloads-vs-union-types-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=1795470f-1788-43ac-943a-3fd6704102c5&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0401-function-overloads-vs-union-types-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
Consider this function called `runGenerator`.

It can take either an object where `run` is a function that returns something, or it can take a function itself:

```typescript
function runGenerator(generator: unknown) {
  if (typeof generator === "function") {
    return generator();
  }
  return generator.run();
}
```

Currently the return type is `unknown`.

## Challenge
This is a polymorphic function, so your mind should be spinning already.

Your challenge is to update the function so the tests for passing in a string and passing in a function that returns a string both pass.

There are two solutions to this exercise- one using function overloads, and one that doesn't.

There are two solutions to this exercise- one using function overloads, and one that doesn't.

## Transcript
0:00 In this exercise, we have a function called runGenerator, and runGenerator is going to take either one of two things. It's either going to take an object where run is a function that returns something, or it's just going to take a function here. 0:15 This is a polymorphic function, and your mind should be spinning already by thinking, "OK. This is in the function overload section. I want to see what's possible here with function overloads. Let's give this a go."

0:27 This exercise, there are two solutions here. One uses function overloads and one doesn't. This is going to be a compare and contrast exercise. See if you can find both solutions, and see if you can guess what I'm going to say in the solution video.

# Solution: When to Use Overloads and Unions

[

github.com

https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/05-function-overloads/24-function-overloads-vs-union-types.solution.1.ts

](https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/05-function-overloads/24-function-overloads-vs-union-types.solution.1.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=8de40fc1-3ddf-4c94-9e16-c0fc777a27c5&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0402-function-overloads-vs-union-types-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=8de40fc1-3ddf-4c94-9e16-c0fc777a27c5&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0402-function-overloads-vs-union-types-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution 1
The first solution is to use a function overload for the generator, and another for when it's an object.

Then inside of the implementation signature, we have the object or the function version:

```typescript
function runGenerator(generator: () => string): string;
function runGenerator(generator: { run: () => string }): string
function runGenerator(generator: { run: () => string } | (() => string)) {
  ...
```

Everything is fully typed. Our tests pass because we get `string` properly, and we'll get errors if we return something that isn't a `string`.

But do we need to declare these as function overloads?

## Solution 2: Using a Union
If we remove the function overloads, everything still works. This is because the return type doesn't change based on what we pass in.

```typescript
function runGenerator(generator: { run: () => string } | (() => string)) {
  if (typeof generator === "function") {
    return generator();
  }
  return generator.run();
}
```

## The Big Takeaway
Function overloads work best when used correctly, so think carefully before you pass something in.

If you have to return a different type of value depending on what is passed in, function overloads are a better way to express the parameters.

If you have the same return type no matter what happens, use a Union.

## Transcript
0:00 Here's solution number one. This is using function overload, as we can see. We have a function overload for just this generator here and we also have one for when it's an object, so either a function or an object. Then inside the implementation signature, we have the object or the function version just here.

0:21 Now everything is fully typed. Everything seems to be working. We're going to get errors if we return something that isn't a string here. This seems pretty nice. You should be asking yourself, are function overloads required here? What am I getting out of declaring these as function overloads that I wouldn't get if I just declared it as a union?

0:46 Here, I've just taken off the top two signatures here, and everything still works. That's because the return type doesn't change based on the thing that you're passing in here. Let's say, for instance, that this was a different exercise completely. Let's say you run it with an object, it returns an object with result string here.

1:16 This is going to yell at us because it's not
compatible with the implementation signature. This means that this is
now going to return string or result string like this. That means that
this needs to change here, result [generator.run](http://generator.run).

1:30 Now, when you pass it an object, it's going to return you an object. When you just pass it function, it's going to return you just a string. This wasn't the exercise. You should think carefully, because function overloads are at their best when you have a different return type based on something that you pass in.

1:52 If you just have the same return type, no matter what happens, it's always going to return a string, then you should probably be using a union to express these parameters instead.

# 5. Generics in Function Overloads

[

github.com

https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/05-function-overloads/25-generics-in-function-overloads.problem.ts

](https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/05-function-overloads/25-generics-in-function-overloads.problem.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=d052d931-69a3-41a3-b34f-58559cdad8a6&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0501-generics-in-function-overloads-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=d052d931-69a3-41a3-b34f-58559cdad8a6&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0501-generics-in-function-overloads-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
This exercise is a little bit tricky.

Here's a function called `returnWhatIPassInExceptFor1`:

```typescript
function returnWhatIPassInExceptFor1(t: unknown): unknown {
  if (t === 1) {
    return 2;
  }
  return t;
}
```

When I pass in anything other than `1`, the function should return what I pass in (as the name suggests).

For example, if I pass in `a`, `b`, or `c`, the function should return `a`, `b`, or `c` respectively.

However, when I pass in `1`, the result should be of type `2`.

## Challenge
Your challenge is to use function overloads and a generic to replace the `unknown` so the tests pass as expected.

## Transcript
0:00 This exercise is a little bit tricky. This function says returnWhatIPassInExceptFor1. What I want this function to do is basically return what I pass in, so this should be typed as a, this should be typed as b, this should be typed as c, except for when you pass in 1 here.

0:21 You basically want to have...You're probably going to need a generic here to pass in through all the stuff when you just pass in whatever you want to, but when you return in 1, the result should be of type 2.

0:34 You'll need some function overloads here. You'll also need a generic. That, I think, is all the clues I'm going to give you. Good luck.

# Solution: Typing Different Function Use Cases

[

github.com

https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/05-function-overloads/25-generics-in-function-overloads.solution.ts

](https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/05-function-overloads/25-generics-in-function-overloads.solution.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=85ad3e44-9556-4f44-8e03-59a7b03068d2&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0502-generics-in-function-overloads-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=85ad3e44-9556-4f44-8e03-59a7b03068d2&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0502-generics-in-function-overloads-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
Let's work this solution out together.

We'll start by adding a function overload to handle the case of returning `2` when we pass in `1`.

Since the function implementation signature is not exposed to the outside world, we'll create a function overload that matches it:

```typescript
function returnWhatIPassInExceptFor1(t: 1): 2;
function returnWhatIPassInExceptFor1(t: unknown): unknown;
function returnWhatIPassInExceptFor1(t: unknown): unknown {
  ...
```

With these changes the string tests are erroring because they are typed as `unknown`.

To fix this, we can add a generic `<T>` to the overload.

We want it to say when `t` is not `1`, make it the same as type `T`, and return that `T`:

```typescript
function returnWhatIPassInExceptFor1(t: 1): 2;
function returnWhatIPassInExceptFor1<T>(t: T): T;
function returnWhatIPassInExceptFor1(t: unknown): unknown {
  ...
```

With this change in place, we can hover over one of the string tests and see that we have inference:

```typescript
// Hovering over
const a = returnWhatIPassInExceptFor1("a");

// Popup shows:
function returnWhatIPassInExceptFor1<"a">(t: "a": "a") (+1 overload)
```

However if we hover over the test with `1`, notice that there is no type argument being inferred:

```typescript
// Hovering over
const result = returnWhatIPassInExceptFor1(1);

// Popup shows:
function returnWhatIPassInExceptFor1(t: 1): 2 (+1 overload)
```

## Mapping Different Type Arguments with Generics
We can use generics on different function overload signatures to map different type argument setups.

For example, let's add a function overload with a slot that has `T1` and `T2`. Then if the generics were ignored we would say `hello` and then get `goodbye`:

```typescript
function returnWhatIPassInExceptFor1<T1, T2>(t: 'hello'): 'goodbye';
```

Now if we called `returnWhatIPassInExceptFor1` and pass in arguments of `wow` and `cool`, it would force us to be in that generic slot or that function overload:

```typescript
// Hovering over
const goodbye = returnWhatIPassInExceptFor1<"wow", "cool">()

// Popup shows:
returnWhatIPassInExceptFor1<T1, T2>(t: "hello"): "goodbye"
```

## Recapping the Solution
Again, here's what the solution looks like all together:

```typescript
function returnWhatIPassInExceptFor1(t: 1): 2;
function returnWhatIPassInExceptFor1<T>(t: T): T;
function returnWhatIPassInExceptFor1(t: unknown): unknown {
  if (t === 1) {
    return 2;
  }
  return t;
}
```

We can have different generic signatures on different function overloads.

This means `a`, `b` and `c` are being inferred correctly, but the `1` isn't.

You may be asking what we should type it as, but for this example I actually like `unknown` and `unknown`. With this setup anything can be passed in, and it's not being constrained.

The `<T>(t: T): T;` represents it pretty well, because we don't know what's going to be passed in. Really it doesn't matter much because the function itself is so simple.

The big takeaway from this solution is that you can add generics to a specific function as needed.

## Transcript
0:00 The solution here, we know it's probably going to involve a function overload. If we add in a function overload here, let's handle this case first, because that's pretty simple to write. When we get a 1, we're going to return a 2. Now these are erroring because, of course, the function implementation signature is not exposed to the outside world. We need to write something in here.

0:23 If we add this, then a is going to be unknown, b is going to be unknown, and C is going to be unknown. What we can do is we can add a generic here. We can add a t. This is just like all the other generics that we've used. We can have T extends string, whatever, whatever, whatever. Then we can do exactly the same stuff as we had before.

0:44 In this case, when t is not equal to 1, then we're going to just treat it as T and infer it. If you hover over this, then we get the inference here. You notice if we hover over this, there's no type argument being inferred here. What this means is we can use generics on different function overload signatures to map different type argument setups.

1:10 Let's say we had T1, T2 here. Imagine these were just totally ignored. This means you need to say hello, and then you get goodbye. I've got that exercise on the brain.

1:23 Now if you were to say const goodbye equals returnWhatIPassInExceptFor1, and you were to manually pass in two type arguments, let's say wow and then cool like this, then it would force you to be in that generic slot or that function overload, which is nutty.

1:47 You can have different generic signatures on different function overloads. What this means then is that a is being inferred correctly, b is being inferred correctly, and c is being inferred correctly, but this one isn't. The question is now what do we type this as.

2:03 I like unknown and unknown being here, because we could pass in anything. This isn't being constrained by anything. It really is unknown as the signature. Then you could do unknown or 2. We do need to handle the case here. We have if t equals 1, return 2.

2:32 This represents it pretty well, because we really don't know what's going to be passed in there. It doesn't matter because the function itself is so simple. That's the lesson here, is that you can add generics onto a certain function overload if you want to.

# 6. Solving an Inference Mystery

[

github.com

https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/05-function-overloads/26-document.queryselector-example.problem.ts

](https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/05-function-overloads/26-document.queryselector-example.problem.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=7932e8d3-0255-4691-a718-e84df398b23f&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0601-solving-an-inference-mystery-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=7932e8d3-0255-4691-a718-e84df398b23f&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0601-solving-an-inference-mystery-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
This exercise presents an inference mystery.

Here's the code:

```typescript
const divElement = document.querySelector("div");
const spanElement = document.querySelector("span");

const divElement2 = document.querySelector("div.foo");
```

When we pass in `"div"` to `document.querySelector`, it returns an `HTMLDivElement` or `null`.

Similarly, when we pass it `"span"` we're getting an `HTMLSpanElement`.

So we're getting nice specific types when we pass in `div` and when we pass in `span`.

However, when we pass in `"`[`div.foo`](http://div.foo)`"`, we'll get back either `element` or `null`.

## Challenge
Your challenge is to dive into these types to figure out why `document.querySelector` behaves this way.

In VS Code on your local machine you can hover over `querySelector` and go to its definition, or check out the [TypeScript DOM source code on GitHub](https://github.com/microsoft/TypeScript/blob/43cc362cef72e5fa1372f59736a9c4b55d85def0/lib/lib.dom.d.ts#L10531) to reference if you are working with Stackblitz.

You're going to encounter some scary looking types!

If you get lost, then jump ahead to the solution and we'll walk through all of it together.

## Transcript
0:00 In this exercise, we have a bit of a murder mystery, or an inference mystery, should we say. Document.querySelector, when we pass in div here, is returning HTMLDivElement, or . On the spanElement, we're getting HTMLSpanElement, so we're getting nice specific types when we pass in div and when we pass in span.

0:20 When we pass in something that's not that, then this should be a div, but we're actually just getting element, or . Your job here is to figure out why document.querySelector is behaving in this way.

0:34 You're going to need to dive into some of these types. The first spot you're going to have to look at is you can basically hover over this Go To Definition, and it will take you to the spot where it's declared.

0:51 You're going to be looking at some scary-looking types. Try not to get lost. If you do get lost, then jump back to the solution, and I'll walk you through all of it.

# Solution: The Inference Mystery Solved

[

github.com

https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/05-function-overloads/26-document.queryselector-example.solution.ts

](https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/05-function-overloads/26-document.queryselector-example.solution.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=d1dd85e5-8b22-4f50-8009-e2b155df2c68&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0602-solving-an-inference-mystery-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=d1dd85e5-8b22-4f50-8009-e2b155df2c68&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0602-solving-an-inference-mystery-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
The `ParentNode` interface inside of [TypeScript's ,](https://github.com/microsoft/TypeScript/blob/main/lib/lib.dom.d.ts#L10531)[`lib.dom.d.ts`](https://github.com/microsoft/TypeScript/blob/main/lib/lib.dom.d.ts#L10531)[, file](https://github.com/microsoft/TypeScript/blob/main/lib/lib.dom.d.ts#L10531) is where `querySelector` is defined.

You'll notice that it has several overloads:

```typescript
/** Returns the first element that is a descendant of node that matches selectors. */
querySelector<K extends keyof HTMLElementTagNameMap>(selectors: K): HTMLElementTagNameMap[K] | null;
querySelector<K extends keyof SVGElementTagNameMap>(selectors: K): SVGElementTagNameMap[K] | null;
querySelector<E extends Element = Element>(selectors: string): E | null;
```

This shows us that methods on an interface can be overloaded.

## Experimenting with Interface Overloads
Back in the exercise file, let's experiment by creating an interface called `MattInterface`:

```typescript
interface MattInterface {
  a(): 1;
  a(param: "wow"): 2;
}
```

Here `a` is a function that returns `1`. But if `a` is called with a `param` of `"wow"` it will return a `2`.

We could quickly create an `example` that uses the interface:

```typescript
const example = {} as MattInterface;
```

Calling our `example.a()`, we can see its behavior matches what we saw in the interface:

```typescript
example.a() // returns 1
example.a("wow") // returns 2
```

## Back to the `querySelector` Overloads
Now that we have an idea for how interface overloads work, we just need to determine which one of the three we end up triggering.

With VS Code, select "Go to definition" when hovering over the call to `querySelector("div")`.

We get jumped over to the exact overload that gets hit:

```typescript
querySelector<K extends keyof HTMLElementTagNameMap>(selectors: K): HTMLElementTagNameMap[K] | null;
```

Back in the exercise file, repeating the process with `querySelector("span")` takes us to the same place.

But jumping to the definition for `querySelector("`[`div.foo`](http://div.foo)`")` takes us to the last overload:

```typescript
querySelector<E extends Element = Element>(selectors: string): E | null;
```

Why is this going to the last overload when we know the selector contains a `div`?

Looking at the overload where the other queries jumped to, we see `K extends keyof HTMLElementTagNameMap` which tells us that the selector is passed into `HTMLElementTagNameMap`.

Jumping to that definition, we can see a list of all of the different elements being mapped to the tag that they're in:

```typescript
interface HTMLElementTagNameMap {
  "a": HTMLAnchorElement,
  "abbr": HTMLElement,
  ...
```

With this new information, we know that if we choose an element that's part of the `HTMLElementTagNameMap`, we'll get autocomplete when using it in our source code.

It follows that calling `document.querySelector("svg")` will hit the second overload.

Therefore, when we pass in something like [`div.foo`](http://div.foo), we will end up in the third overload that just returns `Element`. This is because `querySelector` isn't smart enough to know that if the thing we pass in starts with `"div"` that it belongs as an `HTMLDivElement`.

## The Big Takeaway
The `lib.dom.d.ts` file is huge, and full of APIs you'll be using in your web based projects. The Node API source is perhaps even more complex. Become comfortable reading these files, but don't worry about memorizing them.

Knowing how to read and diagnose problems related to function overloads on interfaces is very important!

This should give you the confidence to fix any errors you encounter in the wild!

## Transcript
0:00 Ready to solve the mystery? Let's go. What I'm going to do here is I'm going to do a Go to Definition to find out why the types of querySelector are being so weird. We could go a lot of different places here, but I want you to be aware that where you do your Go to Definition really affects where you end up.

0:20 If I do a Go to Definition on Document, I'm going to end up in no man's land here. I don't want to think about the whole document. That's not what I'm analyzing. I just want to to analyze the querySelector, so I'm going to do a Go to Definition there. We end up in an interface that looks like interface ParentNode extends Node, and we get querySelector on here.

0:44 This is an interface. I don't want you to worry too much about what all of these different interfaces are. We may cover that in some bonus material, or some material somewhere. We have these functions here called querySelector, and these are basically, if we look at the whole thing zoomed out, methods on the interface here.

1:06 These methods on the interface, you can see that they're overloaded. If I were to create my own interface here, so interface MattInterface. Then let me zoom that in. Then I can actually have, a is a function, for instance. Let's say a, and a returns one, but if I call a with a "wow," then it's going to return two, or rather I should do the syntax properly, shouldn't I?

1:36 Let's call this param "wow," and returns two. You can see here that MattInterface, imagine if I have a const example, which is like this. As MattInterface, can we pull that to implement it now? Example.a, if I call it, then it's going to return one, but if I pass it a "wow," then it's going to return two instead.

2:00 This method lets you declare different overloads on interfaces. We understand what's going on, now let's check it out. We can now look at each of the querySelectors here because there's three overloads. We need to work out which one that we're triggering. We can do that by saying querySelector ("div").

2:22 If we do a Go to Definition on it here -- this is inside VS Code -- then you get taken to the exact overload that's being hit here. We can see that this one hits this line. This next one, the span, hits the same one. Then this one, which one does this hit? This one hits the third line.

2:47 What's going on here? We can see the querySelector here. We have a K extends keyof HTMLElementTagNameMap, and then the selector is being passed in there. HTMLTagNameMap, if I go to it, you can see that it has all of these different elements on it mapped to the exact tag that they're in.

3:11 If I choose these, then I should be able to actually get autocomplete here. A base ends up as a HTMLBaseElement. An area ends up as a HTMLAreaElement. That's really, really cool. If I get one of those, then I'm basically triggering, if I jump back to querySelector, this first element here, or this first overload.

3:36 If I choose the name of an SVGElement, for instance animateMotion, then I'm going to trigger the second overload. I'm going to end up with an SVGAnimateMotionElement there. You can see there, when I do a Go to Definition on it, then I end up on the second overload.

3:53 If I don't pass in anything that hits either of those keys, either hits keyof SVGElementTagNameMap or keyof HTMLElementTagNameMap, then I end up on this overload. That's what's happening here, is I'm getting a blah-blah-blah-blah-blah. I could pass in anything, and I'm going to end up with a generic element.

4:14 That's why divElement2 is not of type HTMLDivElement. It's because querySelector here isn't smart enough to know that if I start my thing with a div here, like div.whatever, I'm going to end up with a div at the end there. You notice, though, that it does take a generic, it does take a type argument.

4:34 It has an E extends Element, which defaults to Element. What this means is we can pass it HTMLDivElement here, meaning that we end up with, if I change the span back to what it was, something nice. Now what's happening is that it's returning HTMLDivElement because we're manually passing in that E in there.

5:01 What's the lesson here? Wow, there's so much to dive into here. This huge file, this is lib.dom.d.ts, this is full of APIs that you will be using in your projects if you're doing a web-based project. If you're doing a Node project, then you're going to be using types/node, which is possibly even more complex than this.

5:25 Knowing how to read this stuff, you don't need to know every line of it, but knowing how to read and diagnose these problems is really, really important. I'm going to be looking at that in future exercises in this core volume.

5:39 For now, knowing that these function overloads are available on interfaces, and knowing that you can diagnose them, should give you a real sense of power and give you a sense that, "OK, I can dive into this stuff and understand what's happening."

5:55 For now, what we've got here is different generic signatures based on different overloads, and this should give you a good sense of confidence when you're approaching this stuff and fixing these type of errors in the wild.

# 7. Use Function Overloads to Infer Initial Data

[

github.com

https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/05-function-overloads/27-use-data-hook.problem.ts

](https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/05-function-overloads/27-use-data-hook.problem.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=6deb35dc-32c9-4463-8924-4f453cbaf86a&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0701-use-function-overloads-to-infer-initial-data-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=6deb35dc-32c9-4463-8924-4f453cbaf86a&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0701-use-function-overloads-to-infer-initial-data-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
This exercise is based off a real PR I made to TanStack Query.

We have a `useData` function, which is analogous to something like you would see in React, but doesn't actually use anything from React.

It takes in a `params` object that includes a `fetchData` function, then returns a `Promise<T>`.

```typescript
function useData<T>(params: { fetchData: () => Promise<T>; initialData?: T }): {
  getData: () => T | undefined;
} {
  let data = params.initialData;

  params.fetchData().then((d) => {
    data = d;
  });

  return {
    getData: () => data,
  };
}
```

The first test has a call to `useData` with a `fetchData` function that will resolve the Promise with a number, which will then be either be returned as the `getData` number or be `undefined`:

```typescript
it("Should return undefined if no initial data is passed", () => {
  const numData = useData({
    fetchData: () => Promise.resolve(1),
  });

  const data = numData.getData();

  type Test1 = Expect<Equal<typeof data, number | undefined>>;
});
```

There's an issue with the second test:

```typescript
it("Should NOT return undefined if initial data is passed", () => {
  const numData = useData({
    fetchData: () => Promise.resolve(1),
    initialData: 2,
  });

  const data = numData.getData();

  type Test1 = Expect<Equal<typeof data, number>>;
});
```

When `initialData` is passed in to the `useData` function as it is in the second test, it will be assigned to the `data` variable. This means that the function should not be able to return `undefined`.

## Challenge
Your challenge is to use function overloads to fix the `useData` function so that it will always return a `number` if `initialData` is passed.

## Transcript
0:00 In this exercise, we have a useData hook thing. You can think of this being analogous to something like React, but this is just a function. It's not using anything from React.

0:11 What this does is it takes in a params object, which takes in fetchData, which is a function that returns Promise T. If you can see here, we've got a fetchData function, the promise that resolves a number. Then that number data is a getData number or undefined. We've got data and number or undefined.

0:32 There's an issue here, which is it should not return undefined if initial data is passed, because if you think about this, if you look at the flow here, then this data is going to be locked in as params.initialData. If you pass in initialData, then there's going to be no moments when numData.getData is going to return number or undefined. It's always going to return number.

0:57 Your challenge then is to fix this function in order to make that work. There are a couple of solutions to this, but I want you to prioritize the one that uses function overloads here. That's what's going to get you there. By the way, this is based on a real PR that I made to TanStack Query to add this functionality there.

# Solution: Split Functions Into Two Different Call Signatures

[

github.com

https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/05-function-overloads/27-use-data-hook.solution.ts

](https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/05-function-overloads/27-use-data-hook.solution.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=6521bbbf-b96f-4d69-b579-23884c1507a6&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0702-use-function-overloads-to-infer-initial-data-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=6521bbbf-b96f-4d69-b579-23884c1507a6&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0702-use-function-overloads-to-infer-initial-data-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
As a reminder, here's what the original function signature for `useData` looked like:

```typescript
function useData<T>(params: { fetchData: () => Promise<T>; initialData?: T }): {
  getData: () => T | undefined;
} {
  ...
```

To solve this challenge, we'll remove the optional part of the original implementation and create overloads that separate `useData` into two different call signatures: one that includes `initialData` and one that does not.

The call signature that does not include `initialData` will return `T` or `undefined`:

```typescript
function useData<T>(params: { fetchData: () => Promise<T> }): {
  getData: () => T | undefined;
};
```

The call signature that does include `initialData` will just return the `T` that was passed in.

```typescript
function useData<T>(params: { fetchData: () => Promise<T>; initialData: T }): {
  getData: () => T;
};
```

Using looser type signatures like this ensures that `fetchData` always returns the type we expect.

Here's what the solution looks like all together:

```typescript
function useData<T>(params: { fetchData: () => Promise<T> }): {
  getData: () => T | undefined;
};
function useData<T>(params: { fetchData: () => Promise<T>; initialData: T }): {
  getData: () => T;
};
function useData<T>(params: { fetchData: () => Promise<T>; initialData?: T }): {
  getData: () => T | undefined;
} {
  let data = params.initialData;

  params.fetchData().then((d) => {
    data = d;
  });

  return {
    getData: () => data,
  };
}
```

Function overloads are useful when building things that have an optional property, but are actually two different call signatures.

If they had the same type signature, then it wouldn't make sense to split them up.

However, since the type signatures are different, splitting them into overloads works out quite nicely!

## Transcript
0:00 When we call use data, we're now splitting it into two different call signatures. That's a way to think about function overloads. There's the call signature without initial data and there's the call signature with initial data.

0:15 Those two things return different return types, because what you can see here then is, in this call signature, this is going to return T or undefined. In the other one, it's going to return T. In here, then, this is going to work now. I've just patched it. Of course, we've got an error here because T is T or undefined inside here.

0:39 What we need to do is split this out into two different call signatures, two different function overloads. I'm going to copy this and just paste it twice. That's going to give us two identical function overloads, which is the same as just having this implementation signature down here.

0:55 One of them is going to have no initial data. That no initial data is going to return T or undefined here. This one, it's going to have initial data. It's not going to be optional either. You've got to pass it. We're splitting out the optional parts into two different call signatures. On this one, it's going to be T just here.

1:16 Now everything works. Because we're using a pretty loose type signature inside here, we've got the optional property inside there, we've got T or undefined here, then it all just fits together really nicely. Now getData always returns a number.

1:34 This functionality is really cool if you're building things which feel like they have an optional property but are, in fact, two different call signatures. That's something to really wrap your head around with function overloads, that really they split your function up into different ways of calling it.

1:52 In this case, function overloads are perfect because we have different type signatures coming out at the end. If they were the same type signature, then maybe it wouldn't make sense to split them up into function overloads, but because they have two different ones, then it doesn't make sense and it works really nicely.

# 8. The "Instantiated with Subtype" Error

[

github.com

https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/05-function-overloads/28-could-be-instantiated-with-subtype-of.problem.ts

](https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/05-function-overloads/28-could-be-instantiated-with-subtype-of.problem.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=487f12ba-c995-48e0-b4d2-50259d3e46a7&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0801-the-instantiated-with-subtype-error-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=487f12ba-c995-48e0-b4d2-50259d3e46a7&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0801-the-instantiated-with-subtype-error-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
In this exercise, we're going to tackle one of TypeScript's most difficult errors.

Here we have an object called `obj`, which contains `a`, `b`, and `c` with values of `1`, `2`, and `3`, respectively.

The `ObjKey` type uses `keyof` and `typeof` to extract the keys, giving us `"a" | "b" | "c"`.

Then there is a function called `getObjValue`, which takes a generic type `TKey` that extends the `ObjKey` type.

If we pass in `"a"`, `"b"`, or `"c"`, the function should return the corresponding value from the `obj` object:

```typescript
const obj = {
  a: 1,
  b: 2,
  c: 3,
} as const;

type ObjKey = keyof typeof obj;

const getObjKey = <TKey extends ObjKey>(key: TKey = "a") => {
  return obj[key];
};
```

In the current implementation what we want to do is set a default value of `"a"` for the `TKey` if nothing is passed in.

However, this isn't currently working.

We get an error that `a` is not assignable to type `TKey`, and that `TKey` could be instantiated with a different subtype of constraint `"a" | "b" | "c"`.

The translation of this error is that the `"a"` value it's trying to use is too narrow, and it could be as wide as anything assignable to `"a" | "b" | "c"`.

## Challenge
If you've seen this error before, you know how tricky it can be!

Your challenge is to use function overloads to fix this error so that the `getObjKey` function a default value of `"a"`.

Hint: The two call signatures you should create are `getObjectValue<TKey extends ObjKey>(key: TKey)` and `getObjectValue()`.

## Transcript
0:00 In this exercise, we're going to tackle one of TypeScript's gnarliest, weirdest errors. We have an object here called obj, and it's just a, b, c with 1, 2, 3 in them. We're extracting out the ObjKey here. We're getting a, b, or c locked into this type. We've got a function called getObjValue. Inside here, we've got TKey extends ObjKey.

0:23 If I were to remove this, then everything would be fine. We can see that calling getObjValue here, the key gets locked in as this type here, because we're passing in a and we have a in there. Inside here, it works with b and it works with c. The thing that we get back is the literal value from the object const up here, which is really nice.

0:50 What we want to do here is when we call getObjValue with nothing, we want it to default to a. We want to default it like this. This seems to not work because, what's happening here, type a is not assignable to type TKey. A is assignable to the constraint of type TKey, but TKey could be instantiated with a different subtype of constraint a, b, or c.

1:17 If you've seen this error before, bad luck, you're about to see it again here. I do want to give you a really good mental model, but I want you to struggle a bit first. I'll give you a clue, which is that function overloads are a really nice way to solve this error. I want you to look that there are two call signatures here. There's this one and there's this one.

1:43 That's all the clues I'm going to give you. I'll show you the solution in a minute. Good luck.

# Solution: Handling Default Arguments with Function Overloads

[

github.com

https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/05-function-overloads/28-could-be-instantiated-with-subtype-of.solution.ts

](https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/05-function-overloads/28-could-be-instantiated-with-subtype-of.solution.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=037c4921-cf3e-4052-a206-8e29a7a41193&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0802-the-instantiated-with-subtype-error-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=037c4921-cf3e-4052-a206-8e29a7a41193&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0802-the-instantiated-with-subtype-error-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
First let's dive into why this error is happening in the original implementation:

```typescript
const getObjValue = <TKey extends ObjKey>(key: TKey = "a") => {
  return obj[key];
};
```

The function results in an error because `getObjectValue` can be called with a variety of different inputs.

It could be called with `"a"`, `"b"`, or `"c"`, but it could also be called with a union type of those members, such as `"a" | "b"`, or `"b" | "c"`.

Defaulting it to `"a"` does not give TypeScript enough information to infer the correct type. Therefore, it does not make the connection that if nothing is passed, it should grab `"a"` in the `obj`.

This gives us a hint to use `function overloads`.

## Adding Function Overloads
As seen in the challenge hint, we should extract two separate call signatures: one where an argument is passed, and one where nothing is passed.

### When an Argument is Passed
To create the overload where an argument is passed, we'll copy and paste the original signature and set the return type to `typeof obj[TKey]`:

```typescript
function getObjKey<TKey extends ObjKey>(key: TKey): typeof obj[TKey];
```

### When No Argument is Passed
Now let's work on the next overload where nothing is passed into `getObjValue`.

We we won't need a generic, because nothing is being passed in. Then for the return type, we just return the `typeof` the object's `"a"` key:

```typescript
function getObjectValue(): typeof obj["a"];
```

### Updating the Implementation Signauture
With the overloads in place, we can remove the generic `<TKey extends ObjKey>` from the original implementation. We'll also replace the `TKey` in the original argument with `ObjKey`.

Here's what the solution looks like all together:

```typescript
function getObjValue(): typeof obj["a"];
function getObjValue<TKey extends ObjKey>(key: TKey): typeof obj[TKey];
function getObjValue(key: ObjKey = "a") {
  return obj[key];
}
```

## Breaking it Down

For reference, here are the tests from the exercise:

```typescript
const one = getObjValue("a");
const oneByDefault = getObjValue();
const two = getObjValue("b");
const three = getObjValue("c");

type tests = [
  Expect<Equal<typeof one, 1>>,
  Expect<Equal<typeof oneByDefault, 1>>,
  Expect<Equal<typeof two, 2>>,
  Expect<Equal<typeof three, 3>>,
];
```

Using VS Code's "Go to definition" feature on the test variables will show us which overload is being used for each.

For example, jumping to the definition of `oneByDefault` takes us to the first overload because we aren't passing anything to the function.

When something is passed in, the second overload uses generic inference to determine what value to return.

This challenge started with a complicated error, but TypeScript is satisfied with this easy to read function overload solution.

## Transcript
0:00 Let's dive into why this error is happening. The reason it's happening is because getObjValue here, it could be called with a bunch of different things. It could be called with a. It could be called with b. It could be called with c. It could also be called with a union type of those members. It could be called with a or b like this. It could be called with b or c, for instance.

0:21 Defaulting it to A doesn't give TypeScript enough to work with in terms of inferring stuff. It doesn't quite make the leap that if you don't pass anything, it wants you to grab a in this slot here. In fact, it still infers a, b, or c. You can think about this. I gave you a clue in the problem set up as having two different call signatures.

0:49 You've got the call signature where you don't pass in arguments and you've got the call signature where you do pass in arguments. This makes me think of function overload. If we extract this out into a function overload, so pull that over here, pull that over here, copy this over here.

1:08 We obviously can't do any runtime stuff in a function overload. We're going to say key TKey equals, the thing we're getting back is typeof Obj and then TKey. This means then I can remove this for now. We're now handling the first case in our function overloads. We've got our 1 here. We've got our 2, got our 3. We also need this oneByDefault.

1:36 Now we can pass this up here. We don't need a generic up here. We can just say there's no key being passed, no inference needed. The thing that we're going to be getting back is the 1, or we can do typeof Obj and then a, for instance. This means that we don't need to manually specify it here.

1:58 Now we're getting an error here because the overload signature is not compatible with its implementation signature. What we can do here is we don't need this generic anymore, because all the inference is happening up here.

2:12 All we need to do inside of the implementation signature is make sure that this is compatible with these two. We can remove ObjKey here and make this optional. We can then say obj.key or a. Or, in fact, we can move the default value up into here, too. We can say key equals a.

2:33 Now this all works. Let's break this down just a little more. We can see that oneByDefault is hitting the first. I did just a little cheeky go-to definition there to see which one it hits. It hits this one because we're not passing anything to it. We go here on the second one, we can see that a go-to definition hits the second overload.

2:55 If I pass something to this, then I'm going to get a, b, or c locked in. I'm also getting my oneByDefault back. This means that there's only generic inference happening on one of the overloads, on this one. This one doesn't need any generic inference because it's just working off the function overload, working off that call signature.

3:15 This one doesn't need generic inference because it's pretty loose. The generic inference is attached to one of the function overloads, which is outward-facing. This is basically just implementation stuff.

3:32 There's quite a lot in here. It's a complicated solution for what's a really complicated problem. TypeScript seems really, really happy with this. It's fairly easy to read. It means that at least you have one solution when you encounter that horrible, horrible error.

# Resources

[

github.com

https://github.com/microsoft/TypeScript/blob/a118f37399bd4632c0ead2a48071cdfbd4c562bb/src/lib/dom.generated.d.ts#L15992

](https://github.com/microsoft/TypeScript/blob/a118f37399bd4632c0ead2a48071cdfbd4c562bb/src/lib/dom.generated.d.ts#L15992)

# (f) Challenges



# 1. Make An Infinite Scroll Function Generic with Correct Type Inference

[

github.com

https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/06-challenges/29-infinite-scroll.problem.ts

](https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/06-challenges/29-infinite-scroll.problem.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=70d60b03-2729-4acb-a0f6-e75783678d28&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0101-make-an-infinite-scroll-function-generic-with-correct-type-inference.problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=70d60b03-2729-4acb-a0f6-e75783678d28&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0101-make-an-infinite-scroll-function-generic-with-correct-type-inference.problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
Here we have a`makeInfiniteScroll` function that is similar to a hook in React or another framework:

```typescript
const makeInfiniteScroll = (params: unknown) => {
  const data = params.initialRows || []

  const scroll = async () => {
    const rows = await params.fetchRows()
    data.push(...rows)
  }

  return {
    scroll,
    getRows: () => data,
  }
}
```

In our tests is a `table` constant that calls `makeInfiniteScroll` and passes in an object with a `key` of `"id"` as well as a `fetchRows` function.

The `fetchRows` function returns a `Promise.resolve` with an array containing a single object with an `id` of `1` and a `name` of `"John"`:

```typescript
it("Should fetch more data when scrolling", async () => {
  const table = makeInfiniteScroll({
    key: "id",
    fetchRows: () => Promise.resolve([{ id: 1, name: "John" }]),
  })

  await table.scroll()

  await table.scroll()

  expect(table.getRows()).toEqual([
    { id: 1, name: "John" },
    { id: 1, name: "John" },
  ])
})
```

If `fetchRows` does not include a property that was set by `key`, an error will occur. For example, if `fetchRows` returned `{ name: "John" }`, we would get an error.

## Challenge
Your challenge is to make `makeInfiniteScroll` generic, and to update it to also accept an `initialRows` property that is the same type as the `fetchRows`.

This will allow for the inference of `rows` as seen in the test:

```typescript
it("Should allow you to pass initialRows", () => {
  const { getRows } = makeInfiniteScroll({
    key: "id",
    initialRows: [
      {
        id: 1,
        name: "John",
      },
    ],
    fetchRows: () => Promise.resolve([]),
  })

  const rows = getRows()

  expect(rows).toEqual([
    {
      id: 1,
      name: "John",
    },
  ])

  type tests = [Expect<Equal<typeof rows, Array<{ id: number; name: string }>>>]
})
```

## Transcript
0:00 In this exercise, we're taking this makeInfiniteScroll function, and it's completely untyped right now. We're trying to capture some reusable stuff inside a single function. You can think of this makeInfiniteScroll as a hook in React or a similar thing in another framework.

0:20 We have this table here, makeInfiniteScroll. We're expecting this key to be ID and fetchRows, we're returning promise.resolve ID1 named John. Now, we're expecting that if we fetchRows here and the promise.resolve doesn't include the key, then it's going to error at us. This key has to be a key of the thing that we're fetching from fetchRows.

0:48 It should also allow you to pass in initialRows. These initialRows should be the same type as this fetchRows here. It should also infer the rows when the rows get returned. Currently, the rows are any. It lets you pass any key inside here, and currently, there's no inference going on whatsoever.

1:08 Your job is to try to type this function to make it generic and make sure that all of the pieces get inferred properly. Good luck.

# Solution: Introduce a Type Parameter to Ensure Type Consistency

[

github.com

https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/06-challenges/29-infinite-scroll.solution.ts

](https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/06-challenges/29-infinite-scroll.solution.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=8805d2c5-81de-4642-b71b-4664a2434402&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0102-make-an-infinite-scroll-function-generic-with-correct-type-inference.solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=8805d2c5-81de-4642-b71b-4664a2434402&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0102-make-an-infinite-scroll-function-generic-with-correct-type-inference.solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
The first thing we need to add is a type argument for `makeInfiniteScroll`.

We'll start by scaffolding a type called `MakeInfiniteScrollParams` that will be an object containing `initialRows`, and `fetchRows`.

For now we'll set `initialRows` to be an array of `unknown` and `fetchRows` to be a function that returns a `Promise` of `unknown`:

```typescript
type MakeInfiniteScrollParams = {
  initialRows: unknown[]
  fetchRows: () => Promise<unknown>
}
```

Next, we'll set the `params` argument to be of type `MakeInfiniteScrollParams`:

```typescript
const makeInfiniteScroll = (params: MakeInfiniteScrollParams) => {
  const data = params.initialRows || []

  const scroll = async () => {
    const rows = await params.fetchRows()
    data.push(...rows)
  }

  return {
    scroll,
    getRows: () => data,
  }
}
```

With these changes in place, the function shows an error for `data.push`:

```typescript
Type 'unknown' must have a '[Symbol.iterator]()' method that returns an iterator.
```

To fix this we can set `fetchRows` to be a function that returns a `Promise` returning an array of `unknown`:

```typescript
type MakeInfiniteScrollParams = {
  initialRows: unknown[]
  fetchRows: () => Promise<unknown[]>
}
```

With that error fixed, there is now an error in the test with `key` since it doesn't exist on the `param`:

```typescript
it("Should fetch more data when scrolling", async () => {
  const table = makeInfiniteScroll({
    key: "id",
    fetchRows: () => Promise.resolve([{ id: 1, name: "John" }]),
  })

  await table.scroll()

  await table.scroll()

  expect(table.getRows()).toEqual([
    { id: 1, name: "John" },
    { id: 1, name: "John" },
  ])
})
```

To fix it for the time being, we'll add it to our type as as a string:

```typescript
type MakeInfiniteScrollParams = {
  key: string
  initialRows: unknown[]
  fetchRows: () => Promise<unknown[]>
}
```

But now we are getting more errors!

When we hover over the object we pass in to `makeInfiniteScroll` we see the following error:

```typescript
Property 'initialRows' is missing in type '{ key: string; fetchRows: () => Promise<{ id: number; name: string; }[]>; }' but required in type 'MakeInfiniteScrollParams'.
```

This is happening because we aren't passing in `initialRows`, so let's make it optional:

```typescript
type MakeInfiniteScrollParams = {
  key: string
  initialRows?: unknown[]
  fetchRows: () => Promise<unknown[]>
}
```

## Adding TRow
Now that we have all this stuff, we can start to see relationships between all the pieces.

We can add `TRow` to the type, and set `initialRows` to be an array of `TRow` and `fetchRows` to be a function that returns a `Promise` of `TRow[]`:

```typescript
type MakeInfiniteScrollParams<TRow> = {
  key: keyof string
  initialRows?: TRow[]
  fetchRows: () => Promise<TRow[]>
}
```

We are able to safely represent this in an object, since we're dealing with arrays.

Then in `makeInfiniteScroll` we pass `TRow` as a type argument and make sure to add it to the `params` argument:

```typescript
const makeInfiniteScroll = <TRow>(params: MakeInfiniteScrollParams<TRow>) => { ...
```

## Making Tests Pass
The initial rows test is now passing. Rows are getting inferred properly based on `name` and `id`.

To make sure that our test for the key is a property of the row is passing, we can check if `key` is a `keyof` `TRow`:

```typescript
type MakeInfiniteScrollParams<TRow> = {
  key: keyof TRow
  initialRows?: TRow[]
  fetchRows: () => Promise<TRow[]>
}
```

Now if we don't pass in a promise to `fetchRows`, it is going to throw an error. To fix this we can update it so `Promise` returns a `Promise<TRow[]>` or `TRow[]`:

```typescript
type MakeInfiniteScrollParams<TRow> = {
  key: keyof TRow
  initialRows?: TRow[]
  fetchRows: () => Promise<TRow[]> | TRow[]
}
```

## Transcript
0:00 The first thing that comes to mind is we're obviously going to need a type argument for makeInfiniteScroll. The question is what we should be expecting in that type. For now, let me just scaffold a couple of things. I'm going to say, "interface MakeInfiniteScrollParams."

0:17 I like extracting this out to an interface or a type. Let's go for a type, actually. MakeInfiniteScrollParams and just scaffold this here. We know that we have initialRows, which is probably going to be an array of something, and we have fetchRows. It looks like fetchRows is going to be a function. It doesn't actually take in any arguments, which is good. Let's say it just returns unknown.

044 In fact, I think it might be best if it returns a Promise unknown. We know that, basically, it's going to fetch something. We need to actually pass in a Promise here. I guess maybe we could do a maybe Promise. Anyway, we'll get to that.

0:59 We've got this unknown here. We can see that data.push...Type unknown must have a Symbol.iterator method that returns an iterator. What? It turns out the data.push expects it to be an array of something. Because we're spreading this in, we know that this is probably going to be an array of something, which makes sense because we're fetching more rows here.

1:25 We've now got this key here. Key doesn't exist on the params. Let's add that in just as a string, for now. Let's see if things have improved at all. Oh no. No, they really haven't. Why isn't this erroring? Oh yeah. Because we don't need to pass in the initial rows. This one can actually just be an optional here.

1:48 That's good. We've removed some errors, but this table, for instance, it's now just...fetchRows is returning Promise unknown. That's good. table here, getRows is returning an unknown array, which is going to be complaining down here. It's supposed to be an array of the things that you pass into initialRows.

2:10 Now we can see that we have a couple of unknowns here. We have this key string, which I'm just going to type as unknown as well. Now that we have all this stuff, we can start to see relationships between all the pieces. We can see that this type probably needs to have a T on it, like TRow, for instance, that represents all of the pieces here.

2:31 initialRows, it makes sense for that to be an array of TRow. fetchRows is also going to be an array of TRow. We can represent this pretty safely in an object here because we know we're going to be dealing in arrays. We know that TRow array is going to be there, and Promise TRow is going to be there.

2:50 Now we need to find some way of passing it into the MakeInfiniteScrollParams. We've got TRow here. From all of our pain that we've been through, we know that we can add TRow here, and it's going to be in InfiniteScroll there.

3:07 How are we doing now? We're getting pretty nice functionality here. We're getting getRows. We're actually passing this test down at the bottom. Our rows are now inferred properly based on name and id. If we add age, 23 there, let's say, then this is going to be added to this too, which is fantastic. This function is now inferring properly. Brilliant.

3:29 What's erroring at us now? We have a "Should ensure that key is one of the properties of the row." We know how to do this. We know that TRow, we can use keyof TRow to make sure that this key is one of those members.

3:45 Now, if we go down to the bottom here, we've got key id. We'll get id and name here. If we pass in age, it's going to yell at us. If we pass in name, it's going to work. Pass in id. It's going to work. That is fabulous. This is erroring properly because we don't have name on this particular object that we're inferring from.

4:04 What can we take from this? We know that we can pass in...There's multiple inference sites here, so the initialRows and the Promise TRow. This is a really, really neat one, the fact that you can infer from a Promise that's passed in.

4:19 I'm just wondering, if we don't pass in a Promise here...We have fetchRows. Let's just say that we return this, for instance. This is actually going to yell at us because it's expecting an async function here. This doesn't seem, to me, to make sense. We could say this returns a Promise TRow or TRow array here.

4:41 Now this will work because it doesn't need to return a Promise. It can return a Promise if it wants to, but it doesn't need to. This will work as an async or a sync function. There you go. A little bonus for you. This is pretty nice. I'm pretty happy with how this API turned out. Well done, if you found the solution.

# 2. Create a Function with a Dynamic Number of Arguments

[

github.com

https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/06-challenges/29.2-dynamic-function-arguments.problem.ts

](https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/06-challenges/29.2-dynamic-function-arguments.problem.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=5d312f83-0508-47e0-85e9-75537126b64f&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0201-create-a-function-with-a-dynamic-number-of-arguments-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=5d312f83-0508-47e0-85e9-75537126b64f&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0201-create-a-function-with-a-dynamic-number-of-arguments-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
Here is an `Events` interface:

```typescript
interface Events {
	click: {
		x: number;
		y: number;
	};
	focus: undefined;
}
```

This `sendEvent` function takes in an `event` of either `click` or `focus` as well as a set of arguments:

```typescript
export const sendEvent = (event: keyof Events, ...args: any[]) => {
	//Send the event somewhere
};
```

Currently the function works when `focus` is passed in.

However, when a `click` event is passed in we want to force the user to pass in an extra argument that corresponds to the shape seen in the `Events` interface:

```typescript
sendEvent("click", {
  x: 1,
  y: 2,
});
```

## Challenge
Your challenge is to add a generic to the `sendEvent` function that captures the result of the event.

You will need to use a conditional type to determine how to put the event inside of the `args`.

Ideally, the `args` would be an empty array if there is no payload, and an array with one member if there is a payload.

## Transcript
0:00 In this exercise, we're going to be creating a function with a dynamic number of arguments. This sendEvent function here basically takes in an event and then takes in a set of arguments.

0:11 Currently, what we're trying to get it to do is we've got this sendEvent and we want it to accept either click or focus which is working, so that's good. When we accept click, we want to force it to basically force you to pass in this extra argument which corresponds to the shape of this up here.

0:30 If it doesn't have an extra argument, if it's undefined, we don't want to force the user to go undefined here. We actually want to make them not have to pass that second argument. There which should force us not to pass an argument there.

0:44 This is a tricky one because we definitely need a generic in here because we're going to need to capture the result of event. Then we're going to probably need a conditional type, I think, in order to capture the result of, basically, capture the payload and work out how to put it inside the args.

1:04 These args need to either be, they need to be a certain length based on whether this has a payload or not because ideally the args would be an empty array if there's no payload, and they'd be an array with one member if there is a payload.

1:21 That should give you a sense of what we're trying to achieve. I think I might have given the game away a little bit there, but I'm going to leave that in. Good luck with this challenge. This is actually a really, really useful pattern. I've used this in a bunch of places. Good luck.

# Solution: Use a Tuple to Represent a Dynamic Number of Arguments

[

github.com

https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/06-challenges/29.2-dynamic-function-arguments.solution.ts

](https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/06-challenges/29.2-dynamic-function-arguments.solution.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=10ca36be-9d4e-44c4-9078-29ba39d325e5&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0202-create-a-function-with-a-dynamic-number-of-arguments-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=10ca36be-9d4e-44c4-9078-29ba39d325e5&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0202-create-a-function-with-a-dynamic-number-of-arguments-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
The first thing we need to do is capture the event and extract its type.

To do this, we'll add a generic with a type `TEventKey` that extends the `keyof events` to capture the event.

Then we can can put `TEventKey` into the event:

```typescript
export const sendEvent = <TEventKey extends keyof Events>(
	event: TEventKey,
	...args: any[]
) => {
	//Send the event somewhere
};
```

This allows us to capture the click event.

Now, let's focus on the `args`.

## Testing a Single Arg
For the time being we'll assume we have one argument, which we can get to by indexing into `Events` with the `TEventKey`:

```typescript
export const sendEvent = <TEventKey extends keyof Events>(
	event: TEventKey,
	// we no longer spread args
	args: Events[TEventKey]
) => {
	//Send the event somewhere
};
```

This would work if the `Event` interface only had a single argument.

However, as seen in the tests we now have an `Expected 2 arguments, but got 1` error even though a `focus` event is associated with an `undefined` arg.

Manually passing in `undefined` would work, but that's a bad API. We should be expected to pass nothing if the event doesn't have a payload.

## Supporting Dynamic Args
The first thing to do is revert back to using `...args`.

In order to support dynamic args, it needs to be either an Array or a Tuple type. This is where the conditional type comes in.

If `Events[TEventKey]` extends `undefined`, it should return an empty array. Otherwise, it will return a tuple with a member `Events[TEventKey]`:

```typescript
export const sendEvent = <TEventKey extends keyof Events>(
	event: TEventKey,
	...args: Events[TEventKey] extends undefined ? [] : [Events[TEventKey]]
) => {
	//Send the event somewhere
};
```

This may look kind of complicated, but it allows us to be really dynamic with the arguments we pass into our functions.

Now when we hover over `sendEvent("focus")` in the tests, the args are an empty array even though we can't see them there:

```typescript
// hovering shows
const sendEvent: <"focus">(event: "focus") => void
```

When hovering over the test with `"click"`, we can now see an `args_0` that matches the shape from the interface:

```typescript
// hovering over the "click" test
const sendEvent: <"click">(event: "click", args_0: {
	x: number;
	y: number;
}) => void
```

This works now, but we can make `args_0` look nicer by using a named tuple.

Adding `payload` to the `Events[TEventKey]` tuple tells TypeScript we want to call the result `payload`:

```typescript
// inside of sendEvent
...args: Events[TEventKey] extends undefined ? [] : [payload: Events[TEventKey]]
```

This pattern is super useful when you have dynamic functions that you don't want to express with function overloads, while still allowing you to be really specific with the arguments based on a generic that's passed in.

## Transcript
0:01 The first thing we need to do is capture this event here and work out a way to extract out the type that comes from this event. Let's do that first. We're going to say, TEventKey extends keyof Events. Now, we can put that into the event here. We've got TEventKey.

0:20 Now, sendEvent("click"), we've got this click being captured. That's good. Now these args, let's just say we've got one arg for now, and this arg is going to be Events TEventKey .

0:33 This gets us somewhere, because now what's going to happen is we've got click and we're getting this arg inside here. The arg now is going into basically indexing into Events using TEventKey and pulling out this object. Except this doesn't work really, because we need a dynamic number of arguments. It expects two arguments, but got one.

0:54 It's expecting us to pass in undefined here, which is super gross as an API. What we need to do is to revert this a little bit and say args is this. Now, args needs to be an array type or it can be a tuple type. What this means is we have access to Events TEventKey and we can say, if this extends undefined, then what we're going to do is return an empty array.

1:23 This means the args will basically be an empty array in that slot. Otherwise, we're going to return a tuple with a member and it's going to be Events TEventKey just here. This may look mad. What we're checking here is we have access to the x and y here. X, y number just there.

1:48 We can see that if that extends undefined, conditional check, checking if it is assignable to undefined, then we return this. Otherwise, we return a tuple where the first member is this Events TEventKey . Super nice.

2:04 This sendEvent("focus"), in these args, even though you can't see them in there, the args are actually an empty array being spread into the argument. You end up with no extra arguments. Otherwise, you end up with these args\_ inside here. You see that? It automatically generates you a name, which is cool.

2:26 If we were to imagine, we put three of these into Events TEventKey and then let's say, you just got to pass in a string at the end. Now, it's expecting you to pass in x and y again. The first, x and y, then the second x and y, and the third is a string. Really cool. This allows you to be really dynamic with the arguments that you're passing into your functions.

2:49 There's one more thing too, which is this args\_0 thing isn't very pretty. Ideally what we should do here is we should somehow find a way to make this nicer looking. If we could change that to payload or something, I think it would read a lot easier.

3:02 Well, we can use a named tuple in here and this named tuple doesn't do anything in TypeScript. One named tuple is assignable to another named tuple. We can call this anything we want, but it just gives TypeScript a hint of what we want to call this argument. That payload ends up being sucked into the parameters of that new function and it all works out beautifully.

3:29 This pattern is super duper useful when you have really dynamic functions that you don't want to express with function overloads and this lets you be really specific with the arguments based on a generic that's passed in.

# 3. Create a Pick Function

[

github.com

https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/06-challenges/29.5-pick.problem.ts

](https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/06-challenges/29.5-pick.problem.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=75ded987-4641-42a4-bad3-a01c281d0f16&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0301-create-a-pick-function-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=75ded987-4641-42a4-bad3-a01c281d0f16&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0301-create-a-pick-function-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
Let's build a classic `pick` function.

The function takes in an object and an array of keys, then returns the keys that you expect at both the runtime level and the type level:

```typescript
const pick = (obj: {}, picked: string[]) => {
  return picked.reduce((acc, key) => {
    acc[key] = obj[key]
    return acc
  }, {})
}
```

As seen in this test, we should get back `a` and `b` as `number`s instead of an empty object:

```typescript
it("Should pick the keys from the object", () => {
  const result = pick(
    {
      a: 1,
      b: 2,
      c: 3,
    },
    ["a", "b"]
  )

  expect(result).toEqual({ a: 1, b: 2 })

  type test = Expect<Equal<typeof result, { a: number; b: number }>>
})
```

There's also test to make sure that you don't pass in something that isn't on the object.

In this case `d` shouldn't be able to be passed here because it's not a member of this object:

```typescript
it("Should not allow you to pass keys which do not exist in the object", () => {
  pick(
    {
      a: 1,
      b: 2,
      c: 3,
    },
    [
      "a",
      "b",
      // @ts-expect-error
      "d",
    ]
  )
})
```

## Challenge
Your challenge is to fix the `pick` function so the tests pass as expected.

If you feel stuck, revisit the lessons about the `reduce` function, capturing certain things in generics, and determining how many generic arguments are needed.

## Transcript
0:00 In this exercise, we're building a classic pick function. This pick function basically takes in an object and then takes in an array of keys from that object. What it's going to do is you're supposed to take this pick function, apply it to an object, say the keys you want, and you should get back the keys that you expect.

0:20 Not only on the runtime level, which should be working right now but also on the type level. On the type level, you should be getting an A number and B number, but instead, we're just getting an empty object back.

0:33 There's also another test down here to make sure that you don't pass in something that isn't on the object. D shouldn't be able to be passed here because it's not a member of this object here. That's your challenge. I think you have everything you need. Remember everything that we have about the reduce function and how annoying it is.

0:55 You're definitely going to need at least one generic here. Remember about, I don't know, how to capture certain things in generic arguments and how many generic arguments you need. I think that's it. Good luck.

# Solution: Extracting Object Properties with Reduce and Generics

[

github.com

https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/06-challenges/29.5-pick.solution.ts

](https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/06-challenges/29.5-pick.solution.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=7d3f8815-e9c8-49d0-ad2e-f489111d4e00&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0302-create-a-pick-function-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=7d3f8815-e9c8-49d0-ad2e-f489111d4e00&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0302-create-a-pick-function-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
Here's the starting point of the `pick` function:

```typescript
const pick = (obj: {}, picked: string[]) => {
  return picked.reduce((acc, key) => {
    acc[key] = obj[key]
    return acc
  }, {})
}
```

Since we need to capture the type of the object, we'll start by adding a `TObj` type argument and assigning it to `obj`:

```typescript
const pick = <TObj>(obj: TObj, picked: string[]) => {
  return picked.reduce((acc, key) => {
    acc[key] = obj[key]
    return acc
  }, {})
}
```

Down in the tests, we're capturing `a`, `b`, and `c` keys with number values. We also should be able to pass in `b`, but not `d`:

```typescript
it("Should not allow you to pass keys which do not exist in the object", () => {
  pick(
    {
      a: 1,
      b: 2,
      c: 3,
    },
    [
      "a",
      "b",
      // @ts-expect-error
      "d",
    ]
  )
})
```

This means that we need to set our `picked` array to be `keyof TObj[]`:

```typescript
const pick = <TObj>(obj: TObj, picked: keyof TObj) => { ...
```

But with this change, we get a new error:

```typescript
Argument of type 'string[]' is not assignable to parameter of type 'keyof TObj[]'
```

This is annoying because TypeScript thinks we're saying "I want an array of `keyof TObj`", but what we really want is to call `keyof` on an array of `TObj`.

It's an important distinction!

The way to get around it is just to add `Array`:

```javascript
const pick = <TObj>(obj: TObj, picked: Array<keyof TObj>) => {
  return picked.reduce((acc, key) => {
    acc[key] = obj[key]
    return acc
  }, {})
}
```

Now we aren't getting that error anymore!

The next problem is that our return type is still an empty object.

Let's check out the error inside of our `reduce`:

```typescript
Type 'keyof TObj' cannot be used to index type '{}'.
```

The problem is that `reduce` picks up its type argument from whatever is passed into its accumulator– in this case, an empty object `{}`.

This is when we need to decide what type we're returning, because it is going to be different than the object we passed in (which is currently the only thing being inferred).

We can't use the `Pick` utility type and return `Pick<TObj, TPicked>` because we don't have a `TPicked` type argument.

We also can't say `typeof picked` or something like that because it just extracts out `keyof TObj`:

```typescript
const pick = <TObj>(
  obj: TObj,
  picked: Array<keyof TObj>
): Pick<TObj, typeof picked> => {
  ...
```

We need to add a second generic.

## Adding the TPicked Type Argument
Let's add `TPicked extends Array<keyof TObj>` and assign `picked` to it:

```typescript
const pick = <TObj, TPicked extends Array<keyof TObj>>(
  obj: TObj,
  picked: TPicked
) => {
  return picked.reduce((acc, key) => {
    acc[key] = obj[key]
    return acc
  }, {})
}
```

Now let's investigate our first test:

```typescript
it("Should pick the keys from the object", () => {
  const result = pick(
    {
      a: 1,
      b: 2,
      c: 3,
    },
    ["a", "b"]
  )

  expect(result).toEqual({ a: 1, b: 2 })

  type test = Expect<Equal<typeof result, { a: number; b: number }>>
})
```

When we call `pick` in our first test, we are getting the object with the `a`, `b`, and `c` keys, all of type `number`.

In the second type argument `TPicked`, we are getting an array of `"a"` or `"b"`.

That's fine, but we have to do some extraction to get what we need from it.

Ideally what we would be able to say `Pick<TObj, TPicked>` and then say `TPicked` in that slot.

Currently to extract we have to do `TPicked[number]`:

```typescript
const pick = <TObj, TPicked extends Array<keyof TObj>>(
  obj: TObj,
  picked: TPicked
): Pick<TObj, TPicked[number]> => {
  return picked.reduce((acc, key) => {
    acc[key] = obj[key]
    return acc
  }, {})
}
```

Now the `result` in our test is being typed how we want:

```typescript
// ON HOVER over `result`
const result: Pick<
  {
    a: number
    b: number
    c: number
  },
  "a" | "b"
>
```

But we're actually having to extract out of the `("a" | "b")[]` array:

```typescript
// ON HOVER over the call to pick in test 1
const pick: <{
    a: number;
    b: number;
    c: number;
}, ("a" | "b")[]>(obj: {
    a: number;
    b: number;
    c: number;
}, picked: ("a" | "b")[]) => Pick<{
    a: number;
    b: number;
    c: number;
}, "a" | "b">
```

It would be great if it instead inferred it instead of us having to do the extra `[number]` extraction on the `TPicked` type.

To make this happen we'll move the `Array` wrapper in the `TPicked` type argument over to the `picked` argument.

At this point, in `Pick` we can remove the `TPicked[number]` and just say `TPicked`:

```typescript
const pick = <TObj, TPicked extends keyof TObj>(
  obj: TObj,
  picked: Array<TPicked>
): Pick<TObj, TPicked> => { ...
```

When we check the call to `pick` in our test we'll see that it's now just going to be `"a"` or `"b"`:

```typescript
// ON HOVER over the call to pick in test 1
const pick: <{
    a: number;
    b: number;
    c: number;
}, "a" | "b">(obj: {
  ...
```

We're getting closer, but there's an error with `picked.reduce`:

```typescript
Type '{}' is not assignable to type 'Pick<TObj, TPicked>'.
```

This is happening because `.reduce` is currently inferring an empty object.

Instead we want it to infer `Pick<TObj, TPicked>` inside of its accumulator.

We can't just assign the `acc` argument to be `Pick<TObj, TPicked>` because TypeScript is focusing on the initial value of `{}` that we gave it.

What we need to do is coerce the accumulator to be `Pick<TObj, TPicked>` by using an `as`:

```typescript
const pick = <TObj, TPicked extends keyof TObj>(
  obj: TObj,
  picked: Array<TPicked>
): Pick<TObj, TPicked> => {
  return picked.reduce((acc, key) => {
    acc[key] = obj[key]
    return acc
  }, {} as Pick<TObj, TPicked>)
}
```

The empty object is going to be the `Pick<TObj, TPicked>`, so now in the accumulator we are saying that the `acc[key]`, which is `keyof TPicked` or `keyof TObj`, is the `obj[key]`.

With this change we no longer need the return type in our `pick` function definition since `reduce` now has `Pick<TObj, TPicked>` in its type argument:

```typescript
// ON HOVER over .reduce
(method) Array<TPicked>.reduce<Pick<TObj, TPicked>>
```

Now when we hover over `result` in our test, we see that it's nicely using the `Pick` utility type:

```typescript
const result: Pick<
  {
    a: number
    b: number
    c: number
  },
  "a" | "b"
>
```

The tests are passing, and `as` is working as expected!

## Transcript
0:01 We know that we're definitely going to need to capture the type of the object. That is for sure. We've got TObj here. Let's say object is TObj there. Now what we've got inside pick is we're capturing a number, b number, c number, which is perfectly reasonable.

0:19 Then we've got this picked function, which we need to be the type of those keys. We should be able to pass in a, b, but not d. That means we need to put in key of TObj there.

0:36 Oh, key of TObj. This is a classic one. This error is so annoying because it looks like we're saying, "I want an array of keyof TObj." In fact, what you end up with is it calls keyof on an array of TObj. What? That's really confusing. You end up with "Argument of type string array is not assignable to this."

1:03 What it actually wants you to pass in is things like concat and copyWithin and entries, all that stuff. Horrible, horrible syntactical error. The way to get around it is just to use the Array thing instead.

1:16 Now this will work. You'll get a, b, and c here. Isn't it so nice when the autocomplete just does exactly what you want it to do? Then d is going to be erroring for us properly there. Beautiful. That's pretty good.

1:30 Now, this result type, what are we getting back? We're still getting back an empty object. Oh no. reduce here, we've run into this error before, where inside this reduce, it picks up its type arguments from the thing that you pass in here. We've got this horrible little bit.

1:52 One thing we could do is we could say actually, we need to decide what type we're returning here because the object that we're returning is going to be different than the object we passed in. Currently, the only thing that we've inferred is the object that we're passing in.

2:10 We could return TObj, but then we're probably going to need to use the Pick utility type here. We return Pick TObj. Then what do we put inside here? We can't say, "typeof picked" or something like that, because that just extracts out the keyof TObj thing that we have there.

2:29 We actually need a second generic here, which is the things that we're going to pick from the object. Let's stick that here. Let's say, "TPicked extends Array," or, in fact, it's going to be...There's actually a really interesting thing here. We could say, "Array keyof TObj" here. We could put in TPicked.

2:56 Now we say, "Pick TObj typeof picked." I'm going to ignore this error for now. In fact, I'll just remove this for a bit because I actually want to investigate what gets picked up when you use an array inside here. My spidey senses are tingling. I'm thinking that might not be the best thing to do.

3:18 What we get here is we get a number, b number, c number in the first type argument, so in TObj, but then in the second type argument, we get an array of a or b. This is fine, but we've actually got to do a bit of extraction there to get out the thing that we want.

3:34 We don't actually care that there's an array wrapping them. All we want to extract is a or b. That's ideally what we would like in that slot. What we want to do is we want to say, "Pick TObj," and then say "TPicked." Currently, we have to do TPicked number. Isn't that so weird?

3:55 Now the result is actually typed as we want it to be. It's picking it properly, but we're actually having to extract out this array when it would be great if it just inferred it. We're having to do this extra little layer.

4:07 What we can do is we can actually say let's remove this array from the outside. We're saying, "TPicked" here. Now we're going to put the array here. Now, TPicked number, I don't need that number anymore because TPicked is no longer an array. It's actually going to be just a or b. Isn't that sweet? Super-nice.

4:30 Now then we've got an issue with the reduce. Let me just check that it's working. result now, result should...Whoops. What have I done there? result.a, and we've got b. If I remove b from the equation, then b disappears. We're just left with a.

4:47 If I add d, which is a boolean -- sorry, 1 -- then we can pick here. We can pick d. Then we get d boolean. Brilliant stuff. That's fabulous. Now our tests are still passing.

5:04 How do we make this reduce happy? Why is it moaning? It's moaning because type empty object is not assignable to type Pick TObj TPicked. The reason is that reduce is inferring this empty object. What we want to do is make it, basically, infer this inside its accumulator. This accumulator is still an empty object.

5:29 We can do that by doing this. Well, no. We can't do that by doing this because it's actually not caring about the accumulator. It's just caring about this still. I think what we need to do is do an as here.

5:47 This as, what it's doing is it's basically saying this empty object is going to be the Pick TObj TPicked. In the accumulator, we're basically saying accumulator key, which is keyof TPicked or keyof the TObj, is the object T key. We can't say, "acc.whatever = cool," because whatever is not assignable to, basically, Pick TObj TPicked.

6:19 This, I think, is the best way around it. We don't actually need this return type anymore because pick.reduce now has Pick TObj TPicked in its type argument. We can actually remove this if we want to. Goodbye. Done. picked Array TPicked. This is still looking good.

6:39 The result of pick is now still exactly the same, pick, blah, blah, blah, blah, blah. That's super-duper nice. What we end up with is exactly what we need. We've got our result, which is just using the pick utility type.

6:52 It's quite nice that it shows you this. It would be nice if it just showed you the resolved output, but this is fine, I think. We end up with the test are passing. We've got the as working too. Nice.

7:05 The lesson here, I think, is to make sure you're using two generics. Make sure that the thing in your type argument is the lowest possible level. This TPicked here should be just a or b instead of an array of a or b which you've then got to extract out.

7:22 That just helps the compiler a little bit. It makes sure that you're not doing extra work for the compiler. Also, the readability of these type arguments is really, really nice. We do need to extract the entire object here because we care about the type that it results in.

7:38 For instance, we can pass strings into here. Then a would be typed as a string. result.a is going to be a string. That's why we need to capture the entire object there instead of just capturing the keys like we've seen before. There we go. Nice challenge. Well done.

# 4. Create a Form Validation Library

[

github.com

https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/06-challenges/30-form-validator.problem.ts

](https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/06-challenges/30-form-validator.problem.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=b0a6c871-499e-490d-bbdf-2dd65c4f544b&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0401-create-a-form-validation-library-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=b0a6c871-499e-490d-bbdf-2dd65c4f544b&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0401-create-a-form-validation-library-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
In this exercise, we're creating a function called `makeFormValidatorFactory` which returns another function called `createFormValidator`, which finally returns another function `validateUser`:

```typescript
const makeFormValidatorFactory = (validators: unknown) => (config: unknown) => {
  return (values: unknown) => {
    const errors = {} as any

    for (const key in config) {
      for (const validator of config[key]) {
        const error = validators[validator](values[key])
        if (error) {
          errors[key] = error
          break
        }
      }
    }

    return errors
  }
}
```

We also have a constant called `createFormValidator` whose value is the first call to `makeFormValidatorFactory`, which returns another factory function.

Inside the arguments of the function call, we pass an object where we can specify various validation rules.

The rules `required`, `minLength`, and `email` are specified:

```typescript
const createFormValidator = makeFormValidatorFactory({
  required: (value) => {
    if (value === "") {
      return "Required"
    }
  },
  minLength: (value) => {
    if (value.length < 5) {
      return "Minimum length is 5"
    }
  },
  email: (value) => {
    if (!value.includes("@")) {
      return "Invalid email"
    }
  },
})
```

The constant `validateUser` creates a validator out of these rules by making a call to `createFormValidator` and passing in an object where we specify the validation rules for various properties:

```typescript
const validateUser = createFormValidator({
  id: ["required"],
  username: ["required", "minLength"],
  email: ["required", "email"],
})
```

You can see that each property's value is an array of strings that match the keys of the object that we passed to `makeFormValidatorFactory`.

Let's check out our tests and see what we need to do to make them pass:

```typescript
it("Should properly validate a user", () => {
  const errors = validateUser({
    id: "1",
    username: "john",
    email: "Blah",
  })

  expect(errors).toEqual({
    username: "Minimum length is 5",
    email: "Invalid email",
  })

  type test = Expect<
    Equal<
      typeof errors,
      {
        id: string | undefined
        username: string | undefined
        email: string | undefined
      }
    >
  >
})
```

Here we are expecting the `errors` object to have the proper messages of the correct type, but as seen in `makeFormValidatorFactory`, the `errors` is currently of type `any`.

Here we are expecting the `errors` object to have the proper messages of the correct type, but as seen in `makeFormValidatorFactory`, the `errors` is currently of type `any`.

```typescript
it("Should not allow you to specify a validator that does not exist", () => {
  createFormValidator({
    // @ts-expect-error
    id: ["i-do-not-exist"],
  })
})
```

Then in our last test, we expect the validator to have values based on the type specified in the validation rules, but `values` is currently typed `unknown`.

```typescript
it("Should not allow you to validate an object property that does not exist", () => {
  const validator = createFormValidator({
    id: ["required"],
  })

  validator({
    // @ts-expect-error
    name: "123",
  })
})
```

## Challenge
Your challenge is to make the appropriate updates so all the tests pass without errors!

## Transcript
0:00 In this exercise, we're creating a function which returns another function, which returns another function. We have a createFormValidator function here, or rather makeFormValidatorFactory, which returns essentially another factory. What this does is we can specify various validation rules here.

0:20 We can specify required, min length, and email on here. Then we create a validator out of those rules and we specify, ID is going to be on this object that we're validating, username, and email, and we pass the validation rules as strings to this piece here.

0:38 There's various things that we can do here. We can say we want to validate a user. We pass it the ID, username, and email, which should be inferred from here, ID, username, and email. We're saying the errors that it produces should have username, minimum length is five, which we're getting from here, and email is an invalid email, wherever it is. Here we go.

1:00 Then, the errors type II is currently typed as any but type of errors should be equal to an object where ID is string or undefined, username is string or undefined. You get the idea.

1:13 Then you can't specify a validator that doesn't exist, so this one should be giving you errors if you don't pass in required or something like that. Then the validator that you produce here shouldn't be values unknown. It should be values based on this type that's here.

1:31 There's a lot to do here. We have some generics we need to capture, for sure, we need to decide what shapes those generics should be, whether we're going to capture the whole object or just the keys. We also need to make sure everything here is strongly typed.

1:46 This value here, it should only ever be a string because we're dealing with web form values, let's say, which are only strings. I think that's all the information you need. Probably less than you want but what you need. Good luck.

# Solution: Add Strong Typing and Proper Error Handling to a Form Validator

[

github.com

https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/06-challenges/30-form-validator.solution.ts

](https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/06-challenges/30-form-validator.solution.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=b475c2f4-4df8-4dd4-afcb-3e106494a771&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0402-create-a-form-validation-library-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=b475c2f4-4df8-4dd4-afcb-3e106494a771&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0402-create-a-form-validation-library-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
The first thing we need to do is capture generics in type arguments for `required`, `min-length`, and `email`.

```typescript
const createFormValidator = makeFormValidatorFactory({
  required: (value) => {
    if (value === "") {
      return "Required"
    }
  },
  minLength: (value) => {
    if (value.length < 5) {
      return "Minimum length is 5"
    }
  },
  email: (value) => {
    if (!value.includes("@")) {
      return "Invalid email"
    }
  },
})
```

The results of these functions are not generic.

They're basically either going to be `string` or nothing, which is `void` in TypeScript.

We know we need to capture these because we're going to be using them in the call to the `createFormValidator` function and they need to be type safe:

```typescript
const validateUser = createFormValidator({
  id: ["required"],
  username: ["required", "minLength"],
  email: ["required", "email"],
})
```

There are a couple of choices for how to capture them.

We can either capture the entire object or just the keys.

## Capture the Entire Object
Let's try capturing the entire object.

In the first function definition of `makeFormValidatorFactory`, we're going to add a `TValidators` type argument:

```typescript
const makeFormValidatorFactory =
  <TValidators extends Record<string, (value: string) => string | void>>(
    validators: TValidators
  ) =>
(config: unknown) => {
```

Then, we can hover over it to see what we have in the call to `makeFormValidatorFactory`:

```typescript
// hovering over the call to makeFormValidatorFactory
const makeFormValidatorFactory: <{
  required: (value: string) => "Required" | undefined;
  minLength: (value: string) => "Minimum length is 5" | undefined;
  email: (value: string) => "Invalid email" | undefined;
}>
```

In `required` we see that we have `value` that is a `string` and it's returning the literal `Required` or `undefined`.

The problem with this is that there is a lot of stuff there that we don't care about. All we need is `required`, `minLength`, and `email`.

Because we don't need everything in the entire object, we will capture just the keys instead.

## Capture the Keys
In `makeFormValidatorFactory`, we're going to change `TValidators` to `TValidatorKeys`:

```typescript
const makeFormValidatorFactory =
  <TValidatorKeys extends string>(
    validators: Record<TValidatorKeys, (value: string) => string | void>
  ) =>
  (config: unknown) => {
    ...
  }
```

We see that we have `TValidatorKeys` that `extends string` in the type argument.

Then, we assign the `validators` argument to be a `Record` of `TValidatorKeys` and a function that takes a `string` and returns a `string` or `void`. This acts like a description of the validators.

Now, let's check out the type argument in the call to `makeFormValidatorFactory`:

```typescript
// hovering over the call to makeFormValidatorFactory
const makeFormValidatorFactory: <"required" | "minLength" | "email">(validators: Record<"required" | "minLength" | "email", (value: string) => string | void>) => (config: unknown) => (values: unknown) => any
```

There are the keys that we want. We see `required`, `minLength`, or `email`, and everything is still strongly typed.

## Strongly Type validateUser
Currently, in `validateUsers` its `values` argument is `unknown` and it returns `any`.

We're going to need to capture `id`, `username` and `email` as keys again:

```typescript
const validateUser = createFormValidator({
  id: ["required"],
  username: ["required", "minLength"],
  email: ["required", "email"],
})
```

To do this, we'll go back to `makeFormValidatorFactory` and add a new type argument `TObjKeys` that `extends string` to the second function definition:

```typescript
const makeFormValidatorFactory =
  <TValidatorKeys extends string>(
    validators: Record<TValidatorKeys, (value: string) => string | void>
  ) =>
  <TObjKeys extends string>(
    config: Record<TObjKeys, Array<TValidatorKeys>>
  ) => {
```

Notice that we also assigned the `config` argument to a `Record` of `TObjKeys` and an `Array` of `TValidatorKeys`.

Now in our `createFormValidator` call, we see that we have `id`, `username`, or `email` as the type argument.

The `config` is a `Record` of `id`, `username`, or `email`, and each of those is an `Array` of `required`, `minLength`, or `email`:

```typescript
// hovering over the call to createFormValidator
const createFormValidator: <"email" | "id" | "username">(config: Record<"email" | "id" | "username", ("required" | "minLength" | "email")[]>) => (values: unknown) => any
```

If we were to add any additional validators, we'll immediately get autocomplete for them in the `validateUser` `Record` arrays. So cool!

## Strongly Type the Values
In our tests, the `errors` from the result of a call to `validateUser` are not being properly inferred:

```typescript
/*
const errors: any
*/
it("Should properly validate a user", () => {
  const errors = validateUser({
    id: "1",
    username: "john",
    email: "Blah",
  })

  ...
}
```

There is also still an error down in the last test where the validator function is expecting you to only be able to call it with an `id`. However, this `validator` is still `values: unknown`:

```typescript
it("Should not allow you to validate an object property that does not exist", () => {
  const validator = createFormValidator({
    id: ["required"],
  })

  // const validator: (values: unknown) => any
  validator({
    // @ts-expect-error
    name: "123",
  })
})
```

Luckily this one is straightforward to fix.

Currently we are assigning `values` to a type of `unknown` in the return function of `makeFormValidatorFactory`.

We can change that to `Record<TObjKeys, string>`:

```typescript
const makeFormValidatorFactory =
  <TValidatorKeys extends string>(
    validators: Record<TValidatorKeys, (value: string) => string | void>
  ) =>
  <TObjKeys extends string>(config: Record<TObjKeys, Array<TValidatorKeys>>) => {
    return (values: Record<TObjKeys, string>) => {
      ...
    }
  }
```

The `TObjKeys`, are going to be the things that we add into the argument of the `createFormValidator` function call.

This means that we have to pass the same keys into `validator` that get passed into `createFormValidator`.

If they aren't the same, TypeScript gives us this error:

```dpr
Argument of type '{ name: string; }' is not assignable to parameter of type 'Record<"id", string>'.
```

## Shaping the Errors
The errors are not in the right shape yet.

This is because we're doing a little hack inside the `makeFormValidatorFactory` function where we are saying that `errors` will be `{} as any`:

```typescript
const makeFormValidatorFactory =
  <TValidatorKeys extends string>(
    validators: Record<TValidatorKeys, (value: string) => string | void>
  ) =>
  <TObjKeys extends string>(
    config: Record<TObjKeys, Array<TValidatorKeys>>
  ) => {
    return (values: Record<TObjKeys, string>) => {
      const errors = {} as any

      for (const key in config) {
        for (const validator of config[key]) {
          const error = validators[validator](values[key])
          if (error) {
            errors[key] = error
            break
          }
        }
      }

      return errors
    }
  }
```

Ideally it should look like the `errors` object that we are expecting where each key should either be a `string` or be `undefined`:

```typescript
type test = Expect<
  Equal<
    typeof errors,
    {
      id: string | undefined
      username: string | undefined
      email: string | undefined
    }
  >
>
```

To fix this we can follow the same pattern that we've been following so far, but apply it to this type.

We will say that `errors` is an empty object as a `Record` of `TObjKeys` and `string | undefined`:

```typescript
const errors = {} as Record<TObjKeys, string | undefined>
```

We have to use this syntax because when `errors` is defined, the empty object can't be `Record<TObjKeys, string | undefined>`, but we will be building out the object as we go through the loop.

With this change in place, the `errors` are exactly how we want them:

```typescript
// hovering over the errors constant
const errors: Record<"email" | "id" | "username", string | undefined>
```

## Optional Cleanup Step
Optionally, you can clean up the `makeFormValidatorFactory` function a little bit by extracting the `validators` `Record` into a key that lives inside a `utils` folder. This would make it available for other people to extend or use in abstractions they want to create.

But as far as this challenge goes, there are no more errors!

## Transcript
0:00 Let's rock and roll. I'm quite excited about this one. We have some generics we need to capture in type arguments. We need to capture required, minLength, and email. The results of these functions are not generic. They're basically either going to be string or void, is what we're returning. We can either return Required, or we can return nothing, which is void in TypeScript.

0:24 We need to capture required, minLength, and email. Let's do that. I know we need to capture those because we need to make these ones type-safe afterwards. Really important to capture them. We've got then TValidator.

0:38 I have a choice. I can either capture the entire object, or I can capture just the keys. In this case, because the entire object is not generic, I just want to capture the keys, I think, but let me show you what it looks like to capture the whole object.

0:51 TValidators extends. Then I'm going to make it a Record string and then a function where it returns string or void. Then this validators is going to jump in there. This is giving me an error. Why is it giving me an error? Type value any Required or undefined is not assignable to type no parameters string void. I've missed out this value, any.

1:18 I need to basically say this value is going to be a string here. What we get then is in this slot, we get required is value string to...Oh, it's actually capturing the literal type there. I wasn't expecting that.

1:36 The issue I'm having with this is there's a lot of stuff that's inside the type argument that doesn't need to be there. Really, all we need in here is required, minLength, and email because all of this stuff, we actually don't care about the result of. What I'm going to change this to is TValidatorsKeys extends a string. string, there we go.

1:59 Then validators is going to be a record of TValidator keys. Then this stuff in here is just going to be the description of the validators. We've got a Record TValidatorKeys. value string goes to string or void.

2:16 Now, inside here, in the type argument, we're just getting required or minLength or email. Very good. Everything here is still strongly typed. Great. Now, validateUser createFormValidator config unknown. We need to strongly type this.

2:30 We're going to need to capture some stuff from here too. We're going to need to capture id, username, and email. Same as we had before. We can either capture this as an object or just the keys. I think I'm going to do the keys.

2:43 I'm going to say TObjKeys extends string. Then config is going to be a Record of TObjKeys. Then each member of that is going to be an array of TValidatorKeys. Whoa. Now what we have is we now have -- wow -- email, id, username. Then config is a record of email, id, and username. Each one is an array of required, minLength, or email.

3:16 That means I'm going to get autocomplete in this slot here. Super-duper nice. If I add a new one, if I say, "newValidator," for instance, which is just going to always return void, then this gets added here, newValidator. So pretty. Lovely, lovely, lovely.

3:34 Now though, these errors are not being properly inferred. This error down here is still breaking for us. This validator function, it's expecting you to only be able to call it with an id here. This validator is still values unknown.

3:50 Where's the unknown? Here it is, values unknown. This now needs to be a Record of TObjKeys string. The TObjKeys, that's going to be the things that we add into this createFormValidator function. Then that gets put into validateUser.

4:09 Now you have to pass in the thing that you specify when you create the form validator. This will work, but this will not work -- blah, blah, blah, blah, blah, blah -- until we add name required here. So nice. No type annotations, but we're still getting this beautiful, beautiful inference.

4:30 We're not getting the errors in the right shape though, yet. This errors any is still being typed there. That's because, inside this function, we're doing a little bit of a hack. We're saying this errors is going to be an empty object as any.

4:45 The reason we're doing that is because...I mean, I guess we could do this. Type Extract TObjKeys string. Let me give this a go. The type that we want to give it is going to be, basically, this type down here. For each key in the object, we want it to be either string or undefined.

5:05 We can say, "as Record TObjKeys string undefined." Ooh. That seemed to work. The reason we have to use as there is if we do this...Is this going to work? No, it's not going to work because type empty object is not assignable to that type.

5:23 We need to do an as because, in the stage down here, we actually build the object out. Even though the object is empty at this point, by the end here, it will be a fully fleshed-out thing, which is really good.

5:39 This, I think, means that the errors here are exactly what we want them to be. If we add a new one here -- we say, "wow required" -- then we have to pass that into here. Then we can even say...Oh yeah. typeof errors. Type does not satisfy the constraint because we've now got an extra addition into the errors. Fantabulous. That is so good.

6:02 I think then there's still a little bit of stuff to clean up here. Optionally, you could clean up this validators and extract this out into a key here. Probably this is going to live in like a utils folder in your app or going to be its own package.

6:18 You'd probably want to extract this out, basically so it's available for other people to extend or use in abstractions they want to create, but I'm pretty happy with how this turned out. This is just gorgeous.

# 5. Improve a Fetch Function to Handle Missing Type Arguments

[

github.com

https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/06-challenges/32-data-fetcher-with-warning.problem.ts

](https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/06-challenges/32-data-fetcher-with-warning.problem.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=16035b71-6291-4c91-98d6-9d9030bf063f&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0501-improve-a-fetch-function-to-handle-missing-type-arguments-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=16035b71-6291-4c91-98d6-9d9030bf063f&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0501-improve-a-fetch-function-to-handle-missing-type-arguments-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
Here is an async function `fetchData` that takes in a type argument of `TResult` and a real argument of `url: string`, and then returns a `Promise<TResult>`:

```typescript
const fetchData = async <TResult>(url: string): Promise<TResult> => {
  const data = await fetch(url).then((response) => response.json())
  return data
}
```

It should be similar to any fetch wrapper that you've seen before.

For this exercise, when calling `fetchData` you'll pass in `{ name: string }` and you get back `{ name: string }` after awaiting it.

Then, [`data.name`](http://data.name) should equal `"Luke Skywalker"`:

```typescript
it("Should fetch data from an API", async () => {
  const data = await fetchData<{ name: string }>(
    "https://swapi.dev/api/people/1"
  )
  expect(data.name).toEqual("Luke Skywalker")

  type tests = [Expect<Equal<typeof data, { name: string }>>]
})
```

Currently, this data is coming back as `unknown`, but it would be great if we had an error message saying `"You must pass a type argument to fetchData"`:

```typescript
it("Should force you to add a type annotation with a helpful error message", async () => {
  const data = await fetchData("https://swapi.dev/api/people/1")

  type tests = [
    Expect<Equal<typeof data, "You must pass a type argument to fetchData">>
  ]
})
```

## Challenge
Your challenge is to find a way to make it so that if the user doesn't pass a type argument to `fetchData`, the `typeof data` would equal `"You must pass a type argument to fetchData"`.

The solution is simpler than you expect!

## Transcript
0:00 This is a fun little exercise. We have a fetchData function, which is an async function which takes in a type argument of T results, a real argument of URL string, and then returns promise T results. Very, very similar to any fetch wrapper that you've seen before.

0:16 FetchData here, basically, you're passing name
string, and you get back name string after awaiting it. Then [data.name](http://data.name) =
"Luke Skywalker." But we want to make this API pretty bulletproof
because currently, this data is coming back as unknown, which is fine,
but we would love to have a error message here saying how to get it not
unknown.

0:41 Because one thing you could do is just pass a name string here, for instance, and this would be fine, but it would be great if we could have a more idiomatic way to do it and have a way that was consistent across the whole codebase.

0:55 I would like you to find a way where if the user doesn't pass a type argument to fetchData, I want type of data to equal "you must pass a type argument to fetchData." Nasty one. This is an interesting little challenge. You won't need to do anything too fancy here. The solution is simpler than you expect. I'll leave that with you. Good luck.

# Solution: Modify a Generic Type Default for Improved Error Messages

[

github.com

https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/06-challenges/32-data-fetcher-with-warning.solution.ts

](https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/06-challenges/32-data-fetcher-with-warning.solution.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=387d0dca-023d-4a54-8328-1540a8c75f7d&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0502-improve-a-fetch-function-to-handle-missing-type-arguments-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=387d0dca-023d-4a54-8328-1540a8c75f7d&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0502-improve-a-fetch-function-to-handle-missing-type-arguments-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
This solution doesn't involve any complex conditional types, or odd mapping. All it requires is a basic understanding of how type arguments work in TypeScript.

When you don't pass a type argument, it gets inferred as `unknown`.

This means that `fetchData` without a type argument returns a `Promise` with `unknown`, which is why the call to `fetchData` in our second test ends up as `const data: unknown`:

```typescript
it("Should force you to add a type annotation with a helpful error message", async () => {
  // const data: unknown
  const data = await fetchData("https://swapi.dev/api/people/1")

  type tests = [
    Expect<Equal<typeof data, "You must pass a type argument to fetchData">>
  ]
})
```

If we remove the `await`, it would be `Promise<unknown>`.

To make sure `unknown` is never available, we can change the default of `TResult` in the type argument to be the error message:

```typescript
const fetchData = async <
  TResult = "You must pass a type argument to fetchData"
>(
  url: string
): Promise<TResult> => {
  const data = await fetch(url).then((response) => response.json())
  return data
}
```

Now in the second test, we see that the type of `data` is now `const data: "You must pass a type argument to fetchData"`.

This is helpful because it allows the user to understand what's wrong.

Notice that back in the first test, we can see that we can pass a type argument to `fetchData` and it will work as expected, but the result can't be constrained.

```typescript
it("Should fetch data from an API", async () => {
  /*
    const data: {
      name: string
    }
  */
  const data = await fetchData<{ name: string }>(
    "https://swapi.dev/api/people/1"
  )
  expect(data.name).toEqual("Luke Skywalker")

  type tests = [Expect<Equal<typeof data, { name: string }>>]
})
```

This means that if you are sure that there will always has a `data` attribute or a `data: any`, then this solution won't work.

But, if you find yourself wanting to pass in a type argument and the result is unconstrained, then this is a neat solution.

## Transcript
0:00 The solution here is probably simpler than you expect. It doesn't involve any crazy conditional types. It doesn't involve any weird mapping. It just involves a little bit of understanding of how type arguments work in TypeScript.

0:13 When you don't pass a type argument, how does it get inferred? It gets inferred as unknown. Now fetchData, when you don't pass in a type argument, basically returns a promise with unknown, which is how this ends up as data unknown. If we remove the await, this would be Promise unknown.

0:34 How do we make it so the unknown is never available? We change the default of TResult and we say TResult equals "You must pass a type argument to fetchData." Now this data is technically typed as any and actually, it's any inside here too, and we end up with Promise TResult.

0:57 What you get is now data is "You must pass a type argument to fetchData," when there's no type argument specified, and data up here is name string. This is really neat actually. What it does is it allows the user to understand what's going wrong, and as soon as we pass a type argument to it, then we say whatever string, then you're good to go.

1:22 Now one thing that's interesting here is that you then can't really constrain TResult. You can't say if you're sure that it always has a data attribute or like a data any for instance, then this wouldn't match that constraint. If TResult has to be of a certain shape, then this doesn't work.

1:43 For unconstrained generics, if you want the user to pass a type argument there, then this is actually a really neat little solution. Well done if you found the solution. Good stuff.

# 6. Typing a Function Composition with Overloads and Generics

[

github.com

https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/06-challenges/33-compose.problem.ts

](https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/06-challenges/33-compose.problem.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=166924ea-bac2-428b-8728-6a687ab6558d&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0601-typing-a-function-composition-with-overloads-and-generics-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=166924ea-bac2-428b-8728-6a687ab6558d&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0601-typing-a-function-composition-with-overloads-and-generics-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
This is a classic problem in TypeScript.

We start with a `compose` function that spreads in an array of functions that take in an `input`, and returns an output:

```typescript
export const compose =
  (...funcs: Array<(input: any) => any>) =>
  (input: any) => {
    return funcs.reduce((acc, fn) => fn(acc), input)
  }
```

Then we have `addOne`, which takes a number and returns `num + 1`.

We also have `addTwoAndStringify`, which calls `compose(addOne, addOne, String)`:

```typescript
const addOne = (num: number) => {
  return num + 1
}

const addTwoAndStringify = compose(addOne, addOne, String)
```

The result of this is supposed to be typed as `string`, but it is currently typed as `any`.

We have a bit of a conflict between two functions inside our system.

The `String` function takes in anything and returns a `string`, but it's passing that output to `addOne` which expects a `number`.

We've got a complicated setup where one function passes something to another function and we need to find a way to strongly type this.

## Challenge
To fix these errors, you will need to capture quite a lot of information in generics and use function overloads.

You'll need to capture whatever the first function in `compose` takes in, as well as what it returns. You'll need to do this for the second and third functions as well.

To make things more interesting, you should be able to compose up to five functions. In real life, this might go up to ten or twenty, but for now let's just keep it to five.

The solution to this challenge is going to feel hacky, but it's going to be the best solution on the market!

## Transcript
0:00 This is a classic problem in TypeScript, which is we have a compose function. This compose function takes in an array of functions basically spread in like this and then takes an input and then returns an output.

0:16 We have addOne and addTwoAndStringify. Basically, this one takes in a number and returns num + 1. Then addTwoAndStringify, it composes those two functions together. It's like addOne, addOne, and then uses the String constructor to basically turn it into a string. This result equals addTwoAndStringify. The result is equal to 6.

0:41 What this is doing is it's supposed to work on the type level too. Currently, this is typed as any, but, in fact, we want it typed as string because that's the result of this String function here. The stringifyThenAddOne function here, what it's doing is it's basically saying...

1:00 We've now got a conflict between two functions inside our system, which is this one, this String, takes in actually anything and returns a string, but it's passing it to addOne, which expects a number.

1:17 Whoo. We've got a really complicated setup here, where you have a function which passes something to another function,passes something to another function. You need to find a way to strongly type this. There is a way to strongly type this. It involves function overloads. You're going to need to capture quite a lot of information in generics here.

1:37 You're going to need to capture the thing that the first function takes in, what it returns, the thing that the second function takes in, what it returns, and the thing that the third function takes in and what it returns. You should be able to compose up to, let's say, five functions. In real life, this might go up to 10 or 20 or things like that. For now, let's just keep it to five.

2:00 I think that's all the information I'm going to give you. Function overloads are going to be critical here. Generics are going to be critical. You will end up with a solution that feels hacky too. The hacky solution is, in fact, the best solution on the market. Good luck.

# Solution: Using Overloads and Generics to Type Function Composition

[

github.com

https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/06-challenges/33-compose.solution.ts

](https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/06-challenges/33-compose.solution.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=1debf840-7bdc-4ad3-b142-e80f09b9974a&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0602-typing-a-function-composition-with-overloads-and-generics-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=1debf840-7bdc-4ad3-b142-e80f09b9974a&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0602-typing-a-function-composition-with-overloads-and-generics-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
The way to solve this problem is to think about it through the function overload lens.

## Function Overloads are Necessary
The reason this needs function overloads is that we need to capture different numbers of generics based on what the user passes in.

The first thing we'll do to prepare for overloads is convert `compose` to be a classic function declaration:

```typescript
export function compose(...funcs: Array<(input: any) => any>) {
  return (input: any) => {
    return funcs.reduce((acc, fn) => fn(acc), input)
  }
```

Above this we'll create another `compose` function which will take an empty type argument, and an argument of `func` and it's type will be `(t1: T1) => T2` since we want to capture the input and output of the first function.

Then we'll add `T1` and `T2` as type arguments:

```typescript
export function compose<T1, T2>(func: (t1: T1) => T2)
```

The return type will be a function that takes in `T1` and returns `T2`:

```typescript
export function compose<T1, T2>(func: (t1: T1) => T2): (t1: T1) => T2);
```

Notice that the signature of the function we take in is the same as the signature of the function we return.

For a quick check we can call `compose` with `String`:

```typescript
compose(String)
```

On hover, you can see that we are passing in `any` and returning a `string`:

```typescript
function compose<any, string>(func: (t1: any) => string): any
```

Let's see what happens when we pass in a function that takes in a `number` and returns a `string`:

```typescript
compose((a: number) => "ldskfjsdlfsdfs")
```

On hover we see:

```typescript
// hovering shows
function compose<number, string>(
  func: (t1: number) => string
): (t1: number) => string
```

Since we see `compose<number, string>`, we know that both `T1` and `T2` are being captured.

This is good, but we're not handling the case where we have more than one generic.

## Handling Multiple Generics
To support multiple generics we need to add another type argument `T3` to `compose`.

Then we'll rename `func` to `func1` and add a second argument `func2`, which will be a function that takes in the output of `func1`, `T2`, and returns `T3`.

Lastly, we'll add `T3` to the return type:

```typescript
export function compose<T1, T2, T3>(
  func1: (t1: T1) => T2,
  func2: (t2: T2) => T3
): (t1: T1) => T3
```

The function that we end up with takes in the input of the first parameter and returns the output of the third parameter.

With these changes in place, we can call `compose` with two functions:

```typescript
compose(
  (num: number) => {
    return "abc"
  },
  (t2) => {
    return parseInt(t2)
  }
)
```

Hovering shows us:

```typescript
function compose<number, string, number>(func1: (t1: number) => string, func2: (t2: string) => number): (t1: number) => number (+1 overload)
```

The first `number` is the input of the first function, the second `string` is the output of the first function, and the third `number` is the output of the second function.

You can probably see where this is going!

Now we can create another `compose` function that takes in `T1`, `T2`, `T3`, and `T4`, and returns a function that takes in `T1` and returns `T4`:

```typescript
export function compose<T1, T2, T3, T4>(
  func1: (t1: T1) => T2,
  func2: (t2: T2) => T3,
  func3: (t2: T3) => T4
): (t1: T1) => T4
```

And we won't go beyond five so we don't lose our minds:

```typescript
export function compose<T1, T2, T3, T4, T5>(
  func1: (t1: T1) => T2,
  func2: (t2: T2) => T3,
  func3: (t2: T3) => T4,
  func4: (t2: T4) => T5
): (t1: T1) => T5
```

## Tests Passing
With all of these changes done, the tests are now passing:

```typescript
it("Should error when the input to a function is not typed correctly", () => {
  const stringifyThenAddOne = compose(
    // @ts-expect-error
    String,
    // addOne takes in a number - so it shouldn't be allowed after
    // a function that returns a string!
    addOne
  )
})
```

If we remove the `// @ts-expect-error` directive, TypeScript gives us this error:

```typescript
Argument of type 'StringConstructor' is not assignable to parameter of type '(t1: any) => number'.
```

We get this error this because `addOne` is expecting a number back. Swapping the order of `String` and `addOne` in the test will remove the error since `String` can accept anything into it.

This issue of composability is a real problem that is out there in the wild. The solution we've built here is similar to the way that libraries such as `io-ts` and `reselect` have solved it.

Well done if you managed to find it!

## Transcript
0:01 The way to solve this problem is to think about it through the function overload lens. The reason this one needs function overloads is that we need to capture different numbers of generics, based on what the user passes in. This is tricky. Let me show you why it's necessary. Then we'll talk about possible alternatives. I'm not sure there are any.

0:30 Because I'm going to use function overloads for this, I'm going to say, "export function compose" and change this into a classic function body. Then I'm going to return this. Now we've got our compose function working.

0:43 For now, I'm just going to keep this super-loose, like an implementation signature, because I'm going to do all of my typing, actually, in the top level. I'm going to probably keep these anys around as well.

0:57 We are going to export a function compose. compose is going to take in just one argument. That argument is going to be a func, where it's going to take in...Let's say I'm going to start naming these generics like T1 and then return T2 here.

1:16 I'm going to stick this inside here. You'll see why I'm doing this in a minute. Then compose, which lacks return-type annotation. Now we get back a function, which takes in t1 is T1 and returns T2.

1:35 What have I done here? You'll see why I'm naming these like this in a minute. You can think of T1 as the first input that gets taken in. We take in a function that takes in T1 and returns T2. Then we just basically return that function. You can see that these two are exactly the same signature.

1:56 I can try this now. I can say, "compose." Let's say I just use a String constructor. Now what we get back is...We pass in any. We return string. That any looks like it isn't being captured. Let me actually do something different there where we return a string. Sorry. Blah, blah, blah, blah, blah.

2:13 Then we take in a, which is going to be a number, for instance. We take in a. We just ignore it. We return a string, whatever happens. Now we get compose number string. T1 is being captured, and T2 is being captured.

2:27 This is good, but we're not handling the case where we have more than one generic in or more than one function being passed in. Let's do that. I'm going to copy and paste. I'm now going to add T3 onto here. We've got func1. Then I'm going to say, "func2."

2:47 Func2 is going to take in T2 as an input. It's going to say t2 is T2. It's going to return T3. Now the function that we end up with, it takes in the input of the first parameter and actually takes in the output of the third parameter.

3:06 You see that? Whoo. Blimey. Now, if we compose -- let's say we have a function, which is here, returning abc, takes in num number -- you can see there that we have number string. Now, if we add a second one here...We say, "t2." We get t2 back here. Then we return t2.parseInt, for instance. Whoops. No, no.

3:39 ParseInt t2, which of course is going to fail, but it shows them that what we end up with is number, which is the number here, then string, which is what's returned from there, and then number, which is the third parameter. Blimey. You just end up with a function that takes in a number and returns a number.

4:01 You can probably see where this is going. Where we have compose, let's say, "T4." Let's say func3 is now...We've got t3 T3. This returns T4. That one is T4. Let's go all the way up to five before you start to lose your mind. T5. This one is T4 functions here. That one is T4 to T5. This one is T...Inside here. Blimey.

4:35 Now what you can see is we're now getting this passing. You've now got addTwoAndStringify, which takes in addOne, addOne, and String. The way that TypeScript resolves its type arguments is working in our favor here.

4:52 If we remove this error, you can see that String basically says -- so good -- "Argument of type StringConstructor is not assignable to parameter of type t1 any number." This one is now expecting a number back. This string is incompatible.

5:10 If we move these around and say addOne first and then String, then it's absolutely fine. String can accept anything into it. You end up with number, number, string. t1 is a number. t3 is a string, which is what's returned.

5:24 This then is pretty much how you solve this problem. This problem is out there in the wild. It's been solved in this way by libraries like io-ts. There's another one that I can't quite remember off the top of my head.

5:38 Oh, yeah. It was solved this way by Reselect as well, which Mark Erikson worked on. This is a pretty well-respected solution. Well done, if you managed to find it. This one is super-hardcore.

# 7. Dynamically Typing Arguments

[

github.com

https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/06-challenges/34-internationalization.problem.ts

](https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/06-challenges/34-internationalization.problem.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=1a6fab5a-385e-415c-b74d-08ed0f3c2292&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0701-dynamically-typing-arguments-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=1a6fab5a-385e-415c-b74d-08ed0f3c2292&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0701-dynamically-typing-arguments-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Internationalization Library Challenge
Here we have a set of `translations` that include the name of a person using the app and the number of unread messages.

```typescript
const translations = {
  title: "Hello, {name}!",
  subtitle: "You have {count} unread messages.",
  button: "Click me!",
} as const
```

There is a `translate` function that should capture the literals from the translations and return the string with the dynamic arguments replaced.

```typescript
const translate = (translations: unknown, key: unknown, ...args: unknown[]) => {
  const translation = translations[key];
  const params: any = args[0] || {};

  return translation.replace(/{(\w+)}/g, (_, key) => params[key]);
}
```

## Challenge
Your challenge is to update the `translate` function so that all of the tests pass as expected:

*   If the key is `subtitle`, you have to pass in `count`.
*   If the key is `title`, you have to pass in `title`.
*   If the key is `button`, you don't have to pass in anything.
*   It should not let you pass parameters that are not required.

Depending on your implementation, there may be two or three type arguments.

Hint: There might be a dynamic number of arguments based on the key being passed in. Also, you can use a tuple to store all the translations and help with typing the `args` better.

## Transcript
0:00 In this challenge, we are doing an internationalization library. We have a set of translations here that are basically being marked as const and they're doing that so that you can capture the literals from them. They have some various dynamic args here, that you can basically say, hello name,

0:18 and that'll be the name of the person that's using your app. You have however many unread messages. The idea is that this translate function up here will take in this object of translations, take in the key, and then this is the tricky bit. Depending on whether it has any dynamic stuff in it, so any of these,

0:37 then it should optionally give you an argument to basically say, okay, you have to pass in the count here. If you use subtitle, you have to pass in count. If you use title, you have to pass in title. But if you use button, then you shouldn't have to pass in anything. In fact, it should error if you

0:56 try to pass in something that's not required. We have a dynamic number of arguments here based on the thing that's being passed in. I have made it a little easier for you in that I've given you a type here called getParamKeys, which basically takes in a translation string and returns

1:14 a tuple with all of those things in, basically with all the translations in. This will help you a little bit and should give you a way to type these args better, I think. I think that's all I'm going to give you. You're probably definitely going to need a couple of

1:32 type arguments on the translate function, possibly two to three, depending on how you implement it. This is a neat little challenge and definitely has a lot of applications in the real world, so good luck.

# Solution: Dynamic Argument Support with Conditional Types

[

github.com

https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/06-challenges/34-internationalization.solution.ts

](https://github.com/total-typescript/typescript-generics-workshop/blob/main/src/06-challenges/34-internationalization.solution.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=e1d11018-3c9d-4305-b294-0656795c444c&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0702-dynamically-typing-arguments-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=e1d11018-3c9d-4305-b294-0656795c444c&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0702-dynamically-typing-arguments-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
We're working with a `translate` function that needs to capture translations dynamically. The keys need to be strongly typed, and we need to figure out the type of arguments based on the specific key provided.

Here's what we're starting with:

```typescript
const translate = (translations: unknown, key: unknown, ...args: unknown[]) => {
  const translation = translations[key];
  const params: any = args[0] || {};
  return translation.replace(/{(\w+)}/g, (_, key) => params[key]);
};
```

Let's take the updates step-by-step.

## Capture Dynamic Translations as a Record
The first thing we'll do is update the `translate` function to capture dynamic translations.

We will do this by having `TTranslations` extend a `Record` of strings because the shape of the translations:

```typescript
const translate = <TTranslations extends Record<string,string>>(
   translations: TTranslations,
   key: unknown,
   ...args: unknown[]) => {
   ...
```

## Strongly Type the Key
Next we'll update the `translations` to be of type `TTranslations`, and the `key` to be `keyof TTranslations`:

```typescript
const translate = <TTranslations extends Record<string,string>>(
   translations: TTranslations,
   key: keyof TTranslations,
   ...args: unknown[]) => {
      ...
```

At this point when we hover over `translate`, we can see that we have good inference so far:

```typescript
// hovering over `translate`

const translate: <{
    readonly title: "Hello, {name}!";
    readonly subtitle: "You have {count} unread messages.";
    readonly button: "Click me!";
}>(translations: {
    readonly title: "Hello, {name}!";
    readonly subtitle: "You have {count} unread messages.";
    readonly button: "Click me!";
}, key: "button" | ... 1 more ... | "subtitle", ...args: unknown[]) => string;
```

## Add a Type Argument for the Key
We need to know the specific key being used when calling the function in order to translate it properly. To do this, let's put the key in a type argument.

We'll define `tkey` as extending `key of ttranslations` and use it as the key.

```typescript
const translate = <
   TTranslations extends Record<string,string>,
   TKey extends keyof TTranslations>,
>(
  ...
```

## Step 4: Dynamically Type Arguments
Now we need to figure out the type of `args` based on what is passed in depending on whether the translation selected has a dynamic signature or not.

First, let's look at an example by adding a `TConsoleLog` type argument that is set to the type of `TTranslations[TKey]`:

```typescript
const translate = <
   TTranslations extends Record<string,string>,
   TKey extends keyof TTranslations>,
   TConsoleLog = TTranslations[TKey]
>(
  ...
```

Now when we hover we can see from that `TConsoleLog` is being inferred as the right message. For example, if we have `TKey` set to `button`, we'll get the `Click me` message, and if we change it to `subtitle`, we'll get the `You have count unread messages` message.

However, we still need to figure out the `args`.

We have seen the trick of using `string extends string` to create a conditional type with two branches. We can use this trick to determine the type of `args` based on the key being passed in.

In this case, if the function is passed a string, it will also need to be passed a `Record<string, string>` as the third argument. Otherwise it won't need to be passed a third argument:

```typescript
const translate = <
   TTranslations extends Record<string,string>,
   TKey extends keyof TTranslations>,
   TConsoleLog = TTranslations[TKey]
>(
  tranlations: TTranslations,
  key: TKey,
  ...args: string extends string ? [params: Record<string, string,>] : []
```

With this change, inside of the test for translation without parameters, we now get an error that the `translate` function expects 3 arguments, but only received 2.

Let's extract the conditional type into its own type alias and rework the logic for clarity:

```typescript
type GetParamKeys<TTranslation extends string> = TTranslation extends ""
  ? []
  : TTranslation extends `${string}{${infer Param}}${infer Tail}`
    ? [Param, ...GetParamKeys<Tail>]
    : [];
```

Then we'll update the `translate` function accordingly:

```typescript
const translate = <
  TTranslations extends Record<string, string>,
  TKey extends keyof TTranslations,
>(
  translations: TTranslations,
  key: TKey,
  ...args: GetParamKeys<TTranslations[TKey]> extends []
    ? []
    : [params: Record<string, string>]
) => {
```

To recamp, if the result of `GetParamKeys` is an empty tuple, we don't want the user to pass in any arguments. However, if there's more than one key, we want the user to pass in a Record that contains the specific keys in `translations`.

With these changes, the tests are passing and we're getting good inference and autocompletion.

However, there's an optimization we can make.

## Reducing Duplication
In our current implementation, we're using `GetParamKeys` in two places and it's an expensive computation:

We have to check the entire string and create an array out of it, which we're doing twice.

To fix this, we can extract the computation directly into the parameters declaration, similar to how we had `TParamKeys` earlier:

```typescript
TParamKeys = GetParamKeys<TTranslations[TKey]>
```

Now we can use `TParamKeys` in the conditional type:

```typescript
const translate = <
  TTranslations extends Record<string, string>,
  TKey extends keyof TTranslations,
  TParamKeys = GetParamKeys<TTranslations[TKey]>,
>(
  translations: TTranslations,
  key: TKey,
  ...args: TParamKeys extends [] | I
    ? []
    : [params: Record<TParamKeys[number], string>]
) => {
```

After this update the code still works as expected, but there is an error inside the function that we need to address.

TypeScript shows us an error on `TParamKeys` that says:

```typescript
Type 'TParamKeys[number]' does not satisfy the constraint 'string | number | symbol'.
Type 'number' cannot be used to index type 'TParamKeys'.
```

This is because we aren't constraining the type of `TParamKeys` to be anything.

## Adding Type Constraints to `TParamKeys`
To fix this, we'll say that `TParamKeys` extends an array of strings:

```typescript
TParamKeys extends string[] = GetParamKeys<TTranslations[TKey]>
```

This constraint tells TypeScript that `TParamKeys` has a vague shape that we know about, which is the return value of `GetTParamKeys`.

## Recap
Let's recap our work on the `translate` function:

```typescript
const translate = <
  TTranslations extends Record<string, string>,
  TKey extends keyof TTranslations,
  TParamKeys extends string[] = GetParamKeys<TTranslations[TKey]>,
>(
  translations: TTranslations,
  key: TKey,
  ...args: extends TParamKeys
    ? []
    : [params: Record<TParamKeys[number], string>]
```

The `translate` function captures `TTranslations` and `TKey` inside the signature. Then, we check if `TParamKeys` extends an empty object. If it does, we don't require any arguments, and we create a record out of the `TParamKeys` number and force the user to pass that.

Great work if you managed to find this solution!

## Transcript
00:00 Okay, let's take a look at this. We know that this translate function, we're going to need to capture the translations, right? Because you can pass in any translation so they can be dynamic. So let's take in ttranslations, which is going to extend record string string. Because that record string string, that's the shape that these translations are in, right?

00:18 You can't have a number in this position, can't have a number in this position. So let's stick that in translations, ttranslations. Now, this key, we want to strongly type this from the outside. So let's make this key of ttranslations. And we should see that when we hover over translate here, we're getting this stuff properly inferred

00:38 and the key should be strongly typed. Yep, button subtitle. And if we pass in something random, then it's erring at us. Grand, okay. So now we need to figure out the type of args here. And args is going to be pretty special because we first of all need to grab the type

00:56 of the specific thing that we're passing in via the key. We need to know that when we specify title, that's the literal that's being inferred here. So let's do that first. Let's just say that for instance, how are we going to do this? Okay, let's do it by saying key. Like, first of all, key of ttranslations

01:15 is not going to cut it because that is a union of all possible members. When we call this function, we're going to need to know which specific key they are using in order to translate it properly. So let's actually put it in a type argument. So tkey is going to extend key of ttranslations.

01:32 And now let's stick that in the key, tkey, beautiful. And now when we hover over translate here, we are seeing it like being inferred properly there. So we have our button. And if we, are we still getting this? Yeah, okay, we're still getting that nice inference there too.

01:49 Now, what we want to do is we want to figure out these args because these args, depending on whether the translation selected has a dynamic signature or not, we want to basically say, okay, parse in an object containing those parameters or don't.

02:10 And this is a tricky one. So the first thing I do when I'm approaching a kind of complex problem, like inside a generic signature, is I do something like this, where we have, let's say we have a tconsole log here. And tconsole log, we can actually put anything in here. And when we kind of hover over this,

02:28 you can see that it's being kind of like logged out in the signature here. So what we can do is we can say, let's first of all just say, okay, ttranslations tkey. And that ttranslations tkey, that's going to tell us which of these messages is being inferred as the right message. So now we can see that when we parse in button,

02:46 we get click me here. And if I change this to subtitle instead, then we're going to get that instead. You have count unread messages. Beautiful. Okay. That's a good start. Let's now see what happens when we call get param keys on that message here.

03:05 So again, let's take a look. So button now is an empty tuple here. And that empty tuple is because there's no dynamic stuff inside button. Whereas on subtitle, you can see that count is being inferred here. Nice. Okay. So that console log is helping us out there, but now we need to figure out these args.

03:24 Well, we've already seen that you can do a trick like this, where if you say string extends string, you can basically have two branches here of a conditional type where you can either say, okay, we've got like params. And let's say params is going to be, we'll figure out the shape of this in a second,

03:42 but let's just say record string string. And now what's happening here is because string does extend string, we have to pass in a third arguments here of params into this. It's expects three arguments, but got two. And here we're seeing params is a record string string, although you can't see that. So that's good.

04:01 But now how do we like figure out this logic based on whether, based on the result of this get param keys. And let's actually just extract this out into its own, kind of like inline this here. So what we wanna say is if get param keys, basically, if it's an empty object,

04:21 then we don't want to, or sorry, an empty tuple, then we don't want the user to pass in any arguments there. So we don't want any arguments in that slot there. But if it does, right, then we want to, if it does have more than one key, then we want to get them to pass in a record here.

04:40 And that record has to be, we can see all the tests are passing here, but this record has to be like count, right? We can't just pass in anything there. So first of all, so this seems like it's working pretty well actually, because get param keys, if we just extract this out into a log up here, so log equals this, we know that when it's button,

05:01 then it's going to basically just be empty array. And if it's something with more than that, then it's going to be in there too. Really, really nice. But now how do we type this here, the key of the params thing that we're requesting? Well, we can say get param keys. This is just a standard,

05:19 like, because we're just transforming an array into a union, right? So we now got ttranslations key number, and just grab the number in there and stick it in there. So now it's working. And count, we should see that count string is now auto-completed here.

05:38 And if I change this subtitle, if I change it to message count, then that is going to error down there, and it's going to give me all those beautiful, beautiful errors and wonderful, wonderful red lines. Nice. Now there's a little bit of duplication happening here, where we have get param keys is kind of being inferred in two places or used in two places.

05:59 And this is quite an expensive computation. We're having to basically go through, check this entire string and create an array out of it. And we're having to do that work twice. Wouldn't it be great if there was just a way that we could just do it once and have it just work? Well, we can do that by extracting it up actually into the parameters here.

06:18 When you declare these parameters, you can actually do computation inside them. And it means that you can do, let's say, tparamkeys. And let's say we just go, okay, get param keys, stick it in there, just like we did with our log earlier. Now tparamkeys is actually defined

06:39 across the scope of this translate signature. So we can now, instead of having get param keys, we can say tparamkeys. Now there's one problem here, and this still works by the way. So everything's actually working down here. It's just an error inside the function, which we'll get to briefly. You can see now we even get the little log readout here,

06:57 which is lovely. So now this is one more issue, which is the tparamkeys type number cannot be used at index type tparamkeys. Well, that's because tparamkeys, we're not actually constraining it to be anything, even though it's kind of like, in fact, we could just do this, where we could just say extends tparamkeys,

07:17 except there seems to be an issue there. We'll take a brief look at that in a second. But the main way that I think of doing this is just to say, basically, we can just say it extends an array of strings here. And what we're saying here is tparamkeys, it's got a sort of vague shape that we know about, which is the return value of get tparamkeys.

07:37 And when we call the function, it gets instantiated with this nice little thing here. And now because we've got this constraint here, the stuff inside the function is happy too. So it's funny, isn't it? Like all of these constraints are there for different reasons. This one is because, like to affect the outer scope of the function.

07:57 This one is actually here to affect the inner scope of the function and to make sure that it's all working properly. And this default doesn't really have any impact on the kind of outside scope of the function. It's just to basically save us a bit of work when we're inside the function. So we don't have to compute tparamkeys twice.

08:14 So much depends on these like little sort of tricks and like these little optimizations that you can make. But this I think is a really, really clean solution and one that I'd be happy to put in production. And if you found this, well done. There's a lot going on here. Let's actually just recap briefly. We've got this ttranslations.

08:34 We're capturing the ttranslations and the key inside the signature. Then we're doing this computation where we say, okay, we check if tparamkeys extends an empty object. If it does, we don't require any args. But if it does, then we just pull in params here

08:51 and we create a record out of the tparamkeys number. And then we force the user to pass that. If you found that, great work.