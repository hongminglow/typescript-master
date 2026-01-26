# Module 4: Advanced TypeScript Patterns



# (a) Branded Types



# 1. Advanced Workshop Welcome

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=898ffe78-8c47-4c98-8f77-5f13876037db&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="01-advanced-workshop-welcome.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=898ffe78-8c47-4c98-8f77-5f13876037db&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="01-advanced-workshop-welcome.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Explainer
Hello wizards!

Welcome to the Advanced Patterns TypeScript Workshop.

This workshop is inspired by interesting TypeScript stuff I've seen in the wild.

We'll look at actionable patterns that you can use in your code, including:

*   Type Predicates
*   Assertion Functions
*   Branded Types
*   Globals
*   External Libraries

...and much more!

This will help you become a better application and library developer.

The way it works is I'll give you a problem and you'll try to find the solution. Then I'll show you my solution and explain all the steps and concepts you need to understand.

This reverse approach will help you understand exactly how the concepts are applicable.

I believe that providing you with real-world problems is an essential part of learning and understanding. By working on these problems, you can learn the solutions yourself.

Each exercise comes with an embedded editor on the site, or you can clone the repository and work locally.

The code for this workshop [found on GitHub](https://github.com/total-typescript/advanced-patterns-workshop).

I hope you enjoy the workshop!

## Transcript
0:00 What's up, wizards? Welcome to the Advanced Patterns TypeScript Workshop. This workshop is the place where I've been able to put all of the most advanced, interesting stuff that I've seen in TypeScript in the wild.

0:12 We're going to start diving deep into actionable patterns that you can take, pull out, and put in your application code. We're going to look at type predicates, assertion functions, branded types, globals, external libraries, and a bunch of more stuff. This is going to help you be a better application developer and a better library developer too.

0:28 The way it works, I'll give you a problem, then you try and find the solution, and then I'll show you what my solution was and explain all the steps I take to get there and all the concepts you need to understand. It's like it works in reverse. Instead of me just teaching you and you just sitting there, I'm going to try to get you to solve a problem first, and then when I teach it to you, you'll understand exactly how it's applicable.

0:48 This is a crucial part of learning and understanding something. I've tried to provide you a framework of giving you real-world problems so that you can go and learn the solutions yourself. Each exercise comes with an embedded editor, which you can use on the site or you can clone the repo down and run the scripts yourself.

1:05 There'll be a link to the repository in the text below. You've got all the information you need to get started. Thank you for joining along and enjoy a little bit too.

# 2. What is a Branded Type?

[

github.com

https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/01-branded-types/01-what-is-a-branded-type.explainer.ts

](https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/01-branded-types/01-what-is-a-branded-type.explainer.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=05cb1303-43c5-47a8-bc50-f28252b18867&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="02-what-is-a-branded-type.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=05cb1303-43c5-47a8-bc50-f28252b18867&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="02-what-is-a-branded-type.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Explainer
Branded types (also known as "Nominal" or "Opaque" types) let us specify logic on the type level.

We'll start our exploration by looking at a password.

Normally a `password` would just be a `string`.

But by calling a special Brand type helper, we can turn this `password` from a regular `string` into a `Password`:

```typescript
type Password = Brand<string, "Password">;

const password = "123123" as Password;
```

Now this variable is expecting to be assigned as a `Password` and we shouldn't be able to assign it just a random `string`.

So if we create a new variable called `passwordSlot` and assign it to `Password`:

```typescript
let passwordSlot: Password;
```

Trying to set `passwordSlot` to a random string will give us an error:

```typescript
// error
passwordSlot = 'asdf'
```

In order to make `passwordSlot` work, we have to add `as password`:

```typescript
let passwordSlot: Password;
passwordSlot = 'asdf' as password;
```

## The `Brand` Helper
Let's take a look at the `Brand` helper at `src/helpers/Brand.ts`.

Inside is an `export type Brand` which takes in a `T` and `TBrand`.

It returns `T` and an object containing that `brand` assigned to a unique symbol.

```typescript
declare const brand: unique symbol;

export type Brand<T, TBrand> = T & { [brand]: TBrand };
```

This object can never be satisfied at the run time, and only exists at the type level.

Using `unique symbol` puts something into the global scope that's a type which only exists at the type level. It can never satisfied at the runtime level.

In this case, we use the syntax to say that once something has been branded, it has to be passed to a slot that has the same `Brand`.

Read more about [`unique symbol`](https://www.typescriptlang.org/docs/handbook/symbols.html#unique-symbol)[, in the TypeScript Docs](https://www.typescriptlang.org/docs/handbook/symbols.html#unique-symbol).

## Building on the Password Example
Back in our file, let's create a `verifyPassword` function that takes in a `password` string that is the `Password` brand:

```typescript
const verifyPassword = (password: Password) => {};
```

If we call `verifyPassword` and only pass it a string, TypeScript will yell at us because a string is not a `Password`. Like we saw earlier, you have to use `as Password` to make it work.

## Branded Types can be Anything
You can create whatever branded type you want.

For example, we can create a `UserObject` branded type by passing `Brand` an object with `id` and `name` strings for the first argument, and the name `"User"` for the second:

```typescript
type UserObject = Brand<
  {
    id: string;
    name: string;
  },
  "User"
>;
```

Then we can create a new `user` `UserObject` with an object that has an `id` and `name` and be sure to brand it with `as UserObject`:

```typescript
const user: UserObject = {
  id: "asd123",
  name: "Matt"
}
```

We'll be looking at the various applications for branded types throughout this section. They let you do some interesting stuff that isn't possible with regular TypeScript!

Check out these excellent resources to learn more about Branded a.k.a. Nominal a.k.a. Opaque types:

[

basarat.gitbook.io

https://basarat.gitbook.io/typescript/main-1/nominaltyping

](https://basarat.gitbook.io/typescript/main-1/nominaltyping)

[

codemix.com

https://codemix.com/opaque-types-in-javascript/

](https://codemix.com/opaque-types-in-javascript/)

## Transcript
0:00 In this section, we're going to be learning about branded types or nominal types. These types are really interesting, because they let you specify logic on the type level.

0:10 Here, we have a password here, and this password is just a string, but we can call this special brand thing over here. What that's going to do is it's going to turn this password from just a regular string into a password, so I can say as Password.

0:29 Now, inside this passwordSlot, this variable is expecting to be assigned as a password essentially. You shouldn't be able to assign it just like a regular string. If I delete some code here, I shouldn't be able to go, OK, pass it just a random password. It needs to be something that has been branded as a password.

0:49 Whereas if I do this and say as Password over here, then suddenly, this passes. To loo at this, this complicated piece of code, I've gone into helpers/Brand.ts here. We have a export type Brand, which takes in a T and TBrand, and it returns T and an object containing that brand assigned to a unique symbol.

1:16 This object here can never be satisfied at the runtime, because this declare const brand, it only exists at the type level. Declare const puts something into global scope that's a type that you can fulfill. You can say brand = something, something, something, but you're never going to be able to fulfill it, and it's a constant anyway.

1:38 This syntax lets you declare a globally unique symbol that you can then use in your brands that can never be satisfied. What this means is that when we brand something as something on the type level, it means that it has to be passed to a slot with that same brand.

1:55 For instance, we could have a, let's say, getPassword, for instance, or const verifyPassword, and what we're going to do then is take in a password here, which is going to be of type Password, and now verifyPassword, you can't just pass it one of these. It has to be...Of course, we start TS server. Let's see. Yeah, finally, you catch up.

2:16 Then you have to mark it as Password, or you'll see various tips in this section on how you can create these branded types of regular types.

2:28 That's the idea of branded types. You can do this, by the way, to anything. You can say, OK, I want to create a branded object. You can say type UserObject = Brand, and then we can pass in id string, name string, for instance, and then we have to give a name to, so we have to say User.

2:48 Then that User object, so const user, let's say, we can say this has to be a UserObject and we have to pass an ID and a name, and it has to be branded as a UserObject. There we go.

3:07 That's the idea behind brands. We'll see their various applications throughout this section, and how they can make your logic a lot safer. They let you do some really interesting stuff that just isn't possible with regular TypeScript.

# 3. Form Validation with Branded Types

[

github.com

https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/01-branded-types/02-form-validation.problem.ts

](https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/01-branded-types/02-form-validation.problem.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=5038d8d8-dad0-4dcf-a60a-346317387b88&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0301-form-validation-with-branded-types-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=5038d8d8-dad0-4dcf-a60a-346317387b88&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0301-form-validation-with-branded-types-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
In this exercise, we're going to look at brands as a way of ensuring your code is logically correct on the type level.

We have a few functions here: `onSubmitHandler`, `createUserOnAPI`, and `validateValues`. You can think of these as being called in sequence.

First of all, `onSubmitHandler` is kind of like the public API here. It's the thing that we would pass to our form to extract out the raw values of `email` string and `password` string:

```typescript
const onSubmitHandler = (values: { email: string; password: string }) => {
  const validatedValues = validateValues(values);
  // How do we stop this erroring?
  createUserOnApi(validatedValues);
};
```

From there, we grab those values and put them into the `validateValues` function.

This checks that `email` and `password` are correct. If the `email` doesn't include an `@` symbol or if the `password` isn't long enough, the function errors:

```typescript
export const validateValues = (values: { email: string; password: string }) => {
  if (!values.email.includes("@")) {
    throw new Error("Email invalid");
  }
  if (values.password.length < 8) {
    throw new Error("Password not long enough");
  }

  return {
    email: values.email,
    password: values.password,
  };
};
```

Once we have the validated values, we pass them into `createUserOnAPI` as `email: Email` and `password: Password`:

```typescript
const createUserOnApi = (values: { email: Email; password: Password }) => {
  // Imagine this function creates the user on the API
};
```

As of now we we have errors because our `Email` and `Password` properties are not valid.

## Challenge
Your job is to change the typing inside of the `validateValues` function in order to make sure that we get returned the `Email` and `Password` we expect.

## Transcript
0:00 In this exercise, we're going to look at brands as a way of understanding the logic and making sure that the logic is totally safe in your application code. We have a few functions here. We have onSubmit handler, create a User on API, and validate values.

0:16 You can think of these as being called in sequence. First of all, onSubmit handler is the public API here. It's the thing that we would pass to our form, for instance, to extract out the raw values of email string and password string. This is basically what the user calls in order to validate that stuff.

0:36 From there, we grab those values. We put them into the validate values function. What happens here is it checks that email and password are correct. If it is an email, then we know that it's going to be an email essentially. If it doesn't include an @ symbol, then we error, "Email invalid." If the password isn't long enough, then we error there, too. We return those values.

1:00 Then we take those validated values and pass them in to create a User on API. Here we have email, email and password, password. This is going to be erroring because types of property email are incompatible and passwords are not valid either.

1:17 I want you to think about how you would change this function, the validate values function, not any of its runtime stuff. Just a couple of types here in order to make sure that what gets returned from validated values or validate values is what we think it is. We want to make sure that what gets returned from here is a password and an email.

# Solution: Assigning Branded Types to Values

[

github.com

https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/01-branded-types/02-form-validation.solution.ts

](https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/01-branded-types/02-form-validation.solution.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=b2ff2fba-48e9-42bb-bfe5-af14ce7580a0&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0302-form-validation-with-branded-types-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=b2ff2fba-48e9-42bb-bfe5-af14ce7580a0&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0302-form-validation-with-branded-types-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
The right way to think about this solution is that `validateValues` is the way we turn our values from raw values into things that we know are `Email` and `Password`.

The values we return shouldn't be `email: string` and `password: string`.

They should be `email: Email` and `password: Password`.

The solution is to add `as Email` and `as Password` to the return inside of `validateValues`:

```typescript
// inside validateValues
return {
  email: values.email as Email,
  password: values.password as Password,
};
```

Hovering over the `validateValues` function shows us that it takes in strings, and returns the branded types:

```typescript
// hovering over validateValues:
const validateValues: (values: {
  email: string;
  password: string;
}) => {
  email: Email;
  password: Password;
}
```

With this change we can really trust that the values we get back will be valid, no matter where they get passed in our application.

Using branded types like this guarantees that your code is correct and it gives you a sense of logical confidence that TypeScript doesn't usually give you.

## Transcript
0:00 The right way to think about the solution is that validateValues is the way we turn our values from raw values into things that we know are email and password.

0:10 The idea is that when these are called, that the validated values shouldn't be email string and password string, they should be actually these values here. They should be email email and password password.

0:23 We can't add this as a return type here because actually, these are incompatible. We haven't done any conversion from an invalid value to a validated value. If we add them here as email and as password, whoops, as password, then we know that everything is correct here.

0:41 This is really cool because what it means is that this then acts as a conversion function, taking the invalid values and churning out the actual values.

0:53 It means then that we can really trust that everything that's, if we have like something that's being passed around our app like this email, we know that it's going to be an email wherever it gets passed in.

1:03 This gives us a lot of confidence in our code, and it means that when we create the user on the API, imagine if this code wasn't here and we were just passing in the invalid values here, string password string.

1:15 It would be really easy to think, "Oh yeah, createUserOnAPI. That validates its values before they get sent to the API, doesn't it? It definitely does." Well, no, it doesn't. Having it like this means that you guarantee that your code is correct and it gives you a sense of logical surety.

1:33 That's a logical confidence that Typescript doesn't usually give you.

# 4. Using Branded Types as Entity Id’s

[

github.com

https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/01-branded-types/03-entity-fetching.problem.ts

](https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/01-branded-types/03-entity-fetching.problem.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=5cd224f9-4af9-457d-b385-e2b01ae35a07&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0401-using-branded-types-as-entity-ids-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=5cd224f9-4af9-457d-b385-e2b01ae35a07&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0401-using-branded-types-as-entity-ids-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
Here we have a `User` and a `Post`, both represented in interfaces:

```typescript
interface User {
  id: string;
  name: string;
}

interface Post {
  id: string;
  title: string;
  content: string;
}
```

There is a `db` that represents the shape of the database:

```typescript
const db: { users: User[]; posts: Post[] } = {
  users: [
    {
      id: "1",
      name: "Miles",
    },
  ],
  posts: [
    {
      id: "1",
      title: "Hello world",
      content: "This is my first post",
    },
  ],
};
```

And finally there are functions here that say `getUserById` and `getPostById`:

```typescript
const getUserById = (id: string) => {
  return db.users.find((user) => user.id === id);
};

const getPostById = (id: string) => {
  return db.posts.find((post) => post.id === id);
};
```

## Challenge
These functions need to be restricted so that they only get a user with a `UserId` and a post with a `PostId`.

The branded types have already been written and are used in the tests:

```typescript
type UserId = Brand<string, "UserId">;
type PostId = Brand<string, "PostId">;
```

Your challenge is to work out where these branded types should go and what you need to do with them in order to restrict the functions appropriately.

## Transcript
0:00 In this exercise, we have a user and we have a post, both represented in interfaces. We have an ID of string here on both of them. We have a DB here that's representing the shape of the DB.

0:14 We've got some functions here that say getUserByID, ID string, and getPostByID, ID string. What we're trying to do here is we're trying to restrict these functions so that they only get a user with a user ID and a post with a post ID.

0:30 We have a couple of branded types up here that are already being used in the tests. Your job here is to work out where these branded types should go and what you need to do with them in order to achieve this goal. Good luck.

# Solution: Add Branded Types to Functions and Models

[

github.com

https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/01-branded-types/03-entity-fetching.solution.ts

](https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/01-branded-types/03-entity-fetching.solution.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=6ec1ece3-13cd-4b76-aadb-1e8661d0d833&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0402-using-branded-types-as-entity-ids-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=6ec1ece3-13cd-4b76-aadb-1e8661d0d833&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0402-using-branded-types-as-entity-ids-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
There are a couple of parts to the solution.

## Add Brands to the Getters
We definitely need brands added to `getUserById` and `getPostById` to make sure that the things we're checking are really `UserId` and `PostId`.

Before they were strings:

```typescript
const getUserById = (id: string) => {
  return db.users.find((user) => user.id === id);
};

const getPostById = (id: string) => {
  return db.posts.find((post) => post.id === id);
};
```

Now they are the correct brands:

```typescript
const getUserById = (id: UserId) => {
  return db.users.find((user) => user.id === id);
};

const getPostById = (id: PostId) => {
  return db.posts.find((post) => post.id === id);
};
```

This change means that we can't accidentally pass the wrong thing into the function.

An interesting thing to notes is that inside of these functions we're comparing branded types to non-branded types.

For example, hovering over [`user.id`](http://user.id) inside of `getUserById` shows us that the branded [`User.id`](http://User.id) property is a string:

```typescript
// hovering over user.id
(property) User.id: string
```

## Adding Brands to the Model
Next we'll add the branded types to the `db`. This is a good idea because it ensures the posts and users are properly represented:

```typescript
const db: { users: User[]; posts: Post[] } = {
  users: [
    {
      id: "1" as UserId,
      name: "Miles",
    },
  ],
  posts: [
    {
      id: "1" as PostId,
      title: "Hello world",
      content: "This is my first post",
    },
  ],
};
```

With this change in place, we can't accidentally call a function with the wrong type of ID.

For example, even though inside of `db` both the `UserId` and `PostId` are `"1"`, we get a really helpful error message if we try to call `getUserById(postId)`:

```typescript
const postId = "1" as PostId;

getUserById(postId)

// Error:
Type '"PostId"' is not assignable to type '"UserId"'.
```

## The Inspiration for this Challenge
I ran into this problem really hard when I was building a production application that had lots of different entities with several different ways that you could access those entities by ID.

There was a serializable version of the **ID** as well as a non-serializable version for saving to local storage.

By using branded types we knew that we would have the correct type of ID whether we needed to call `getBySerializableId` or `getByUniqueId`.

Just like in this solution, we were protected from accidentally accessing the wrong one.

## Transcript
0:00 There are a couple of different solutions here. The main idea is where you put these brands in order to make sure that everything you've got is safe.

0:10 We definitely know that we need to put them on the function getUserById and getPostById. We need to make sure that the thing we're checking here is a UserId and is a PostId down here. This is cool because it means that we can't accidentally pass the wrong thing to the wrong thing here.

0:28 The other interesting thing is this UserId here, which is a string, is being compared to something which is a UserId. You can actually compare these branded types to non-branded types. The question is whether you actually want to put these on the models themselves, whether you want User to be a UserId and Post to be a PostId.

0:52 You notice that this does add a couple of errors down here, which means we would have to add this as a UserId and add this as PostId here.

1:04 This, I think, is probably the correct way to model it, because imagine if you had a Post here and you wanted it to have a UserId, then you would probably want to represent this as a UserId itself, so you'd have to add it down here, UserId 1 as UserId.

1:23 I actually ran into this really hard when I was building a production application that had lots of different entities with several different ways that you could access those entities by ID.

1:34 There was a serializable version of the ID and a non-serializable version of the ID, because we were saving it to local storage but still had to have some sort of sense of uniqueness when we were not in local storage. Anyway, complicated.

1:47 Having functions like getBySerializableId or getByUniqueId, those were really interesting to have as different branded types, because it meant that you couldn't accidentally access the wrong one.

1:59 Which is why I included this, because it's a really incredibly useful pattern to know, especially if you have complicated data structures that all rely on each other and you don't want to accidentally mess things up.

2:10 Now, of course, if we call it with the wrong thing, then we're going to get this really quite nice error here, so types are branded or incompatible type, PostId is not assignable to type UserId. You get really nice errors off this.

2:22 Again, this is another application of branded types, and this should give you a good sense of what the trade-offs are, because when you have this database here and you're mocking these data, it's going to be quite annoying to have to add all of these as UserIds, as PostIds.

2:38 If you have a system with a lot of mocking, then maybe this isn't for you, but then again, you can just create a function which creates these IDs for you.

2:47 This is a really useful application of brands, for sure, and it's definitely something that I've run into in production before.

# 5. Creating Reusable Validity Checks with Branded Types and Type Helpers

[

github.com

https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/01-branded-types/04-reusable-valid-brand.problem.ts

](https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/01-branded-types/04-reusable-valid-brand.problem.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=f45c9b5e-d244-467d-8d55-6010fab068a3&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0501-creating-reusable-validity-checks-with-branded-types-and-type-helpers-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=f45c9b5e-d244-467d-8d55-6010fab068a3&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0501-creating-reusable-validity-checks-with-branded-types-and-type-helpers-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
This exercise has a familiar structure, with `validatePassword` and `createUserOnAPI` functions:

```typescript
const validatePassword = (values: PasswordValues) => {
  if (values.password !== values.confirmPassword) {
    throw new Error("Passwords do not match");
  }

  return values;
};

const createUserOnApi = (values: Valid<PasswordValues>) => {
  // Imagine this function creates the user on the API
};
```

There is a `Valid` type helper used in the `createUserOnAPI` function to ensure that the `PasswordValues` are validated. If they aren't validated, they shouldn't be allowed.

Currently the `Valid` type helper is typed as `unknown`:

```typescript
type Valid<T> = unknown;
```

Each of the tests includes an `onSubmitHandler`.

The first test calls `createUserOnAPI` with the raw values. It expects there to be an error, but it's actually not erroring.

In the second test's `onSubmitHandler`, we should be allowed to validate the values before creating the user.

```typescript
it("Should fail if you do not validate the values before calling createUserOnApi", () => {
  const onSubmitHandler = (values: PasswordValues) => {
    // @ts-expect-error
    createUserOnApi(values);
  };
});

it("Should succeed if you DO validate the values before calling createUserOnApi", () => {
  const onSubmitHandler = (values: PasswordValues) => {
    const validatedValues = validatePassword(values);
    createUserOnApi(validatedValues);
  };
});
```

## Challenge
Your challenge is to find a way to add types to the existing code so it behaves as intended.

## Transcript
0:00 In this exercise, we're going to use the structure of a previous exercise where we have basically a onSubmit handler. We have this create User on API and a validate password function. In this case, we've just got a password and confirm password.

0:17 In this one, it's hard to brand the password and confirm password together. What we've got is actually a reusable type helper. We have a valid here, which is basically saying, "When we create the user on the API, then these password values should be valid. They should be validated. If they're not validated, then we shouldn't allow them."

0:40 It should fail if you do not validate the values before calling create a User on API. This one is just calling create a User on API with the raw values. You can see it's expecting to error, but it's actually not erroring. On this onSubmit handler, we should be allowed to validate the values first, and then create the user on the API.

0:58 Your job is to basically find a way to type this so that it turns out to be accurate, and it implements this. Also, type this, this validate password function. Good luck

# Solution: Combine Type Helpers with Branded Types

[

github.com

https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/01-branded-types/04-reusable-valid-brand.solution.ts

](https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/01-branded-types/04-reusable-valid-brand.solution.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=a99ce2c7-9d25-4fcb-b552-310267f457a6&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0502-creating-reusable-validity-checks-with-branded-types-and-type-helpers-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=a99ce2c7-9d25-4fcb-b552-310267f457a6&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0502-creating-reusable-validity-checks-with-branded-types-and-type-helpers-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
Let's work through the solution for our problem.

## Typing the Valid Brand
The `Valid` type helper needs to be typed:

```typescript
type Valid<T> = unknown;
```

The `T` that is being passed into `Valid` should in turn be passed into `Brand`.

As a refresher, here's the source for our `Brand.ts` helper:

```typescript
declare const brand: unique symbol;

export type Brand<T, TBrand> = T & { [brand] : TBrand}
```

We probably don't need to make the `TBrand` generic since we'll just be passing in a single `Valid`.

So we can update the `Valid` type helper to call `Brand` with the `T` that's passed in along with a `"Valid"` string:

```typescript
type Valid<T> = Brand<T, "Valid">
```

Note that in this case it doesn't really matter what the second argument to `Brand` is as long as there's a difference between valid and invalid values.

## Updating Validation
With this change, the calls to `validatedValues` have errors because it still is taking raw `PasswordValues`.

To fix this we need to update the return type and value to use the `Valid` type helper:

```typescript
const validatePassword = (values: PasswordValues): Valid<PasswordValues> => {
  if (values.password !== values.confirmPassword) {
    throw new Error("Passwords do not match");
  }

  return values as Valid<PasswordValues>;
};
```

Now that we've updated `validatePassword`, the `createUserOnApi` function will also work properly.

## Checking the Tests
The first test where the `@ts-expect-error` directive tells TypeScript that we want there to be an error now works as expected.

Hovering over the call that passes non-validated `values` to `createUserOnApi` shows the following error message:

```typescript
// hovering over createUserOnApi(values) shows this error:

"Argument of type 'PasswordValues' is not assignable to parameter type `Valid<PasswordValues>`."
```

Using type helpers along with branded types provides a more reusable way of marking things as valid or invalid.

It also works at the object level instead of just the individual primitive level.

## Transcript

0:00 Let's work on the solution. We know that we're going to need to type this valid brand in some way. We think about type helpers and how they work. We're basically taking in that T, which is going to be the thing that we're going to type. We need to pass it into brand, probably. A good way to think about it is that we have our T brand here.

0:20 We probably don't need to make this T brand generic. We can just use a single brand which is going to be valid. Then we pass that T in. We should be able to call it with brand T, and then valid here. It doesn't really matter what this is as long as there's a difference between valid and invalid.

0:37 We got our valid brand here. What we can do is it's still erroring down here, that's because this validated values is just still raw password values. It hasn't been marked with valid yet. Here we can see that this now needs to be valid password values. Let's do that. Inside validate password here, we need to say "As valid password values."

1:05 Now what happens is when we get back these validated values, they are valid or marked as valid, which is super nice. Then this create a User on API works now. This error is properly working, too, which is really, really cool. We're getting this nice error because we haven't...Isn't that a lovely error message.

1:26 Argument of type password values is not assignable to parameter of type valid password. So good. This is a more reusable way of marking your things as valid or invalid. It works at the object level instead of at the individual primitive level, a string or number level. Really, really cool. A really nice way to get started with branded types.

# 6. Creating Validation Boundaries with Branded Types

[

github.com

https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/01-branded-types/05-currency-conversion.problem.ts

](https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/01-branded-types/05-currency-conversion.problem.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=7cc4e368-0e66-4418-9b15-9c9438f46816&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0601-creating-validation-boundaries-with-branded-types-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=7cc4e368-0e66-4418-9b15-9c9438f46816&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0601-creating-validation-boundaries-with-branded-types-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
Now let's go a little deeper.

Here are several functions that are used to handle a currency conversion request.

The `getConversionRateFromAPI` function takes in an `amount` and the `from` and `to` currency:

```typescript
const getConversionRateFromApi = async (
  amount: number,
  from: string,
  to: string,
) => {
  return Promise.resolve(amount * 0.82);
};
```

Then the converted amount is passed to `ensureUserCanConvert` along with `user`. The function returns an authorized `user` or will throw an error if the they try to convert more than they're allowed:

```typescript
const ensureUserCanConvert = (user: User, amount: number): User => {
  if (user.maxConversionAmount < amount) {
    throw new Error("User cannot convert currency");
  }

  return user;
};
```

Finally, the authorized user is passed into the `performConversion` function:

```typescript
// Mocks a function which actually performs the conversion
const performConversion = async (user: User, to: string, amount: number) => {};
```

There's quite a lot of logic being expressed here!

now the way I've done this is I've structured this inside a test where this is one example in implementation **\[11-12\]**.

## Challenge
Inside of the test are several scenarios that should cause errors due to missing steps. For example, the user should not be allowed to to call `performConversion` if they are not authorized.

You would probably want to have unit tests for this kind of behavior, but it's really nice to have it covered on the type level too!

Your challenge is to create brands with the `Brand` type helper, and add in the appropriate error behavior to the functions.

When you make the right changes, the `@ts-expect-error` red lines in the tests will go away.

This is a fun logic puzzle that really shows off the power of branded types!

## Transcript
0:00 Let's go deeper. This is quite a lot of logic that we're expressing here and we basically want to make sure that it's performing as it is on the type level. This idea here is we're handling a conversion request. This is like a fintech app where we're converting from one currency to another.

0:17 What we're doing first is we're saying, await getConversionRateFromApi. We're taking in the amount, the from currency and the to currency here. We're basically getting that converted amount back.

0:30 Then we're passing that converted amount to a ensureUserCanConvert, where we pass in the user and then we pass in the converted amount, and we get back an authorized user. Then we pass that authorized user into the performConversion function, which actually does all the converting.

0:47 The way I've done this is, I've structured this inside a test where this is one example in the implementation which is all sort of passing, and it should pass. What I want to do is actually, I've given you a couple of other example implementations where they've skipped a step.

1:02 In this one, they've skipped the getConversionRateFromApi. They've not actually converted the amount first and they're using just the raw number, which would be bad, would be real bad. Then, in this one, should error if you do not authorize the user first. Even worse.

1:19 Unauthorized users can just perform conversions. Terrible. You want to be able to do this on the type level. Of course, you would probably have a unit test to cover this, but having it on the type level is really, really nice too.

1:32 I've given you no brands in this exercise, but you do have access to the brand type helper. You're going to have to try to make this work by adding in the correct errors here by branding certain functions with what they're expected to receive.

1:47 This is a really cool logic puzzle and it shows off the power of branded types. Good luck.

# Solution: Using Branded Types to Validate Code Logic

[

github.com

https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/01-branded-types/05-currency-conversion.solution.ts

](https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/01-branded-types/05-currency-conversion.solution.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=e3071d05-8083-4c5b-afa5-c549d2de9aeb&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0602-creating-validation-boundaries-with-branded-types-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=e3071d05-8083-4c5b-afa5-c549d2de9aeb&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0602-creating-validation-boundaries-with-branded-types-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
There are a few steps involved in this solution.

## Ensure the User is Authorized
Because the user needs to be authorized before they can run a conversion, we'll start by creating an `AuthorizedUser` brand:

```typescript
type AuthorizedUser = Brand<User, "AuthorizedUser">;
```

Now the `ensureUserCanConvert` function needs to be updated to return the `AuthorizedUser` brand instead of a regular `User`:

```typescript
const ensureUserCanConvert = (
  user: User,
  amount: number,
): AuthorizedUser => {
  if (user.maxConversionAmount < amount) {
    throw new Error("User cannot convert currency");
  }

  return user as AuthorizedUser;
};
```

And also update the `performConversion` function:

```typescript
const performConversion = async (
  user: AuthorizedUser,
  to: string,
  amount: number,
) => {};
```

With this change, the `performConversion` test that skips over `ensureUserCanConvert` gives us the error we expect.

## Check the Currency Amount
We have the `AuthorizedUser` piece working, but we also need to check that the amount the user is trying to convert is allowed.

To do this, we'll create a `ConvertedAmount` brand using the brand helper:

```typescript
type ConvertedAmount = Brand<number, "ConvertedAmount">
```

Now we can update the `amount` in the `ensureUserCanConvert` and `performConversion` functions:

```typescript
const performConversion = async (
  user: AuthorizedUser,
  to: string,
  amount: ConvertedAmount,
) => {};

const ensureUserCanConvert = (
  user: User,
  amount: ConvertedAmount,
): AuthorizedUser => {
  if (user.maxConversionAmount < amount) {
    throw new Error("User cannot convert currency");
  }

  return user as AuthorizedUser;
};
```

### Fixing the API Call
A couple more errors have been fixed, but now that we have `ConvertedAmount` there's an error when calling `performConverstion`:

```typescript
Type number is not assignable to type of '"ConvertedAmount"'
```

We get this error because the `getConversionRateFromApi` function returns a Promise.

There are a few ways to type a Promise, but I'll use the `as` keyword:

```typescript
const getConversionRateFromApi = async (
  amount: number,
  from: string,
  to: string,
) => {
  return Promise.resolve((amount * 0.82) as ConvertedCurrency);
};
```

Now hovering over the call to `getConversionRateFromApi` shows the following:

```typescript
const getConversionRateFromApi: (amount: number, from: string, to: string) => Promise<ConvertedAmount>
```

## Wrapping Up
With all of these changes, our tests pass as expected.

It's really nice to be able to hover and see the types that our functions expect, especially when using the `@ts-expect-error` directive.

When you understand the types being used (and how to use them), reviewing a PR with these kinds of changes becomes much easier.

In an app like this financial tech app where your logic really has to be correct, I can't imagine anything better than branded types.

## Transcript
0:00 Let's start the solution by looking at the AuthorizedUser function. We want to make sure that this performConversion up here, it actually authorizes the user first. Let's create a branded type, so type AuthorizedUser = Brand<User, "AuthorizedUser">. That's cool. 0:22 0: 22 Now instead of this User type on the performConversion, which is the actual root of what's going on, we now accept an AuthorizeUser.

0:31 Yeah, this AuthorizeUser is still actually a user here. We need to make sure that this ensureUserCanConvert now returns an as AuthorizedUser. Hmm, this returned type is a little bit funky there. We can actually change that to AuthorizedUser.

0:51 This should now be passing here, because it should expect an error, because we have an AuthorizedUser before we're performing the conversion. Property brand is missing in type User. Argument of type User is not assignable to parameter of type AuthorizedUser. Perfecto.

1:08 From there then, we can handle the conversion request. We're getting our AuthorizedUser back. That's really good, but actually, we're supposed to be checking on a converted currency, on the converted amount that the user is checking. Let's create that now.

1:25 We have type ConvertedAmount = Brand. It's going to just be a number, because that's the max conversion amount. Yeah, cool. Let's call it ConvertedAmount. Then we have ConvertedAmount, let's stick that into handleConversionRequest...No, sorry. I'm looking at the wrong thing. PerformConversion. This is definitely going to be a ConvertedAmount.

1:52 We also want to make sure that the ensureUserCanConvert, we stick it there as well. Amount is ConvertedAmount. Now, let's see. Yeah, these are erroring properly here, because argument of type number is not assignable to parameter of type ConvertedAmount. That's because our getConversionRateFromApi is returning a Promise<number> instead of a convertedAmount, so let's now add that.

2:18 This one, return Promise.resolve, there are several ways you could annotate this. You could annotate it here, but it actually won't work, because this then will error, because it's not resolving properly. We could return this as Promise, which is a little bit ugly, but we could also stick it inside here. We could say as ConvertedAmount.

2:38 What this does then is it resolves and turns this Promise.resolve into a Promise.ConvertedAmount. That's pretty nice. Now everything is erroring as expected. We have our handleConversionRequest, which takes in the raw values, unvalidated values, converts them, and then this one errors, because this user is not authorized.

3:02 This one down here, if I remove these ts-expect-errors, this one errors because the amount has not been converted yet. God, these lovely error messages. Then finally, you have a ConvertedAmount, AuthorizedUser, and then you can perform the conversion based on those values.

3:16 This is so, so nice. It makes this PR pretty easy to review is you understand these types, because you can just look at this and make sure it's the right type, look at this and make sure it's been authorized, and then ensure that on the type level, the logic is behaving as you expect.

3:36 On an app like this, a financial tech app where you want to make sure the logic is bang on, I couldn't imagine anything better than this.

# 7. Using Index Signatures with Branded Types

[

github.com

https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/01-branded-types/06-index-signatures.problem.ts

](https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/01-branded-types/06-index-signatures.problem.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=f8eb11fb-61ea-404b-ab92-43aff73a9fa8&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0701-using-index-signatures-with-branded-types-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=f8eb11fb-61ea-404b-ab92-43aff73a9fa8&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0701-using-index-signatures-with-branded-types-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
In this exercise, we're going to look at a really interesting property of branded types when they're used with index signatures.

Here we have our `User` and `Post` interfaces, along with `PostId` and `UserId` branded types:

```typescript
type PostId = Brand<string, "PostId">;
type UserId = Brand<string, "UserId">;

interface User {
  id: UserId;
  name: string;
}

interface Post {
  id: PostId;
  title: string;
}
```

Down in the tests we create entries in our database based on `db[postId]` and `db[userId]`:

```typescript
const postId = "post_1" as PostId;
const userId = "user_1" as UserId;

db[postId] = {
  id: postId,
  title: "Hello world",
};

db[userId] = {
  id: userId,
  name: "Miles",
};
```

But there's a problem!

With the current implementation of `db`, we are unable to directly get a user or post by id:

```typescript
const db: Record<string, User | Post> = {};
```

Whether we want a `UserId` or `PostId`, the result will be `User | Post`:

```typescript
// hovering over result
const result = db['123123']

// displays
const result: User | Post
```

## Challenge
Your challenge is to change the type definition of `db` so that it functions as expected.

To do this, you'll want to implement an index signature or two.

Hint: Check out [the index signature docs](https://www.typescriptlang.org/docs/handbook/2/objects.html#index-signatures) for a refresher!

## Transcript
0:00 In this exercise, we're going to look at a really interesting property of branded types when they're used with index signatures. We have our user and we have our post here, PostID and UserID. What we're doing here is we have a database here where we have user or post.

0:14 We are creating a bunch of entries in our database based on DB PostID and DB UserID. Post and user are basically supposed to be, you're supposed to be able to get post when you access it via a PostID, and you're supposed to get user when you access it via a UserID.

0:32 They're actually returning a union of both of them. This is because this type signature is like a little interesting here. We've got a record string, and we've got a user or post being returned from that.

0:45 This means that whatever we access from this database, DB for instance 123, then the result of this is going to be post or user. Doesn't matter if we mark this as UserID or mark it as PostID. This is the idea of this exercise.

1:01 You have to come up with a type definition for this line, that means that when we access it with a UserID, then we're going to get back a user. When we access it via PostID, we're going to get back a post. That's the goal. Good luck.

# Solution: Indexing an Object with Branded Types

[

github.com

https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/01-branded-types/06-index-signatures.solution.ts

](https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/01-branded-types/06-index-signatures.solution.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=3f835c10-e433-4855-87fd-2332ebc96930&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0702-using-index-signatures-with-branded-types-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=3f835c10-e433-4855-87fd-2332ebc96930&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0702-using-index-signatures-with-branded-types-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
The solution here is pretty weird and teaches you something about the way that TypeScript understands index signatures.

The first thing I'll do is mark `db` as `unknown` because that's the type we want to change:

```typescript
const db: unknown = {};
```

Usually if we would index into an object using something like this:

```typescript
const db: { [index: string]: Post; }
```

But in this case since we have a `PostId`, we can use that as an index. The same goes for `UserId` as well:

```typescript
const db: {
  [postId: PostId]: Post;
  [userId: UserId]: User;
}
```

Now we have two index signatures with two different brands that return two different things!

Adding this little bit of logic into your index signatures is super cool. It saves you from having to do manual checking to see what an id belongs to, while ensuring we get back what we expect out based on what we pass in.

## Alternative Syntax

There are a couple other ways to write the solution.

This on uses `&` to split the types:

```typescript
const db: {
  [postId: PostId]: Post;
} & {
  [userId: UserId]: User;
} = {}
```

And this one uses two `Record`s:

```typescript
const db: Record<PostId, Post> & Record<UserId, User>
```

## Transcript
0:00 The solution here is pretty weird, and teaches you something about the way that TypeScript understands index signatures. The way to do this is we are going to...I marked this as unknown, because this is the type that we want to change. We want make it so, when you access via a post ID, you get a post. Now, the way that we would do that, usually, is we would say index, string, for instance, returns a post.

0:23 Now, whenever you access it via anything, you're going to get back a post. The thing that we had before was basically post or user, like this. This is essentially like a way of expressing record string post user. Let's just do that. Record string, post or user, is exactly the same syntactically as the other one. This is just a little bit of sugar syntax over the top, or a type helper over the top.

0:50 What we actually want is we want to use post ID in this slot. You can do that. Now, when you have an index post ID, you get back a post. Now, DB post ID is this, and post is actually going to be typed as post here. We want to do the same with user. It turns out, we can actually add. If I change this to post ID, I'll change this to user ID. User ID, we can actually stick that in there.

1:18 How cool is that? Two index signatures with two different brands, returning two different things. Now, user is accessed via a user ID. Super cool. I'm pretty sure we could do this with this method as well, if we fancied it. I think we could do two records here, so record, user ID, user. I've not actually checked this, just going off the cuff here.

1:44 We could use an intersection here, so if you found this solution, then this, I think, works really nicely as well. This would be a post. Yeah, this works, too. Yeah, it's really cool that you can build in this little bit of logic into your index signatures and into your databases here, because it removes a little bit of checking, basically, when you need to manually check which one is a user or which one is a post.

2:09 Very, very cool. Again, I've used this in production before. It means that, if you stick something in here and add things to this database, you can be sure what you're getting out, based on what you pass in.

# Resources

[

basarat.gitbook.io

https://basarat.gitbook.io/typescript/main-1/nominaltyping

](https://basarat.gitbook.io/typescript/main-1/nominaltyping)

[

codemix.com

https://codemix.com/opaque-types-in-javascript/

](https://codemix.com/opaque-types-in-javascript/)

[

www.typescriptlang.org

https://www.typescriptlang.org/docs/handbook/symbols.html#unique-symbol

](https://www.typescriptlang.org/docs/handbook/symbols.html#unique-symbol)

[

www.totaltypescript.com

https://www.totaltypescript.com/workshops/type-transformations/type-helpers/introducing-type-helpers

](https://www.totaltypescript.com/workshops/type-transformations/type-helpers/introducing-type-helpers)

[

www.typescriptlang.org

https://www.typescriptlang.org/docs/handbook/2/objects.html#index-signatures

](https://www.typescriptlang.org/docs/handbook/2/objects.html#index-signatures)

# (b) Globals



# 1. TypeScript's Global Scope

[

github.com

https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/02-globals/07-add-function-to-global-scope.problem.ts

](https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/02-globals/07-add-function-to-global-scope.problem.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=4fb0e308-15fb-4a60-a468-d62b62b565e4&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0101-typescript-global-scope-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=4fb0e308-15fb-4a60-a468-d62b62b565e4&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0101-typescript-global-scope-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
In this exercise we're going to be typing things in the global scope.

Here we have a `globalThis` that is being assigned to `myFunc`, which is a function that just returns a boolean. We're also assigning it `myVar` as `1`:

```typescript
globalThis.myFunc = () => true;
globalThis.myVar = 1;
```

Inside the tests we `expect(myFunc()).toBe(true)` and `myVar` to be type of `number`:

With this implementation we get errors messages that `myFunc` and `myVar` can't be found.

```typescript
it("Should let you call myFunc without it being imported", () => {
  expect(myFunc()).toBe(true);
  type test1 = Expect<Equal<typeof myFunc, () => boolean>>;
});

it("Should let you access myVar without it being imported", () => {
  expect(myVar).toBe(1);
  type test1 = Expect<Equal<typeof myVar, number>>;
});
```

## Challenge
Your challenge is to find a way to put the `globalThis` into the global scope so our tests pass.

Here are a few clues to help you get going:

You will need use `declare global {}`.

You'll need to use the `function` keyword to add `myFunc` to the global scope, and the `var` keyword to add `myVar`:

```typescript
function myFunc(): boolean
var myVar: number
```

Read through the [global declarations section](https://www.typescriptlang.org/docs/handbook/declaration-files/by-example.html#global-variables) of the TypeScript Docs for reference.

## Transcript
0:00 In this exercise, we're going to be typing things in the global scope. Here we have a globalThis which we're assigning myFunc to. This myFunc is going to be a function that just returns a Boolean there.

0:13 We're also assigning myVar as a one here and we're expecting this to be type of number. We've got expect myFunc to be 1, so we're expecting to be able to call this, but it says cannot find name myFunc and down here cannot find name myVar either.

0:29 We need to find some way with TypeScript to put this in the global scope so we can test it out. I have given you a bit of a ramp on here. We've got some syntax here that you can google, we've got some stuff here that you can look at, and we've got some stuff here you can use.

0:43 That's because this stuff is actually really hard to find in the TypeScript docs and this should give you a little bit of a sense of what's going on there. We've got here type of myFunc is expected to be this type and type of myVar is expected to be this type.

0:58 I think that's all the info I'm going to give you. Good luck.

# Solution: Add a Function to the Global Scope

[

github.com

https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/02-globals/07-add-function-to-global-scope.solution.ts

](https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/02-globals/07-add-function-to-global-scope.solution.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=e54cc716-afee-445f-88d3-5ed7ea624d75&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0102-typescript-global-scope-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=e54cc716-afee-445f-88d3-5ed7ea624d75&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0102-typescript-global-scope-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
Before we continue the solution, it's important to note that there are types inside the global scope that affect what globals can be accessed.

In addition to being able to declare our own globals, this is also configurable from `tsconfig.json` inside of the `lib` config option. This allows specifying global libraries that get bundled into the global scope.

By default, it includes the DOM. However, if DOM is not included, certain things will not be allowed. For example, `document` will not be in scope.

To include `DOM`, change the lib compiler option in `tsconfig.json`:

```typescript
...
"target": "es2020",
"lib": ["DOM"],
...
```

If you don't specify `lib` in `tsconfig.json`, `DOM` is included by default.

## Manually Declaring Globals

The first step in the solution is to use `declare global`:

```typescript
declare global {}
```

Now inside the declare global scope, things can be added to the global scope.

To add functions, the `function` keyword must be used with a slightly funky syntax.

Since `mySolutionFunc` returns a boolean, the syntax looks like this:

```typescript
declare global {
  function mySolutionFunc(): boolean;
}
```

You can't add the implementation inside the `declare global` scope.

Instead, you type the function as if it were a function overload.

To add `mySolutionVar`, you can't use `const`.

Instead, you must use `var`.

This is an arcane syntax that TypeScript has not changed!

Similarly to typing the function, you set the type instead of the actual variable:

```typescript
declare global {
  function mySolutionFunc(): boolean;
  var mySolutionVar: number;
}
```

It's also possible to add `interface`s inside of the global scope.

With these changes, our tests now pass.

We can also use `mySolutionFunc` and `myVar` in different files.

## Globals are Generally Bad
In this section we will look at how to put globals in different places and how to attach them to existing things.

It is important to note that globals are generally considered bad. They should be avoided if possible.

However, if they must be used, `declare global` is the way to do it.

## Transcript
0:00 The way that we're going to build out this solution is we first use declare global. Inside a declare global scope here, this basically gives us access to the global scope that TypeScript can put things in. There are types inside the global scope that affects what globals you can access.

0:20 For instance, you will have access to document if, inside your tsconfig, you have DOM inside wherever it is. In fact, where is lib here? Lib is being expressed somewhere. Yeah, lib here. By default, lib is a config option that allows you to specify global libraries that sort of get bundled into the global scope here. This lib, by default it's this.

0:51 By default, it includes the DOM, but if you put it to this, then you notice that certain things are not going to be allowed. If we go to document, document is now not in scope. Try changing the lib compiler option to include DOM. When we do include that, then we end up with -- tsconfig.json -- a bunch of stuff being put in.

1:13 I'll stick DOM in there. Now, it's working. We have our document in the global scope. I'll look at that more in a future lesson, but this should give you a sense that there's stuff going on at the global level in TypeScript that I maybe wasn't aware of.

1:28 Inside this declare global scope, we can add things to this global scope. There's some funky syntax for adding functions here. You have to add it using the function keyword. We can say function, let's say it doesn't do anything, and we'll call it function mySolutionFunc. It returns a Boolean here.

1:48 You can't actually add the implementation here. If I go like const whatever equals this, it thinks you're like returning...Sorry, I can't do this at all. It looks like I'm able to implement something here, but const initializer in an ambient context -- this is an ambient context in this global area here -- must be either string or numeric literal. What?

2:11 You can't add the implementation here. What you can do is return a Boolean. You're typing the function as if it were a function overload. This function now works. We've got mySolutionFunc. We can call it. We get autocomplete for it too -- mySolutionFunc. Because it's a global, we don't even need to implement it here. It could be implemented in some library we're importing via CDN or something, so that's useful.

2:39 The other thing too is we've got this mySolutionVar. Now, if we try to do the same thing, if we try to do let mySolutionVar is going to be a number, for instance, weirdly, this doesn't work. With const it also doesn't work. Can we use declare const here? No, can't use declare inside here. What's the solution? To use var inside here, a bit of arcane syntax that TypeScript never changed.

3:03 The way to get something inside a declare global in an ambient context to pull throughout the entire app is to use var. Fine. We could also use var with mySolutionFunc I'm pretty sure. We'd go mySolutionFunc is this, which returns Boolean, which is perfectly fine too, but the function syntax is maybe more useful to know because you can express function overloads inside here.

3:26 Inside a declare global, you can add all sorts of stuff. You can add interfaces, so interface whatever. Then this interface, we can then say const yeah is Whatever and don't need to import it from anywhere. Crucially, too, we can then use this stuff in different files. If I go back to the problem file, then you'll see that mySolutionFunc is available here.

3:49 It doesn't respect file order or where this is declared. It just puts it into the global scope and lets you play with things. Of course, globals are bad. You maybe have use cases for using globals but, by default, you should be thinking globals are bad. But, if you can't avoid globals, and you have to type them, then this is the way to do it, by adding a declare global in there.

4:16 I'm going to show you various things inside this
section that are going to show you how to put globals on different
places, how to attach them to various things that you already know. This
is going to be a cool section, really useful for understanding globals.
If you have to work with them, this is how you type [them.pe](http://them.pe) them.

# 2. Add Functionality to Existing Global Interfaces

[

github.com

https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/02-globals/08-add-to-window.problem.ts

](https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/02-globals/08-add-to-window.problem.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=8b27f2ac-9edf-48a7-9285-b0b98f04ed7f&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0201-add-functionality-to-existing-global-interfaces-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=8b27f2ac-9edf-48a7-9285-b0b98f04ed7f&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0201-add-functionality-to-existing-global-interfaces-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
In this exercise, we're going to modify something on the `window` interface.

Here we have a `window.makeGreeting` function:

```typescript
window.makeGreeting = () => "Hello!";
```

The function currently returns `"Hello!"`, but it needs to be updated to return any `string`.

As seen in the tests, we want the function to be available on the `window` interface, but not available on `globalThis`:

```typescript
it("Should let you call makeGreeting from the window object", () => {
  expect(window.makeGreeting()).toBe("Hello, world!");

  type test1 = Expect<Equal<typeof window.makeGreeting, () => string>>;
});

it("Should not be available on globalThis", () => {
  expect(
    // @ts-expect-error
    globalThis.makeGreeting,
  ).toBe(undefined);
});
```

## Challenge
Using `declare global`, modify the `Window` interface to add the `makeGreeting` function.

This requires knowledge of [declaration merging](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#handbook-content), a concept that has not been covered yet but is in [the TypeScript Docs](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#handbook-content).

Check out the docs, and remember to target the correct interface with `declare global`.

## Transcript
0:00 In this exercise, we're going to modify something on the window interface. We've got this window.makeGreeting is this function that returns hello. We just want it to basically represent type of window.makeGreeting. It should be just a function that returns a string. That's what we want.

0:18 We don't want it to be available on the global this. We just want it to be available on the window. How on earth do we type this? We're going to need declare global again. Then you're going to somehow need to modify the upper-case window interface to add a makeGreeting function.

0:37 You'll need to know some concepts of this. The first one is going to be declaration merging, which is something we haven't covered yet. There are some docs on it. I'll provide a link in the section resources. You might be able to just figure it out on your own because I've given you enough breadcrumbs here I think.

0:56 This looks complicated. Make sure that you're targeting the right interface using declare global. Good luck.

# Solution: Use Declaration Merging to Add Functionality to the Global Window

[

github.com

https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/02-globals/08-add-to-window.solution.ts

](https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/02-globals/08-add-to-window.solution.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=db43f52f-69db-4817-a097-2351cadcba26&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0202-add-functionality-to-existing-global-interfaces-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=db43f52f-69db-4817-a097-2351cadcba26&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0202-add-functionality-to-existing-global-interfaces-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
Let's start by examining the `window`.

When hovering over `window.makeGreetingSolution`, we can see information about its type:

```typescript
// hovering over window
var window: Window & typeof globalThis
```

Using VS Code's Go to definition feature, we get taken over to `lib.dom.d.ts` and ends up inside of a `declare var`. You can also [view this file on GitHub](https://github.com/microsoft/TypeScript/blob/main/lib/lib.dom.d.ts#L17922).

Everything inside of a `.d.ts` file is automatically put in the global ambient context.

That means that we could create a new `example.d.ts` file that contains an interface called `Cool` with a `wow` property of `true`:

```typescript
// inside example.d.ts
interface Cool {
  wow: true
}
```

We will be able to access our `Cool` interface in our project file:

```typescript
// inside 08-solution.ts
const example: Cool = {
  wow: true,
}
```

Back in `lib.dom.d.ts` we can see that `Window` has [an ,](https://github.com/microsoft/TypeScript/blob/main/lib/lib.dom.d.ts#L16780)[`interface`](https://github.com/microsoft/TypeScript/blob/main/lib/lib.dom.d.ts#L16780) that contains a huge amount of stuff:

```typescript
// line 16779
/** A window containing a DOM document; the document property points to the DOM document loaded in that window. */
interface Window extends EventTarget...
```

Because everything that's inside of a `.d.ts` is globally available and `Window` is inside of `lib.dom.d.ts`, that means anything added to the `Window` interface would also be available.

However, that's not really a feasible solution because `lib.dom.d.ts` is not part of the project, and tampering with it could mess everything up.

We need a better way of extending an existing global interface.

## Introducing Declaration Merging
Before we get to the solution, let's look at an example.

Back in the project, let's we create an interface `User`, with a property `id: string`:

```typescript
interface User {
  id: string;
}
```

Then below it create another `User` interface with a `name: string`:

```typescript
interface User {
  name: string;
}
```

Now if we create a variable that uses the `User` interface, it will require that we provide an `id` and a `name`:

```typescript
// hovering shows `id` and `name` are required
const user: User = {}
```

If we rename the second `User` interface to `User2`, only the `id` will be required for the `user` variable.

When multiple interfaces are declared with the same name, their properties will all be required.

This is called declaration merging.

Note that declaration merging does not work with types.

If we try the same `User` example but make them types, TypeScript will error and yell at us for using a duplicate identifier.

When interfaces are inside of the global scope, we can use declaration merging to patch different interface properties together.

If you got stuck solving this challenge, give it another shot with this newfound knowledge!

## Solving the Challenge
The first step to solving the challenge is to use `declare global {}`.

Inside of it, we'll take advantage of declaration merging by declaring a `Window` interface, which will contain the `makeGreetingSolution` function:

```typescript
declare global {
  interface Window {
    makeGreetingSolution: () => string;
  }
}
```

This means that `makeGreetingSolution` is now being stuffed into the globally available `Window` without being part of the `globalThis`.

Declaration merging allows us to add things to a globally ambient context without having to edit a `.d.ts` file.

## Transcript
0:01 The solution here is we know we're going to need a declare global first of all. The Window interface here, or the thing that is representing this Window, we can hover over it, and if we do a go to definition, then we're going to see that we go into lib.dom.d.ts, and we're inside declare var.

0:24 d.ts files automatically, whatever they do, they automatically put all their stuff inside the global ambient context. That means that if we add in a random file into here, let's say we go example.d.ts, then if we add an interface Cool or something which has a wow 1 on it, then if we go to where we were, then we can actually just access that.

0:48 We can say const wow is...God, already can't remember what I had here. Wow is Cool, and this is going to error, because it doesn't match up to the Cool interface property. Wow is missing, wow 1. I should really name my stuff more sensible things. As you can see, this interface, .d.ts files automatically put their stuff in the global scope. Let me delete that one so it doesn't us any issues.

1:13 Then inside here, this Window, if we have a look at it, we've got this Window. You can see if we do a go to definition, we have two bits on it. We have an interface and we also have a declare var. The interface is what we're interested in, because there's a property of interface, this is a huge, huge piece of stuff here, and this is inside our lib.dom.d.ts. It means that it's available globally.

1:41 Our Window then...I'm sorry. I think I lost it for a second. Window is a huge, huge file. What we can do is we need to add a property to this. If I were to just modify this file, which I can do, I can just go back to here and I can say I just want to add makeGreetingSolution onto it, which is function that returns a string.

2:08 Now, if I remove this, you can see that it actually works, because I've added this thing onto there. Except this isn't really an option, because this is just a local file on my machine. It's not going to be committed to your project. This isn't code inside your project. You really should not be editing this file, because it'll mess everything up. Let's just ignore the fact that I did that.

2:29 We need to find a way to modify this interface without actually touching the file. The way to do that is inside declare global. In fact, let me show you one thing first.

2:39 We have this interface, let's say interface -- I'm going to choose a proper name for it -- interface User, but we have an id string. Let's say we just redeclare interface User down here with name string. Now, if we say const user is a User here, then what this is going to do is it's going to require id and name.

3:03 This is what's called declaration merging. If I give this a different name, then it's only going to require id from name, because interfaces with the same name in the same scope get merged. What? Really complicated. This doesn't happen with types too.

3:20 If you say type User is this, then it's actually going to yell at you, because you've got a duplicate identifier, but interfaces, especially when they're inside the global scope, can be used to patch together different things which all need to add into the global scope.

3:39 That's what it's called, declaration merging. That's why this behavior happens, is because we need to stuff things into the same object.

3:48 The way we do it and the way we get back to this kind of window.makeGreetingSolution is we say we have our interface Window here, which we know it's an uppercase Window, because it's expressed here, this Window here. We can add makeGreetingSolution to that interface. Let's say returns a string.

4:13 This is really cool, because it means that it doesn't get put on the globalThis. It gets stuffed just into the Window interface. What it means is you just get this really nice...If you have something on the window that isn't being expressed anywhere, this is the way to do it.

4:31 Hopefully, that makes sense. You're inside a global ambient context, just like a .d.ts file, you're declaration merging with the Window interface, and you're adding a function to it.

# 3. Add Types to Properties of Global Namespaced Interfaces

[

github.com

https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/02-globals/09-adding-to-process-env.problem.ts

](https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/02-globals/09-adding-to-process-env.problem.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=ae6bfe40-e611-43a7-ae2c-821d76ea7d1f&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0301-add-types-to-properties-of-global-namespaced-interfaces-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=ae6bfe40-e611-43a7-ae2c-821d76ea7d1f&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0301-add-types-to-properties-of-global-namespaced-interfaces-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
In this exercise, we will be typing the `process.env` variable from NodeJS.

Adding types for `process.env` will allow us to get autocompletion for any environment variables that are set.

## Challenge
Your challenge is to use `declare global` and add a `MY_ENV_VAR` property to the `ProcessEnv` interface.

You'll know it works when the tests below pass:

```typescript
process.env.MY_ENV_VAR = "Hello, world!";

it("Should be declared as a string", () => {
  expect(process.env.MY_ENV_VAR).toEqual("Hello, world!");
});

it("Should NOT have undefined in the type", () => {
  const myVar = process.env.MY_ENV_VAR;
  type tests = [Expect<Equal<typeof myVar, string>>];
});
```

This is our first look at namespaces, so check out [the TypeScript Docs](https://www.typescriptlang.org/docs/handbook/namespaces.html#handbook-content) for help.

## Transcript
0:00 In this exercise, we're going to be typing process.env. Process.env is basically taken from types node. What this is doing is we've got this thing here called nodeJS.process and what we're trying to do is basically get autocomplete for the environment variables that are on there.

0:20 You can see that my solution environment variable is coming in to spoil the party, showing that I do have something attached to the global there. We're expecting process.env.MY\_ENV\_VAR to equal hello, world, which we're assigning there.

0:32 We're also expecting it to be type of string not type of string or undefined. We're going to need declare global again. You're going to need to use the NodeJS namespace and inside the NodeJS namespace, there's a ProcessEnv interface.

0:48 This is our first chance looking at namespaces and I'm going to leave it there. You can check out the documentation for namespace and see how it works, but hopefully you should be able to intuit your way there. It's not too tricky this one.

# Solution: Typing process.env in the NodeJS Namespace

[

github.com

https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/02-globals/09-adding-to-process-env.solution.ts

](https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/02-globals/09-adding-to-process-env.solution.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=ba558f11-cbc8-41f8-ab34-9f321adee4b6&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0302-add-types-to-properties-of-global-namespaced-interfaces-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=ba558f11-cbc8-41f8-ab34-9f321adee4b6&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0302-add-types-to-properties-of-global-namespaced-interfaces-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
Like before, the first step is to set up our `declare global`:

```typescript
declare global {}
```

In order to decide what to put inside, let's examine `process`. Hovering over it shows us that it is `NodeJS.ProcessEnv`:

```typescript
// hovering over `process`
process.env.MY_SOLUTION_ENV_VAR = "Hello, world!";

// shows
(property) NodeJS.Process.env: NodeJS.ProcessEnv
```

It might seem like this is the way go:

```typescript
declare global {
  interface ProcessEnv {
    MY_SOLUTION_ENV_VAR: string;
  }
}
```

However, this won't work because the `process.d.ts` file is not by default included in the global namespace, and it's not imported by `lib` either.

In fact, it's actually imported and added to the global context by via `@types/node` in the `package.json` `devDependencies`:

```typescript
// inside of package.json
"devDependencies": {
  "@types/node": "^18.6.5",
  ...
```

Anything in `package.json` with `@types` will be added to the global ambient context. Notice that we have types for Express, Lodash, and React configured as well.

## Examining the NodeJS Namespace

Use VS Code to jump to `process`, or [view the source on GitHub](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/node/process.d.ts).

Looking at `@types/node/process.d.ts` inside of `node_modules`, we have a `global` that acts like a `declare global` and a `namespace NodeJS`:

```typescript
// inside `process.d.ts`
global {
    var process: NodeJS.Process;
    namespace NodeJS {
      ...
```

Everything inside this namespace sits in the global scope, but under the NodeJS namespace. This allows multiple libraries to exist without conflicting with each other, even if they have the same declarations.

## The Solution
In order to solve the challenge, we need to express the `NodeJS` namespace inside of the `declare global`. Then we can declare the `ProcessEnv` interface along with our variable to take advantage of declaration merging:

```typescript
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MY_SOLUTION_ENV_VAR: string;
    }
  }
}
```

Note that you have to match the namespace exactly, otherwise it will just declare a new one!

In order to access interfaces inside of namespaces, you use `namespace.interface` like so:

```typescript
const whatever: NodeJS.ProcessEnv
```

Namespaces are mostly used with Node, but they are used in various other libraries that put things into the global.

I use this solution in pretty much all of my projects!

## Transcript
0:00 Solution here, we know we're going to need access to that ambient context, declare global. We know that process.env here is NodeJS.ProcessEnv. That's interesting. If we try to just say interface ProcessEnv here, and we're going to add my solution environment variable here, then you notice that this doesn't seem to work.

0:24 We're inside a global context. This one is NodeJS.ProcessEnv. We've got the interface with the same name. Why isn't it working? If we look at process here, then inside here, we've got process.d.ts, which is coming from types/node. By the way, this is not by default included in the global namespace. It's not imported by lib either.

0:48 It's imported via, where is it, types/node just here, which is in devDependencies. Whenever you have @types here, then it gets put into the global ambient context. This is how we're able to get types for express, types for lodash, types for React, which don't ship with .d.ts files in their node modules.

1:09 What we've got here is inside declare module process, that's interesting, inside here, we've got a global which acts like a declare global. We've got namespace NodeJS. Namespace NodeJS, what is that doing? Everything inside this namespace sits in the global scope, but it sits in the global scope under that namespace.

1:36 This means that if you've got lots of libraries that are all conflicting with each other, maybe they have the same names, then they're not stepping on each other's declarations. This gives you a way to say, "OK, I own the namespace NodeJS, that's mine, you can't overwrite inside it," except you can.

1:57 What you can do is you can express this namespace NodeJS. Inside there, stick the interface ProcessEnv, and you get to declaration merge them. What it does is it just puts it at another level of nesting. You have to name this perfectly. If you go NodeJs with a lowercase s, then it doesn't work. It just declares another namespace with NodeJS. You can use NodeJS here.

2:24 What we can do is if we want to use this interface, we can say const whatever is NodeJS.ProcessEnv. That's how you access interfaces that are inside a namespace. You can't do this because it cannot find name ProcessEnv. Whereas if we say NodeJS.ProcessEnv, then we can do it.

2:46 Namespaces, node is the main place that they're used, but they're also used in various other external libraries that put things into the global. This is a solution that I use in pretty much all my applications, really. Again, you can't use type ProcessEnv because that redeclares it and you get this duplicate identifier.

3:07 Duplicate identifier coming from where? What are you talking about? The duplicate identifier is way off in the NodeJS namespace somewhere. If we take a look at this, in fact, here, we can't even pull that in, interface means you can declaration merge that. This is a way to type ProcessEnv variables.

# 4. Colocating Types for Global Interfaces

[

github.com

https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/02-globals/10-event-dispatcher.problem.1.ts

](https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/02-globals/10-event-dispatcher.problem.1.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=8627337e-a835-4768-bf4f-1864d9a0a696&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0401-colocating-types-for-global-interfaces-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=8627337e-a835-4768-bf4f-1864d9a0a696&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0401-colocating-types-for-global-interfaces-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
This exercise shows you some cool stuff you can do with `declare global` in your application.

There are multiple problem files here!

## Inside the Problem 1 File
In the first problem file we have a `declare global` with a `DispatchableEvent` interface that has a `LOG_IN` property with `username` and `password`.

There's also a `UnionOfDispatchableEvents` type where we take the each of the keys of DispatchableEvents and turn them into a discriminated union (check out the Type Transformations lessons for more on that syntax).

Here's the code all together:

```typescript
declare global {
  interface DispatchableEvent {
    LOG_IN: {
      username: string;
      password: string;
    };
  }

  /**
   * This type converts the DispatchableEvent
   * interface into a union:
   *
   * { type: 'LOG_IN'; username: string; password: string; }
   */
  type UnionOfDispatchableEvents = {
    [K in keyof DispatchableEvent]: {
      type: K;
    } & DispatchableEvent[K];
  }[keyof DispatchableEvent];
}
```

The problem file also includes a `dispatchEvent` function that is called with an `event` of `UnionOfDispatchableEvents`:

```typescript
const dispatchEvent = (event: UnionOfDispatchableEvents) => {
  // Imagine that this function dispatches this event
  // to a global handler
};
```

Hovering over `UnionOfDispatchableEvents` shows us the following:

```typescript
type UnionOfDispatchableEvents = ({
  type: "LOG_IN";
} & {
  username: string;
  password: string;
}) | ({
  type: "LOG_IN_2";
} & {
  username2: string;
  password2: string;
})
```

## Inside the Problem 2 File
Over in the other problem file is a `handler` that acts similarly to a Redux reducer.

It takes in a `UnionOfDispatchableEvents`, but `"LOG_OUT"` is not on there.

## Challenge
Your challenge is to update the code inside of the Problem 2 file so that `LOG_OUT` and `UPDATE_USERNAME` are added to the the `UnionOfDispatchableEvents`.

To solve this you'll need to use `declare global` and knowledge of declaration merging.

## Transcript
0:00 In this exercise, I'm going to be showing you the cool things you can use declare global for in your application, not interfacing with external library code. Here we have a declare global where we have an interface dispatchable event. We have this login property on it with a username and password.

0:17 Down here we have -- this is inside the declare global as well, by the way, inside the ambient context -- we have a union of dispatchable events where we take K in key of dispatchable events. We basically grab the K, grab the key, the type here, and we turn it into a discriminated union.

0:35 You'd be able to learn about this syntax in the type transformations module. Now, what happens here is you end up with a union of dispatchable events. If I duplicate this, if I say, "Login 2," for instance, then we should be able to have a username 2 and a password 2 on here. That will be added to the union.

0:55 You can see the first member of the union here -- login. Then you have login 2 down here. This means that when you call dispatch event, you're going to get type, login 1 and login 2, shown up. Let me remove that briefly. What I want to be able to do is I want to be able to...from inside this file, I have this handler.

1:17 This handler is a reducer, let's say. It's taking in a union of dispatchable events, but logout is not on there. This logout, we should be able to be able to pass that into our handler. We should also be able to pass in "Update username," too. Except I want to be able to do it from within this file.

1:39 I want to say, "I have my handler co-located with the events that I expect. Can I do it from within this file?" You can. You'll need a declare global. You'll need to understand all of the stuff about ambient context and declaration merging that we've learned already. You should be able to figure it out from there. Good luck.

# Solution: Solving the Colocation Problem with Globals

[

github.com

https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/02-globals/10-event-dispatcher.solution.2.ts

](https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/02-globals/10-event-dispatcher.solution.2.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=0ef1152e-2569-4672-9eed-0ba9660943b3&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0402-colocating-types-for-global-interfaces-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=0ef1152e-2569-4672-9eed-0ba9660943b3&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0402-colocating-types-for-global-interfaces-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solving the Colocation Problem
The problem we're solving in this application code is colocation.

We want a pattern that we can copy and paste over several files in our application, while still making sure that we're declaring the types close to where the implementation is.

You could just declare this in a single interface and import it to all the places that you need it. However this isn't colocation. It's more like using a global where you can't really be sure if a certain type is used or not.

This solution solves the colocation problem. Even though things are being added inside of a global scope, deleting one of the files would mean the types disappear as well.

So, by using a global in these files, we're actually able to get a more modular approach to our types.

## Create the Declaration
Because we're trying to modify something in an ambient context, we need to add a `declare global` to the problem 2 file.

First let's add `LOG_OUT` to a `DispatchableEvent` interface that matches the one in the first problem file.

```typescript
declare global {
  interface DispatchableEvent {
    LOG_OUT: {};
  }
}
```

Now when hovering on `UnionOfDispatchableEvents` we'll see both `LOG_IN` and `LOG_OUT`.

We can add `UPDATE_USERNAME` as well, with a `username: string` on the property:

```typescript
declare global {
  interface DispatchableEvent {
    LOG_OUT: {};
    UPDATE_USERNAME: {
      username: string;
    }
  }
}
```

Back in the Problem 1 file, we can see that autocomplete works for `LOG_OUT` and `UPDATE_USERNAME` from the other file.

This is a combination of declaration merging and declaring global.

Having this kind of global interface that you can append to gives you a nice solution for certain problems.

## Declaring Globals for a Library
This approach also works well in a library setting.

When you use `declare global` inside your library, it means that users can override an interface that you've declared in the global.

This provides a way of passing down information or letting users pass your library information.

Think about `global` as a way to communicate between files that don't necessarily import or export to each other.

When you use it like this, you can actually end up with a really nice API.

It's a tool worth having in your toolbox.

## Transcript
0:01 Our plan here is we want to change this file over here in order to add probably a declare global to it. We're definitely going to need one of those, because we're trying to modify something in an ambient context. We are trying to add log out and update username to it. What we're going to do is I'm just going to copy and paste this definition in there to make sure I don't get the spelling wrong.

0:21 Because if I do get the spelling wrong, this whole thing is just going to fall apart. We know we don't need to declare log in again, but we do need to declare log out. Log out here, what that means is that if I hover over this, then we can see that it's type log in or type log out, with some stuff added to the first member of the union. That's pretty cool.

0:44 Now what we get here is when we autocomplete inside the handler, we get log in or log out. Interesting. How do we add this update username? We can add update username here, too, with the username string on the property there. Very cool. Now we get autocomplete for all three.

1:04 If we go back to the other file, then the other file is also accepting this, too. This is really nice. It's a combination of declaration merging and declaring global. Having this global interface that you can append to gives you a really nice solution for certain problems.

1:22 The problem that we're really solving in this application code is colocation. We want a pattern that we can just copy and paste over several files in our application and make sure that we're declaring the types really close to where the implementation is.

1:38 Of course, you could just declare this in a single interface and just import that to all the places that you need it. Then, of course, it's not colocated. That's, if anything, more like using a global because you're not really sure whether a certain type is used or not.

1:55 Whereas when they're colocated together, even though you're putting it inside a global scope, it means that if you delete this entire file, then log out just disappears from the ether and it doesn't matter anymore. Weirdly, by using a global here, we're able to get a more modular approach to our types.

2:14 Another thing you should think about here is that you could potentially use this in a library setting. If you're declaring global inside your library, it means that you can allow users to override an interface that you've declared in the global. It's a way of passing down information or letting users pass your library information.

2:33 You should think about global in this way, that it can be used to communicate between files that don't necessarily import or export to each other. By using it this way, we end up with a really, really nice API. It's just a tool in your toolbox. It's something to think about. It's something that if you're working with certain libraries, they will ask you to do this.

# Resources

[

www.typescriptlang.org

https://www.typescriptlang.org/docs/handbook/declaration-files/by-example.html#global-variables

](https://www.typescriptlang.org/docs/handbook/declaration-files/by-example.html#global-variables)

[

www.typescriptlang.org

https://www.typescriptlang.org/docs/handbook/declaration-merging.html#handbook-content

](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#handbook-content)

[

github.com

https://github.com/microsoft/TypeScript/blob/main/lib/lib.dom.d.ts#L17922

](https://github.com/microsoft/TypeScript/blob/main/lib/lib.dom.d.ts#L17922)

[

github.com

https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/node/process.d.ts#L4

](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/node/process.d.ts#L4)

# (c) Type Predicates and Assertion Functions



# 1. Filtering with Type Predicates

[

github.com

https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/03-type-predicates-assertion-functions/12-type-predicates-with-filter.problem.ts

](https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/03-type-predicates-assertion-functions/12-type-predicates-with-filter.problem.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=277c2bb2-63e8-44af-9c25-bfda3c3f2b01&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0101-filtering-with-type-predicates-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=277c2bb2-63e8-44af-9c25-bfda3c3f2b01&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0101-filtering-with-type-predicates-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
In this exercise we have a set of values which sometimes have strings and sometimes have `undefined`.

These `filteredValues` are filtering out the `undefined` by checking for truthiness.

```typescript
export const values = ["a", "b", undefined, "c", undefined];

const filteredValues = values.filter((value) => Boolean(value));
```

We end up with a `b` and `c` in the `filteredValues`, so the first test is going to pass:

```typescript
// this test passes:
it("Should filter out the undefined values", () => {
  expect(filteredValues).toEqual(["a", "b", "c"]);
});
```

However, the second test fails because we're expecting them to be an array of strings. Even though we've filtered them out, they're still expressed as `string` or `undefined` in the array:

```typescript
// this test fails:
it('Should be of type "string[]"', () => {
  type test1 = Expect<Equal<typeof filteredValues, string[]>>;
});
```

## Challenge
Your challenge is find a piece of syntax to add to the `filteredValues` that will allow us to express that this it filtering out the `undefined` values.

The way I want you to do that is with a [type predicate](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates).

## Transcript
0:00 In this exercise, we have a set of values which sometimes have strings and sometimes have undefined. These filtered values are basically, we're filtering out the undefined. What we're doing here is we're just checking for truthiness.

0:13 We end up with A, B, and C in the filtered values. This test is going to pass. This is not passing down here because we're expecting them to be an array of strings. Actually, even though we filter them out, they're still expressed as string or undefined in the array.

0:30 What I want you to do is find a piece of syntax which fits inside here that will allow us to basically express that this filter is filtering out the undefined values. The way I want you to do that is with a type predicate. You'll have some links in the section resources. Good luck!

# Solution: Use a Type Predicate to Filter Types

[

github.com

https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/03-type-predicates-assertion-functions/12-type-predicates-with-filter.solution.1.ts

](https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/03-type-predicates-assertion-functions/12-type-predicates-with-filter.solution.1.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=fef415ab-c1c8-4b58-8b06-53b60f482cb6&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0102-filtering-with-type-predicates-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=fef415ab-c1c8-4b58-8b06-53b60f482cb6&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0102-filtering-with-type-predicates-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
There are multiple solutions here.

## The Hacky Solution
The first solution is a little bit hacky, and looks like this:

```typescript
// This solution is a little ugly! The much better one
// is solution number 2!
const filteredValues = values.filter((value) => Boolean(value)) as string[];
```

In this solution we're basically saying that the values that we get back from this `filter` should be given to us `as` an array of strings.

This is us telling TypeScript that we know more than it does, because we know that it's impossible to have `undefined` in this array.

## The Type Predicate Solution
The better solution is to turn the function we pass into the `filter` into a type predicate.

A type predicate expresses a return type by saying that something `is` something.

For this solution, we tell the `filter` that the `value is string`:

```typescript
const filteredValues = values.filter((value): value is string =>
  Boolean(value),
);
```

### Type Predicates Must Return Boolean
It's important to note that when using a type predicate you have to return a `Boolean`.

For example, if you try to have the filter return a string array as part of the solution, TypeScript will yell at you:

```typescript
// this won't work!
const filteredValues = values.filter((value): value is string =>
  Boolean(value) as string[];
);
```

It also won't work if you extract the predicate to a separate function and try to return a non-boolean value:

```typescript
// this also won't work!
const predicate = (value): value is string => {
  if (value) {
    return "hooray";
  }
}
```

### Tricking a Type Predicate
It is possible to trick a type predicate.

Let's update the above example so the `value` is either string or `undefined`, and that it returns `Boolean(value)` as it did in our challenge.

But this time we'll set the type predicate to say `value is number`:

```typescript
const predicate = (value: string | undefined): value is number => {
  return Boolean(value);
}
```

This results in us getting an array of `undefined`, even though we're really checking for the opposite!

Type predicates are just about as safe as using `as`, but they're still super useful.

Let's keep exploring!

## Transcript
0:00 There are multiple solutions here. The first solution is a little bit hacky. What we're doing is we're basically saying, "The values that we get back from this filter we're saying as an array of strings." This is pretty acceptable. It's fine.

0:14 We're saying, "In this case, we do know more than TypeScript. We know that it's impossible to have undefined in this array. It's fine to say as an array of strings here." It's not the prettiest solution. A really pretty solution is to turn the function that we pass to this filter into a type predicate.

0:35 A type predicate basically expresses a return type by saying something is something. This value is value is string. What it's doing here is we're passing a function into values.filter, which is returning a boolean. It has to return a boolean, by the way.

0:54 If we just change this to, let's say, "If value return array," then this is going to yell at us because a type predicate has to be a boolean, even if we extract this out. Even if we say, "Const predicates equals this." Then value is going to be string or undefined.

1:17 Then if we return array, then this is going to yell at us because it's not assignable type boolean. This marks it as a type predicate. Type predicates have to return booleans. We'll pass that in, predicates. Then we can return boolean value. What that's doing is it's filtering out, it's saying, "For each value in this array, we're going to mark it as a string."

1:43 I can say value is number here. This is interesting because a type predicates type must be assignable to its parameters type. It's not letting me stretch the bounds of this too much in a similar way to as, actually. If I remove this, and then say, "As string arrays we had before," I can't do as number array here because string is not comparable to type number.

2:08 String or undefined is not comparable to type number. Weirdly, with a type predicate, I still can lie here. I still can say value is undefined. Now what I end up with is an array of undefined things, even though this is checking for the opposite. Type predicates are super useful. We're going to see in this section how useful they are.

2:30 Bear in mind, they are about as safe as an as. They are about as safe. Sure, I can't do anything crazy. I can't say value is number. I can't say value is a random object with stuff in. I can make it so that this return type lies, which is a bit of an issue. You're going to see how useful type predicates still are.

# 2. Checking Types with Assertion Functions

[

github.com

https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/03-type-predicates-assertion-functions/13-assertion-functions.problem.ts

](https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/03-type-predicates-assertion-functions/13-assertion-functions.problem.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=e5a9a1a9-2dd5-4324-b8c3-e785f3b19900&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0201-Checking Types with Assertion Functions-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=e5a9a1a9-2dd5-4324-b8c3-e785f3b19900&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0201-Checking Types with Assertion Functions-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
Here we have a couple of different types of users, all expressed using interfaces.

We have an `interface User`, which is like the base interface, then we have an `AdminUser` and a `NormalUser`.

One `AdminUser` has a `role` of `"admin"`, the other one has a `role` of `"normal"`:

```typescript
interface User {
  id: string;
  name: string;
}

interface AdminUser extends User {
  role: "admin";
  organisations: string[];
}

interface NormalUser extends User {
  role: "normal";
}
```

There is a function called `assertUserIsAdmin`:

```typescript
function assertUserIsAdmin(user: NormalUser | AdminUser) {
  if (user.role !== "admin") {
    throw new Error("Not an admin user");
  }
}
```

The function takes in a `NormalUser` or an `AdminUser`, and it will throw an error if the user is not an admin.

Down in the tests is this `example`:

```typescript
it("Should assert that the type is an admin user after it has been validated", () => {
    const example = (user: NormalUser | AdminUser) => {
        assertUserIsAdmin(user);

    type tests = [Expect<Equal<typeof user, AdminUser>>];
  };
});
```

Even though we're not returning anything from `assertUserIsAdmin`, the test expects the type of user is going to be an `AdminUser`. That means it should throw at runtime if the user is a `NormalUser`.

## Challenge
Your challenge is to convert the `assertUserIsAdmin` to be an [assertion function](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#assertion-functions).

## Transcript
0:00 In this exercise, we have a couple of different types of user all expressed using interfaces. We have an interface user, which is like the base interface. Then we have an admin user and a normal user. One admin user has a role. The other one has a role of normal.

0:15 We've got a function called assertUserIsAdmin. We're not returning anything from this function. We're throwing if the user is not an admin. What that means is that we're expecting it to throw. It's going to throw at runtime if the user is a normal user. In this example function here, we're basically taking in a normal user or an admin user.

0:38 We're asserting that the user is an admin. Then after we assert that, even though we're not returning anything from it -- const result is this -- then you notice that's just void. There's nothing there. Even though we're not producing any new variables we're expecting in this position, right here, that type of user is going to be an admin user.

1:00 You're going to need to look at something called an assertion function for this. You're going to be changing this function here to make sure that it is an assertion function. You'll be learning a bit of new TypeScript syntax here. Good luck.

# Solution: Ensure Valid Types with an Assertion Function

[

github.com

https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/03-type-predicates-assertion-functions/13-assertion-functions.solution.ts

](https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/03-type-predicates-assertion-functions/13-assertion-functions.solution.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=cb27614b-32cb-41dd-a635-42ba5ac75297&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0202-Checking Types with Assertion Functions-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=cb27614b-32cb-41dd-a635-42ba5ac75297&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0202-Checking Types with Assertion Functions-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
Let's work out the solution together.

We started with `assertUserIsAdmin`:

```typescript
function assertUserIsAdmin(user: NormalUser | AdminUser) {
  if (user.role !== "admin") {
    throw new Error("Not an admin user");
  }
}
```

## Trying a Type Predicate
If this was a normal type predicate, then we would think of it like `isUserAdmin` and say `user is AdminUser`.

The issue then would be that instead of throwing the error inside of the function, we would have to return a check for `user.role === 'admin'` because type predicates must return a boolean:

```typescript
function isUserAdmin(user: NormalUser | Administrator): user is AdminUser {
  return user.role === 'admin';
}
```

This change snowballs into having to make several other changes throughout our code.

## Using an Assertion Function
Using an assertion function is a better approach.

Going back to the starting point, we can use the `asserts` keyword and say `asserts user is AdminUser`:

```typescript
function assertUserIsAdmin(
  user: NormalUser | AdminUser
): asserts user is AdminUser {
  if (user.role !== "admin") {
    throw new Error("Not an admin user");
  }
}
```

Even though we're not returning anything from the function, we have modified the type and the test now passes.

Assertion functions can be incredibly useful for tests as well as checking if something is valid or assignable to something else.

This advanced TypeScript feature allows us to do some pretty clever things that we'll be seeing more of in this section.

## Transcript
0:00 Let's figure this out. We have an assertUserIsAdmin here. If this was a normal type predicates, then we would think of it is isUserAdmin, and then we could say user is AdminUser.

0:18 This is OK, but the issue is here, then we would have to go, instead of throwing the error here, we would have to return user.role === "admin". That means that we need to change a little bit of our code down here to say, if -- what's it called now -- (isUserAdmin).

0:38 Then what we do, (isUserAdmin(user)). Inside there, then this test would then pass, because this user now, if I actually...Oh my gosh. There we go. This type of user now, which is have a look at user is it's going to be a type of AdminUser. This type predicate means that inside the scope where you check it, then it's going to be what you think it's going to be.

1:04 How do we do this other type, this asserts thing? Well, we can use an assertion function in TypeScript. I'm going to say, if (user.role = "admin"), and we're throwing this error here. We're not returning anything from this, but what we are doing is we can throw this asserts keyword in front of it. Now we've got asserts user is AdminUser.

1:27 Oops, I need to change the name back here. Now in this case, all we need to do is call this function on something and it will modify the type of it. What we get is assertUserIsAdmin, this user, and then user. If we look at it, it is an AdminUser. Just by calling a function on that thing, not returning anything from it, we have changed the type of it. We've modified the type of it.

1:55 This is about as safe as a type predicate. We can do asserts user is NormalUser here. This is getting it wrong. Now, we end up with this. We're now asserting that the user is a normal user. You've got to be careful with these types of assignations here, but it does work surprisingly well.

2:18 It means that we can do some clever stuff here, which we'll look at later in this section. I want you to be thinking about this. If you ever find yourself writing these checks, especially if you're checking if things are valid or checking if things are assignable to other things, or even like a test framework, this is super useful too.

2:38 Assertion functions have a lot of use cases in more advanced TypeScript. I'll show you that in this section.

# 3. Avoiding TypeScript's Most Confusing Error

[

github.com

https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/03-type-predicates-assertion-functions/14-typescripts-worst-error.problem.ts

](https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/03-type-predicates-assertion-functions/14-typescripts-worst-error.problem.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=0cef3b4e-967e-43b2-9997-295b4b181420&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0301-avoiding-typescripts-most-confusing-error-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=0cef3b4e-967e-43b2-9997-295b4b181420&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0301-avoiding-typescripts-most-confusing-error-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
We have the `assertUserIsAdmin` function:

```typescript
const assertUserIsAdmin = (
  user: NormalUser | AdminUser,
): asserts user is AdminUser => {
  if (user.role !== "admin") {
    throw new Error("Not an admin user");
  }
};
```

But down in the tests we have what I believe is TypeScript's worst error:

```typescript
Assertions require every name in the call target to be declared with an explicit type annotation.
```

```typescript
it("Should assert that the type is an admin user after it has been validated", () => {
  const example = (user: NormalUser | AdminUser) => {
    /**
     * Why is this error happening?
     *
     * Note: PLEASE DON'T SPEND TOO LONG HERE - feel
     * free to use the solution. I have personally wasted
     * hours on this error.
     */
    assertUserIsAdmin(user);

    type tests = [Expect<Equal<typeof user, AdminUser>>];
  };
});
```

The code looks similar to what we've seen before, but why is it erroring?

## Challenge
Your challenge is to figure out what the problem is, but don't spend too long on it!

I've wasted hours of my time on this error so you don't have to!

## Transcript
0:00 This is kind of a fun exercise. This is Typescript's worst error. In future Typescript versions, this may change. For now, this is for sure Typescript's most unreadable, horrible, horrible error.

0:14 I wanted to give this to you so that you can struggle with it for a brief moment and then look at the solution. The error here is that we're getting here, assertions require every name in their call target to be declared with an explicit type annotation.

0:30 This looks like pretty much exactly the same code as we had before, assertUserIsAdmin user, user normal user or admin user. Not getting an error here, so this looks fine, but this is erroring. Your job is to work out why the hell that code is erroring, but please don't spend too long here.

# Solution: Declare Assertion Functions Properly to Avoid Confusing Errors

[

github.com

https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/03-type-predicates-assertion-functions/14-typescripts-worst-error.solution.ts

](https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/03-type-predicates-assertion-functions/14-typescripts-worst-error.solution.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=8497ad70-14ac-45cb-9a87-645e6e71f9ea&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0302-avoiding-typescripts-most-confusing-error-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=8497ad70-14ac-45cb-9a87-645e6e71f9ea&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0302-avoiding-typescripts-most-confusing-error-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
The solution here is that we have to use the `function` declaration instead of using `const` and an arrow function.

Change the declaration, and all of a sudden our error goes away.

```typescript
function assertUserIsAdmin(
  user: NormalUser | AdminUser,
): asserts user is AdminUser {
  if (user.role !== "admin") {
    throw new Error("Not an admin user");
  }
}
```

I don't actually know why that error is thrown, but I'd be really interested in talking to someone from the TypeScript team about it!

The big takeaway here is to make sure you declare your assertion functions with the `function` keyword, or if you're in a class, make sure you're not using arrow functions for them.

## Transcript
0:00 The solution here is the difference between this one and the one we did before is we've declared this with a const, whereas we declared the other one with a function. If you use a function, it suddenly starts working. Oh God, why on earth is it doing that?

0:17 I actually don't know why that error is thrown. I'd be really interested to talk to someone from the TypeScript team about this. Now it suddenly works and everything is gravy.

0:28 Make sure you declare your assertion functions with the function keyword, or if you're in a class, make sure you're not using arrow functions for them.

# 4. Combining Type Predicates with Generics

[

github.com

https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/03-type-predicates-assertion-functions/15-type-predicates-with-generics.problem.ts

](https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/03-type-predicates-assertion-functions/15-type-predicates-with-generics.problem.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=5f2b07f8-e6d2-4580-9946-53c0ebbc282e&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0401-combining-type-predicates-with-generics-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=5f2b07f8-e6d2-4580-9946-53c0ebbc282e&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0401-combining-type-predicates-with-generics-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
In this exercise, we're going to combine some type predicates with some generics.

We have a `fake-external-lib`, where you can do a go-to definition on it and it will take you to the `isDivElement` and `isBodyElement` functions.

These functions take in an element and then return whether the element is a `HTMLDivElement` or a `HTMLBodyElement`:

```typescript
export const isDivElement = (element: unknown): element is HTMLDivElement => {
return element instanceof HTMLDivElement;
};

export const isBodyElement = (element: unknown): element is HTMLBodyElement => {
return element instanceof HTMLBodyElement;
};
```

In the exercise file is a `createDOMNodeExtractor` function has generics of `T` and `Result` that will take in a node and return a transformed result:

The tests at the bottom of the exercise file use the `fake-external-lib` to check the node types before passing them to `createDOMNodeExtractor`.

As expected, they currently have errors:

```typescript
it('Should pick up that "extractDivs" is of type "HTMLDivElement[]"', () => {
  const extractDivs = createDOMNodeExtractor({
    isNode: isDivElement,
    
    // div is shown as `unknown`
    transform: (div) => {
      type test1 = Expect<Equal<typeof div, HTMLDivElement>>;
      return div.innerText;
    },
  });

  const divs = extractDivs([document.createElement("div")]);

  type test2 = Expect<Equal<typeof divs, string[]>>;
});
```

## Challenge
Your challenge is to update the type definition of the `DOMNodeExtractorConfig` interface to fix the errors in the tests.

```typescript
interface DOMNodeExtractorConfig<T, Result> {
  isNode: (node: unknown) => boolean;
  transform: (node: T) => Result;
}
```

Hint: Use a type predicate for `isNode` to determine whether something is `T` or not.

## Transcript
0:00 In this exercise, we're going to combine some type predicates with some generics. We've got this fake external library where you can actually do a go to definition on it. It will basically take you to these functions here.

0:12 These functions take in an element and then returns whether the element is an HTMLDivElement or whether the element is an HTMLBodyElement. Pretty useful. What we can do with them is we're basically creating something called a create DOM node extractor.

0:29 This is called extractBodies, extractDivs. There we go. That's a bit less of a gruesome name. What this is doing is it's going, "If we have a node of a certain type, then that node should be passed to the transform function here."

0:46 We can see this inside the DOM node extractor config. Which, what's going on here is we've got T and result, which are our two generics. We're saying, "Transform this when we take in this node, and then return the result," essentially.

1:02 The thing I want you to look at is this-is-node definition because the things that we're passing to the is node, we're passing is node is div element. This currently is not transferring its knowledge down into the transform function. If we take a look at this, you can see that it's being highlighted as unknown and any here, or those are the type arguments that are being extracted.

1:27 Whereas, what we want to do is we want to say, "Is node should be a type predicate, which is returning whether something is T or not." With those hints, I think you can solve this. Remember, you're just changing this definition. It should just work. Good luck.

# Solution: Filtering with Type Predicates and Generics

[

github.com

https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/03-type-predicates-assertion-functions/15-type-predicates-with-generics.solution.ts

](https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/03-type-predicates-assertion-functions/15-type-predicates-with-generics.solution.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=c0a3dfac-4840-4ad1-ad21-e71aa801980c&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0402-combining-type-predicates-with-generics-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=c0a3dfac-4840-4ad1-ad21-e71aa801980c&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0402-combining-type-predicates-with-generics-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
Before we start on the solution, let's take a closer look at the error message in the `DOMNodeExtractorConfig`:

```typescript
Argument of type '(node: T) => Result' is not assignable to parameter of type '(value: unknown, index: number, array: unknown[]) => TResult'
```

Essentially the error message tells us that the `node` is `unknown` so it can't be assigned to `T`.

Instead of passing in an array of unknown nodes and trying to filter them, we should pass in a type predicate that will return the ones that conform to `T`.

We can do this by adding `node is T` to the `DOMNodeExtractorConfig`.

Here's the before that used a boolean:

```typescript
interface DOMNodeExtractorConfig<T, Result> {
  isNode: (node: unknown) => boolean;
  transform: (node: T) => Result;
}
```

And here's the after with the type predicate:

```typescript
interface DOMNodeExtractorConfig<T, Result> {
  /**
   * Here, node is T lets you specify that
   * isNode takes in a type predicate.
   */
  isNode: (node: unknown) => node is T;
  transform: (node: T) => Result;
}
```

With this change in place, we are able to get inference from a type predicate.

This means we can take a globally available element like `HTMLSpanElement` and add a new test that will "just work"!

This pattern of combining generics with type predicates when there are lots of different elements available is really useful for getting amazing inference.

I've used this technique when building an AST node analyzer that was able to be passed in things from external libraries like Babel.

## Transcript
0:00 Before we solve it, let's actually look at this error down here because this one's really interesting. What we've got here is it's basically saying, "Argument of type node T result is not assignable to type value unknown index, blah, blah, blah, result."

0:14 It looks like the parameters of node and value are incompatible because node type unknown is currently not assignable to type T. That means that we're basically taking an array of unknown nodes. We're filtering them. What we're supposed to be passing here is a type predicate that's going to filter the unknown ones out.

0:37 God, I can't speak anymore. Then just return us the ones that conform to T. Which means that is node is supposed to be a type predicate of some sort. How can we represent this well? We can actually, instead of this boolean, we can say node is T. That's it. That's the solution.

0:59 What this is doing then is it's passing in a function. This is div elements down here. This is saying element is div element. It means that this div is inferred as HTMLDivElement. We can create a new one here if we want to. We can say const is body, let's say, is span elements, for instance.

1:19 Let's create this function, which is going to be elements unknown. In fact, I'm going to just copy and paste the one from up here. Then I'll just change the results of that so we end up with span element, HTMLSpanElements. We're getting these from lib.dom.d.ts, by the way, or global.d.ts or something.

1:42 Now what we get is span element. We can put that in here. We suddenly end up with this span in this slot, which is just so, so cool that we can get the inference from a type predicate in order to make this work. This is really, really useful. I found this useful for when I was building quite a complicated thing, which was an AST node analyzer.

2:08 I was able to pass in things from an external library, which was babel, I think, that had a lot of is this or is that. If you're dealing with lots of different types of elements and you have a few type predicates that you're building in here, it's really cool that you can use this node is T or input is T, or whatever you want it to be, in order to use type predicates with generics to get this really amazing inference.

# 5. Combining Brands and Type Predicates

[

github.com

https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/03-type-predicates-assertion-functions/16-brands-and-type-predicates.problem.ts

](https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/03-type-predicates-assertion-functions/16-brands-and-type-predicates.problem.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=427368ee-9d56-4dd5-9b6f-8c06e33b0afa&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0501-combining-brands-and-type-predicates-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=427368ee-9d56-4dd5-9b6f-8c06e33b0afa&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0501-combining-brands-and-type-predicates-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
Here is an `isValidPassword` function that makes use of a `PasswordValues` interface. We also have a `Valid` branded type.

```typescript
type Valid<T> = Brand<T, "Valid">;

interface PasswordValues {
  password: string;
  confirmPassword: string;
}

const isValidPassword = (values: PasswordValues) => {
  if (values.password !== values.confirmPassword) {
    return false;
  }
  return true;
};
```

There are tests in place to check that the imaginary `createUserOnApi` function is not called unless the password has been validated first:

```plain
it("Should fail if you do not validate the values before calling createUserOnApi", () => {
  const onSubmitHandler = (values: PasswordValues) => {
    // @ts-expect-error
    createUserOnApi(values);
  };
});

it("Should succeed if you DO validate the values before calling createUserOnApi", () => {
  const onSubmitHandler = (values: PasswordValues) => {
    if (isValidPassword(values)) {
      createUserOnApi(values);
    }
  };
});
```

## Challenge
Your challenge is to update `isValidPassword` to ensure that the tests pass as expected.

This will require you to combine type predicates with the branded (a.k.a. nominal or opaque) types.

Revisit the branded types lessons, or check out these articles for a refresher:

[

basarat.gitbook.io

https://basarat.gitbook.io/typescript/main-1/nominaltyping

](https://basarat.gitbook.io/typescript/main-1/nominaltyping)

[

codemix.com

https://codemix.com/opaque-types-in-javascript/

](https://codemix.com/opaque-types-in-javascript/)

## Transcript
0:00 In this exercise, we're going to combine the type predicates that we've seen before and the brands that we've seen before as well. We have a similar setup to an exercise we've done before, which is we have isValidPassword, createUserOnApi.

0:15 We're looking to basically check that when we call the submit handler that we're basically saying, createUserOnApi, it's going to error because these password values do not equal these valid password values. We're going to use isValidPassword to basically be the decider.

0:33 It's going to say, once we've, it's going to return a Boolean to determine whether the values are valid or not. This is your job. You're going to need to change this function in some way to give it an annotation to make this logic work. Good luck.

# Solution: Checking for Validity with Brands and Type Predicates

[

github.com

https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/03-type-predicates-assertion-functions/16-brands-and-type-predicates.solution.ts

](https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/03-type-predicates-assertion-functions/16-brands-and-type-predicates.solution.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=b01609b4-3241-40fc-9d31-b15ae1700753&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0502-combining-brands-and-type-predicates-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=b01609b4-3241-40fc-9d31-b15ae1700753&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0502-combining-brands-and-type-predicates-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
The solution is to annotate the `isValidPassword` function with a type predicate of `values is Valid<PasswordValues>`:

```typescript
type Valid<T> = Brand<T, "Valid">;

interface PasswordValues {
  password: string;
  confirmPassword: string;
}

const isValidPassword = (
  values: PasswordValues,
): values is Valid<PasswordValues> => {
  if (values.password !== values.confirmPassword) {
    return false;
  }
  return true;
};
```

Combining the type predicate with the brand means that we don't need to do any assertions or casting.

It's just literally `values is Valid<PasswordValues>`, which is pretty nice!

## Transcript
0:00 The solution for this is to take this isValidPassword and annotate it with values is valid password values. Isn't that nice. This means that when we use it inside an if statement, it makes those password values valid. Very, very cool.

0:18 If we were to determine this outside of the if statement, then it would just be normal password values. This changes it to add the brand to it. This means that branded types are really, really nice with type predicates because you can just, you don't need to do any as stuff here.

0:34 There's no assertions going on or casting or anything like that. It's just literally values is valid password values, which is pretty nice.

# 6. Combining Brands with Assertion Functions

[

github.com

https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/03-type-predicates-assertion-functions/17-brands-and-assertion-functions.problem.ts

](https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/03-type-predicates-assertion-functions/17-brands-and-assertion-functions.problem.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=539d0f8c-5303-4515-982c-86e6a886f822&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0601-combining-brands-with-assertion-functions-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=539d0f8c-5303-4515-982c-86e6a886f822&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0601-combining-brands-with-assertion-functions-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
Here we have the same setup as the previous exercise. There is the `PasswordValues` interface and a `Valid` Brand.

```typescript
type Valid<T> = Brand<T, "Valid">;

interface PasswordValues {
  password: string;
  confirmPassword: string;
}
```

This time we want to assert that the password is valid and then creating the user on the API.

```typescript
/**
 * 💡 You'll need to change this function...
 */
function assertIsValidPassword(values: PasswordValues) {
  if (values.password !== values.confirmPassword) {
    throw new Error("Password is invalid");
  }
}
```

## Challenge
Your challenge is to update the `assertIsValidPassword` function to properly assert that the password is valid.

## Transcript
0:00 Here we've got the same setup as the previous exercise where we have assertIsValidPassword. We're doing the same thing as we've seen before in this exercise, where we're basically asserting that the password is valid and then creating the user on the API.

0:15 We've got the password values up here, we've got a valid brand, and we need to assert that this thing is a valid password. Good luck!

# Solution: Validate Types with Brands and Assertions

[

github.com

https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/03-type-predicates-assertion-functions/17-brands-and-assertion-functions.solution.ts

](https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/03-type-predicates-assertion-functions/17-brands-and-assertion-functions.solution.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=631735fb-18b8-4094-925e-bfeefd297858&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0602-combining-brands-with-assertion-functions-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=631735fb-18b8-4094-925e-bfeefd297858&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0602-combining-brands-with-assertion-functions-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
The solution is to change `assertIsValidPassword` to give it `asserts values is Valid<PasswordValues>`:

```typescript
function assertIsValidPassword(
  values: PasswordValues,
): asserts values is Valid<PasswordValues> {
  if (values.password !== values.confirmPassword) {
    throw new Error("Password is invalid");
  }
}
```

With this change, the `values` inside the function end up being `Valid<PasswordValues>`.

Just like the type predicate version that we saw in the previous exercise, this reads really nicely and produces this lovely API.

The brand gives it a sort of "identity", which means that we don't need to do any casting.

As seen in the tests, we also get nice error messages that are easier to read.

For example, if we try to call `createUserOnApi` without calling our assert function first, we get:

```typescript
Argument of type `PasswordValues` is not assignable to 
parameter of type `Valid<PasswordValues>`.
```

All said, using assertion functions with branded types results in a really smooth API.

## Transcript
0:00 The solution here is to change assertIsValidPassword and to give it asserts is, sorry, values is valid PasswordValues. What this does is it means that when we use it, then these values end up being valid password values.

0:19 Just like the type predicate version that we saw in the previous exercise, this is really, really nice. It produces this lovely API which, first of all, reads really nicely. Actually, surprisingly for a Typescript annotation. asserts values is valid PasswordValues.

0:35 The brand gives it a sense of identity, means that you don't need to do any casting here again, and it just slides in. It's just so lovely. Of course, if we don't do this, then we're going to get an error here because password values is not assignable to parameter of type valid PasswordValues.

0:52 You get lovely errors here too. This again, this is a really nice solution that you can bring branded types in and use assertion functions with them in order to get this really smooth API.

# Resources

[

www.typescriptlang.org

https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates

](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates)

[

www.typescriptlang.org

https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#assertion-functions

](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#assertion-functions)

# (d) Classes



# 1. Classes as Types and Values

[

github.com

https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/04-classes/17.8-classes-as-types-and-value.problem.ts

](https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/04-classes/17.8-classes-as-types-and-value.problem.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=f202f089-e30b-4e23-95a9-0791274e7e4d&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0101-classes-as-types-and-values-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=f202f089-e30b-4e23-95a9-0791274e7e4d&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0101-classes-as-types-and-values-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
In this exercise, we have a `handleCustomError` function which takes in something with an `error code`.

```typescript
const handleCustomError = (error: unknown) => {
  console.error(error.code);

  type test = Expect<Equal<typeof error.code, number>>;
};
```

We only want to handle this type of `CustomError`, which is a class that extends `Error` and adds a `code` property:

```typescript
class CustomError extends Error {
  constructor(message: string, public code: number) {
    super(message);
    this.name = "CustomError";
  }
}
```

For example, We could create a new `CustomError` and pass it an example error message and code:

```typescript
const customError = new CustomError("Oh no", 401)
```

Now this `customError` then has the type of `CustomError`, and we can use things like `instanceof customError` to check if it is a `CustomError`.

## Challenge
Your challenge is to type the `error` parameter to make sure that the `error` has a `code` and a `message`, and that the thing being passed in is a `CustomError`.

## Transcript
0:00 In this exercise, we have a handleCustomError function, which takes in something with an error code here. We really want to only be handling this type of CustomError, which is a class which extends error and adds a code property to it.

0:16 We could potentially create a new CustomError, which instantiates new CustomError, passing it to ('Oh noo', 401) for instance. This CustomError then has the type of CustomError, and you can use things like instantof CustomError. We can say if let's say (customError instanceof CustomError) then we're happy and we know that it's customized.

0:43 It's a cool pattern that we've not really explored before in total TypeScript. The thing I'm interested in is how do we type this error parameter? We want to know that the error has a code on it, and we also probably want to know that the error has a message on it. We want to make sure the thing we're passing in is a CustomError. Good luck.

# Solution: Using Classes in TypeScript

[

github.com

https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/04-classes/17.8-classes-as-types-and-value.solution.ts

](https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/04-classes/17.8-classes-as-types-and-value.solution.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=0ad2625d-dcfd-4378-8c19-7083ccbf1805&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0102-classes-as-types-and-values-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=0ad2625d-dcfd-4378-8c19-7083ccbf1805&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0102-classes-as-types-and-values-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
The solution here is actually beautifully simple.

We can update `handleCustomError` to specify `error` as a code number, with an accompanying `message` string:

```typescript
const handleCustomError = (error: {code: number; message: string}) => {
  ...
```

To demonstrate how it works now, let's create an example `customError`:

```typescript
const customError = new CustomError("Oh no", 401)
```

Now we can call `handleCustomError` and pass in `customError` and everything will work as expected:

```typescript
handleCustomError(customError);

// hovering shows:

handleCustomError(error: {code: number; message: string;}): void
```

But since we specifically want to take in `CustomError`s with that exact shape, there's a more elegant solution.

TypeScript allows you to use the name of a class as a type, so we can update `handleCustomError` like so:

```typescript
const handleCustomError = (error: CustomError) => {
  ...
```

Classes have the property of being able to be used as either a type or a runtime value, which is pretty cool!

## Transcript
0:00 The solution here is actually beautifully simple. We can specify error as, I mean, we could specify as, let's say code number like this and maybe have a message on it string. If we pass something to it, so constCustomError is new CustomError. Let's set this up again, oh no, 401.

0:22 Then what we would get handleCustomError, we could just pass in this custom error and it would be happy. Because we specifically want to be able to take in custom errors with exactly that shape, then we can just pass in custom error like this. How cool is that?

0:40 We can actually use the name of the class as a type in Typescript. Classes have this funny property where they can actually cross boundaries a little bit and be used as either a type or a runtime value. Pretty cool.

# 2. Dive into Classes with Type Predicates

[

github.com

https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/04-classes/18-type-predicates-and-classes.problem.ts

](https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/04-classes/18-type-predicates-and-classes.problem.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=7558465a-8410-484f-ae55-93e8b5101e89&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0201-dive-into-classes-with-type-predicates-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=7558465a-8410-484f-ae55-93e8b5101e89&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0201-dive-into-classes-with-type-predicates-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
Continuing our dive into classes, let's look at a spot where you might need to use a type predicate.

We have a class called `Form` that takes a generic type of `TValues`. Inside the constructor is a public property called `values` and a private function called `validate`:

```typescript
class Form<TValues> {
  error?: string;
  
  constructor(
      public values: TValues,
      private validate: (values: TValues) => string | void,
  ) {}
  ...
```

This shorthand is useful because we don't have to manually assign the value to the property.

The class also contains an `isInvalid` function that calls the user-defined `validate` function passed to the class.

If the `validate` function returns a string, we set the error message to that string, and the function returns true. Otherwise, the function returns `false`, and the error is set to `undefined`:

```typescript
isInvalid(){
    const result = this.validate(this.values);

    if (typeof result === "string") {
        this.error = result;
        return true;
    }

    this.error = undefined;
    return false;
```

In the following example given, we can see its usage:

```typescript
const form = new Form(
	{
		username: "",
		password: "",
	},
	(values) => {
		if (!values.username) {
			return "Username is required";
		}

		if (!values.password) {
			return "Password is required";
		}
	}
);
```

Here we are creating a `username` and `password` form. If there is no `username`, we return "Username is required". If there is no `password`, we return "Password is required."

To test the `Form`, an `if` statement checks if the `form` is invalid, and if so the `error` property should be a string:

```typescript
if (form.isInvalid()) {
  type test1 = Expect<Equal<typeof form.error, string>>;
} else {
  type test2 = Expect<Equal<typeof form.error, string | undefined>>;
}
```

However, the property is currently typed as a `string` or `undefined`.

## Challenge
Your challenge is to find a way to type the `isInvalid` function to behave like a type predicate that asserts on the `error` property without passing any parameters.

This will require a syntax you might not have seen before.

Check out the [Type Predicates section of the TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates) for more info. Remember, you're working within a class.

## Transcript
0:00 We're going to continue our dive into classes here by looking at a spot where you might need to use a type predicate. We have a class form here which takes in a generic of Tvalues. Inside the constructor here, we have a public values is TValues, and then a private validate function.

0:18 This syntax is just like, it automatically assigns it to a public property of values. If I remove this, then if we had public values TValues, then I would basically have to assign this. This.values, can't type, equals values.

0:37 That's basically a shorthand for that, where I can just say public values and it automatically gets put on the class. Very useful. I have a couple of little bits down here. I have an isInvalid function, which basically calls the validate function which the user passes to the class.

0:55 Then what it does is it returns a result which might be string or it might be nothing. This is going to be basically the error message. If the result is a string, then we set the error to the result and we return true. Otherwise, we say this.error is undefined and return .

1:10 This.invalid, when it's used, you can see an example of usage here. I've got a username and password form. If there's no username, we return username is required, otherwise we return password is required if there's nothing like that.

1:24 Then inside this if statement here, we're checking if the form is invalid. If the form is invalid, we should really expect form.error here to be a string, but instead it's string or undefined. If it's not invalid, then we would expect it to be form.error.

1:42 We expect it to be as it is, string or undefined. What I want you to do is find a way to type this isInvalid function so that it behaves like a type predicate. eExcept what it's asserting on, you're not passing anything in here.

2:00 You're actually going to be asserting on this, and that's a big clue that this. Good luck. This is an interesting one. You're going to I think learn some new syntax here. It's fairly funky.

# Solution: Simplifying TypeScript with Type Predicates

[

github.com

https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/04-classes/18-type-predicates-and-classes.solution.ts

](https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/04-classes/18-type-predicates-and-classes.solution.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=7b330eaf-93cc-416d-89ff-655b995cc7f7&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0202-dive-into-classes-with-type-predicates-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=7b330eaf-93cc-416d-89ff-655b995cc7f7&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0202-dive-into-classes-with-type-predicates-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
We need to find a type for the `isInvalid` function.

It would be nice if we could do something like saying `isInvalid` takes `whatever` and `whatever is boolean`:

```typescript
isInvalid(whatever: any): whatever is boolean { ... }
```

Unfortunately no parameters are being passed in so a solution like this won't work.

Instead we can use the `this is` syntax to add a this-based type guard.

Adding this is `Form <TValues>` and an `error` string looks like this:

```typescript
isInvalid(): this is Form<TValues> & { error:string } { ... }
```

What this is doing is checking that `this`, which is the `Form` we're calling the function on, is a `Form` with `TValues` and an `error` string.

This overrides the initial error type, so `form.error` will always be a string.

Now we have a nice bit of logic where we can use type predicates to assert that the value of the class is a certain shape!

## A Funkier Option
There is also a funkier way of expressing this logic:

```typescript
isInvalid(): this is this & { error: string } {...}
```

Here `this` refers to the object the function is called on, and `{ error: string }` is the string that will be returned.

You can use `this` inside a subclass of another class and always refers to the right thing. Is incredibly cool and ensures that you get all the right inference.

One potential issue with using `Form<TValues>` is that, like all type predicates, it is reliant on being properly defined.

If it is not defined correctly, TypeScript will not error out and may think it is safe to use.

Type predicates are powerful and can get you quite far without needing to do much generic work, but it is essential to define them properly to avoid errors!

## Transcript
0:00 The solution here is we have this is invalid function. We need to find a type for this. The syntax I was referring to is this whatever is Boolean, for instance. Imagine if we had whatever inside here, which might be any, for instance. Then we assert that whatever is a Boolean.

0:21 We don't have access to anything here because we're not passing anything into the arguments here. There's no parameters on this function. What we can do instead is we can actually say, "This is..." and, for instance, let's say, "...form. Then T values. " Why don't we add error string?

0:45 Now what happens is we're saying this, the thing that the this is being called on, this form right here, is a form and an error string here, which overrides the initial error. You end up with form.error is always going to be a string. This means that you get this really nice bit of logic where you can call type predicates to assert that the value of the class is a certain shape. Super nice.

1:18 There's even a funkier way of expressing this, which is you can say, "This is form T values." This actually, it's always going to be form T values. You can actually do, "This is this and error string." What? This is this. This refers to this. Then this refers to the type of this, which, in this case, is going to be form T values.

1:43 You can actually use this inside a subclass of another class. This will always refer to the right thing. It's incredibly cool. Again, we're getting all the right inference here. This is a very simple version of this. We're going to look at a couple more, one more with assertion functions as well. You can imagine that this is actually fairly powerful.

2:01 It gets you quite far without needing to do much crazy generics work. We've got this is this and error string. The issue is, though, that, of course, like all type predicates, it is reliant on you defining it properly. If we accidentally define it, it's not actually going to error here. TypeScript thinks that this is safe.

2:24 This actually ends up being form.error. If we look at it, actually ends up being undefined when we know it's actually a string. You got to be careful. Type predicates are about as safe as as but very, very useful.

# 3. Assertion Functions and Classes

[

github.com

https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/04-classes/18.2-assertion-functions-and-classes.problem.ts

](https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/04-classes/18.2-assertion-functions-and-classes.problem.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=585011bf-78a1-4f55-a35e-fcc70fd4a9f3&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0301-assertion-functions-and-classes-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=585011bf-78a1-4f55-a35e-fcc70fd4a9f3&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0301-assertion-functions-and-classes-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
In this exercise, we have a class called `SDK` that when instantiated may or may not have a `loggedInUser`:

```typescript
export class SDK {
  loggedInUser?: User;

  constructor(loggedInUser?: User) {
    this.loggedInUser = loggedInUser;
  }

  // How do we type this assertion function?
  assertIsLoggedIn() {
    if (!this.loggedInUser) {
      throw new Error("Not logged in");
    }
  }

  createPost(title: string, body: string) {
    type test1 = Expect<Equal<typeof this.loggedInUser, User | undefined>>;

    this.assertIsLoggedIn();

    type test2 = Expect<Equal<typeof this.loggedInUser, User>>;
  }
}
```

On this `SDK`, there could be many different methods such as creating posts, creating comments, etc.

For some of these, we need to make sure that the user is logged in. If they aren't, then we would throw an error like a 401.

This means that the logic for asserting the user is logged in is in one place.

## Challenge
Your task is to find a way of typing the `assertIsLoggedIn` function so that inside the class itself it understands if the `loggedInUser` is present.

## Transcript
0:00 In this exercise, we have a class called SDK. The SDK may have a logged in user on it. Just like this, in fact, I could refactor this so it uses public logged in user, so I don't need to do any of this stuff. It means you can pass in a logged in user optionally when you instantiate the SDK.

0:20 We have a function here called assertIsLoggedIn. You can imagine on this SDK there might be many, many, many different methods. You can create posts, create comments, all this sort of stuff. For some of them, you need to make sure that the user is logged in.

0:36 You can imagine if we don't do this, then we throw an error, maybe we throw a 401 or something or whatever we want to do. What this does is it means that your logic for asserting the user is logged in is in one place. We know that the user can be user or undefined.

0:54 This.loggedInUser, you can imagine we're probably going to use it down here. We don't like this.loggedInUser for instance, there we go. We don't want this to be user or undefined in all the places that we're going to use it. We want it to just be user.

1:11 Your job is to find a way of typing this assertion function so that inside the class itself, it understands that loggedInUser is there when we assert that the user is logged in.

# Solution: Leverage Assertion Functions for Better Inference in Classes

[

github.com

https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/04-classes/18.2-assertion-functions-and-classes.solution.ts

](https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/04-classes/18.2-assertion-functions-and-classes.solution.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=0961beb8-40b2-457d-9b85-6d8217027ea7&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0302-assertion-functions-and-classes-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=0961beb8-40b2-457d-9b85-6d8217027ea7&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0302-assertion-functions-and-classes-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
The `assertIsLoggedIn` function is similar to a type predicate challenge we saw earlier, so we know that we're going to need to add `asserts this is`.

In this case, we need to assert that this is an `SDK` and that `loggedInUser` is a `User`:

```typescript
assertIsLoggedIn(): asserts this is SDK & { loggedInUser: User } {
  ...
```

And it works!

## A Closer Look
Let's look at how `this.loggedInUser` changes.

Inside of `createPost`, when `this.loggedInUser` is put before the call to `this.assertIsLoggedIn`, its value is either `User` or `undefined`.

```typescript
// inside `createPost`

// hovering over `this.loggedInUser` shows:
// (property) SDK.loggedInUser?: User | undefined
this.loggedInUser;

this.assertIsLoggedIn();

// hovering over `this.loggedInUser` shows:
// (property) loggedInUser: User
this.loggedInUser;
```

```typescript
However when looking at `loggedInUser` after the assertion, we see that it will only be `User`.

## Updating `assertIsLoggedIn`

The value of `this` actually changes inside the class depending on where you are.

With the current solution, the hovering over `this` on `this.loggedInUser` inside of `createPost` show us:

```typescript
// hovering over `this`
this.loggedInUser;

// shows:
this & SKD {
  loggedInUser: User;
}
```

We can update `assertIsLoggedIn` to remove the `SDK` part which will just append to `this`:

```typescript
assertIsLoggedIn(): asserts this is this & { loggedInUser: User } {
  ...
```

Now hovering over `this` on `this.loggedInUser` will show:

```typescript
this & {
  loggedInUser: User;
}
```

Now the assertion will work whether we are in a subclass or a superclass.

It's amazing that this works outside of classes, but it's even more amazing that it works inside of classes!

Whether you're using type predicates or using this assertion style, you're going to get this amazing logical inference.

## Transcript
0:00 Just like our type predicate solution that we had before, we have an assertIsLoggedIn here. We know that we're probably going to need to do asserts here. Asserts that this is what? We can have SDK and loggedInUser is a user. Whoa and it works!

0:23 You can see that before the assertion, we have this.loggedInUser is going to be user or undefined. Then after the assertion, it's user. This is amazing because it actually changes the value of this inside the class where you are. You can see this and SDK and loggedInUser. So nice.

0:47 I think the preferable version of this is to do this and/or this is this. That means that the type of this just gets something appended to it because if we're in a subclass or something like that or a superclass or whatever, then we're going to be in this and loggedInUser is exactly the type that we want.

1:08 It's amazing that this works outside of classes, but it's even more amazing that it works inside of classes. Whether you're using type predicates or using this assertion style, you're going to get this amazing logical inference just like inside the methods of your classes and outside as well.

1:26 It's so cool!

# 4. Class Implementation Following the Builder Pattern

[

github.com

https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/04-classes/19.3-builder-pattern-intro.explainer.ts

](https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/04-classes/19.3-builder-pattern-intro.explainer.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=6bedf47f-5906-4900-bf6c-daaa5fe393c3&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0401-class-implementation-following-the-builder-pattern.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=6bedf47f-5906-4900-bf6c-daaa5fe393c3&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0401-class-implementation-following-the-builder-pattern.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Explainer
One really cool aspect of classes is that they let us enact the builder pattern really beautifully. The builder pattern can be used to make some amazing APIs and it fits really nicely with TypeScript.

Here we have a class called `BuilderTuple`:

```typescript
export class BuilderTuple<TList extends any[] = []> {
  list: TList;

  constructor() {
    this.list = [] as any;
  }

  push<TNum extends number>(num: TNum): BuilderTuple<[...TList, TNum]> {
    this.list.push(num);

    return this as any;
  }

  unshift<TNum extends number>(num: TNum): BuilderTuple<[TNum, ...TList]> {
    this.list.unshift(num);

    return this as any;
  }
}
```

There are also several variables we can examine at various points of interacting with the class:

```typescript
const builderBeforePush = new BuilderTuple();
const listBeforePush = builderBeforePush.list;

const builderAfterPush = builderBeforePush.unshift(3).unshift(2).unshift(1);
const listAfterPush = builderAfterPush.list;
```

Hovering over `builderBeforePush`, we get a popup that inside of it we can see an empty array:

```typescript
// hovering over `builderBeforePush`
constructor BuilderTuple<[]>(): BuilderTuple<[]>
```

Then when hovering over `listAfterPush` we can see our list of `1`, `2`, `3`:

```typescript
// hovering over `listAfterPush`
const listAfterPush: [1, 2, 3]
```

## Building the Class from Scratch
In order to understand how this works, let's implement `BuilderTuple` from scratch.

Because `BuilderTuple` will have a `list` that could be anything, we'll create a generic of `<TList>`.

```typescript
export class BuilderTuple<TList> {
  list: TList
}
```

For the constructor, we'll say that `this.list` is an empty array:

```typescript
constructor() {
  this.list = []
}
```

Now we have our first error:

```typescript
Type 'never[]' is not assignable to type 'TList'
```

We get this error because TypeScript doesn't know what `TList` could be.

This tells us we need to add constraints to `TList` so we will say it extends `any[]`. Then inside of the constructor we'll add that `this.list` is `[] as any`:

```typescript
export class BuilderTuple<TList extends any[]> {
  list: TList;

  constructor() {
    this.list = [] as any;
  }
```

When using the builder pattern you'll need to have assertions.

## Adding the Generic Starting Point
For now our tests are failing because the initial builder is actually typed as `BuilderTuple<any[]>` and the list is now an array of `any`:

```typescript
// hovering shows BuilderTuple<any[]>
const builderBeforePush = new BuilderTuple();


// hovering shows any[]:
const listBeforePush = builderBeforePush.list;
```

In order to fix this, we need to add set the default generic of our class to an empty array:

```typescript
export class BuilderTuple<TList extends any[] = []> {
  ...
```

This addition is necessary in the builder pattern so it knows where to start.

## Implement the `push` Method
Now we need to implement the `push` method, which in this case, we'll keep to a number.

After pushing the number onto the list, we'll return `this`:

```typescript
push(num: number) {
  this.list.push(num);

  return this;
}
```

If we didn't return `this`, then the first instance would just return void and we wouldn't be able to chain these methods together.

By returning `this`, we get to actually go push, push, push and build up all of this stuff:

```typescript
const builderAfterPush = builderBeforePush.push(1).push(2).push(3);
```

Now we're building up a tuple, but there's an issue.

With this implementation, the `listAfterPush` is still the same as `listBeforePush`.

We've changed the list by pushing, but we haven't changed the `TList` generic in order to make it catch up.

## Changing the Generic
To change the generic, we first need to infer the type from the `push` method.

Since we're using a number, we'll add a type argument of `TNum` and constrain it by having it extend `number`:

```typescript
push<TNum extends number>(num: TNum) {
  ...
```

Now we've got inference happening there and `TNum` is typed correctly, but the actual return type is not correctly typed.

We need to update the return so that `this` is returned as a `BuilderTuple`, taking advantage of the ability to pass classes as types.

For now, we'll return `this as any as BuilderTuple` with a list that spreads over the existing `TList` and adds `TNum`:

```typescript
push<TNum extends number>(num: TNum) {
  this.list.push(num);

  return this as any as BuilderTuple<[...TList, TNum]>;
```

Now when we hover over the `push` calls, we can see the resulting `BuilderTuple`:

```typescript
const builderAfterPush = builderBeforePush.push(1).push(2).push(3);

// hovering shows
(method) BuilderTuple<[1, 2]>.push<1>(num: 3);
BuilderTuple<[1, 2, 3]>
```

## Adding the `unshift` Method
The `unshift` implementation is similar to `push`.

However this time we swap the order of `...Tlist` and `TNum` because we're adding numbers to the front of the list:

```typescript
unshift<TNum extends number>(num: TNum): BuilderTuple<[TNum, ...TList]> {
  this.list.unshift(num);

  return this as any;
}
```

Now when calling `unshift` with 3, then 2, then 1, we end up with the same list:

```typescript
const builderAfterPush = builderBeforePush.unshift(3).unshift(2).unshift(1);

// hovering shows 
unshift(num: 1): BuilderTuple<[1, 2, 3]>
```

This example of the builder pattern shows us how cool it is to have deep inference of things being added to a root element.

## Transcript
0:00 One really cool aspect of classes is that they let us enact the builder pattern really beautifully. The builder pattern can be used to make some amazing APIs, and it fits really nicely with TypeScript. Let's look at what I mean.

0:15 We have a class here called BuilderTuple. If I hover over it, I can see that in the type argument, there's an empty tuple here. It's called builderBeforePush. Inside that builder, we have a list. That list is typed as an empty array. This is an empty tuple, nothing in it. What I can do is I can push things into the BuilderTuple. What it's going to do is it's going to add them to the array.

0:40 You've got builderBeforePush and then builderAfterPush. It's literally just pushing it onto the type level there. Push number 2, and we get builder 1, 2, and then push 3, and then we end up with BuilderTuple 1, 2, 3. The list after the push is 1, 2, and 3. That's what these tests are looking at here.

1:03 I'm going to just scrap all this and build it up from scratch so you can see how I constructed it. I'm going to export class, let's say, BuilderTuple. It's going to have a list on it. That list, it's going to be very, very dynamic. Anything can belong in this list. I'm going to make this a generic here. I'm going to make this TList and list is going to be TList.

1:29 Then when we build up the constructor, we're going to go this.list is an empty array. We've got our first error here, because TList could be instantiated with an arbitrary type that could be unrelated to never. Yes, you're right, never is not assignable to TList. We don't know what TList can be.

1:46 TList, a good constraint for it would be any array. It can be any array whatsoever. This.list equals blah, blah, blah, blah, blah is not assignable to the constraint again, so I'm going to patch it with as any array, or rather this one needs to go there. This.list equals this as any. Are you going to be happy with that? You'll be happy with that.

2:10 You'll notice with the builder pattern, you're going to need to use some as, some assertions here. Now we've got our initial BuilderTuple, but our tests are failing because the initial builder, it's typed as BuilderTuple any array. This list is now an array of any instead of being just a single tuple.

2:32 The way that we can do that, or rather a tuple without anything in, is we can add it into the default parameter here or the default generic. We can say equals this. This is really crucial. We need to have a specific point in the builder pattern where we start. This default generic gives it a point to start from. This list is now passing.

2:55 Now we need to implement the push method, because the push currently doesn't exist on here. Let's go push. What we're going to be pushing, we're going to be pushing, let's say, a number. This number, let's say, is just number. We're going to go this.list.push num. Then we're going to return this.

3:17 Now returning this, what this means is if we didn't do this, then the first instance would just return void, and we wouldn't be able to chain these methods together. By returning this, we get to go push, push, push, and build up all of this stuff. This is what's classically known as the builder pattern. You're building up a tuple, in this case.

3:38 There's an issue, which is the listAfterPush is still the same as the listBeforePush. While we've changed the list here, we haven't changed the generic in order to make it catch up. That's what we want to do. The way we can do them is we first need to infer the type from this push. We'll go TNum, and we'll say, "Let's put this in TNum here."

4:04 There's a small problem with this, which is that push currently just infers it as a number. We can constrain that a bit more by saying TNum extends number. Now it's going to infer it as 1, as 2, and as 3. That's really good. We've got our inference happening there and TNum is typed correctly.

4:23 The return type is not typed correctly. What we're trying to do is every time you push to it, we want to change this to append the new value to it. The way we do that is we can do...There's couple of ways. We can do this as BuilderTuple. Here, we're saying, "OK, we're doing this as BuilderTuple," taking advantage of the fact that you can pass classes as types.

4:49 We're going to say, "We're now going to pass in the new list that's here." Let's say we pass in this. Let's say we just pass in 1, this as BuilderTuple 1. This blah, blah, blah, blah, blah, blah, I'm going to have to do this as any as this for now, just to make it happy.

5:12 Now what we get is builderBeforePush is going to BuilderTuple with an empty array, and builderAfterPush is going to be BuilderTuple with a single member in it, which is this 1 that I've added. I don't want 1, I want this TNum. This TNum, we know it's going to be inferred as 1 here, inferred as 2 there, inferred as 3 there.

5:32 Except now, the builderAfterPush, you notice that the latest one gets pushed in. We can remove this, for instance, and then we get 2 being added in. The final flourish for this is we need to spread in the existing list and push TNum on to the end there. Now every time you push to it, it creates a new version of it.

5:58 This one, after this first push, we add the 1 in there. After the second push, we add the 2 in there. After the third push, we add the 3 in there. You end up with an actual tuple, which is inferred as all the members at runtime and on the type level.

6:14 Let's run back through all of that. We have a list. That list has to be instantiated with a default generic. There are a couple of as anys here to patch over some of the logic with TypeScript. We add a push method. That push method infers the new value on the type level. At runtime, it pushes it to the list.

6:34 Then we say, "Return this as any as BuilderTuple." A cleaner way to do this just to avoid a second as would be to make this the return type here. Let's do just one more fun thing, which is I'm going to add an unshift method. This, we'll add it to the start. This is going to call the unshift method on the list array here.

6:54 On here, instead of having TList and TNum -- See if you can pause the video briefly, see if you can figure this out for yourself -- we're going to swap the order of these. We'll have TNum at the start and TList at the end.

7:09 Now let's change the order of these a little bit. Let's say we unshift 3, unshift 2, unshift 1. Now, because we've done 3, 2, 1, it's going to reverse the order for us. It turns out to be exactly the same type as when we push them together but in a different order.

7:30 This is the builder pattern. It's incredibly cool because you can really deeply infer the things that you're adding into your root element, your root type, and you can build up amazing stuff with this.

# 5. TRPC's Creator on the Builder Pattern

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=17da2ce5-b174-41f3-a399-eef2a8d9fedc&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0501-trpcs-creator-on-the-builder-pattern.mp4.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=17da2ce5-b174-41f3-a399-eef2a8d9fedc&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0501-trpcs-creator-on-the-builder-pattern.mp4.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Explainer
Alex, the creator of [the TRPC library](https://trpc.io/), walks through their understanding of the builder pattern in TypeScript using an example.

## Resources

[

github.com

https://github.com/trpc/trpc/blob/main/examples/minimal/server/index.ts#L11

](https://github.com/trpc/trpc/blob/main/examples/minimal/server/index.ts#L11)

[

trpc.io

https://trpc.io/

](https://trpc.io/)

[

twitter.com

https://twitter.com/alexdotjs

](https://twitter.com/alexdotjs)

## Transcript
0:00 I asked Alex, the creator of tRPC, to talk me through his understanding of the builder pattern and how it was implemented in tRPC.

0:08 We've got this publicProcedure then, that has a .input and a .query on it. This is using the builder pattern. I would love to use this as an excuse to just get your thoughts on the builder pattern. Could you explain it like I'm five, using this as an example?

0:26 Basically, here, you have a publicProcedure, which is just an object, mind you. It's just an object. When you call input on that, you return a new object with different behavior. You can do that recursively because every time you call it, it returns itself but with some more type information.

0:53 We have the base procedure that doesn't have any types. Then you call input on it. Then it's another builder that has some more types. Then you can call input again. It will combine those inputs that you already had. Then, every time you call it, you will return a new instance of itself, until you call the ending thing that actually returns the procedure itself.

1:19 The ending, in our case, it's either a subscription or query or mutation. You can either have a query, a mutation, or a subscription as a procedure. That's the last thing you do. In that, you actually write the logic that is unique to this procedure.

1:36 Everything else, as part of that build chain, can and should be reused across multiple procedures. You can do a base procedure that has authentication, where we check that a user is authenticated. The context object includes a user.

1:57 Then you can infer a new context to the following builder, the new builder instance that is created. In that way, you can make these really nice, reusable snippets of code. Yeah, build out your application that way.

2:11 The idea here is that we have publicProcedure. It looks like a ProcedureBuilder. Then we have inputs. You call input, which returns another ProcedureBuilder with more generics in it. Then you call query, which doesn't return a ProcedureBuilder. It returns a BuildProcedure, like the final instance of the thing.

2:33 Yeah. That should change name. It should be just Procedure or Result or something. Yeah, that's what it does.

2:42 But we can't do like input on this or something and continue the chain.

2:46 No. The procedure is built up to that point. Then you end it. It completes the craziness.

2:53 Why would you do this like this instead of, let's say, having, let's say, an object with input on it or a query on it, like this? Why use that specific type of syntax?

3:06 It makes it easier to make things reusable. We have considered this pattern, as well, as a shorthand way of doing things. Because I do agree that an object reads better, if I were going to be honest. When you have that, I think it reads a lot better.

3:25 The problem with this is that you can't do a base procedure and reuse it. If you only had this API, any time you define a middleware, you would have to define that in every procedure. Without a builder pattern, that I know of, in nice way, achieve something like that, so we've opted to have an only builder pattern API.

3:53 There you go. The builder pattern gives you a lot of reusability but also gives you a really nice paradigm where you can add generics, bit by bit, into a structure and then get back something that lets you be really strongly typed.

# 6. Create a Type Safe Map with the Builder Pattern

[

github.com

https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/04-classes/20-type-safe-map.problem.ts

](https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/04-classes/20-type-safe-map.problem.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=68816b8b-42aa-4875-8bd1-44f4992309f6&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0601-create-a-type-safe-map-with-the-builder-pattern-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=68816b8b-42aa-4875-8bd1-44f4992309f6&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0601-create-a-type-safe-map-with-the-builder-pattern-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
For this exercise, you'll be implementing a little piece of a builder pattern class.

Here is a `TypeSafeStringMap` class:

```typescript
class TypeSafeStringMap<TMap extends Record<string, string> = {}> {
  private map: TMap;
  constructor() {
    this.map = {} as TMap;
  }

  get(key: keyof TMap): string {
    return this.map[key];
  }

  set<K extends string>(key: K, value: string): unknown {
    (this.map[key] as any) = value;

    return this;
  }
}
```

It's similar to the tuple class we saw earlier, but this time it is a `Record`.

There's also an example `map`:

```typescript
const map = new TypeSafeStringMap()
  .set("matt", "pocock")
  .set("jools", "holland")
  .set("brandi", "carlile");
```

We only care about the keys, because that's what is used to type the `get` function of the class.

For the time being, it's not working very well: The `map` is typed as `any` because the `set` is typed as `unknown`.

## Challenge
Your challenge is to work out how to properly type the class. Start with the `TMap` generic and gradually add more types. This will give good autocompletion and the tests will pass as expected.

## Transcript
0:00 In this exercise, I'm going to get you to implement a little piece of a build-a-pattern class. This is a type-safe string map. It's pretty similar to the tuple we had before except it's a record instead of a tuple. We have a map here where we're building it up by setting Matt Pocock, Jools Holland, and Brandi Carlisle.

0:20 We only really care about the keys here. Currently, all of the values are going to be strings. We only care about the keys because that's what we're going to use to type our get function. Our get function here currently doesn't look like it's working terribly well because map is currently typed as any.

0:41 That's because our set function is typed as unknown, the return type here. Your job is to work out what the type for this should be knowing that we have this TMapGeneric up here that we're slowly trying to build up and add more types to. We should be able to get autocomplete inside this area here.

1:02 This should be throwing an error. I should be able to return string each time I do a get. Good luck.

# Solution: Getters and Setters in the Builder Pattern

[

github.com

https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/04-classes/20-type-safe-map.solution.ts

](https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/04-classes/20-type-safe-map.solution.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=96c44d12-042d-40a1-9b2c-d2e43aef3816&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0602-create-a-type-safe-map-with-the-builder-pattern-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=96c44d12-042d-40a1-9b2c-d2e43aef3816&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0602-create-a-type-safe-map-with-the-builder-pattern-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
The `set` method is typed as `unknown`, which means that we can't call any methods on it.

Let's remove the `unknown` from `set`.

```typescript
// removed the unknown from set
set<K extends string>(key: K, value: string) {
  (this.map[key] as any) = value;

  return this;
}
```

Now when we hover over the example `map`, we can see that the `TypeSafeStringMap` ends up returning an empty object:

```typescript
// hovering over map
const map = new TypeSafeStringMap()
  .set("matt", "pocock")

// shows
const map: TypeSafeStringMap<{}>
```

This indicates that the builder pattern isn't working yet, because even though the type of `matt` is being inferred as a string, it's not actually added to the record:

```typescript
// hovering over .set from the example map
(method) TypeSafeStringMap<{}>.set<"matt">(key: "matt", value: string): TypeSafeStringMap<{}>
```

To fix this, we need to add a return type to `set`.

This return type should be a `TypeSafeStringMap`, and we need to pass in `TMap` first.

The `TMap` is the `Record<string, string>` that defaults to an empty object, so we need to add the key and the value that come in.

To do this we'll use the `&` to intersect a `Record` of `<K, string>`:

```typescript
set<K extends string>(
  key: K,
  value: string,
): TypeSafeStringMap<TMap & Record<K, string>> {
  (this.map[key] as any) = value;

  return this;
}
```

Now when we hover over the example `map`, we end up with a `TypeSafeStringMap` that has a `Record` with `"matt"` and `string` as expected:

By now you should be starting to get a sense for what's possible with the builder pattern.

You can represent anything you want by doing some type transformations, and the pattern of doing a return type that adds something to the generic slot is extremely powerful!

## Transcript
0:00 The fix here is to change the type of the set method. Before we had this unknown there. Now what this was doing is it's saying object was a type unknown so you can't call any stuff on it. Unknown is obviously wrong. What happens if we remove that? If we remove that we return this.

0:18 What we end up with is if we just remove this couple of things here, we end up with type-safe string map with an empty object. What this indicates to me is that the builder pattern isn't yet working because even though we're inferring the type of mat from here it's not being added to that record.

0:37 We need to add a return type on here. This is going to be type-safe string map. We need to pass in tmap first. This tmap then it means that you're going to end up with this record up here, which is defaulted to an empty object. We need to add this key with the value and intersect it in. We can do this -- we can do, "And Record<K string."

1:07 Now, again, we don't care about the value here. That's going to be string here. We get...Wow, look at that. Let me build that up. We've got, "Set Matt Pocock." That means we end up with a type-safe string map with Record map and string in. Then we say, "Set Jools Holland." Then we can hover over that and see that, "And Record Jools string." Finally, "Set Brandi Carlisle."

1:38 What that means we end up with the perfect type for what we need -- Record Matt string, Record Jools Holland, and Record Brandi Carlisle. We get autocomplete here, which is just absolutely magic because this map.get, it's doing key of tmap here. Without that, we wouldn't get any autocomplete. We wouldn't get these errors here.

1:59 You can start to get a sense for what's possible with the builder pattern that you can represent really anything you want to in here just by doing some type transformations. This pattern of returning this of doing a return type which adds something into the generic slot is extremely powerful.

# 7. Debugging the Builder Pattern

[

github.com

https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/04-classes/21-importance-of-default-generic.problem.ts

](https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/04-classes/21-importance-of-default-generic.problem.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=d2e41f2a-8fc9-4b35-babb-0a8bdcecb75b&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0701-debugging-the-builder-pattern-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=d2e41f2a-8fc9-4b35-babb-0a8bdcecb75b&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0701-debugging-the-builder-pattern-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
I've made a small alteration to this file based on the previous exercise's solution, and now the code is not working as expected:

```typescript
class TypeSafeStringMap<TMap extends Record<string, string>> {
  private map: TMap;
  constructor() {
    this.map = {} as TMap;
  }

  get(key: keyof TMap): string {
    return this.map[key];
  }

  set<K extends string>(
    key: K,
    value: string,
  ): TypeSafeStringMap<TMap & Record<K, string>> {
    (this.map[key] as any) = value;

    return this;
  }
}
```

The `set` function still has a return type of `TypeSafeStringMap<TMap & Record<K, string>`, but autocomplete doesn't work inside of `get`.

## Challenge
You need to find the breaking change inside of the `TypeSafeStringMap` class, and fix it.

Hint: There's only a few characters difference. Look at the type level, not the runtime level!

## Transcript
0:00 I've made a small alteration to this file based on the previous exercise's solution. It's basically exactly the same, but I've made a small error and now it's not working anymore. Now we're getting map is record string string and record string.

0:19 We're not getting autocomplete inside Get anymore even though the set thing looks completely fine. Your job is to work out how I've broken this class here. It's only at the type level. I haven't changed much. In fact, it's only like three or four character's difference.

0:38 Good luck debugging this.

# Solution: Default Generics in the Builder Pattern

[

github.com

https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/04-classes/21-importance-of-default-generic.solution.ts

](https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/04-classes/21-importance-of-default-generic.solution.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=8bea00d8-e7a5-4a06-bf2d-f836e7ca68eb&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0702-debugging-the-builder-pattern-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=8bea00d8-e7a5-4a06-bf2d-f836e7ca68eb&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0702-debugging-the-builder-pattern-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
The thing I removed was the default generic from the `TypeSafeStringMap`.

## Without the Default Generic
Without the default of an empty object, hovering over the `new TypeSafeStringMap` in the example `map` shows us this:

```typescript
constructor TypeSafeStringMap<Record<string, string>>(): TypeSafeStringMap<Record<string, string>>
```

If we call `.set("matt", "pocock")`, we'll end up with `Record<string, string>` and `Record<"matt", string>` being generated:

```typescript
// hovering over set
const map = new TypeSafeStringMap().set("matt", "pocock")

// shows
(method) TypeSafeStringMap<Record<string, string>>(key: "matt", value: string): TypeSafeStringMap<Record<string, string> & Record<"matt", string>>
```

Because the `get` has a key of `keyof TMap`, and the default of `TMap` is a `Record<string, string>`, we lose the `"matt"`.

```typescript
get(key: keyof TMap): string {
  return this.map[key];
}
```

This means the `get` does not have type safety.

## Adding the Default Empty Object
To fix this issue, the class needs a default generic of an empty object.

Here's what it should look like:

```typescript
class TypeSafeStringMap<TMap extends Record<string, string> = {}> {
  private map: TMap;
  ...
```

Now when we we hover over the `TypeSafeStringMap` from the map, the first thing we'll see is the empty object:

```typescript
// hovering over `TypeSafeStringMap
const map = new TypeSafeStringMap().set("matt", "pocock")

// shows
constructor TypeSafeStringMap<{}>(): TypeSafeStringMap<{}>
```

With the empty object, if we don't `set` anything then calling the `get` method will be `key: never`.

```typescript
// hovering over get
const result = map.get("");

// shows
(method) TypeSafeStringMap<{}>.get(key: never): string
```

The `keyof` an empty object is `never`, but would lose to a `keyof` of other types like string.

For example, if we had this `Example`:

```typescript
type Example = keyof {} | keyof { matt: string };
```

The type would return in `type Example = "matt"`.

If we added an additional type to the `Example`, the `never` disappears from the union:

```typescript
type Example = keyof {} | keyof { matt: string } | keyof {brandi: string};

// results in
type Example = "matt" | "brandi"
```

This exercise shows the importance of the default generic for giving the building pattern a type safe place to start from.

Be sure to add a default when using the pattern, as it can be tricky to debug!

## Transcript
0:01 The thing that I changed was I changed this default generic. In other words, I removed it. When I removed it, some interesting things happened.

0:12 We have this map here. If I just remove all of this guff here, this map is now typed as TypeSafeStringMap and the default is Record, string, string. When you don't provide a default, it defaults to this. Now, this type here is tricky, because what we can do is we can set('matt', 'pocock') again.

0:34 This, what it ends up with is Record, string, string and Record, "matt", string. What this means is because keyof TMap is being called here. What you get is, if we say, const result = map.get. Let's say, blah blah blah. The key is typed as string.

0:59 If we have type, let's say, Example = 'matt' or string, then this is going to be resolved as string. The matt disappears inside here. Because get(key: keyof TMap) and the default is a Record string, that little string just there ruins the whole thing, because it means that we don't get typesafety on the get.

1:28 The way to solve this is by adding back that default generic. Now, the first thing that's here will be an empty object. Meaning that, if we don't set anything, then this will be never. This method will be key never because if we look at type Example = keyof this, the keyof empty object is never.

1:55 When you have like this or keyof { matt: string }, for instance, then that's going to win out. The never is going to disappear from the union and you end up with matt here, keyof this. If we go, keyof { brandi: string }, then brandi is going to be added to the thing as well.

2:24 This is basically the importance of this default generic. It gives your builder pattern a TypeSafe place to start. It means that you have to be really, really careful, because that error is pretty hard to debug and it shows how important this default generic is.

# 8. Building Chainable Middleware with the Builder Pattern

[

github.com

https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/04-classes/22-dynamic-middleware.problem.ts

](https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/04-classes/22-dynamic-middleware.problem.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=349b727a-1f12-4661-a47a-d969763e8a2e&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0801-building-chainable-middleware-with-the-builder-pattern-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=349b727a-1f12-4661-a47a-d969763e8a2e&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0801-building-chainable-middleware-with-the-builder-pattern-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
This exercise is a real mind-bender, but it showcases the power of generics and the builder pattern.

We start with a `DynamicMiddleware` class which lets you create a chain of inputs and outputs, and then run them to get a result.

The `DynamicMiddleware` takes in a function as an argument. This function takes in an input and returns an output.

```typescript
class DynamicMiddleware<TInput, TOutput> {
  private middleware: Middleware<any, any>[] = [];

  constructor(firstMiddleware: Middleware<TInput, TOutput>) {
    this.middleware.push(firstMiddleware);
  }

  use(middleware: Middleware<TInput, TOutput>): unknown {
    this.middleware.push(middleware);

    return this as any;
    //          ^ You'll need the 'as any'!
  }

  async run(input: TInput): Promise<TOutput> {
    let result: TOutput = input as any;

    for (const middleware of this.middleware) {
      result = await middleware(result);
    }

    return result;
  }
}
```

The class contains a `middleware` variable that is of the `Middleware` type:

The type has arguments of `TInput` and `TOutput`, and then returns a function that returns either `TOutput` or a `Promise` wrapping `TOutput`:

```typescript
type Middleware<TInput, TOutput> = (
  input: TInput
) => TOutput | Promise<TOutput>;
```

Inside of the constructor, types are inferred from the `firstMiddleware`.

In this example, we create a `middleware` example.

```typescript
const middleware = new DynamicMiddleware((req: Request) => {
  return {
    ...req,
    // Transforms /user/123 to 123
    userId: req.url.split("/")[2],
  };
}).use((req) => {
  ...
```

Hovering over `DynamicMiddleware`, we can see that `Request` is locked in as the first type argument, and thesecond type argument is a `Request` but with a `userId` added to it along with other things from a `fake-external-lib`:

```typescript
constructor DynamicMiddleware<Request, {
  userId: string;
  cache: RequestCache,
  ...
}>(firstMiddleware: Middleware<...>): DynamicMiddleware<...>
```

Removing `userId` and hovering over `DynamicMiddleware` will change what is inferred, but the ideas is that we should be able to pass anything in and do some type transformations.

As seen in the tests, we should be able to call [`middleware.run`](http://middleware.run)`()` and `await` the result.

However, in this current state we don't have very good inference and the tests are failing.

Conceptually we have our dynamic middleware that we're expecting to be able to call with an initial `TInput` and get back the last thing from our `use` call.

The problem is that `use` is not generic.

## Challenge
This is one of the most difficult challenges you've seen far throughout all of the workshop modules!

Your job is to update the `use` function inside of `DynamicMiddleware` so the class behaves as expected.

Think back to previous builder pattern exercises, and how top level generics have needed changed.

Hint: You will need to keep the `as any` in the `return`!

## Transcript
0:00 This exercise is a real mind-bender and shows off some of the power of generics and the power of this builder pattern. We have a dynamic middleware class. This dynamic middleware class basically lets you create a chain of inputs and outputs, which then allows you to run them and spit out a result.

0:19 The dynamic middleware, the first time you call it, it takes in a function, which takes in an input and returns an output. What you can see here is this middleware type has middleware TInput, TOutput, input, input, and then returns this. It's a function that returns either TOutput or a promise wrapping TOutput.

0:42 Then we can see in the constructor, we're taking the first middleware. The dynamic middleware class infers that type from. What you can see is when we call this, we have request locked in in the first type argument. In the second type argument, I promise you it's a request but it also has a user ID added to it.

1:06 If we remove that user ID, then we end up with request and this thing. If we just return the request, then it infers request, request. If we return a number, it infers a number. You can pass anything to it and do any transformations to it. The issue is this use function is not quite delivering.

1:26 There's one more thing to show you, which is, at the
end, what you should be able to do is you should be able to return
[middleware.run](http://middleware.run) and await it, and then you end up with the result. The
result should be what gets returned from the last use that's been
called. Currently, the flow is we've got a request here. We append a
user ID to it.

1:48 We check if the user ID has a...if it's 123, then for some reason that's a bad idea. We don't want that user ID. We throw an error. Otherwise, we do one more transformation where we take the request and we add a user to it where we fetch the user. This fetch user is just coming from a fake external library. It's just like returning some data.

2:11 That's coming from fake external lib. You don't need to touch this. You don't need to worry about fetch user. The only bits you're going to need to change are inside this function. There are a few as anys here that you are going to need because we're doing some really highly generic complicated stuff here.

2:29 These anys, too, also, you're probably going to need them. Now, the issue here is that it doesn't seem to be picking up the fact that this seems to be just another request inside here. It seems like when we add the use, we're going to need to infer some generics there when we call the use because we're going to need to infer the thing that's being passed back from this.

2:55 Nothing seems to be working here. Your job is we're probably going to need to add an extra generic onto use. We're probably going to need to think about this slightly differently and definitely change this return type because currently this is just typed as any here. We're going to need to add something in this slot here.

3:19 There's a lot there. Think about what you've seen from the builder pattern before and how you need to change the top-level generic or maybe alter it in some way. We're definitely going to need to return dynamic middleware in some sense because we're just returning this after having mutated it. A lot there. See if you can get your brain in gear. Good luck.

# Solution: The Power of Generics and the Builder Pattern

[

github.com

https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/04-classes/22-dynamic-middleware.solution.ts

](https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/04-classes/22-dynamic-middleware.solution.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=f5252930-a789-4bce-bcb0-75c3ce364013&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0802-building-chainable-middleware-with-the-builder-pattern-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=f5252930-a789-4bce-bcb0-75c3ce364013&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0802-building-chainable-middleware-with-the-builder-pattern-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Recapping the Problem
The `DynamicMiddleware` class has an initial `TInput` and `TOutput` that are inferred from what is passed in.

So we're expecting to be able to call it like this:

```typescript
expect(middleware.run({ url: "/user/123" } as Request)).rejects.toThrow();
```

Where the `\{url: "/user/123"\} as Request` is the thing that is the initial `TInput`.

In the `middleware` example, the first function that we infer needs to be exactly the same function type throughout the rest of it.

But with the current implementation, we don't get back the `user` from `fetchUser` because `req.userId` doesn't exist on type `Request` yet.

```typescript
const middleware = new DynamicMiddleware((req: Request) => {
  return {
    ...req,
    // Transforms /user/123 to 123
    userId: req.url.split("/")[2],
  };
})
  .use((req) => {
    if (req.userId === "123") {
      throw new Error();
    }
    return req;
  })
  // we expect this back:
  .use(async (req) => {
    return {
      ...req,
      user: await fetchUser(req.userId),
    };
  });
```

These problems all stem from `use` not being generic.

## Adding the Generic
In order to fix the problem, we need to make `use` generic.

The first thing to do is add a `<TNewOutput>` slot to `use`, which will be used for inferring what is returned from the `middleware`:

```typescript
use<NewTOutput>(...
```

Now the `middleware` that is returned is not going to be the _input_, but instead is going to be the _output_ of the first middleware.

Look at the as each of the generic slots being like a new line that recursively goes down. The `TInput` stays the same, but the `TOutput` will change on each run.

This means that we have to pass `TOutput` to `middleware`:

```typescript
  use<NewTOutput>(
    middleware: Middleware<TOutput, NewTOutput>
  ): ...
```

With this change, the error for checking `req.userId` in the example is resolved.

Now we need to infer the type of `NewTOutput`, which will be the thing that we get back from the first call to `use`.

As seen in previous exercises, we need to update the `use` function to add a return type that returns the class but with a new set of generics.

So the return type will be `DynamicMiddleware` with the same `TInput` but an output of the `TNewOutput` that results from `middleware`.

Here's the solution all together:

```typescript
  use<NewTOutput>(
    middleware: Middleware<TOutput, NewTOutput>
  ): DynamicMiddleware<TInput, NewTOutput> {
    this.middleware.push(middleware);

    return this as any;
  }
```

## Checking Our Work
To recap what we've done, let's create a new `middleware2` with a function that takes in an `input` string and returns the result of running `parseFloat` on the input:

```typescript
const middleware2 = new DynamicMiddleware((input: string) => parseFloat(input))
```

Then we'll call `use` to use that output, and return `num.toFixed()` so that `middleware2` takes a string and returns a string:

```typescript
const middleware2 = new DynamicMiddleware((input: string) =>
  parseFloat(input)
  ).use((num) => {
    return num.toFixed();
  });
```

Everything works because we have a `TNewOutput` that's being inferred on that `use`, which changes the `DynamicMiddleware` itself to be `<TInput, TNewOutput>`.

This was one of the trickier exercises in TypeScript so far, but you can see the power here.

Whenever you build something with chainable methods, you can follow the builder pattern to create beautiful abstractions without having to add a bunch of type annotations.

## Transcript
0:01 Conceptually, what's happening here? We have our DynamicMiddleware, and it's being called like this. We're inferring our initial TInput, our initial TOutput. When it's run, we're expecting to be able to call it with the thing that is the initial TInput, but we're expecting back the last thing that we get back from our use.

0:24 Currently, use is not generic, which is bonkers because whatever we return from the middleware that we pass to use, that's got to be the new generic inside DynamicMiddleware, because currently, inside use, this looks right but it's totally wrong because the first thing that we infer there, it then needs to be exactly the same function type throughout the rest of it, so inside here and inside here, which means that we don't get back the user on our fetchUser, and req.userId doesn't exist on type request yet.

0:59 Let's fix that. What we're going to need to do is we're going to need to add a TNewOutput here. TNewOutput, what that's going to do is it's going to be the slot where we infer what we return from that middleware. The middleware that we return is not going to be the input. It's going to be the output of the firstMiddleware.

1:21 You start to see that each one of these classes or each one of these generic slots is going to be a new line recursively going down and down and down, where the TInput stays the same, but the TOutput changes on each run. We're going to pass TOutput here.

1:38 What that means is we get request.userId. Good, we've got a little win. Now if we add a new attribute on to this, then we also get that added here. Very nice. We're getting somewhere. How are we going to infer this TNewOutput? That's going to be the thing that we get back from this use here.

2.02 We've got this use. If I were to add something onto this, let's say, so request, and let's say, wow true here, then if I hover over use, you can see that DynamicMiddleware use...Here we go, so use. Now this is the thing that's being inferred back. If I return just a number here, that will clean things up. I've got a number coming back.

2.25 You can see that use, if I get this right, there you go, it's being inferred in that slot. Now if I save this and go const middleware2 = middleware.use, then this middleware, of course, it's being inferred as any. Why is it being inferred as any? It's because use returns any as its output, because we're doing this as any. We need to figure out this return type.

2.53 You will have seen from the previous exercise, we need to return this class, but with a new set of generics in it. The way to do that, DynamicMiddleware, and this is going to be TInput, we're keeping that TInput the same, and we're changing the output, TNewOutput. Now what we have is request then, this is now middleware that takes in a request and returns a number.

3:22 We can change this. We can go takes in a request and returns a string, and go req here. This one now takes in a request and returns a user. This is just so, so cool. We can just clip that onto there, and then we've got our chains back. Now we should be getting really nice types here. We should be getting this result, user, id, firstName, lastName string, and we get autocomplete based on that.

3:58 If we stop fetching the user here, then this
[result.user.id](http://result.user.id) no longer exists on that because it's not in the types.
This middleware now takes in a request and returns a request with a
user. You could use this pattern then for all sorts of stuff. This
pattern is then totally generic.

4:17 We can go const middleware2, your newDynamicMiddleware. Let's say it takes in a input, which is a string, and then goes parseFloat on the string. We've got a middleware then that takes in a string and returns a number. Let's say that we go use again, and we take in the num and return num.toFixed. Now it takes in a string and returns a string.

4:46 This pattern is just so, so powerful. The keys that made it work is we have a TNewOutput that's being inferred on that use, which changes the DynamicMiddleware itself to be TInput, TNewOutput. Let's remove a couple of as anys and see why they're useful. This is, again, we're having to...We can't fix this really.

5:14 What we're saying here is we're mutating the class, and TypeScript doesn't know that we're mutating the class. We could change it totally, change the runtime implementation to return a new instance of the class, so new DynamicMiddleware, but this is just more inefficient and changes the behavior at runtime.

5:37 As any, or rather as DynamicMiddleware this, this is probably more accurate, although this doesn't even work because TNewOutput could be totally different. We say as unknown as this, which is the same as as any.

5:56 Your head is probably spinning. This is one of the trickier exercises in total TypeScript so far. I hope you can see the power here, that whenever you use one of these chainable methods or build one of these chainable methods, it gives you the potential for building these amazing chains of inference, which just can create such cool code and beautiful abstractions.

6:20 You notice that I'm able to build all of this complicated stuff without a single type annotation or just one type annotation from the user. It's really, really cool. Thank you. Well done for having the gumption to go through this exercise. Nice work.

# 9. Subclassing in Zod

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=d7d8ebd7-398f-4fd8-9e32-1132b0d96b79&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0901-subclassing-in-zod.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=d7d8ebd7-398f-4fd8-9e32-1132b0d96b79&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0901-subclassing-in-zod.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Explainer
Zod is mostly written with classes. There's a base `Z.ZodType` class that pretty much every other class inherits from.

Colin, the creator of Zod, demonstrates how this pattern's approach to generics provides complexity boundaries.

## Resources

[

zod.dev

https://zod.dev/

](https://zod.dev/)

[

github.com

https://github.com/colinhacks/zod/blob/master/src/types.ts#L569

](https://github.com/colinhacks/zod/blob/master/src/types.ts#L569)

[

twitter.com

https://twitter.com/colinhacks

](https://twitter.com/colinhacks)

## Transcript
0:00 Let's go on a little diversion and show you something really cool about classes that Colin, the creator of Zod, taught me. Zod is mostly written with classes.

0:09 They have a base class which is called z.ZodType, and pretty much every other class that comes from it, so ZodString, ZodNull, ZodNumber, inherits from that base class. This gives you a really interesting approach when it comes to generics.

0:23 Something that's interesting here about the subclass approach is that it gives you these complexity boundaries, which is really nice. When you create a ZodString schema and you hover over it in VS code, it just says ZodString, which is really valuable, I think. Z.ZodString, that's really nice.

0:43 This subclassing is one of the few patterns in TypeScript that lets you really represent complex things, but then it's hidden in the IntelliSense, basically.

0:54 If I just did something, if I represented this instead with subclasses as just with the type keyword, and I just had, let's say I have a type, which is just all of the methods defined on the base class, and then I have additional methods or something that are specific to the string schema, and the way that I represent the result of z.String is I union those together, that is similar to subclassing in some sense.

1:22 You've got the base methods frm one type, you've got all the other stuff defined in another type, and you just mush them together. That basically, would be equivalent, but the way that TypeScript would represent that to you is as this horrifying union of two very complicated object types. It would just be completely unintelligible.

1:41 Here's an example of what Colin is talking about. You would have something like ZodString here, which would be a type object with a bunch of different methods on it. Imagine 20, 30 methods, however many ZodString has, then you would intersect it with ZodType where you actually have the base type here, which has all the base methods.

2:00 Here we're passing in String just like ZodString does to ZodType, and then you would have this here too. When you actually use this, so imagine we have this String here, you do actually when you hover over the thing that you've created at this, you get ZodString, which is quite nice to read.

2:17 If you hover over this, then imagine this, it spills out into everything, and so you get the raw definition here and this funny intersection here. This does not scale in terms of complexity very well. Colin's found this really cool approach with this subclassing, that lets you be really, really specific with how you want it to appear in the IntelliSense.

2:38 There's this two-level generic pattern. ZodString is simplified here because ZodString itself is not generic, which is interesting. It's just, ZodString, no generic parameters after that, but it extends that superclass, and then you just pass in all of those generics that correspond to in this scenario of what the def type is and then what the actual inferred type is, which of course is just String.

3:03 There you go. This gives you a method for hiding generic complexity in your libraries if that's what you really want. It means that actually using classes can be used as a way to make small things internal in your type system if you need them to.

# Resources

[

trpc.io

https://trpc.io/

](https://trpc.io/)

# (e) External Libraries



# 1. Where Do External Types Come From?

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=6752d326-c422-4f74-b614-754e6fa9285c&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="01-where-do-external-types-come-from.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=6752d326-c422-4f74-b614-754e6fa9285c&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="01-where-do-external-types-come-from.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Explainer
Orta Therox, a former member of the core TypeScript team, discusses how types that you don't define can make their way into your application code.

## Resources

[

github.com

https://github.com/microsoft/TypeScript/blob/main/lib/lib.d.ts

](https://github.com/microsoft/TypeScript/blob/main/lib/lib.d.ts)

[

github.com

https://github.com/microsoft/TypeScript/blob/main/lib/lib.dom.d.ts

](https://github.com/microsoft/TypeScript/blob/main/lib/lib.dom.d.ts)

[

definitelytyped.github.io

http://definitelytyped.github.io/

](http://definitelytyped.github.io/)

## Transcript
0:00 I spoke to \[indecipherable , who used to be a member of the TypeScript team, and he mentioned there are four different spaces where types that you don't define come into your application code.

0:11 I'd say there are roughly four spaces where types can come into your projects. The types that get shipped with TypeScript, we would refer to as lib.d.ts. There's the DOM types, which dom.d.ts. There's definitely typed, and then there's included inside your either codebase or your Node Package Manager.

0:32 Lib.d.ts exists to describe JavaScript. JavaScript language spec 2015 had classes and somebody has to ship those to describe that type system further down the line.

0:46 What you're saying is, let's say, const Whatever = Map. Going from this, how would I say, "OK, I want to see where this d.ts file is coming from?"

0:56 Are you on a Mac? You could command and click on that. It should, actually show you.

1:00 We're now on lib.es2015collection.d.ts. This is one of the many, many files in here that represents all of the stuff that JavaScript can do.

1:11 Exactly. Every single one of those is either a spec or a feature collection that's very explicitly about describing the JavaScript spec and nothing else. This one, you've got WeakMap on screen as well as set under there.

1:26 Those are things that were added to JavaScript in the 2015 version of JavaScript. Each one of those files represents a subset of that year's language. If you've got ES2017 installed, then it also includes all of ES2015, etc., etc. The target definition in your tsconfig defines what is the year that you start and then it goes all the way back in those.

1:50 The next space where types come into your project is in the DOM typings.

1:54 Now, a realistic take on what people do with JavaScript is to say, "Hey, most people are working with Web in JavaScript." TypeScript is 10, 12 years old at this point and at that point it was the only use case for JavaScript, especially.

2:11 It was a very reasonable idea and it still probably is to include dom.d.ts as the default. Lib.dom.d.ts is pretty complicated project that outputs a single DOM file and that small iteration file that you saw next to it.

2:26 This one is a separate repo from the TypeScript repo. It is maintained by an outside collaborator who works at Mozilla and is constantly up-to-date with spec changes in web browsers.

2:42 The problem with this one is realistically, you don't want a version your web browsers in the way that you might for your language. Our rules for this are if a feature is in the Web platform in general and you can see it in at least two browsers, that's Firefox, Safari, or Chrome EUMS. It has to be in two of those to be allowed in.

3:08 What we really do is we look at the database behind, I think it's called, "Can I Use This?" Which is a website that lets you say, "Hey, can I use the CSS feature? Can I use this JavaScript feature?" We pull data from that in documentation and turn that into a giant DTS file.

3:26 That is constantly updated. We get notifications about new updates all the time and this always represents the latest version of the DOM.

3:35 The third space is...

3:37 Definitely, typed. That is describing code, which is in JavaScript, but no one has really turned that into TypeScript code. The way to think about that is those last two are, is it a codebase that is made in TypeScript that generates DTS files or is it a JavaScript project that is not got types?

3:58 We don't want to annoy the authors of that JavaScript project by giving them the types to try and maintain, because some of these types are complicated. These types are complicated, the React types are complicated. The React team don't use TypeScript.

4:10 There are a set of absolute heroes that try to map this very complicated system of React into a runtime that can exist inside the type system.

4:23 The fourth space where types can come into your project.

# 2. Extract Types to Extend an External Library

[

github.com

https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/05-external-libraries/23-extract-external-lib-types.problem.ts

](https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/05-external-libraries/23-extract-external-lib-types.problem.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=da1799f4-a0f3-4e84-bb10-7e10b257b346&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0201-extract-types-to-extend-an-external-library-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=da1799f4-a0f3-4e84-bb10-7e10b257b346&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0201-extract-types-to-extend-an-external-library-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
In this exercise, we're importing `FetchUser` from `fake-external-lib`. We'll be working with this fake library throughout this section.

Looking at the definition of `fetchUser`, we can see that it doesn't expose a return type from the library. It's just the implementation:

```typescript
// inside fake-external-lib/fetches.ts
export const fetchUser = async (id: string) => {
  return {
    id,
    firstName: "John",
    lastName: "Doe",
  };
};
```

What we want to do is extend `fetchUser` by adding a `fullName` property.

## Challenge
Your challenge is to extract the type from the `fetchUser` function, and add `fullName` to it. We also need to do the same with parameters of `FetchUser`.

```typescript
/**
 * We're using a function from fake-external lib, but we need
 * to extend the types. Extract the types below.
 */

type ParametersOfFetchUser = unknown;

type ReturnTypeOfFetchUserWithFullName = unknown;

export const fetchUserWithFullName = async (
  ...args: ParametersOfFetchUser
): Promise<ReturnTypeOfFetchUserWithFullName> => {
  const user = await fetchUser(...args);
  return {
    ...user,
    fullName: `${user.firstName} ${user.lastName}`,
  };
};
```

If you feel stuck, [the Type Transformations module](https://www.totaltypescript.com/workshops/type-transformations) contains some similar exercises for reviewing.

## Transcript
0:00 In this exercise, we're importing fetch user from fake external lib. We're wanting to extend it by adding a full-name property to it. If we command click and actually go to definition, you can see that it doesn't expose a return type from the library itself. It's just basically the implementation. So annoying.

0:22 We want to create a return type of fetch user with full name. We could of course just redeclare it if we want to -- ID, first name, last name. That's just really annoying. What, ideally, we'd do instead is extract the type from the fetch user function. Then pull that in and add full name to it.

0:42 We also need to do the same with parameters of fetch user. If you've done the type transformations module, you'll have seen some of this stuff before. This is just acting as a refresher and, also, introducing the idea of this fake external library that for this section we're going to be interacting with. Good luck.

# Solution: Retrieve Function Parameters from an External Library

[

github.com

https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/05-external-libraries/23-extract-external-lib-types.solution.ts

](https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/05-external-libraries/23-extract-external-lib-types.solution.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=ec8a8e02-1812-4d9f-bc7c-65a6070cb763&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0202-extract-types-to-extend-an-external-library-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=ec8a8e02-1812-4d9f-bc7c-65a6070cb763&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0202-extract-types-to-extend-an-external-library-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
Let's start by working on the easy bits.

## Get the Parameters of `fetchUser`
To get the parameters of `fetchUser`, we use `Parameters` and we pass in `typeof fetchUser`:

```typescript
type ParametersOfFetchUser = Parameters<typeof fetchUser>;
```

This will give us the parameters, including `id` as a `string` which we will use when we call `fetchUser` with a full name.

## Get the `ReturnType` of `fetchUser`
For the next step, we need to extract out the return type of `typeof FetchUser`:

```typescript
type ReturnTypeOfFetchUserWithFullName = ReturnType<typeof fetchUser>;
```

This gives us back a `Promise` that wraps `ID`, `firstName` and `lastName`:

```typescript
// hovering over `ReturnType<typeof fetchUser>`

type ReturnTypeOfFetchUserWithFullName = Promise<{
  id: string;
  firstName: string;
  lastName: string;
}>
```

### Extract the `typeofs`
To make it easier to see these steps, we can extract the `typeof`s into its own `FetchUserFunc`, then point the types to it:

```typescript
type FetchUserFunc = Parameters<typeof fetchUser>;

type ParametersOfFetchUser = Parameters<FetchUserFunc>;

type ReturnTypeOfFetchUserWithFullName = ReturnType<FetchUserFunc>;
```

## Unwrap the Promise
Now to get `ReturnTypeOfFetchUserWithFullName`, we need to unwrap this promise and we can use `Awaited` for that.

Now we'll use `Awaited` to unwrap the Promise from `ReturnTypeOfFetchUserWithFullName`:

```typescript
type ReturnTypeOfFetchUserWithFullName = Awaited<ReturnType<FetchUserFunc>>
```

This gives us the `is`, `firstName` and `lastName`.

But now we get an error inside of `fetchUserWithFullName` that an Object literal may only specify known properties.

We get this error because `fullName` is not in the contract that we've typed:

```typescript
export const fetchUserWithFullName = async (
  ...args: ParametersOfFetchUser
): Promise<ReturnTypeOfFetchUserWithFullName> => {
  const user = await fetchUser(...args);
  return {
    ...user,
    
    // error here!
    fullName: `${user.firstName} ${user.lastName}`,
  };
};
```

To fix this, we'll add `& { fullName: string; }` to the `ReturnTypeOfFetchUserWithFullName` type:

```typescript
type ReturnTypeOfFetchUserWithFullName = Awaited<
  ReturnType<typeof fetchUser>
> & { fullName: string };
```

Now everything works as expected!

This exercise is to get you back in the mood of understanding these type transformations and understanding how these types flow through the application.

In situations when you can't extract out a type, this is the dance you'll have to go through. It can also be useful to extract things into a type helper, as seen in the Type Transformations module.

## Transcript
0:01 The solution here is to...First of all, let's do the easy bits. We know how to get the parameters of fetch user. We use parameters. We pass in type of fetch user. What we have here is we end up with ID string, which is really good because then this test passes. It means that when we call fetch user with full name, then we have to pass in ID string.

0:20 If we pass a number there, then it's going to yell at us, which is no good. Not a number itself, but passing in a random number because that's not assignable to string. Then here, this is a bit more complicated. We know that we're going to basically need to extract out the return type of type of fetch user.

0:39 What we end up with there is a promise that wraps ID, first name, and last name. By the way, when we have multiple of these, I like to extract them out into their own thing -- fetch user func, let's say, and say type, fetch user func equals type of fetch user. It just removes a bit of duplication and makes it a little bit easier to see the steps.

1:01 Return type of fetch user with full name, we need to unwrap this promise. We can use Awaited for that. This returns ID, first name, and last name. Now we're getting an error down here because object literal may only specify known properties. Full name is not in the contract that we've agreed because we're typing it here.

1:21 What we can do is we can say this and full name, string. There we go. This is a warm-up exercise to get you back in the mood of understanding these type transformations, understanding how these types flow through the application.

1:35 Also, to look at when you can't extract out a type, this is probably the dance that you're going to have to go through because those types, they don't exist in your application code. You don't control them. Often the only way that you can get information out of them is by doing dances like this.

1:54 Of course, we could extract this out into a type helper. You can check the type transformations module for that.

# 3. Navigating Lodash's Type Definitions

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=475586e0-089f-4019-90ad-515ce5b261aa&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0301-navigating-lodashs-type-definitions-.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=475586e0-089f-4019-90ad-515ce5b261aa&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0301-navigating-lodashs-type-definitions-.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Explainer
In the next exercise we'll be working with Lodash, so let's take a look at how to navigate the library.

The main way to import from Lodash is by using the default import:

```typescript
import _ from "lodash";
```

You can also import specific functions like this:

```typescript
import groupBy from "lodash/groupBy";
```

To navigate to a specific type, start writing it out then hover over it in VS Code.

For example, typing `const example = _.groupBy` then allows us to hover and take a look at more information about that exact function.

```typescript
// hovering over `groupBy`
const example = _.groupBy

// displays the groupBy signature and description
```

If you cmd+click on the underscore in VS Code, you'll be taken to a complicated `.d.ts` file with various interfaces such as `Collection`, `Truthy`, etc. These can also be [found on GitHub](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/lodash/common) to reference alongside the browser-based Stackblitz.

You can also see lots of files like `string.d.ts` and an interface called `LodashStatic`.

It's easy to get lost in the weeds here, so my recommendation is to look at the exact interface and parameters for the function you're using, like `groupBy`.

If you want to use `groupBy` in a different function, which will be the topic of the next exercise, you can cmd+click directly onto the function.

This will take you to the exact function declaration.

For example, `groupBy` is a function that takes in `T` as `Collection<T>` and returns a `T`:

```typescript
/**
 * Creates an object composed of keys generated from the results of running each element of collection through
 * iteratee. The corresponding value of each key is an array of the elements responsible for generating the
 * key. The iteratee is invoked with one argument: (value).
 *
 * @param collection The collection to iterate over.
 * @param iteratee The function invoked per iteration.
 * @return Returns the composed aggregate object.
 */
groupBy<T>(collection: List<T> | null | undefined, iteratee?: ValueIteratee<T>): Dictionary<T[]>;
```

Let's take a look at `add`, which is is a function that takes in `end` and adds two numbers. It has no function overloads.

```typescript
/**
 * Adds two numbers.
 *
 * @param augend The first number to add.
 * @param addend The second number to add.
 * @return Returns the sum.
 */
add(augend: number, addend: number): number;
```

Let's try another one, like `assign`.

This one has quite a few overloads, like `TObject`, `TSource1`, `TSource2`, `TSource3` and `TSource4`:

```typescript
assign<TObject, TSource>(object: TObject, source: TSource): TObject & TSource;
/**
 * @see _.assign
 */
assign<TObject, TSource1, TSource2>(object: TObject, source1: TSource1, source2: TSource2): TObject & TSource1 & TSource2;
/**
 * @see _.assign
 */
assign<TObject, TSource1, TSource2, TSource3>(object: TObject, source1: TSource1, source2: TSource2, source3: TSource3): TObject & TSource1 & TSource2 & TSource3;
/**
 * @see _.assign
 */
assign<TObject, TSource1, TSource2, TSource3, TSource4>(object: TObject, source1: TSource1, source2: TSource2, source3: TSource3, source4: TSource4): TObject & TSource1 & TSource2 & TSource3 & TSource4;
/**
 * @see _.assign
 */
assign<TObject>(object: TObject): TObject;
/**
 * @see _.assign
 */
assign(object: any, ...otherArgs: any[]): any;
```

By looking at these, you can start to piece together the API and implementation of the functions.

This should give you an idea of how to navigate a library like Lodash with lots of types.

Using cmd+click in VS Code is a great way to dive into types to see what's useful.

We'll continue this in the next exercise.

## Transcript
0:00 In the next exercise, the one after this, we're going to be diving into the types of lodash. I want to give you some tools to help you navigate this library. Now, this is the main way that you import from lodash. You can also do things like lodash groupBy, or things like this, or grab individual functions from it. This one would grab groupBy. I'm pretty sure this works here. There we go.

0:26 The main way that you might import it is from this default import here. The best way to navigate this is if you go const, example, equals \_.groupBy, for instance, you can then take a look at the exact functions that you're going to be using and watching for. We Command-click on this underscore itself, we're going to go straight into some pretty complicated .d.ts files.

0:56 We have various interfaces in here, like collection, truthy. Oh, my gosh, lots and lots of things inside here. In fact, a huge, huge file immediately. You can see here that we have lots and lots of files like this, too, -- string .d.ts. We have some interface lodash static. It's very easy to get lost in the weeds here.

1:18 My recommendation is to basically if you have a function that you're using, let's say, that you want to take this groupBy and use it in a different function, which is going to be the topic of the next exercise, what you can do is you can Command-click directly onto that spot there, directly onto that function. That's going to take you to the exact function declaration.

1:39 We can see here that groupBy is a function which takes in T, has collection list T and iterate T. We can start to piece together all of the areas there. Let's take a look at another one. For instance, add here. Add looks like augend, addend, and adds two numbers. Nice and simple. We've even got the JS.comments here to help us out.

2:03 This one, for instance, has no function overloads on it. It's nice and easy to read. Let's try another one. Let's go for, how about assign? It's a classic. This one has quite a few overloads here. You can see that we've got T, object, and T, source. We can start to piece together the API and also start to look at the implementation of a few of these functions.

2:28 You see here? I see. I see why it's doing these overloads. We've got a T, object, T, source 1, T, source 2, T, source 3, T, source 4. It's adding them as different call signatures here. Then pulling them all together in the end here. T, object, T, source 1, T, source 2, and T, source 3, whereas this one only has up to T, source 3. This one only has up to T, source 2.

2:52 You have different signatures for that. This should give you an idea of how to navigate a library like lodash with lots and lots of types on it. Really try and navigate only to the piece that you need and try to understand the nomenclature, the language of the types of things it's doing, and the types it expects and the things that it returns.

3:16 This is a great way to dive into a library to Command-click your way around to see what's useful. We're going to continue this in the next exercise.

# 4. Finding Proper Type Arguments and Generics with Lodash

[

github.com

https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/05-external-libraries/24-lodash-groupby.problem.ts

](https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/05-external-libraries/24-lodash-groupby.problem.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=c5d37b7d-4d96-404d-9df7-479ddf75e5f5&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0401-finding-proper-type-arguments-and-generics-with-lodash-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=c5d37b7d-4d96-404d-9df7-479ddf75e5f5&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0401-finding-proper-type-arguments-and-generics-with-lodash-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
Let's dive into this `groupByAge` function that uses `groupBy` from lodash.

The function takes in an array of objects, each with an `age`:

```typescript
const groupByAge = (array: unknown[]) => {
  const grouped = _.groupBy(array, "age");

  return grouped;
};
```

Hovering over the example `result`, we can see that it is typed as `_Dictionary<unknown[]>`:

```typescript
// hovering over result
const result = groupByAge([
  {
    name: "John",
    age: 20,
  },
  ...

// shows
const result: _.Dictionary<unknown[]>
```

Looking at the tests, we have errors because the `groupByAge` function should not allow for arrays to be passed in that do not contain an `age`.

## Challenge
Your challenge is to update `groupByAge` so the tests pass. You'll need to use a generic function because additional information like `id` should be sent through to the result as well.

To do this you'll need to investigate the lodash types to understand what `Dictionary` means, as well as the generic signatures of `groupBy`.

## Transcript
0:00 Knowing what we now know about exploring third-party libraries, let's dive into this groupBy age function, where we're importing something from Lodash, which is this groupBy. We're taking this array, which is currently typed as unknown array. We're grouping it by age.

0:16 This means that if we pass it in an array of objects, each with an age, then it's going to return a record where age is the index and with an array for the value. What this is going to do is it's going to mean that we can use this to categorize them into different spots and stuff.

0:32 It's an extremely useful function for all cases. This groupBy age function, currently the result is typed as \_dictionary, unknown array. We're expecting it to be something like this, a dictionary with this instead.

0:52 Your job is to dive into the Lodash types, understand what dictionary means, understand what groupBy is supposed to accept, understand its generic signatures as well because we're going to need a generic here. If we have ID on this, for instance, ID 123, then that should be sent through to the result as well. This will need a generic function.

1:13 You'll need to understand a few things about Lodash's types that you'll need to investigate yourself. I'll come back with a solution. Good luck.

# Solution: Passing Type Arguments with Lodash

[

github.com

https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/05-external-libraries/24-lodash-groupby.solution.ts

](https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/05-external-libraries/24-lodash-groupby.solution.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=4fa725ed-f090-4038-8934-34800dfdce85&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0402-finding-proper-type-arguments-and-generics-with-lodash-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=4fa725ed-f090-4038-8934-34800dfdce85&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0402-finding-proper-type-arguments-and-generics-with-lodash-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
The solution is based on understanding the `groupBy` function, so we'll start by looking there.

```typescript
interface LoDashStatic {
    /**
     * Creates an object composed of keys generated from the results of running each element of collection through
     * iteratee. The corresponding value of each key is an array of the elements responsible for generating the
     * key. The iteratee is invoked with one argument: (value).
     *
     * @param collection The collection to iterate over.
     * @param iteratee The function invoked per iteration.
     * @return Returns the composed aggregate object.
     */
    groupBy<T>(collection: List<T> | null | undefined, iteratee?: ValueIteratee<T>): Dictionary<T[]>;
    /**
     * @see _.groupBy
     */
    groupBy<T extends object>(collection: T | null | undefined, iteratee?: ValueIteratee<T[keyof T]>): Dictionary<Array<T[keyof T]>>;
}
```

We can see that `groupBy` takes in a collection of a `List<T>` or `null` or `undefined`.

Investigating `List<T>` we can see it's an alias that Lodash uses for `ArrayLike`, which comes from TypeScript's `lib.es5.d.ts`:

The `ArrayLike` interface has a `length` and something with an `n` number `T`.

```typescript
interface ArrayLike<T> {
    readonly length: number;
    readonly [n: number]: T;
}
```

The `iteratee` for `groupBy` corresponds to the `age` that we are passing in.

Here's what `ValueIteratee`'s type looks like:

```typescript
type ValueIteratee<T> = ((value: T) => NotVoid) | IterateeShorthand<T>
```

And `IterateeShorthand<T>` can be passed a shorthand property name that can be a string, number, or symbol. It can also be a `PartialShallow<T>` which is basically the `{age: number}` we pass in from the `groupByAge` function.

There's no inference, it just takes what we pass in.

The `Dictionary` is basically an object with an `index` on it, similar to a `Record`:

```typescript
interface Dictionary<T> {
  [index: string]: T;
}
```

The big takeaway here is that Lodash's `List` is like TypeScript's `Array`, and `Dictionary` is like a `Record`.

## Updating groupByAge
Here's the starting point of the `groupByAge` function:

```typescript
const groupByAge = (array: unknown[]) => {
  const grouped = _.groupBy(array, "age");

  return grouped;
};
```

Since we now know that `groupBy` takes a `<T>`, we can start by adding it to the `groupByAge` function.

Instead of an `unknown` array, we can use `List<T>`. Then we can update the call to `_.groupBy` to include the type argument:

```typescript
const groupByAge = <T>(array: List<T>) => {
  const grouped = _.groupBy(array, "age");

  return grouped;
};
```

Now when we hover over `grouped` we can see that its type is `_.Dictionary<T[]>`.

Hovering over the example `result` shows us what it looks like:

```typescript
const result: _.Dictionary<{
  name: string;
  age: number;
}[]>
```

So now the first test passes, but the second test doesn't.

In order to make it pass, we need to extend the `age` `number` then add a constraint into the generic to make sure we pass it in:

```typescript
const groupByAge = <T extends { age: number }>(array: List<T>) => {
  const grouped = _.groupBy(array, "age");

  return grouped;
};
```

This code understands that we have a `List` of `T`. The `T` can be anything, as long as it is passed in a `List`.

Because the `T` is more constrained on the outside than the inside, it is inferred in the call to `groupBy`.

This exercise should give you an idea of how to break down functions from external libraries in order to determine generics they need and how to use their nomenclature.

## Transcript
1:01 The solution here then is based on the idea that we need to understand this groupBy function. Let's dive into it. We can see that groupBy takes in a collection of a list, T, or , or undefined. That's interesting. Let's investigate what a list is. A list is an ArrayLike<T. It's just an alias that Lodash uses.

0:24 It looks like there's quite a lot of aliases that it uses. An ArrayLike comes from lib.es5.d.ts. It's basically just something with a length and something with end number T. What this means is that list is just a alias for array. It's an array of something or , or undefined. Itinerary is the age that we're passing in.

0:53 Value itinerary, it looks like it can either be a value T or not void, interesting, or itinerary shorthand. Value T equals not void. Again, this is another alias that we're having to dive into. This is the value that is in our array that we pass or sending to not void, unknown. That's less useful than just unknown, surely.

1:18 Value itinerary, and then itinerary shorthand. Itinerary shorthand is property name. String or number, or symbol, another alias, or a tuple with property name and any, or a partial shallow T. This is then P in key of T. We're getting in the weeds here because it looks like you can just pass in itinerary shorthand, property name, string, or number, or symbol.

1:48 That's what we're doing with this age thing. It looks like we're not getting any inference from this. It's just saying, "We get this. We just pass in the string." Then it returns a dictionary. This dictionary, if we Command-click, this is an object with an index on it. This index is the same as if we were to say type dictionary equals record string T.

2:16 This is just an index signature on this. A dictionary then is like a record. We understand that a list is an array. In lodash terms, a dictionary is a record. Then it looks like there's another function overload here. This is when T extends object. Instead of passing a list here, you're passing in T. It's an object itself.

2:37 There's some complicated stuff there where it looks like it's a dictionary with an array -- T key of T. Confusing. What we're interested in is this overload. We're not interested in this one down here because we have an array of something that we're passing in and it looks like this T is the thing we care about.

2:57 This T means that groupBy actually takes in a type argument. That's what's going to be pushed into this value here. Let's put in this T in the groupBy. Now, this array of unknown, we know that this is going to be T, too, because whatever we pass in here gets passed in via array here. Except, T is undefined. It cannot find names.

3:19 We're going to add it onto here. This now will start working. We're going to get groupBy T. It takes an array, which is an array of T, which might as well be, we could call this list T as well, which we get from lodash. This is underscore list T. Then we pass it into groupBy. Then we get back dictionary T array.

3:46 What we have, result is now name and age wrapped into a dictionary. If I were to add ID -- 12...blah, blah, then this is going to get added there, too. Super-duper nice. There's one more test that we're not passing here, which was we're not passing this case where we have to pass in age into here.

4:07 This is pretty simple. All we need to do is just extends age number here. We just add a constraint into the generic to make sure that we can pass it in. This is actually something that lodash itself doesn't need. It's part of the test suite down here. We should add it there.

4:25 This should give you an idea of how to break down different functions that come from external libraries, how to look at the generics they need, and how to use their nomenclature using list and using dictionary in order to understand how the generics flow. There's one more cool thing here, which we don't need to pass in the type argument manually.

4:46 We can actually remove this, and groupBy, it understands that this is a list of T. If we look at this, T can be anything. T can be anything here as long as we pass it in a list. What happens here then is because T can be anything here, it's actually more constrained on the outside than the inside. Then it just infers it into here. Then we still get back dictionary T array.

# 5. Navigating Express's Type Definitions

[

github.com

https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/05-external-libraries/24.9-express-types.explainer.ts

](https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/05-external-libraries/24.9-express-types.explainer.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=f16c5434-19fe-4f26-b0f2-0fc4196d90c7&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0501-navigating-expresss-type-definitions.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=f16c5434-19fe-4f26-b0f2-0fc4196d90c7&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0501-navigating-expresss-type-definitions.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Explainer
Express is a library that lets you build a REST API really simply.

Express has types that come from [the Definitely Typed repo](https://github.com/DefinitelyTyped/DefinitelyTyped), which also contains types for many libraries that aren't built in TypeScript.

Here we import express, then we call it and get back an instance of Express:

```typescript
import express from "express";

const app = express();
```

We could call [`app.post`](http://app.post) to `/user`, and then we would have a request and response and we would be able to read from `request.body`:

```typescript
app.post('/user', (req, res) => {
  req.body
})
```

There are some crucial parts to understanding this API and making parts of it generic.

For example, hovering over `req` shows us that it has a lot of different generics, and navigating in shows several different interfaces.

## The `IRouterMatcher` Interface
Exploring from a call to `app.get("/user")` takes us to [an interface called ,](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/express-serve-static-core/index.d.ts#L125)[`IRouterMatcher`](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/express-serve-static-core/index.d.ts#L125).

It has a `Method` that extends different request routes as an `any`:

```typescript
export IRouterMatcher<
  T,
  Method extends 'all' | 'get' | 'post' | 'delete' | 'patch' | 'options' | 'head' = any
>
```

## An Alternative Way of Creating Function Overloads
The `IRouterMatcher` also includes an example of an alternative way of creating function overloads from within an interface:

```typescript
 <
  Route extends string,
  P = RouteParameters<Route>,
  ResBody = any,
  ReqBody = any,
  ReqQuery = ParsedQs,
  LocalsObj extends Record<string, any> = Record<string, any>
>(
  // (it's used as the default type parameter for P)
  // eslint-disable-next-line no-unnecessary-generics
  path: Route,
  // (This generic is meant to be passed explicitly.)
  // eslint-disable-next-line no-unnecessary-generics
  ...handlers: Array<RequestHandler<P, ResBody, ReqBody, ReqQuery, LocalsObj>>
): T;
```

We can create our own example `MyFunc` that follows this technique:

```typescript
interface MyFunc {
  (): string;
  (id: number): number;
}
```

Here we are saying that it returns a `string` or a `number` depending on whether we call it with an `id` number or not.

Then we would would use it like this:

```typescript
const func: MyFunc = (id?: number) => {};
```

## The `RequestHandler` Interface.
The `IRouterMatcher` also includes an array of `RequestHandler`s which is also an interface that expresses a function.

```typescript
export interface RequestHandler<
    P = ParamsDictionary,
    ResBody = any,
    ReqBody = any,
    ReqQuery = ParsedQs,
    LocalsObj extends Record<string, any> = Record<string, any>
> {
    // tslint:disable-next-line callable-types (This is extended from and can't extend from a type alias in ts<2.2)
    (
        req: Request<P, ResBody, ReqBody, ReqQuery, LocalsObj>,
        res: Response<ResBody, LocalsObj>,
        next: NextFunction,
    ): void;
}
```

It includes `req`, `res`, and `next`.

Parts of this API can be made generic by extracting out one of these and creating our own `RequestHandler`:

```typescript
import express, { RequestHandler } from "express";


const getUser: RequestHandler = (req, res) => {

}
```

Hovering over `RequestHandler` shows us all of the generics it takes.

The first one we see is `P = core.paramsDictionary`, which is an alias that will set up whatever we pass in to be part of the params.

So if we pass in an `id` of string, we'll end up with [`req.params.id`](http://req.params.id).

By passing in generics, we end up with type safety.

```typescript
const getUser: RequestHandler<
  any,
  {
    name: string;
  },
  any,
  {
    id: string;
  }
> = (req, res) => {
  req.query.id;
};
```

## Transcript
0:00 In the exercise after this, we're going to be diving into the types for express. Express is a library that lets you build a REST API really simply. What you can do is you can import express from express. Express is one of these libraries that has types, which come from Definitely Typed. 0:19 Definitely Typed is a repository that contains type definitions for lots and lots of libraries, which aren't built in TypeScript. Express itself isn't built in TypeScript. If we look at the type definitions there, we'll see that, you can see there in node\_modules/@types/express and then index.d.ts.

0:44 Express has some seriously hardcore types. We're going to look at a few key parts of them to understand the naming conventions, understand the terms they use before we dive in. We can create a basic get endpoint here. This app is we call express and we get back an instance of express. It's like saying new express.

1:09 We could say [app.post](http://app.post), for instance, user, and then
this would have a req, res in it. We would be able to read from
req.body, for instance. If you did a post request and you put some stuff
in the body, then this would be present here. There are some really
crucial parts to understanding this API and understanding how we can
make parts of it generic, too.

1:32 For instance, this request, if we take a look at it, it's a request with a bunch of different generics in. This app.get is like, "Whoa, OK," there's a lot going on here already. We've got a path user, which if you can see is inferred as its literal there, which is really cool.

1:52 Then we have a bunch of handlers. These handlers is an array of request handlers. We've got already request, RequestHandler. We've also got response in here, too. These responses also take generics. You'll notice that this response here, it has response any, record string, any, number. We can see that each of them are being filled in with different default generics.

2:18 Let's take a look. Let's take a look and command-click on app.get. We have an interface here called IRouterMatcher. What this does, as you can see, this is like, "Wow, there's so much going on here." This is the app.get is what's called an IRouterMatcher. It's got a method, which is one of these and it's equals any. This is really crazy stuff.

2:44 We can see then that we have route extends string, RouteParameters, ResBody. There's lots and lots of generic functions, which are being expressed in an interface. This is a way that you can declare function overloads, which is slightly different from normal, which is you can declare them inside an interface.

3:03 If I show you this, we can say interface MyFunc, and we can say this and then say this returns a string. Or if we call it with, I don't know, id number, then it returns a number. This is something that you see when you're doing third-party typing, so when you're trying to type a third-party library. It's not something you usually do when you're writing TypeScript and your files are TypeScript.

3:31 This gives you a way to say like const func is MyFunc, then it's either going to have id number or not. It's pretty hard to type this stuff, but this is the idea. It gives you a way to say, "OK, this is how I express a function with an interface."

3:50 To go back, app.get, it's one of these enormous IRouterMatcher. We've got path route, and the handlers are an array of request handlers. RequestHandler is a slightly easier to read version of this, but it's still an interface with a function or interface that expresses a function. It's got request, response, and next. You can see that these generics are how it structures like making things type-safe.

4:19 What I can do, which is really fun, is I can extract out one of these. I can say, let me zoom in a little bit, const getUser is going to be a RequestHandler. That RequestHandler is going to have a req, res. I'm also going to import RequestHandler from the top here. My auto-import is not working, so I'll bring it from up here. We get RequestHandler from express. This means you can build your own here.

4:53 Let's take a look at each of the generics here in turn. We've got P equals core.ParamsDictionary. How would I investigate that? I can command-click on it, and I can see what core.ParamsDictionary is supposed to be. It's supposed to be, "OK, this is another example of fancy aliases. We've just got a record, which is strings and strings." That makes sense.

5:16 Where does that P end up going? Extends core.RequestHandler. Let's take a look at core.RequestHandler. We're back here again. This P goes in to the request. Let's see where this goes. This is an interface, which extends http.IncomingMessage. This is like a node built in, module http.

5:38 This P, where does it go? Let's go for find
references. It goes directly into params. Params is an attribute on the
request. What this means, having dug through all of that, we can pass it
a, let's say, id string, for instance. Now, request will have
[req.params.id](http://req.params.id). That's type-safe.

6:11 If I pass something else to it, let's see what else we can do. We have Request, ResBody. Where does ResBody go? This one goes into RequestHandler. ResBody gets passed into Request and Response. Let's see what it does inside Request. Let's see where ResBody goes. Go to references. It looks like it's just being pumped into Response there.

6:40 Let's take a look. Go to references again on ResBody. We've got a few here. We can send ResBody, this. Interesting. Json send ResBody, this. Jsonp send ResBody, this. This means then, if we look at the send function, took me a second to find this, now we have another alias, which is Send ResBody, this. ResBody is, by default, typed as any, and you can pass in the ResBody.

7:13 This means then that if we type that, if we say that you have to return an object with, I don't know, name string, say for instance, we're getting this user by id and we're returning the name. This means that I can say res.send, and then I have to pass in name, and let's say I just get this wrong, this is now type-safe, too.

7:37 If I don't pass this generic, it means that I don't get type safety on my res.send. It's a way of telling express what you wanted to return from this res.send. I'll tell you what the rest of them are without showing you. ReqBody allows you to strongly type the request body that's coming in. Imagine this was a GraphQL query or something where we get the id in via post.

8:04 I'm going to add any as my default here. This means
that req.params is typed as any. I'm going to say, let's say, req.body
is now typed as id string. The next one is the query parameters. This
one is going to be...imagine that you pass id string there. Let's give
this any instead. We'll say [query.id](http://query.id). This is going to be like if you
pass, for instance, user and then id equals whatever.

8:41 We then have the main three ideas here, which is we have the main three terms that we're using. RequestHandler, which then feeds into a request and a response. Each of these generics is passed through. I'm not sure what Locals is. I'm fascinated by that. This idea of the request and the response is going to be really crucial for the next exercise.

# 6. Add Query Params to an Express Request

[

github.com

https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/05-external-libraries/25-usage-with-express.problem.ts

](https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/05-external-libraries/25-usage-with-express.problem.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=8aa9ddf2-1c54-43f3-8628-43a77162e7ee&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0601-add-query-params-to-an-express-request-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=8aa9ddf2-1c54-43f3-8628-43a77162e7ee&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0601-add-query-params-to-an-express-request-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
In this exercise, we're building an Express app.

There's a call to `app.get()` that passes in a `"/user"` route and the `getUser` function.

The `getUser` function is an abstraction of the `makeTypeSafeGet` function, so we'll look at that code first:

```typescript
const makeTypeSafeGet =
  (
    parser: (queryParams: Request["query"]) => unknown,
    handler: RequestHandler
  ) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      parser(req.query);
    } catch (e) {
      res.status(400).send("Invalid query: " + (e as Error).message);
      return;
    }

    return handler(req, res, next);
  };
```

The first argument to `makeTypeSafeGet` is a `parser` that takes `queryParams` which is `Request["query"]` from Express.

We want these `queryParams` to end up in `req.query` in the `getUser` function:

```typescript
const getUser = makeTypeSafeGet(
  (query) => {
    if (typeof query.id !== "string") {
      throw new Error("You must pass an id");
    }

    return {
      id: query.id,
    };
  },
  (req, res) => {
    // req.query should be EXACTLY the type returned from
    // the parser above
    type tests = [Expect<Equal<typeof req.query, { id: string }>>];

    res.json({
      id: req.query.id,
      name: "Matt",
    });
  }
);
```

Currently there's an error in `getUser` because the `req.query` doesn't exactly match the type returned from the `parser`.

## Challenge
Your challenge is to update `makeTypeSafeGet` to be generic in order to solve this error.

The function should pick up what gets inferred from the `parser`, and make sure the right generics get parsed to `RequestHandler`, `Request`, and `Response`. Reference the Express types for help there.

Remember, we're only interested in the `query`, not the `params` or `body`.

## Transcript
0:00 In this exercise, we're building an Express app. This Express app has a getUser function. The getUser basically says app.getUsergetUser. Now, getUser, what it's going to be, is we're creating this abstraction called makeTypeSafeGet. What we're doing is we have a parser, which we're parsing as the first argument to makeTypeSafeGet. Now we have a query params, which is request query, which we're getting from Express here.

0:31 What we're doing is we're returning something from query params. We want those query params to end up in req.query here. Knowing what we learned in the last explainer about request, about response, about how to handle generics, we're going to have to make this function here generic.

0:52 We're going to have to pick up what gets inferred from this parser here. The implementation itself should be fine. You may need to do some as is in there. You might be able to get away with it. You need to make sure that the right generics get passed to request handler, to request, and response. Remember, it's the query that we're interested in, not the params, not the body, just the query. Good luck.

# Solution: Make an Express Request Function Generic

[

github.com

https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/05-external-libraries/25-usage-with-express.solution.ts

](https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/05-external-libraries/25-usage-with-express.solution.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=5b3241a2-3f1c-4f49-bdcd-fa0d257336d4&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0602-0601-add-query-params-to-an-express-request-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=5b3241a2-3f1c-4f49-bdcd-fa0d257336d4&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0602-0601-add-query-params-to-an-express-request-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
To make this function generic, we'll add `TQuery` to it.

This `TQuery` will be inferred by what we return from the parser, which should be [`query.id`](http://query.id).

```typescript
const makeTypeSafeGet =
  <TQuery>(
    parser: (queryParams: Request["query"]) => TQuery,
    handler: RequestHandler
  ) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      parser(req.query);
    } catch (e) {
      res.status(400).send("Invalid query: " + (e as Error).message);
      return;
    }

    return handler(req, res, next);
  };
```

Now when we hover over `makeTypeSafeGet` when we call it for `getUser`, we can see that the function is returning the `id`:

```typescript
// hovering over `makeTypeSafeGet`
const getUser = makeTypeSafeGet(...

// shows
const makeTypeSafeGet: <{
  id: string;
}>(parser: (queryParams: Request["query"]) => {
  id: string;
}, handler: RequestHandler) => (req: Request, res: Response, next: NextFunction) => void
```

We still have an error in the tests because `req.query` is still being defaulted to `QueryString.ParsedQs`:

```typescript
// hovering over `req`
type tests = [Expect<Equal<typeof req.query, { id: string }>>];

// shows
(property) Request<ParamsDictionary, any, any, QueryString.ParsedQs, Record<string, any>>.query: QueryString.ParsedQs
```

This tells us that up in `makeTypeSafeGet` we need to parse `TQuery` into a `RequestHandler` so that `req.query` is defaulted to `querystring.parsedQs`.

As seen in the Express explainer, we can do this by saying `any, any, any` and passing in `TQuery`:

```typescript
const makeTypeSafeGet =
  <TQuery extends Request["query"]>(
    parser: (queryParams: Request["query"]) => TQuery,
    handler: RequestHandler<any, any, any, TQuery>
  ) =>
  ...
```

With this change we have a new error pop up because `Request` isn't compatible with the changes we made to the `RequestHandler`.

In order to fix this, we need to add the same signature to the `req` in `makeTypeSafeGet`.

Here's the solution all together:

```typescript
const makeTypeSafeGet =
  <TQuery extends Request["query"]>(
    parser: (queryParams: Request["query"]) => TQuery,
    handler: RequestHandler<any, any, any, TQuery>
  ) =>
  (req: Request<any, any, any, TQuery>, res: Response, next: NextFunction) => {
    try {
      parser(req.query);
    } catch (e) {
      res.status(400).send("Invalid query: " + (e as Error).message);
      return;
    }

    return handler(req, res, next);
  };
```

Building an API in this way is great because it allows us to avoid having to make additional type annotations.

## Transcript
0:00 We obviously need to make this function generic. I'm
going to add TQuery onto here. This TQuery is going to be inferred by
what we return from this parser, because it's going to be id [query.id](http://query.id)
and then it needs to be passed in here.

0:16 I'm going to add TQuery to the end here. This is interesting because I need to make sure that TQuery is actually a certain shape because this should be invalid. We shouldn't be able to just return random numbers here. It should be an object of strings because that's basically how it works.

0:33 You can't pass anything into the query that then gets automatically coerced to a number. It has to be record string string. We can, if we want to, we can do extends record string string.

0:46 Or if we want to, we could say it extends request query, which is quite nice because it just means that we're using the language that the library gives us. Request query, which I think itself, if we dive deep into it and find a query, query query query, here it is.

1:06 It's RecQuery, which is defaulted to ParsedQs. Where is ParsedQs coming from? Types Qs. This is too complicated. We could go and grab ParsedQs from somewhere, but I'm happy with my record string string. We've got that.

1:22 We now need to, or in fact, what we should be seeing now is that this is being captured in the makeTypeSafeGet. We have id string being captured there because this function is returning id. If we don't return id, then that's going to disappear from the inference there.

1:38 This is all good. Now though, rec.query is still being defaulted to QueryString.ParsedQs. We need to find a way to pass it into the request there. The actual spot you need to pass it in is in request handler.

1:57 We saw this in the last explainer where we can say any, any, any, and because we don't care about the params, we don't care about the response body, don't care about the request body, but we do care about the request query.

2:11 What we can do is pass in any, any, any, and then
pass in TQuery. Now down the bottom request.query gets passed through
our abstraction and comes out as [rec.query.id](http://rec.query.id). This is amazing because
it means that down here you need zero type annotations in order to get a
really nice API.

2:33 This is fantastic. There's an issue though, which is types of property query are incompatible between this request and the request handler request, basically. Basically, this is now incompatible with this.

2:48 We can fix that by passing exactly the same signature to this request because we know that request it takes in P ResBody, ReqBody, ReqQuery, Locals. Request handler takes in P ResBody, ReqBody, ReqQuery, Locals. It takes in exactly the same. It's right there, in fact.

3:07 It takes in the exact same signature for its generics as request. This is really, really common when you have a library with lots of common generics, is they'll have a same signature for one thing and the other to make things easier to pass around.

3:24 We can copy and paste them over and now one is assignable to the other. Our work here is done. Very, very nice. We've now got a lovely, lovely little function which we can take in and we can even replace this with Zod if we wanted to. We just get a beautiful TypSafeGet function.

# 7. Browsing Zod's Types

[

github.com

https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/05-external-libraries/25.9-zod-types.explainer.ts

](https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/05-external-libraries/25.9-zod-types.explainer.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=b7966d1f-e8f6-499a-be5e-5f660a261be0&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0701-browsing-zods-types.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=b7966d1f-e8f6-499a-be5e-5f660a261be0&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0701-browsing-zods-types.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Explainer
In the next exercise we'll be working with the Zod library, but first here's a brief overview of its types.

Consider this code:

```typescript
import { z } from "zod";

type Example = z.ZodType;
```

`ZodType` is an abstract class that forms the basis of Zod's generic structure.

Many things in Zod extend `ZodType`.

For example, `ZodVoid` extends `ZodType`:

```typescript
export class ZodVoid extends ZodType<void, ZodVoidDef> {
```

Any type that you can return from Zod, such as `z.string` or `z.number`, will return `z.ZodString` which extends `ZodType<string>`.

## Zod's Three Main Generics
There are three main generics you need to pay attention to in Zod:

*   `Output`, which will be `any` by default.
*   `Def` which extends `ZodTypeDef` and is used to track the way you declare object schemas.
*   `Input` which is helpful for transformations.

To demonstrate `Input`, let's create a `transformer` that turns a string into a number:

```typescript
const transformer = z.string().transform((s) => Number(s));
```

Hovering over `transformer`, we see the following:

```typescript
const transformer: z.ZodEffects<z.ZodString, number, string>
```

Opening the definition of `ZodEffects` by cmd+clicking in your local VS Code or [looking at GitHub](https://github.com/colinhacks/zod/blob/master/src/types.ts#L3927) in the browser, we see the following:

```typescript
export class ZodEffects<
  T extends ZodTypeAny,
  Output = output<T>,
  Input = input<T>
> extends ZodType<Output, ZodEffectsDef<T>, Input> {
  innerType() {
    return this._def.schema;
  }
```

Notice that the order gets shifted!

Be sure to pay attention to the `Input` and `Output` types in the next exercise.

## Transcript
0:00 In the exercise after this, we're going to look at Zod and Zod's types. We're going to start looking at the generics flow inside Zod. I want to take you through a brief little tour of what Zod really looks like. ZodType especially, is what I want you to look at.

0:16 ZodType is an abstract class that sits at the bottom of Zod's, basically, their generic structure. Everything in Zod essentially extends ZodType. You can see there's, whoo, 152. Although a lot of these are extending different things.

0:33 ZodType, 38 different things look like they extend ZodType and pass things to it. For instance, ZodVoid extends ZodType void VoidDef. ZodNever extends ZodType never ZodNeverDef. Everything in Zod, everything that you can return from like example, z.string, z.number, for instance.

0:58 Z.string will return z.ZodString. Let's take a look at that. Gets a ZodString which extends ZodType string. Zod.void extends ZodVoid which extends ZodType void ZodVoidDef.

1:14 Your goal here basically, in the next exercise, I'm going to be asking you to take a look at Zod structure and understand its flow of generics. The three main ones you need to pay attention to are output, which is going to equal any by default.

1:30 Def extends ZodTypeDef equals ZodTypeDef. This one is an internal one that tracks various things to do with the way you declare object schemas and things like this. Finally, input.

1:45 The way Zod works is you can actually have a different type on the input than you have on the output. For instance, if you have const transformer, we have Z.string, and then we can transform that string into a, let's say we go, transform it into a number. Number s.

2:06 Now what you'll see is we have z.ZodEffects, z.ZodString, number, string. Let's have a look at that. We have z.ZodEffects, ZodEffects, Zod extends ZodType, and then we have input and output here. This is cool.

2:26 What this means is you can see that actually this is funky because the order gets a bit shifted around here. ZodEffects, z.ZodString, number, string still extends ZodType. We can still do transformer pass and things.

2:39 You want to pay attention to the input and output types in the next exercise. Good luck.

# 8. Create a Runtime and Type Safe Function with Generics and Zod

[

github.com

https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/05-external-libraries/26-usage-with-zod.problem.ts

](https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/05-external-libraries/26-usage-with-zod.problem.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=3220ef8c-0db5-4e8c-baf4-f9d40d434381&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0801-create-a-runtime-and-type-safe-function-with-generics-and-zod-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=3220ef8c-0db5-4e8c-baf4-f9d40d434381&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0801-create-a-runtime-and-type-safe-function-with-generics-and-zod-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
Here we have a `makeZodSafeFunction`:

```typescript
const makeZodSafeFunction = (
  schema: unknown,
  func: (arg: unknown) => unknown
) => {
  return (arg: unknown) => {
    const result = schema.parse(arg);
    return func(result);
  };
};
```

The goal is to be able to pass a schema and function into `makeZodSafeFunction` and then get back a new version that's both runtime safe and type safe:

For example, here's an `addTwoNumbersArg` schema for an `addTwoNumbers` function:

```typescript
const addTwoNumbersArg = z.object({
  a: z.number(),
  b: z.number(),
});
```

Then we would create an `addTwoNumbers` function by calling `makeZodSafeFunction` like so:

```typescript
const addTwoNumbersArg = z.object({
  a: z.number(),
  b: z.number(),
});
```

## Challenge
The goal is to be able to pass anything into the `makeZodSafeFunction`. Objects, numbers, tuples, or arrays should all work.

Your challenge is to add generics in order to infer the runtime argument and the return type.

You will also need to use Zod types in order to determine the schema.

The solution is elegant, and **no casting** is needed.

All you will need to use is some built-ins from Zod.

Check out [my Zod tutorial](https://www.totaltypescript.com/tutorials/zod) for more cool things you can do with the library!

## Transcript
0:00 In this exercise, we're going to be using Zod to make a Zod-safe function. We're going to be declaring a function inside here and, basically, passing in a function that we want to make runtime safe as well as type-safe. What this does is you can pass in a schema into the first argument.

0:17 We'll then return a function, addTwoNumbers. We get this addTwoNumbers argument. This is the object that addTwoNumbers or this args is expecting to receive. The idea is we run the parser before we run the function to make sure that what gets passed into the function is what we expect.

0:39 What this means is we're going to need some generics here because we need to infer this runtime argument and also the return type here. We're also going to need to think about the Zod types, which we got a little intro to before, to figure out exactly what this schema needs to look like and what that's going to infer.

1:00 Those are all the hints I'm going to give you. We should be able to pass anything in there. It shouldn't just be objects. We should be allowed to pass in a number, a tuple, or an array, whatever we want to do. You've got to think about the base level, what you want to represent that schema as, and see if you can figure out all of the pieces that you need to understand in order to build this.

1:21 The solution is elegant, I will tell you that. There's no casting needed here. There's nothing too fancy. It's just using some built-ins from Zod that I'm going to see if you can find your way around on your own. Good luck.

# Solution: Infer Runtime Arguments from a Zod Schema

[

github.com

https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/05-external-libraries/26-usage-with-zod.solution.2.ts

](https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/05-external-libraries/26-usage-with-zod.solution.2.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=7084139e-44c5-4733-94fe-8ce602bb3dbb&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0802-create-a-runtime-and-type-safe-function-with-generics-and-zod-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=7084139e-44c5-4733-94fe-8ce602bb3dbb&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0802-create-a-runtime-and-type-safe-function-with-generics-and-zod-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Step 1: Add Generics
Let's start by thinking about the type arguments for the generic slots.

We need to infer the type of the argument and the return type of the `makeZodSafeFunction`, so let's start by adding two generic slots for `TValue` and `TResult`:

```typescript
const makeZodSafeFunction = <TArg, TResult>(
  schema: unknown,
  func: (arg: unknown) => unknown
) => {
  return (arg: unknown) => {
    const result = schema.parse(arg);
    return func(result);
  };
};
```

## Step 2: Replace `unknowns`
This means that `arg` will be typed as `TArg`, so we can replace those `unknowns`. We also know that the `func` should return `TResult` so we can update that one as well:

```typescript
const makeZodSafeFunction = <TArg, TResult>(
  schema: unknown,
  func: (arg: TArg) => TResult
) => {
  return (arg: TArg) => {
    const result = schema.parse(arg);
    return func(result);
  };
};
```

Now when we hover over `makeZodSafeFunction` when we create `addTwoNumbers`, we see the following:

```typescript
// hovering here
const addTwoNumbers = makeZodSafeFunction(...

// shows us
const makeZodSafeFunction: <unknown, any>(schema: unknown, func: (arg: unknown) => any) => (arg: unknown) => any
```

This tells us that inference isn't working yet.

## Step 3: Make Inference Work
One way to get inference to work would be to manually pass in the `args` as numbers:

```typescript
const addTwoNumbers = makeZodSafeFunction(
  addTwoNumbersArg,
  (args: {a: number; b: number }) => args.a + args.b
)
```

Now when we hover we would see all of the `arg` unknowns replaced with `number` as expected.

However, this wasn't the challenge!

### Add Zod
We are expecting to be able to infer the type of `args` from the schema that we pass in, instead of manually specifying it.

```typescript
const makeZodSafeFunction = <TArg, TResult>(
  schema: unknown,
  func: (arg: TArg) => TResult
) => ...
```

Zod will have something that we can use for the `schema`.

Let's look at `z.ZodObject`, which has quite a lot of generics:

```typescript
// Inside the Zod types
export class ZodObject<
  T extends ZodRawShape,
  UnknownKeys extends UnknownKeysParam,
  Catchall extends ZodTypeAny = ZodTypeAny,
  Output = objectOutputType<T, Catchall>,
  Input = objectInputType<T, Catchall>
> extends ZodType<Output, ZodObjectDef<T, UnknownKeys, Catchall>, Input> {
  ...
```

The `Output` generic should jump out after our previous exploration.

Since it's the fourth item, we could update `schema` to have `TValue` as output like this:

```typescript
const makeZodSafeFunction = <TArg, TResult>(
  schema: z.ZodObject<any, any, any, TArg>,
  func: (arg: TArg) => TResult
) => ...
```

With this change, our error goes away and we are able to get inference from the object being used for `addTwoNumbersArg`.

However, this will only work for objects and not for other types like numbers.

Instead of using `ZodObject` for our schema, we need to use something that can represent anything.

Looking at `ZodType`, the first type of argument is `Output` which is of type `any,` which is of type `any`, so we know it will work!

Because the `Output` is the first arg for `ZodType`, we can remove all of the other `any`s from the `schema` line.

```typescript
const makeZodSafeFunction = <TArg, TResult>(
  schema: z.ZodType<TArg>,
  func: (arg: TArg) => TResult
) => ...
```

There's also the option of using `Schema`, which is available as an alias for `ZodObject` out of the box:

```typescript
const makeZodSafeFunction = <TArg, TResult>(
  schema: z.Schema<TArg>,
  func: (arg: TArg) => TResult
) => ...
```

Now our function supports whatever we throw at it.

Using Zod like this allows us to infer a type that can be used further down the line.

This pattern of putting Zod at a high level place opens up all kinds of use cases!

For example, for an Express app the `TArg` could be taken and passed into the query params or into `req.body` without type annotations.

If you're using Zod in your app, you can use this method to get runtime level and type level safety from a schema.

## Transcript
0:00 Let's start by thinking about the type arguments, the generic slots. We've got this makeZodSafeFunction. We know we're definitely going to need to infer the type of the argument and the type of the return type of this function. Let's add two generic slots here.

0:14 We can go TArg and then TResult. What this is going to do, we can slot that in there, and then we can slot this in here. This means then that this arg is also going to be typed as TArg, probably, because when we get down to here, we should get a type error when we call addTwoNumbers.

0:36 Let's add this in. Let's go TArg there. This result now, if we take a look at this, it's not like the inference isn't yet working. We can make it work by manually passing in these args here. We can say A Number and then B String, oh sorry, B Number.

0:55 Then what we get is we actually get all of the inference happening for us. We can see that A Number, B Number is being inferred in the first slots, which is this argument here. Then it's also being inferred that args.a, which is a number, plus args.b, which is a number, equals a number.

1:13 We're seeing that we get a number back out. We should see that if we go const result here, for instance, ba ba ba, const result equals this, result, expect result to be three. We're getting number back out of this.

1:28 Whereas if we don't type this yet, we would get any out from this, because it can't work out what unknown.a plus unknown.b should be. This isn't the goal, right? We're expecting to be able to infer the type of args from the schema that we pass in.

1:47 The way you do this with Zod is if we look at Z.ZodType, we know that, imagine if we had Z.ZodObject in this slot. Z.ZodObject, it's actually got quite a lot of generics in here. It's got a raw shape, unknown keys, catch all, output. Output looks like the one that we actually want.

2:08 Then there's input too. We've seen output and input on the Zod, on the ZodType, which we saw in the previous exercise. We could pass in a few things here. We could pass in any, any, any, and then is it the fourth one, I think? God. One, two, three, four is the output.

2:26 We can add in TArg here. Actually, this works, or it works rather for objects. Now we can actually remove this definition and we'll get args.a and args.b working for us. That's really, really cool.

2:44 We now can't pass in, for instance, if we had Z.Number, this actually doesn't work because it's expecting a Zod object in that slot. This is kind of no dice for us. We actually need to reference something that can be any ZodType or any Zod schema. Luckily, we know one.

3:02 We know that Z.ZodType. If we just put in TArg as the first one, because Z.ZodType actually starts with the output instead of it being in the fourth slot, this will work. Now we can pass in a number if we want to. We have Z.Number. Now this is inferred as a number.

3:22 What this means is you can use Zod in this way to basically say OK, I'm going to take in a schema and I want you to infer the type of that schema and then use that type further down the line inside this function. Or imagine if we were building something with Express, for instance.

3:39 You could take that TArg and pass it into the query params or pass it into rec.body. It's so cool. This means that you can sit at the, Zod can sit at a really nice high level in your app. Again, we're creating a function here that needs no type annotations. It just flows together and it works.

3:59 Finally then, we can actually alias this to something that looks really nice, which is there's a Z.Schema or Z.Zod schema, which Zod just exposes. You can see that actually ZodSchema. There it is. It actually exports that as an alias. ZodType as schema, ZodType as ZodSchema.

4:19 If you want to make it nice and pretty. I personally like Z.Schema. I think that's really nice.

4:24 This is such a cool way to work because it means that you're wrapping your stuff with, if you're using Zod in your app anyway, and you need some runtime safety, then you can also get type safety inferred from those schemas.

# 9. Override External Library Types

[

github.com

https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/05-external-libraries/26.5-override-external-lib-types.problem.ts

](https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/05-external-libraries/26.5-override-external-lib-types.problem.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=46e817c2-d56c-4913-ba68-acd8edda643e&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0901-override-external-library-types-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=46e817c2-d56c-4913-ba68-acd8edda643e&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0901-override-external-library-types-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
For this exercise we have an `animatingState` that calls `getAnimatingState` from a `fake-animation-lib`:

```typescript
const animatingState = getAnimatingState();
```

Here's what `getAnimatingState` from the `fake-animation-lib` looks like:

```typescript
export const getAnimatingState = (): string => {
  if (Math.random() > 0.5) {
    return "before-animation";
  }

  if (Math.random() > 0.5) {
    return "animating";
  }

  return "after-animation";
};
```

Currently the animating state is typed as a string, but we want it to be `before-animation`, `animating`, or `after-animation`.

```typescript
type tests = [
  Expect<
    Equal<
      typeof animatingState,
      "before-animation" | "animating" | "after-animation"
    >
  >
];
```

## Challenge
Your challenge is to type the `animatingState` so the test passes.

Because we can't change code in an external library, you will need to create a `.d.ts` declaration file that uses module definitions to provide the new types.

## Transcript
0:00 This is a really interesting exercise. We have an AnimatingState here, that is currently just typed as string. We want it to be before-animation, or animating, or after-animation. We want it to represent these three literals.

0:16 Why is that? If you look at the actual code for our library...this is actually coming from a fake animation library that I've built into the setup of this tutorial. We've got getAnimatingState here and we can actually see the code here. We can see that it's got an explicit return type of string on it.

0:34 Actually, we've got if Math.random() then return before-animation, or animating, or after-animation. It turns out that the explicit type annotation here is actually making the inference that we get worse. Ideally, it would be before-animation, or animating, or after-animation.

0:49 Assuming that you can't change this code...that's part of this problem. Don't change this code. Imagine this is coming from an external library. We actually want to override the types that are being exported from this external library, so that getAnimatingState actually returns what we want it to. In this case, we're going to have to override those types.

1:09 How do we do that? I'll give you a clue. You're going to need a declaration file. The first d.ts file I think that's been in TotalTypeScript. You'll need to create a new file which uses some module definitions in order to basically override this fake animation library and provide some new types on top of it.

1:30 I'll provide you some section resources here on how to do that and that's all the information I'm going to give you. Good luck.

# Solution: Create a Declarations File to Override Types

[

github.com

https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/05-external-libraries/26.5-override-external-lib-types.solution.ts

](https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/05-external-libraries/26.5-override-external-lib-types.solution.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=51a2cc64-3962-440e-ac08-082a93047924&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0902-override-external-library-types-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=51a2cc64-3962-440e-ac08-082a93047924&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0902-override-external-library-types-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Trying the `declare module` Syntax
Let's do an experiment with the `declare module` syntax inside of the solution file.

This will put a module into global scope.

For example, we can export a type called `Wow` that will be available:

```typescript
declare module 'fake-animation-lib-solution' {
  export type Wow = string;
}
```

However, if we try to export a function `getAnimatingState()` that returns a number, we find that we can't override the existing function:

```typescript
declare module 'fake-animation-lib-solution' {
  export type Wow = string;

  // this won't work!
  export function getAnimatingState(): number;
}
```

The `declare module` will let us add, but not override.

## Creating a Declaration File
In order to overwrite types, we need to create a `.d.ts` file. I'll call mine `26.5.solution.d.ts`.

This file is now the only source of truth for this module.

We can export a `getAnimatingState` function, but it will end up overriding the actual external library.

Since anything we put in `26.5.solution.d.ts` will end up in the exercise file, we can add the different animation types we need for our tests to pass.

Here's the full solution:

```typescript
declare module "fake-animation-lib-solution" {
  export type AnimatingState =
    | "before-animation"
    | "animating"
    | "after-animation";
  export function getAnimatingState(): AnimatingState;
}
```

In practice this approach of overriding types can be really unsafe, but sometimes you don't have a choice!

## Transcript
0:01 I've set up this slightly differently. I've given it a different global name fake-animation-lib-solution. What we're going to do is we're going to need to create a declaration file for this. The reason is you would think you would be able to do something like this, declare module, let's say, fake-animation-lib-solution.

0:22 Now what this syntax does is it basically says, we have this module in scope called fake-animation-lib-solution. I'm going to declare what that thing returns, and declare in general puts things into a global scope. What I can do is I can say...I'm pretty sure I might be able to say export type Wow for instance and say Wow is a string for instance.

0:46 Now, I think I might be able to import...yeah, I can import Wow from this. This is weird. You can actually make modules return different types and different things, based on what you pass in here. That's pretty useful. What you'll notice is you can't, if you do export function getAnimatingState and then you get it to return a number, for instance.

1:11 This actually isn't going to work because it's already like declared within this block. We can't overwrite stuff from in here. Weirdly we can add stuff using this syntax, but we can't overwrite it. How do we overwrite it? We can actually move this, and I'm actually going to create a file here. Let's say 26.5-declaration.solution.d.ts.

1:39 This thing now is now not available whereas Wow is still available. If I remove Wow now it's available there. By putting it inside here what we're doing is we're saying this is now the only source of truth for this module. That's fairly useful. Now what we can do is we can export function getAnimatingState, and this is going to return the thing that we want it to return.

2:04 This thing now is now not available whereas Wow is still available. If I remove Wow now it's available there. By putting it inside here what we're doing is we're saying this is now the only source of truth for this module. That's fairly useful. Now what we can do is we can export function getAnimatingState, and this is going to return the thing that we want it to return.

2:31 Now before-animation, animating, and after-animation is now the return type of getAnimatingState. We've overridden the actual module that we care about. This is of course wildly unsafe, extremely unsafe because we can do anything here. We can do a typo, and now we're changing the actual types of the library that we're exporting.

2:56 Sometimes you just don't have a choice, and you want to be able to override the module to be able to give the types that you want. We can even extract this into its own type if we want to. Type AnimatingState. If we put it here, then it's going to be AnimatingState and we can actually extract that so we get, where is it, AnimatingState there.

3:18 This is really useful when you want to just blast out the types that were there before and put your own types in their place. I'm intrigued too. If I say type AnimatingState here, does it still export it? Yes, it does still export it. That's interesting. There are things I don't know about this solution.

3:37 I haven't really used this in production, but it's a really valuable tool in your toolbox. The TypeScript docs are pretty good on it, in terms of giving you the understanding you need to be able to process it and use it.

# Resources

[

github.com

https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/lodash/common

](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/lodash/common)

[

github.com

https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/express-serve-static-core/

](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/express-serve-static-core/)

[

github.com

https://github.com/microsoft/TypeScript/blob/main/src/lib/es5.d.ts

](https://github.com/microsoft/TypeScript/blob/main/src/lib/es5.d.ts)

[

www.totaltypescript.com

https://www.totaltypescript.com/tutorials/zod

](https://www.totaltypescript.com/tutorials/zod)

[

github.com

https://github.com/colinhacks/zod/blob/a57fc2da3c48a5a2270e9684017d8bc056af8a40/src/types.ts

](https://github.com/colinhacks/zod/blob/a57fc2da3c48a5a2270e9684017d8bc056af8a40/src/types.ts)

# (f) Identity Functions



# 1. Identity Functions as an Alternative to the `as const`

[

github.com

https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/06-identity-functions/27-const-annotations.problem.ts

](https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/06-identity-functions/27-const-annotations.problem.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=aca3c81d-6050-462b-8f41-45e74f5b7097&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0101-identity-functions-as-an-alternative-to-the-as-const-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=aca3c81d-6050-462b-8f41-45e74f5b7097&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0101-identity-functions-as-an-alternative-to-the-as-const-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
In this section, we'll be looking at how we can use identity functions to power up inference in our apps.

An example of an identity function is the `asConst` function. It takes in a parameter `T` and the type argument `T` and returns `t`.

```typescript
export const asConst = <T>(t: T) => t;
```

Consider this `fruits` variable:

```typescript
const fruits = asConst([
  {
    name: "apple",
    price: 1,
  },
  {
    name: "banana",
    price: 2,
  },
]);
```

We would expect from reading it that the test would pass, however it doesn't.

One way to make to make the test pass would be to add `as const` to array when creating the `fruits` variable:

```typescript
const fruits = asConst([
  {
    name: "apple",
    price: 1,
  },
  {
    name: "banana",
    price: 2,
  },
] as const);
```

There’s also a way to do this using a new TypeScript feature called [const type parameters](https://devblogs.microsoft.com/typescript/announcing-typescript-5-0/#const-type-parameters).

## Challenge
Your challenge is to use const type parameters to update the `asConst` function to make the `fruits` inference work as expected.

Check out the [docs on const type parameters](https://devblogs.microsoft.com/typescript/announcing-typescript-5-0/#const-type-parameters) to learn more.

## Transcript
0:00 In this section, we're going to be exploring the power of identity functions. Here we have a function which is called asConst, and what it does is it takes in a T here, which is saved into this type argument of T, and just returns it. What you end up with is this fruits here is basically whatever's being passed in.

0:19 We have this asConst here, but it's not really acting like an asConst. We have name and price, but we're not getting the specific name and the specific price.

0:31 We can make it work by just passing it in as const and then actually all of these types pass here, but this is pretty ugly for people to pass in. Here what it does is it applies a readonly to the array, so you can't add members to that fruit array.

0:46 If we try, then if we go fruits.push, we can't even push to it because it's readonly, then it also makes all of the name and price stuff readonly as well, just like an asConst would. Wouldn't it be great if we could actually get this working without needing the user to specify asConst?

1:05 This happens all the time when you're building things where you need the user to pass in a specified config and you want that config to be manipulable by the types themselves.

1:14 This is actually a re-recording. I had an earlier version of this, where we used something called F.Narrow from ts-toolbelt, but since TypeScript 5., there's a new tool that we can use to make this work.

1:26 I think you've got all the clues you need. There'll be a couple of links below, too. Good luck.

# Solution: Using const type parameters For Better Inference

[

github.com

https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/06-identity-functions/27-const-annotations.solution.ts

](https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/06-identity-functions/27-const-annotations.solution.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=b76a7069-a3d3-4d0e-a649-b1e4833d9b5a&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0102-identity-functions-as-an-alternative-to-the-as-const-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=b76a7069-a3d3-4d0e-a649-b1e4833d9b5a&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0102-identity-functions-as-an-alternative-to-the-as-const-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
The solution here is to annotate the type parameters `T` with `const`.

```typescript
export const asConst = <const T>(t: T) => t;
```

Now when this function is called with a tuple of elements, it infers the entire tuple of elements.

For example, if we have `name: "apple"` and `name: "banana"`, it will be inferred as a literal:

```typescript
// hovering over `const fruits = asConst([...

const asConst: <readonly [{
  readonly name: "apple";
  readonly price: 1;
}, {
  readonly name: "banana";
  readonly price: 2;
}
}]>(t: readonly [{
  readonly name: "apple";
  readonly price: 1;
}, {
  readonly name: "banana";
  readonly price: 2;
} 
}]) => readonly [{
  readonly name: "apple";
  readonly price: 1;
}, {
  readonly name: "banana";
  readonly price: 2;
}
}]
```

Const type parameters allow for deep narrowing at the generic level - essentially treating the argument passed in as if it were `as const`.

Without it, we would end up with an array of `{name: string; price: number}`, but with it we end up with beautiful inference of the exact members of the tuple.

**Supporting older TypeScript Versions**
Depending on your use case, you might need to support older TypeScript versions. This is especially true if you’re working in an old codebase, or building a library distributed to many different codebases.

The old fix, before const type parameters came in, was to use a library called `ts-toolbelt`. Specifically, a function called `F.Narrow`.

```typescript
import { F } from ‘ts-toolbelt’;

export const asConst = <T>(t: F.Narrow<T>) => t;
```

This doesn’t quite do the same thing as a const type parameter.`F.Narrow`doesn’t make the argument deeply readonly, which can sometimes be an issue.

But having it is a useful tool if needed. Check out the [docs](https://millsp.github.io/ts-toolbelt/modules/function_narrow.html) to learn more.

## Transcript
0:00 The solution here ends up being pretty simple. What we can do is we can say asConst is const T here. What const T does is basically anything you pass into this will get inferred to its most literal value.

0:17 You end up getting this big readonly array here of name, "apple," price 1, name, "banana," price 2, which is super useful. Because it's read-only, too, it means that you can't even push to it, so push is not even available on it.

0:32 We can go [fruits.name](http://fruits.name) = blah, blah, blah, blah,
blah, and it won't let us do it because it's a readonly property. This
is really nice, and it basically acts as if the user had passed in as
const here. You can pass in as const, but it actually won't do anything
because it's triggered to understand that this is being passed in.

0:50 One thing that doesn't really work here is that you can have this outside, so you can have const config is this. Then, if you pass in config here, that's actually not going to work, if you notice, because it's already inferred its type up here. It's inferred it as an array, so we can still push to it. We can still say config.push, whatever.

1:13 You need to make sure that when you're doing this that you specify to your users, "OK, make sure you pass this in like this," but it's so useful to have this. My God.

1:22 We're going to cover a couple of other things about const annotations. If you need to support older versions than 5., then it's worth investigating the F.Narrow function from ts-toolbelt. You can actually remove this const T there and wrap the thing that you want to narrow in F.Narrow.

1:43 What this does, it doesn't quite do the same thing. We can see that asConst here, it infers it as its tuple type, which is super-duper useful, but it doesn't wrap everything in read-only. That's something to bear in mind.

1:56 I would always recommend, going forward, especially as this course goes on into the future, using const T is a pretty cool way to get around this problem.

# 2. Add Constraints to an Identity Function

[

github.com

https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/06-identity-functions/28-constraints-with-const-annotations.problem.ts

](https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/06-identity-functions/28-constraints-with-const-annotations.problem.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=0a99dd1f-da6c-4678-a22a-5cef8cd303b1&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0201-add-constraints-to-an-identity-function-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=0a99dd1f-da6c-4678-a22a-5cef8cd303b1&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0201-add-constraints-to-an-identity-function-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
Let's continue with the `fruits` example.

Here we have a `narrowFruits` function that looks a lot like the the `asConst` function from the previous exercise:

```typescript
export const narrowFruits = <TFruits>(t: TFruits) => t;
```

However this time we want to narrow the type to only work with an array of objects with a `name` string and `price` number.

## Challenge
Update `narrowFruits` to only work with the desired shape.

```typescript
const fruits = narrowFruits([
  {
    name: "apple",
    price: 1,
  },
  {
    name: "banana",
    price: 2,
  },
]);
```

This is a refresher exercise, so make sure the result is the same as before!

You’ll need to remember how to [constrain a type parameter](https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-constraints), and you might also find the section of the docs on [readonly arrays](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#readonly-tuples) helpful.

## Transcript
0:00 In this exercise, we have a similar kind of function that we had before, where we want to capture the name and price of these fruits, but we also want to make sure that nothing else can be passed in here.

0:13 You shouldn't be able to pass in an array of strings, shouldn't be able to pass in strings, shouldn't be able to pass in anything except something that's constrained to name, "apple," price 1, and an array of those, of course.

0:24 We still want to capture the same type of data as in the previous exercise, but we want it to be constrained. There's an interesting little challenge here for you, and there's a couple of little gotchas here.

0:35 I'm not going to tell you what those are. I think you might know the basics. You know how to constrain a type annotation, and you know how to make something const. I'll leave you to figure out the rest. Good luck.

# Solution: Constraining and Narrowing an Identity Function

[

github.com

https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/06-identity-functions/28-constraints-with-const-annotations.solution.1.ts

](https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/06-identity-functions/28-constraints-with-const-annotations.solution.1.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=cc88b3e5-714f-4225-a2ee-c9f2d75c0c0e&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0202-add-constraints-to-an-identity-function-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=cc88b3e5-714f-4225-a2ee-c9f2d75c0c0e&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0202-add-constraints-to-an-identity-function-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
We’ll start the solution by annotating `TFruits` with `const` like before. This makes sense because it's like we are passing in a read-only thing like before.

```typescript
export const narrowFruits = <const TFruits>(t: TFruits) => t;
```

The next step is to constrain the shape of things coming in.

To do this we'll use the `extends` keyword and give it an array of objects with `name` and `price` that matches the shape of the fruits array:

```typescript
export const narrowFruits = <const TFruits extends { name: string; price: number }[]>(t: TFruits) => t;
```

This seems to make sense-- With this change we’re constraining the type that’s coming in, which means that if we call `narrowFruits` with the wrong type, we’ll get an error.

However, we're getting an error on our first test!

If we hover over the function call to `narrowFruits`, we see:

```typescript
const narrowFruits: <{ name: string; price: number; }[]>(t: { name: string; price: number; }[]) => { name: string; price: number; }[]
```

Notice that `name` and `price` are no longer being inferred to their literals. What’s going on?

## Const Type Annotations with Arrays
The issue is that we’ve specified our constraint using a mutable array.

By default, arrays can be any length in TypeScript. This means that we can’t apply `const` to them.

What we need to do is specify the constraint as a tuple.

There are a couple ways to do this.

One way is to specify it using `readonly`:

```typescript
export const narrowFruits = < const TFruits extends readonly { name: string; price: number; }[], >( t: TFruits, ) => t;
```

Another way is by using the `ReadonlyArray` type helper that is built in to TypeScript:

```typescript
export const narrowFruits = < const TFruits extends ReadonlyArray<{ name: string; price: number; }>, >( t: TFruits, ) => t;
```

With this change we would no longer need the `[]` on the constraint, because it's already an array and `ReadOnlyArray` is readable.

Another option would be to capture the constraint in a `FruitsConstraint` named type which helps a little with readability:

```typescript
type FruitsConstraint = readonly { name: string; price: number; }[];
```

Then the function would be updated as:

```typescript
export const narrowFruits = <const TFruits extends FruitsConstraint>(t: TFruits) => t;
```

Now, all our tests pass, and the inference is what we expect!

## Transcript
0:00 The solution is a little bit nasty. You probably all got to a certain spot, which we need to add a const here. Const makes sense here, because we're trying to get this readonly thing passed in.

0:14 You can see the test is passing, whoo, except not quite. There's a test down here that isn't passing, because we're expecting notAllowed to not be able to be passed in and it is allowed to be passed in.

0:26 You think to yourself, "OK, we need a generic constraint." We say extends and we know the shape of the thing that we're passing in. This is pretty simple to type. We just say name: string and price: number. Now, that's pretty good.

0:39 Now, the bottom test is passing, but the middle test or the top test isn't. Why is that? Well, fruits is now being inferred as this mutable array, name: string, price: number.

0:54 I think we need to be a bit more precise with this constraint, because what we're saying is technically name, price: number can be any length. This can be an array of any length. We need to manually specify here that it's a tuple. The way we do that is two ways. You can specify it as readonly.

1:14 What you see here, if we remove this constraint, this will give you a clue about what's going on here. NarrowFruits here, you can see that it starts with a readonly annotation here. That readonly is at the start of this tuple here. Readonly tuple means that you can't add to it.

1:34 By adding this here, we're basically saying, "OK, this is a tuple." It's a little bit annoying. I have to say that it doesn't pick this up automatically or make that inference automatically, but this is the world we live in.

1:47 There is another solution here, which is instead of using this readonly tuple syntax, you can use ReadonlyArray type helper. This means you don't need to add this thing on the end, because it's already an array and fruits will be properly narrowed using that. ReadonlyArray captures that readonly element in it and looks a little bit more readable to me.

2:08 I mean, this syntax is fine too. If we capture this out into its own type and we say FruitsConstraints, let's say and add it there. Then we can say, and these needs to then extends FruitsConstraints.

2:20 Then we can say, const whatever is a FruitsConstraint. It's going to force us to add name: string and price whatever, price: one. We won't be able to push to it from there. This is just saying it's a ReadonlyArray.

2:36 Now by itself, of course, we don't capture the literals in it. Which is why this identity function is so important, because it means that we can constrain the type of config that's coming in, but also infer it to its literal. Very useful.

# 3. Specifying Where Inference Should Not Happen

[

github.com

https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/06-identity-functions/29-finite-state-machine.problem.ts

](https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/06-identity-functions/29-finite-state-machine.problem.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=52928f6a-6703-4bb8-9432-92aa57aa06ed&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0301-specifying-where-inference-should-not-happen-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=52928f6a-6703-4bb8-9432-92aa57aa06ed&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0301-specifying-where-inference-should-not-happen-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
Here we're building a `makeFiniteStateMachine` function where `state` is a string as seen by `TState extends string`:

```typescript
export const makeFiniteStateMachine = <TState extends string>(
  config: FSMConfig<TState>
) => config;
```

We then put it into an `FSMConfig` interface, which looks like this. The `TState` being passed in becomes the initial starting state:

```typescript
interface FSMConfig<TState extends string> {
  initial: TState;
  states: Record<
    TState,
    {
      onEntry?: () => void;
    }
  >;
}
```

There are a couple errors showing up.

In the first `config` we have an initial state of `a`, but the `b` state isn't able to be specified:

```typescript
const config = makeFiniteStateMachine({
  initial: "a",
  states: {
    a: {
      onEntry: () => {
        console.log("a");
      },
    },
    // b should be allowed to be specified!
    b: {},
  },
});
```

Hovering over `makeFiniteStateMachine` shows us:

```typescript
const makeFiniteStateMachine: <"a">(config: FSMConfig<"a">) => FSMConfig<"a">
```

Right now, we're only able to specify the initial state, which is pretty annoying.

The `initial` and `states` inference sites inside of `FSMConfig` are competing.

We can see this issue again in `config2` where an `initial` state of `c` is being inferred, even though it doesn't exist:

```typescript
const config2 = makeFiniteStateMachine({
  // c should not be allowed! It doesn't exist on the states below
  // @ts-expect-error
  initial: "c",
  states: {
    a: {},
    // b should be allowed to be specified!
    b: {},
  },
});
```

Hovering over `makeFiniteStateMachine` shows us that `c` is being inferred when we don't want it to be:

```typescript
const makeFiniteStateMachine: <"c">(config: FSMConfig<"c">) => FSMConfig<"c">
```

## Challenge
Modify the `FSMConfig` type so that TypeScript doesn't infer the type based on the `initial` state using the available type, `NoInfer`

```typescript
type NoInfer<T> = [T][T extends any ? 0 : never];
```

Your job is to work out how to solve this problem by only modifying `FSMConfig` using the `NoInfer` type.

Good luck!

## Transcript
0:00 In this exercise, we have an interesting problem. We have a makeFiniteStateMachine function. This makeFiniteStateMachine takes in a config of fsmConfig, and one of the type parameters, or the only type parameter we're using is tstate. Now, tstate can be inferred in one of two places. It can be inferred in this initial slot,

00:18 which is the initial state that we're going to be in. So for instance, we have initial A here, and then states down here should be A or B. So in theory, when we call this function, makeFiniteStateMachine, it should be inferring A or B in the type parameter, but it's not. It's just inferring A here. This is pretty gross.

00:38 If we look at another one down here, then actually we have states A and B, and we have an initial of C, and we're expecting C not to be allowed because it's not one of A or B here. So if we take a look, it's actually just being inferred as C. So what we want to do is inside this ts or fsmConfig here,

00:57 we want to say, okay, this initial, we don't want you to infer from it, TypeScript. We basically want it to not infer if possible. And there is a little type at the top here called noinfer. Your job is to work out how to solve this problem when inside this fsmConfig, that's all we need to change,

01:15 using this type of noinfer. Good luck.

# Solution: Fix Inference Issues with the NoInfer Type

[

github.com

https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/06-identity-functions/29-finite-state-machine.solution.ts

](https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/06-identity-functions/29-finite-state-machine.solution.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=864496b5-5235-4ff6-96dd-5acc7ed61f45&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0302-specifying-where-inference-should-not-happen-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=864496b5-5235-4ff6-96dd-5acc7ed61f45&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0302-specifying-where-inference-should-not-happen-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
The solution here is to use `NoInfer` on the initial state:

```typescript
type NoInfer<T> = [T][T extends any ? 0 : never];

interface FSMConfig<TState extends string> {
	initial: NoInfer<TState>;
	states: Record<
		TState,
		{
			onEntry?: () => void;
		}
	>;
}
```

Adding `NoInfer` prevents anything you put in that initial spot from being inferred from.

You might wonder why this works and how the tuple signature behaves in this case. However, it's worth noting that TypeScript 5.4 (currently in beta) is about to be released and introduces a new global type called `NoInfer`. This global type behaves exactly like our own example of `NoInfer`.

So, if you need to use `NoInfer` before TypeScript 5.4 is released, you can use the provided signature or check out the [TS tool belt library](https://github.com/millsp/ts-toolbelt) that has one inside it. But it's generally recommended to use the built-in `NoInfer` once TypeScript 5.4 is available. After the release, you can simply delete the custom code, and TypeScript will have the global type available, working in the same way.

It's crucial to properly handle multiple inference sites within the same config object. This happens more often than you might think, especially when working with finite state machines.

Finite state machines typically declare a source of truth for an object with various `states`. The `initial` state is set to inherit from that source of truth. You may also encounter this scenario when working with complex generic functions.

Remember to pay close attention to this aspect when dealing with multiple inference sites in your config object to ensure efficient and accurate functionality.

## Transcript
00:00 So you might have figured this out. The simple way to do this is to say no infer on this T state here inside the initial. And now everything starts working. So if we look at makeFiniteStateMachine here, now instead of inferring A in this type parameter,

00:17 it's inferring A or B. If we unwrap that, we can see again it's just inferring A there. This is kind of interesting. If we look at the bottom one here now, if we look at makeFiniteStateMachine, it's inferring A or B because of the states in here.

00:31 And this initial is actually erroring because it's basically saying, OK, C shouldn't be allowed. It should only be A or B in this slot. Now, you might be tempted to say, OK, why does this work? And we could dive into the reasons that this little weird tuple signature actually works here.

00:49 But I am recording this just before TypeScript 5.4 comes out. So TypeScript 5.4 beta has been released and they are basically inside TypeScript 5.4 is a new global type called no infer. And no infer behaves exactly like this. So you can think of this exercise as 5.4 ready, right?

01:08 If you need to use this before 5.4, then you can use this no infer signature that I've got for you here. Or you can use the TS tool belt library that has one inside it. But I tend to recommend actually using this instead.

01:20 But after that, you'll literally just be able to delete this code. TypeScript will have the global available for you and it will work in exactly the same way. So this is really, really important when you have multiple different inference sites in the same config object being passed in.

01:36 And this happens kind of more than you might think. This is especially true for finite state machines because you're basically declaring, OK, this object of these states here is the source of truth and I want the initial to inherit from that. But you may come across these when you're working in complex generic functions like this.

# 4. Find the Generic Flow of an Identity Function

[

github.com

https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/06-identity-functions/30-no-generics-on-objects.problem.ts

](https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/06-identity-functions/30-no-generics-on-objects.problem.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=9492fda6-8798-42c2-98d3-0ad30745106e&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0401-find-the-generic-flow-of-an-identity-function-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=9492fda6-8798-42c2-98d3-0ad30745106e&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0401-find-the-generic-flow-of-an-identity-function-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
Let's look at a real use case for an identity function.

This config object has some `routes`, as well as some `fetchers` that are responsible for fetching data based on the route:

```typescript
export const configObj = {
  routes: ["/", "/about", "/contact"],
  fetchers: {
    // @ts-expect-error
    "/does-not-exist": () => {
      return {};
    },
  },
};
```

We should have an error since the `/does-not-exist` route does not exist, but for the time being we do not.

## Challenge
This config object should be constrained to a certain type. It should require a certain number of `routes`, and the `fetchers` should belong to them.

Your challenge is to create an identity function called `makeConfigObject` that meets the brief. It will take a bit of fiddling to find the right generic flow to make the logic work!

You don't need to specify all of the `fetchers`, but what you do specify must exist in the `routes`.

## Transcript
0:00 Let's look at a real use case for an identity function. We have a config object here, and on this config object, we're declaring two things. We have the roots of the config, and then we have some fetchers. These fetchers are basically supposed to be these roots, and then some fetching stuff that happens based on the roots.

0:21 This does not exist. Ideally, this would be erring here because this fetcher does not exist in the roots up here. The idea of this config object is we're supposed to be constraining it to a certain type. That type that we're constraining it to has to have a certain number of roots, and the fetchers have to belong in the roots.

0:44 You don't need to specify all of them, but it does need to exist in the array above. You're going to need to refactor this into an identity function, and that identity function is going to be called makeConfigObject. In that identity func, you're going to need to do a little bit of fiddling around to find the right generic flow to make this logic work. Good luck.

# Solution: Avoid Duplicate Code in an Identity Function with Generics

[

github.com

https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/06-identity-functions/30-no-generics-on-objects.solution.1.ts

](https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/06-identity-functions/30-no-generics-on-objects.solution.1.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=f220e6cf-55ae-404d-a076-123e148c3eb2&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0402-find-the-generic-flow-of-an-identity-function-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=f220e6cf-55ae-404d-a076-123e148c3eb2&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0402-find-the-generic-flow-of-an-identity-function-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## The Wrong Solution
Let's start by looking at a solution that isn't optimal.

Here we have an interface `ConfigObj` where we take in `TRoute`:

```typescript
interface ConfigObj<TRoute extends string> {
  routes: TRoute[];
  fetchers: {
    [K in TRoute]?: () => any;
  };
}
```

The `routes` expresses `TRoute`, and `fetchers` expresses `[K in TRoute]` similar to a map type that returns `any`.

This solution does make our `@ts-expect-error` check pass because `"/does-not-exist"` is not in the `routes`:

```typescript
export const configObj: ConfigObj<"/" | "/about" | "/contact"> = {
  routes: ["/", "/about", "/contact"],
  fetchers: {
    // @ts-expect-error
    "/does-not-exist": () => {
      return {};
    },
  },
};
```

But look at how much code had to be duplicated!

Each one of the routes has been specified twice.

Ideally the `fetchers` object would infer from the `routes`, but that would require a function call to map these two things together.

This is why we have identity functions!

## The Better Solution

Let's take a look at the real solution:

```typescript
const makeConfigObj = <TRoute extends string>(config: ConfigObj<TRoute>) =>
  config;

export const configObj = makeConfigObj({
  routes: ["/", "/about", "/contact"],
  fetchers: {
    // @ts-expect-error
    "/does-not-exist": () => {
      return {};
    },
  },
});
```

```typescript
The makeConfigObj has TRoute extends string, and the function's config takes ConfigObj<TRoute> returns config.
```

This is just an identity function, with the same definition as in the previous exercise.

With this solution, everything works without needing any extra annotations. The array `["/", "/about", "/contact"]` is inferred from the `routes`.

Identity functions are great for sorting out configuration like this, and are removed by most minifiers so you don't have to worry about bundle size even though it looks like you're adding extra wrappers.

Super cool.

## Transcript
0:00 Let's look at a solution that doesn't work. We have an interface ConfigObj here, where we're taking in TRoute. This routes expresses TRoute. fetchers expresses K in TRoute. This is like a map type which takes this and then returns a function that returns any.

0:18 This works now. It means that this does not exist. It's going to yell at us because we don't have this thing here. It's not expressed in the routes. We're going to get autocomplete based on each of these three properties. If we pass contact in there, then we're going to get that.

0:36 But we're having to specify it like this. In other words, we're having to add a type annotation to it in order for it to work. We're actually having to duplicate quite a lot of code between the routes and between here. Ideally, this fetchers object would infer from the routes. The issue here is that you need a function call to map these two things together. That's why identity functions exist.

1:02 Let's take a look at the real solution. The real solution is to have TRoute extends string. Then this makeConfigObj, config ConfigObj TRoute, returns config. It's just an identity function. Now we're using exactly the same definition as we had in the previous exercise or the previous solution. This one is just the same as this one.

1:25 Now it just works. You don't need to add any extra annotations here. That's because this array, about, contact, is being inferred from these routes. If I add a new one, if I add wow like this, then wow is going to be added there. It's going to be inferred in that position. Extremely cool.

1:47 If I just remove this, zoom in a little bit, it means that you can use these types of functions to just get these nice little bits of configuration all sorted out for you. There's one more thing too which is so cool, which is identity functions are actually removed by most minifiers.

2:07 If you're worried that you're having to declare a bit of extra code for this...Surely, I should just be able to put the ConfigObj in. That'll be -- I don't know -- faster or fewer bundle size, let's say. Your minifier will be able to figure out that this is just an identity function and actually remove the function and the function call at runtime.

2:28 Even though this looks like an extra wrapper that you're adding to your application and your runtime, it actually doesn't work that way. It's actually going to be stripped out when the code is run. Super-cool.

# 5. Reverse Mapped Types

[

github.com

https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/06-identity-functions/30.5-reverse-mapped-types.problem.ts

](https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/06-identity-functions/30.5-reverse-mapped-types.problem.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=cb83765a-db05-4c7c-b731-ab21d066e9ec&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0501-reverse-mapped-types-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=cb83765a-db05-4c7c-b731-ab21d066e9ec&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0501-reverse-mapped-types-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
This one is another mind-bender!

Consider this `makeEventHandlers` identity function that takes something in and returns the same thing back. It's currently typed as `unknown`:

```typescript
export function makeEventHandlers(obj: unknown) {
  return obj;
}
```

Our goal is to use the `makeEventHandlers` function to infer names of `click` and `focus`:

```typescript
const obj = makeEventHandlers({
  click: (name) => {
    console.log(name);

    type test = Expect<Equal<typeof name, "click">>;
  },
  focus: (name) => {
    console.log(name);

    type test = Expect<Equal<typeof name, "focus">>;
  },
});
```

## Challenge
Your challenge is to use a **reversed map type** to solve this inference puzzle.

As of this recording, this technique is not even documented anywhere, but it is a supported use case inside of the TypeScript compiler.

This is a tricky challenge, so don't be ashamed by jumping to the solution more quickly than usual!

Hint: You'll need to add a generic to `makeEventHandlers`, which will then be passed into the map type. Check out the [Mapped Types module from the Type Transformations workshop](https://www.totaltypescript.com/workshops/type-transformations/mapped-types/map-over-a-union-to-create-an-object) for a refresher.

## Transcript
0:00 This exercise is a bit of a mind-bender. This makeEventHandlers function, what it's doing is it's just an identity function taking in something and returning the same thing back, but what we're using it for is we're using it for a little bit of a interesting use case.

0:17 We've got a function here called click, and that click is a property on the object that we're passing into makeEventHandlers. What we're trying to do is take that click and automatically infer it into that name slot so that name itself should be click. The same is true for focus here.

0:36 I'm going to give you the name of the piece of syntax that I want you to use. You're going to need to use a mapped type here but it's unusual. It's what's called a reverse mapped type. This technique is not even that documented anywhere but it's inside the compiler as something that it recognizes for this use case. A reverse mapped type.

0:59 You might get lucky if you google online, or maybe in the future some people will document this use case, but this is a tricky one to figure out so don't be ashamed by jumping to the solution. You're definitely going to need a generic on makeEventHandlers. You're definitely going to need to pass that generic into a map type, but yeah, good luck. I'll see how you do with this.

# Solution: Inference Inception in an Identity Function

[

github.com

https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/06-identity-functions/30.5-reverse-mapped-types.solution.ts

](https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/06-identity-functions/30.5-reverse-mapped-types.solution.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=8d0f3e78-da2b-4cf0-96e8-206ac002ef20&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0502-reverse-mapped-types-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=8d0f3e78-da2b-4cf0-96e8-206ac002ef20&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0502-reverse-mapped-types-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
Since this one was tricky, let's work through it together.

The first thing we need to do is add a generic called `<TObj>`:

```typescript
export function makeEventHandlers<TObj>(obj: TObj) {
  return obj;
}
```

Now when we call `makeEventHandlers` with our example `obj` we're going to see the `name` is `any` and the return is `void`:

```typescript
const obj = makeEventHandlers({
  click: (name) => {
    ...

// hovering over `click` shows
(property) click: (name: any) => void
```

When I've come up against this sort of scenario in the past, I've thought that inferring something _from the thing I'm inferring_ what also using that inference to change that thing I'm trying to infer was impossible.

But as mentioned in the problem setup, this can be solved with a reverse map type.

Inside of `makeEventHandlers` instead of using `TObj` for `obj`, we can say that `[K in keyof T]` is a function that returns `void`. For now, we'll say this function has a string argument:

```typescript
export function makeEventHandlers<T>(obj: {
  [K in keyof T]: (arg: string) => void;
}) {
  return obj;
}
```

With this setup, when we hover over `makeEventHandlers` we see that we have inference for an object where the properties are unknown.

In other words, it's picking up the keys but not the values:

```typescript
// hovering over makeEventHandlers
const obj = makeEventHandlers({ ...

// shows

function makeEventHandlers<{
  click: unknown;
  focus: unknown;
}>(obj: {
  click: (arg: string) => void;
  focus: (arg: string) => void;
}): {
  click: (arg: string) => void;
  focus: (arg: string) => void;
}
```

Because we have access to `K` from `[K in keyof T]` we can actually update the `arg` to be `K` instead of string:

```typescript
export function makeEventHandlers<T>(obj: {
  [K in keyof T]: (name: K) => void;
}) {
  return obj;
}
```

Now we can see that it actually ends up going back into the object that it's typing!

Hovering over the `name` inside of the `click` shows us that the name has ended up there:

```typescript
// hovering over name
const obj = makeEventHandlers({
  click: (name) => {
    ...

// shows
(parameter) name: "click"
```

Now anything else add into the object will be inferred as well.

You just learned how to create a type alias with an identity function!

## Transcript
0:00 Ready? makeEventHandlers. What we can do here is we need a generic. Let's call it TObj, for instance. This TObj, let's imagine that we just pass it in like this. What we're going to get here is we're going to get click name any void, focus name any void.

0:19 You might think it's impossible. Actually, I've come up against this myself. I thought that inferring something from the thing that you're inferring while also using that inference to infect and change the thing that you're trying to infer was impossible, but it's not, using a reversed map type.

0:40 What you can do is instead of saying, "TObj" here, you can say, "K in keyof TObj" is a function that returns void. This function is going to have an argument. Let's just say that argument is string, for now.

0:59 This looks super-weird. Where are you actually inferring the shape of TObj from? It turns out that if you pass in a mapped type like this into the inference slots, then what you're going to get is it's going to infer, basically, an object where the properties are unknown. You're going to get a thing unknown into these inference slots. In other words, it picks up on the keys but not the value.

1:31 What we're going to do is we take TObj. Now we have access to the key via K. arg K, look at that. Oh my God. It's just so cool, it actually then goes back into the object that it's typing. arg click now belongs here, so name is click. You can add something, anythingYouWant, to this. anythingYouWant. You get name. name is going to be anythingYouWant.

2:06 I think this is just so amazing. It gives you a lot of flexibility. This is only possible with a reversed map type and with an identity function. It's so cool.

# Resources

[

github.com

https://github.com/millsp/ts-toolbelt

](https://github.com/millsp/ts-toolbelt)

[

github.com

https://github.com/millsp/ts-toolbelt/blob/319e551/sources/Function/Narrow.ts#L32

](https://github.com/millsp/ts-toolbelt/blob/319e551/sources/Function/Narrow.ts#L32)

[

github.com

https://github.com/millsp/ts-toolbelt/blob/master/sources/Function/NoInfer.ts

](https://github.com/millsp/ts-toolbelt/blob/master/sources/Function/NoInfer.ts)

[

github.com

https://github.com/millsp/ts-toolbelt/blob/master/sources/Function/NoInfer.ts

](https://github.com/millsp/ts-toolbelt/blob/master/sources/Function/NoInfer.ts)

[

devblogs.microsoft.com

https://devblogs.microsoft.com/typescript/announcing-typescript-5-0-beta/#const-type-parameters

](https://devblogs.microsoft.com/typescript/announcing-typescript-5-0-beta/#const-type-parameters)

[

www.totaltypescript.com

https://www.totaltypescript.com/workshops/type-transformations/mapped-types/map-over-a-union-to-create-an-object

](https://www.totaltypescript.com/workshops/type-transformations/mapped-types/map-over-a-union-to-create-an-object)

# (g) Challenges



# 1. Merge Dynamic Objects with Global Objects

[

github.com

https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/07-challenges/31-merge-dynamic-object-with-global.problem.ts

](https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/07-challenges/31-merge-dynamic-object-with-global.problem.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=916b8777-2415-4d95-aca7-df4592316ba7&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0101-merge-dynamic-objects-with-global-objects-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=916b8777-2415-4d95-aca7-df4592316ba7&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0101-merge-dynamic-objects-with-global-objects-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
In this exercise we'll work with globals.

Here's an `addAllOfThisToWindow` object:

```typescript
const addAllOfThisToWindow = {
  add: (a: number, b: number) => a + b,
  subtract: (a: number, b: number) => a - b,
  multiply: (a: number, b: number) => a * b,
  divide: (a: number, b: number) => a / b,
};
```

We want to add each of the functions inside of the object to the `window` object.

One way to do this would be to use the `declare global` syntax to individually add each of the functions to the `Window` interface:

```typescript
declare global {
  interface Window {
    add: typeof addAllOfThisToWindow.add;
    ...
  }
}
```

This would make our tests pass, but individually adding each of the functions would get tiresome.

## Challenge
Your challenge is to find a different way to merge the functions from `addAllOfThisToWindow` into the global `window`.

Hint: the solution still uses `declare global` and `interface Window`, but not the same way as above!

## Transcript
0:00 This challenge relates to globals. We're trying to do something interesting. We have an addAllOfThisToWindow object, where we're basically taking add, subtract, multiply, and divide. We're trying to add them all to the window.

0:15 We could do this with like, "declare global interface Window" and add all of them manually. We could say, "add" is "typeof addAllOfThisToWindow.add," for instance, but this is going to get pretty tiresome, pretty quickly. We do see that this does work. Like window.add, basically, when it's added to the window, then these tests will start passing.

0:39 It would be great if we could find a way of doing this where we didn't have to add all of them individually. We could just say take all of this and then just merge it in with the global window. That's your challenge. Somehow, you need to find a way of doing this declare global where you basically add that stuff into the window. Good luck.

# Solution: Add Objects to the Global Scope Dynamically

[

github.com

https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/07-challenges/31-merge-dynamic-object-with-global.solution.ts

](https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/07-challenges/31-merge-dynamic-object-with-global.solution.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=444e4942-0632-41dd-b044-bbc2734441b8&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0102-merge-dynamic-objects-with-global-objects-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=444e4942-0632-41dd-b044-bbc2734441b8&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0102-merge-dynamic-objects-with-global-objects-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
The solution will still have `declare global` and `interface Window`:

```typescript
declare global { interface Window {} }
```

Because `Window` is an interface, we can use the `extends` keyword to add additional types to it.

For example, if we declare a `Whatever` type inside of the `global` and bring in `addSolution` using `typeof`:

```typescript
declare global {
  type Whatever = {
    addSolution: typeof addAllOfThisToWindow.addSolution;
  };

  interface Window extends Whatever {}
}
```

With this change, our first test passes but this is starting down the path of having to individually add each of the functions.

Instead of using `typeof` for just one function, we can use it for the entire `addAllOfThisToWindow` object:

```typescript
declare global {
  type StuffToAdd = typeof addAllOfThisToWindow;

  interface Window extends StuffToAdd {}
}
```

Now everything is merged into `Window`.

This pattern is really useful for things like assigning environment variables to certain defaults, or any other situations where you want to stick things in the global scope.

## Transcript
0:00 The way we start this is with a declare global. What we need to do inside here is we need to say, "interface Window." We somehow need to stick all of the stuff inside there. The thing that's useful about this is that Window is an interface, which means that we can use the extends keyword.

0:21 We can't change Window into a type. We can't say, "type Window = window & typeof addAllOfThisToWindow," but we can use interface Window Extends. Now we can start actually adding stuff inside here.

0:36 This is interesting. An interface can only extend an identifier/qualified-name with optional type arguments. Huh? An identifier/qualified-name is actually a type. We need to express type, let's say, Whatever equals this. Now interface Window can extend not Window, but Whatever. This works.

0:58 Now we can add a, for instance, typeof addAllOfThisToWindow. I've changed these to addSolution instead of thingy, blah, blah, blah, blah, blah. This shouldn't be add a. This should be addSolution. Now this one starts passing.

1:19 You can see where we're heading here. Now that we can extend this, we can actually, instead of mapping these individually onto addSolution, subtractSolution, multiplySolution, we can actually do this. We can say, "type StuffToAdd," let's say, "= typeof addAllOfThisToWindow." Then we can say, "interface Window extends StuffToAdd." Wow.

1:46 Now we've just done a big old merge, putting all of
the stuff that's inside here into the Window. This means we can just
say...I just want to say, "wow" is "1," for instance. We can then say,
"[window.wow](http://window.wow)." It's right there. Of course, this works at runtime because
we're doing an Object.assign here which merges them both together.
Super-nice.

2:06 This is really useful when you want to assign like process environment variables to a certain default value, let's say, and you have a type that you want to pull from, and you want to stick it in the global scope. Really, really nice.

# 2. Narrowing with an Array

[

github.com

https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/07-challenges/32-narrow-with-arrays.problem.ts

](https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/07-challenges/32-narrow-with-arrays.problem.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=9caab2db-65a5-4e68-afd3-bf3045259f3f&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0201-narrowing-with-an-array-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=9caab2db-65a5-4e68-afd3-bf3045259f3f&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0201-narrowing-with-an-array-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
In this exercise, we will review a couple things we learned about identity functions.

Here we have a `wrapFruit` function that takes an array of fruits, each with a name and a price, and returns an object with a `getFruit` function. The `getFruit` function takes in the fruit name and returns the fruit object that matches the name:

```typescript
export const wrapFruit = (fruits: unknown[]) => {
	const getFruit = (name: unknown): unknown => {
		return fruits.find((fruit) => fruit.name === name);
	};

	return {
		getFruit,
	};
};
```

When calling `fruits.getFruit` in VS Code, we should expect autocomplete to display either "banana" or "apple", which are the available fruit names.

```typescript
const fruits = wrapFruit([
  {
    name: "apple",
    price: 1,
  },
  {
    name: "banana",
    price: 2,
  },
]);

const banana = fruits.getFruit("banana");
const apple = fruits.getFruit("apple");
// @ts-expected-error
const notAllowed = fruits.getFruits("not-allowed");
```

As seen in the tests, it should not be possible to pass in an unknown fruit.

Also, the expected return type should be the exact same type as the input, including the `name` and `price`.

```typescript
type tests = [
	Expect<Equal<typeof apple, { name: "apple"; price: 1 }>>,
	Expect<Equal<typeof banana, { name: "banana"; price: 2 }>>
];
```

## Challenge
Your challenge is to update `wrapFruit` so the tests pass as expected.

To do this, you will need to figure out the types for the `wrapFruit` function and the `getFruit` method.

You'll need to use generics, and may find [const type parameters](https://devblogs.microsoft.com/typescript/announcing-typescript-5-0/#const-type-parameters) helpful!

## Transcript
0:00 In this exercise, we're going to review some of the stuff we did in the identity functions section. We have a wrapFruit function here. What it does is it takes in some fruit, and these fruits have to be constrained to a certain type, so name and price.

0:15 We want these to be inferred to their literals so that we can then...Fruits doesn't actually return an array here. It actually returns an object of getFruit. GetFruit, what it does, it takes in the name, so the name of a fruit, so this will be apple or banana. What it does is it finds that fruit and returns that specific fruit.

0:37 We need to make this work on the type level as well. When we get back banana, we're expecting banana to be a readonly name, "banana"; readonly price, 2, and we're expecting apple to be readonly name, "apple"; readonly price, 1.

0:52 That's your challenge. You're going to probably need some const generics. You'll need some constraints. You're going to need to do a little bit of type transformation here as well in order to extract out the correct fruit.

1:03 You're probably going to need to patch over some of JavaScript here because, for instance, find always returns unknown or the thing that you're finding.

1:13 You're probably going to need to assert that the thing that you're returning is the thing because we know on the type level that getFruit is always going to return the thing. It's not going to return the thing or undefined. It's always going to have a member to find there, basically.

1:30 Good luck, and I'll see you on the other side.

# Solution: Narrowing with Arrays and Generics

[

github.com

https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/07-challenges/32-narrow-with-arrays.solution.ts

](https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/07-challenges/32-narrow-with-arrays.solution.ts)

 [<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=af3dbdda-80b9-45ca-a444-bcfbe74401b2&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0202-narrowing-with-an-array-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>]( <div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=af3dbdda-80b9-45ca-a444-bcfbe74401b2&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0202-narrowing-with-an-array-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
First, let's capture the fruit being passed in using a `TFruits` generic type argument on the `wrapFruit` function:

```typescript
export const wrapFruit = <TFruits>(fruits: TFruits) => { const getFruit = (name: unknown) => { return fruits.find((fruit) => fruit.name === name); }; return { getFruit, }; };
```

But now we have a problem with our inference.

Hovering over our call to `wrapFruit` shows us that we're only capturing `string` for `name` and `number` for `price`:

```typescript
// hovering over wrapFruit const fruits = wrapFruit([ { name: "apple", price: 1, }, { name: "banana", price: 2, }, ]); // shows: const wrapFruit: <{ name: string; price: number; }[]>
```

Adding a `const` type parameter to `TFruits` will improve the inference and allow us to capture the literal values of the fruits. This is important for providing autocomplete suggestions.

```typescript
export const wrapFruit = <const TFruits>(fruits: TFruits) => { ...
```

Now when we hover over the `wrapFruit` call we see:

```typescript
// on hover const wrapFruit: <readonly [{ readonly name: "apple"; readonly price: 1; }, { readonly name: "banana"; readonly price: 2; }]>
```

## Constraining as an Array
We still have a problem inside of the `wrapFruit` function.

Currently `TFruits` doesn’t know that it’s an array, so we’re getting an error on `.find`.

To fix this, we can constrain `TFruits` to be an array of `Fruit`:

```typescript
export const wrapFruit = <const TFruits extends Fruit[]>(fruits: TFruits) => { ...
```

But now we're back to having `wrapFruit` be inferred as `Fruit[]` instead of our `readonly` array.

We can solve this by changing the constraint to be `readonly`:

```typescript
export const wrapFruit = <const TFruits extends readonly Fruit[]>(fruits: TFruits) => { ...
```

Now our inference inside of `wrapFruit` is back to where it was.

## Calling `.getFruit()` in a Type-safe Way
Currently the `getFruit` is typed as `unknown`:

```typescript
// inside wrapFruit const getFruit = (name: unknown) => { ...
```

We can constrain it to TFruits\[number\]\['name'\]:

```typescript
const getFruit = (name: TFruits[number]['name']) => { return fruits.find((fruit) => fruit.name === name); };
```

`TFruits[number]` gives us a union of all of the members of the `TFruits` tuple, then we grab the `name` property from each member.

There's still a little work to do, since the value of the function return _depends_ on the thing passed into `name`.

However, it's not working inside the function because `fruits.find` returns `undefined`. We can use the `as` annotation to fix the issue:

## Making `.getFruit()` Return the Right Fruit
First we need to capture `name` in a generic as `TName`:

```typescript
const getFruit = <TName extends TFruits[number]['name']>(name: TName) => { ...
```

Then we need to make sure the return value of `getFruit` is the correct member from `TFruits` depending on what name gets passed in.

The simplest way to do this is by using `Extract`:

```typescript
const getFruit = <TName extends TFruits[number]["name"]>( name: TName, ): Extract<TFruits[number], { name: TName }> => { return fruits.find((fruit) => fruit.name === name); };
```

With this change we still have one last error showing up:

```typescript
// hovering over the error Type 'Fruit' is not assignable to type 'Extract<TFruits[number], {name: TName}>'
```

We get this error because the return type is `Fruit | undefined`.

The best way to handle this is to change the return type annotation to an `as`:

```typescript
const getFruit = <TName extends TFruits[number]["name"]>(name: TName) => { return fruits.find((fruit) => fruit.name === name) as Extract< TFruits[number], { name: TName } >; };
```

Now the return type will be overwritten with the actual type we want.

## Summarizing Our Work
That was a lot! Let’s summarize our solution.

First, we use an outer generic on the `wrapFruits` function with a `const` type parameter to capture the value of the fruits passed in.

Then, we made the function `getFruits` generic, and use it to extract the correct member of `TFruits` based on the name passed in.

Here's what the code looks like all together:

```typescript
export const wrapFruit = <const TFruits extends readonly Fruit[]>( fruits: TFruits, ) => { const getFruit = <TName extends TFruits[number]["name"]>(name: TName) => { return fruits.find((fruit) => fruit.name === name) as Extract< TFruits[number], { name: TName } >; }; return { getFruit, }; };
```

This is a really nice demonstration of how you can get lovely inference when you pass in complex config objects!

## Transcript
0:00 Let's do the things that we know we need to do first. We need to capture the fruit that's being passed in so that this identity function actually does something. Let's start by adding a type argument on the top function here on wrapFruit itself and saying TFruits. Let's just stick it inside here.

0:17 Of course, this is not going to do very much because we're capturing the basic stuff inside here, but we need to add a const annotation to this in order to make it actually capture the literal values, which are going to be important later. We know we need to capture apple because we want this to have autocomplete down there. That's going to need to be in there.

0:37 We currently don't know that we have a find property on TFruits because this could be called with anything. We need to constrain it. This needs to be extends Fruit array here. Except, of course, this means that wrapFruit here is actually being inferred as Fruit array, not its literal values. We've been caught out by this before. We can say readonly Fruit inside here.

1:01 Readonly Fruit now means that this array gets marked as readonly, meaning it's available to be consted. It's available to be inferred deeply as its literals. We end up with readonly, readonly, readonly everywhere and everything's being inferred as its literals, which is great.

1:18 Now the next thing I'm looking at is this name function here or name parameter, because we can see that it's being typed as name unknown, meaning we can pass any old thing to this, which is not good. Let's just annotate that first. We can say TFruits number and name.

1:35 What this is doing then is it's saying TFruits number name. We're basically turning those TFruits into a union and then extracting out the discriminator, which in this case is the name. We know that every single thing has a name here. I wonder if I can...No, it doesn't matter too much. This means that we're just basically getting a union out of the names.

1:56 Now we can see that banana and apple are added there. If we add another one here, let's say add orange, then that's going to add itself to the union as well. Let's say price 3, just to differentiate it, and getFruit orange. Beautiful stuff.

2:10 Now this is OK, except for the fact that this return type is Fruit or undefined. We want it to be the specific fruit that's coming from this type being inferred here, except that getFruit here, name apple, banana, or orange, let me just remove orange for clarity, this here is not being actually inferred as the member, it's being inferred as the union of all possible members.

2:36 We've got apple or banana there. This isn't so good. We need a generic there so we can capture the actual argument being passed in and use that to infer the return type. Let's capture this in a generic. We can say TName extends this. There we go. Bit of funky syntax there came out for a second.

3:01 Because this is a generic on the getFruit function itself, we should be able to capture banana in that slot. Great. Except now we're not getting the specific banana fruit back, we're getting any fruit back. That's not good either. We need to figure out the return type of this function.

3:21 We also need to remove undefined from that union, because we know this is never going to be undefined. We're always going to get back something from this array because we've specified the array, made it readonly, and inferred the thing from it.

3:36 Let's do that then. We have this getFruit. Let's do it on here first. We're going to use extract here. Extract is going to extract out TFruits number. We're going to extract out name TName. Now what this does is it's basically turning TFruits into a union, turning it into a union of its members, and then matching that to name TName.

4:10 What this means is we actually end up with the correct stuff being inferred here. We get banana, name banana, price 2, apple, name apple, price 1. Yes, beautiful. Except it's not really working inside our function because type undefined is not assignable to extract fruits number name. Fruits.find, we noticed this before, actually does return a undefined in its union.

4:36 We could try adding a non- assertion here to the end here. Now, of course, Fruits, all it's being inferred as is fruits. It doesn't quite get that we're able to extract out the proper thing by the name being passed in. I would say the best thing to do here is actually use an as annotation. We would probably need to use this as annotation anyway.

4:59 What we could do, even if we specified it in the return type as well, we would need to specify as the as inside the function there, too. I like to just drop the return type when we have this duplication in this case. Now everything is working. We've got our banana. We've got our apple. All the tests are passing. All the thing we're getting back is readonly.

5:22 If we add our orange back, let's say name orange and price 3, then we can get proper inference here. If we say this and orange, then that's working beautifully.

5:33 This is a really nice demonstration of how you can really get lovely inference when you pass in these complex config objects. You can make these beautiful little wrappers around functions so that you can...This is mostly type level programming here. The actual code that's going to be shipped to the browser or the bundle is really small, but we do get just this lovely layer of inference on top.

# 3. Create a Type-Safe Request Handler with Zod and Express

[

github.com

https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/07-challenges/33-zod-with-express.problem.ts

](https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/07-challenges/33-zod-with-express.problem.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=faf5794b-3dc3-45ce-bba7-0ba94c12eae0&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0301-Create a Type-Safe Request Handler with Zod and Express-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=faf5794b-3dc3-45ce-bba7-0ba94c12eae0&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0301-Create a Type-Safe Request Handler with Zod and Express-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
In this exercise, we'll create a runtime-safe and type-safe integration point between the Zod and Express libraries.

Spoiler alert: This is going to involve some hardcore TypeScript!

## The Express App
We start with an Express app that includes a call to `makeTypeSafeHandler`:

```typescript
const app = express();

it("Should make the query AND body type safe", () => {
  app.get(
    "/users",
    makeTypeSafeHandler(
      {
        query: z.object({
          id: z.string(),
        }),
        body: z.object({
          name: z.string(),
        }),
      },
      (req, res) => {
        type tests = [
          Expect<Equal<typeof req.query, { id: string }>>,
          Expect<Equal<typeof req.body, { name: string }>>
        ];
      }
    )
  );
});
```

Inside of the request, the query and body will be typed according to the objects we passed into `makeTypeSafeHandler`.

## The Handler
We want to make sure that `makeTypeSafeHandler` is both type and runtime safe.

Here's the current state of the function, which is not currently generic:

```typescript
const makeTypeSafeHandler = (
  config: {
    query?: z.Schema;
    body?: z.Schema;
  },
  handler: RequestHandler
): RequestHandler => {
  return (req, res, next) => {
    const { query, body } = req;
    ...
```

Inside of the config object, `z.Schema` is used on the body and the query. There are also handlers from Express used as well. You might recall from previous lessons that many of these use generics!

## Challenge
Your challenge is to combine the features of Zod and Express in `makeTypeSafeHandler` so the tests pass.

If no `config` is passed in, the request `query` and `body` should default to be typed as `any`.

This is a complex exercise!

With the knowledge you have gained, we should be able to complete it successfully. Reference the prior lessons on Express and determining required generics for help.

## Transcript
0:00 In this exercise, we're going to be creating an integration point between two external libraries. This is some of the most hardcore and awesome, useful TypeScript you can do. We're going to be putting together Zod and Express. I'm going to show you how we're going to do that.

0:18 We have an Express app here. What we're doing is we're basically saying makeTypeSafeHandler, what it's going to take in, an object for the query here and an object for the body. Then, inside the request here, request.query is going to be typed to this thing here, to query. Then request.body is going to be typed to this name string here.

0:47 It's basically making a type and runtime-safe handler. What it's currently doing is there's no generics on it anywhere. We've got z.Schema and z.Schema on the body here. We've got some RequestHandlers, which we're getting from Express.

1:05 If you remember the exercises that we did on those, then you should remember that these take some generics. Ideally, what we want to do is mash them together somehow and make a RequestHandler that builds on all of the things that we understand that this can do.

1:25 You should be able to remember the generic structure for RequestHandler and maybe for z.Schema too. I am not going to give you too much information here. There's one more thing too, which is you should default these to any if no config has been passed in.

1:44 You see, in this one, we haven't passed in body or query. request.query should be any. request.body should be any as well. I think that's everything. This is going to be a complicated one. Good luck.

# Solution: Type-Safe Request Handlers with Zod and Express

[

github.com

https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/07-challenges/33-zod-with-express.solution.ts

](https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/07-challenges/33-zod-with-express.solution.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=9a5cd7c2-cecf-4cd8-8633-5ec9174c7c41&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0302-Create a Type-Safe Request Handler with Zod and Express-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=9a5cd7c2-cecf-4cd8-8633-5ec9174c7c41&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0302-Create a Type-Safe Request Handler with Zod and Express-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
In our starting point code, the `query` and `body` that are passed into the `config` for `makeTypeSafeHandler` are used independently of each other and provide separate types of inference.

This is a clue that we need to use two generics for `makeTypeSafeHandler`.

Let's start by adding `TQuery` and `TBody` generics:

```typescript
const makeTypeSafeHandler = <TQuery, TBody> (
    config: {
        query?: z.Schema;
        body?: z.Schema;
    },
    ...
```

Hovering over `z.Schema`, we can see that it lets us pass in an `Output` that will in turn be output from the schema:

```typescript
// hovering over z.Schema
(alias) class Schema<Output = any, Def extends ZodTypeDef = ZodTypeDef, Input = Output>
export Schema
```

This means we can add `TQuery` and `TBody` to `z.Schema` in the appropriate places inside of the `config`:

```typescript
const makeTypeSafeHandler = <TQuery, TBody> (
    config: {
        query?: z.Schema<TQuery>;
        body?: z.Schema<TBody>;
    },
    ...
```

Now we will get inference based on the things that are passed in– in this case the `id` string from `TQuery` and `name` string from `TBody`.

Next, we need to do some stuff for requests.

We want there to be inference on the request for the `RequestHandler` that's passed into `makeTypeSafeHandler`. The `req` should be `req.query`.

The `P` will be `req.params`, and the `ResBody` is the thing that's returned from `res.send`. Then the `ReqBody` and `ReqQuery` are passed in third and fourth, which are the things we want:

```typescript
interface RequestHandler < P = core.ParamsDictionary, ResBody = any, ReqBody = any, ReqQuery = core.Query, ... >
```

We can modify the `RequestHandler` to pass in `any` for the first two slots, then `TBody` followed by `TQuery`.

```typescript
... handler: RequestHandler<any, any, TBody, TQuery>;
```

After doing this, hovering over the `req` in the test call to `makeTypeSafeHandler` shows that our inference is working properly:

```typescript
// inside of call to makeTypeSafeHandler // hovering over req in (req, res) (req, res) => // shows (parameter) req: Request<any, any, { name: string; }, { id: string; }, Record<string, any>>
```

With this change we now have an red line under `req` in the `handler` return inside of `makeTypeSafeHandler`.

Hovering shows us the following errors:

```typescript
Argument of type 'Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>' is not assignable to parameter of type 'Request<any, any, TBody, TQuery, Record<string, any>>'. Type 'ParsedQs' is not assignable to type 'TQuery'.
```

Let's start by fixing the `ParsedQs` error, which tells us that `TQuery` needs to be a bit more constrained.

Digging into the type definitions of `core.Query`, we see that it imports `ParsedQs` from `qs`.

Adding this same import to our solution fixes error.

```typescript
import { ParsedQs } from "qs";
```

In order to fix the "not assignable to parameter" error, we need to make sure our `RequestHandlers` match:

```typescript
const makeTypeSafeHandler = <TQuery extends ParsedQs, TBody> ( config: { query?: z.Schema<TQuery>; body?: z.Schema<TBody>; }, handler: RequestHandler<any, any, TBody, TQuery> ) : RequestHandler<any, any, TBody, TQuery> => { ... }
```

Because of the mismatch. The generic inference wasn't being passed all the way through. And so it's almost as if I had been passing in `ParsedQs` from the second `RequestHandler`. Which means I was trying to mash things together.

I could have used an `as any` to do it, but that didn't seem like the best solution. I wanted to force TypeScript to do what I wanted it to do. Then, when we pass in the inference, we end up with really nice inference.

Now that we have the first test passing, let's move on to the "should default to any if not passed in config" test.

Currently, `rec.query` is being inferred as `ParsedQs`, and `rec.body` is `unknown`.

This is not necessarily unsafe, but defaulting them to `any` will give us strong types if we decide to type them while allowing them to fall back to the weaker types.

To do this, we'll add the `any`s to `makeTypeSafeHandler`.

While we're at it, we can update `TBody` to extend `Record<string, any>`, since that more closely matches the JSON that would be posted to a body:

```typescript
 const makeTypeSafeHandler = <TQuery extends ParsedQs = any, TBody extends Record<string, any> = any> ( ... )
```

Now everything is working as expected!

## Summarizing Our Work
That was a lot of work, so let's take it from the top.

For `makeTypeSafeHandler`, the `TQuery` and `TBody` are inferred from `z.Schema`.

We pass in a `RequestHandler` that takes in `any` for the first two slots then `TBody` for the request body and `TQuery` for the request query.

Then we will return a `RequestHandler` with the same generic signature. This is important because we need them to be assigned to one another.

Inside of `makeTypeSafeHandler` we do some casting of the `ZodError` to ensure type safety and return the error message.

This allows us to get all of the inference inside the type arguments, and we can get back all of the exact things that we want– all beautiful and type safe.

## Transcript
0:00 Let's do this. I'm getting the feeling that I'm going to need a generic for both the query and the body. This is going to be a two-generic job. Why is that? They seem to be totally independent. They don't depend on each other at all. They provide separate types of inference here.

0:22 The question is now, how should I represent this? If I do this, if I do TQuery and then TBody...What I'm going to do is I'm going to hover over z.Schema. I can see that it has an Output in it. This Output actually lets me pass in the thing that I want to output from the schema. I can say, "z.Schema TQuery" and "z.Schema TBody."

0:49 Now, just like that, I should be getting inference based on the things that are passed in. We've got id string and name string, so id string coming from the query and name string coming from the body. That's great already. Fantastic.

1:05 What's next then is we need to do some stuff here. We need to say, "Request." This request on these RequestHandlers...This RequestHandler is the thing that's passed in here. This is where we want the inference to happen. We want the request here to basically be req.query.

1:25 Let's take a look at this again. We have P is core.ParamsDictionary. That's the request.params. ResBody is going to be the thing that's returned from res.send, let's say. ReqBody and then ReqQuery are the things that we want. Request body gets passed in third. Request query gets passed in fourth. Let's do that.

1:53 Let's say we've got our RequestHandler. We're going to say, "any, any." Then we can pass in...Oh God. Which one was it? Request body first, so TBody and then TQuery. Let's just check that again. Yeah, request body and request query.

2:11 We're now getting the inference coming through. req.query is now working for us. Look at that. Very, very nice. That's cracking.

2:22 Now, what's going wrong here then? ParsedQs is not assignable to type TQuery. We're getting an issue where TQuery basically needs to be a bit more constrained. ParsedQs, I think we had a similar issue when we did this before. I can't get this ParsedQs. Where is ParsedQs coming from? I remember this.

2:48 ParamsDictionary ParsedQs. It looks like it's coming from the RequestHandler itself. This is a ReqQuery = core.Query, which is ParsedQs, which is coming from a qs library. Wow. It looks like I can import the type ParsedQs from qs. It should just work. Yeah, there we go. ParsedQs. Here we go. It's a parsed query string here.

3:18 You're still not happy? Assignable to the constraint of type TQuery but could be instantiated with a different subtype of it. It's still not happy. I think the reason is that if I don't return this, then this is going to be annoyed here.

3:37 My instinct says, because there's a mismatch between this RequestHandler and this RequestHandler, I should just be able to pass in "any, any, TBody, TQuery." Look at that. The error went away.

3:53 Why did that happen? I think the reason why that happened is because there was a mismatch. The generic inference wasn't being passed all the way through. It's almost as if I had been passing in ParsedQs from here.

4:10 I was saying I've got this TQuery, which extends ParsedQs but isn't actually necessarily the same as it. Then we've got this ParsedQs down here. Basically, I was saying let me try and mash these two things together.

4:26 I could have done this with an as any, of course. That's another way I could have done it. At least in my mind, it's basically the same here. I'm just trying to solve the problem of forcing TypeScript to do what I want it to do.

4:39 We've got our RequestHandler. Beautiful. That's just working now. When we pass in that from the inference and we say this handler is exactly the same as this handler, then we end up with really, really nice inference. Lovely.

4:55 Now it should default them to any if not passed in config. If they're not passed, what we should be doing is we should be defaulting them to any. When you don't pass them in here, what are they being inferred as, currently? We've got req.query. This is being inferred as just ParsedQs. That's not unreasonable, but let's say that we do want this. Let's say we want to default them to any.

5:20 Inside here, this is being inferred as ParsedQs and unknown. req.body is probably unknown at this point. req.body. Let me check. Yeah, unknown. That's not necessarily unsafe, but let's show how to do this, which is we can default them up here to "= any" and "= any" here too. Now, when they're not passed, req.body is going to be any. Beautiful. req.query, also any.

5:50 This means then if we do decide to type them, then we're going to get strong types. If we don't decide to type them, then we fall back to these weaker types, which is useful when you're halfway through a migration.

6:01 Let's go to the top then. We've got TQuery. I wonder if I can remove this "extends ParsedQs" now. Yeah, these can be anything now. I don't know if that's safe though, because we want it to match up to the shape of the query.

6:14 TBody, we probably also want it to extend a record of string and any, I think, just because that's the sort of thing that you can post to a body when it's passed in terms of JSON. Then TQuery, these are only the sort of things that you're going to be able to pass on a search params here.

6:34 I think that is everything. We go from the top. TQuery, we're inferring it from z.Schema TQuery. TBody, z.Schema TBody. Then we pass in a RequestHandler, which has any, any in the first two slots and then TBody for -- where is it -- ReqBody and then TQuery for ReqQuery.

6:56 Then we return a RequestHandler with the same generic signature -- that's really crucial -- so that one is assignable to the other. Then we don't actually need much in the way of complicated stuff inside here. I'm doing a little bit of casting of the ZodError inside here, because e inside a try catch is always unknown.

7:15 We're calling res.status here. We're saying, "e as ZodError," and then basically returning the message here, which is fairly safe because that's the only thing that we're trying to do inside that try catch.

7:27 Then what we end up with is we can call this. We get all of the beautiful inference inside the type arguments. We can get back all of the exact things that we want to. Everything's all beautiful and type safe. We get a lovely, lovely integration point between two libraries. Well done.

# 4. Building a Dynamic Reducer

[

github.com

https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/07-challenges/34-dynamic-reducer.problem.ts

](https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/07-challenges/34-dynamic-reducer.problem.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=655ad144-9a9e-40aa-ab3d-24247f767672&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0401-building-a-dynamic-reducer-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=655ad144-9a9e-40aa-ab3d-24247f767672&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0401-building-a-dynamic-reducer-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
We are going back to the Builder Pattern in this exercise.

Here we have a `State` interface:

```typescript
interface State { username: string; password: string; }
```

The `DynamicReducer` class can add handlers, and for now contains several `unknown` types:

```typescript
export class DynamicReducer { private handlers = {} as unknown; addHandler( type: unknown, handler: (state: unknown, payload: unknown) => unknown ): unknown { this.handlers[type] = handler; return this; } reduce(state: unknown, action: unknown): unknown { const handler = this.handlers[action.type]; if (!handler) { return state; } return handler(state, action); } }
```

The class can be instantiated by calling it and passing in a `state`. Handlers can be added dynamically, which take a state and an action. For example, given a `username` and `password` we can add `LOG_IN` and `LOG_OUT` actions that will return the corresponding state.

As seen in this test, we should be able to reduce our state by calling a `reducer` function with the state and action. This reducer should return a new version of the state, with the `username` set to `"foo"` and the `password` set to `"bar"`.

```typescript
it("Should return the new state after LOG_IN", () => { const state = reducer.reduce( { username: "", password: "" }, { type: "LOG_IN", username: "foo", password: "bar" } ); type test = [Expect<Equal<typeof state, State>>]; expect(state).toEqual({ username: "foo", password: "bar" }); });
```

In another test we are checking that the new state state is returned after `LOG_OUT`. Here we are not expecting it to be the exact same state, we're just expecting it to have a type of `State`.

```typescript
 it("Should return the new state after LOG_OUT", () => { const state = reducer.reduce( { username: "foo", password: "bar" }, { type: "LOG_OUT" } ); type test = [Expect<Equal<typeof state, State>>]; expect(state).toEqual({ username: "", password: "" }); });
```

We also have tests for the `reduce` function. It should throw an error if you pass an incorrect action type or payload.

Here the `NOT_ALLOWED` type should error:

```typescript
 it("Should error if you pass it an incorrect action", () => { const state = reducer.reduce( { username: "foo", password: "bar" }, { // @ts-expect-error type: "NOT_ALLOWED", } ); });
```

And here the `LOG_IN` should error because it isn't being passed the username and password:

```typescript
it("Should error if you pass an incorrect payload", () => { const state = reducer.reduce( { username: "foo", password: "bar" }, // @ts-expect-error { type: "LOG_IN", } ); });
```

There is a type helper called `PayloadsToDiscriminatedUnion` that takes in a `Record` of handler information and turns it into a discriminated union:

```typescript
type PayloadsToDiscriminatedUnion<T extends Record<string, any>> = { [K in keyof T]: { type: K } & T[K]; }[keyof T];
```

When hovering over `TestingPayloadsToDiscriminatedUnion` we can see the type that is being expected inside of the `reducer` type:

```typescript
// hovering over TestingPayloadsToDiscriminatedUnion type TestingPayloadsToDiscriminatedUnion = PayloadsToDiscriminatedUnion<{ LOG_IN: { username: string; password: string }; LOG_OUT: {}; }>; // shows type TestingPayloadsToDiscriminatedUnion = ({ type: "LOG_IN"; } & { username: string; password: string; }) | { type: "LOG_OUT"; }
```

## Challenge
In order to make the tests pass, the `addHandler` will need to be made generic.

You'll also need to add two generics to the `DynamicReducer`.

The `PayloadsToDiscriminatedUnion` type helper will also come into play.

This is a tough problem, but referencing the previous lessons about Classes and the Builder Pattern will be helpful.

## Transcript
0:01 Builder pattern time. Ooh boy! We have a class here called DynamicReducer, which has a bunch of handlers on it. What it does is, basically, you can call this. You can instantiate it by passing in a generic, which is a State. Let's say the State is username and password.

0:21 We can dynamically add handlers to this. We can say, "addHandler LOG\_IN." LOG\_IN is a function which takes in a state and an action, which is like username and password here. We're manually defining this. This manual definition, there's a reason we're manually defining this.

0:39 Then what we do is we return username and password here, basically based on the action that's passed in. Then we can add another handler. We say, "addHandler LOG\_OUT." It returns username and password.

0:51 Now what we should be able to do is this reducer. A reducer is a function that takes in some state and an action and then returns a new version of that state. We should be able to call reduce with this. It's a pure function that we get back some state. The state should equal username foo and password bar.

1:14 All of the runtime stuff is working here. The test should be passing. There's some more stuff here. It should return the new state after LOG\_OUT. We're not expecting the state to be the exact state. We're not doing anything crazy there. We're just expecting it to have a type of State here. Currently, state is just any at the moment.

1:33 Next, we have reducer.reduce. Should error if you pass it an incorrect action. Type NOT\_ALLOWED wasn't specified on our LOG\_IN or LOG\_OUT thing there. It should error there. It should also error if you pass it an incorrect payload. It should have LOG\_IN here, but we're not passing it the username and password.

1:56 The information that you pass to addHandler, which is going to be this action type, so username and password here...Sorry. My highlighting thing is just not working at all. There we go. This thing here should be inferred. It should then capture down at the bottom here.

2:15 We've got a little bit of scaffolding here already. We've got our DynamicReducer, but it's not a generic here. Every time we add the handler, we're going to be calling the builder again and basically saying, "We're returning a new instance with this handler added to it."

2:33 You're going to have to remember all the stuff that we learned, like in the end of the classes section, to figure this stuff out. We have a little helper type here. This is PayloadsToDiscriminatedUnion. This should give you a little clue about what is needed here.

2:52 What we've got here is PayloadsToDiscriminatedUnion. If we call it and we call it with an object where the keys are LOG\_IN, username, password, string, and LOG\_OUT, empty object, what we end up with is basically the type that we are expecting inside the reducer type.

3:12 This is a union where this one is basically type LOG\_IN and username, password. This one is type LOG\_OUT. It takes these and puts them on there.

3:22 This is a tough problem. I feel a bit cruel giving this to you, but I reckon you can handle it based on all the stuff that you've learned so far. We're into the really hardcore stuff now. I'm pretty sure I've given you everything that you need.

3:38 Obviously, this is going to be generic. You're probably going to need two generics here because we actually pass a type argument to the DynamicReducer at the start. I think addHandler is going to be generic too. I feel bad just pushing you out on your own, but I'm going to do it anyway. Good luck.

# Solution: Dynamic Reducer with Generic Types

[

github.com

https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/07-challenges/34-dynamic-reducer.solution.ts

](https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/07-challenges/34-dynamic-reducer.solution.ts)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=0825095e-58b8-4c8c-a5fd-db1a2c207757&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0402-building-a-dynamic-reducer-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=0825095e-58b8-4c8c-a5fd-db1a2c207757&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0402-building-a-dynamic-reducer-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
Let's work through the solution.

Since `DynamicReducer` has a `state` argument, we'll need at least one type argument. We can use `<TState>` for that.

```typescript
export class DynamicReducer<TState> {
```

The `state` of the `handler` inside of `addHandler` handler will be the state that's passed in, so we'll set it and the return type to be `<TState>`.

The same applies to the `reduce`:

```typescript
export class DynamicReducer<TState> { private handlers ={ } as unknown; addHandler( type: unknown, handler: (state: TState, payload: unknown) => TState) ... ... reduce(state: TState, action: unknown): TState { ... } }
```

Now we'll move on to typing the `addHandler` function which is causing errors because it's currently returning `unknown`.

```typescript
// hovering over `DynamicReducer` const reducer = new DynamicReducer<State>() // shows Object is of type 'unknown'
```

To eliminate these errors for now, we'll temporarily change `addHandler`'s type to be string to not have a return type:

```typescript
export class DynamicReducer<TState> { private handlers = {} as unknown; addHandler( type: string, handler: ( state: TState, payload: unknown) => TState ) { this.handlers[type] = handler; return this; } ...
```

This is where we need to recognize the builder pattern.

Every time we call `addHandler` we're returning a new version of `DynamicReducer` with more type information and runtime information.

The `handlers` object is currently empty, but we know that we'll probably need a `key` and a `value`.

In this case the `value` will be the `handler` function itself, so we can use it as the value for each key in the `handlers` object.

For now we can change the type of `handlers` to be a `Record` with a string for the key and a value that is shaped the same as the `handler`:

```typescript
export class DynamicReducer<TState> { private handlers = {} as Record<string, (state: TState, payload: unknown) => TState>; addHandler( type: unknown, handler: (state: TState, payload: unknown) => TState) ... }
```

Adding a generic `TType` to `addHandler` that `extends` string and a `THandlers` generic to `DynamicReducer` that defaults to an empty object will ensure we capture all of the information we need in order to type the `reducer.reduce` function:

```typescript
 export class DynamicReducer<TState, THandlers = {}> { private handlers = {} as Record<string, (state: TState, payload: unknown) => TState>; addHandler<TType extends string>( type: TType, handler: (state: TState, payload: unknown) => TState ) ... }
```

Next we need to capture the `payload` that gets passed in, which we can do by defining it as `TPayload` and having it extend `object`:

```typescript
... addHandler<TType extends string, TPayload extends object>( type: TType, handler: (state: TState, payload: TPayload) => TState ) ...
```

With these changes we are extracting two things when we call `addHandler` in the reducer. Hovering shows us that we are capturing the `username` and `password` as well as the `LOG_IN` action.

```typescript
// hovering over `addHandler ` const reducer = new DynamicReducer<State>() .addHandler(... // shows (method) DynamicReducer<State, {}>.addHandler<"LOG_IN", { username: string; password: string; }>(type: "LOG_IN", handler: (state: State, payload: { username: string; password: string; }) => State): DynamicReducer<State, {}>
```

Back inside of `DynamicReducer` we have an error in `addHandler` under `this.handlers[type] = handlers` because the `payload` is still typed as `unknown`.

In this case since `handlers` is internal to only this class, `payload` is fine to be typed as `any`. It is only interacted with once, and it would be too complicated to represent it as a different type:

```typescript
// inside DynamicReducer private handlers = {} as Record<string, (state: TState, payload: any) => TState>;
```

Now, We need to determine what the return type should be.

Currently `reducer` is a `DynamicReducer` with `State` and an empty object:

```typescript
// hovering over `DynamicReducer` const reducer = new DynamicReducer<State>() // shows constructor DynamicReducer<State, {}>(): DynamicReducer<State, {}>
```

Instead of an empty object, it should have keys for the types of actions and values of the payloads of those actions.

To achieve this, we will update the return type of `addHandler` to be a `DynamicReducer` with `TState` for the state then `THandlers` and a `Record` of `<TType, TPayload>`:

```typescript
... addHandler<TType extends string, TPayload extends object>( type: TType, handler: (state: TState, payload: TPayload) => TState ) : DynamicReducer<TState, THandlers & Record<TType, TPayload>> { this.handlers[type] = handler; } ...
```

Now when we hover over `reducer` we'll see the following:

```typescript
// hovering over `reducer` const reducer = new DynamicReducer<State>() // shows const reducer: DynamicReducer<State, Record<"LOG_IN", { username: string; password: string; }> & Record<"LOG_OUT", object>>
```

With these changes, `THandlers` doesn't seem like a very good name.

The `DynamicReducer` class has internal `handlers`, but what we're capturing is more concerned with the payloads.

I'm going to rename `THandlers` to be `TPayloadMap`, since it better represents the actual shape.

This change can also be made to rename `HandlersToDiscriminatedUnion` to `PayloadsToDiscriminatedUnion`.

As we reviewed in our the setup to this challenge, the `PayloadsToDiscriminatedUnion` function takes an object and it turns it into a discriminated union.

```typescript
type PayloadsToDiscriminatedUnion<T extends Record<string, any>> = { [K in keyof T]: { type: K } & T[K]; }[keyof T];
```

We need to update the `action` passed into `reduce` to be a call to `PayloadsToDiscriminatedUnion` with `<TPayloadMap>`:

```typescript
reduce( state: TState, action: PayloadsToDiscriminatedUnion<TPayloadMap> ) ...
```

This change gives us an error inside of the `reduce` that `TPayloadMap` does not satisfy the constraint `Record<string,any>`

```typescript
reduce( state: TState, action: PayloadsToDiscriminatedUnion<TPayloadMap> ): TState { // error! const handler = this.handlers[action.type]; ...
```

To fix this error, we need to add the same `Record<string, any>` constraint that we have on `PayloadsToDiscriminatedUnion` to the `DynamicReducer`:

```typescript
export class DynamicReducer<TState, TPayloadMap extends Record<string, any> = {}> { private handlers = {} as Record<string, (state: TState, payload: any) => TState>; ...
```

Now everything works as expected!

Everything inside the builder pattern is being captured beautifully.

We have the `state` using `reducer.reduce`.

The `LOG_OUT` action works without any issues, and the `LOG_IN` action requires us to provide a `username` and `password`.

If we don't pass in a correct `type` we'll get an error, and we also get an error if we pass an incorrect `payload`.

Overall, this was a cool opportunity to build up a builder pattern from scratch.

It's hardcore stuff, but hopefully you were able to follow along!

## Transcript
0:00 Let's investigate the solution here. We know that dynamicReducer, because we've got this state argument here, we know that we're going to need at least one type argument that's just basically for the state. Let's pass this in here.

0:13 We've got TState. Now, TState, we can start progressing through this like it's a Sudoku actually, which of these unknowns actually correspond to the state. Well, addHandler, this.handler here, that's going to be the state. That's state.username, state.password. Let's stick that there. That's this one.

0:34 We know that's going to be TState. The handler itself has to return TState. The reduce function, too, so down here, the reducer.reduce has to take in the state and return the state. All of those, so this unknown, yeah, this one, and then this one need to be the state as well. I think that's all the places that TState needs to live.

0:59 Funnily enough, we don't need to add a property for TState. It doesn't need an attribute in the class, because it's always ephemeral actually. It's always just, "OK, we take in the state and return the new state." This state here, for instance, this is going to be TState, handler TState action. That's working good. OK-dokie.

1:18 Now, what we need to do is we need to say, we need to start typing this addHandler function, because we're getting some errors down here that's like "Object is type 'unknown,'" because addHandler currently returns unknown. All of this is unknown, blah, blah, blah, blah, blah.

1:34 On the addHandler, we take in a type and this is string basically. Let's say for now that I'm just going to leave this on types, because this is going to get rid of some of the errors down here, because now, reducer, we can see that it actually returns dynamicReducer state because we're returning this, and we're inferring the type of this from what dynamicReducer is.

1:57 Type string doesn't seem right. Now, we need to think about...This is obviously a builder pattern. Every time we call addHandler, we're returning a new version of dynamicReducer with some more type information. In this case, runtime information too.

2:14 Handlers here, we have an object, and this object is going to be as unknown. We need to work out the data structure that we want this to be in, but we know that we're going to probably need a key and then a value here.

2:32 Basically, the value here is actually going to be a handler. It's going to be this shape with this payload. I'm tempted to start this off with this, with a record -- oopsie -- string and then like this. Let's see what that does.

2:53 Maybe, I'll keep it as payload unknown for now. Now, this error goes away, because this.handlers type = handler, but we need to capture the type of TType here. I'm going to say TType extends string, and then we put in TType here.

3:10 Now, the reason I'm doing this is because we're going to need to basically say, "OK, like the handlers..." In fact, let me add an argument at the top here, which is going to be THandlers, let's say. I'm going to just default this to an empty object for now.

3:28 Because what I want to do is inside this.handler is I want to capture all the information here that in the future is going to be used to type this type LOG\_OUT and all of this stuff here to basically give us the nice errors on this reducer.reduce.

3:45 We need to capture this TType in the addHandler. Let's just check that that's working. On addHandler LOG\_IN, yep, we're capturing LOG\_IN.

3:54 What I want to do is I also want to capture the payload that's inside here, because the payload that's passed in, this is going to be the thing that I want to...I also want to capture this when I'm building up my builder pattern.

4:09 What I'm going to do is I'm going to say payload, this is going to be TPayload. This, I think, can be...It's got to extend an object. Let's say it extends objects. That's a good way of doing that. We can say TPayload.

4:27 Now, where are we at? Now the errors go away here. This means that we're extracting out two things on this addHandler.

4:34 We're grabbing LOG\_IN, and we're also grabbing username, password string. On this one, we get addHandle LOG\_OUT and object. It defaults to an object when it can't find anything. That might bite us in the future, but I think that's OK for now.

4:51 Now TPayload is...Yeah, OK. This.handlers type is complaining, because this type is not assignable to this type. The reason is that payload is not...Yeah, TPayload could be instantiated with an arbitrary type, could be unrelated to unknown.

5:11 I'm going to change this to any. The reason I'm doing that is because handlers is only internal to this class. This is really the only time I interact with it actually, apart from here. I'm going to trust that this is fine, basically. That I can add any here, because it's going to be too complicated to represent this as another type.

5:34 Now, then, what I need to do is I need to say addHandler. This now, we need to figure out what it's going to return because currently...Where is it? Where is it? Where is it? Yeah, reducer now is just a dynamicReducer with state and with an empty object.

5:50 What I want this to represent is I actually want this to represent the object. I want it to represent an object where we have the keys as the types of actions and then the values as the payloads of those actions.

6:11 The way this is going to look is I'm going to return from this dynamicReducer. I'll pass in TState, and I'll pass in THandlers, and this is going to be a record with a TType, and the value is going to be TPayload.

6:31 Now, what happens? That's really nice because that's actually not complaining here. We get reducer. Whoa, here we go. Now, we have record LOG\_IN, username, password, and record LOG\_OUT object. Oh, that's beautiful. OK-doke.

6:48 Now then we have states = reducer.reduce. Now we have one last step here. We're actually really close. This action is typed as unknown, and we're going to take these handlers here and HandlersToDiscriminated.

7:04 Let me change that actually because this is more a payloads map, isn't it? We've got our internal handlers here, which is doing the actual runtime stuff.

7:14 The thing that we're capturing inside here, if we look, it's actually more...If we look at this, I'll just grab this out, so const...Type Example equals this and const payloads is the example.

7:33 Then it's basically asking us to produce an object like this. That's the shape it's going to be in, so LOG\_OUT and this is just any object. That's the shape that's going to be captured inside our type argument.

7:48 THandlers doesn't seem like the right name for it. It should really be TPayloads. I think TPayloads, TPayloadMap, let's say so TPayloadMap and record type TPayload. That works really nicely.

8:05 Then this is going to be sort of PayloadsToDiscriminateUnion, because we saw this in the problem set up, where what this does is it takes an object like we're now producing, and it turns it into a discriminated union. This action is actually going to be PayloadsToDiscriminateUnion, TPayloadMap. OK-dokie.

8:28 Whoa. What? What are you doing here, pal? Why are you suddenly erroring? OK, that's strange. TPayloadMap does not satisfy the constraint Record, because this is actually constrained up here, so I'm going to constrain this Record, so that it's happy now and suddenly that arrow went away. That's real weird.

8:48 Now it looks like, Oh my God, all the errors are gone. Oh, my days. Now, we have our reducer, we're capturing everything inside the builder pattern beautifully. That's lovely.

9:01 Then we have our state reducer.reduce. If we try using this, we can say type LOG\_IN, LOG\_OUT. Yep. LOG\_OUT just works. That's great. Next we have LOG\_IN, and we're forced to pass in a username and password. Oh, OK. Working good.

9:18 We're getting errors here when we don't pass in the correct type and should error if you pass an incorrect payload, too. We're getting back our state.

9:28 If I try to mess things up a little bit, if I do this little bit of a screw up, then I just remove the default parameter there from the type arguments. If I remove it again...Oops, sorry about this. I'm jumping all over the place. Let me do this. Then, we're going to get errors here. This one, oh yeah, of course, it's expecting two type arguments now actually.

9:54 The error I was more intrigued by though was that this now wrecks the inference of these type arguments here, because what's happening is that this dynamic reduces state, it now defaults to Record. The default parameter is really, really crucial.

10:12 I think then, unless I've messed something up here...Yeah, type NOT\_ALLOWED, pull this @ts-expect-error back in. I think that's all of it. Well done if you found this solution. This is really, really cool. We can continue to add handlers here.

10:28 Let's say we go, I don't know, update username. We pull in a function here, and this action is going to be username string. It's really nice being able to type this out here, and then we can return.

10:45 Oh, yeah, this is the first parameters, the state of course. Let's say, we return the state, and then we return username, action.username. Now, inside our reducer, we can do that ourselves. We can say type UPDATE\_USERNAME, pull that in, don't need a password, blah, blah, blah, blah, blah, and it all works. Fantastic.

11:12 This was a really cool opportunity to build up a builder pattern from scratch. Well done if you managed to achieve it. No worries if you didn't. This is really hardcore stuff, but hopefully, you follow through each part of what I was discussing there. Well done.

# 5. Custom JSX Elements

[

github.com

https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/07-challenges/38-challenge-custom-jsx-element.problem.tsx

](https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/07-challenges/38-challenge-custom-jsx-element.problem.tsx)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=df871693-c805-4f12-8cd0-b73c2e6b2701&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0501-custom-jsx-elements-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=df871693-c805-4f12-8cd0-b73c2e6b2701&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0501-custom-jsx-elements-problem.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Problem
JSX includes several elements like `div`, `span`, `h1`, and so on.

In this exercise, we'll be adding support for our own `custom-element`.

Currently, we have an error when we try to use it:

```typescript
const element = <custom-element>hello world</custom-element>;
```

The error reads:

```typescript
Property 'custom-element' does not exist on type 'JSX.IntrinsicElements'.
```

## Challenge
Your challenge is to dig into the React typings to find where `JSX.IntrinsicElements` is located, then add this new element.

Reference the Global and External Libraries lessons for a refresher.

Bonus points if you can make the `<custom-element>` have required props!

## Transcript
0:00 This is a fun little exercise. We are importing React into this project. The reason we're doing that is because we want to add a custom element to React's JSX. This is JSX. JSX bundles with a bunch of different stuff in. It has div. It has span. It has -- I don't know -- whatever, h1, h2.

0:21 We want to add a custom-element to JSX. We want it to be custom-element, like this, as though we're using a Web component or something. We want to add it so that this error goes away. Property custom-element does not exist on type JSX.IntrinsicElements.

0:41 You're going to need to do a bit of investigation here to dive into React typings to see if you can figure out where, for instance, JSX.IntrinsicElements even lives and how you can possibly, from this file, add in a new type to it. You'll need a bit of the knowledge that you picked up in the globals section and also the external libraries section. Good luck.

# Solution: Adding Custom Elements to JSX.IntrinsicElements

[

github.com

https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/07-challenges/38-challenge-custom-jsx-element.solution.tsx

](https://github.com/total-typescript/advanced-patterns-workshop/blob/main/src/07-challenges/38-challenge-custom-jsx-element.solution.tsx)

[<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/\_layouts/15/embed.aspx?UniqueId=42655582-7141-4fa5-8a5d-b2eaf6c1ce20&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0502-custom-jsx-elements-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>](<div style="max-width: 640px"><div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://atozsoftware.sharepoint.com/sites/ATOZSOFTWARETECHSDNBHD/_layouts/15/embed.aspx?UniqueId=42655582-7141-4fa5-8a5d-b2eaf6c1ce20&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="0502-custom-jsx-elements-solution.mp4" style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;"></iframe></div></div>)

## Solution
The first step is to explore React's typings and find `JSX.IntrinsicElements`.

You can use VS Code locally to navigate through or [view the](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/220087807a5746367416c2a3ef87c17d7344f22f/types/react/index.d.ts#L3144) [`IntrinsicElements`](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/220087807a5746367416c2a3ef87c17d7344f22f/types/react/index.d.ts#L3144) [interface on GitHub](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/220087807a5746367416c2a3ef87c17d7344f22f/types/react/index.d.ts#L3144) if you are using the online Stackblitz editor.

The interface includes key-value pairs that represent different elements and their attributes:

```typescript
interface IntrinsicElements { // HTML a: React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>; ...
```

For example, if we dig into the `AnchorHTMLAttributes` associated with the `a` element, we see the different types of attributes it supports:

```typescript
interface AnchorHTMLAttributes<T> extends HTMLAttributes<T> { 
    download?: any; 
    href?: string | undefined; 
    hrefLang?: string | undefined; 
    media?: string | undefined; 
    ping?: string | undefined; 
    rel?: string | undefined; 
    target?: HTMLAttributeAnchorTarget | undefined; 
    type?: string | undefined; 
    referrerPolicy?: HTMLAttributeReferrerPolicy | undefined; 
}
```

As an experiment, we can add a `custom-solution-element` straight to the `IntrinsicElements` interface inside of the `index.d.ts` file. We can specify it can optionally have a `children` property of `React.ReactNode`. Leaving off the `?` will specify that `wow` is a required boolean:

```typescript
// inside of index.d.ts locally interface IntrinsicElements { 'custom-solution-element': { children?: React.ReactNode wow: boolean }
```

Back in the solution file, the error has disappeared:

```typescript
const element = (
	<custom-solution-element wow={true}> Hello world </custom-solution-element>
);
```

However, as we saw earlier, saving changes to the `index.d.ts` file isn't a good idea.

Instead, we need to use `declare global` and the `JSX` namespace to add our custom element to the `IntrinsicElements` interface:

```typescript
// inside solution file declare global { namespace JSX { interface IntrinsicElements { "custom-solution-element": {}; } } }
```

With the `custom-solution-element` added, we can add `children` with the optional property modifier as well as any required props we want:

```typescript
declare global {
	namespace JSX {
		interface IntrinsicElements {
			"custom-solution-element": {
				children?: React.ReactNode;
			};
		}
	}
}

const element = (
	<custom-solution-element> Hello world </custom-solution-element>
);
```

The process used in this solution would work similarly for adding custom elements to Qwik or Solid, which also use JSX.

Diving into external libraries and appending to globals is really nice!

## Transcript
0:00 Let's give it a go. We have custom-solution-element here. We first need to dive into React typings to see if we can understand why JSX.IntrinsicElements even lives. If we go into React, I'm just going to have to...Here we go. In fact, we get a freebie here, where we've got K in keyof JSX.IntrinsicElements. I can-command click on JSX.IntrinsicElements. I end up inside here. Wow.

0:31 We have a, abbr, address, area, article, aside, all of the different types here that represent all...Well, what are they representing, actually? Because it looks like here we have a key. Then we have something. That something, it looks like it's the props of those attributes or the things that a takes here.

0:56 React.DetailedHTMLProps. AnchorHTMLAttributes. DetailedHTMLProps -- oh boy -- that looks a bit intimidating. AnchorHTMLAttributes, these are the actual props that that element actually takes itself.

1:10 This IntrinsicElements thing, if we can add a new element to this...In fact, let me just try this. I'll do this. Now if I just add custom-solution-element -- here we go -- and then let's say it takes a wow boolean. Now, property wow is missing here. We've got wow is...Let's just say it's 1.

1:40 Nice. It doesn't take children. Here we go. What if it takes children? Which is like React.ReacNode, for instance. Beautiful. Then wow, which is boolean. There we go. We've also got some nice required props here. That's cool.

2:01 How do we add this in, inside this file? Because currently I'm just editing the raw index.d.ts files. Let me delete that. We're inside an interface, which is IntrinsicElements, here. Let me pull this over. Whoops. Don't save.

2:21 We've got our IntrinsicElements. This is inside namespace JSX. We know, from JSX namespace, that we can basically say, "declare global namespace JSX," and then append to this interface of IntrinsicElements. I definitely don't want to save those changes. Let me go back to the file where I was.

2:43 Inside here, I can say, "declare global namespace JSX." Then I can say, "interface IntrinsicElements" -- in fact, Copilot is giving the game away here -- and "custom-solution-element." Look at that. Beautiful, beautiful stuff.

3:03 Hang on. Looks like I've accidentally saved this little piece of code. What we can do here is we can say, "interface IntrinsicElements custom-solution-element."

3:14 Does not exist on type JSX.IntrinsicElements. Did I mess that up somehow? Intrisic. Oh gosh. IntrinsicElements. There you go. You can see how painful this declaration merging is. That's a nasty little typo in the middle there that I didn't figure out.

3:31 Now we've got an empty object here. We should probably say that children is possible here, so React.ReactNode. That's nice. Now I can add a required prop if I want to, so requiredProp string. We get requiredProp, blah, blah, blah, blah, blah, blah. So beautiful.

3:46 This is really cool. It's nice to be able to do this sort of deep diving into external libraries, append to globals, and get a sense that we can mess about with this stuff and make some changes. Well done if you found this solution.