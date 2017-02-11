# UI Server

This is a thin, re-useable static server intended to run all *brennakatphotography*
UI applications and negotiate calls to the API.

## Running the App

The application can run in development mode with live browser refreshing. If you specify the location
of the [sinatra simulator](https://github.com/brennakatphotography/api-simulator), you can run/live
reload the simulator as part of the gulp process. The app requires the api to be running. Configure
the api's location in `.env`. Run `$ cp .example.env .env` to get you started.

```bash
$ npm start # Builds and runs front-end on port 8080 with no simulator.
# Set an environment variable to point to the api. See ".example.env".
$ npm run dev # Runs the server in dev mode with live reloading on code changes and browser refreshing.
$ npm run dev:simulator # Runs the app in dev mode with a simulator.
# Expects simulator to be in relative directory ../simulator.
$ npm run dev -- --simulator=/path/to/simulator
```