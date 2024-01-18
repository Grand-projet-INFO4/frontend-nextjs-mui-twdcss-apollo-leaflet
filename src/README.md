# Source code

In this `src` directory is put the source code of the application that is written in **_Typescript_** at the basis.

## Table of content

For this readme, We will go over the following topics:

1. Barrel export pattern
2. The App router
3. Components
4. Hooks
5. Configurations
6. Constants
7. Contexts
8. Parts of the store
9. Helpers
10. Type definitions
11. Features
12. Wrappers around libraries
13. GraphQL definitions
14. Utilities
15. Assets
16. File naming

## Barrel export pattern

The **barrel export pattern** is a way to export all ES modules inside a directory from within an single index.js/index.ts entry point file so that modules imports that go to the directory only refer to the directory name instead of having to having to refer to each individual file within the directory.

For example, let's say we have a directory named `myfolder` that has 2 files named `file1.ts` and `file2.ts`, and a file called `mycode.ts` that imports modules from the files within the both files inside the `myfolder` directory, then we would normally have the following code snippets:

```typescript
// myfolder/file1.ts

export function myFunction1() {
  // Code ...
}
```

```typescript
// myfolder/file2.ts

export function myFunction2() {
  // Code ...
}
```

```typescript
// mycode.ts

import { myFunction1 } from "./myfolder/file1.ts";
import { myFunction2 } from "./myfolder/file2.ts";

// Code ...
```

As we can see, the imports from the files within the `myfolder` diretory are spread across multiple lines because the imports have to reference each file line by line.

However, if we applied the barrel export pattern to the `myfolder` dirtectory, then we would create another file called `index.ts` that would be the entry point for the imports from the `myfolder` directory and the code would be as follows:

```typescript
// myfolder/index.ts

export * from "./file1.ts";
export * from "./file2.ts";

// Code ...
```

```typescript
// mycode.ts

import { myFunction1, myFunction2 } from "./myfolder";

// Code ...
```

As a result, the imports that go the `myfolder` now only reference the directory's name which elimninates the need for having to reference individually each file inside the directory. This can be very handy because we no longer have to worry about the updates made to the files' names and the exported items are now grouped as a single entity or unit.

The barrel export pattern is among the best practices in NestJS and we also use it a lot in this codebase as we will see.

## The App router

The **App router** refers to [Next.js 13's app router](https://nextjs.org/docs/app) which defines the application's routing inside the `app` directory. Inside this `app` directory, we also define the **pages' components**, **layouts**, **loaders**, **error fallbacks** and **_other features_** that Next.js 13 has to offer.

While we can write all the application's components within the `app` directory, this directory only holds **the bare minimum necessary components for each route** and imports most of the components and other kinds of code from the different other directories that we will discuss in the subsequent chapters.

## Components

Components are at the core building blocks of a React application.

Since we're using Next.js 13, there are now [2 different types of components](https://nextjs.org/docs/getting-started/react-essentials):

- **Server components**: These are components that are used by Next.js 13 with **_the app router_** to do **Server Side Rendering (SSR)** from the server. Components inside Next.js 13's `app` directory **are Server Components by default**.
- **Client components**: These are **the regular components that run on the browser** are we are used to with traditional **_Single Page Application (SPA)_** React apps. The **"use client"** directive at the start of the file marks the component as a client component in Next.js 13's `app` directory.

As for the location, components are scattered across differents directories. In general, components are put within the routes' directories of the `app` directory. However, components that are **related to a specific feature** AND **are reusable** or **implement interactions with the backend** are stored within that feature which means inside one of the `features/**/components` or the `shared/**/components` directories. Common components that **are not related to any features** and **are reusable** are stored inside the `components` folder. **_Common components_** are generally reusable **_presentational_** components like **_buttons, modals, loaders, etc_** that we customize for the application.

For the file naming convention, components' names are written in **PascalCase** and use the `.tsx` extension.

## Hooks

In a React application, we often need to write our own **_custom hooks_** where we encapsulate a component's business logic into a seperate function for the sake of readability and reusability.

If a custom React hook is **related to a specific feature**, then they are stored within that feature which means in one of the `features/**/hooks` or the `shared/**/hooks` directories. However, if a custom hook is **not related to any specific feature** and is reusable across all components, it is stored within the `hooks` directory.

Hooks' filenames start with the `use` keywork and are written in **camelCase**. For example, a hook that implements `componentDidMount` lifecycle hook can be named as `useComponentDidMount.ts`.

## Configurations

Configurations basically refer to the **environment variables** that the application uses and which are accessed within the `process.env` object. However, if those variables are accessed all over the place, repeating that nested access of variables and the amount of refactoring needed in case we want to change the variable key in the future can be very tedious.

That's why we have a `config` directory that maps the imports of the environment variables into **constant configuration variables**. That way, the environment variables are now accessed single typescript variables. This allows us to make updates caused by an environment variable key change in one single place instead of searching through the whole codebase. This also enables us to other configuration variables mapped from other environment variables more easily.

For the file naming, configuration files are named using the `<filename>.config.ts` convention. For example, we can have a configuration file dedicated for the different URLs the application interacts with named as `urls.config.ts`.

## Constants

Sometimes, we have some values that are used in different places of the code and remain constant. Instead of repeating those values over and over, we store them in **constants' files** that store those constant values.

Constants that are **related to a specific feature** are stored within that feature which means under the `features` or the `shared` directories. Constants that are **not related to any feature** are stored within the `constants` directory.

As for the file naming, constants' files are named using the `<filename>.constants.ts` pattern.

## Contexts

React's [Context API](https://legacy.reactjs.org/docs/context.html) enables us to pass down values from a component referred to as **_Provider_** to all of its children which belong to its downwards components tree without doing **_props drilling_**. Sometimes, we need to create our custom react contexts in some parts of the application.

A custom React context consists of **3 main files** and that's why a custom React context comes into the form of a **folder that contains multiple files** rather than a single file. Those 3 main files are:

- **The context itself**: This where we store the **context's instance** and its **initial default values** and is named using the `<filename>.context.ts` pattern.
- **The provider**: This the **_component_** that defines the context's actual values and how those values get passed down in the components' tree. The name of the context's provider's file ends with the `Provider` suffix.
- **The consummer hook**: This is a **_custom React hook_** that consumes the context's value by passing the context's instance as an argument to React's built-in `useContext` hook. This custom hook basically wraps the imports of the `useContext` hook and the context's instance into a single hook. The name of the context consumer hook's ends with the `Context` suffix.

Those 3 main files are exported using the **_barrel export pattern_** from the context's folder.

Custom React contexts that **are related to a specific feature** are stored within that feature which means in the `features/**/contexts` or the `shared/**/contexts` directories. However, if a they are **not related to any specific feature**, then they are stored within the `contexts` directory.

For example, let's say we have a `my-context` context, then this context's file structure would be like this:

```shell
├── contexts
    ├── my-context
        ├── index.ts
        ├── my-context.context.ts
        ├── myContextProvider.ts
        └── useMyContextContext.ts
    ├── ...other contexts
```

## Parts of the store

In case a **global state management system** such as **_Redux_** is used, we usually have something known like a **store** where all the global state data is stored and managed. However, depending on the third-party solution we are using, the management of those global state data can be split into multiple files that focus each on a specific part of the store. Those files are what we refer to as **parts of the store**.

Again, depending on the third-party solution we are using, those parts of the store can have different names. In our application, since we are using **_rematch_**, the parts of the store are called **models**. Also, with **_Redux ToolKit (RTK)_**, they are called **_slices_**.

Parts of the store takes the form of **a folder that contains 2 main files**:

- **The part of the store's definition**: This file contains the actual state definition of the part of the store and some eventual related methods. Since we are dealing with models, their filenames follow the `<filename>.model.ts` pattern.
- **The selector hook**: This is a custom React hook wraps the selection of the part of the store by **_react-redux_**'s `useSelector` hook. Part of the store's selector hooks end with the `Model` suffix since we are using **models** from **_rematch_**.

Those 2 main files are exported using the **_barrel export pattern_** from the part of the store's folder.

Parts of the store that are **related to a specific feature** are stored within that feature which mean under the `features` or the `shared` directories and the name of the part of the store is `model`. However, if the part of the store is **not related to any feature**, then its folder name is **the name of the part the store** and is stored under the `models` directory.

For example, let's say we have a part of the store that goes by the name of `my-part`, then if this belonged to a feature called `my-feature`, we would have the following files structure:

```shell
├── my-feature
    ├── model
        ├── index.ts
        ├── my-part.model.ts
        └── useMyPartModel.ts
    ├── ...other my-feature's files
```

On the other hand, if `my-part` did not belong to any feature, then it would be placed inside the `models` and the files structure would look like this:

```shell
├── models
    ├── my-part
        ├── index.ts
        ├── my-part.model.ts
        └── useMyPartModel.ts
    ├── ...other models
```

## Helpers

Helpers are **helper functions** that are **based on the application's environment and framework** where we isolate some logic for the sake of readability and reusability.

Helpers that are **related to a specific feature** are stored within that feature which means inside the `features/**/helpers` or `shared/**/helpers` directories. However, if the helper is **not related to any feature**, then we store it inside the `helpers` directory.

Helpers files are named using the `<filename>.helper.ts` convention.

## Type definitions

In a typical typescript project, it is common practice to write our own custom typescript type definitions in seperate files so that they can be referred from any part of the application.

Type definitions that are **related to a specific feature** are stored within that feature which means inside the `features` or `shared` directories. However, if the helper is **not related to any feature**, then we store it inside the `types` directory.

Type definitions files' names follow the `<filename>.d.ts` pattern.

## Features

Features are the most essential parts of the application. A feature is an aspect, topic or element of the application that groups **components, contexts and parts of the store** all together. The application's resources are in general the main application's features. We can also have other features that do not belong to the application's resources.

Therefore, a feature consist of **different types of files**. A feature must have **components** and **contexts** or **parts of the store**. We can also have **hooks**, **constants**, **type definitions** and **helpers**. For the application's resource feature particularly, we can have other types of files such as **services** and **server actions**; and if we are using GraphQL, we can have **GraphQL operations** as well.

Since a feature consists of different types of files, a feature takes the form of **a folder that contains different files**. Features that **belong to the application's resources** are put inside the `features` directory whereas the features that **do not belong to any application's resource** are put inside the `shared` directory.

Let's take an example. Let's say we have a `my-feature` feature that belong to the application's resources, then the files structure would look like something like this:

```shell
├── features
    ├── my-feature
        ├── my-feature.actions.ts
        ├── my-feature.constants.ts
        ├── my-feature.d.ts
        ├── my-feature.operations.ts
        ├── my-feature.service.ts
        ├── components
            ├── index.ts
            ├── MyFeatureComponent.tsx
            ├── ... other components
        ├── hooks
            ├── index.ts
            ├── useMyFeatureHook.ts
            ├── ... other hooks
        ├── model
            ├── index.ts
            ├── my-feature.model.ts
            └── useMyFeatureModel.ts
        ├── contexts
            ├── some-context
                ├── index.ts
                ├── some-context.context.ts
                ├── SomeContextProvider.tsx
                └── useSomeContextContext.ts
            ├── ... other contexts
        └── helpers
            ├── some-helper.helper.ts
            ├── ... other helpers
    ├── ...other features
```

## Wrappers around libraries

When working with third-party libraries, we sometimes have to set up additional code that builds on top of the library so that it can work properly with the needs of the application. Those additional setups around third-party libraries are what we refer to as **wrappers around libraries**.

We dedicate the `lib` directory for those wrappers around libraries. This `lib` directory contains different directories for each library that contains those additional wrapper codes.

Wrappers for libraries may contain various kinds of files depending on the library' API. In some cases, we may have **_components_**, **_custom hooks_**, **_type definitions_** and **_helpers_** inside them.

Files inside a folder as a wrapper around a library exported using the **_barrel export pattern_**.

For example, lets'say we have a `my-library` third-party library that we want to write some wrapper around, then the files structure would look like this:

```shell
├── lib
    ├── my-library
        ├── index.ts
        ├── ... wrapper codes' files
```

## GraphQL definitions (GraphQL only)

If case we are using GraphQL and a **GraphQL code generator** at the same time, that code generator needs some directory where it can store the required data from which it generates the typescript **type definitions for the operations** and some additional other files. That's where the GraphQL definitions directory comes in.

For our application, that directory is the `graphql` directory.

We do not write into the GraphQL definitions' directory since the it **is reserved to the code generator**.

## Utilities

Utilities are **utility functions that around the Javascript/Typescript language** that we write and isolate into separate utility files for the sake of readability and reusability. As opposed to **_helpers_**, utilities are **not based on the applications environment and framework** so they **can be used on any Javascript environment and framework**.

The utilities are put inside the `utils` directory.

Utilities' file names follow the `<filename>.utils.ts` convention.

## Assets

The assets are the **static files that we want to import as modules** inside the application's components. Those static assets are generally **_style sheets (CSS) and image files_**.

Those static assets are stored within the `assets` directory.

## File naming

For both typescript files and folders, multi-words names are joined using the `kebab-case` syntax **_except for components and hooks_**.

For typescript files, as we have seen so far, most of the files that belong to a specific type of file follow the `<filename>.<type_of_file>.ts` pattern.
