# Community Movies API
This repo is the source code for the community events project. https://tr-community-movies.netlify.app/

A lot of the endpoints are protected and not publicly available. For a list of endpoints, send a get request to `/api`.

## Requirements
 - Node.js version 20.5.0
 - PostgreSQL version 14.11

Earlier versions may work but have not been tested.

## Installation
To run this on a local machine:
1. Create a `.env.test` and `.env.development` files. Inside these, set the following variables:
```
PGDATABASE={community_movies or community_movies_test}
ALLOWED_URLS={comma seperated list of allowed domains for the api to be called from, including the frontend domain}
STRIPE_KEY={your stripe developer key}
FRONTEND_DOMAIN={the domain of the frontend. If running the frontend repo locally, this will be http://localhost:5173}
WEBHOOK_SECRET={your stripe webhook key}
ADMIN_PASSWORD={staff password}
TOKEN={a random string of your choice}
TMDB_KEY={your tmdb key}
```
An example `.env` file has been provided

2. Run `npm install` to install dependencies

3. Run `npm run build` to compile the typescript

4. Run `npm run setup-dbs` to setup development and test databases

5. Run `npm run seed` to seed the development database - the test database will be seeded when tests are run

## Hosting localy
Run `npm run start` to start the server after the above instructions have been followed. To test the endpoints, run `npm t`.