# Brenna's Portfolio front-end

This is the UI layer for Brenna's portfolio app.

## The following

The application can run in development mode with live browser refreshing. If you specify the location
of the sinatra simulator, you can run/live reload the simulator as part of the gulp process. The app
requires a server running on port 3000.

```bash
$ npm start #runs front-end on port 8080 with no simulator. The app expects a server to be running on port 3000.
$ npm start -- --simulator=/path/to/simulator/directory --port=1234 #can take optional arguments
$ npm run start:simulator # npm start -- --simulator=../server-simulator
```
