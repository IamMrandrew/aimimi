<img src="https://user-images.githubusercontent.com/62586450/111118249-7be99080-85a3-11eb-81bc-55578f9afeec.png" width="82" height="82">

# aimimi

The projectβs objective is to develop a platform for people who are hoping to crush their goals. The core feature of the platform is goal tracking, also with some other features like goal sharing, leaderboard, social networking service, etc.

> aimimi.herokuapp.com/

## π File Structure

```
.
βββ client
β   βββ node_modules
β   βββ public
β   βββ src
β   β   βββ components
β   β   βββ contexts
β   β   βββ views
β   β   βββ App.jsx
β   β   βββ index.jsx
|   βββ package.json
β   βββ yarn.lock
β   βββ README.md
βββ server
β   βββ api
β   β   βββ controllers
β   β   βββ middleware
β   β   βββ models
β   β   βββ routes
β   βββ index.js
|   βββ package.json
β   βββ yarn.lock
β   βββ README.md
βββ .gitignore
βββ package.json
βββ yarn.lock
βββ README.md
```

## ππ» Frontend Development

Aimimi is a web application, also a progressive web application (PWA) for mobile users. We are going to use [react](https://github.com/facebook/react) for our front-end development.

Also, we are planning to use the [react-bootstrap](https://react-bootstrap.github.io/getting-started/introduction) and [styled-component](https://styled-components.com/docs/basics) in developing user interfaces. We hope to provide users with an user-friendly, responsive, and high performance experience for reaching their goals.

Please read [README.md](https://github.com/IamMrandrew/aimimi/blob/master/client/README.md) for more details about frontend.

## π‘οΈ Backend Development

Our backend development mainly focuses on the database management and the request and response between our data and server. Beside, we decided to use the following tools for backend development:

#### MongoDB

It is an aggregation framework that provides a secure and NoSQL database that can scale to a high level of write and read traffic. Moreover, it allows scaling across or within multiple distributed data centers. With its document based feature, it can provide a better availability and scalability than other database management systems.

#### Express

We designed Express as the Node.js web framework, which provides mechanisms to integrate with rendering engines that can generate responses by inserting data from MongoDB. Also, at different URL paths, Express allows writing handlers for requests with HTTP verbs, providing RESTful API for frontend.

Please read [README.md](https://github.com/IamMrandrew/aimimi/blob/master/server/README.md) for more details about backend.

## π― Progress

- Responsive user interface
- User system (Signup, Login, Logout)
- View user's goals, adding a goal
- Deployed on Heroku

## π₯ Contributors

| [<img alt="luixaviles" src="https://avatars0.githubusercontent.com/u/62586450?v=4&s=117" width="117">](https://github.com/IamMrandrew) | [<img alt="hughanderson4" src="https://avatars2.githubusercontent.com/u/67647145?v=4&s=117" width="117">](https://github.com/tomas2050) | [<img alt="ultrarunner" src="https://avatars2.githubusercontent.com/u/63246305?v=4&s=117" width="117">](https://github.com/JustinWaterWater) | [<img alt="theIDinside" src="https://avatars2.githubusercontent.com/u/67068792?v=4&s=117" width="117">](https://github.com/janson0004) | [<img alt="carmius" src="https://avatars2.githubusercontent.com/u/80109687?v=4&s=117" width="117">](https://github.com/khchoi0) |
| -------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| [IamMrandrew](https://github.com/IamMrandrew)                                                                                          | [thomas2050](https://github.com/tomas2050)                                                                                              | [JustinWaterWater](https://github.com/JustinWaterWater)                                                                                      | [janson0004](https://github.com/janson0004)                                                                                            | [khchoi0](https://github.com/khchoi0)                                                                                           |

## π Run it locally

Run the following commands:

Make sure you have [yarn](https://classic.yarnpkg.com/en/docs/install/#mac-stable) installed

```
git clone https://github.com/IamMrandrew/aimimi.git
```

### client

Navigate to client folder, install dependencies

```
cd client
yarn install
```

Start the client side

```
yarn start
```

### server

Navigate to server folder, install dependencies

```
cd server
yarn install
```

Create an `config` folder under the server folder, put `.env` file. and 'test.env' inside and set the environment variable:

```
PORT=3001
MONGO_URL=your_own_mongodb_uri
NODE_ENV=development
JTW_TOKEN=your_token
GMAIL_ACCOUNT=mail_account
GMAIL_PASSWORD=mail_password
```

Start the server side

```
yarn start
```
