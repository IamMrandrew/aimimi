# Backend

# Overview
The backend development provides APIs for database management. Example APIs include user CRUD, goal CRUD, feed CRUD, comments and likes for feed, etc.

# Highlighted packages used
bcrypt
jsonwebtoken
gridfs-stream
multer
multer-gridfs-storage
node-schedule
nodemailer

# Run it locally
Navigate to client folder, install dependencies

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
