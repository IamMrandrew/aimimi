# Frontend

## Overviews

Aimimi was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), a JavaScript library that aims to simplify development of visual interfaces.

## Getting Started

To get the project up and running, and view components in the browser, complete the following steps:

1. Navigate to client
   `cd client`
2. Install project dependancies:
   `yarn install`
3. Start the development environment
   `yarn start`
4. Open your browser and visit <http://localhost:3000>

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## File structure

```
/
├── client/
│   ├── node_modules/
│   ├── public/
│   ├── src
│   │   ├── assets/        # Assets
│   │   │   └─ …           # Raster images (used in component)
│   │   ├── components/    # Components
│   │   │   └─ __test__/   # Front-end test cases
│   │   ├── contexts       # Authorization context
│   │   ├── views          # Views of each pages
│   │   │   └─ __test__/   # Views test cases
│   │   ├── App.jsx        # Render views and components
│   │   ├── App.test.jsx   # Test cases for App.jsx
│   │   ├── index.jsx      # Render App.jsx
│   │   ├── setupTests.js  # Set up tests
|   ├── package.json       # Project manifest
│   ├── yarn.lock
│   ├── README.md          # This file
```
