# RS Lang
You can open this link to see deployed [RS Lang](https://rslang-team16-alpoliakov.herokuapp.com/).

Monorepo [Repo](https://github.com/alpoliakov/rslang).

## Prepare and run
1. install [Node.js](https://nodejs.org/en/download/)
2. Clone RS Lang repo: https://github.com/alpoliakov/rslang
3. Go to folder `rslang`
4. To install all dependencies use `yarn install`
5. You can launch the application in three ways:
- for development: `yarn dev`
- for build: `yarn build`
- for start: `yarn start`
6. To run tests, use: `yarn test`
7. If you launched the application via `yarn dev` or `yarn start` - open browser and go to http://localhost:8000

## Architecture and technologies used
- #### Workspaces
Workspaces make it possible to work on multiple, interdependent libraries at once. For more information on workspaces, visit the [documentation](https://classic.yarnpkg.com/en/docs/workspaces/).
- #### Node.js
For more information6 visit the [Node](https://nodejs.org/en/docs/).
  - ##### [nodemon](https://www.npmjs.com/package/nodemon)
  A tool that helps develop Node-based applications by automatically restarting the node application when changes in the directory are detected. We don’t want to be closing and starting the server every time there’s a change in our code. Nodemon inspects changes every time in our app and automatically restarts the server.
- #### GraphQL
GraphQL's declarative model helps you create a consistent, predictable API you can use across all of your clients. As you add, remove, and migrate back-end data stores, that API doesn't change from the client's perspective.
Even with many other advantages, GraphQL's single greatest benefit is the developer experience it provides. It's straightforward to add new types and fields to your API, and similarly straightforward for your clients to begin using those fields. This helps you design, develop, and deploy features quickly.

Combined with the Apollo platform, complex considerations like caching, data normalization, and optimistic UI rendering become straightforward as well.
  - ##### [Apollo Server](https://www.apollographql.com/docs/apollo-server/)
  Apollo Server is an open-source, spec-compliant GraphQL server that's compatible with any GraphQL client, including Apollo Client. It's the best way to build a production-ready, self-documenting GraphQL API that can use data from any source.
  The ApolloServer is initialized with an Express server, MongoDB session middleware and GraphQL schema.
  - ##### [Apollo Client](https://www.apollographql.com/docs/react/)
  Apollo Client helps you structure code in an economical, predictable, and declarative way that's consistent with modern development practices. The core `@apollo/client` library provides built-in integration with React, and the larger Apollo community maintains integrations for other popular view layers.
  - ##### [TypeGraphQL](https://typegraphql.com/)
  TypeGraphQL solves many problems for us, like schema validation, authorization and dependency injection, which helps develop GraphQL APIs quickly and easily. TypeGraphQL also integrates with several third party libraries like Typegoose.
  - ##### [Typegoose](https://typegoose.github.io/typegoose/)
  Typegoose is a wrapper library for easily writing MongoDB models with TypeScript. It allows us to easily apply Mongoose schemas and models in TypeScript.
  Typegoose will create the correct schemas and model mappings for our database. In getting started, it is important to realize that the decision to use Typegoose is based on using MongoDB. Given another database driver, you may want to consider using an Object Relational Mapping like TypeORM.
  - ##### [Decorators (ES7)](https://www.typescriptlang.org/docs/handbook/decorators.html)
  A Decorator is a special kind of declaration that can be attached to a class declaration, method, accessor, property, or parameter. Decorators use the form `@expression`, where `expression` must evaluate to a function that will be called at runtime with information about the decorated class.
- #### Express.js
Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
For more information visit the [Express](https://expressjs.com/ru/).
- #### MongoDB Atlas
MongoDB Atlas is the global cloud database service for modern applications. Deploy fully managed MongoDB across AWS, Azure, or GCP. Best-in-class automation and proven practices guarantee availability, scalability, and compliance with the most demanding data security and privacy standards. Use MongoDB’s robust ecosystem of drivers, integrations, and tools to build faster and spend less time managing your database.
For more information visit the [MongoDB](https://www.mongodb.com/cloud/atlas/lp/try2?utm_source=google&utm_campaign=gs_emea_ukraine_search_core_brand_atlas_desktop&utm_term=mongodb%20atlas&utm_medium=cpc_paid_search&utm_ad=e&utm_ad_campaign_id=12212624575&gclid=Cj0KCQjw1PSDBhDbARIsAPeTqrdXWwrkNi2EoKmVqidJI-Avbv3cQnu2ussctz_iJOZoQKh8kLnzU0EaAk9ZEALw_wcB)
- #### Next.js - vist the [Next.js](https://nextjs.org/)
  - ##### [Custom _app.tsx](https://nextjs.org/docs/basic-features/typescript#custom-app)
  Next.js uses the App component to initialize pages. You can override it and control the page initialization. Which allows you to do amazing things like:
   - Persisting layout between page changes
   - Keeping state when navigating pages
   - Custom error handling using componentDidCatch
   - Inject additional data into pages
   - Add global CSS
  - ##### [Custom _document.tsx](https://nextjs.org/docs/advanced-features/custom-document#typescript)
  A custom Document is commonly used to augment your application's `<html>` and `<body>` tags. This is necessary because Next.js injects some stylesheets into the DOM using the custom Document.
  - ##### [Custom Server](https://nextjs.org/docs/advanced-features/custom-server)
  A custom Next.js server allows you to start a server 100% programmatically in order to use custom server patterns. Most of the time, you will not need this – but it's available for complete customization.
  - ##### [Server Side Rendering (SSR)](https://nextjs.org/docs/basic-features/typescript#static-generation-and-server-side-rendering)
  #### Why Next.js?
  - ##### Zero Config
  Automatic compilation and bundling. Optimized for production from the start.
  - ##### TypeScript Support
  Automatic TypeScript configuration and compilation.
  - ##### Fast Refresh
  Fast, reliable live-editing experience, as proven at Facebook scale.
  - ##### File-system Routing
  Every component in the pages directory becomes a route.
  - ###### API Routes
  Optionally create API endpoints to provide backend functionality.
  - ##### Built-in CSS Support
  Create component-level styles with CSS modules. Built-in Sass support.
  - ##### Who is using Next.js?
  Check out the [Next.js Showcase](https://nextjs.org/showcase)
- #### React - vist the [React](https://ru.reactjs.org/)
  - ##### [Functional components](https://ru.reactjs.org/docs/react-component.html#gatsby-focus-wrapper)
  - ##### [React hooks](https://ru.reactjs.org/docs/hooks-intro.html)
  - ##### [Props and state](https://ru.reactjs.org/docs/components-and-props.html)
- #### Authentication
  - ##### [JSON Web Tokens (jwt)](https://jwt.io/)
  Once the user is logged in, each subsequent request will include a JWT, allowing the user to access the routes, services, and resources allowed with that token. jsonwebtoken is used to create a JWT that is used to authenticate users.
  - ##### [Encryption (bcrypt)](https://www.npmjs.com/package/bcrypt)
  A library that helps us hash passwords.
  - ##### Login and signup
  - ##### User Context
- #### Tests
  - ##### [Jest](https://jestjs.io/ru/)
  Jest is a delightful JavaScript Testing Framework with a focus on simplicity.
  - ##### [Testing Library](https://testing-library.com/)
  The Testing Library family of libraries is a very light-weight solution for testing without all the implementation details. The main utilities it provides involve querying for nodes similarly to how users would find them. In this way, testing-library helps ensure your tests give you confidence in your UI code.
- #### Styling
  - ##### [Framer Motion](https://www.framer.com/motion/)
  A production-ready motion library for React. Utilize the power behind Framer, the best prototyping tool for teams. Proudly open source.
  - ##### [Chakra-UI](https://chakra-ui.com/)
  Chakra UI is a simple, modular and accessible component library that gives you the building blocks you need to build your React applications.
  - ##### [React icons](https://react-icons.github.io/react-icons/)
  We easily include popular icons in our project using react-icons, which uses ES6 imports, which allows us to only include the icons your project uses.
  - ##### Responsive design
  - ##### Custom themes
  - ##### Dark mode
- #### Code Quality Tool
  - ##### [ESLint](https://eslint.org/)
  - ##### [Prettier](https://prettier.io/)
  - ##### [Husky](https://typicode.github.io/husky/)
- #### Deploy
  - ##### [Heroku](https://www.heroku.com/)
  - ##### [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli#download-and-install)
