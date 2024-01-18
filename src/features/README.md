# Application's resources features

These are features that belong to the application's resources. These constitute the main features of the application.

Now, we are going to discuss other additional types of files that we have not seen yet in the root README but are used inside this `features` directory.

## GraphQL operations (GraphQL only)

When working with GraphQL, we want to group together GraphQL operations related to a resource. These operations are then used by whatever graphql request solution that the application uses to make requests or subscriptions.

There are 3 main types of GraphQL operations:

- **Queries**
- **Mutations**
- **Subscriptions**

GraphQL operations files are named using the `<filename>.operations.ts` pattern.

## Server actions

[Server actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions) are new features in Next.js 13 that allow us to define requets handlers to Next.js called **server actions** to which the clients makes requests by simply calling those **_server actions_** without the need of defining their corresponding API endpoints.

The application's mutations' operations requests are made from the server so we use server actions in order to trigger those server side mutations requests from the client. Server actions import the GraphQL mutations' operations in order to make those requests. Submitted form data validation that should be done in the client-side of the application are also performed inside server actions in order to reduce the javascript bundle size sent to the browser.

Server actions files are named using the `<filename>.actions.ts` pattern.
