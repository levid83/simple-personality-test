# Simple Personality Test App

DEMO 👉 http://simple-personality-test.vercel.app

## Prerequisites

You will need [Node.js](https://nodejs.org) version 12.0 or greater installed on your system.

## Setup

Get the code by cloning this repository using git

```
git clone https://github.com/levid83/simple-personality-test.git
```

## Running locally in development mode

For the server create a `.env` file in the `server` folder of this project (see [.env.example](https://github.com/levid83/simple-personality-test/blob/main/server/.env.example)).

You need to specify:

```
  MONGODB_URI= <YOUR MONGODB URI>,
  IN_MEMORY_DATABASE= <true|false>,
```

In case you want to work with an In Memory MongoDB just leave the `MONGODB_URI` empty and set `IN_MEMORY_DATABASE` to `false`. Otherwise you have to install a MongoDB instance.

To start the server, run the following commands in the root folder:

```
cd server
npm install
npm start
```

The server should now be up and running at http://localhost:3001

To run tests use the `npm run test` command.

For the client create `.env` file in the `client` folder of this project (see [.env.example](https://github.com/levid83/simple-personality-test/blob/main/client/.env.example)).

You need to specify:

```
NEXT_PUBLIC_SERVER_URL=http://localhost:3001
NEXT_PUBLIC_SITE_DOMAIN=http://localhost:3000
```

To start the client, run the following commands in the root folder:

```
cd client
npm install
npm run dev
```

The app should now be up and running at http://localhost:3000

To run tests use the `npm run test` command.
To run e2e tests use the `npm run cypress` command.
