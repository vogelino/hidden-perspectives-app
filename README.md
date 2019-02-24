# Getting started
## Clone the project
First, clone the project locally and move into the folder. Open your terminal and run:
```sh
$ git clone git@github.com:vogelino/hidden-perspectives-app.git
$ cd hidden-perspectives-app
```

## Managing node versions

We recommend [**nvm**](https://github.com/creationix/nvm) for handeling node.js versions. You can install it using cURL:
```sh
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash
```
or Wget:
```sh
wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash
```
[Read about how to use nvm here](https://github.com/creationix/nvm#usage). The currently used node version is defined in the `.nvmrc` file.

## Install the dependencies
You have to install the project's dependencies using [Yarn](https://yarnpkg.com/en/).
```sh
$ yarn install
```

## Configure your environment variables
For the app to be able to connect to the GraphQL Backend, you have to add some variables to your environment Setup. Copy and edit the following files depending on the environment you wish to run your app into:
```sh
$ cp .env.local.sample .env.local && $EDITOR .env.local # For both development and production environments
$ cp .env.test.local.sample .env.test.local && $EDITOR .env.test.local # For the test environment
```
And adapt the variables to match your setup

## Available scripts
### `yarn dev`

Runs the app in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will automatically reload if you make changes to the code.<br>
You will see the build errors and lint warnings in the console.

<p align='center'>
<img src='https://cdn.rawgit.com/marionebl/create-react-app/9f62826/screencast-error.svg' width='600' alt='Build errors'>
</p>

### `yarn test`

Runs the test watcher in an interactive mode.<br>
By default, runs tests related to files changed since the last commit.

### `yarn build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>

Your app is ready to be deployed.

### `yarn start`

Serves the build on [http://localhost:5000](http://localhost:5000).


## Deployment

We are using [**Now**](https://zeit.co/now) for deploying the app. If you would like to use Now as well you should duplicate `now.sample.json`. Rename the file to `now.json` and [configure it for your personal needs](https://zeit.co/blog/now-json).

***

# Project Setup
## Create React App
This project was bootstrapped using [Create React App](https://github.com/facebook/create-react-app) (CRA). CRA allows us to concentrate on business logic instead of spending lots of time on configuring the project build. Under the hood, CRA uses [Webpack](https://webpack.js.org/) to build and bundle the javascript code and any other type of imported files.

## React
As indicated in the name “Create **React** App”, CRA provides the foundation for create [React](https://reactjs.org/) apps. React is a front end library for building user interfaces. It focuses on the _View_ part in the _Model-View-Controller_ paradigm.

## React App Rewired
We use [React App Rewired](https://github.com/timarney/react-app-rewired) to enhance the configuration not included by default by Create React App. We use it, for instance, to add compilation of [Styled Components](https://styled-components.com), which, as the name indicates, allows the creation of css-styled React component.
[Click here to learn more about how we use Styled Components.](/vogelino/hidden-perspectives-app/wiki/Styled-components)

***

# Quality management
## Code style
We use [Eslint](https://eslint.org/) to lint the javascript code, thus making sure that we avoid syntax errors and that the code style remains consistent throughout the project. Eslint can be configured to adapt to any team's taste. We use [Airbnb's preset](https://www.npmjs.com/package/eslint-config-airbnb) which is widely accepted in the community and suits our needs really well too.

The Eslint configuration can be changed int the `.eslintrc` file. The file `.eslintignore` can be used to ignore files that aren't owned by the project or shouldn't be linted. 

#### `yarn lint`
Runs eslint in the `src` folder and fixes all errors that can be fixed automatically.

#### `yarn lint-latest`
Runs eslint on all javascript files that changed since the last commit. This script is executed as a git hook before each commit and push to prevent users to share code that doesn't respect the code style guidelines.

## Unit testing
We use unit testing to make sure our components' functionality is working as expected, thus avoiding the creation of new bugs. Testing also serves as a self documentation, as tests describe really well the purpose of the code.

Unit testing is done using [Jest](https://jestjs.io/) which is built in Create React App (See above). Jest can be configured within the `jest.config.js` file in the project's root.

### Naming tests
Tests are named after the file they test. For example, if we need to test the file `dateUtil.js`, we would create a new file next to it called `dateUtil.test.js`. Automatically, jest would it recognize and run it.

### Testing React components
We use [Enzyme](https://airbnb.io/enzyme/) to test React components. Enzyme makes it easier to assert, manipulate, and traverse React components.

### Running tests
#### `yarn test`
Runs the tests in interactive mode. Useful when developing. Runs per default onyl files changed since the last commit, but all tests can be runned at any time by typing **`a`** in the interactive test mode.

#### `yarn run test-latest`
This command is the equivalent of `yarn test` but doesn't run in interactive mode and only the tests related to the files changed since the last commit are tested.

* * *

# Technologies overview
Here is an overview of the main technologies/libraries used in this project.

### Core

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Usage</th>
      <th>Cost</th>
      <th>License</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="https://reactjs.org/">React</a></td>
      <td>For building the user interface’s view and view-logic</td>
      <td>Free</td>
      <td>MIT</td>
    </tr>
    <tr>
      <td><a href="https://github.com/apollographql/apollo-client">Apollo Client</a></td>
      <td>For connecting the user interface with the GraphQL API and managing internal state</td>
      <td>Free</td>
      <td>MIT</td>
    </tr>
    <tr>
      <td><a href="https://styled-components.com">Styled Components</a></td>
      <td>For styling the App</td>
      <td>Free</td>
      <td>MIT</td>
    </tr>
  </tbody>
</table>


### Scaffold

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Usage</th>
      <th>Cost</th>
      <th>License</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="https://webpack.js.org/">Webpack</a> (<a href="https://reactjs.org/docs/create-a-new-react-app.html">create-react-app</a>)</td>
      <td>For the app’s build process (i.e. minification)</td>
      <td>Free</td>
      <td>MIT</td>
    </tr>
    <tr>
      <td><a href="https://babeljs.io/">Babel</a> (<a href="https://reactjs.org/docs/create-a-new-react-app.html">create-react-app</a>)</td>
      <td>For compiling state of the art Es2017 javascript code to cross browser compatible Es2015 code.</td>
      <td>Free</td>
      <td>MIT</td>
    </tr>
  </tbody>
</table>

### Quality management

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Usage</th>
      <th>Cost</th>
      <th>License</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="https://jestjs.io">Jest</a> (<a href="https://reactjs.org/docs/create-a-new-react-app.html">create-react-app</a>)</td>
      <td>For unit testing (including react components)</td>
      <td>Free</td>
      <td>MIT</td>
    </tr>
    <tr>
      <td><a href="https://eslint.org/">Eslint</a></td>
      <td>For making sure the source code style is the same style across the project</td>
      <td> Free</td>
      <td>MIT</td>
    </tr>
  </tbody>
</table>

### Documentation

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Usage</th>
      <th>Cost</th>
      <th>License</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="">React Storybook </a></td>
      <td>For documenting the React Components (style guide)</td>
      <td>Free</td>
      <td>MIT</td>
    </tr>
  </tbody>
</table>


### Deployment

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Why</th>
      <th>Cost</th>
      <th>Terms</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="https://zeit.co/now">Zeit now</a></td>
      <td>Because it has a low cost, is extremely easy, has automatic ssl certificates, different servers on different continents and more</td>
      <td><a href="https://zeit.co/pricing">$50/mo</a></td>
      <td><a href="https://zeit.co/terms">Terms of service</a></td>
    </tr>
  </tbody>
</table>


### Backend

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Usage</th>
      <th>Cost</th>
      <th>Terms of service</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="https://www.graph.cool">Graphcool</a></td>
      <td>For the database and the GraphQL API all on one place</td>
      <td><a href="https://www.graph.cool/cloud/">Pay as you go</a></td>
      <td><a href="https://github.com/prisma/content/blob/master/static/legal/terms.md">Terms of service</a></td>
    </tr>
  </tbody>
</table>

***

# Managing data and the app's state
## Backend data
For the backend, we use the [Graphcool Framework Cloud service](https://www.graph.cool/), which takes care of hosting the data and provides us with a [GraphQL](https://graphql.org/) API. This allows us to concentrate on the business logic on the frontend instead of dealing with complex server configurations.

## Usage on the frontend
To connect our app to the GraphQL endpoint and to manage internal state, we use [Apollo GraphQL](https://www.apollographql.com/), more precisely the [ApolloClient](https://github.com/apollographql/apollo-client) library. The Apollo Client is configured using different links, each offering a different way to query data:

### An HTTP Link using [apollo-http-link](https://github.com/apollographql/apollo-link)
This is useful to perform [CRUD operations](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) on the backend using the GraphQL API.

### A Websocket Link for subscriptions using [apollo-link-ws](https://github.com/apollographql/apollo-link/tree/master/packages/apollo-link-ws)
This is useful to subscribe to data changes on the backend using the backend GraphQL API.

### An Auth Link using [apollo-link-context](https://github.com/apollographql/apollo-link/tree/master/packages/apollo-link-context)
This enables user authetication. Users can be authenticated and an auth-token retrieved from the backend GraphQL API is used to sign further rescricted operations.

### An internal state Link using [apollo-link-state](https://github.com/apollographql/apollo-link-state)
This allows us to query local state the same way it is done with the backend GraphQL API. Using this technique enables us to use only one way of querying data instead of having an additional state management like [Redux](https://redux.js.org/).

## Use of the state in the components
We use [React Apollo](https://github.com/apollographql/react-apollo) to provide our React components with the ability to query the data they need to be rendered. Components then perform CRUD operation either from the backend GraphQL API  or from the internal state using the GraphQL query language. These retrive data that can be used as component props.

### ApolloProvider
The ApolloProvider is an [Higher Order Component](https://reactjs.org/docs/higher-order-components.html) providing all components within the apps an instance to the ApolloClient using [React's context](https://reactjs.org/docs/context.html). This allows components deeper in the tree to use the client to query the state and backend's data.

The ApolloProvider is given the ApolloClient instance and wraps the whole app once. This is done in the app's entry file `index.js`:

```js
ReactDOM.render(
	(
		<ApolloProvider client={client}>
			<App />
		</ApolloProvider>
	),
	document.getElementById('root'),
);
```

### Usage within components
To perform CRUD operations with the data or state, components can be wrap with Higher Order Components provided by React Apollo.

#### Example:
```js
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const GET_DOGS = gql`
  {
    dogs {
      id
      breed
    }
  }
`;

const Dogs = ({ onDogSelected }) => (
  <Query query={GET_DOGS}>
    {({ loading, error, data }) => {
      if (loading) return 'Loading...';
      if (error) return `Error! ${error.message}`;

      return (
        <select name="dog" onChange={onDogSelected}>
          {data.dogs.map(dog => (
            <option key={dog.id} value={dog.breed}>
              {dog.breed}
            </option>
          ))}
        </select>
      );
    }}
  </Query>
);
```

Here a component is wrapped with the `Query` Higher Order Component which accepts a GraphQL query and takes care of handling the error messages, the loading state and the data fetching.

***

# Authentication
## On the backend
Authentication is configured on the backend side using the Graphcool console. There, [permission queries](https://www.graph.cool/docs/reference/auth/authorization/permission-queries-iox3aqu0ee) can be configured to restrict which operations can be performed by which users. Operations with the right auth-token in the headers are then authorised if they pass the permission query.

## On the frontend
The frontend uses the authentication queries provided by the backend to gather an authentication token, which is then used to sign the operations made on the frontend. The auth-token is saved in the local storage, until it is invalidated after the expiration date is reached.

*** 

# Routing
For the routing [React Router DOM](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-dom) is used. Routes are defined in the App component. The router renders different React components based on the current url, therfore, components representing pages are place in a specific page folder called `pages`.

## Use of Links
To link between pages, React Router provides us with a Link component that accepts an `to` property indicating the absolute path to browse to.

## Use the router instance within components
Components can also access the router's instance, because the router wraps the whole app and makes the router available via the context. To make use of the router within a component, use the `withRouter` Higher Order Component provided by React Router to wrap your component. The router prop will then be passed as a component.

***

# Working with assets
Assets like images, favicons, manifests, css files or other resources that need to be served on the server can be put in the `public` folder.

This functionality is handled by Create React App and although it can be used to link to various resources like fonts or images, Create React App also provides most of the relevant webpack loaders to import resources directly into the javascript code. For instance importing a `fonts.css` file from withing the entry file `index.js` will import the css automatically and will additionally import the fonts linked within the css files. Knowing that, only put the assets that have standardized naming conventions and need to be served on the root (eg. favicons, manifest.json, browserconfig.xml, etc.).

## Normalizing the CSS
To make sure that css defaults are the same on all browsers, we use the popular [`normalize.css`](https://necolas.github.io/normalize.css/).

## Global CSS rules
Global CSS rules can be defined in the `index.css` laying in the root of the project's `src` folder.

## SEO meta tags
The meta tags are defined using [React Helmet](). React Helmet has a main file which allows us to defines the global meta tags used for the map. Additionally to the global tags, tags can be defined deeper in the components' hierarchy, thus overriding the options higher in the hierarchy.

***

# Styled Components
To style the app, we use [Styled Components](https://styled-components.com). Styled Components provides an utility function that creates any html tag with a unique and scoped css class. This is a big advantage as it removes the need to use a naming convention like [Block Element Identifier](http://getbem.com/introduction/) as the style defined in Styled Components cannot have any effect on sibling components.

## Creating Styled Components
Styled Components are created in a `styles.js` file laying next to the component itself. Each component is exported as a named export. The utility function provided by Styled Components uses the power of [tagged templates](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Tagged_templates) to make the styling using real css a breaze.

#### Example
```js
export const Container = styled.aside`
  width: 20%;
  max-width: 320px;
  float: left;
`;
```

Styled Components can also be combined (inherited):

```js
export const PrimaryButton = styled(NormalButton)`
  background: pink;
  color: white;
`;
```

Attributes can be added to components directly from Styled Components:

```js
export const NormalButton = styled.button.attrs({
  type: 'button'
})`
  cursor pointer;
`;
```

Styled components can access the props to adapt their styling:

```js
export const Button = styled.button`
  cursor: ${({ disabled }) =>
    (disabled ? 'default' : 'pointer')};
`;
```

#### Usage
Styled components are then imported from within the main component and used instead of the regular HTML/JSX Markup:

```js
import {
  Container,
  Title,
  Subtitle,
  Content,
} from './styles';

const MyComponent = ({
  title,
  subtitle,
  content,
}) => (
  <Container>
    <Title>{title}</Title>
    <Subtitle>{subtitle}</Subtitle>
    <Content>{content}</Content>
  <Container>
);
```

***

# React Storybook
[React Storybook](https://github.com/storybooks/storybook) is used for documenting our React UI components library. Storybook runs as an indepedent website, in which each UI component is demonstrated interactively. Developers can use it to develop components, while being isolated from the rest of the App. Concurrently, designers can see and review the components, making sure they are in sync with their own design component library.

## Yarn scripts
#### `yarn storybook`
This script runs the storybook in development mode, thus enabling hot module replacement.

#### `yarn build-storybook`
This scripts runs the storybook in production mode, prior to a development.

## Configuration
The configuration of the storybook lives inside the `.storybook` folder. There, two files are present:

#### `config.js`
This is the configuration file that takes care to load all stories.

#### `addons.js`
This files contains configuration for the so called addons. Addons can add functionality to a storybook. For instance, we use the addon [`info`](https://github.com/storybooks/storybook/tree/master/addons/info), which is helpful to display additional information with each component.

## Stories
Stories are sets of pages within your component library that document one or more components. These are described within javascript files located in the `src/stories` folder of the app. 

#### Example
```js
// src/stories/index.js
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { withInfo } from '@storybook/addon-info';
import { Button, Welcome } from '@storybook/react/demo';

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Button', module)
	.add('with text', withInfo(`
      description or documentation about my component, supports markdown
    
      ~~~js
      <Button>Click Here</Button>
      ~~~
    
    `)(() => <Button onClick={action('clicked')}>Hello Button</Button>))
	.add('with some emoji', () => <Button onClick={action('clicked')}>Yippieee!</Button>);

// ...

```
