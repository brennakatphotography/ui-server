# UI Server

This is a thin, re-useable static server intended to run all *brennakatphotography*
UI applications and negotiate calls to the API.

## Running the App

```bash
$ npm start
```

## Configuring the App

Set the following environment variables to configure the app.
*Note: Environment variables can be set from the command line or inside a .env in the folder from where you run the server.*

### `PHOTO_API`

This should be the uri for the photo api or simulator.

```bash
$ export PHOTO_API=http://localhost:1234
```

### `STATIC_FOLDER`

This should point to the folder that contains all the static assets including `index.html`.
The value needs to be relative to the folder from where the server is started.

```bash
$ export STATIC_FOLDER=./build
```

### `PORT`

This will tell the server which port to boot on. It defaults to `8080`.

```bash
$ export PORT=4321
```

### `CLIENT--`

Any variable prefixed with `CLIENT--` will be passed to a special js file server at `/env.js` and made available throught a global `getEnv` function.
Valid JSON will be automatically parsed.

```bash
$ export CLIENT--ENV=local
$ export CLIENT--FAVORITE_COLOR=blue
$ export CLIENT--SOME_DATA='{"some":["valid","JSON"]}'
```

In your html file:

```html
<script type="text/javascript" src="/env.js"></script>
```

From the browser's dev tools:

```js
getEnv();
// => {ENV: 'local', FAVORITE_COLOR: 'blue', SOME_DATA: {some: ['valid', 'JSON']} }
```