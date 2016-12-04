# Brenna's Portfolio front-end

This is the UI layer for Brenna's portfolio app.

## The following

The application can run in development mode with live browser refreshing. If you specify the location
of the sinatra simulator, you can run/live reload the simulator as part of the gulp process. The app
requires the api to be running. Configure the api's location in `.env`. See ".example.env".

```bash
$ npm start # Builds and runs front-end on port 8080 with no simulator.
# Set an environment variable to point to the api. See ".example.env".
$ npm run dev # Runs the server in dev mode with live reloading on code changes and browser refreshing.
$ npm run dev:simulator # Runs the app in dev mode with a simulator.
# Expects simulator to be in relative directory ../server-simulator.
$ npm run dev -- --simulator=/path/to/simulator
```
