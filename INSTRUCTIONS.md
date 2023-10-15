# Module 4 Assignment: Add Global State to a React App

(**NOTE:** View a rendered version of this file in VS Code with `ctrl-shift-v` or `cmd-shift-v`)

&nbsp;
## Introduction

For this assignment, you'll be using React's Context API to share state between components in the book search assignment. This newer version of the site will allow users to view books on a page level and navigate between pages without losing book search information. Users will also be able to save books to localstorage and view them on return visits to the site.

&nbsp;
## Setup

Copy the starter files inside of `unsolved` into the root directory of your GitHub repository.

Run `npm i` in the root directory of your repository (your `package.json` should be in the root directory).

To start developing, run `npm run dev`.

&nbsp;
## Instructions

To complete the book application:

- Wrap the `App` component with the `BookProvider` component in `/src/main.jsx`.
- Export `ADD_BOOK`, `SEARCH_BOOKS`, and `REMOVE_BOOK` actions from `/src/context/book/actions.js`.
- Export the initial context state from `/src/context/book/state.js`.
- Implement the reducer function found in `/src/context/book/reducer.js`.
- Implement the ability to add and remove books in `/pages/book/index.jsx` by using the `dispatch` function shared in the book context.

&nbsp;
## App Behavior

Your site should behave in the same manner as [this example site](https://booker-favorites.vercel.app/).

&nbsp;
## Requirements for full credit

To receive full credit for this assignment, your program MUST:

  * Be implemented according to the above [instructions](#instructions).
  * Pass all [automated tests](#testing).
  * Be [deployed](#deployment) correctly.
  * Be [submitted](#submission) correctly. 

&nbsp;
## Testing

Automated tests are included with this assignment. To receive full credit, all automated tests must pass.

To run the tests, run:

```
npm test
```

To run the tests only once, run:

```
npm test -- run
```

&nbsp;
## Deployment

This assignment may be deployed for free with [Vercel](https://vercel.com/docs).

To deploy, make an account with Vercel and either [attach Vercel to your GitHub repository](https://vercel.com/docs/concepts/get-started/deploy#create-and-deploy-a-project) or [use the Vercel CLI](https://vercel.com/docs/cli) to [deploy](https://vercel.com/docs/cli/deploy) your site.

Vercel is pre-configured to be able to recognize and deploy Vite/React websites. That said, some additional configuration is required for Single Page Applications using client-side routing. These sites must include redirect instructions for Vercel to serve the `index.html` regardless of the requested path.

This file is included in the `/unsolved` folder of the assignment as `vercel.json`. Its contents are:

&nbsp;
```json
{
  "routes": [
    {
      "src": "/[^.]+",
      "dest": "/",
      "status": 200
    }
  ]
}
```

This code tells vercel to redirect all requests to `/`, which will allow the user to download the static files required for React/React Router to render based on the URL. 

&nbsp;
## Submission

When submitting this assignment, please include **ALL** of the following:

  * A link to the assignment's GitHub repository.
  * A link to the deployed application.
  * A screenshot of the automated test results.

Please verify that your links are correct when submitting.

