<img src="https://user-images.githubusercontent.com/62586450/111118249-7be99080-85a3-11eb-81bc-55578f9afeec.png" width="82" height="82">

# aimimi

## Overview

The project’s objective is to develop a platform for people who are hoping to crush their goals. The core feature of the platform is goal tracking, also with some other features like goal sharing, leaderboard, social networking service, etc.

## File Structure

```
.
├── client
│   ├── node_modules
│   ├── public
│   ├── src
│   │   ├── components
│   │   ├── contexts
│   │   ├── views
│   │   ├── App.jsx
│   │   ├── index.jsx
|   ├── package.json
│   ├── yarn.lock
│   ├── README.md
├── server
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── index.js
|   ├── package.json
│   ├── yarn.lock
│   ├── README.md
├── .gitignore
├── package.json
├── yarn.lock
├── README.md
```

## Frontend Development

Aimimi is a web application, also a progressive web application (PWA) for mobile users. We are going to use [react](https://github.com/facebook/react) for our front-end development.

Also, we are planning to use the [react-bootstrap](https://react-bootstrap.github.io/getting-started/introduction) and [styled-component](https://styled-components.com/docs/basics) in developing user interfaces. We hope to provide users with an user-friendly, responsive, and high performance experience for reaching their goals.

## Backend Development

Our backend development mainly focuses on the database management and the request and response between our data and server. Beside, we decided to use the following tools for backend development:

#### MongoDB

It is an aggregation framework that provides a secure and NoSQL database that can scale to a high level of write and read traffic. Moreover, it allows scaling across or within multiple distributed data centers. With its document based feature, it can provide a better availability and scalability than other database management systems.

#### Express

We designed Express as the Node.js web framework, which provides mechanisms to integrate with rendering engines that can generate responses by inserting data from MongoDB. Also, at different URL paths, Express allows writing handlers for requests with HTTP verbs, providing RESTful API for frontend.

## Contributors

- andrewli
- thomas
- JustinWaterWater
- JansonCheung
- kzChoi

## Run it locally

Run the following commands:

Make sure you have [yarn](https://classic.yarnpkg.com/en/docs/install/#mac-stable) installed

```
git clone https://github.com/IamMrandrew/aimimi.git
yarn install
```

### client

Navigate to client folder

```
cd client
```

Start the client side

```
yarn start
```

### server

Navigate to client folder

```
cd server
```

Create an `.env` file under the server folder and set the environment variable:

```
PORT=3001
MONGO_URI=your_own_mongodb_uri
NODE_ENV=development
```

Start the server side

```
yarn start
```
